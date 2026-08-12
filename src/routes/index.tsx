import { createFileRoute } from "@tanstack/react-router";

import kitchenImg from "@/assets/scene-kitchen.jpg";
import bedroomImg from "@/assets/scene-bedroom.jpg";
import officeImg from "@/assets/scene-office.jpg";
import livingImg from "@/assets/hero-living.jpg";
import { BlueprintSection } from "@/components/home/BlueprintSection";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { PortfolioGallery } from "@/components/home/PortfolioGallery";
import { Scene } from "@/components/home/Scene";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TiersSection, WhySection } from "@/components/home/TiersSection";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

const TITLE = "Nakshtra Interior | Interior Designers in Pune";
const DESCRIPTION =
  "Nakshtra Interior creates residential, commercial, office and modular kitchen interiors in Pune with thoughtful design and end-to-end execution.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />

      <Scene
        id="living"
        image={livingImg}
        alt="Living room interior with green feature wall and wood panelling in Pune"
        eyebrow="Residential Interiors"
        heading="INTERIORS THAT FEEL LIKE YOU."
        body="From thoughtful planning to the final detail, Nakshtra Interior creates spaces that balance beauty, comfort and functionality."
      />

      <Scene
        id="kitchen"
        image={kitchenImg}
        alt="Modular kitchen with deep green cabinetry and warm under-cabinet lighting"
        eyebrow="Modular Kitchens"
        heading="DESIGNED TO WORK BEAUTIFULLY."
        body="Storage that fits the way you cook, finishes that hold up to daily use, and lighting layered where you need it."
        align="right"
      >
        <Button asChild variant="secondary">
          <a href="#work">Explore Kitchen Designs</a>
        </Button>
      </Scene>

      <Scene
        id="bedroom"
        image={bedroomImg}
        alt="Bedroom interior with warm lighting and wood headboard panelling"
        eyebrow="Bedroom Interiors"
        heading="YOUR SPACE TO UNWIND."
        body="Warm light, calm materials and considered storage — bedrooms designed to feel quiet."
      />

      <Scene
        id="office"
        image={officeImg}
        alt="Modern office interior with green acoustic panels and wood workstations"
        eyebrow="Office & Commercial Interiors"
        heading="SPACES THAT WORK AS HARD AS YOU DO."
        body="Workspaces and commercial environments planned around movement, function and brand identity."
        align="right"
      />

      <ServicesGrid />
      <BlueprintSection />
      <div id="work">
        <PortfolioGallery intro="A look at the environments we design — presented as project boards rather than a gallery of thumbnails." />
      </div>
      <TiersSection />
      <WhySection />
      <FinalCta />
    </SiteLayout>
  );
}
