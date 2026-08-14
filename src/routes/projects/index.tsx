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
      <section className="bg-forest-deep px-4 pb-10 pt-24 text-background sm:px-6 lg:px-8 sm:pb-12 sm:pt-28">
        <div className="mx-auto max-w-7xl">
          <p className="label-caps text-brass text-[0.65rem]">Projects</p>
          <h1 className="mt-2 max-w-3xl text-[clamp(1.8rem,4vw,3rem)] leading-[1.05]">
            PRESENTATION BOARDS.
          </h1>
          <p className="mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-background/80">
            Select any project to explore its designed spaces and room-by-room details.
          </p>
        </div>
      </section>

      <PortfolioOverview heading="THE WORK" />
      <FinalCta />
    </SiteLayout>
  );
}
