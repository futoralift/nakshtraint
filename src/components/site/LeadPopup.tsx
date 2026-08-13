import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { LeadForm } from "@/components/site/LeadForm";
import { whatsappUrl } from "@/lib/site";

const STORAGE_KEY = "nakshtra_popup_state";

export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      dismissed = false;
    }
    if (dismissed) return;

    const timer = window.setTimeout(() => setOpen(true), 5000);
    return () => window.clearTimeout(timer);
  }, []);

  const remember = (value: "closed" | "submitted") => {
    try {
      sessionStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* storage unavailable — popup simply may reappear next load */
    }
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) remember(submitted ? "submitted" : "closed");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[92dvh] w-[calc(100vw-1.5rem)] max-w-lg overflow-y-auto rounded-none border-forest/20 p-0 sm:w-auto">
        {submitted ? (
          <div className="px-6 py-12 text-center sm:px-10">
            <DialogTitle className="display text-3xl text-forest">THANK YOU</DialogTitle>
            <DialogDescription className="mt-4 text-sm text-muted-foreground">
              Your enquiry has been received. Our team will get in touch with you shortly.
            </DialogDescription>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild>
                <a href={whatsappUrl()} target="_blank" rel="noreferrer noopener">
                  WhatsApp Us
                </a>
              </Button>
              <Button variant="outline" onClick={() => handleOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div className="px-6 py-8 sm:px-8">
            <p className="label-caps text-brass">Nakshtra Interior</p>
            <DialogTitle className="display mt-2 text-3xl leading-tight text-forest">
              Let&apos;s Design Your Space
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm text-muted-foreground">
              Tell us a little about your project and our team will get in touch with you.
            </DialogDescription>
            <div className="mt-6">
              <LeadForm
                onSuccess={() => {
                  setSubmitted(true);
                  remember("submitted");
                }}
              />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
