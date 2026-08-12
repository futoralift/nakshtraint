import { Link } from "@tanstack/react-router";

import bedroom from "@/assets/scene-bedroom.jpg";
import { Button } from "@/components/ui/button";
import { SITE, whatsappUrl } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-forest-deep">
      <img
        src={bedroom}
        alt="Warmly lit bedroom interior at night"
        width={1600}
        height={1008}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover opacity-55"
      />
      <div className="scene-veil absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-5 py-28 text-center sm:px-8 sm:py-36">
        <p className="label-caps text-brass">Let&apos;s begin</p>
        <h2 className="mx-auto mt-5 max-w-3xl text-[clamp(2rem,5.5vw,4rem)] leading-[1] text-background">
          YOUR SPACE IS WAITING.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-background/80 sm:text-base">
          Let&apos;s turn your vision into a space you&apos;ll love coming home to.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Book a Consultation</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={whatsappUrl()} target="_blank" rel="noreferrer noopener">
              WhatsApp Us
            </a>
          </Button>
        </div>
        <p className="mt-8 text-sm text-background/70">
          Call{" "}
          <a href={`tel:${SITE.phoneTel}`} className="text-brass hover:underline">
            {SITE.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
