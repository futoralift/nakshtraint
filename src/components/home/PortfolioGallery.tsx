import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { PORTFOLIO_PROJECTS, type ProjectData, type RoomData } from "@/lib/portfolio-data";
import { useReveal } from "@/hooks/use-cinematic";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type View = "projects" | "rooms" | "gallery";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function RoomIcon({ icon, className }: { icon: string; className?: string }) {
  return (
    <span aria-hidden="true" className={className}>
      {icon}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Coming-Soon placeholder card
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Lightbox (single image overlay with prev / next)
// ---------------------------------------------------------------------------
function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close */}
      <button
        type="button"
        aria-label="Close image viewer"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
      >
        <X className="size-5" />
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          type="button"
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="size-6" />
        </button>
      )}

      {/* Image */}
      <figure
        className="flex max-h-[90svh] max-w-[90vw] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={images[index]}
          src={images[index]}
          alt={`Gallery image ${index + 1}`}
          className="max-h-[90svh] max-w-full object-contain rounded-sm shadow-2xl"
          draggable={false}
        />
      </figure>

      {/* Next */}
      {hasNext && (
        <button
          type="button"
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="size-6" />
        </button>
      )}

      {/* Counter */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 label-caps text-white/40 text-[0.6rem]">
        {index + 1} / {images.length}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Level 3 — Room Gallery
// ---------------------------------------------------------------------------
function RoomGallery({
  project,
  room,
  onBack,
}: {
  project: ProjectData;
  room: RoomData;
  onBack: () => void;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Safely manage body overflow for lightbox with cleanup on unmount
  useEffect(() => {
    if (lightboxIndex === null) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxIndex]);

  const openLightbox = useCallback((i: number) => {
    setLightboxIndex(i);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i < room.images.length - 1 ? i + 1 : i));
  }, [room.images.length]);

  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8">
        <button
          type="button"
          onClick={onBack}
          id="portfolio-back-to-rooms"
          className="flex items-center gap-1.5 label-caps text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          {project.title}
        </button>
        <span className="text-muted-foreground/40 text-xs">/</span>
        <span className="label-caps text-wood">{room.name}</span>
      </div>

      <h3 className="display text-[clamp(1.6rem,3.5vw,2.4rem)] leading-tight mb-1">{room.name}</h3>
      <p className="text-sm text-muted-foreground mb-8">{room.images.length} photos</p>

      {/* Masonry-style grid */}
      <div className="columns-2 sm:columns-3 gap-3 space-y-3">
        {room.images.map((src, i) => (
          <button
            key={src}
            type="button"
            id={`gallery-img-${i}`}
            onClick={() => openLightbox(i)}
            className="group relative w-full overflow-hidden rounded-sm bg-[#1a1a1a] break-inside-avoid block mb-3 focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none"
          >
            <img
              src={src}
              alt={`${room.name} — view ${i + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-black/0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-black/30 transition-all duration-300">
              <ZoomIn className="size-6 text-white drop-shadow" />
            </span>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={room.images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Level 2 — Rooms Grid
// ---------------------------------------------------------------------------
function RoomsGrid({
  project,
  onSelectRoom,
  onBack,
}: {
  project: ProjectData;
  onSelectRoom: (room: RoomData) => void;
  onBack: () => void;
}) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8">
        <button
          type="button"
          onClick={onBack}
          id="portfolio-back-to-projects"
          className="flex items-center gap-1.5 label-caps text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
          All Projects
        </button>
        <span className="text-muted-foreground/40 text-xs">/</span>
        <span className="label-caps text-wood">{project.title}</span>
      </div>

      <div className="mb-10">
        <h3 className="display text-[clamp(1.6rem,3.5vw,2.4rem)] leading-tight">{project.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{project.location}</p>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
          {project.tagline}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.rooms.map((room) => (
          <button
            key={room.id}
            type="button"
            id={`room-card-${room.id}`}
            onClick={() => onSelectRoom(room)}
            className="group relative w-full overflow-hidden bg-[#1a1a1a] text-left focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none portfolio-card"
            style={{ display: "block" }}
          >
            <img
              src={room.cover}
              alt={room.name}
              loading="lazy"
              decoding="async"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <span className="absolute inset-x-0 bottom-0 p-4">
              <RoomIcon icon={room.icon} className="text-lg block mb-1" />
              <span className="display block text-base text-background leading-tight">
                {room.name}
              </span>
              <span className="label-caps text-brass/80 text-[0.6rem] mt-1 block">
                {room.images.length} photos
              </span>
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Level 1 — Projects Grid
// ---------------------------------------------------------------------------
function ProjectsGrid({ onSelectProject }: { onSelectProject: (project: ProjectData) => void }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {PORTFOLIO_PROJECTS.map((project) => (
        <button
          key={project.id}
          type="button"
          id={`project-card-${project.id}`}
          onClick={() => onSelectProject(project)}
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
            <span className="label-caps text-background/50 text-[0.55rem] mt-1.5 block opacity-0 translate-y-1 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
              {project.rooms.length} spaces →
            </span>
          </span>
        </button>
      ))}
      <ComingSoonCard />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main PortfolioGallery — orchestrates the 3-level drill-down
// ---------------------------------------------------------------------------
export function PortfolioGallery({
  heading = "SELECTED WORK",
  intro,
}: {
  heading?: string;
  intro?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);

  const [view, setView] = useState<View>("projects");
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<RoomData | null>(null);

  // Scroll to section top on each level transition (not to page top)
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollToSection = useCallback(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const goToRooms = useCallback(
    (project: ProjectData) => {
      setSelectedProject(project);
      setView("rooms");
      scrollToSection();
    },
    [scrollToSection],
  );

  const goToGallery = useCallback(
    (room: RoomData) => {
      setSelectedRoom(room);
      setView("gallery");
      scrollToSection();
    },
    [scrollToSection],
  );

  const goBack = useCallback(() => {
    if (view === "gallery") {
      setView("rooms");
      setSelectedRoom(null);
    } else if (view === "rooms") {
      setView("projects");
      setSelectedProject(null);
    }
    scrollToSection();
  }, [view, scrollToSection]);

  // Escape key: go back one level
  useEffect(() => {
    if (view === "projects") return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") goBack();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [view, goBack]);

  return (
    <section ref={sectionRef} className="bg-secondary py-24 sm:py-32" id="portfolio">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section header — always visible */}
        <div ref={ref} data-visible={visible} className="reveal mb-10 sm:mb-12">
          <p className="label-caps text-wood">Portfolio</p>
          <h2 className="mt-4 text-[clamp(1.8rem,4vw,3rem)] leading-tight">{heading}</h2>
          {intro ? (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{intro}</p>
          ) : null}
        </div>

        {/* Level 1 */}
        {view === "projects" && <ProjectsGrid onSelectProject={goToRooms} />}

        {/* Level 2 */}
        {view === "rooms" && selectedProject && (
          <RoomsGrid project={selectedProject} onSelectRoom={goToGallery} onBack={goBack} />
        )}

        {/* Level 3 */}
        {view === "gallery" && selectedProject && selectedRoom && (
          <RoomGallery project={selectedProject} room={selectedRoom} onBack={goBack} />
        )}
      </div>
    </section>
  );
}
