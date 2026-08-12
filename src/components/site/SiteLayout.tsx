import type { ReactNode } from "react";

import { LeadPopup } from "@/components/site/LeadPopup";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
      <WhatsAppFloat />
      <LeadPopup />
    </div>
  );
}
