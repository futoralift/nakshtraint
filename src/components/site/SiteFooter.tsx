import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";

import { SITE, SERVICES } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-forest-deep text-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-3">
        <div>
          <p className="display text-2xl tracking-[0.3em]">NAKSHTRA</p>
          <p className="label-caps mt-1 text-background/60">Interior</p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-background/70">
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
          <h2 className="label-caps text-brass">Services</h2>
          <ul className="mt-5 space-y-2 text-sm text-background/75">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link to="/services" className="transition-colors hover:text-background">
                  {service.title}
                </Link>
              </li>
            ))}
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
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-background/50 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Nakshtra Interior. All rights reserved.</p>
          <Link to="/admin" className="hover:text-background/80">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
