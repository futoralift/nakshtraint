import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Lock,
  ShieldCheck,
  Eye,
  FileText,
  Server,
  UserCheck,
  Database,
  Cookie,
  AlertCircle,
  Clock,
  Printer,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { SITE, whatsappUrl } from "@/lib/site";

const TITLE = "Privacy Policy | Nakshtra Interior Pune";
const DESCRIPTION =
  "Official Privacy Policy of Nakshtra Interior Pune. Learn how we collect, protect, process, and respect your personal data, floor plans, and project information under Indian privacy laws.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: PrivacyPage,
});

const SECTIONS = [
  { id: "pledge", title: "1. Our Privacy Pledge" },
  { id: "fiduciary", title: "2. Data Fiduciary Identity" },
  { id: "data-collected", title: "3. Information We Collect" },
  { id: "collection-methods", title: "4. How Data is Collected" },
  { id: "legal-basis", title: "5. Legal Bases for Processing" },
  { id: "purpose-use", title: "6. How We Use Your Data" },
  { id: "no-sale", title: "7. Zero Data Selling Guarantee" },
  { id: "third-parties", title: "8. Processors & Service Providers" },
  { id: "storage-security", title: "9. Storage, Security & Encryption" },
  { id: "retention", title: "10. Data Retention Schedules" },
  { id: "cookies", title: "11. Cookies & Local Identifiers" },
  { id: "your-rights", title: "12. Your Data Principal Rights" },
  { id: "children", title: "13. Children's Privacy" },
  { id: "grievance-officer", title: "14. Grievance Redressal Officer" },
  { id: "policy-updates", title: "15. Updates to this Policy" },
];

