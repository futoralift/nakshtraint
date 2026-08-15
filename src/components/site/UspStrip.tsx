import { Sparkles, ShieldCheck, Clock, BadgePercent } from "lucide-react";

const USP_ITEMS = [
  { text: "10+ Years of Warranty", icon: ShieldCheck },
  { text: "No Hidden Costs", icon: BadgePercent },
  { text: "Fastest Delivery", icon: Clock },
];

export function UspStrip() {
  return (
    <div
      role="region"
      aria-label="Key Highlights"
      className="relative z-40 w-full overflow-hidden bg-[#183a2c] py-1 sm:py-1.5 border-b border-white/15 text-white select-none shadow-xs"
    >
      <div className="flex items-center">
        <div className="animate-marquee-ltr flex shrink-0 items-center">
          {/* First set of repetitions */}
          {[...Array(4)].map((_, setIdx) => (
            <div key={`set-1-${setIdx}`} className="flex items-center shrink-0">
              {USP_ITEMS.map((item, idx) => (
                <div key={`item-1-${setIdx}-${idx}`} className="flex items-center">
                  <span className="mx-3 sm:mx-6 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium tracking-wide sm:tracking-wider uppercase whitespace-nowrap text-white leading-none">
                    <item.icon className="size-3 sm:size-3.5 text-brass shrink-0" />
                    <span>{item.text}</span>
                  </span>
                  <span className="text-brass/70 text-[10px] sm:text-xs select-none">·</span>
                </div>
              ))}
            </div>
          ))}

          {/* Second set of repetitions for seamless looping */}
          {[...Array(4)].map((_, setIdx) => (
            <div key={`set-2-${setIdx}`} className="flex items-center shrink-0" aria-hidden="true">
              {USP_ITEMS.map((item, idx) => (
                <div key={`item-2-${setIdx}-${idx}`} className="flex items-center">
                  <span className="mx-3 sm:mx-6 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium tracking-wide sm:tracking-wider uppercase whitespace-nowrap text-white leading-none">
                    <item.icon className="size-3 sm:size-3.5 text-brass shrink-0" />
                    <span>{item.text}</span>
                  </span>
                  <span className="text-brass/70 text-[10px] sm:text-xs select-none">·</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
