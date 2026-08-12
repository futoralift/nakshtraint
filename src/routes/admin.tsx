import { createFileRoute } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  // Client-only: the session lives in the browser, and lead data must never be
  // rendered on the server for an unauthenticated request.
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Portal | Nakshtra Interior" },
      { name: "description", content: "Private lead management portal for Nakshtra Interior." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin Portal | Nakshtra Interior" },
      { property: "og:description", content: "Private lead management portal." },
    ],
  }),
  component: AdminRoute,
});

function AdminRoute() {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<"checking" | "signed-out" | "signed-in">("checking");

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setStatus(data.session ? "signed-in" : "signed-out");
    });
    return () => {
      active = false;
    };
  }, []);

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    setStatus("signed-out");
  };

  if (status === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-forest-deep">
        <p className="label-caps text-background/70">Verifying access…</p>
      </div>
    );
  }

  if (status === "signed-out") {
    return <AdminLogin onSignedIn={() => setStatus("signed-in")} />;
  }

  return <AdminDashboard onSignOut={handleSignOut} />;
}
