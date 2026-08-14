import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { FinalCta } from "@/components/home/FinalCta";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { getRoomById } from "@/lib/portfolio-data";

export const Route = createFileRoute("/projects/$projectId/$roomId")({
  loader: ({ params }) => {
    const data = getRoomById(params.projectId, params.roomId);
    if (!data) {
      throw notFound();
    }
    return data;
  },
  head: ({ loaderData }) => {
    const title = loaderData
      ? `${loaderData.room.name} — ${loaderData.project.title} | Nakshtra Interior`
      : "Room Gallery | Nakshtra Interior";
    const desc = loaderData
      ? `View ${loaderData.room.name} photographs of ${loaderData.project.title} by Nakshtra Interior.`
      : "Interior space photographs.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: RoomGalleryPage,
  notFoundComponent: RoomNotFound,
});

function RoomNotFound() {
  return (
    <SiteLayout>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="display text-3xl text-forest">Space Not Found</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The requested space could not be found or has been moved.
        </p>
        <Button asChild variant="secondary" className="mt-6">
          <Link to="/projects">Back to All Projects</Link>
        </Button>
      </div>
    </SiteLayout>
  );
}

// ---------------------------------------------------------------------------
// Lightbox (fullscreen single image viewer)
// ---------------------------------------------------------------------------
function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
  roomName,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  roomName: string;
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
          key={images[index]}
          src={images[index]}
          alt={`${roomName} — photo ${index + 1}`}
          className="max-h-[80svh] max-w-full object-contain rounded-sm shadow-2xl"
          draggable={false}
        />
        <figcaption className="mt-3 label-caps text-white/70 text-[0.7rem] tracking-widest">
          {roomName} · Photo {index + 1} of {images.length}
        </figcaption>
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

function RoomGalleryPage() {
  const { project, room } = Route.useLoaderData();
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
    <SiteLayout>
      {/* Header */}
      <section className="bg-forest-deep px-4 pb-16 pt-32 text-background sm:px-6 lg:px-8 sm:pb-20 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
            <Link
              to="/projects"
              className="flex items-center gap-1.5 label-caps text-brass/80 hover:text-brass transition-colors group"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              All Projects
            </Link>
            <span className="text-background/40">/</span>
            <Link
              to="/projects/$projectId"
              params={{ projectId: project.id }}
              className="label-caps text-background/70 hover:text-background transition-colors"
            >
              {project.title}
            </Link>
            <span className="text-background/40">/</span>
            <span className="label-caps text-brass">{room.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-3xl" aria-hidden="true">
              {room.icon}
            </span>
            <p className="label-caps text-brass">{project.title} · {project.location}</p>
          </div>

          <h1 className="mt-4 max-w-3xl text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1]">
            {room.name.toUpperCase()}
          </h1>
          <p className="mt-4 text-sm text-background/80">
            {room.images.length} high-resolution photographs
          </p>
        </div>
      </section>

      {/* Gallery Section — 2 in a row in mobile, 4 in a row in laptop */}
      <section className="bg-secondary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* 2 in a row in mobile, 4 in a row in laptop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {room.images.map((src, i) => (
              <button
                key={src}
                type="button"
                id={`gallery-img-${i}`}
                onClick={() => openLightbox(i)}
                className="group relative overflow-hidden rounded-sm bg-[#1a1a1a] focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none cursor-pointer aspect-[4/3] w-full"
              >
                <img
                  src={src}
                  alt={`${room.name} — photograph ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-black/0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-black/35 transition-all duration-300">
                  <ZoomIn className="size-6 text-white drop-shadow" />
                </span>
              </button>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-border/60 pt-8">
            <Button asChild variant="outline">
              <Link to="/projects/$projectId" params={{ projectId: project.id }}>
                <ArrowLeft className="mr-2 size-4" /> Back to {project.title} Rooms
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/contact">Discuss this Space</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <Lightbox
          images={room.images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
          roomName={room.name}
        />
      )}

      <FinalCta />
    </SiteLayout>
  );
}
