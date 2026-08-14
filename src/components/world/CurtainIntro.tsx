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

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Safety fallback: guaranteed cleanup after 4s so UI is never stuck on mobile
    const fallbackTimer = window.setTimeout(() => {
      onCompleteRef.current();
      if (wrapperRef.current) {
        wrapperRef.current.style.display = "none";
      }
    }, 3800);

    const tl = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        window.clearTimeout(fallbackTimer);
        onCompleteRef.current();
        if (wrapperRef.current) {
          wrapperRef.current.style.display = "none";
        }
      },
    });

    tl
      // Logo zooms in from the center
      .fromTo(
        logoRef.current,
        { scale: 0.08, opacity: 0, filter: "blur(20px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "expo.out" },
      )
      // Hold — let the user read
      .to({}, { duration: 0.6 })
      // Curtains slide apart revealing the 3D world
      .to(leftRef.current, {
        xPercent: -100,
        duration: 1.5,
        ease: "expo.inOut",
      })
      .to(rightRef.current, { xPercent: 100, duration: 1.5, ease: "expo.inOut" }, "<")
      // Logo fades and scales into the world
      .to(
        logoRef.current,
        { opacity: 0, scale: 2.2, filter: "blur(8px)", duration: 0.9, ease: "power3.out" },
        "<0.15",
      );

    return () => {
      window.clearTimeout(fallbackTimer);
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
    >
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
              Interior Design
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
