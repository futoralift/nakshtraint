import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const phoneSchema = z
  .string()
  .trim()
  .transform((value) => value.replace(/[\s\-()]/g, ""))
  .refine((value) => /^(?:\+?91)?[6-9]\d{9}$/.test(value), {
    message: "Enter a valid 10-digit Indian mobile number.",
  })
  .transform((value) => `+91${value.slice(-10)}`);

const sanitize = (value: string) =>
  value
    .replace(/[<>]/g, "")
    // eslint-disable-next-line no-control-regex
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, 2000);

const ALLOWED_FLOOR_PLAN_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
] as const;

const floorPlanSchema = z.object({
  name: z.string().trim().min(1).max(160),
  type: z.enum(ALLOWED_FLOOR_PLAN_TYPES),
  // base64 (no data-url prefix); ~5MB binary limit
  data: z.string().min(1).max(7_500_000),
});

export const leadInputSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120).transform(sanitize),
  phone: phoneSchema,
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Enter a valid email address.")
    .max(160)
    .optional()
    .or(z.literal("")),
  location: z.string().trim().min(2, "Please enter your location.").max(160).transform(sanitize),
  projectTimeline: z.string().trim().max(60).optional().or(z.literal("")),
  serviceInterest: z.array(z.string().trim().max(60)).max(10).optional(),
  requirements: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .transform((v) => (v ? sanitize(v) : v)),
  floorPlan: floorPlanSchema.optional().nullable(),
});

export type LeadInput = z.input<typeof leadInputSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: LeadInput) => leadInputSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    try {
      const { data: allowed } = await supabaseAdmin.rpc("bump_rate_limit", {
        _key: `lead:${data.phone}`,
        _limit: 5,
        _window_seconds: 3600,
      });
      if (allowed === false) {
        throw new Error("TOO_MANY_REQUESTS");
      }
    } catch (err: unknown) {
      const errMessage = err instanceof Error ? err.message : "";
      if (errMessage === "TOO_MANY_REQUESTS") {
        throw err;
      }
      // Continue if RPC function does not exist
      console.warn("rate limit check skipped:", err);
    }

    const services = (data.serviceInterest ?? []).filter(Boolean);
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    let floorPlanPath: string | null = null;
    let floorPlanName: string | null = null;

    if (data.floorPlan) {
      try {
        const binary = Uint8Array.from(atob(data.floorPlan.data), (c) => c.charCodeAt(0));
        if (binary.byteLength > 5 * 1024 * 1024) {
          throw new Error("FILE_TOO_LARGE");
        }
        const ext =
          data.floorPlan.type === "application/pdf"
            ? "pdf"
            : data.floorPlan.type.replace("image/", "").replace("jpeg", "jpg");
        const path = `${data.phone.replace(/\D/g, "")}/${Date.now()}.${ext}`;
        const upload = await supabaseAdmin.storage
          .from("floor-plans")
          .upload(path, binary, { contentType: data.floorPlan.type, upsert: false });
        if (upload.error) {
          console.warn("floor plan upload warning:", upload.error);
        } else {
          floorPlanPath = path;
          floorPlanName = sanitize(data.floorPlan.name).slice(0, 160);
        }
      } catch (err: unknown) {
        const errMessage = err instanceof Error ? err.message : "";
        if (errMessage === "FILE_TOO_LARGE") {
          throw err;
        }
        console.warn("floor plan processing warning:", err);
      }
    }

    let existing: {
      id: string;
      submission_count: number | null;
      requirements: string | null;
      service_interest: string[] | null;
      floor_plan_path: string | null;
      floor_plan_name: string | null;
    } | null = null;

    try {
      const { data: existingLead } = await supabaseAdmin
        .from("leads")
        .select(
          "id, submission_count, requirements, service_interest, floor_plan_path, floor_plan_name",
        )
        .eq("phone", data.phone)
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      existing = existingLead;
    } catch (lookupErr) {
      console.warn("Lead lookup warning:", lookupErr);
    }

    if (existing) {
      const mergedServices = Array.from(
        new Set([...(existing.service_interest ?? []), ...services]),
      );
      const { error: updateError } = await supabaseAdmin
        .from("leads")
        .update({
          full_name: data.fullName,
          phone: data.phone,
          email: data.email || null,
          location: data.location,
          project_timeline: data.projectTimeline || null,
          service_interest: mergedServices,
          requirements: data.requirements || existing.requirements || null,
          floor_plan_path: floorPlanPath ?? existing.floor_plan_path,
          floor_plan_name: floorPlanName ?? existing.floor_plan_name,
          submission_count: (existing.submission_count ?? 1) + 1,
        })
        .eq("id", existing.id);

      if (!updateError) {
        return { ok: true as const, duplicate: true as const };
      }
      console.warn("Lead update error, falling back to insert:", updateError);
    }

    const { error: insertError } = await supabaseAdmin.from("leads").insert({
      full_name: data.fullName,
      phone: data.phone,
      email: data.email || null,
      location: data.location,
      project_timeline: data.projectTimeline || null,
      service_interest: services,
      requirements: data.requirements || null,
      floor_plan_path: floorPlanPath,
      floor_plan_name: floorPlanName,
      source: "Website Popup",
    });

    if (insertError) {
      console.error("lead insert warning:", insertError);
      // Log full lead info in server logs to ensure inquiry is never lost
      console.info(
        "[LEAD SUBMISSION RECEIVED]",
        JSON.stringify({
          fullName: data.fullName,
          phone: data.phone,
          email: data.email,
          location: data.location,
          projectTimeline: data.projectTimeline,
          serviceInterest: services,
          requirements: data.requirements,
          floorPlan: floorPlanName,
          submittedAt: new Date().toISOString(),
        }),
      );
    }

    return { ok: true as const, duplicate: false as const };
  });

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(160),
  password: z.string().min(1).max(200),
});

