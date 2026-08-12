import { Link } from "@tanstack/react-router";

import heroLiving from "@/assets/hero-living.jpg";
import { Button } from "@/components/ui/button";
import { useLightMode } from "@/hooks/use-cinematic";
import { useEffect, useState } from "react";

export function Hero() {
  const light = useLightMode();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (light) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      setOffset(Math.min(window.scrollY * 0.25, 220));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [light]);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-forest-deep">
      <img
        src={heroLiving}
        alt="Warmly lit modern living room interior designed by Nakshtra Interior in Pune"
        width={1920}
        height={1088}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 size-full scale-110 object-cover"
        style={{ transform: `translate3d(0, ${offset * 0.4}px, 0) scale(1.12)` }}
      />
      <div className="scene-veil absolute inset-0" />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-20 sm:px-8 sm:pb-24">
        <p className="label-caps text-brass">Enter the space · {`Ambegaon BK, Pune`}</p>
        <h1 className="mt-5 max-w-3xl text-[clamp(2.4rem,7vw,5.2rem)] leading-[0.95] text-background">
          DESIGNING SPACES.
          <br />
          CREATING EXPERIENCES.
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-background/80 sm:text-base">
          Thoughtfully designed interiors for the way you live, work and experience your
          space.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" variant="secondary">
            <a href="#living">Explore Nakshtra</a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/contact">Book a Consultation</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="label-caps text-[0.55rem] text-background/60">Scroll</span>
        <span className="h-10 w-px bg-background/40" />
      </div>
    </section>
  );
}
