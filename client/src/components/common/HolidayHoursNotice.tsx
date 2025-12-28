import { useEffect, useState } from "react";
import { ArrowRight, CalendarCheck, CalendarClock, X } from "lucide-react";
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
  const dismissalKey = holidayHours?.id
    ? `holidayHoursDismissed-${holidayHours.id}`
    : "holidayHoursDismissed";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedValue = window.localStorage.getItem(dismissalKey);
    if (storedValue === "true") {
      setIsDismissed(true);
    }
  }, [dismissalKey]);

  const handleDismiss = () => {
    setIsDismissed(true);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(dismissalKey, "true");
    }
  };

  if (!holidayHours?.active) {
    return null;
  }

  if (variant === "card") {
    return (
      <div
        className={cn(
          "rounded-3xl border border-blue-100 bg-white shadow-sm",
          className
        )}
      >
        <div className="rounded-[23px] bg-gradient-to-br from-white via-white to-blue-50 px-5 py-6 text-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <CalendarClock className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-blue-600">Hours Update</p>
              <p className="text-base font-semibold text-slate-900 leading-tight">{holidayHours.title}</p>
            </div>
          </div>

          <p className="text-slate-600 mb-5 leading-relaxed">{holidayHours.description}</p>

          <div className="relative pl-4">
            <div className="absolute left-2 top-3 bottom-3 w-px bg-blue-100" aria-hidden="true" />
            <ul className="space-y-3">
              {holidayHours.entries.map((entry, idx) => (
                <li
                  key={entry.day}
                  className="relative rounded-2xl border border-blue-100 bg-blue-50/70 px-4 py-3 shadow-sm"
                >
                  <span
                    className="absolute -left-[7px] top-4 h-3 w-3 rounded-full border border-white bg-blue-500"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <span className="font-semibold text-slate-900">{entry.day}</span>
                    <span className="text-slate-600 sm:text-right">{entry.hours}</span>
                  </div>
                  {idx === 0 && (
                    <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-600">
                      Schedule update
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {holidayHours.cta && (
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={holidayHours.cta.href}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
              >
                <CalendarCheck className="h-4 w-4" aria-hidden="true" />
                {holidayHours.cta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <span className="text-xs text-slate-500">We’ll confirm when the office reopens.</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (isDismissed) {
    return null;
  }

  return (
    <div
      className={cn(
        "border-b border-blue-100 bg-blue-50 text-slate-700",
        "bg-[radial-gradient(circle_at_top_left,#dbeafe_0%,transparent_45%),radial-gradient(circle_at_top_right,#dbeafe_0%,transparent_45%)]",
        className
      )}
    >
      <div
        className={cn(
          "max-w-6xl mx-auto flex flex-col gap-2 px-4 py-2.5 text-sm sm:px-6 lg:px-8 md:flex-row md:items-center md:gap-6",
          containerClassName
        )}
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6 flex-1">
          <div className="flex items-center gap-2 font-semibold">
            <CalendarClock className="h-4 w-4 text-blue-600" aria-hidden="true" />
            <span className="text-slate-900">{holidayHours.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-slate-600">
            {holidayHours.entries.map((entry, idx) => {
              const isClosed = entry.hours.toLowerCase().includes("closed");
              const badgeColor = isClosed
                ? "bg-blue-100 text-blue-800"
                : "bg-white/80 text-slate-700";
              return (
                <span
                  key={entry.day}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border border-blue-100/70 backdrop-blur",
                    badgeColor
                  )}
                >
                  {entry.day}: <span className="font-medium">{entry.hours}</span>
                  {idx === holidayHours.entries.length - 1 && <span className="text-[11px] text-blue-600">Reopens</span>}
                </span>
              );
            })}
          </div>

          {holidayHours.cta && (
            <a
              href={holidayHours.cta.href}
              className="font-semibold inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-white shadow-sm transition hover:bg-primary/90"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              {holidayHours.cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="self-start rounded-full p-1.5 text-slate-500 hover:text-slate-800 hover:bg-white/70 transition"
          aria-label="Dismiss holiday hours notice"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default HolidayHoursNotice;