const constantTimeEquals = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
};

export const adminLogin = createServerFn({ method: "POST" })
  .validator((data: { email: string; password: string }) => loginSchema.parse(data))
  .handler(async ({ data }) => {
    const adminEmail = (globalThis.process?.env?.["ADMIN_EMAIL"] ?? "nakshtrainterior@gmail.com")
      .trim()
      .toLowerCase();
    const adminPassword = globalThis.process?.env?.["ADMIN_PASSWORD"] ?? "nakint@11";
    const supabaseUrl =
      globalThis.process?.env?.["SUPABASE_URL"] ??
      globalThis.process?.env?.["VITE_SUPABASE_URL"] ??
      "https://nsbaxhrxbbwrsmudikix.supabase.co";
    const publishableKey =
      globalThis.process?.env?.["SUPABASE_PUBLISHABLE_KEY"] ??
      globalThis.process?.env?.["VITE_SUPABASE_PUBLISHABLE_KEY"] ??
      "sb_publishable_-Bu8v_QYDO_GLBZ0fcTETw_q4XMEx7d";

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    try {
      const { data: allowed } = await supabaseAdmin.rpc("bump_rate_limit", {
        _key: `login:${data.email}`,
        _limit: 8,
        _window_seconds: 900,
      });
      if (allowed === false) {
        throw new Error("TOO_MANY_ATTEMPTS");
      }
    } catch (e: unknown) {
      if (e instanceof Error && e.message === "TOO_MANY_ATTEMPTS") throw e;
    }

    if (
      !adminEmail ||
      !adminPassword ||
      !constantTimeEquals(data.email, adminEmail) ||
      !constantTimeEquals(data.password, adminPassword)
    ) {
      throw new Error("INVALID_CREDENTIALS");
    }

    try {
      // Provision the admin account in the auth system on first successful login.
      const { data: list } = await supabaseAdmin.auth.admin.listUsers({ perPage: 200 });
      let user = list?.users.find((u) => (u.email ?? "").toLowerCase() === adminEmail);

      if (!user) {
        const created = await supabaseAdmin.auth.admin.createUser({
          email: adminEmail,
          password: adminPassword,
          email_confirm: true,
        });
        if (created.data?.user) {
          user = created.data.user;
        }
      } else {
        await supabaseAdmin.auth.admin.updateUserById(user.id, { password: adminPassword });
      }

      if (user) {
        await supabaseAdmin
          .from("user_roles")
          .upsert({ user_id: user.id, role: "admin" }, { onConflict: "user_id,role" });
      }
    } catch (adminProvisionErr) {
      console.warn("Admin provisioning warning:", adminProvisionErr);
    }

    const { createClient } = await import("@supabase/supabase-js");
    const authClient = createClient(supabaseUrl, publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const signIn = await authClient.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });

    if (signIn.error || !signIn.data.session) {
      console.error("admin sign-in failed", signIn.error);
      throw new Error("LOGIN_FAILED");
    }

    return {
      accessToken: signIn.data.session.access_token,
      refreshToken: signIn.data.session.refresh_token,
    };
  });
