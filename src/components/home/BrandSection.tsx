import { Link } from "@tanstack/react-router";
import { Sparkles, Users, Award, CheckCircle2, ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/use-cinematic";
import { Button } from "@/components/ui/button";

export function BrandSection() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.12);

  return (
    <section id="brand" className="relative overflow-hidden bg-forest-deep text-background py-24 sm:py-32">
      {/* Subtle background glow effect */}
      <div className="pointer-events-none absolute -top-40 -right-40 size-96 rounded-full bg-brass/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 size-96 rounded-full bg-forest/40 blur-3xl" />

      <div ref={ref} data-visible={visible} className="reveal relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Brand Story & 30 Happy Clients Highlight */}
          <div className="lg:col-span-6 xl:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-brass/30 bg-brass/10 px-3.5 py-1 text-xs font-medium text-brass">
              <Sparkles className="size-3.5" />
              <span>The Nakshtra Journey</span>
            </div>

            <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] text-background">
              CRAFTING SPACES WITH PASSION &amp; PURPOSE.
            </h2>

            <div className="mt-6 space-y-4 text-sm sm:text-base leading-relaxed text-background/80">
              <p>
                Founded in Pune by <strong>Mr. Akshay Fulzade &amp; Mr. Pawan</strong>, Nakshtra Interior was born with a singular focus: translating each homeowner&apos;s unique vision, lifestyle, and aspirations into spaces they truly cherish.
              </p>
              <p>
                From meticulous 2D/3D spatial planning to premium modular kitchen fabrication, tranquil bedroom sanctuaries, custom Devghars, and kids&apos; playrooms, we oversee every detail from concept to final handover with zero stress.
              </p>
            </div>

            {/* Metrics & Milestones Grid */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 border-y border-white/15 py-6">
              {/* Highlight: 30 Happy Clients */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-brass">
                  <Users className="size-5" />
                  <span className="display text-3xl sm:text-4xl font-normal text-background tracking-tight">
                    30+
                  </span>
                </div>
                <span className="mt-1 text-xs font-medium uppercase tracking-wider text-brass">
                  Happy Clients
                </span>
                <span className="text-[0.7rem] text-background/60">Homes designed &amp; delivered</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-brass">
                  <Award className="size-5" />
                  <span className="display text-3xl sm:text-4xl font-normal text-background tracking-tight">
                    100%
                  </span>
                </div>
                <span className="mt-1 text-xs font-medium uppercase tracking-wider text-brass">
                  Quality Execution
                </span>
                <span className="text-[0.7rem] text-background/60">Turnkey precision</span>
              </div>

              <div className="col-span-2 sm:col-span-1 flex flex-col">
                <div className="flex items-center gap-2 text-brass">
                  <CheckCircle2 className="size-5" />
                  <span className="display text-3xl sm:text-4xl font-normal text-background tracking-tight">
                    Pune
                  </span>
                </div>
                <span className="mt-1 text-xs font-medium uppercase tracking-wider text-brass">
                  Local Expertise
                </span>
                <span className="text-[0.7rem] text-background/60">Ambegaon BK &amp; PCMC</span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild variant="secondary">
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/25 text-background hover:bg-white/10 hover:text-background">
                <Link to="/projects">Explore Projects</Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Single Feature Image */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="relative overflow-hidden rounded-lg border border-white/15 bg-black/20 shadow-2xl">
              <img
                src="/unnamed.webp"
                alt="The Nakshtra Journey - Interior Craftsmanship"
                className="w-full h-auto object-cover rounded-lg shadow-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
