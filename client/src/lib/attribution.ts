export type AttributionTouch = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  landingPage?: string;
  referrer?: string;
  capturedAt?: string;
};

export type LeadAttribution = {
  firstTouch?: AttributionTouch;
  lastTouch?: AttributionTouch;
  sessionLandingPage?: string;
  sessionReferrer?: string;
  sessionStartAt?: string;
  submissionPagePath?: string;
  submissionPageUrl?: string;
  submissionForm?: string;
  submissionType?: string;
};

const STORAGE_KEY = "cwdds_marketing_attribution_v1";
const STORAGE_TTL_MS = 1000 * 60 * 60 * 24 * 90;

const isBrowser = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const cleanString = (value: string | null | undefined): string | undefined => {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const sanitizeTouch = (touch: AttributionTouch | undefined): AttributionTouch | undefined => {
  if (!touch) return undefined;

  const sanitized: AttributionTouch = {
    utmSource: cleanString(touch.utmSource),
    utmMedium: cleanString(touch.utmMedium),
    utmCampaign: cleanString(touch.utmCampaign),
    utmTerm: cleanString(touch.utmTerm),
    utmContent: cleanString(touch.utmContent),
    gclid: cleanString(touch.gclid),
    landingPage: cleanString(touch.landingPage),
    referrer: cleanString(touch.referrer),
    capturedAt: cleanString(touch.capturedAt),
  };

  return Object.values(sanitized).some(Boolean) ? sanitized : undefined;
};

const sanitizeAttribution = (
  attribution: LeadAttribution | undefined,
): LeadAttribution | undefined => {
  if (!attribution) return undefined;

  const sanitized: LeadAttribution = {
    firstTouch: sanitizeTouch(attribution.firstTouch),
    lastTouch: sanitizeTouch(attribution.lastTouch),
    sessionLandingPage: cleanString(attribution.sessionLandingPage),
    sessionReferrer: cleanString(attribution.sessionReferrer),
    sessionStartAt: cleanString(attribution.sessionStartAt),
    submissionPagePath: cleanString(attribution.submissionPagePath),
    submissionPageUrl: cleanString(attribution.submissionPageUrl),
    submissionForm: cleanString(attribution.submissionForm),
    submissionType: cleanString(attribution.submissionType),
  };

  return Object.values(sanitized).some(Boolean) ? sanitized : undefined;
};

const safeParseAttribution = (value: string | null): LeadAttribution | undefined => {
  if (!value) return undefined;

  try {
    return sanitizeAttribution(JSON.parse(value) as LeadAttribution);
  } catch {
    return undefined;
  }
};

const getCurrentPath = () => {
  if (!isBrowser()) return undefined;
  return `${window.location.pathname}${window.location.search}`;
};

const getCurrentUrl = () => {
  if (!isBrowser()) return undefined;
  return window.location.href;
};

const getExternalReferrer = (): string | undefined => {
  if (typeof document === "undefined" || !document.referrer || !isBrowser()) {
    return undefined;
  }

  try {
    const referrerUrl = new URL(document.referrer);
    return referrerUrl.origin === window.location.origin
      ? undefined
      : document.referrer;
  } catch {
    return cleanString(document.referrer);
  }
};

const hasMarketingTouch = (touch: AttributionTouch | undefined): boolean => {
  if (!touch) return false;

  return Boolean(
    touch.utmSource ||
      touch.utmMedium ||
      touch.utmCampaign ||
      touch.utmTerm ||
      touch.utmContent ||
      touch.gclid ||
      touch.referrer,
  );
};

export function getStoredAttribution(): LeadAttribution | undefined {
  if (!isBrowser()) return undefined;

  let parsed: LeadAttribution | undefined;
  try {
    parsed = safeParseAttribution(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return undefined;
  }

  if (!parsed) return undefined;

  const referenceTime =
    parsed.sessionStartAt || parsed.firstTouch?.capturedAt || parsed.lastTouch?.capturedAt;
  if (!referenceTime) return parsed;

  const timestamp = Date.parse(referenceTime);
  if (Number.isNaN(timestamp)) return parsed;

  if (Date.now() - timestamp > STORAGE_TTL_MS) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      return undefined;
    }
    return undefined;
  }

  return parsed;
}

