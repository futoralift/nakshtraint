import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { recordPageView } from "@/lib/analytics.functions";

function getDeviceType(): "Desktop" | "Mobile" | "Tablet" {
  if (typeof window === "undefined") return "Desktop";
  const ua = navigator.userAgent.toLowerCase();
  const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
    ua,
  );
  if (isTablet) return "Tablet";
  const isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
    ua,
  );
  if (isMobile || window.innerWidth < 768) return "Mobile";
  return "Desktop";
}

function getBrowser(): string {
  if (typeof window === "undefined") return "Other";
  const ua = navigator.userAgent;
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("OPR/") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Firefox")) return "Firefox";
  return "Other";
}

function getOS(): string {
  if (typeof window === "undefined") return "Other";
  const ua = navigator.userAgent;
  if (ua.includes("Win")) return "Windows";
  if (ua.includes("Mac") && !ua.includes("iPhone") && !ua.includes("iPad")) return "macOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad") || ua.includes("iPod")) return "iOS";
  if (ua.includes("Linux")) return "Linux";
  return "Other";
}

function getReferrerCategory(): string {
  if (typeof document === "undefined" || !document.referrer) return "Direct";
  const ref = document.referrer.toLowerCase();
  try {
    const url = new URL(ref);
    const host = url.hostname.replace(/^www\./, "");
    if (host.includes(window.location.hostname)) return "Direct";
    if (host.includes("google")) return "Google";
    if (host.includes("instagram")) return "Instagram";
    if (host.includes("whatsapp") || host.includes("wa.me")) return "WhatsApp";
    if (host.includes("facebook") || host.includes("fb.me")) return "Facebook";
    if (host.includes("linkedin")) return "LinkedIn";
    if (host.includes("youtube")) return "YouTube";
    if (host.includes("twitter") || host.includes("x.com")) return "Twitter / X";
    if (host.includes("pinterest")) return "Pinterest";
    return host;
  } catch {
    return "Direct";
  }
}

function getCountryName(): string {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (timeZone.startsWith("Asia/Calcutta") || timeZone.startsWith("Asia/Kolkata")) {
      return "India";
    }
    if (timeZone.startsWith("Asia/Dubai")) return "United Arab Emirates";
    if (timeZone.startsWith("America/")) return "United States";
    if (timeZone.startsWith("Europe/London")) return "United Kingdom";
    if (timeZone.startsWith("Asia/Singapore")) return "Singapore";
    if (timeZone.startsWith("Australia/")) return "Australia";
    if (timeZone.startsWith("Asia/")) return "Asia";
    if (timeZone.startsWith("Europe/")) return "Europe";
    return "India"; // Default primary audience
  } catch {
    return "India";
  }
}

export function AnalyticsTracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname.startsWith("/admin")) return;
    if (lastTracked.current === pathname) return;

    lastTracked.current = pathname;

    // Check unique visitor
    let isNewVisitor = false;
    let visitorId = localStorage.getItem("nak_vid");
    if (!visitorId) {
      isNewVisitor = true;
      visitorId = "v_" + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
      try {
        localStorage.setItem("nak_vid", visitorId);
      } catch {
        // storage disabled
      }
    }

    // Check session
    let isNewSession = false;
    let sessionId = sessionStorage.getItem("nak_sid");
    if (!sessionId) {
      isNewSession = true;
      sessionId = "s_" + Math.random().toString(36).substring(2, 11);
      try {
        sessionStorage.setItem("nak_sid", sessionId);
      } catch {
        // storage disabled
      }
    }

    const payload = {
      path: pathname,
      referrer: getReferrerCategory(),
      device: getDeviceType(),
      browser: getBrowser(),
      os: getOS(),
      country: getCountryName(),
      isNewVisitor,
      isNewSession,
      visitorId,
    };

    // Send silently without blocking UI
    recordPageView({ data: payload }).catch(() => {
      // Ignore network errors
    });
  }, [pathname]);

  return null;
}
