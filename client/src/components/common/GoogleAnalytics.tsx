import { useEffect, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { trackBookingEvent, trackPhoneClick } from "@/lib/analytics";
import { persistAttribution } from "@/lib/attribution";

const GA_MEASUREMENT_ID = "G-94WRBJY51J";
const GA_SCRIPT_ID = "ga-gtag-script";

const isScheduleIntentLink = (href: string) => {
  if (!href) return false;

  if (href.startsWith("/schedule")) {
    return true;
  }

  if (href.startsWith("#appointment")) {
    return true;
  }

  try {
    const url = new URL(href, window.location.origin);
    return url.pathname === "/schedule";
  } catch {
    return false;
  }
};

const getElementLabel = (element: Element | null) => {
  if (!element) return undefined;
  return (
    element.getAttribute("aria-label") ||
    element.getAttribute("title") ||
    element.textContent?.replace(/\s+/g, " ").trim() ||
    undefined
  );
};

// This component handles Google Analytics page view tracking for SPAs
const GoogleAnalytics = () => {
  const [location] = useLocation();
  const pendingPathRef = useRef<string | null>(null);
  const isLoadedRef = useRef(false);

  const loadAnalyticsScript = useCallback(() => {
    if (typeof window === "undefined" || isLoadedRef.current) return;

    isLoadedRef.current = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag(...args: any[]) {
        window.dataLayer?.push(args);
      };

    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

    if (!document.getElementById(GA_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = GA_SCRIPT_ID;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      script.onload = () => {
        const pendingPath = pendingPathRef.current;
        if (pendingPath && window.gtag) {
          window.gtag("config", GA_MEASUREMENT_ID, { page_path: pendingPath });
          pendingPathRef.current = null;
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  const trackPageView = useCallback((path: string) => {
    if (typeof window === "undefined") return;

    if ("gtag" in window && typeof window.gtag === "function") {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: path,
      });
      return;
    }
    pendingPathRef.current = path;
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const load = () => loadAnalyticsScript();
    const interactionEvents = ["pointerdown", "keydown", "touchstart", "scroll"];

    interactionEvents.forEach((event) =>
      window.addEventListener(event, load, { once: true, passive: true }),
    );

    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(load, { timeout: 2000 });
    } else {
      idleTimer = setTimeout(load, 1800);
    }

    return () => {
      interactionEvents.forEach((event) =>
        window.removeEventListener(event, load),
      );
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [loadAnalyticsScript]);

  useEffect(() => {
    persistAttribution();
    trackPageView(location);
  }, [location, trackPageView]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const label = getElementLabel(link);

      if (href.startsWith("tel:")) {
        trackPhoneClick({
          page_path: location,
          phone_number: href.replace(/^tel:/, ""),
          click_text: label,
        });
        return;
      }

      if (isScheduleIntentLink(href)) {
        trackBookingEvent("schedule_cta_click", {
          page_path: location,
          destination: href,
          click_text: label,
        });
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [location]);

  return null;
};

export default GoogleAnalytics;
