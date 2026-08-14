import { createFileRoute } from "@tanstack/react-router";

import renovationImg from "@/assets/scene-renovation.webp";
import { FinalCta } from "@/components/home/FinalCta";
import { WhySection } from "@/components/home/TiersSection";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SITE } from "@/lib/site";

const TITLE = "About Nakshtra Interior | Interior Designers, Ambegaon BK Pune";
const DESCRIPTION =
  "Nakshtra Interior is an interior design studio based in Ambegaon Budruk, Pune, designing and executing residential, office and commercial interiors.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-forest-deep px-5 pb-20 pt-32 text-background sm:px-8 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="label-caps text-brass">About</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.2rem,5.5vw,4rem)] leading-[1]">
            A STUDIO BUILT AROUND THE CLIENT.
          </h1>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <h2 className="text-[clamp(1.6rem,3.4vw,2.4rem)] leading-tight">
              Design, planning and execution under one roof.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Nakshtra Interior is an interior design studio based in {SITE.serviceArea}. We work
              across residential, office and commercial spaces — from a single modular kitchen to a
              complete turnkey project.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Every project begins with the way you use your space. From there we plan the layout,
              detail the materials and carry the work through to handover.
            </p>
            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              <div className="border-t border-forest/25 pt-4">
                <dt className="label-caps text-wood">Studio</dt>
                <dd className="mt-2 text-sm leading-relaxed">{SITE.address}</dd>
              </div>
              <div className="border-t border-forest/25 pt-4">
                <dt className="label-caps text-wood">Service Area</dt>
                <dd className="mt-2 text-sm leading-relaxed">{SITE.serviceArea}</dd>
              </div>
            </dl>
          </div>
          <img
            src={renovationImg}
            alt="Renovated dining space with arched niche and green wainscoting by Nakshtra Interior"
            width={1600}
            height={1008}
            loading="lazy"
            decoding="async"
            className="w-full object-cover"
          />
        </div>
      </section>

      <WhySection />
      <FinalCta />
    </SiteLayout>
  );
}
