import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

import { CurtainIntro } from "@/components/world/CurtainIntro";
import { VideoScrollWorld } from "@/components/world/VideoScrollWorld";
import { PortfolioOverview } from "@/components/home/PortfolioOverview";
import { YoutubeSection } from "@/components/home/YoutubeSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { TiersSection, WhySection } from "@/components/home/TiersSection";
import { BrandSection } from "@/components/home/BrandSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FinalCta } from "@/components/home/FinalCta";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

const TITLE = "Nakshtra Interior | Premium Interior Design Studio Pune";
const DESCRIPTION =
  "Step into Nakshtra Interior — a Pune-based studio crafting residential, modular kitchen, bedroom, office and commercial interiors with end-to-end execution.";

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
  const scrollProgress = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset scroll position to top on initial mount
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }

    // Lenis smooth scroll configuration (smooth wheel on desktop, native touch on mobile)
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.0,
      syncTouch: false,
    });

    let maxScroll = 1;
    const updateDimensions = () => {
      if (trackRef.current) {
        maxScroll = Math.max(1, trackRef.current.offsetHeight - window.innerHeight);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions, { passive: true });

    lenis.on("scroll", (e: { scroll: number }) => {
      if (maxScroll > 0) {
        scrollProgress.current = Math.min(1, Math.max(0, e.scroll / maxScroll));
      }
    });

    let rafId: number;
    const update = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <SiteLayout>
      {/* 🎭 Opening Curtain Animation */}
      <CurtainIntro onComplete={() => {}} />

      {/* 🎥 220 Ultra-Lightweight Compressed Image Sequence Background */}
      <VideoScrollWorld scrollProgress={scrollProgress} frameCount={220} ext="webp" />

      {/* 📜 Scrollable overlay story track */}
      <div ref={trackRef} className="relative z-10">
        {/* ── HERO OVERLAY (Room 0: Entry / Wide View) — 100vh perfectly positioned ── */}
        <section className="relative flex h-[100svh] w-full flex-col justify-center px-5 pb-16 sm:justify-end sm:px-8 sm:pb-20">
          <div className="mx-auto w-full max-w-7xl">
            <p className="label-caps text-brass">Nakshtra Interior · Pune</p>
            <h1 className="mt-4 max-w-3xl text-[clamp(2.4rem,6.5vw,5rem)] leading-[0.95] text-background">
              DESIGNING SPACES.
              <br />
              CREATING EXPERIENCES.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-background/80 sm:text-base">
              Thoughtfully designed interiors for the way you live, work and experience your space
              in Pune.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary">
                <a href="#portfolio">View Portfolio</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">Book a Consultation</Link>
              </Button>
            </div>
          </div>
          <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
            <span className="label-caps text-[0.55rem] text-background/60">Scroll to Enter</span>
            <span className="h-8 w-px bg-background/40" />
          </div>
        </section>

        {/* ── ROOM 1: LIVING ROOM ── */}
        <section id="living" className="flex h-[100svh] w-full items-center px-5 sm:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-xl rounded-sm border border-white/20 bg-black/60 p-8 backdrop-blur-md sm:p-12">
              <p className="label-caps text-brass">01 · Residential Interiors</p>
              <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.5rem)] leading-none text-background">
                INTERIORS THAT FEEL LIKE YOU.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-background/80 sm:text-base">
                From thoughtful planning to the final detail, Nakshtra Interior creates living
                spaces that balance beauty, comfort and everyday functionality.
              </p>
              <div className="mt-8">
                <Button asChild variant="secondary">
                  <Link to="/projects">View Projects</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── ROOM 2: KITCHEN ── */}
        <section
          id="kitchen"
          className="flex h-[100svh] w-full items-center justify-end px-5 sm:px-8"
        >
          <div className="mx-auto w-full max-w-7xl flex justify-end">
            <div className="max-w-xl rounded-sm border border-white/20 bg-black/60 p-8 backdrop-blur-md sm:p-12">
              <p className="label-caps text-brass">02 · Modular Kitchens</p>
              <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.5rem)] leading-none text-background">
                DESIGNED TO WORK BEAUTIFULLY.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-background/80 sm:text-base">
                Storage that fits the way you cook, finishes that hold up to daily use, and task
                lighting layered where you need it most.
              </p>
              <div className="mt-8">
                <Button asChild variant="secondary">
                  <Link to="/services">Kitchen Solutions</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── ROOM 3: BEDROOM ── */}
        <section id="bedroom" className="flex h-[100svh] w-full items-center px-5 sm:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-xl rounded-sm border border-white/20 bg-black/60 p-8 backdrop-blur-md sm:p-12">
              <p className="label-caps text-brass">03 · Bedroom Interiors</p>
              <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.5rem)] leading-none text-background">
                YOUR SPACE TO UNWIND.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-background/80 sm:text-base">
                Warm light, calm materials and considered storage — bedrooms designed to feel quiet
                and restful.
              </p>
            </div>
          </div>
        </section>

        {/* ── ROOM 4: OFFICE ── */}
        <section
          id="office"
          className="flex h-[100svh] w-full items-center justify-end px-5 sm:px-8"
        >
          <div className="mx-auto w-full max-w-7xl flex justify-end">
            <div className="max-w-xl rounded-sm border border-white/20 bg-black/60 p-8 backdrop-blur-md sm:p-12">
              <p className="label-caps text-brass">04 · Office & Commercial</p>
              <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.5rem)] leading-none text-background">
                SPACES THAT WORK AS HARD AS YOU DO.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-background/80 sm:text-base">
                Workspaces and commercial environments planned around movement, productivity and
                your brand identity.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ── SOLID GROUND CONTENT SECTIONS (Scrolls over Video Canvas) ── */}
      <div className="relative z-20 bg-background">
        <div id="portfolio">
          <div id="work">
            <PortfolioOverview intro="A look at the environments we design — select any project to view rooms and spaces." />
          </div>
        </div>
        <YoutubeSection />
        <ServicesGrid />
        <TiersSection />
        <BrandSection />
        <ReviewsSection />
        <WhySection />
        <FinalCta />
      </div>
    </SiteLayout>
  );
}

