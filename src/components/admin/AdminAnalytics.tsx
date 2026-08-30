import { useQuery } from "@tanstack/react-query";
import {
  ExternalLink,
  Globe,
  Laptop,
  Monitor,
  RefreshCw,
  Smartphone,
  Tablet,
  Users,
  Eye,
  TrendingUp,
  Activity,
  Chrome,
  Compass,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getAnalyticsStats, type AnalyticsStatsResponse } from "@/lib/analytics.functions";

export function AdminAnalytics() {
  const [techTab, setTechTab] = useState<"devices" | "browsers" | "os">("devices");
  const [timeRange, setTimeRange] = useState<"7d" | "14d" | "all">("14d");

  const analyticsQuery = useQuery({
    queryKey: ["admin", "analytics"],
    queryFn: async (): Promise<AnalyticsStatsResponse> => {
      const res = await getAnalyticsStats();
      return res;
    },
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });

  const data = analyticsQuery.data;
  const isLoading = analyticsQuery.isLoading;

  const totalVisitors = data?.totalVisitors ?? 0;
  const totalPageViews = data?.totalPageViews ?? 0;
  const todayVisitors = data?.todayVisitors ?? 0;
  const todayPageViews = data?.todayPageViews ?? 0;
  const bounceRate = data?.bounceRate ?? 0;

  // Filter timeline based on timeRange
  const timeline = (data?.dailyTimeline ?? []).slice(
    timeRange === "7d" ? -7 : timeRange === "14d" ? -14 : 0,
  );

  const maxTimelineVal = Math.max(
    ...timeline.map((t) => Math.max(t.pageviews, t.visitors)),
    5, // Min height scale
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="display text-xl uppercase tracking-[0.15em] text-forest">
              Live Website Analytics
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Real-time Active
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Accurate visitor tracking, device metrics, and traffic sources for Nakshtra Interior.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as "7d" | "14d" | "all")}
            aria-label="Filter timeline by date range"
            className="h-9 rounded-md border border-input bg-card px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-forest"
          >
            <option value="7d">Last 7 Days</option>
            <option value="14d">Last 14 Days</option>
            <option value="all">All Time</option>
          </select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => analyticsQuery.refetch()}
            disabled={analyticsQuery.isFetching}
            className="gap-1.5 text-xs h-9 bg-card"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${analyticsQuery.isFetching ? "animate-spin" : ""}`} />
            Refresh
          </Button>

          <a
            href="https://vercel.com/futoralift-6697/nakshtra-digital-showroom/analytics"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 h-9 rounded-md bg-forest text-card px-3 text-xs font-medium transition-colors hover:bg-forest/90"
          >
            <span>Vercel Dashboard</span>
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Unique Visitors */}
        <div className="border border-border bg-card p-5 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between">
            <dt className="label-caps text-muted-foreground text-xs">Unique Visitors</dt>
            <div className="rounded-full bg-forest/5 p-2 text-forest">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <dd className="display mt-3 text-3xl font-semibold text-forest">
            {isLoading ? <Skeleton className="h-8 w-16" /> : totalVisitors}
          </dd>
          <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
            <span className="font-medium text-forest">+{todayVisitors}</span> new today
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-forest/40 via-forest to-forest/20" />
        </div>

        {/* Card 2: Total Visits / Page Views */}
        <div className="border border-border bg-card p-5 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between">
            <dt className="label-caps text-muted-foreground text-xs">Total Page Views</dt>
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <Eye className="h-4 w-4" />
            </div>
          </div>
          <dd className="display mt-3 text-3xl font-semibold text-foreground">
            {isLoading ? <Skeleton className="h-8 w-16" /> : totalPageViews}
          </dd>
          <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
            <span className="font-medium text-primary">+{todayPageViews}</span> views today
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/40 via-primary to-primary/20" />
        </div>

        {/* Card 3: Bounce Rate */}
        <div className="border border-border bg-card p-5 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between">
            <dt className="label-caps text-muted-foreground text-xs">Bounce Rate</dt>
            <div className="rounded-full bg-amber-500/10 p-2 text-amber-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <dd className="display mt-3 text-3xl font-semibold text-foreground">
            {isLoading ? <Skeleton className="h-8 w-16" /> : `${bounceRate}%`}
          </dd>
          <p className="mt-2 text-xs text-muted-foreground">Average single-page sessions</p>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500/30" />
        </div>

        {/* Card 4: Active / Live Today */}
        <div className="border border-border bg-card p-5 relative overflow-hidden shadow-xs">
          <div className="flex items-center justify-between">
            <dt className="label-caps text-muted-foreground text-xs">Traffic Velocity</dt>
            <div className="rounded-full bg-emerald-500/10 p-2 text-emerald-600">
              <Activity className="h-4 w-4" />
            </div>
          </div>
          <dd className="display mt-3 text-3xl font-semibold text-emerald-700">
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : todayPageViews > 0 ? (
              `${todayPageViews} Views`
            ) : (
              "Live"
            )}
          </dd>
          <p className="mt-2 text-xs text-muted-foreground">Tracking in real-time</p>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500/40" />
        </div>
      </div>

      {/* Traffic Trend Visual Graph */}
      <section className="border border-border bg-card p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border pb-4">
          <div>
            <h3 className="label-caps font-semibold text-forest text-sm">Visitors & Views Timeline</h3>
            <p className="text-xs text-muted-foreground">Daily traffic distribution over time</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-xs bg-forest" />
              <span className="text-muted-foreground">Page Views</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-xs bg-amber-600" />
              <span className="text-muted-foreground">Unique Visitors</span>
            </div>
          </div>
        </div>

        {/* Bar Chart Visualization */}
        <div className="mt-6">
          {isLoading ? (
            <Skeleton className="h-48 w-full" />
          ) : timeline.length === 0 ? (
            <div className="py-12 text-center text-xs text-muted-foreground">
              No traffic recorded in this period yet.
            </div>
          ) : (
            <div className="flex items-end justify-between gap-2 sm:gap-4 h-48 pt-6">
              {timeline.map((point) => {
                const pvHeight = Math.max(8, Math.round((point.pageviews / maxTimelineVal) * 100));
                const uvHeight = Math.max(8, Math.round((point.visitors / maxTimelineVal) * 100));

                return (
                  <div
                    key={point.date}
                    className="group relative flex flex-1 flex-col items-center h-full justify-end"
                  >
                    {/* Hover Tooltip */}
                    <div className="absolute -top-12 z-20 hidden rounded-md bg-forest px-2.5 py-1 text-[11px] text-background shadow-lg group-hover:flex flex-col items-center whitespace-nowrap pointer-events-none">
                      <span className="font-semibold">{point.label}</span>
                      <span className="text-background/80">
                        {point.pageviews} Views • {point.visitors} Visitors
                      </span>
                    </div>

                    {/* Bars */}
                    <div className="w-full max-w-[28px] flex items-end justify-center gap-1 h-full">
                      {/* Pageviews bar */}
                      <div
                        style={{ height: `${pvHeight}%` }}
                        className="w-full bg-forest/80 rounded-t-xs transition-all group-hover:bg-forest"
                      />
                      {/* Visitors bar */}
                      <div
                        style={{ height: `${uvHeight}%` }}
                        className="w-full bg-amber-600/70 rounded-t-xs transition-all group-hover:bg-amber-600"
                      />
                    </div>

                    {/* X-Axis Date */}
                    <span className="mt-2 text-[10px] text-muted-foreground whitespace-nowrap truncate max-w-[40px] text-center">
                      {point.label.split(" ")[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Breakdown Grids */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Card 1: Top Pages */}
        <section className="border border-border bg-card p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="label-caps font-semibold text-forest text-sm flex items-center gap-2">
              <Compass className="h-4 w-4" /> Top Pages & Routes
            </h3>
            <span className="text-xs text-muted-foreground">Visitors</span>
          </div>

          <div className="mt-4 flex-1 space-y-3">
            {isLoading ? (
              <Skeleton className="h-32 w-full" />
            ) : !data?.pages || data.pages.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No page views recorded yet.
              </div>
            ) : (
              data.pages.slice(0, 7).map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-foreground font-medium truncate max-w-[260px]">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-semibold text-forest">{item.count}</span>
                      <span className="text-[10px] text-muted-foreground w-8 text-right">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-forest transition-all"
                      style={{ width: `${Math.max(4, item.percentage)}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Card 2: Top Referrers */}
        <section className="border border-border bg-card p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="label-caps font-semibold text-forest text-sm flex items-center gap-2">
              <Globe className="h-4 w-4" /> Traffic Referrers
            </h3>
            <span className="text-xs text-muted-foreground">Source</span>
          </div>

          <div className="mt-4 flex-1 space-y-3">
            {isLoading ? (
              <Skeleton className="h-32 w-full" />
            ) : !data?.referrers || data.referrers.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No referrer traffic recorded yet.
              </div>
            ) : (
              data.referrers.slice(0, 7).map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground font-medium truncate max-w-[260px]">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-semibold text-forest">{item.count}</span>
                      <span className="text-[10px] text-muted-foreground w-8 text-right">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${Math.max(4, item.percentage)}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Card 3: Countries */}
        <section className="border border-border bg-card p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="label-caps font-semibold text-forest text-sm flex items-center gap-2">
              <Globe className="h-4 w-4" /> Countries
            </h3>
            <span className="text-xs text-muted-foreground">Share</span>
          </div>

          <div className="mt-4 flex-1 space-y-3">
            {isLoading ? (
              <Skeleton className="h-32 w-full" />
            ) : !data?.countries || data.countries.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No country location data recorded yet.
              </div>
            ) : (
              data.countries.slice(0, 7).map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-foreground font-medium flex items-center gap-1.5">
                      {item.name === "India" ? "🇮🇳" : item.name === "United States" ? "🇺🇸" : "🌐"}{" "}
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-semibold text-forest">{item.count}</span>
                      <span className="text-[10px] text-muted-foreground w-8 text-right">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-600 transition-all"
                      style={{ width: `${Math.max(4, item.percentage)}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Card 4: Devices / Browsers / OS */}
        <section className="border border-border bg-card p-5 shadow-xs flex flex-col">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="label-caps font-semibold text-forest text-sm flex items-center gap-2">
              <Monitor className="h-4 w-4" /> System & Environment
            </h3>

            {/* Sub-tab pills */}
            <div className="flex items-center rounded-md bg-secondary p-0.5 text-xs">
              {(
                [
                  ["devices", "Devices"],
                  ["browsers", "Browsers"],
                  ["os", "OS"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTechTab(key)}
                  className={`rounded-sm px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
                    techTab === key
                      ? "bg-card text-forest shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex-1 space-y-3">
            {isLoading ? (
              <Skeleton className="h-32 w-full" />
            ) : (
              (() => {
                const list =
                  techTab === "devices"
                    ? data?.devices
                    : techTab === "browsers"
                      ? data?.browsers
                      : data?.os;

                if (!list || list.length === 0) {
                  return (
                    <div className="py-8 text-center text-xs text-muted-foreground">
                      No system data recorded yet.
                    </div>
                  );
                }

                return list.slice(0, 6).map((item) => {
                  const getIcon = () => {
                    if (item.name === "Desktop") return <Monitor className="h-3.5 w-3.5" />;
                    if (item.name === "Mobile") return <Smartphone className="h-3.5 w-3.5" />;
                    if (item.name === "Tablet") return <Tablet className="h-3.5 w-3.5" />;
                    if (item.name.toLowerCase().includes("chrome"))
                      return <Chrome className="h-3.5 w-3.5" />;
                    if (item.name.toLowerCase().includes("win"))
                      return <Laptop className="h-3.5 w-3.5" />;
                    return <Globe className="h-3.5 w-3.5" />;
                  };

                  return (
                    <div key={item.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-foreground font-medium flex items-center gap-1.5">
                          <span className="text-muted-foreground">{getIcon()}</span>
                          {item.name}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-semibold text-forest">{item.count}</span>
                          <span className="text-[10px] text-muted-foreground w-8 text-right">
                            {item.percentage}%
                          </span>
                        </div>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full rounded-full bg-forest transition-all"
                          style={{ width: `${Math.max(4, item.percentage)}%` }}
                        />
                      </div>
                    </div>
                  );
                });
              })()
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
