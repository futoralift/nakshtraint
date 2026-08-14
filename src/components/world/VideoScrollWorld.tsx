import { type MutableRefObject, useEffect, useRef } from "react";

interface VideoScrollWorldProps {
  scrollProgress: MutableRefObject<number>;
  frameCount?: number;
  ext?: string;
}

export function VideoScrollWorld({
  scrollProgress,
  frameCount = 220,
  ext = "webp",
}: VideoScrollWorldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(frameCount).fill(null));
  const firstImageRef = useRef<HTMLImageElement | null>(null);
  const smoothProgressRef = useRef(0);

  // Progressive frame loader: loads immediate frames first, then batches the rest smoothly
  useEffect(() => {
    let cancelled = false;
    imagesRef.current = new Array(frameCount).fill(null);

    // 1. Load first frame immediately with high priority
    const firstImg = new Image();
    firstImg.src = `/frames/frame_001.${ext}`;
    firstImg.onload = () => {
      if (!cancelled) {
        firstImageRef.current = firstImg;
        imagesRef.current[0] = firstImg;
      }
    };

    // 2. Load next initial batch (frames 2-25) for immediate scrolling
    const initialBatch = Math.min(25, frameCount);
    for (let i = 2; i <= initialBatch; i++) {
      const index = i - 1;
      const num = String(i).padStart(3, "0");
      const img = new Image();
      img.src = `/frames/frame_${num}.${ext}`;
      img.onload = () => {
        if (!cancelled) imagesRef.current[index] = img;
      };
    }

    // 3. Incrementally load remaining frames in small batches so network queue stays clear
    let currentIndex = initialBatch + 1;
    let timerId: number | null = null;

    const loadNextBatch = () => {
      if (cancelled || currentIndex > frameCount) return;
      const batchEnd = Math.min(currentIndex + 15, frameCount + 1);
      for (let i = currentIndex; i < batchEnd; i++) {
        const index = i - 1;
        const num = String(i).padStart(3, "0");
        const img = new Image();
        img.src = `/frames/frame_${num}.${ext}`;
        img.onload = () => {
          if (!cancelled) imagesRef.current[index] = img;
        };
      }
      currentIndex = batchEnd;
      if (currentIndex <= frameCount) {
        timerId = window.setTimeout(loadNextBatch, 30);
      }
    };

    timerId = window.setTimeout(loadNextBatch, 80);

    return () => {
      cancelled = true;
      if (timerId !== null) clearTimeout(timerId);
    };
  }, [frameCount, ext]);

  // 60FPS Hardware-Accelerated Canvas Render Loop with time-damped lerp and idle loop pause
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    let animId: number | null = null;
    let lastTime = performance.now();
    let isRunning = false;

    const render = (now: number) => {
      if (!ctx || !canvas) return;
      const delta = Math.min(0.1, (now - lastTime) / 1000);
      lastTime = now;

      const cw = canvas.width;
      const ch = canvas.height;
      const images = imagesRef.current;

      // Apply frame-rate independent time-damped exponential easing to scroll progress
      const targetP = Math.max(0, Math.min(1, scrollProgress.current));
      const diff = targetP - smoothProgressRef.current;

      if (Math.abs(diff) < 0.00005 || targetP >= 0.999) {
        smoothProgressRef.current = targetP >= 0.999 ? 1.0 : targetP;
      } else {
        smoothProgressRef.current += diff * (1 - Math.exp(-12 * delta));
      }
      const p = Math.min(1.0, Math.max(0.0, smoothProgressRef.current));

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
        if (indexHigh > indexLow && blend > 0.02 && p < 0.999) {
          const nextImg = images[indexHigh];
          if (
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
      }

      // Continue rendering if lerp is actively moving or continue loop
      if (Math.abs(targetP - smoothProgressRef.current) >= 0.00005) {
        animId = requestAnimationFrame(render);
      } else {
        isRunning = false;
        animId = null;
      }
    };

    const requestRender = () => {
      if (!isRunning) {
        isRunning = true;
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      }
    };

    requestRender();

    const onScrollOrResize = () => {
      requestRender();
    };

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
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
