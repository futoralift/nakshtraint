import { useReveal } from "@/hooks/use-cinematic";
import { SERVICES } from "@/lib/site";

export function ServicesGrid({ heading = "WHAT WE DESIGN" }: { heading?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.1);

  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div ref={ref} data-visible={visible} className="reveal">
          <p className="label-caps text-wood">Services</p>
          <h2 className="mt-4 max-w-2xl text-[clamp(1.8rem,4vw,3rem)] leading-tight">{heading}</h2>
          <div className="hairline mt-10" />
        </div>

        <ul className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <li key={service.slug} className="group relative bg-background">
              <article className="relative h-full overflow-hidden p-8 transition-[transform,background-color,box-shadow] duration-500 group-hover:-translate-y-1 group-hover:bg-forest group-hover:shadow-xl sm:p-10">
                <span className="label-caps text-brass/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-2xl text-foreground transition-colors duration-500 group-hover:text-background">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-background/75">
                  {service.description}
                </p>
                <span className="absolute inset-x-8 bottom-6 h-px origin-left scale-x-0 bg-brass transition-transform duration-500 group-hover:scale-x-100" />
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
