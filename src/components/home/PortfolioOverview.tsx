import { Link } from "@tanstack/react-router";
import { PORTFOLIO_PROJECTS } from "@/lib/portfolio-data";
import { useReveal } from "@/hooks/use-cinematic";

function ComingSoonCard() {
  return (
    <div className="portfolio-card relative overflow-hidden bg-[#1a1a1a] flex flex-col items-center justify-center gap-3 cursor-default select-none">
      <span className="text-3xl opacity-40">🏗️</span>
      <span
        className="label-caps text-center text-xs text-muted-foreground/60 leading-relaxed px-4"
        style={{ letterSpacing: "0.12em" }}
      >
        New Project
        <br />
        Coming Soon
      </span>
    </div>
  );
}

export function PortfolioOverview({
  heading = "SELECTED WORK",
  intro,
}: {
  heading?: string;
  intro?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);

  return (
    <section className="bg-secondary py-24 sm:py-32" id="portfolio">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={ref} data-visible={visible} className="reveal mb-10 sm:mb-12">
          <p className="label-caps text-wood">Portfolio</p>
          <h2 className="mt-4 text-[clamp(1.8rem,4vw,3rem)] leading-tight">{heading}</h2>
          {intro ? (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{intro}</p>
          ) : null}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {PORTFOLIO_PROJECTS.map((project) => (
            <Link
              key={project.id}
              to="/projects/$projectId"
              params={{ projectId: project.id }}
              id={`project-card-${project.id}`}
              className="group relative overflow-hidden bg-[#1a1a1a] text-left focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none portfolio-card"
            >
              <img
                src={project.cover}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient overlay always visible at bottom */}
              <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              {/* Hover tint */}
              <span className="absolute inset-0 bg-forest/0 transition-colors duration-500 group-hover:bg-forest/25" />
              {/* Text */}
              <span className="absolute inset-x-0 bottom-0 p-5">
                <span className="label-caps text-brass block text-[0.6rem] mb-1">
                  {project.location}
                </span>
                <span className="display block text-lg text-background leading-snug">
                  {project.title}
                </span>
                <span className="label-caps text-background/70 text-[0.55rem] mt-1.5 flex items-center gap-1 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {project.rooms.length} spaces →
                </span>
              </span>
            </Link>
          ))}
          <ComingSoonCard />
        </div>
      </div>
    </section>
  );
}
