import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { FinalCta } from "@/components/home/FinalCta";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { getProjectById } from "@/lib/portfolio-data";

export const Route = createFileRoute("/projects/$projectId/")({
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
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
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

function ProjectDetailPage() {
  const { project } = Route.useLoaderData();

  return (
    <SiteLayout>
      {/* Header */}
      <section className="bg-forest-deep px-4 pb-16 pt-32 text-background sm:px-6 lg:px-8 sm:pb-20 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 mb-6 text-xs">
            <Link
              to="/projects"
              className="flex items-center gap-1.5 label-caps text-brass/80 hover:text-brass transition-colors group"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              All Projects
            </Link>
            <span className="text-background/40">/</span>
            <span className="label-caps text-background/60">{project.title}</span>
          </div>

          <p className="label-caps text-brass">{project.location}</p>
          <h1 className="mt-4 max-w-3xl text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1]">
            {project.title.toUpperCase()}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-background/80 sm:text-base">
            {project.tagline}
          </p>

          <div className="mt-6 flex items-center gap-3 text-xs text-background/70">
            <span className="rounded-full border border-background/20 px-3.5 py-1">
              {project.rooms.length} Designed Rooms
            </span>
          </div>
        </div>
      </section>

      {/* Rooms Grid Section — 2 in a row in mobile, 4 in a row in laptop */}
      <section className="bg-secondary py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <p className="label-caps text-wood">Rooms & Spaces</p>
            <h2 className="mt-2 text-[clamp(1.6rem,3.5vw,2.4rem)] leading-tight">
              SELECT A ROOM TO VIEW IMAGES
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Click on any room to explore all high-resolution photos.
            </p>
          </div>

          {/* 2 in a row in mobile, 4 in a row in laptop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {project.rooms.map((room) => (
              <Link
                key={room.id}
                to="/projects/$projectId/$roomId"
                params={{ projectId: project.id, roomId: room.id }}
                id={`room-card-${room.id}`}
                className="group relative overflow-hidden bg-[#1a1a1a] text-left focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none portfolio-card rounded-sm"
              >
                <img
                  src={room.cover}
                  alt={room.name}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dark gradient overlay */}
                <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                {/* Hover tint */}
                <span className="absolute inset-0 bg-forest/0 transition-colors duration-500 group-hover:bg-forest/25" />
                {/* Room Info */}
                <span className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
                  <span className="text-xl sm:text-2xl block mb-1" aria-hidden="true">
                    {room.icon}
                  </span>
                  <span className="display block text-sm sm:text-lg text-background leading-snug">
                    {room.name}
                  </span>
                  <span className="label-caps text-brass text-[0.55rem] sm:text-[0.6rem] mt-1.5 flex items-center gap-1 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {room.images.length} photos →
                  </span>
                </span>
              </Link>
            ))}
          </div>

          {/* Bottom Back Button */}
          <div className="mt-14 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-border/60 pt-8">
            <Button asChild variant="outline">
              <Link to="/projects">
                <ArrowLeft className="mr-2 size-4" /> All Projects
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/contact">Discuss this Project</Link>
            </Button>
          </div>
        </div>
      </section>

      <FinalCta />
    </SiteLayout>
  );
}
