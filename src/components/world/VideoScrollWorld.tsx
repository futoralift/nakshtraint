import { type MutableRefObject, useCallback, useEffect, useRef } from "react";

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
  const loadingStatusRef = useRef<boolean[]>(new Array(frameCount).fill(false));
  const firstImageRef = useRef<HTMLImageElement | null>(null);
  const smoothProgressRef = useRef(0);

  // Helper to load a single frame asynchronously
  const loadFrame = useCallback(
    (index: number) => {
      if (index < 0 || index >= frameCount) return;
      if (imagesRef.current[index] || loadingStatusRef.current[index]) return;

      loadingStatusRef.current[index] = true;
      const num = String(index + 1).padStart(3, "0");
      const img = new Image();
      img.decoding = "async";
      img.src = `/frames/frame_${num}.${ext}`;
      img.onload = () => {
        imagesRef.current[index] = img;
        if (index === 0 && !firstImageRef.current) {
          firstImageRef.current = img;
        }
      };
      img.onerror = () => {
        loadingStatusRef.current[index] = false;
      };
    },
    [frameCount, ext],
  );

  // Progressive Smart Frame Loader:
  // Phase 1: Load frame 1 immediately
  // Phase 2: Load keyframes (every 8th frame) so entire scroll duration has instant visuals
  // Phase 3: Load initial sequence (frames 1-15) for immediate first scroll
  // Phase 4: Slowly fill in remaining frames in idle background without choking mobile network/CPU
  useEffect(() => {
    let cancelled = false;
    imagesRef.current = new Array(frameCount).fill(null);
    loadingStatusRef.current = new Array(frameCount).fill(false);

    // 1. First frame immediately
    loadFrame(0);

    // 2. Load keyframes (every 8th frame: 0, 8, 16, 24... ~27 frames)
    const keyframeStep = 8;
    for (let i = 0; i < frameCount; i += keyframeStep) {
      loadFrame(i);
    }

    // 3. Load initial sequence (frames 1 to 15) for immediate first scroll
    for (let i = 1; i <= Math.min(15, frameCount - 1); i++) {
      loadFrame(i);
    }

    // 4. Background gentle filler: loads missing frames in gentle small batches
    let currentFillIndex = 0;
    let timerId: number | null = null;

    const fillNextBatch = () => {
      if (cancelled || currentFillIndex >= frameCount) return;

      let loadedCount = 0;
      while (currentFillIndex < frameCount && loadedCount < 4) {
        if (!imagesRef.current[currentFillIndex] && !loadingStatusRef.current[currentFillIndex]) {
          loadFrame(currentFillIndex);
          loadedCount++;
        }
        currentFillIndex++;
      }

      if (currentFillIndex < frameCount) {
        timerId = window.setTimeout(fillNextBatch, 100);
      }
    };

    // Start background fill after 300ms to let critical page assets finish loading
    timerId = window.setTimeout(fillNextBatch, 300);

    return () => {
      cancelled = true;
      if (timerId !== null) clearTimeout(timerId);
    };
  }, [frameCount, ext, loadFrame]);

  // Priority on-demand loader when user scrolls to a specific position (throttled via RAF)
  useEffect(() => {
    let demandRafId: number | null = null;
    let lastDemandedIndex = -1;

    const handleScrollDemand = () => {
      if (demandRafId !== null) return;
      demandRafId = window.requestAnimationFrame(() => {
        demandRafId = null;
        const p = Math.max(0, Math.min(1, scrollProgress.current));
        const targetIndex = Math.round(p * (frameCount - 1));
        if (Math.abs(targetIndex - lastDemandedIndex) < 2) return;
        lastDemandedIndex = targetIndex;

        // Load 6 frames before and 10 frames ahead of current position with high priority
        const start = Math.max(0, targetIndex - 6);
        const end = Math.min(frameCount - 1, targetIndex + 10);
        for (let i = start; i <= end; i++) {
          loadFrame(i);
        }
      });
    };

    window.addEventListener("scroll", handleScrollDemand, { passive: true });
    return () => {
      if (demandRafId !== null) window.cancelAnimationFrame(demandRafId);
      window.removeEventListener("scroll", handleScrollDemand);
    };
  }, [frameCount, loadFrame, scrollProgress]);

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
        smoothProgressRef.current += diff * (1 - Math.exp(-14 * delta));
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

      // Search forward if backward didn't find anything
      if (!activeImg || !activeImg.complete || activeImg.naturalWidth === 0) {
        for (let j = indexLow + 1; j < frameCount; j++) {
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
          if (nextImg && nextImg !== activeImg && nextImg.complete && nextImg.naturalWidth > 0) {
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

    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender, { passive: true });

    return () => {
      if (animId !== null) cancelAnimationFrame(animId);
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
    };
  }, [frameCount, loadFrame, scrollProgress]);

  // Canvas resize handler (capped at 1.5 dpr on mobile to preserve GPU bandwidth & memory)
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 size-full overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 size-full object-cover will-change-transform"
        style={{
          transform: "translateZ(0)",
          filter: "brightness(1.02) contrast(1.02)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/65 to-transparent" />
    </div>
  );
}
