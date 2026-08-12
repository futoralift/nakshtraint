import { createFileRoute } from "@tanstack/react-router";

import { FinalCta } from "@/components/home/FinalCta";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { BlueprintSection } from "@/components/home/BlueprintSection";
import { TiersSection } from "@/components/home/TiersSection";
import { SiteLayout } from "@/components/site/SiteLayout";

const TITLE = "Interior Design Services in Pune | Nakshtra Interior";
const DESCRIPTION =
  "Residential, commercial, office, modular kitchen, bedroom, turnkey and renovation interior design services by Nakshtra Interior, Ambegaon BK, Pune.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="bg-forest-deep px-5 pb-20 pt-32 text-background sm:px-8 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="label-caps text-brass">Services</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.2rem,5.5vw,4rem)] leading-[1]">
            EVERY DETAIL, DESIGNED.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-background/80 sm:text-base">
            Interior design and execution across homes, kitchens, bedrooms, offices and
            commercial spaces in Pune.
          </p>
        </div>
      </section>

      <ServicesGrid heading="OUR SERVICES" />
      <BlueprintSection />
      <TiersSection />
      <FinalCta />
    </SiteLayout>
  );
}
