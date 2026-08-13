export const SITE = {
  name: "Nakshtra Interior",
  phoneDisplay: "+91 8855044699",
  phoneTel: "+918855044699",
  whatsappNumber: "918855044699",
  email: "nakshtrainteriors96@gmail.com",
  address: "Balaji Crystal, Dalavi Nagar, Dalvinagar, Ambegaon Budruk, Pune, Maharashtra 411046",
  city: "Pune",
  serviceArea: "Ambegaon BK, Pune",
  instagram: "https://www.instagram.com/nakshtra_interior_pune",
  facebook: "https://www.facebook.com/share/1DQ2eUv1aF/",
} as const;

export const WHATSAPP_MESSAGE =
  "Hi Nakshtra Interior, I would like to discuss my interior project.";

export const whatsappUrl = (message: string = WHATSAPP_MESSAGE) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const SERVICES = [
  {
    slug: "residential",
    title: "Residential Interiors",
    description: "Complete interior solutions designed around your lifestyle.",
  },
  {
    slug: "commercial",
    title: "Commercial Interiors",
    description: "Functional and visually impactful commercial environments.",
  },
  {
    slug: "office",
    title: "Office Interiors",
    description: "Professional workspaces designed for productivity and identity.",
  },
  {
    slug: "kitchen",
    title: "Modular Kitchen",
    description: "Smart, practical and beautiful kitchen systems.",
  },
  {
    slug: "bedroom",
    title: "Bedroom Interiors",
    description: "Comfortable, personalized bedroom environments.",
  },
  {
    slug: "turnkey",
    title: "Turnkey Projects",
    description: "End-to-end project execution.",
  },
  {
    slug: "renovation",
    title: "Renovation",
    description: "Transforming existing spaces into modern environments.",
  },
] as const;

export const SERVICE_INTERESTS = [
  "Residential Interior",
  "Modular Kitchen",
  "Bedroom",
  "Office",
  "Commercial",
  "Turnkey Project",
  "Renovation",
  "Other",
] as const;

export const TIMELINES = [
  "Immediately",
  "Within 1 Month",
  "1–3 Months",
  "3–6 Months",
  "Just Exploring",
] as const;

export const LEAD_STATUSES = ["New", "Contacted", "Qualified", "Converted", "Closed"] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];