function PrivacyPage() {
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
            <span className="label-caps text-brass">Data Protection</span>
            <span className="text-background/40">•</span>
            <span className="text-background/70">Effective Date: October 15, 2026</span>
          </div>

          <h1 className="mt-5 text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1.05] tracking-tight">
            PRIVACY POLICY.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-background/80 sm:text-base">
            Your trust is our most valued asset. This Privacy Policy outlines how Nakshtra Interior
            safeguards your personal details, floor plans, and communications in accordance with the
            Digital Personal Data Protection Act, 2023 (DPDP Act) and the Information Technology Act,
            2000.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="border-brass/40 bg-brass/10 text-brass hover:bg-brass/20 hover:text-white"
            >
              <Printer className="mr-2 size-4" />
              Print Policy
            </Button>
            <Link
              to="/terms"
              className="inline-flex items-center text-xs font-medium text-brass underline-offset-4 hover:underline"
            >
              View Terms &amp; Conditions <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── AT A GLANCE HIGHLIGHTS ── */}
      <section className="border-b border-border bg-card py-10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <p className="label-caps text-wood">Summary</p>
          <h2 className="mt-2 text-2xl font-light text-foreground">Privacy at a Glance</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded border border-border/80 bg-background p-4">
              <ShieldCheck className="size-5 text-forest" />
              <h3 className="mt-2 font-medium text-sm text-foreground">Zero Data Selling</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                We never sell, rent, or trade your personal information or contact details to third-party brokers.
              </p>
            </div>
            <div className="rounded border border-border/80 bg-background p-4">
              <Lock className="size-5 text-wood" />
              <h3 className="mt-2 font-medium text-sm text-foreground">Encrypted Storage</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Floor plans, project specs, and user data are protected with TLS/HTTPS and Row-Level Security.
              </p>
            </div>
            <div className="rounded border border-border/80 bg-background p-4">
              <UserCheck className="size-5 text-brass" />
              <h3 className="mt-2 font-medium text-sm text-foreground">You Own Your Data</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Exercise your rights to access, rectify, or request deletion of your information anytime.
              </p>
            </div>
            <div className="rounded border border-border/80 bg-background p-4">
              <Database className="size-5 text-forest" />
              <h3 className="mt-2 font-medium text-sm text-foreground">Statutory Officer</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Direct access to our designated Grievance Officer in Pune with a 48-hour response window.
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
                  <p className="text-muted-foreground">Need privacy assistance?</p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="mt-1 inline-flex items-center font-medium text-forest hover:underline"
                  >
                    {SITE.email}
                  </a>
                </div>
              </div>
            </aside>

            {/* Document Content */}
            <article className="space-y-14 text-sm leading-relaxed text-foreground/90">
              {/* Pledge */}
              <section id="pledge" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-forest" />
                  <h2 className="text-xl font-medium text-foreground">1. Our Privacy Pledge</h2>
                </div>
                <p>
                  At <strong>Nakshtra Interior</strong>, we understand that designing a home or
                  commercial space is an intimate and personal endeavor. When you share your floor
                  plans, photographs, phone number, and design aspirational details with us, you are
                  placing your confidence in our integrity.
                </p>
                <p>
                  We are deeply committed to protecting your privacy and ensuring transparency in all
                  our data processing activities. This Privacy Policy explains what personal data we
                  collect through our website, digital showroom, client inquiry forms, consultation
                  sessions, and administrative accounts, why we collect it, and the rigorous safeguards
                  we apply to keep it secure.
                </p>
                <div className="rounded-md border border-forest/20 bg-forest/5 p-4 text-xs text-muted-foreground">
                  <strong>Statutory Alignment:</strong> This policy is formulated in full accordance
                  with India&apos;s <em>Digital Personal Data Protection Act, 2023 (DPDP Act)</em>, the{" "}
                  <em>Information Technology Act, 2000</em>, and the <em>Information Technology
                  (Reasonable Security Practices and Procedures and Sensitive Personal Data or
                  Information) Rules, 2011 (SPDI Rules)</em>.
                </div>
              </section>

              {/* Data Fiduciary */}
              <section id="fiduciary" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <Server className="size-5 text-wood" />
                  <h2 className="text-xl font-medium text-foreground">
                    2. Identification of Data Fiduciary
                  </h2>
                </div>
                <p>
                  Under applicable Indian privacy law, the Data Fiduciary (the entity responsible for
                  determining the purpose and means of processing your personal data) is:
                </p>
                <div className="rounded-lg border border-border bg-card p-5 text-xs sm:text-sm space-y-2">
                  <p>
                    <strong>Entity Name:</strong> Nakshtra Interior
                  </p>
                  <p>
                    <strong>Principal Studio Address:</strong> {SITE.address}
                  </p>
                  <p>
                    <strong>Service Territory:</strong> Pune, Pimpri-Chinchwad (PCMC), and
                    Maharashtra, India
                  </p>
                  <p>
                    <strong>Official Privacy Contact:</strong>{" "}
                    <a href={`mailto:${SITE.email}`} className="text-forest underline">
                      {SITE.email}
                    </a>{" "}
                    | {SITE.phoneDisplay}
                  </p>
                </div>
              </section>

              {/* Data Collected */}
              <section id="data-collected" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <Database className="size-5 text-brass" />
                  <h2 className="text-xl font-medium text-foreground">
                    3. Categories of Personal Data We Collect
                  </h2>
                </div>
                <p>We collect information in two main categories:</p>

                <h3 className="font-medium text-foreground text-sm mt-4">
                  A. Information You Voluntarily Provide
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                  <li>
                    <strong>Contact &amp; Identity Information:</strong> Full name, 10-digit Indian
                    mobile phone number (formatted as <code>+91</code>), WhatsApp number, and email
                    address.
                  </li>
                  <li>
                    <strong>Project Location &amp; Scope:</strong> Locality or apartment complex
                    within Pune (e.g., Ambegaon BK, Katraj, Baner, Kothrud, Wakad), property layout type
                    (1BHK, 2BHK, 3BHK, Villa, Office, Commercial), and intended possession timeline.
                  </li>
                  <li>
                    <strong>Architectural Documents &amp; Floor Plans:</strong> CAD files, PDFs, or
                    images (JPG, PNG, WEBP up to 5 MB) of architectural floor plans, measurements, and
                    photographs of existing site conditions that you upload to our secure storage.
                  </li>
                  <li>
                    <strong>Design Preferences &amp; Requirements:</strong> Specific service interests
                    (e.g., modular kitchen, master bedroom, false ceiling, Devghar temple, painting,
                    turnkey execution), aesthetic tastes, and approximate budget allocations.
                  </li>
                  <li>
                    <strong>Account &amp; Administrative Credentials:</strong> Email addresses and
                    hashed passwords for authorized administrative or client portal access.
                  </li>
                  <li>
                    <strong>Direct Communications:</strong> Notes from phone calls, WhatsApp chat
                    inquiries, site consultation visits, and email exchanges.
                  </li>
                </ul>

                <h3 className="font-medium text-foreground text-sm mt-4">
                  B. Automatically Collected Technical &amp; Analytics Data
                </h3>
                <p className="text-muted-foreground">
                  When you browse our digital showroom or explore project portfolios, our systems
                  automatically collect minimal, pseudonymized telemetry to maintain site performance,
                  prevent abuse, and track aggregated visitor trends:
                </p>
                <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
                  <li>
                    <strong>Device &amp; Browser Telemetry:</strong> Device category (Desktop, Mobile,
                    Tablet), operating system, browser family and version.
                  </li>
                  <li>
                    <strong>Network &amp; Diagnostics:</strong> IP address (utilized for rate-limiting
                    and security abuse prevention via Supabase RPC functions, then hashed), coarse
                    country/region indicator.
                  </li>
                  <li>
                    <strong>Usage Metrics:</strong> Page paths accessed (e.g. <code>/projects</code>,{" "}
                    <code>/faq</code>), referring URL, session timestamps, and web vitals metrics via
                    Vercel Analytics.
                  </li>
                  <li>
                    <strong>Pseudonymous Visitor Tokens:</strong> A random local visitor token (
                    <code>visitorId</code>) stored in your browser&apos;s local storage to prevent double-counting
                    page views and track anonymous session counts.
                  </li>
                </ul>
              </section>

              {/* How Data is Collected */}
              <section id="collection-methods" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <Eye className="size-5 text-forest" />
                  <h2 className="text-xl font-medium text-foreground">4. How We Collect Your Data</h2>
                </div>
                <p>Personal information is gathered through transparent touchpoints:</p>
                <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
                  <li>
                    <strong>Website Consultation Forms:</strong> When you complete the lead submission
                    form on <code>/contact</code>, the home page, or our interactive consultation popup.
                  </li>
                  <li>
                    <strong>Direct WhatsApp Inquiries:</strong> When you click our official WhatsApp
                    action button to initiate a chat with our design team.
                  </li>
                  <li>
                    <strong>File Uploads:</strong> When you attach your builder blueprint or floor plan
                    PDF/image directly through the form.
                  </li>
                  <li>
                    <strong>On-Site Meetings &amp; Studio Visits:</strong> When you visit our studio in
                    Ambegaon Budruk or host our design team for an on-site spatial survey.
                  </li>
                  <li>
                    <strong>Serverless Diagnostics:</strong> Automated page view records triggered upon
                    visiting public routes to ensure serverless health and rate-limit spam traffic.
                  </li>
                </ul>
              </section>

              {/* Legal Basis */}
              <section id="legal-basis" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="size-5 text-wood" />
                  <h2 className="text-xl font-medium text-foreground">
                    5. Legal Bases for Processing Data
                  </h2>
                </div>
                <p>
                  Under the DPDP Act, 2023 and international standards, we process your personal data
                  only when backed by a recognized lawful basis:
                </p>
                <div className="space-y-3">
                  <div className="rounded border border-border bg-card p-4">
                    <h3 className="font-medium text-sm text-foreground">1. Express Consent</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      When you submit a consultation form, book a site visit, or request pricing, you
                      explicitly consent to being contacted by our design consultants regarding your
                      project.
                    </p>
                  </div>
                  <div className="rounded border border-border bg-card p-4">
                    <h3 className="font-medium text-sm text-foreground">2. Contractual Performance</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Processing is necessary to fulfill our obligations under your interior design
                      contract: producing 2D/3D visual plans, preparing Bill of Quantities (BOQ),
                      procuring hardware, scheduling factory cutting, and on-site assembly.
                    </p>
                  </div>
                  <div className="rounded border border-border bg-card p-4">
                    <h3 className="font-medium text-sm text-foreground">3. Legitimate Business Uses</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Securing our web platform against bot spam and cyber threats via rate-limiting
                      RPCs, diagnosing serverless runtime errors, and optimizing portfolio rendering
                      speed.
                    </p>
                  </div>
                  <div className="rounded border border-border bg-card p-4">
                    <h3 className="font-medium text-sm text-foreground">4. Legal &amp; Statutory Compliance</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Maintaining financial records, processing tax-compliant GST invoices, and meeting
                      auditing obligations under the Indian Companies Act and GST laws.
                    </p>
                  </div>
                </div>
              </section>

              {/* Purpose & Use */}
              <section id="purpose-use" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-brass" />
                  <h2 className="text-xl font-medium text-foreground">
                    6. Specific Purposes of Processing
                  </h2>
                </div>
                <p>We utilize your personal information exclusively for the following purposes:</p>
                <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
                  <li>To evaluate your space layout and arrange initial on-site physical measurements.</li>
                  <li>
                    To render photorealistic 3D perspectives, design modular cabinetry, and generate
                    itemized Bill of Quantities (BOQ) with fixed pricing.
                  </li>
                  <li>
                    To communicate project updates, milestone achievement notices, material sample
                    approvals, and installation schedules via phone, WhatsApp, or email.
                  </li>
                  <li>
                    To process milestone payments, dispatch formal GST tax invoices, and issue official
                    receipts.
                  </li>
                  <li>
                    To track and service our <strong>10+ year warranty commitments</strong> and provide
                    post-handover maintenance support.
                  </li>
                  <li>
                    To prevent malicious automated abuse through endpoint rate limiting (
                    <code>bump_rate_limit</code>).
                  </li>
                  <li>
                    To evaluate web traffic flow and optimize our digital showroom user experience.
                  </li>
                </ul>
              </section>

              {/* Zero Data Selling */}
              <section id="no-sale" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-forest" />
                  <h2 className="text-xl font-medium text-foreground">
                    7. Zero Data Selling Guarantee
                  </h2>
                </div>
                <div className="rounded-lg border-2 border-forest/30 bg-forest/5 p-5">
                  <h3 className="font-medium text-base text-foreground flex items-center gap-2">
                    <CheckCircle2 className="size-5 text-forest" />
                    We Never Sell, Rent, or Monetize Your Personal Data
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    Nakshtra Interior has <strong>never sold, leased, or traded</strong> customer
                    contact lists, phone numbers, email addresses, or architectural drawings to third-party
                    data brokers, lead aggregators, or marketing telemarketers. We never will. Your data
                    is utilized exclusively to fulfill your interior design and execution needs with our
                    studio.
                  </p>
                </div>
              </section>

              {/* Processors & Service Providers */}
              <section id="third-parties" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <Server className="size-5 text-wood" />
                  <h2 className="text-xl font-medium text-foreground">
                    8. Processors &amp; Trusted Third-Party Services
                  </h2>
                </div>
                <p>
                  To deliver a modern web experience and secure cloud infrastructure, we partner with
                  reputable technology providers who process data strictly under our direction and
                  stringent confidentiality obligations:
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded border border-border bg-card p-4">
                    <h3 className="font-medium text-sm text-foreground">Supabase Inc.</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Provides managed PostgreSQL cloud database, authentication (Supabase Auth), and
                      secure private storage buckets for uploaded floor plan PDFs and images.
                    </p>
                  </div>
                  <div className="rounded border border-border bg-card p-4">
                    <h3 className="font-medium text-sm text-foreground">Vercel Inc.</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Provides edge serverless hosting, HTTPS SSL encryption, DDoS mitigation, and
                      privacy-friendly aggregated web analytics.
                    </p>
                  </div>
                  <div className="rounded border border-border bg-card p-4">
                    <h3 className="font-medium text-sm text-foreground">WhatsApp / Meta</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Direct click-to-chat communication channel when you choose to initiate messaging
                      with our studio team.
                    </p>
                  </div>
                  <div className="rounded border border-border bg-card p-4">
                    <h3 className="font-medium text-sm text-foreground">Hardware &amp; Logistics Partners</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Delivery addresses and recipient names are shared strictly on a need-to-know
                      basis with certified hardware suppliers (Hettich, Hafele) to fulfill material deliveries to your site.
                    </p>
                  </div>
                </div>
              </section>

              {/* Storage & Security */}
              <section id="storage-security" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <Lock className="size-5 text-forest" />
                  <h2 className="text-xl font-medium text-foreground">
                    9. Data Storage, Security &amp; Encryption
                  </h2>
                </div>
                <p>
                  We implement robust technical and organizational security measures to protect your
                  personal information against unauthorized disclosure, interception, or loss:
                </p>
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                  <li>
                    <strong>End-to-End Encryption in Transit:</strong> All website traffic, API calls,
                    and form submissions are secured using modern Transport Layer Security (TLS 1.3 /
                    HTTPS) encryption.
                  </li>
                  <li>
                    <strong>Row-Level Security (RLS):</strong> Our database employs granular Row-Level
                    Security in PostgreSQL, ensuring that leads and sensitive records can only be
                    accessed through authenticated, authorized server RPC routines.
                  </li>
                  <li>
                    <strong>Secure File Storage:</strong> Uploaded floor plans are stored in dedicated
                    storage buckets with restricted access URLs.
                  </li>
                  <li>
                    <strong>Rate Limiting &amp; DDoS Mitigation:</strong> Our backend incorporates
                    rate-limiting mechanisms (<code>bump_rate_limit</code>) to defend against brute-force
                    credential guessing and automated denial-of-service attempts.
                  </li>
                  <li>
                    <strong>Strict Access Controls:</strong> Studio administrative access requires
                    multi-factor authentication and role-based permissions granted strictly to
                    authorized staff.
                  </li>
                </ul>
              </section>

              {/* Retention */}
              <section id="retention" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="size-5 text-wood" />
                  <h2 className="text-xl font-medium text-foreground">
                    10. Data Retention Schedules
                  </h2>
                </div>
                <p>We retain personal information only for as long as necessary to fulfill its purpose:</p>
                <div className="overflow-x-auto rounded border border-border">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-card text-foreground">
                      <tr className="border-b border-border">
                        <th className="p-3 font-medium">Data Category</th>
                        <th className="p-3 font-medium">Standard Retention Period</th>
                        <th className="p-3 font-medium">Retention Rationale</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-muted-foreground">
                      <tr>
                        <td className="p-3 font-medium text-foreground">General Web Inquiries &amp; Leads</td>
                        <td className="p-3">24 Months</td>
                        <td className="p-3">To accommodate prolonged home possession and planning cycles.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-foreground">Executed Client Project Records</td>
                        <td className="p-3">10+ Years</td>
                        <td className="p-3">Mandatory to service and honor our 10+ year modular woodwork warranty.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-foreground">Financial, Invoicing &amp; GST Records</td>
                        <td className="p-3">8 Years</td>
                        <td className="p-3">Statutory tax compliance under Indian GST and Income Tax Acts.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium text-foreground">Aggregated Site Telemetry</td>
                        <td className="p-3">Permanent (Anonymized)</td>
                        <td className="p-3">Anonymized daily page view statistics for long-term capacity planning.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Cookies */}
              <section id="cookies" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <Cookie className="size-5 text-brass" />
                  <h2 className="text-xl font-medium text-foreground">
                    11. Cookies, Local Storage &amp; Tracking
                  </h2>
                </div>
                <p>
                  Our website uses lightweight cookies and local storage tokens to deliver essential
                  functionality:
                </p>
                <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
                  <li>
                    <strong>Essential Session Storage:</strong> Used to record when you dismiss or
                    submit the consultation modal (<code>nakshtra_popup_state</code>) so you are not
                    repeatedly interrupted while browsing.
                  </li>
                  <li>
                    <strong>Authentication Tokens:</strong> Secure tokens maintained by Supabase Auth
                    for logged-in administrative or client portal sessions.
                  </li>
                  <li>
                    <strong>Anonymous Telemetry Identifier:</strong> A randomly generated pseudonymous
                    string (<code>visitorId</code>) stored in local storage to prevent duplicate visit
                    counts across pages.
                  </li>
                </ul>
                <p>
                  <strong>Managing Preferences:</strong> You can configure your browser to reject
                  cookies or clear local storage at any time. Our core digital showroom and project
                  portfolios will continue to operate normally without third-party tracking cookies.
                </p>
              </section>

              {/* Your Rights */}
              <section id="your-rights" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <UserCheck className="size-5 text-forest" />
                  <h2 className="text-xl font-medium text-foreground">
                    12. Your Rights as a Data Principal
                  </h2>
                </div>
                <p>
                  Under the <em>Digital Personal Data Protection Act, 2023 (DPDP Act)</em>, you have
                  well-defined legal rights regarding your personal information:
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded border border-border bg-card p-4">
                    <h3 className="font-medium text-sm text-foreground">Right to Access &amp; Summary</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Request a summary of what personal information we hold, how it is being processed,
                      and which third parties have received it.
                    </p>
                  </div>
                  <div className="rounded border border-border bg-card p-4">
                    <h3 className="font-medium text-sm text-foreground">Right to Correction &amp; Updating</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Request correction of inaccurate contact details, revised site addresses, or updated
                      architectural specifications.
                    </p>
                  </div>
                  <div className="rounded border border-border bg-card p-4">
                    <h3 className="font-medium text-sm text-foreground">Right to Erasure (&quot;Right to be Forgotten&quot;)</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Request the deletion of your personal data, subject only to statutory tax retention
                      and active warranty record obligations.
                    </p>
                  </div>
                  <div className="rounded border border-border bg-card p-4">
                    <h3 className="font-medium text-sm text-foreground">Right to Withdraw Consent</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Revoke your consent for consultations or promotional communications at any time with
                      immediate prospective effect.
                    </p>
                  </div>
                  <div className="rounded border border-border bg-card p-4">
                    <h3 className="font-medium text-sm text-foreground">Right to Nominate</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Nominate any individual who, in the event of death or incapacity, shall exercise
                      your data rights on your behalf.
                    </p>
                  </div>
                  <div className="rounded border border-border bg-card p-4">
                    <h3 className="font-medium text-sm text-foreground">Right to Grievance Redressal</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Lodge a formal grievance directly with our designated Grievance Officer and receive
                      a response within statutory time limits.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  To exercise any of these rights, email your request to{" "}
                  <a href={`mailto:${SITE.email}`} className="text-forest underline">
                    {SITE.email}
                  </a>{" "}
                  with the subject line &quot;Data Subject Request&quot;. We will verify your identity and
                  fulfill your request free of charge within 30 days.
                </p>
              </section>

              {/* Children's Privacy */}
              <section id="children" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <AlertCircle className="size-5 text-wood" />
                  <h2 className="text-xl font-medium text-foreground">13. Children&apos;s Privacy</h2>
                </div>
                <p>
                  Our services, digital showroom, and consultations are exclusively intended for adult
                  homeowners, property owners, and commercial decision-makers. We do not knowingly
                  collect personal data from children under 18 years of age. If you believe a minor has
                  submitted personal data through our website, please notify us immediately, and we will
                  promptly purge the record from our databases.
                </p>
              </section>

              {/* Grievance Officer */}
              <section id="grievance-officer" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-forest" />
                  <h2 className="text-xl font-medium text-foreground">
                    14. Grievance Redressal Officer
                  </h2>
                </div>
                <p>
                  In compliance with the <em>Information Technology Act, 2000</em> and Rule 5(9) of the
                  SPDI Rules, 2011, as well as the <em>DPDP Act, 2023</em>, Nakshtra Interior has
                  designated an official Grievance Redressal Officer:
                </p>
                <div className="rounded-lg border border-border bg-card p-6">
                  <h3 className="font-medium text-base text-foreground">
                    Grievance Officer, Nakshtra Interior
                  </h3>
                  <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <p className="flex items-start gap-3">
                      <MapPin className="mt-1 size-4 shrink-0 text-wood" />
                      <span>{SITE.address}</span>
                    </p>
                    <p className="flex items-center gap-3">
                      <Mail className="size-4 shrink-0 text-wood" />
                      <a href={`mailto:${SITE.email}`} className="break-all hover:text-foreground">
                        {SITE.email}
                      </a>
                    </p>
                    <p className="flex items-center gap-3">
                      <Phone className="size-4 shrink-0 text-wood" />
                      <a href={`tel:${SITE.phoneTel}`} className="hover:text-foreground">
                        {SITE.phoneDisplay}
                      </a>
                    </p>
                    <p className="flex items-center gap-3">
                      <Clock className="size-4 shrink-0 text-wood" />
                      <span>Monday to Saturday · 10:00 AM – 7:00 PM IST</span>
                    </p>
                  </div>
                  <div className="mt-5 rounded bg-background p-3 text-xs text-muted-foreground border border-border/80">
                    <strong>Statutory Resolution Commitment:</strong> All formal grievances will be
                    acknowledged within <strong>48 hours</strong> and resolved expeditiously within{" "}
                    <strong>30 days</strong> from the date of receipt.
                  </div>
                </div>
              </section>

              {/* Updates to this Policy */}
              <section id="policy-updates" className="scroll-mt-28 space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="size-5 text-brass" />
                  <h2 className="text-xl font-medium text-foreground">
                    15. Updates to this Privacy Policy
                  </h2>
                </div>
                <p>
                  We may periodically update this Privacy Policy to reflect modifications in our digital
                  services, operational practices, or prevailing statutory regulations. The revised
                  version will be indicated by an updated &quot;Effective Date&quot; at the top of this page.
                </p>
                <p>
                  We encourage you to review this policy periodically. Your continued use of our website
                  and services following the posting of modifications constitutes your acceptance of the
                  updated terms.
                </p>
                <div className="pt-6 border-t border-border flex flex-wrap gap-3">
                  <Button asChild size="sm">
                    <Link to="/contact">Contact Our Team</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href={whatsappUrl()} target="_blank" rel="noreferrer noopener">
                      WhatsApp Inquiry
                    </a>
                  </Button>
                </div>
              </section>
            </article>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