export function persistAttribution(): LeadAttribution | undefined {
  if (!isBrowser()) return undefined;

  const existing = getStoredAttribution();
  const now = new Date().toISOString();
  const url = new URL(window.location.href);
  const currentTouch: AttributionTouch = sanitizeTouch({
    utmSource: url.searchParams.get("utm_source") ?? undefined,
    utmMedium: url.searchParams.get("utm_medium") ?? undefined,
    utmCampaign: url.searchParams.get("utm_campaign") ?? undefined,
    utmTerm: url.searchParams.get("utm_term") ?? undefined,
    utmContent: url.searchParams.get("utm_content") ?? undefined,
    gclid: url.searchParams.get("gclid") ?? undefined,
    landingPage: getCurrentPath(),
    referrer: getExternalReferrer(),
    capturedAt: now,
  }) ?? {
    landingPage: getCurrentPath(),
    referrer: getExternalReferrer(),
    capturedAt: now,
  };

  const firstTouch = existing?.firstTouch ?? currentTouch;
  const lastTouch =
    hasMarketingTouch(currentTouch) || !existing?.lastTouch
      ? currentTouch
      : existing.lastTouch;

  const nextState = sanitizeAttribution({
    firstTouch,
    lastTouch,
    sessionLandingPage: existing?.sessionLandingPage ?? currentTouch.landingPage,
    sessionReferrer: existing?.sessionReferrer ?? currentTouch.referrer,
    sessionStartAt: existing?.sessionStartAt ?? now,
    submissionPagePath: existing?.submissionPagePath,
    submissionPageUrl: existing?.submissionPageUrl,
    submissionForm: existing?.submissionForm,
    submissionType: existing?.submissionType,
  });

  if (nextState) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
    } catch {
      return nextState;
    }
  }

  return nextState;
}

export function buildLeadAttribution(
  overrides: Partial<LeadAttribution> = {},
): LeadAttribution | undefined {
  const base = persistAttribution() ?? getStoredAttribution();

  return sanitizeAttribution({
    ...base,
    ...overrides,
    submissionPagePath: overrides.submissionPagePath ?? getCurrentPath(),
    submissionPageUrl: overrides.submissionPageUrl ?? getCurrentUrl(),
  });
}

export function getAttributionEventParams(): Record<string, string> {
  const attribution = persistAttribution() ?? getStoredAttribution();
  if (!attribution) return {};

  const params: Record<string, string | undefined> = {
    session_landing_page: attribution.sessionLandingPage,
    session_referrer: attribution.sessionReferrer,
    session_start_at: attribution.sessionStartAt,
    first_utm_source: attribution.firstTouch?.utmSource,
    first_utm_medium: attribution.firstTouch?.utmMedium,
    first_utm_campaign: attribution.firstTouch?.utmCampaign,
    first_utm_term: attribution.firstTouch?.utmTerm,
    first_utm_content: attribution.firstTouch?.utmContent,
    first_gclid: attribution.firstTouch?.gclid,
    first_landing_page: attribution.firstTouch?.landingPage,
    first_referrer: attribution.firstTouch?.referrer,
    first_touch_at: attribution.firstTouch?.capturedAt,
    last_utm_source: attribution.lastTouch?.utmSource,
    last_utm_medium: attribution.lastTouch?.utmMedium,
    last_utm_campaign: attribution.lastTouch?.utmCampaign,
    last_utm_term: attribution.lastTouch?.utmTerm,
    last_utm_content: attribution.lastTouch?.utmContent,
    last_gclid: attribution.lastTouch?.gclid,
    last_landing_page: attribution.lastTouch?.landingPage,
    last_referrer: attribution.lastTouch?.referrer,
    last_touch_at: attribution.lastTouch?.capturedAt,
  };

  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  ) as Record<string, string>;
}

export function getTypeformHiddenFields(
  defaults: Record<string, string> = {},
): Record<string, string> {
  const attribution = buildLeadAttribution();
  const hiddenFields: Record<string, string | undefined> = {
    ...defaults,
    session_landing_page: attribution?.sessionLandingPage,
    session_referrer: attribution?.sessionReferrer,
    session_start_at: attribution?.sessionStartAt,
    submission_page_path: attribution?.submissionPagePath,
    submission_page_url: attribution?.submissionPageUrl,
    first_utm_source: attribution?.firstTouch?.utmSource,
    first_utm_medium: attribution?.firstTouch?.utmMedium,
    first_utm_campaign: attribution?.firstTouch?.utmCampaign,
    first_utm_term: attribution?.firstTouch?.utmTerm,
    first_utm_content: attribution?.firstTouch?.utmContent,
    first_gclid: attribution?.firstTouch?.gclid,
    first_landing_page: attribution?.firstTouch?.landingPage,
    first_referrer: attribution?.firstTouch?.referrer,
    first_touch_at: attribution?.firstTouch?.capturedAt,
    last_utm_source: attribution?.lastTouch?.utmSource,
    last_utm_medium: attribution?.lastTouch?.utmMedium,
    last_utm_campaign: attribution?.lastTouch?.utmCampaign,
    last_utm_term: attribution?.lastTouch?.utmTerm,
    last_utm_content: attribution?.lastTouch?.utmContent,
    last_gclid: attribution?.lastTouch?.gclid,
    last_landing_page: attribution?.lastTouch?.landingPage,
    last_referrer: attribution?.lastTouch?.referrer,
    last_touch_at: attribution?.lastTouch?.capturedAt,
  };

  return Object.fromEntries(
    Object.entries(hiddenFields)
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .map(([key, value]) => [key, String(value)]),
  );
}
