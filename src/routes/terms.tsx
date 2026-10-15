import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Scale,
  ShieldCheck,
  CreditCard,
  FileText,
  Clock,
  Building,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  RefreshCw,
  Printer,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { SITE, whatsappUrl } from "@/lib/site";

const TITLE = "Terms & Conditions | Nakshtra Interior Pune";
const DESCRIPTION =
  "Official Terms and Conditions for interior design, modular kitchen manufacturing, turnkey execution, subscriptions, payments, and client accounts with Nakshtra Interior Pune.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: TermsPage,
});

const SECTIONS = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "services", title: "2. Services & Digital Showroom" },
  { id: "accounts", title: "3. User Accounts & Security" },
  { id: "quotes-boq", title: "4. Consultations, 3D Renders & BOQ" },
  { id: "subscriptions", title: "5. Subscriptions & Maintenance (AMC)" },
  { id: "payments", title: "6. Payment Milestones & Taxes" },
  { id: "cancellations", title: "7. Cancellations & Refund Policy" },
  { id: "site-access", title: "8. Client Obligations & Site Access" },
  { id: "timelines", title: "9. Execution Timelines & Force Majeure" },
  { id: "warranty", title: "10. 10+ Year Warranty & Defect Liability" },
  { id: "intellectual-property", title: "11. Intellectual Property & Portfolio" },
  { id: "conduct", title: "12. Prohibited Conduct" },
  { id: "liability", title: "13. Limitation of Liability & Indemnity" },
  { id: "governing-law", title: "14. Governing Law & Dispute Resolution" },
  { id: "contact-notices", title: "15. Contact & Legal Notices" },
];

