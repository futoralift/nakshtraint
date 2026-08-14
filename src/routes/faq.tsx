import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, HelpCircle, Phone, MessageCircle, Sparkles, ShieldCheck, Clock, BadgePercent } from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { SITE, whatsappUrl } from "@/lib/site";

const TITLE = "Frequently Asked Questions | Nakshtra Interior Pune";
const DESCRIPTION =
  "Find answers to common questions about interior design services, modular kitchens, 10+ year warranty, pricing transparency, and turnkey delivery in Pune with Nakshtra Interior.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: FaqPage,
});

interface FaqItem {
  id: string;
  category: "General" | "Process & Timeline" | "Pricing & Warranty" | "Materials & Turnkey";
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: "faq-1",
    category: "General",
    question: "What interior design services does Nakshtra Interior provide?",
    answer:
      "We provide end-to-end interior design and turnkey execution across Pune. This includes 2D & 3D space planning, modular kitchen design and fabrication, master & guest bedroom interiors, living room entertainment units, customized Devghar temples, kids' rooms, false ceilings, architectural lighting, painting, and civil modifications.",
  },
  {
    id: "faq-2",
    category: "Pricing & Warranty",
    question: "What warranty do you offer on interior installations?",
    answer:
      "We offer up to 10+ years of warranty on all our modular cabinetry, core plywood woodwork, and branded hardware fittings (such as Hettich and Hafele). We also provide dedicated post-handover support for any maintenance assistance.",
  },
  {
    id: "faq-3",
    category: "Pricing & Warranty",
    question: "Are there any hidden costs or surprise charges during execution?",
    answer:
      "No. We believe in 100% price transparency. Once your personalized 3D design and detailed Bill of Quantities (BOQ) are finalized and approved, the project cost is locked. There are zero hidden costs or unapproved price escalations during execution.",
  },
  {
    id: "faq-4",
    category: "Process & Timeline",
    question: "What is the typical timeline for completing a 2BHK or 3BHK home interior?",
    answer:
      "Our turnkey projects are built for speed and precision. Standard 2BHK and 3BHK home interiors are typically delivered and handed over within 35 to 45 working days from final 3D design approval, backed by strict milestone tracking.",
  },
  {
    id: "faq-5",
    category: "Process & Timeline",
    question: "How does the Nakshtra Interior design process work step-by-step?",
    answer:
      "Our process has 5 straightforward steps:\n1. Consultation & Site Visit: We understand your lifestyle, aesthetic goals, and take precise on-site measurements.\n2. Spatial Layout & 3D Visualisation: We craft 2D floorplans and photorealistic 3D renders of every room.\n3. Material & Hardware Selection: We guide you through physical laminate, acrylic, quartz, and hardware samples.\n4. Precision Factory Fabrication: Components are precision-machined in factory environments for seamless edges.\n5. On-site Installation & Handover: Our skilled craftsmen assemble, finish, and conduct a thorough quality inspection before handing over the keys.",
  },
  {
    id: "faq-6",
    category: "Materials & Turnkey",
    question: "Do you handle turnkey civil, electrical, plumbing, and painting work?",
    answer:
      "Yes. As a full turnkey interior design studio, we handle everything under one roof: civil modifications, electrical rewiring, plumbing alterations, gypsum false ceilings, CNC partition screens, and Asian Paints Royale wall finishing. You do not need to coordinate with multiple third-party contractors.",
  },
  {
    id: "faq-7",
    category: "Materials & Turnkey",
    question: "Can we customize colors, laminate finishes, and modular hardware?",
    answer:
      "Yes, 100%. Every single project is customized to your taste. We offer a vast selection of finishes including anti-scratch acrylics, matte laminates, fluted panels, PU finishes, and premium stone surfaces, pairing them with heavy-duty soft-close hardware.",
  },
  {
    id: "faq-8",
    category: "General",
    question: "Which areas in Pune and PCMC do you serve?",
    answer:
      "Our design studio is based in Ambegaon Budruk, Pune. We execute projects across all of Pune and PCMC including Ambegaon BK, Katraj, Dhayari, Sinhagad Road, Kothrud, Karve Nagar, Baner, Balewadi, Wakad, Hinjawadi, Hadapsar, and surrounding localities.",
  },
  {
    id: "faq-9",
    category: "General",
    question: "How can I book an initial consultation or get an estimate for my space?",
    answer:
      "Getting started is easy! You can book a consultation directly through our website form, call us at +91 8855044699, or send us a message on WhatsApp with your floor plan. Our team will schedule an in-depth design discussion at your convenience.",
  },
];

