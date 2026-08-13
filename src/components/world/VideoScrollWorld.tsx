import { type MutableRefObject, useEffect, useRef } from "react";

interface VideoScrollWorldProps {
  scrollProgress: MutableRefObject<number>;
  frameCount?: number;
  ext?: string;
}

export function VideoScrollWorld({
  scrollProgress,
  frameCount = 220,
  ext = "jpg",
}: VideoScrollWorldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(frameCount).fill(null));
  const firstImageRef = useRef<HTMLImageElement | null>(null);
  const smoothProgressRef = useRef(0);

  // Preload lightweight 80KB frame images into RAM
  useEffect(() => {
    let cancelled = false;

    // Load first frame immediately for 0ms render
    const firstImg = new Image();
    firstImg.src = `/frames/frame_001.${ext}`;
    firstImg.onload = () => {
      if (!cancelled) firstImageRef.current = firstImg;
    };

    // Preload remaining frames
    for (let i = 1; i <= frameCount; i++) {
      const index = i - 1;
      const num = String(i).padStart(3, "0");
      const img = new Image();
      img.src = `/frames/frame_${num}.${ext}`;

      img.onload = () => {
        if (!cancelled) {
          imagesRef.current[index] = img;
        }
      };
    }

    return () => {
      cancelled = true;
    };
  }, [frameCount, ext]);

  // 60FPS Hardware-Accelerated Canvas Render Loop with ultra-smooth lerp momentum physics
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    let animId: number;

    const render = () => {
      if (!ctx) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const images = imagesRef.current;

      // Apply smooth lerp easing curve to scroll progress for butter-smooth camera movement
      const targetP = Math.max(0, Math.min(1, scrollProgress.current));
      smoothProgressRef.current += (targetP - smoothProgressRef.current) * 0.12;
      const p = smoothProgressRef.current;

      const exactIndex = p * (frameCount - 1);
      const indexLow = Math.floor(exactIndex);
      const indexHigh = Math.min(frameCount - 1, Math.ceil(exactIndex));
      const blend = exactIndex - indexLow;

      // Find active image frame
      let activeImg: HTMLImageElement | null = images[indexLow] ?? null;

      // Search backward for nearest ready frame if current frame is loading
      if (!activeImg || !activeImg.complete || activeImg.naturalWidth === 0) {
        for (let j = indexLow - 1; j >= 0; j--) {
          const candidate = images[j];
          if (candidate && candidate.complete && candidate.naturalWidth > 0) {
            activeImg = candidate;
            break;
          }
        }
      }

      // Fallback to first frame if no other frame is ready yet
      if (!activeImg || !activeImg.complete || activeImg.naturalWidth === 0) {
        activeImg = firstImageRef.current;
      }

      // Draw primary active frame
      if (activeImg && activeImg.complete && activeImg.naturalWidth > 0) {
        const iw = activeImg.naturalWidth;
        const ih = activeImg.naturalHeight;
        const scale = Math.max(cw / iw, ch / ih);
        const dw = iw * scale;
        const dh = ih * scale;
        const dx = (cw - dw) / 2;
        const dy = (ch - dh) / 2;

        ctx.globalAlpha = 1.0;
        ctx.drawImage(activeImg, dx, dy, dw, dh);

        // Sub-frame smooth alpha crossfade for sub-pixel frame transitions
        const nextImg = images[indexHigh];
        if (
          blend > 0.01 &&
          nextImg &&
          nextImg !== activeImg &&
          nextImg.complete &&
          nextImg.naturalWidth > 0
        ) {
          ctx.globalAlpha = blend;
          ctx.drawImage(nextImg, dx, dy, dw, dh);
          ctx.globalAlpha = 1.0;
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [frameCount, scrollProgress]);

  // High DPI Canvas resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 z-0 size-full overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full object-cover will-change-transform"
        style={{
          transform: "translateZ(0)",
          filter: "brightness(1.02) contrast(1.02)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/65 to-transparent" />
    </div>
  );
}
