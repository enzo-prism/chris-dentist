import { useEffect, useState } from "react";
import { AlertTriangle, ArrowRight, X } from "lucide-react";
import { holidayHours } from "@/lib/data";
import { cn } from "@/lib/utils";

type HolidayHoursNoticeProps = {
  variant?: "banner" | "card";
  className?: string;
  containerClassName?: string;
};

const HolidayHoursNotice = ({
  variant = "banner",
  className,
  containerClassName,
}: HolidayHoursNoticeProps) => {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedValue = window.localStorage.getItem("holidayHoursDismissed");
    if (storedValue === "true") {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("holidayHoursDismissed", "true");
    }
  };

  if (!holidayHours?.active) {
    return null;
  }

  if (variant === "card") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-amber-200 bg-amber-50/90 p-5 text-sm text-amber-900 shadow-sm",
          className
        )}
      >
        <div className="flex items-center gap-2 font-semibold text-amber-900 mb-3">
          <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          <span>{holidayHours.title}</span>
        </div>
        <p className="text-amber-900/90 mb-4">{holidayHours.description}</p>

        <ul className="space-y-2">
          {holidayHours.entries.map((entry) => (
            <li key={entry.day} className="flex items-center justify-between gap-4">
              <span className="font-medium">{entry.day}</span>
              <span className="text-amber-900">{entry.hours}</span>
            </li>
          ))}
        </ul>

        {holidayHours.cta && (
          <div className="mt-4">
            <a
              href={holidayHours.cta.href}
              className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
            >
              {holidayHours.cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    );
  }

  if (isDismissed) {
    return null;
  }

  return (
    <div className={cn("bg-amber-50/95 border-b border-amber-100 text-amber-900", className)}>
      <div
        className={cn(
          "max-w-6xl mx-auto flex flex-col gap-2 px-4 py-2 text-sm sm:px-6 lg:px-8 md:flex-row md:items-center md:gap-6",
          containerClassName
        )}
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6 flex-1">
          <div className="flex items-center gap-2 font-semibold">
            <AlertTriangle className="h-4 w-4" aria-hidden="true" />
            <span>{holidayHours.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-amber-900/90">
            {holidayHours.entries.map((entry) => (
              <span key={entry.day} className="flex gap-1 font-medium">
                <span>{entry.day}:</span>
                <span className="font-normal">{entry.hours}</span>
              </span>
            ))}
          </div>

          {holidayHours.cta && (
            <a
              href={holidayHours.cta.href}
              className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              {holidayHours.cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="self-start rounded-full p-1 text-amber-900/70 hover:text-amber-900 hover:bg-amber-100 transition"
          aria-label="Dismiss holiday hours notice"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default HolidayHoursNotice;
