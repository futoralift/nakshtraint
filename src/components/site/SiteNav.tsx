import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { UspStrip } from "@/components/site/UspStrip";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 24;
      setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b border-border/60 bg-background/90 backdrop-blur-md" : "bg-black/30 backdrop-blur-xs"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src="/logo.png"
            alt="Nakshtra Interior"
            className={`h-9 sm:h-11 w-auto object-contain transition-all duration-300 ${
              scrolled ? "brightness-0" : "drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
            }`}
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`label-caps transition-opacity hover:opacity-60 ${
                  scrolled ? "text-foreground" : "text-background"
                }`}
                activeProps={{ className: "text-brass" }}
                activeOptions={{ exact: link.to === "/" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Button
            asChild
            variant={scrolled ? "default" : "outline"}
            size="sm"
            className="hidden md:inline-flex"
          >
            <Link to="/contact">Book Consultation</Link>
          </Button>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden ${scrolled ? "text-foreground" : "text-background"}`}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {/* 🌿 Full-width green scrolling USP strip directly below navbar */}
      <UspStrip />

      {open ? (
        <div className="border-t border-border/60 bg-background md:hidden">
          <ul className="mx-auto max-w-7xl px-5 py-4">
            {LINKS.map((link) => (
              <li key={link.to} className="border-b border-border/50 last:border-0">
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="label-caps block py-4 text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Button asChild className="w-full">
                <Link to="/contact" onClick={() => setOpen(false)}>
                  Book Consultation
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}

