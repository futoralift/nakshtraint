import { Link } from "@tanstack/react-router";
import { Sparkles, Users, Award, CheckCircle2, ArrowRight, ShieldCheck, Compass, Layers } from "lucide-react";
import { useReveal } from "@/hooks/use-cinematic";
import { Button } from "@/components/ui/button";

export function BrandSection() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.12);

  return (
    <section id="brand" className="relative overflow-hidden bg-forest-deep text-background py-24 sm:py-32">
      {/* Ambient background glow accents */}
      <div className="pointer-events-none absolute -top-40 -right-40 size-96 rounded-full bg-brass/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 size-96 rounded-full bg-forest/40 blur-3xl" />

      <div ref={ref} data-visible={visible} className="reveal relative mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-brass/30 bg-brass/10 px-4 py-1 text-xs font-medium text-brass">
            <Sparkles className="size-3.5" />
            <span>The Nakshtra Journey</span>
          </div>

          <h2 className="mt-5 text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.05] text-background">
            CRAFTING SPACES WITH PASSION &amp; PURPOSE.
          </h2>

          <p className="mt-6 text-base sm:text-lg leading-relaxed text-background/85">
            Founded in Pune by <strong>Mr. Akshay Fulzade</strong>, Nakshtra Interior was born with a singular mission: translating each homeowner&apos;s unique vision, lifestyle, and aspirations into spaces they truly cherish.
          </p>
        </div>

        {/* 4 Highlighted Milestone Metric Cards */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="rounded-sm border border-white/15 bg-white/5 p-6 backdrop-blur-xs text-center transition-all duration-300 hover:border-brass/40 hover:bg-white/10">
            <div className="flex justify-center text-brass mb-2">
              <Users className="size-6" />
            </div>
            <span className="display text-3xl sm:text-4xl font-normal text-background tracking-tight">
              200+
            </span>
            <span className="mt-1 block text-xs font-medium uppercase tracking-wider text-brass">
              Happy Clients
            </span>
            <span className="text-[0.75rem] text-background/60">Homes designed &amp; delivered</span>
          </div>

          <div className="rounded-sm border border-white/15 bg-white/5 p-6 backdrop-blur-xs text-center transition-all duration-300 hover:border-brass/40 hover:bg-white/10">
            <div className="flex justify-center text-brass mb-2">
              <ShieldCheck className="size-6" />
            </div>
            <span className="display text-3xl sm:text-4xl font-normal text-background tracking-tight">
              10+ Years
            </span>
            <span className="mt-1 block text-xs font-medium uppercase tracking-wider text-brass">
              Warranty Support
            </span>
            <span className="text-[0.75rem] text-background/60">Long-term peace of mind</span>
          </div>

          <div className="rounded-sm border border-white/15 bg-white/5 p-6 backdrop-blur-xs text-center transition-all duration-300 hover:border-brass/40 hover:bg-white/10">
            <div className="flex justify-center text-brass mb-2">
              <Award className="size-6" />
            </div>
            <span className="display text-3xl sm:text-4xl font-normal text-background tracking-tight">
              100%
            </span>
            <span className="mt-1 block text-xs font-medium uppercase tracking-wider text-brass">
              Turnkey Precision
            </span>
            <span className="text-[0.75rem] text-background/60">Flawless on-time delivery</span>
          </div>

          <div className="rounded-sm border border-white/15 bg-white/5 p-6 backdrop-blur-xs text-center transition-all duration-300 hover:border-brass/40 hover:bg-white/10">
            <div className="flex justify-center text-brass mb-2">
              <CheckCircle2 className="size-6" />
            </div>
            <span className="display text-3xl sm:text-4xl font-normal text-background tracking-tight">
              Pune
            </span>
            <span className="mt-1 block text-xs font-medium uppercase tracking-wider text-brass">
              Local Expertise
            </span>
            <span className="text-[0.75rem] text-background/60">Ambegaon BK &amp; PCMC</span>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/15 pt-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-brass">
              <Compass className="size-5" />
              <h3 className="font-semibold text-background text-base">Bespoke 3D Planning</h3>
            </div>
            <p className="text-sm text-background/75 leading-relaxed">
              Every detail is visualised in photo-realistic 3D before execution, ensuring layout perfection and complete clarity.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-brass">
              <Layers className="size-5" />
              <h3 className="font-semibold text-background text-base">End-to-End Execution</h3>
            </div>
            <p className="text-sm text-background/75 leading-relaxed">
              From modular kitchen fabrication, civil modifications, false ceiling to custom Devghars — we manage everything with zero stress.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 text-brass">
              <ShieldCheck className="size-5" />
              <h3 className="font-semibold text-background text-base">No Hidden Costs</h3>
            </div>
            <p className="text-sm text-background/75 leading-relaxed">
              Transparent, itemized BOQs with fixed quotation guarantees ensure complete financial confidence throughout your journey.
            </p>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Button asChild variant="secondary" size="lg">
            <Link to="/about">
              Learn More About Us
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white/25 text-background hover:bg-white/10 hover:text-background">
            <Link to="/projects">Explore Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
