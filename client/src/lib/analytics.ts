type EventParamValue = string | number | boolean | null | undefined;

function sanitizeParams(params: Record<string, EventParamValue> = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null),
  );
}

export function trackGAEvent(
  action: string,
  params: Record<string, EventParamValue> = {},
): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, sanitizeParams(params));
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
