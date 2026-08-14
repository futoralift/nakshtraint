import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { FinalCta } from "@/components/home/FinalCta";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { getProjectById, type ProjectData } from "@/lib/portfolio-data";

export const Route = createFileRoute("/projects/$projectId")({
  loader: ({ params }) => {
    const project = getProjectById(params.projectId);
    if (!project) {
      throw notFound();
    }
    return { project };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.project
      ? `${loaderData.project.title} | Nakshtra Interior`
      : "Project Details | Nakshtra Interior";
    const desc =
      loaderData?.project?.tagline ??
      "Explore curated interior spaces designed by Nakshtra Interior.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: ProjectDetailPage,
  notFoundComponent: ProjectNotFound,
});

function ProjectNotFound() {
  return (
    <SiteLayout>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 py-24 text-center">
        <h1 className="display text-3xl text-forest">Project Not Found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The requested project could not be found or has been moved.
        </p>
        <Button asChild variant="secondary" className="mt-6">
          <Link to="/projects">Back to All Projects</Link>
        </Button>
      </div>
    </SiteLayout>
  );
}

// ---------------------------------------------------------------------------
// Lightbox (fullscreen viewer)
// ---------------------------------------------------------------------------
function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: { src: string; roomName: string }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const hasPrev = index > 0;
  const hasNext = index < images.length - 1;
  const current = images[index];

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
      {/* Close button */}
      <button
        type="button"
        aria-label="Close image viewer"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
      >
        <X className="size-5" />
      </button>

      {/* Prev button */}
      {hasPrev && (
        <button
          type="button"
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
        >
          <ChevronLeft className="size-6" />
        </button>
      )}

      {/* Current Image */}
      <figure
        className="flex max-h-[85svh] max-w-[90vw] flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={current?.src}
          src={current?.src}
          alt={current?.roomName ?? "Project photograph"}
          className="max-h-[80svh] max-w-full object-contain rounded-sm shadow-2xl"
          draggable={false}
        />
        {current?.roomName ? (
          <figcaption className="mt-3 label-caps text-white/70 text-[0.7rem] tracking-widest">
            {current.roomName}
          </figcaption>
        ) : null}
      </figure>

      {/* Next button */}
      {hasNext && (
        <button
          type="button"
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
        >
          <ChevronRight className="size-6" />
        </button>
      )}

      {/* Counter */}
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 label-caps text-white/50 text-[0.65rem]">
        {index + 1} / {images.length}
      </p>
    </div>
  );
}

function ProjectDetailPage() {
  const { project } = Route.useLoaderData();
  const [selectedRoomId, setSelectedRoomId] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Flatten all images for Lightbox navigation
  const allImages = useMemo(() => {
    const list: { src: string; roomName: string; roomId: string }[] = [];
    for (const room of project.rooms) {
      for (const src of room.images) {
        list.push({ src, roomName: room.name, roomId: room.id });
      }
    }
    return list;
  }, [project.rooms]);

  // Images currently visible based on room tab
  const activeImages = useMemo(() => {
    if (selectedRoomId === "all") return allImages;
    return allImages.filter((img) => img.roomId === selectedRoomId);
  }, [allImages, selectedRoomId]);

  // Safely manage body overflow for lightbox
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
    setLightboxIndex((i) => (i !== null && i < activeImages.length - 1 ? i + 1 : i));
  }, [activeImages.length]);

  return (
    <SiteLayout>
      {/* Header */}
      <section className="bg-forest-deep px-5 pb-16 pt-32 text-background sm:px-8 sm:pb-20 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 mb-6">
            <Link
              to="/projects"
              className="flex items-center gap-1.5 label-caps text-brass/80 hover:text-brass transition-colors group"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              All Projects
            </Link>
            <span className="text-background/40 text-xs">/</span>
            <span className="label-caps text-background/60">{project.title}</span>
          </div>

          <p className="label-caps text-brass">{project.location}</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1]">
            {project.title.toUpperCase()}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-background/80 sm:text-base">
            {project.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-xs text-background/70">
            <span className="rounded-full border border-background/20 px-3.5 py-1">
              {project.rooms.length} Designed Spaces
            </span>
            <span className="rounded-full border border-background/20 px-3.5 py-1">
              {allImages.length} High-Resolution Photographs
            </span>
          </div>
        </div>
      </section>

      {/* Room Tabs & Photo Gallery */}
      <section className="bg-secondary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Filter Tabs */}
          <div className="mb-10 sm:mb-12">
            <p className="label-caps text-wood mb-3">Filter by Room</p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedRoomId("all")}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                  selectedRoomId === "all"
                    ? "bg-forest text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                All Spaces ({allImages.length})
              </button>
              {project.rooms.map((room) => (
                <button
                  key={room.id}
                  type="button"
                  onClick={() => setSelectedRoomId(room.id)}
                  className={`rounded-full px-4 py-2 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    selectedRoomId === room.id
                      ? "bg-forest text-primary-foreground shadow-sm"
                      : "border border-border bg-card text-foreground hover:bg-accent"
                  }`}
                >
                  <span aria-hidden="true">{room.icon}</span>
                  <span>{room.name}</span>
                  <span className="opacity-60 text-[0.65rem]">({room.images.length})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Photo Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {activeImages.map((img, i) => (
              <button
                key={`${img.src}-${i}`}
                type="button"
                id={`gallery-img-${i}`}
                onClick={() => openLightbox(i)}
                className="group relative w-full overflow-hidden rounded-sm bg-[#1a1a1a] break-inside-avoid block focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={`${img.roomName} photograph`}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute inset-x-0 bottom-0 p-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="label-caps text-white text-[0.65rem] drop-shadow-sm">
                    {img.roomName}
                  </span>
                  <ZoomIn className="size-4 text-white drop-shadow" />
                </span>
              </button>
            ))}
          </div>

          {/* Bottom Back Button & Actions */}
          <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-border/60 pt-8">
            <Button asChild variant="outline">
              <Link to="/projects">
                <ArrowLeft className="mr-2 size-4" /> Back to All Projects
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/contact">Discuss this Project</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={activeImages}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
        />
      )}

      <FinalCta />
    </SiteLayout>
  );
}