function FaqPage() {
  const [openIds, setOpenIds] = useState<string[]>(["faq-1", "faq-2", "faq-3"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "General", "Pricing & Warranty", "Process & Timeline", "Materials & Turnkey"];

  const filteredFaqs =
    selectedCategory === "All"
      ? FAQS
      : FAQS.filter((faq) => faq.category === selectedCategory);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <SiteLayout>
      {/* ── HERO BANNER ── */}
      <section className="bg-forest-deep px-5 pb-20 pt-32 text-background sm:px-8 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brass/30 bg-brass/10 px-4 py-1 text-xs font-medium text-brass mb-4">
            <HelpCircle className="size-3.5" />
            <span>Help &amp; Answers</span>
          </div>

          <h1 className="display mt-2 text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.05] text-background">
            FREQUENTLY ASKED QUESTIONS.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-background/80">
            Everything you need to know about our interior design process, transparent pricing, 10+ year warranty, and turnkey execution in Pune.
          </p>

          {/* Quick Highlights Bar */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto border-t border-white/15 pt-6 text-left">
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-5 text-brass shrink-0" />
              <div>
                <p className="text-xs font-semibold text-background">10+ Years Warranty</p>
                <p className="text-[0.7rem] text-background/60">On modular cabinetry &amp; hardware</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <BadgePercent className="size-5 text-brass shrink-0" />
              <div>
                <p className="text-xs font-semibold text-background">Zero Hidden Costs</p>
                <p className="text-[0.7rem] text-background/60">Fixed transparent quotations</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="size-5 text-brass shrink-0" />
              <div>
                <p className="text-xs font-semibold text-background">Fastest Turnkey Delivery</p>
                <p className="text-[0.7rem] text-background/60">35–45 days handover</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACCORDION SECTION ── */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-forest text-background shadow-xs"
                    : "border border-forest/20 bg-card text-foreground/80 hover:bg-forest/10 hover:border-forest/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <div
                  key={faq.id}
                  className="rounded-md border border-forest/15 bg-card transition-all duration-200 overflow-hidden shadow-xs hover:border-brass/50"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer select-none transition-colors"
                  >
                    <span className="font-sans text-base sm:text-lg font-semibold text-forest tracking-tight">
                      {faq.question}
                    </span>
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full border border-forest/20 bg-forest/5 text-forest transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-forest text-background" : ""
                      }`}
                    >
                      <ChevronDown className="size-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border-t border-forest/10 px-5 pb-6 pt-4 sm:px-6">
                      <p className="text-sm sm:text-base leading-relaxed text-muted-foreground whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still have questions CTA */}
          <div className="mt-16 rounded-lg border border-forest/20 bg-card/80 p-8 sm:p-10 text-center backdrop-blur-xs">
            <div className="inline-flex size-12 items-center justify-center rounded-full bg-forest/10 text-forest mb-4">
              <Sparkles className="size-6 text-brass" />
            </div>
            <h3 className="display text-2xl sm:text-3xl text-forest">
              HAVE MORE QUESTIONS ABOUT YOUR SPACE?
            </h3>
            <p className="mt-3 max-w-xl mx-auto text-sm text-muted-foreground leading-relaxed">
              Our expert designers are here to guide you through floor plans, estimates, and material options with no obligation.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" variant="default">
                <Link to="/contact">Book Free Consultation</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-forest/25 text-forest hover:bg-forest/10">
                <a
                  href={whatsappUrl("Hi Nakshtra Interior, I have a question about interior design for my home.")}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="size-4 text-[#25D366]" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
