import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

import { LeadForm } from "@/components/site/LeadForm";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { SITE, whatsappUrl } from "@/lib/site";

const TITLE = "Contact Nakshtra Interior | Book an Interior Consultation in Pune";
const DESCRIPTION =
  "Book an interior design consultation with Nakshtra Interior in Ambegaon BK, Pune. Call +91 8855044699, WhatsApp us or send your project requirements.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SiteLayout>
      <section className="bg-forest-deep px-5 pb-20 pt-32 text-background sm:px-8 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="label-caps text-brass">Contact</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.2rem,5.5vw,4rem)] leading-[1]">
            BOOK A CONSULTATION.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-background/80 sm:text-base">
            Share a few details about your space and our team will get in touch.
          </p>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-2xl">Studio details</h2>
            <ul className="mt-8 space-y-6 text-sm">
              <li className="flex gap-4">
                <Phone className="mt-0.5 size-4 shrink-0 text-wood" />
                <a href={`tel:${SITE.phoneTel}`} className="hover:text-forest">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-4">
                <MessageCircle className="mt-0.5 size-4 shrink-0 text-wood" />
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-forest"
                >
                  WhatsApp {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex gap-4">
                <Mail className="mt-0.5 size-4 shrink-0 text-wood" />
                <a href={`mailto:${SITE.email}`} className="break-all hover:text-forest">
                  {SITE.email}
                </a>
              </li>
              <li className="flex gap-4">
                <MapPin className="mt-0.5 size-4 shrink-0 text-wood" />
                <address className="not-italic leading-relaxed">{SITE.address}</address>
              </li>
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <a href={whatsappUrl()} target="_blank" rel="noreferrer noopener">
                  WhatsApp Us
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={`tel:${SITE.phoneTel}`}>Call Us</a>
              </Button>
            </div>
          </div>

          <div className="border border-border bg-card p-6 sm:p-10">
            {submitted ? (
              <div className="py-10 text-center">
                <h2 className="display text-3xl text-forest">THANK YOU</h2>
                <p className="mt-4 text-sm text-muted-foreground">
                  Your enquiry has been received. Our team will get in touch with you
                  shortly.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button asChild>
                    <a href={whatsappUrl()} target="_blank" rel="noreferrer noopener">
                      WhatsApp Us
                    </a>
                  </Button>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Send another enquiry
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-2xl">Tell us about your project</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fields marked * are required.
                </p>
                <div className="mt-8">
                  <LeadForm onSuccess={() => setSubmitted(true)} />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
