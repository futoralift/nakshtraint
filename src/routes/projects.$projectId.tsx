import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { FinalCta } from "@/components/home/FinalCta";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { getProjectById } from "@/lib/portfolio-data";

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

function ProjectDetailPage() {
  const { project } = Route.useLoaderData();

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
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-background/80 sm:text-base">
            {project.tagline}
          </p>
        </div>
      </section>

      {/* Rooms Grid Section */}
      <section className="bg-secondary py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-10 sm:mb-12">
            <p className="label-caps text-wood">Spaces</p>
            <h2 className="mt-3 text-[clamp(1.6rem,3.5vw,2.5rem)] leading-tight">
              EXPLORE ROOMS & SPACES
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Select any space to view high-resolution photographs and detailing.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
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
                <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-5">
                  <span className="text-xl block mb-1.5" aria-hidden="true">
                    {room.icon}
                  </span>
                  <span className="display block text-lg sm:text-xl text-background leading-tight">
                    {room.name}
                  </span>
                  <span className="label-caps text-brass/90 text-[0.65rem] mt-2 block">
                    {room.images.length} photographs →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </SiteLayout>
  );
}
