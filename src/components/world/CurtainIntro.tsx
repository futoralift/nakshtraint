import { useEffect, useRef } from "react";
import gsap from "gsap";

interface CurtainIntroProps {
  onComplete: () => void;
}

export function CurtainIntro({ onComplete }: CurtainIntroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 0.25,
      onComplete: () => {
        onComplete();
        if (wrapperRef.current) wrapperRef.current.style.display = "none";
      },
    });

    tl
      // Gold seam line flashes on first
      .fromTo(lineRef.current, { scaleY: 0 }, { scaleY: 1, duration: 0.4, ease: "expo.out" })
      // Logo zooms in from the center seam
      .fromTo(
        logoRef.current,
        { scale: 0.08, opacity: 0, filter: "blur(20px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "expo.out" },
        "-=0.2",
      )
      // Hold — let the user read
      .to({}, { duration: 0.85 })
      // Curtains slide apart revealing the 3D world
      .to(leftRef.current, {
        xPercent: -100,
        duration: 1.9,
        ease: "expo.inOut",
      })
      .to(rightRef.current, { xPercent: 100, duration: 1.9, ease: "expo.inOut" }, "<")
      // Gold line retracts
      .to(lineRef.current, { scaleY: 0, duration: 0.5, ease: "expo.in" }, "<0.1")
      // Logo fades and scales into the world
      .to(
        logoRef.current,
        { opacity: 0, scale: 2.5, filter: "blur(8px)", duration: 1.1, ease: "power3.out" },
        "<0.15",
      );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={wrapperRef} className="fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
      {/* Left curtain half */}
      <div
        ref={leftRef}
        className="absolute inset-y-0 left-0 w-1/2"
        style={{ background: "linear-gradient(to right, #020c04, #060f07)" }}
      />
      {/* Right curtain half */}
      <div
        ref={rightRef}
        className="absolute inset-y-0 right-0 w-1/2"
        style={{ background: "linear-gradient(to left, #020c04, #060f07)" }}
      />

      {/* Gold seam line at the center join */}
      <div
        ref={lineRef}
        className="absolute inset-y-0 left-1/2 -translate-x-px w-0.5 z-20 origin-top"
        style={{
          background: "linear-gradient(to bottom, transparent, oklch(0.72 0.075 84), transparent)",
        }}
      />

      {/* Logo centered */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4">
        <div ref={logoRef} className="flex flex-col items-center gap-4" style={{ opacity: 0 }}>
          <img
            src="/logo.png"
            alt="Nakshtra Interior"
            className="h-24 sm:h-28 w-auto object-contain"
            style={{
              filter: "brightness(0) invert(1) drop-shadow(0 0 60px oklch(0.72 0.075 84 / 0.8))",
            }}
          />
          <div className="flex flex-col items-center gap-2">
            <div className="h-px w-20 bg-brass/60" />
            <p
              className="label-caps text-brass"
              style={{ letterSpacing: "0.5em", fontSize: "0.6rem" }}
            >
              Interior Design Studio
            </p>
            <p
              className="label-caps text-background/40"
              style={{ letterSpacing: "0.35em", fontSize: "0.55rem" }}
            >
              Ambegaon BK · Pune
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
