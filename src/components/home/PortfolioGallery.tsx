import { useEffect, useState } from "react";
import { X } from "lucide-react";

import living from "@/assets/hero-living.jpg";
import kitchen from "@/assets/scene-kitchen.jpg";
import bedroom from "@/assets/scene-bedroom.jpg";
import office from "@/assets/scene-office.jpg";
import commercial from "@/assets/scene-commercial.jpg";
import renovation from "@/assets/scene-renovation.jpg";
import { useReveal } from "@/hooks/use-cinematic";

type Project = {
  title: string;
  category: string;
  image: string;
  alt: string;
  span?: string;
};

const CATEGORIES = [
  "All",
  "Residential",
  "Kitchen",
  "Bedroom",
  "Office",
  "Commercial",
  "Renovation",
] as const;

const PROJECTS: Project[] = [
  {
    title: "Living Room, Ambegaon BK",
    category: "Residential",
    image: living,
    alt: "Living room with forest green feature wall and wood panelling",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Modular Kitchen, Pune",
    category: "Kitchen",
    image: kitchen,
    alt: "Deep green modular kitchen with brass handles and warm task lighting",
  },
  {
    title: "Master Bedroom",
    category: "Bedroom",
    image: bedroom,
    alt: "Warmly lit bedroom with wood headboard panelling and linen bedding",
  },
  {
    title: "Workspace Interior",
    category: "Office",
    image: office,
    alt: "Modern office interior with green acoustic panels and wood desks",
    span: "lg:col-span-2",
  },
  {
    title: "Retail Environment",
    category: "Commercial",
    image: commercial,
    alt: "Retail showroom with green display walls, wood fixtures and brass rails",
  },
  {
    title: "Apartment Renovation",
    category: "Renovation",
    image: renovation,
    alt: "Renovated dining area with arched plaster niche and green wainscoting",
  },
];

export function PortfolioGallery({
  heading = "SELECTED WORK",
  intro,
}: {
  heading?: string;
  intro?: string;
}) {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");
  const [open, setOpen] = useState<Project | null>(null);
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);

  const shown = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <section className="bg-secondary py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={ref} data-visible={visible} className="reveal">
          <p className="label-caps text-wood">Portfolio</p>
          <h2 className="mt-4 text-[clamp(1.8rem,4vw,3rem)] leading-tight">{heading}</h2>
          {intro ? (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{intro}</p>
          ) : null}
        </div>

        <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active === category}
              onClick={() => setActive(category)}
              className={`label-caps px-4 py-2 transition-colors ${
                active === category
                  ? "bg-forest text-primary-foreground"
                  : "bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-8 grid auto-rows-[220px] gap-4 sm:grid-cols-2 sm:auto-rows-[260px] lg:grid-cols-4">
          {shown.map((project) => (
            <button
              key={project.title}
              type="button"
              onClick={() => setOpen(project)}
              className={`group relative overflow-hidden bg-forest-deep text-left focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none ${project.span ?? ""}`}
            >
              <img
                src={project.image}
                alt={project.alt}
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-forest/0 transition-colors duration-500 group-hover:bg-forest/45" />
              <span className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="label-caps block text-brass">{project.category}</span>
                <span className="display mt-1 block text-xl text-background">{project.title}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest-deep/95 p-4"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            aria-label="Close project viewer"
            onClick={() => setOpen(null)}
            className="absolute right-5 top-5 text-background/80 hover:text-background"
          >
            <X className="size-6" />
          </button>
          <figure className="max-h-full w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={open.image} alt={open.alt} className="max-h-[75svh] w-full object-contain" />
            <figcaption className="mt-4 text-center">
              <span className="label-caps text-brass">{open.category}</span>
              <span className="display mt-1 block text-2xl text-background">{open.title}</span>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </section>
  );
}
