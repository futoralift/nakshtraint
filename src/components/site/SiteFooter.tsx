import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative z-20 bg-forest-deep text-background border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-3">
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
          <h2 className="label-caps text-brass">Quick Links</h2>
          <ul className="mt-5 space-y-2.5 text-sm text-background/75">
            <li>
              <Link to="/" className="transition-colors hover:text-background">
                Home
              </Link>
            </li>
            <li>
              <Link to="/projects" className="transition-colors hover:text-background">
                Selected Projects
              </Link>
            </li>
            <li>
              <Link to="/faq" className="font-medium text-brass transition-colors hover:text-background flex items-center gap-1.5">
                <span>FAQ &amp; Help</span>
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
        <div className="mx-auto flex max-w-7xl items-center justify-center px-5 py-6 text-xs text-background/70 sm:px-8 text-center">
          <p>© {new Date().getFullYear()} Nakshtra Interior. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

