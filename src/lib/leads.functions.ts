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

export const leadInputSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120).transform(sanitize),
  phone: phoneSchema,
  email: z.string().trim().toLowerCase().email("Enter a valid email address.").max(160),
  location: z.string().trim().min(2, "Please enter your location.").max(160).transform(sanitize),
  projectTimeline: z.string().trim().max(60).optional().or(z.literal("")),
  serviceInterest: z.array(z.string().trim().max(60)).max(10).optional(),
  requirements: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .transform((v) => (v ? sanitize(v) : v)),
});

export type LeadInput = z.input<typeof leadInputSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: LeadInput) => leadInputSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: allowed } = await supabaseAdmin.rpc("bump_rate_limit", {
      _key: `lead:${data.email}`,
      _limit: 5,
      _window_seconds: 3600,
    });
    if (allowed === false) {
      throw new Error("TOO_MANY_REQUESTS");
    }

    const services = (data.serviceInterest ?? []).filter(Boolean);
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data: existing } = await supabaseAdmin
      .from("leads")
      .select("id, submission_count, requirements, service_interest")
      .or(`phone.eq.${data.phone},email.eq.${data.email}`)
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existing) {
      const mergedServices = Array.from(
        new Set([...(existing.service_interest ?? []), ...services]),
      );
      const { error } = await supabaseAdmin
        .from("leads")
        .update({
          full_name: data.fullName,
          phone: data.phone,
          email: data.email,
          location: data.location,
          project_timeline: data.projectTimeline || null,
          service_interest: mergedServices,
          requirements: data.requirements || existing.requirements || null,
          submission_count: (existing.submission_count ?? 1) + 1,
        })
        .eq("id", existing.id);
      if (error) {
        console.error("lead update failed", error);
        throw new Error("SUBMIT_FAILED");
      }
      return { ok: true as const, duplicate: true as const };
    }

    const { error } = await supabaseAdmin.from("leads").insert({
      full_name: data.fullName,
      phone: data.phone,
      email: data.email,
      location: data.location,
      project_timeline: data.projectTimeline || null,
      service_interest: services,
      requirements: data.requirements || null,
      source: "Website Popup",
    });

    if (error) {
      console.error("lead insert failed", error);
      throw new Error("SUBMIT_FAILED");
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
    const adminEmail = (process.env["ADMIN_EMAIL"] ?? "").trim().toLowerCase();
    const adminPassword = process.env["ADMIN_PASSWORD"] ?? "";
    const supabaseUrl = process.env["SUPABASE_URL"]!;
    const publishableKey = process.env["SUPABASE_PUBLISHABLE_KEY"]!;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: allowed } = await supabaseAdmin.rpc("bump_rate_limit", {
      _key: `login:${data.email}`,
      _limit: 8,
      _window_seconds: 900,
    });
    if (allowed === false) {
      throw new Error("TOO_MANY_ATTEMPTS");
    }

    if (
      !adminEmail ||
      !adminPassword ||
      !constantTimeEquals(data.email, adminEmail) ||
      !constantTimeEquals(data.password, adminPassword)
    ) {
      throw new Error("INVALID_CREDENTIALS");
    }

    // Provision the admin account in the auth system on first successful login.
    const { data: list } = await supabaseAdmin.auth.admin.listUsers({ perPage: 200 });
    let user = list?.users.find((u) => (u.email ?? "").toLowerCase() === adminEmail);

    if (!user) {
      const created = await supabaseAdmin.auth.admin.createUser({
        email: adminEmail,
        password: adminPassword,
        email_confirm: true,
      });
      if (created.error || !created.data.user) {
        console.error("admin provisioning failed", created.error);
        throw new Error("LOGIN_FAILED");
      }
      user = created.data.user;
    } else {
      await supabaseAdmin.auth.admin.updateUserById(user.id, { password: adminPassword });
    }

    await supabaseAdmin
      .from("user_roles")
      .upsert({ user_id: user.id, role: "admin" }, { onConflict: "user_id,role" });

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
