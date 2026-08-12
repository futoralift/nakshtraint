import { MessageCircle } from "lucide-react";

import { whatsappUrl } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with Nakshtra Interior on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-12 items-center justify-center rounded-full bg-forest text-primary-foreground shadow-lg ring-1 ring-brass/30 transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-brass"
    >
      <MessageCircle className="size-5" />
    </a>
  );
}
