import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { adminLogin } from "@/lib/leads.functions";

export function AdminLogin({ onSignedIn }: { onSignedIn: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    const form = new FormData(event.currentTarget);
    setLoading(true);
    setError(null);

    try {
      const session = await adminLogin({
        data: {
          email: String(form.get("email") ?? ""),
          password: String(form.get("password") ?? ""),
        },
      });
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: session.accessToken,
        refresh_token: session.refreshToken,
      });
      if (sessionError) throw sessionError;
      onSignedIn();
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "";
      if (message.includes("TOO_MANY_ATTEMPTS")) {
        setError("Too many attempts. Please try again in a few minutes.");
      } else if (typeof navigator !== "undefined" && !navigator.onLine) {
        setError("Connection issue. Please check your internet connection and try again.");
      } else {
        setError("Invalid email or password.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-forest-deep px-5 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <img
            src="/logo.png"
            alt="Nakshtra Interior"
            className="mx-auto h-12 w-auto object-contain"
          />
        </div>

        <div className="mt-10 border border-background/15 bg-card p-8">
          <h1 className="display text-2xl text-forest">Admin Portal</h1>
          <p className="mt-2 text-xs text-muted-foreground">Authorised access only.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Email</Label>
              <Input id="admin-email" name="email" type="email" autoComplete="username" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>

            {error ? (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
