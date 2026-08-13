import type { ReactNode } from "react";

import { useReveal, useScrollProgress } from "@/hooks/use-cinematic";

type SceneProps = {
  id: string;
  image: string;
  alt: string;
  eyebrow: string;
  heading: string;
  body?: string;
  children?: ReactNode;
  align?: "left" | "right";
};

/**
 * A full-bleed cinematic scene. The image drifts slowly as the section passes
 * through the viewport, giving the impression of a camera moving through rooms.
 */
export function Scene({
  id,
  image,
  alt,
  eyebrow,
  heading,
  body,
  children,
  align = "left",
}: SceneProps) {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const text = useReveal<HTMLDivElement>(0.25);

  return (
    <section
      id={id}
      ref={ref}
      className="relative flex min-h-[92svh] items-end overflow-hidden bg-forest-deep"
    >
      <img
        src={image}
        alt={alt}
        width={1600}
        height={1008}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
        style={{
          transform: `scale(1.14) translate3d(0, ${(progress - 0.5) * -70}px, 0)`,
        }}
      />
      <div className="scene-veil absolute inset-0" />

      <div
        ref={text.ref}
        data-visible={text.visible}
        className={`reveal relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28 ${
          align === "right" ? "text-right" : ""
        }`}
      >
        <div className={align === "right" ? "ml-auto max-w-2xl" : "max-w-2xl"}>
          <p className="label-caps text-brass">{eyebrow}</p>
          <h2 className="mt-4 text-[clamp(1.9rem,4.6vw,3.6rem)] leading-[1.02] text-background">
            {heading}
          </h2>
          {body ? (
            <p className="mt-5 text-sm leading-relaxed text-background/80 sm:text-base">{body}</p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
