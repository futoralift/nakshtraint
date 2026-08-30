import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const eventSchema = z.object({
  path: z.string().max(200),
  referrer: z.string().max(200).default("Direct"),
  device: z.enum(["Desktop", "Mobile", "Tablet"]).default("Desktop"),
  browser: z.string().max(100).default("Other"),
  os: z.string().max(100).default("Other"),
  country: z.string().max(100).default("India"),
  isNewVisitor: z.boolean().default(false),
  isNewSession: z.boolean().default(false),
  visitorId: z.string().max(100).optional(),
});

export type AnalyticsEventInput = z.infer<typeof eventSchema>;

const sanitizeKeyPart = (val: string) => val.replace(/[^a-zA-Z0-9_\-\.\/]/g, "_").slice(0, 80);

const getTodayString = () => {
  // Use Indian Standard Time (IST) for date grouping
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date()); // Returns YYYY-MM-DD
};

export const recordPageView = createServerFn({ method: "POST" })
  .validator((data: AnalyticsEventInput) => eventSchema.parse(data))
  .handler(async ({ data }) => {
    // Ignore internal admin paths
    if (data.path.startsWith("/admin") || data.path.includes("api/")) {
      return { ok: true, ignored: true };
    }

    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const today = getTodayString();
      const WINDOW_SECONDS = 315360000; // 10 years (persistent)
      const LIMIT = 1000000000;

      const keysToBump: string[] = [
        "analytics:total:pageviews",
        `analytics:daily:pv:${today}`,
        `analytics:page:${sanitizeKeyPart(data.path || "/")}`,
        `analytics:device:${sanitizeKeyPart(data.device || "Desktop")}`,
        `analytics:browser:${sanitizeKeyPart(data.browser || "Other")}`,
        `analytics:os:${sanitizeKeyPart(data.os || "Other")}`,
        `analytics:country:${sanitizeKeyPart(data.country || "India")}`,
        `analytics:ref:${sanitizeKeyPart(data.referrer || "Direct")}`,
      ];

      if (data.isNewVisitor) {
        keysToBump.push("analytics:total:visitors", `analytics:daily:uv:${today}`);
      }

      if (data.isNewSession) {
        keysToBump.push("analytics:total:sessions", `analytics:daily:sess:${today}`);
      }

      // Execute atomic bumps in parallel
      await Promise.allSettled(
        keysToBump.map((key) =>
          supabaseAdmin.rpc("bump_rate_limit", {
            _key: key,
            _limit: LIMIT,
            _window_seconds: WINDOW_SECONDS,
          }),
        ),
      );

      return { ok: true };
    } catch (err) {
      console.warn("Analytics recording error:", err);
      return { ok: false };
    }
  });

export interface AnalyticsStatsResponse {
  totalVisitors: number;
  totalPageViews: number;
  todayVisitors: number;
  todayPageViews: number;
  bounceRate: number;
  activeOnlineEst: number;
  dailyTimeline: {
    date: string;
    label: string;
    visitors: number;
    pageviews: number;
  }[];
  pages: { name: string; count: number; percentage: number }[];
  referrers: { name: string; count: number; percentage: number }[];
  countries: { name: string; count: number; percentage: number }[];
  devices: { name: string; count: number; percentage: number }[];
  browsers: { name: string; count: number; percentage: number }[];
  os: { name: string; count: number; percentage: number }[];
}

export const getAnalyticsStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<AnalyticsStatsResponse> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    try {
      const { data, error } = await supabaseAdmin
        .from("rate_limits")
        .select("key, hits, window_start")
        .like("key", "analytics:%");

      if (error) {
        console.error("Error fetching analytics data:", error);
      }

      const rows = data ?? [];
      const map = new Map<string, number>();
      for (const row of rows) {
        map.set(row.key, row.hits);
      }

      const today = getTodayString();
      const totalPageViews = map.get("analytics:total:pageviews") ?? 0;
      const totalVisitors = map.get("analytics:total:visitors") ?? 0;
      const totalSessions = map.get("analytics:total:sessions") ?? Math.max(totalVisitors, 1);
      const todayPageViews = map.get(`analytics:daily:pv:${today}`) ?? 0;
      const todayVisitors = map.get(`analytics:daily:uv:${today}`) ?? 0;

      // Generate last 14 days timeline
      const dailyTimeline: AnalyticsStatsResponse["dailyTimeline"] = [];
      const now = new Date();

      for (let i = 13; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const dateStr = new Intl.DateTimeFormat("en-CA", {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(d);

        const shortLabel = d.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          timeZone: "Asia/Kolkata",
        });

        const pv = map.get(`analytics:daily:pv:${dateStr}`) ?? 0;
        const uv = map.get(`analytics:daily:uv:${dateStr}`) ?? 0;

        dailyTimeline.push({
          date: dateStr,
          label: shortLabel,
          visitors: uv,
          pageviews: pv,
        });
      }

      // Helper to aggregate prefix items
      const aggregatePrefix = (prefix: string) => {
        const items: { name: string; count: number; percentage: number }[] = [];
        let sum = 0;

        for (const [key, count] of map.entries()) {
          if (key.startsWith(prefix)) {
            const rawName = key.slice(prefix.length);
            // Replace url encoded or slash formatting if needed
            const name = rawName === "" ? "/" : rawName;
            items.push({ name, count, percentage: 0 });
            sum += count;
          }
        }

        items.sort((a, b) => b.count - a.count);
        const divisor = sum || 1;
        for (const item of items) {
          item.percentage = Math.round((item.count / divisor) * 100);
        }
        return items;
      };

      const pages = aggregatePrefix("analytics:page:");
      const referrers = aggregatePrefix("analytics:ref:");
      const countries = aggregatePrefix("analytics:country:");
      const devices = aggregatePrefix("analytics:device:");
      const browsers = aggregatePrefix("analytics:browser:");
      const os = aggregatePrefix("analytics:os:");

      // Estimated bounce rate (single page visits ratio)
      const avgViewsPerSession = totalSessions > 0 ? totalPageViews / totalSessions : 1;
      let bounceRate = Math.round(
        Math.max(10, Math.min(85, 100 - (avgViewsPerSession - 1) * 35)),
      );
      if (totalPageViews === 0) bounceRate = 0;

      return {
        totalVisitors,
        totalPageViews,
        todayVisitors,
        todayPageViews,
        bounceRate,
        activeOnlineEst: todayVisitors > 0 ? 1 : 0,
        dailyTimeline,
        pages,
        referrers,
        countries,
        devices,
        browsers,
        os,
      };
    } catch (err) {
      console.error("Error building analytics stats:", err);
      return {
        totalVisitors: 0,
        totalPageViews: 0,
        todayVisitors: 0,
        todayPageViews: 0,
        bounceRate: 0,
        activeOnlineEst: 0,
        dailyTimeline: [],
        pages: [],
        referrers: [],
        countries: [],
        devices: [],
        browsers: [],
        os: [],
      };
    }
  },
);
