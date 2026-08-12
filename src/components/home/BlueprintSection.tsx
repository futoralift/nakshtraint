import { useReveal } from "@/hooks/use-cinematic";

const STEPS = ["Discover", "Design", "Plan", "Execute", "Deliver"] as const;

/**
 * The realistic interior dissolves into an architectural drawing: lines draw
 * themselves as the section enters the viewport.
 */
export function BlueprintSection() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.25);

  return (
    <section
      ref={ref}
      data-visible={visible}
      className="relative overflow-hidden bg-forest-deep py-24 text-background sm:py-32"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 size-full opacity-40"
      >
        <g
          fill="none"
          stroke="var(--brass)"
          strokeWidth="0.5"
          pathLength={1}
          data-visible={visible}
          className="draw-line"
        >
          <rect x="60" y="60" width="380" height="240" />
          <rect x="440" y="60" width="300" height="140" />
          <rect x="440" y="200" width="300" height="100" />
          <rect x="60" y="300" width="220" height="140" />
          <rect x="280" y="300" width="460" height="140" />
          <path d="M60 180 H200 M200 60 V180 M440 130 H740 M280 300 V440" />
          <circle cx="200" cy="180" r="26" />
          <path d="M60 470 H740 M60 462 V478 M740 462 V478" />
          <path d="M770 60 V300 M762 60 H778 M762 300 H778" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal max-w-2xl" data-visible={visible}>
          <p className="label-caps text-brass">The Process</p>
          <h2 className="mt-4 text-[clamp(1.9rem,4.6vw,3.6rem)] leading-tight">
            FROM IDEA TO SPACE.
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-background/75">
            Nakshtra Interior handles complete projects — planning, drawings, materials
            and on-site execution — not just decoration.
          </p>
        </div>

        <ol className="mt-16 grid gap-px border border-background/15 bg-background/10 sm:grid-cols-5">
          {STEPS.map((step, index) => (
            <li key={step} className="bg-forest-deep px-5 py-8">
              <span className="label-caps text-brass/70">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="display mt-3 text-xl uppercase tracking-[0.14em]">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
