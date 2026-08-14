import { Play, Youtube, Sparkles } from "lucide-react";
import { useReveal } from "@/hooks/use-cinematic";
import { SITE, whatsappUrl } from "@/lib/site";

interface VideoItem {
  id: string;
  title: string;
  category: string;
  description: string;
}

const YOUTUBE_VIDEOS: VideoItem[] = [
  {
    id: "yVUeh4HNPHw",
    title: "Complete Home Interior Walkthrough",
    category: "Full Residence Tour",
    description: "Experience the refined detailing, custom storage, and ambient lighting across this newly completed Pune home.",
  },
  {
    id: "IPlgR9mH_u8",
    title: "Modern Living & Modular Kitchen Transformation",
    category: "Living & Modular Kitchen",
    description: "Explore sleek modular cabinetry, premium quartz countertops, and seamless open-plan living integration.",
  },
  {
    id: "SOt62F9RrDo",
    title: "Premium Bedroom & Space Optimization",
    category: "Master Bedroom & Storage",
    description: "A tranquil sanctuary featuring bespoke wardrobes, fluted paneling, and warm architectural lighting.",
  },
  {
    id: "cuRwkqI8FOI",
    title: "Turnkey Project Execution & Handover",
    category: "Site Walkthrough",
    description: "Take a step inside one of our turnkey handovers showcasing end-to-end craftsmanship and precision execution.",
  },
];

export function YoutubeSection() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);

  return (
    <section id="videos" className="relative bg-background py-20 sm:py-28 border-t border-forest/15">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={ref} data-visible={visible} className="reveal mb-12 sm:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-forest/5 px-3 py-1 text-xs font-medium text-forest mb-3">
              <Youtube className="size-3.5 text-red-600" />
              <span>Video Showcase · Pune Sites</span>
            </div>
            <h2 className="display text-[clamp(1.8rem,4vw,3rem)] leading-tight text-forest">
              WATCH OUR WORK COME TO LIFE.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Take a walk through our completed residential and commercial projects across Pune. See the textures, spatial flow, and fine execution in motion.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="size-4 text-brass" />
            <span>4K Site Walkthroughs</span>
          </div>
        </div>

        {/* 2x2 Responsive Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {YOUTUBE_VIDEOS.map((video, index) => (
            <article
              key={video.id}
              className="group relative flex flex-col overflow-hidden rounded-md border border-forest/15 bg-card/95 transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:shadow-xl"
            >
              {/* 16:9 Responsive Video Iframe Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-black/90">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 size-full border-0"
                />
              </div>

              {/* Video Info / Caption */}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="label-caps text-brass text-[0.625rem]">
                      0{index + 1} · {video.category}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded bg-forest/10 px-2 py-0.5 text-[0.65rem] font-medium text-forest">
                      <Play className="size-2.5 fill-forest" />
                      HD Tour
                    </span>
                  </div>

                  <h3 className="font-sans text-lg sm:text-xl font-semibold text-forest tracking-tight leading-snug">
                    {video.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 🌟 Authentic Brand/App Social Icons in the middle/bottom of YouTube section */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 border-t border-forest/15">
          <span className="text-xs font-semibold uppercase tracking-wider text-forest/75">
            Follow Us On Socials
          </span>

          <div className="flex items-center gap-3">
            {/* YouTube App Icon */}
            <a
              href="https://www.youtube.com/watch?v=yVUeh4HNPHw"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="YouTube Channel"
              className="flex size-9 items-center justify-center rounded-lg bg-card shadow-xs transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              <svg className="size-6" viewBox="0 0 24 24" fill="#FF0000">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                <polygon fill="#FFFFFF" points="9.545 15.568 15.795 12 9.545 8.432" />
              </svg>
            </a>

            {/* Instagram App Icon */}
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
              className="flex size-9 items-center justify-center rounded-lg bg-card shadow-xs transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              <svg className="size-6" viewBox="0 0 24 24">
                <defs>
                  <radialGradient id="ig-icon-grad" cx="0.2" cy="1" r="1">
                    <stop offset="0%" stopColor="#ffd521" />
                    <stop offset="25%" stopColor="#f50000" />
                    <stop offset="60%" stopColor="#b900b4" />
                    <stop offset="100%" stopColor="#7100e2" />
                  </radialGradient>
                </defs>
                <rect width="24" height="24" rx="6" fill="url(#ig-icon-grad)" />
                <circle cx="12" cy="12" r="4.2" stroke="#ffffff" strokeWidth="1.8" fill="none" />
                <circle cx="17.2" cy="6.8" r="1.1" fill="#ffffff" />
              </svg>
            </a>

            {/* Facebook App Icon */}
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Facebook"
              className="flex size-9 items-center justify-center rounded-lg bg-card shadow-xs transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              <svg className="size-6" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="6" fill="#1877F2" />
                <path d="M16.5 12h-3v8h-3.5v-8H8v-3h2V7.2C10 4.8 11.4 3.5 13.6 3.5c1 0 1.9.1 2.2.1v2.5h-1.5c-1.1 0-1.3.5-1.3 1.3V9h2.8l-.3 3z" fill="#ffffff" />
              </svg>
            </a>

            {/* WhatsApp App Icon */}
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="WhatsApp"
              className="flex size-9 items-center justify-center rounded-lg bg-card shadow-xs transition-transform duration-200 hover:scale-110 active:scale-95"
            >
              <svg className="size-6" viewBox="0 0 24 24" fill="none">
                <rect width="24" height="24" rx="6" fill="#25D366" />
                <path d="M16.7 13.8c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.64-1.19-1.42-1.33-1.66-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.57.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28" fill="#ffffff" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
