import { Star, Quote, CheckCircle } from "lucide-react";
import { useReveal } from "@/hooks/use-cinematic";

export interface ReviewItem {
  name: string;
  role: string;
  projectType: string;
  content: string;
  rating: number;
}

export const REVIEWS: ReviewItem[] = [
  {
    name: "Prasad Bodare",
    role: "Homeowner",
    projectType: "Complete Home Interior",
    rating: 5,
    content:
      "Working with Nakshatra interiors(Mr.Akshay Fulzade) has been an absolute delight! You truly took the time to understand my vision and lifestyle, translating it into a home that feels uniquely mine. The attention to detail, color choices, and spatial planning are spectacular. Thank you for turning my house into the dream home I’ve always wanted!",
  },
  {
    name: "Tushar Gurav",
    role: "Homeowner",
    projectType: "2BHK Flat Interior",
    rating: 5,
    content:
      "Dear Nakshatra Interior Team,\nThank you for the outstanding work on our 2BHK flat!\nKids’ room, Devghar, and modern kitchen designs are simply superb.\nSpace utilization and flexibility with changes impressed us greatly.\nSpecial thanks to Akshay & Pawan Sir we’re loving our new home!",
  },
  {
    name: "Sahadev Bite",
    role: "Homeowner",
    projectType: "2BHK Flat Interior",
    rating: 5,
    content:
      "I recently got my 2BHK flat designed by Nakshatra Interior, and the experience was fantastic.\nAkshay and Pawan guided me throughout with great insights and professionalism.\nThe project was managed efficiently with high-quality work and timely delivery.\nThey were always available, making the process smooth and stress-free.\nHighly recommend Nakshatra Interior my new flat looks amazing!",
  },
];

export function ReviewsSection() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);

  return (
    <section id="reviews" className="bg-background py-24 sm:py-32 border-t border-forest/15">
      <div ref={ref} data-visible={visible} className="reveal mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="label-caps text-wood">Client Reviews</p>
            <h2 className="mt-4 max-w-2xl text-[clamp(1.8rem,4vw,3rem)] leading-tight text-forest">
              WORDS FROM OUR CLIENTS.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Real experiences from homeowners across Pune who trusted Nakshtra Interior with their living spaces.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-sm border border-forest/15 bg-card/60 px-4 py-2.5 backdrop-blur-xs self-start md:self-auto">
            <div className="flex text-brass">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-brass text-brass" />
              ))}
            </div>
            <div className="h-4 w-px bg-forest/20" />
            <span className="text-xs font-medium text-forest">5.0 Star Rating</span>
          </div>
        </div>

        <div className="hairline mt-10" />

        {/* 1 in a row on mobile, 3 in a row on laptop / desktop */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <article
              key={review.name}
              className="group relative flex flex-col justify-between rounded-sm border border-forest/20 bg-card p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:shadow-xl"
            >
              <div>
                {/* Header: Stars & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-1" aria-label={`${review.rating} out of 5 stars`}>
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="size-4 fill-brass text-brass" />
                    ))}
                  </div>
                  <Quote className="size-6 text-brass/40 transition-colors group-hover:text-brass" />
                </div>

                {/* Review Text */}
                <blockquote className="mt-6 text-sm leading-relaxed text-foreground/85 whitespace-pre-line font-sans">
                  &ldquo;{review.content.trim()}&rdquo;
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="mt-8 border-t border-forest/15 pt-5">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-forest text-base tracking-wide uppercase">
                      {review.name}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{review.projectType}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-forest/10 px-2.5 py-1 text-[0.65rem] font-medium text-forest">
                    <CheckCircle className="size-3 text-brass" />
                    Verified
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
