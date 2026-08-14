import { createFileRoute } from "@tanstack/react-router";

import { FinalCta } from "@/components/home/FinalCta";
import { PortfolioOverview } from "@/components/home/PortfolioOverview";
import { SiteLayout } from "@/components/site/SiteLayout";

const TITLE = "Interior Design Projects in Pune | Nakshtra Interior";
const DESCRIPTION =
  "Browse interior design work by Nakshtra Interior — residential, modular kitchen, bedroom, office, commercial and renovation projects in Pune.";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: ProjectsIndexPage,
});

function ProjectsIndexPage() {
  return (
    <SiteLayout>
      <section className="bg-forest-deep px-5 pb-20 pt-32 text-background sm:px-8 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="label-caps text-brass">Projects</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2.2rem,5.5vw,4rem)] leading-[1]">
            PRESENTATION BOARDS.
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-background/80 sm:text-base">
            Select any project to explore its designed spaces and room-by-room details.
          </p>
        </div>
      </section>

      <PortfolioOverview heading="THE WORK" />
      <FinalCta />
    </SiteLayout>
  );
}
