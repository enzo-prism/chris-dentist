import { getAttributionEventParams, persistAttribution } from "./attribution";

type EventParamValue = string | number | boolean | null | undefined;

function sanitizeParams(params: Record<string, EventParamValue> = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null),
  );
}

function getDefaultEventParams(): Record<string, EventParamValue> {
  if (typeof window === "undefined") {
    return {};
  }

  persistAttribution();

  const pagePath =
    typeof window.location !== "undefined"
      ? `${window.location.pathname}${window.location.search}`
      : undefined;
  const pageUrl = typeof window.location !== "undefined" ? window.location.href : undefined;

  return sanitizeParams({
    page_path: pagePath,
    page_url: pageUrl,
    ...getAttributionEventParams(),
  });
}

export function trackGAEvent(
  action: string,
  params: Record<string, EventParamValue> = {},
): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, sanitizeParams({
      ...getDefaultEventParams(),
      ...params,
    }));
  }
}

export function trackPhoneClick(params: Record<string, EventParamValue> = {}): void {
  trackGAEvent("phone_click", {
    interaction_type: "call",
    ...params,
  });
}

export function trackBookingEvent(
  action:
    | "booking_form_ready"
    | "booking_form_start"
    | "booking_form_step_view"
    | "booking_form_step_complete"
    | "booking_form_submit"
    | "schedule_cta_click",
  params: Record<string, EventParamValue> = {},
): void {
  trackGAEvent(action, params);
}

export function trackContactEvent(
  params: Record<string, EventParamValue> = {},
): void {
  trackGAEvent("contact_form_submit", params);
}