function TermsPage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <SiteLayout>
      {/* ── HERO BANNER ── */}
      <section className="bg-forest-deep px-5 pb-20 pt-32 text-background sm:px-8 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="label-caps text-brass">Legal Documentation</span>
            <span className="text-background/40">•</span>
            <span className="text-background/70">Effective Date: October 15, 2026</span>
          </div>

          <h1 className="mt-5 text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1.05] tracking-tight">
            TERMS &amp; CONDITIONS.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-background/80 sm:text-base">
            These Terms &amp; Conditions govern your access to the Nakshtra Interior website, digital
            showroom, client portals, design consultations, subscriptions, and turnkey execution
            services.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="border-brass/40 bg-brass/10 text-brass hover:bg-brass/20 hover:text-white"
            >
              <Printer className="mr-2 size-4" />
              Print Terms
            </Button>
            <Link
              to="/privacy"
              className="inline-flex items-center text-xs font-medium text-brass underline-offset-4 hover:underline"
            >
              Read our Privacy Policy <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── AT A GLANCE HIGHLIGHTS ── */}
      <section className="border-b border-border bg-card py-10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <p className="label-caps text-wood">Summary</p>
          <h2 className="mt-2 text-2xl font-light text-foreground">Key Terms at a Glance</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded border border-border/80 bg-background p-4">
              <ShieldCheck className="size-5 text-forest" />
              <h3 className="mt-2 font-medium text-sm text-foreground">100% Price Lock</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Zero hidden costs once your 3D design and final Bill of Quantities (BOQ) are signed off.
              </p>
            </div>
            <div className="rounded border border-border/80 bg-background p-4">
              <Clock className="size-5 text-wood" />
              <h3 className="mt-2 font-medium text-sm text-foreground">35–45 Day Delivery</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Strict milestone-based turnkey execution with on-time handover commitment.
              </p>
            </div>
            <div className="rounded border border-border/80 bg-background p-4">
              <Sparkles className="size-5 text-brass" />
              <h3 className="mt-2 font-medium text-sm text-foreground">10+ Year Warranty</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Comprehensive warranty on core woodwork and branded hardware fittings (Hettich, Hafele).
              </p>
            </div>
            <div className="rounded border border-border/80 bg-background p-4">
              <CreditCard className="size-5 text-forest" />
              <h3 className="mt-2 font-medium text-sm text-foreground">Transparent Milestones</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Staged payments tied directly to verifiable design, fabrication, and installation stages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN BODY & TABLE OF CONTENTS ── */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
            {/* Table of Contents Sticky Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-4 rounded-lg border border-border bg-card p-5">
                <div className="flex items-center gap-2 border-b border-border pb-3">
                  <FileText className="size-4 text-brass" />
                  <p className="label-caps text-foreground">Navigation</p>
                </div>
                <nav className="space-y-1.5 text-xs text-muted-foreground max-h-[70vh] overflow-y-auto pr-1">
                  {SECTIONS.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block rounded px-2 py-1.5 transition-colors hover:bg-forest/10 hover:text-forest"
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>
                <div className="border-t border-border pt-4 text-xs">
                  <p className="text-muted-foreground">Questions regarding these terms?</p>
                  <a
                    href={`tel:${SITE.phoneTel}`}
                    className="mt-1 inline-flex items-center font-medium text-forest hover:underline"
                  >
                    Call {SITE.phoneDisplay}
                  </a>
                </div>
              </div>
            </aside>

            {/* Document Content */}
            <article className="space-y-14 text-sm leading-relaxed text-foreground/90">
              {/* Acceptance */}
              <section id="acceptance" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <Scale className="size-5 text-forest" />
                  <h2 className="text-xl font-medium text-foreground">1. Acceptance of Terms</h2>
                </div>
                <p>
                  Welcome to <strong>Nakshtra Interior</strong> (&quot;Nakshtra Interior,&quot; &quot;Studio,&quot; &quot;we,&quot;
                  &quot;us,&quot; or &quot;our&quot;), operating its principal design studio at{" "}
                  <em>{SITE.address}</em>.
                </p>
                <p>
                  By accessing or browsing our website (including all subdomains, digital showrooms,
                  and mobile web views), submitting an inquiry or project lead, registering for an
                  account, scheduling a consultation, or executing an interior design or turnkey
                  contract with us, you (&quot;Client,&quot; &quot;User,&quot; or &quot;You&quot;) agree to be legally bound by
                  these Terms &amp; Conditions and our accompanying Privacy Policy.
                </p>
                <p>
                  If you do not agree to all provisions contained herein, you must immediately cease
                  using this platform and refrain from commissioning any design services.
                </p>
                <div className="rounded-md border border-forest/20 bg-forest/5 p-4 text-xs text-muted-foreground">
                  <strong>Eligibility:</strong> You affirm that you are at least 18 years old or
                  possess legal majority in your jurisdiction to enter into a legally binding contract
                  under the Indian Contract Act, 1872.
                </div>
              </section>

              {/* Services & Digital Showroom */}
              <section id="services" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <Building className="size-5 text-wood" />
                  <h2 className="text-xl font-medium text-foreground">2. Services &amp; Digital Showroom</h2>
                </div>
                <p>
                  Nakshtra Interior provides comprehensive interior architecture, bespoke space
                  planning, modular furniture manufacturing, and turnkey project execution across Pune
                  and PCMC. Our primary offerings include:
                </p>
                <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
                  <li>
                    <strong>Residential Interiors:</strong> Complete 1BHK, 2BHK, 3BHK, duplex, and
                    villa designs, encompassing living spaces, master suites, children&apos;s bedrooms,
                    custom Devghar / mandir units, and entertainment consoles.
                  </li>
                  <li>
                    <strong>Modular Kitchens:</strong> Factory-engineered modular cabinetry, acrylic,
                    PU, and matte laminate finishes, quartz/granite stone countertops, and certified
                    branded hardware.
                  </li>
                  <li>
                    <strong>Commercial &amp; Office Spaces:</strong> Corporate workspaces, retail
                    boutiques, conference suites, and professional hospitality interiors.
                  </li>
                  <li>
                    <strong>Turnkey Civil &amp; Architectural Work:</strong> Single-window coordination
                    for civil modifications, electrical rewiring, plumbing alterations, false ceiling
                    installations, ambient architectural lighting, and premium wall finishes.
                  </li>
                  <li>
                    <strong>Renovation &amp; Remodeling:</strong> Modernization of existing residential
                    and commercial layouts.
                  </li>
                </ul>
                <p>
                  <strong>Digital Showroom &amp; 3D Visuals:</strong> All 3D renderings, virtual
                  walkthroughs, and sample photographs displayed on our website or provided during
                  consultations serve as artistic visual representations. While we strive for exact
                  fidelity, minor variations may occur due to on-site structural dimensions, civil
                  masonry plumb levels, and natural grain variations in wooden materials.
                </p>
              </section>

              {/* User Accounts & Security */}
              <section id="accounts" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-forest" />
                  <h2 className="text-xl font-medium text-foreground">3. User Accounts, Portals &amp; Security</h2>
                </div>
                <p>
                  To access dedicated project dashboards, manage lead submissions, or access
                  administrative tools, you may be issued or required to create account credentials.
                </p>
                <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
                  <li>
                    <strong>Account Confidentiality:</strong> You are responsible for safeguarding
                    your login credentials. Any activity conducted under your account is deemed your
                    sole responsibility.
                  </li>
                  <li>
                    <strong>Accurate Information:</strong> You agree to provide true, accurate, and
                    current details when completing forms or registering accounts.
                  </li>
                  <li>
                    <strong>Administrative &amp; Staff Access:</strong> Access to the <code>/admin</code>{" "}
                    management console is restricted strictly to authorized Nakshtra Interior staff
                    and personnel. Any unauthorized attempt to probe, bypass authentication, execute
                    privilege escalation, or tamper with system data is unlawful and subject to
                    prosecution under the Information Technology Act, 2000.
                  </li>
                  <li>
                    <strong>Compromise Notification:</strong> You must promptly notify us at{" "}
                    <a href={`mailto:${SITE.email}`} className="text-forest underline">
                      {SITE.email}
                    </a>{" "}
                    if you suspect unauthorized access or compromise of your credentials.
                  </li>
                </ul>
              </section>

              {/* Consultations, 3D Renders & BOQ */}
              <section id="quotes-boq" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="size-5 text-brass" />
                  <h2 className="text-xl font-medium text-foreground">
                    4. Consultations, 3D Visualizations &amp; Bill of Quantities (BOQ)
                  </h2>
                </div>
                <p>
                  Our project engagement proceeds through a structured, transparent process designed
                  to eliminate ambiguity:
                </p>
                <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
                  <li>
                    <strong>Initial Consultation &amp; Site Survey:</strong> We evaluate your site,
                    record architectural measurements, understand your functional requirements, and
                    discuss aesthetic directions.
                  </li>
                  <li>
                    <strong>Spatial Layout &amp; 3D Photorealistic Visuals:</strong> We produce
                    scaled 2D floor plans and 3D perspectives illustrating materials, lighting, and
                    color palettes.
                  </li>
                  <li>
                    <strong>Bill of Quantities (BOQ) &amp; Pricing Lock:</strong> Once the 3D design is
                    approved, we generate an itemized BOQ detailing core material grades (e.g., BWP/BWR
                    plywood), hardware specifications (e.g., Hettich soft-close hinges, tandem boxes),
                    and exact dimensions.
                  </li>
                </ol>
                <div className="rounded-md border border-forest/20 bg-forest/5 p-4">
                  <h3 className="font-medium text-foreground flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 text-forest" />
                    100% Price Lock Guarantee
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Once the finalized 3D renders and detailed BOQ are mutually approved in writing and
                    the requisite milestone advance is received, the project pricing is locked. We
                    guarantee zero hidden surcharges or surprise cost escalations during execution.
                  </p>
                </div>
                <p>
                  <strong>Scope Modifications &amp; Change Orders:</strong> Any additions, alterations,
                  or specification upgrades requested after the BOQ is signed off require a formal
                  written Change Order detailing cost differences and revised timeline impacts before
                  execution commences.
                </p>
              </section>

              {/* Subscriptions & Retainers (AMC) */}
              <section id="subscriptions" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <RefreshCw className="size-5 text-forest" />
                  <h2 className="text-xl font-medium text-foreground">
                    5. Subscriptions, Retainers &amp; Annual Maintenance (AMC)
                  </h2>
                </div>
                <p>
                  Nakshtra Interior may offer recurring subscriptions, corporate design retainers, or
                  Annual Maintenance Contracts (AMC) for post-handover space upkeep:
                </p>
                <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
                  <li>
                    <strong>Commercial Design Retainers:</strong> For ongoing commercial, retail, or
                    real estate consulting, services may be billed on a monthly or quarterly retainer
                    schedule as stipulated in your specific contract agreement.
                  </li>
                  <li>
                    <strong>Post-Handover AMC Subscriptions:</strong> Periodic maintenance packages
                    covering seasonal modular hinge recalibration, sliding drawer realignment, silicone
                    resealing, and structural hardware servicing.
                  </li>
                  <li>
                    <strong>Billing &amp; Invoicing:</strong> Subscription and maintenance charges are
                    billed in advance for the designated cycle. Formal tax invoices will be issued
                    electronically.
                  </li>
                  <li>
                    <strong>Cancellation of Subscriptions:</strong> You may cancel an ongoing
                    maintenance subscription by providing at least 15 days written notice prior to the
                    commencement of the subsequent billing cycle. Subscription fees for periods already
                    commenced or services already executed are non-refundable.
                  </li>
                </ul>
              </section>

              {/* Payments & Taxes */}
              <section id="payments" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="size-5 text-wood" />
                  <h2 className="text-xl font-medium text-foreground">
                    6. Payment Milestones, Methods &amp; Taxes
                  </h2>
                </div>
                <p>
                  Turnkey projects are structured on milestone-based payments to ensure steady
                  procurement, factory scheduling, and transparent on-site progress:
                </p>
                <div className="overflow-x-auto rounded border border-border">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-card text-foreground">
                      <tr className="border-b border-border">
                        <th className="p-3 font-medium">Milestone Stage</th>
                        <th className="p-3 font-medium">Standard %</th>
                        <th className="p-3 font-medium">Trigger &amp; Deliverables</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-muted-foreground">
                      <tr>
                        <td className="p-3 font-medium text-foreground">1. Booking Advance</td>
                        <td className="p-3">10%</td>
                        <td className="p-3">Site survey, detailed measurements &amp; 3D concept development.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-foreground">2. Design Sign-Off</td>
                        <td className="p-3">40%</td>
                        <td className="p-3">Approval of 3D renders, BOQ sign-off &amp; factory material procurement.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-foreground">3. Fabrication Complete</td>
                        <td className="p-3">40%</td>
                        <td className="p-3">Completion of factory cutting/edge-banding, prior to site dispatch.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-foreground">4. Handover &amp; Snag List</td>
                        <td className="p-3">10%</td>
                        <td className="p-3">Final on-site assembly, cleaning, snag inspection &amp; key handover.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
                  <li>
                    <strong>Accepted Modes of Payment:</strong> Unified Payments Interface (UPI), Net
                    Banking (NEFT/RTGS/IMPS), major Credit/Debit Cards, and account payee cheques
                    payable to &quot;Nakshtra Interior&quot;.
                  </li>
                  <li>
                    <strong>Taxes:</strong> All quotations and invoices are subject to Goods and
                    Services Tax (GST) as mandated by Indian tax regulations. Valid GST tax invoices are
                    provided for all transactions.
                  </li>
                  <li>
                    <strong>Payment Delays:</strong> Because factory production and on-site craftsmen
                    schedules rely on timely cash flow, milestone payments must be cleared within 5
                    working days of invoicing. Delays in milestone release may halt on-site work or
                    reschedule factory delivery.
                  </li>
                </ul>
              </section>

              {/* Cancellations & Refunds */}
              <section id="cancellations" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-5 text-forest" />
                  <h2 className="text-xl font-medium text-foreground">
                    7. Cancellation, Refund &amp; Change Order Policy
                  </h2>
                </div>
                <p>
                  Interior projects involve custom architectural design, bespoke fabrication, and
                  precision-cut materials tailored specifically to your home:
                </p>
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                  <li>
                    <strong>Cancellation Prior to 3D Design Approval:</strong> If a cancellation is
                    requested before the 3D renders and BOQ are signed off, the initial token advance is
                    refundable minus reasonable administrative and site survey expenses (up to ₹5,000 or
                    actual incurred cost).
                  </li>
                  <li>
                    <strong>Cancellation Post 3D Design Approval:</strong> The 10% design advance is
                    deemed earned and non-refundable, as it covers the intellectual property, drafting,
                    and architectural engineering hours invested.
                  </li>
                  <li>
                    <strong>Cancellation Post Factory Procurement / Cutting:</strong> Once core plywood,
                    acrylic sheets, laminates, and stone have been precision-cut to your room dimensions,
                    materials cannot be returned or reused. All procurement disbursements and
                    fabrication expenses incurred up to that date are non-refundable.
                  </li>
                  <li>
                    <strong>Refund Processing Timeline:</strong> Any eligible refund approved in writing
                    will be refunded to the original bank account or payment method within 7 to 10
                    business days.
                  </li>
                </ul>
              </section>

              {/* Client Obligations & Site Access */}
              <section id="site-access" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <Building className="size-5 text-wood" />
                  <h2 className="text-xl font-medium text-foreground">
                    8. Client Obligations &amp; Site Readiness
                  </h2>
                </div>
                <p>To ensure flawless turnkey execution, the Client agrees to:</p>
                <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
                  <li>
                    Provide unhindered, continuous access to the site during authorized working hours.
                  </li>
                  <li>
                    Ensure operational, continuous supply of electricity (with adequate load capacity
                    for power tools) and running water on-site.
                  </li>
                  <li>
                    Obtain all mandatory Society / Builder / Apartment Owner Association permissions,
                    work permits, and access to service elevators where required.
                  </li>
                  <li>
                    Disclose any hidden structural hazards, pre-existing dampness, concealed live high-voltage
                    conduits, or load-bearing restrictions.
                  </li>
                  <li>
                    Review and provide timely written approvals for material swatches, 3D designs, and
                    finish selections within 3 working days to prevent execution bottlenecks.
                  </li>
                </ul>
              </section>

              {/* Timelines & Force Majeure */}
              <section id="timelines" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="size-5 text-forest" />
                  <h2 className="text-xl font-medium text-foreground">
                    9. Project Timelines &amp; Force Majeure
                  </h2>
                </div>
                <p>
                  Standard turnkey residential interiors are scheduled for delivery within{" "}
                  <strong>35 to 45 working days</strong> from the date of final 3D design approval,
                  procurement milestone clearance, and handover of clear site possession.
                </p>
                <p>
                  <strong>Working Days Definition:</strong> Working days exclude Sundays, statutory
                  public holidays, and days where building housing societies prohibit noise-intensive
                  interior work.
                </p>
                <p>
                  <strong>Force Majeure:</strong> Nakshtra Interior shall not be liable for delivery
                  delays resulting from events beyond reasonable commercial control, including but not
                  limited to: natural disasters, severe localized flooding, municipal restrictions,
                  society work bans, builder possession delays, civic strikes, or supply chain embargoes.
                  In such cases, project timelines will be extended corresponding to the duration of the
                  disruption.
                </p>
              </section>

              {/* Warranty & Defect Liability */}
              <section id="warranty" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="size-5 text-brass" />
                  <h2 className="text-xl font-medium text-foreground">
                    10. 10+ Year Warranty &amp; Defect Liability
                  </h2>
                </div>
                <p>
                  We stand behind our craftsmanship and materials with industry-leading warranty
                  coverage:
                </p>
                <div className="space-y-3 rounded-lg border border-border bg-card p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-forest" />
                    <div>
                      <h3 className="font-medium text-foreground text-sm">
                        Modular Woodwork (Up to 10+ Years)
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Guaranteed against internal termite infestation, core borer attack, and factory
                        delamination when executed with certified BWP/BWR grade calibrated plywood.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brass" />
                    <div>
                      <h3 className="font-medium text-foreground text-sm">
                        Hardware &amp; Fittings (Manufacturer Warranty)
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Branded fittings from international leaders (Hettich, Hafele, Blum) carry
                        their official manufacturer warranty covering hinge fatigue, soft-close
                        mechanisms, and tandem drawers.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-wood" />
                    <div>
                      <h3 className="font-medium text-foreground text-sm">
                        1-Year Complimentary Post-Handover Care
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Free on-site alignment, hinge re-tightening, and door inspection support during
                        the first 12 months following key handover.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  <strong>Warranty Exclusions:</strong> Damage resulting from water seepage through
                  external civil masonry walls, plumbing line leakage not installed by our team,
                  abusive loading exceeding manufacturer ratings, direct exposure to open flame, harsh
                  acidic cleaning chemicals, or unauthorized alterations by third-party carpenters.
                </p>
              </section>

              {/* Intellectual Property */}
              <section id="intellectual-property" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="size-5 text-forest" />
                  <h2 className="text-xl font-medium text-foreground">
                    11. Intellectual Property &amp; Portfolio Rights
                  </h2>
                </div>
                <p>
                  All 2D drawings, 3D renderings, elevations, material palettes, digital showroom
                  scenes, website designs, photography, copy, and trademarks are the exclusive
                  intellectual property of Nakshtra Interior.
                </p>
                <p>
                  <strong>Portfolio Photography:</strong> Nakshtra Interior reserves the professional
                  right to photograph and video-record completed spaces for promotional, website, and
                  social media portfolio showcases. We respect client privacy: personal family
                  portraits, personal paperwork, and exact unit identification numbers will not be
                  disclosed.
                </p>
              </section>

              {/* Prohibited Conduct */}
              <section id="conduct" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-5 text-wood" />
                  <h2 className="text-xl font-medium text-foreground">12. Prohibited Website Conduct</h2>
                </div>
                <p>You agree not to engage in any of the following unauthorized activities:</p>
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                  <li>Using scrapers, spiders, or automated crawlers to harvest website content or renders.</li>
                  <li>Submitting false, fraudulent, or defamatory consultation inquiries or lead details.</li>
                  <li>Attempting to bypass security barriers, rate limit counters, or authentication tokens.</li>
                  <li>Introducing viruses, trojans, worm scripts, or denial-of-service payloads.</li>
                  <li>Copying, modifying, or republishing our portfolio imagery without written permission.</li>
                </ul>
              </section>

              {/* Limitation of Liability */}
              <section id="liability" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <Scale className="size-5 text-forest" />
                  <h2 className="text-xl font-medium text-foreground">
                    13. Limitation of Liability &amp; Indemnification
                  </h2>
                </div>
                <p>
                  To the maximum extent permitted by Indian law, Nakshtra Interior, its partners,
                  contractors, and employees shall not be liable for any indirect, incidental, punitive,
                  or consequential damages, including loss of profits, loss of data, or temporary space
                  inconvenience.
                </p>
                <p>
                  Our maximum aggregate liability for any claim arising from or related to our services
                  or website shall under no circumstances exceed the total fees actually received by
                  Nakshtra Interior for the specific work component under dispute.
                </p>
                <p>
                  You agree to indemnify and hold harmless Nakshtra Interior against any third-party
                  claims, property boundary disputes, or damages resulting from inaccurate site
                  declarations provided by you.
                </p>
              </section>

              {/* Governing Law */}
              <section id="governing-law" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <Building className="size-5 text-brass" />
                  <h2 className="text-xl font-medium text-foreground">
                    14. Governing Law &amp; Dispute Resolution
                  </h2>
                </div>
                <p>
                  These Terms &amp; Conditions and all contractual engagements shall be governed by and
                  construed in accordance with the substantive laws of the <strong>Republic of India</strong>.
                </p>
                <p>
                  In the event of any controversy, disagreement, or claim arising out of this agreement,
                  the parties shall first endeavor to settle the dispute amicably through good-faith
                  negotiations within 30 days.
                </p>
                <p>
                  If unresolvable, the dispute shall be referred to arbitration conducted by a sole
                  arbitrator mutually appointed in accordance with the <em>Arbitration and Conciliation
                  Act, 1996</em>. The seat and venue of arbitration shall be Pune, Maharashtra, and
                  proceedings shall be conducted in English.
                </p>
                <p>
                  Subject to arbitration, the competent courts situated in <strong>Pune, Maharashtra,
                  India</strong> shall have exclusive territorial and subject-matter jurisdiction.
                </p>
              </section>

              {/* Contact & Notices */}
              <section id="contact-notices" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="size-5 text-forest" />
                  <h2 className="text-xl font-medium text-foreground">15. Contact &amp; Legal Notices</h2>
                </div>
                <p>
                  For formal legal notices, questions regarding these Terms &amp; Conditions, or project
                  clarifications, please reach out to us through our designated studio channels:
                </p>
                <div className="mt-4 rounded-lg border border-border bg-card p-6">
                  <h3 className="font-medium text-base text-foreground">Nakshtra Interior</h3>
                  <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <p className="flex items-start gap-3">
                      <MapPin className="mt-1 size-4 shrink-0 text-wood" />
                      <span>{SITE.address}</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <Phone className="size-4 shrink-0 text-wood" />
                      <a href={`tel:${SITE.phoneTel}`} className="hover:text-foreground">
                        {SITE.phoneDisplay}
                      </a>
                    </p>
                    <p className="flex items-center gap-3">
                      <Mail className="size-4 shrink-0 text-wood" />
                      <a href={`mailto:${SITE.email}`} className="break-all hover:text-foreground">
                        {SITE.email}
                      </a>
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button asChild size="sm">
                      <Link to="/contact">Book Consultation</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <a href={whatsappUrl()} target="_blank" rel="noreferrer noopener">
                        Chat on WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </section>
            </article>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
