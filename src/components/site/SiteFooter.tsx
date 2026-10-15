import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative z-20 bg-forest-deep text-background border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="inline-block">
            <img
              src="/logo.png"
              alt="Nakshtra Interior"
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/70">
            Interior design and turnkey execution in {SITE.serviceArea}.
          </p>
          <div className="mt-6 flex gap-4">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Nakshtra Interior on Instagram"
              className="text-background/70 transition-colors hover:text-brass"
            >
              <Instagram className="size-5" />
            </a>
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Nakshtra Interior on Facebook"
              className="text-background/70 transition-colors hover:text-brass"
            >
              <Facebook className="size-5" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="label-caps text-brass">Explore</h2>
          <ul className="mt-5 space-y-2.5 text-sm text-background/75">
            <li>
              <Link to="/" className="transition-colors hover:text-background">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="transition-colors hover:text-background">
                Services
              </Link>
            </li>
            <li>
              <Link to="/projects" className="transition-colors hover:text-background">
                Selected Projects
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-background">
                About Studio
              </Link>
            </li>
            <li>
              <Link to="/faq" className="transition-colors hover:text-background">
                FAQ &amp; Help
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-background">
                Book Consultation
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="label-caps text-brass">Trust &amp; Legal</h2>
          <ul className="mt-5 space-y-2.5 text-sm text-background/75">
            <li>
              <Link to="/terms" className="transition-colors hover:text-background">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="transition-colors hover:text-background">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/faq" className="transition-colors hover:text-background">
                10+ Year Warranty
              </Link>
            </li>
            <li>
              <Link to="/faq" className="transition-colors hover:text-background">
                Price Lock Guarantee
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="label-caps text-brass">Contact</h2>
          <ul className="mt-5 space-y-4 text-sm text-background/75">
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0" />
              <a href={`tel:${SITE.phoneTel}`} className="hover:text-background">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0" />
              <a href={`mailto:${SITE.email}`} className="break-all hover:text-background">
                {SITE.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <address className="not-italic leading-relaxed">{SITE.address}</address>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 text-xs text-background/70 sm:flex-row sm:px-8 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Nakshtra Interior. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link to="/terms" className="transition-colors hover:text-brass">
              Terms &amp; Conditions
            </Link>
            <span className="text-background/30" aria-hidden="true">•</span>
            <Link to="/privacy" className="transition-colors hover:text-brass">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

