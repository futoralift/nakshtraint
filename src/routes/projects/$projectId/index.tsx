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
      <section className="bg-forest-deep px-4 pb-8 pt-24 text-background sm:px-6 lg:px-8 sm:pb-10 sm:pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 mb-4 text-xs">
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

          <p className="label-caps text-brass text-[0.65rem]">{project.location}</p>
          <h1 className="mt-2 max-w-3xl text-[clamp(1.8rem,4vw,2.8rem)] leading-[1.05]">
            {project.title.toUpperCase()}
          </h1>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-background/80 sm:text-sm">
            {project.tagline}
          </p>

          <div className="mt-4 flex items-center gap-3 text-xs text-background/70">
            <span className="rounded-full border border-background/20 px-3 py-0.5 text-[0.7rem]">
              {project.rooms.length} Designed Rooms
            </span>
          </div>
        </div>
      </section>

      {/* Rooms Grid Section — 2 in a row in mobile, 4 in a row in laptop */}
      <section className="bg-secondary py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 sm:mb-8">
            <p className="label-caps text-wood text-[0.65rem]">Rooms & Spaces</p>
            <h2 className="mt-1.5 text-[clamp(1.4rem,3vw,2rem)] leading-tight">
              SELECT A ROOM TO VIEW IMAGES
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Click on any room to explore all high-resolution photos.
            </p>
          </div>

          {/* 1 in a row with image on top and name below */}
          <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
            {project.rooms.map((room) => (
              <Link
                key={room.id}
                to="/projects/$projectId/$roomId"
                params={{ projectId: project.id, roomId: room.id }}
                id={`room-card-${room.id}`}
                className="group block overflow-hidden rounded-md border border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-forest focus-visible:outline-none"
              >
                {/* Image on top */}
                <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#1a1a1a]">
                  <img
                    src={room.cover}
                    alt={room.name}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Name & Details down below */}
                <div className="p-4 sm:p-5 flex items-center justify-between bg-card">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl" aria-hidden="true">
                      {room.icon}
                    </span>
                    <div>
                      <h3 className="display text-lg sm:text-xl text-foreground group-hover:text-forest transition-colors leading-tight">
                        {room.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {room.images.length} High-Resolution Photographs
                      </p>
                    </div>
                  </div>
                  <span className="label-caps text-forest text-xs font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Gallery →
                  </span>
                </div>
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
