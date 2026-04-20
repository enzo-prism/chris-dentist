import { useEffect, useRef, useState, type CSSProperties } from "react";
import { officeInfo } from "@/lib/data";
import { trackBookingEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface TypeFormEmbedProps {
  formId: string;
  className?: string;
  style?: CSSProperties;
  analyticsLocation?: string;
}

const TYPEFORM_SCRIPT_SRC = "https://embed.typeform.com/next/embed.js";
const TYPEFORM_SCRIPT_ID = "typeform-embed-script";

type TypeformWidgetInstance = {
  unmount?: () => void;
};

type TypeformQuestionPayload = {
  ref?: string;
};

type TypeformSubmitPayload = {
  responseId?: string;
};

declare global {
  interface Window {
    __typeformScriptPromise?: Promise<void>;
    tf?: {
      createWidget?: (
        formId: string,
        options: Record<string, unknown>,
      ) => TypeformWidgetInstance;
    };
  }
}

const hasTypeformGlobal = (): boolean => typeof window.tf?.createWidget === "function";

const loadTypeformScript = (): Promise<void> => {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (hasTypeformGlobal()) {
    return Promise.resolve();
  }

  if (window.__typeformScriptPromise) {
    return window.__typeformScriptPromise;
  }

  window.__typeformScriptPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(TYPEFORM_SCRIPT_ID) as
      | HTMLScriptElement
      | null;

    if (existing) {
      if (hasTypeformGlobal()) {
        resolve();
        return;
      }

      const onLoad = () => resolve();
      const onError = () =>
        reject(new Error("Unable to load Typeform embed script"));

      existing.addEventListener("load", onLoad, { once: true });
      existing.addEventListener("error", onError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = TYPEFORM_SCRIPT_ID;
    script.src = TYPEFORM_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Unable to load Typeform embed script"));
    document.body.appendChild(script);
  });

  return window.__typeformScriptPromise;
};

const TypeFormEmbed = ({
  formId,
  className,
  style,
  analyticsLocation = "schedule_form",
}: TypeFormEmbedProps) => {
  const pagePath =
    typeof window === "undefined" ? undefined : window.location.pathname;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<TypeformWidgetInstance | null>(null);
  const [formReady, setFormReady] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  const hasStartedRef = useRef(false);
  const currentStepRef = useRef(0);
  const lastQuestionRef = useRef<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeWidget = async () => {
      try {
        await loadTypeformScript();
        if (!isMounted || !containerRef.current || !window.tf?.createWidget) {
          return;
        }

        containerRef.current.innerHTML = "";
        currentStepRef.current = 0;
        lastQuestionRef.current = null;
        hasStartedRef.current = false;

        widgetRef.current = window.tf.createWidget(formId, {
          container: containerRef.current,
          inlineOnMobile: true,
          medium: analyticsLocation,
          hidden: {
            source: analyticsLocation,
          },
          onReady: () => {
            if (!isMounted) return;
            setFormReady(true);
            trackBookingEvent("booking_form_ready", {
              form_id: formId,
              form_location: analyticsLocation,
              page_path: pagePath,
            });
          },
          onStarted: () => {
            if (hasStartedRef.current) return;
            hasStartedRef.current = true;
            trackBookingEvent("booking_form_start", {
              form_id: formId,
              form_location: analyticsLocation,
              page_path: pagePath,
            });
          },
          onQuestionChanged: (payload: TypeformQuestionPayload) => {
            const nextQuestionRef = payload?.ref || `step-${currentStepRef.current + 1}`;

            if (!hasStartedRef.current) {
              hasStartedRef.current = true;
              trackBookingEvent("booking_form_start", {
                form_id: formId,
                form_location: analyticsLocation,
                page_path: pagePath,
              });
            }

            if (lastQuestionRef.current) {
              trackBookingEvent("booking_form_step_complete", {
                form_id: formId,
                form_location: analyticsLocation,
                page_path: pagePath,
                step_number: currentStepRef.current,
                step_ref: lastQuestionRef.current,
              });
            }

            currentStepRef.current += 1;
            lastQuestionRef.current = nextQuestionRef;

            trackBookingEvent("booking_form_step_view", {
              form_id: formId,
              form_location: analyticsLocation,
              page_path: pagePath,
              step_number: currentStepRef.current,
              step_ref: nextQuestionRef,
            });
          },
          onSubmit: (payload: TypeformSubmitPayload) => {
            if (lastQuestionRef.current && currentStepRef.current > 0) {
              trackBookingEvent("booking_form_step_complete", {
                form_id: formId,
                form_location: analyticsLocation,
                page_path: pagePath,
                step_number: currentStepRef.current,
                step_ref: lastQuestionRef.current,
              });
            }

            trackBookingEvent("booking_form_submit", {
              form_id: formId,
              form_location: analyticsLocation,
              page_path: pagePath,
              step_count: currentStepRef.current,
              response_id: payload?.responseId,
            });
          },
        });
      } catch {
        if (isMounted) {
          setScriptError(true);
        }
      }
    };

    initializeWidget();

    return () => {
      isMounted = false;
      widgetRef.current?.unmount?.();
      widgetRef.current = null;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [analyticsLocation, formId]);

  if (scriptError) {
    return (
      <div
        className={cn(
          "rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700",
          className,
        )}
        style={style}
      >
        <p>Secure scheduling is temporarily unavailable.</p>
        <a
          href={`tel:${officeInfo.phoneE164}`}
          className="mt-2 inline-flex font-semibold text-primary hover:underline"
        >
          Call {officeInfo.phone} to schedule directly
        </a>
      </div>
    );
  }

  return (
    <>
      <div
        ref={containerRef}
        data-testid="typeform-embed"
        className={className}
        style={style}
        aria-busy={!formReady}
        aria-live="polite"
      />
      {!formReady ? (
        <p className="mt-3 text-center text-xs text-slate-500">
          Loading secure form…
        </p>
      ) : null}
      <noscript>
        Secure scheduling requires JavaScript. Call {officeInfo.phone} to book
        your appointment.
      </noscript>
    </>
  );
};

export default TypeFormEmbed;
