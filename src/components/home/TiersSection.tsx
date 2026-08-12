import { useReveal } from "@/hooks/use-cinematic";

const TIERS = [
  {
    name: "Budget",
    body: "Smart design with practical planning.",
  },
  {
    name: "Premium",
    body: "Elevated materials and refined detailing.",
  },
  {
    name: "Luxury",
    body: "Bespoke interiors with high-end finishes.",
  },
] as const;

const REASONS = [
  {
    title: "Thoughtful Design",
    body: "Every space begins with understanding the client's lifestyle and requirements.",
  },
  {
    title: "Functional Planning",
    body: "Beautiful interiors that remain practical for everyday use.",
  },
  {
    title: "End-to-End Execution",
    body: "From concept to completion.",
  },
  {
    title: "Personalized Approach",
    body: "Every project is designed around the client's space and vision.",
  },
] as const;

export function TiersSection() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);

  return (
    <section className="bg-background py-24 sm:py-32">
      <div ref={ref} data-visible={visible} className="reveal mx-auto max-w-7xl px-5 sm:px-8">
        <p className="label-caps text-wood">Positioning</p>
        <h2 className="mt-4 max-w-2xl text-[clamp(1.8rem,4vw,3rem)] leading-tight">
          A SPACE FOR EVERY VISION.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          We design to the requirement of the project — the approach adapts, the care
          does not.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {TIERS.map((tier, index) => (
            <div key={tier.name} className="border-t border-forest/25 pt-6">
              <span className="label-caps text-brass">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="display mt-4 text-3xl uppercase tracking-[0.16em] text-forest">
                {tier.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tier.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhySection() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);

  return (
    <section className="bg-accent py-24 sm:py-32">
      <div ref={ref} data-visible={visible} className="reveal mx-auto max-w-7xl px-5 sm:px-8">
        <p className="label-caps text-wood">Why Nakshtra</p>
        <h2 className="mt-4 max-w-2xl text-[clamp(1.8rem,4vw,3rem)] leading-tight">
          DESIGN, HANDLED PROPERLY.
        </h2>

        <dl className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {REASONS.map((reason) => (
            <div key={reason.title} className="border-l border-forest/25 pl-6">
              <dt className="text-xl text-forest">{reason.title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {reason.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
