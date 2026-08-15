import { useState, useEffect, useRef } from "react";
import { Star, Quote, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useReveal } from "@/hooks/use-cinematic";

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  projectType: string;
  content: string;
  rating: number;
}

export const REVIEWS: ReviewItem[] = [
  {
    id: "review-1",
    name: "Prasad Bodare",
    role: "Homeowner",
    projectType: "Complete Home Interior",
    rating: 5,
    content:
      "Working with Nakshatra interiors(Mr.Akshay Fulzade) has been an absolute delight! You truly took the time to understand my vision and lifestyle, translating it into a home that feels uniquely mine. The attention to detail, color choices, and spatial planning are spectacular. Thank you for turning my house into the dream home I’ve always wanted!",
  },
  {
    id: "review-2",
    name: "Akash Sharma",
    role: "Homeowner",
    projectType: "2BHK Flat Interior",
    rating: 5,
    content:
      "Dear Nakshatra Interior Team,\nThank you for the outstanding work on our 2BHK flat!\nKids’ room, Devghar, and modern kitchen designs are simply superb.\nSpace utilization and flexibility with changes impressed us greatly.\nSpecial thanks to Akshay Sir we’re loving our new home!",
  },
  {
    id: "review-3",
    name: "Sahadev Bite",
    role: "Homeowner",
    projectType: "2BHK Flat Interior",
    rating: 5,
    content:
      "I recently got my 2BHK flat designed by Nakshatra Interior, and the experience was fantastic.\nAkshay guided me throughout with great insights and professionalism.\nThe project was managed efficiently with high-quality work and timely delivery.\nThey were always available, making the process smooth and stress-free.\nHighly recommend Nakshatra Interior my new flat looks amazing!",
  },
];

export function ReviewsSection() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.15);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Responsive items count: Mobile (1 card), Tablet (2 cards), Desktop (3 cards)
  useEffect(() => {
    let resizeRafId: number | null = null;
    const updateVisibleCount = () => {
      const w = window.innerWidth;
      const count = w < 640 ? 1 : w < 1024 ? 2 : 3;
      setVisibleCount((prev) => (prev === count ? prev : count));
    };

    const onResize = () => {
      if (resizeRafId !== null) return;
      resizeRafId = window.requestAnimationFrame(() => {
        resizeRafId = null;
        updateVisibleCount();
      });
    };

    updateVisibleCount();
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      if (resizeRafId !== null) window.cancelAnimationFrame(resizeRafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const maxIndex = Math.max(0, REVIEWS.length - visibleCount);

  // Keep index within bounds on resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = () => {
    if (maxIndex === 0) return;
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    if (maxIndex === 0) return;
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.targetTouches[0]) {
      touchStartX.current = e.targetTouches[0].clientX;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.targetTouches[0]) {
      touchEndX.current = e.targetTouches[0].clientX;
    }
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
  };

  return (
    <section id="reviews" className="bg-background py-24 sm:py-32 border-t border-forest/15 overflow-hidden">
      <div ref={ref} data-visible={visible} className="reveal mx-auto max-w-7xl px-5 sm:px-8">
        {/* Header with Title and Rating Badge */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="label-caps text-wood">Client Reviews</p>
            <h2 className="display mt-4 max-w-2xl text-[clamp(1.8rem,4vw,3rem)] leading-tight text-forest">
              WHAT OUR CLIENTS SAY.
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

        {/* Carousel / Slider Track Container */}
        <div
          className="mt-12 overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
            }}
          >
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3 sm:px-3.5"
              >
                <article className="group relative flex h-full flex-col justify-between rounded-sm border border-forest/20 bg-card p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brass hover:shadow-xl">
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
                      <span className="inline-flex items-center gap-1 rounded-full bg-forest/10 px-2.5 py-1 text-[0.65rem] font-medium text-forest shrink-0">
                        <CheckCircle className="size-3 text-brass" />
                        Verified
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* 🎯 Centered Controls Below Cards (Middle): Previous Arrow + Dots + Next Arrow */}
        {maxIndex > 0 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous review"
              className="flex size-11 items-center justify-center rounded-full border border-forest/25 bg-card text-forest shadow-xs transition-all hover:bg-forest hover:text-white hover:border-forest hover:shadow-md active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2 px-2">
              {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Go to review ${dotIdx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === dotIdx
                      ? "w-8 bg-forest"
                      : "w-2.5 bg-forest/20 hover:bg-forest/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next review"
              className="flex size-11 items-center justify-center rounded-full border border-forest/25 bg-card text-forest shadow-xs transition-all hover:bg-forest hover:text-white hover:border-forest hover:shadow-md active:scale-95 cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
