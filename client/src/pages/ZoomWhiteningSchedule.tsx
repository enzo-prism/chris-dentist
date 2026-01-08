import { useState } from "react";
import { CalendarDays, Camera, CheckCircle, Clock, Sparkles } from "lucide-react";
import { Link } from "wouter";
import MetaTags from "@/components/common/MetaTags";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { officeInfo } from "@/lib/data";

const WEEKDAY_TIME_WINDOWS = [
  { value: "8:00 AM - 9:00 AM", label: "8:00 AM - 9:00 AM" },
  { value: "9:00 AM - 10:00 AM", label: "9:00 AM - 10:00 AM" },
  { value: "10:00 AM - 11:00 AM", label: "10:00 AM - 11:00 AM" },
  { value: "11:00 AM - 12:00 PM", label: "11:00 AM - 12:00 PM" },
  { value: "12:00 PM - 1:00 PM", label: "12:00 PM - 1:00 PM" },
  { value: "1:00 PM - 2:00 PM", label: "1:00 PM - 2:00 PM" },
  { value: "2:00 PM - 3:00 PM", label: "2:00 PM - 3:00 PM" },
  { value: "3:00 PM - 4:00 PM", label: "3:00 PM - 4:00 PM" },
  { value: "4:00 PM - 5:00 PM", label: "4:00 PM - 5:00 PM" },
];

const FRIDAY_TIME_WINDOWS = WEEKDAY_TIME_WINDOWS.slice(0, 6);

const selectClassName =
  "h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const getDayOfWeek = (value: string): number | null => {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return date.getDay();
};

const isWeekend = (dayOfWeek: number | null): boolean =>
  dayOfWeek === 0 || dayOfWeek === 6;

const getTimeWindows = (dayOfWeek: number | null) => {
  if (dayOfWeek === 5) return FRIDAY_TIME_WINDOWS;
  if (dayOfWeek !== null && dayOfWeek >= 1 && dayOfWeek <= 4) {
    return WEEKDAY_TIME_WINDOWS;
  }
  return [];
};

const ZoomWhiteningSchedule = () => {
  const [preferredDate1, setPreferredDate1] = useState("");
  const [preferredTime1, setPreferredTime1] = useState("");
  const [preferredDate2, setPreferredDate2] = useState("");
  const [preferredTime2, setPreferredTime2] = useState("");

  const preferredDay1 = getDayOfWeek(preferredDate1);
  const preferredDay2 = getDayOfWeek(preferredDate2);
  const timeWindows1 = getTimeWindows(preferredDay1);
  const timeWindows2 = getTimeWindows(preferredDay2);
  const isWeekend1 = isWeekend(preferredDay1);
  const isWeekend2 = isWeekend(preferredDay2);

  const handlePreferredDate1Change = (value: string) => {
    const day = getDayOfWeek(value);
    const windows = getTimeWindows(day);
    setPreferredDate1(value);
    setPreferredTime1((current) =>
      windows.some((window) => window.value === current) ? current : "",
    );
  };

  const handlePreferredDate2Change = (value: string) => {
    const day = getDayOfWeek(value);
    const windows = getTimeWindows(day);
    setPreferredDate2(value);
    setPreferredTime2((current) =>
      windows.some((window) => window.value === current) ? current : "",
    );
  };

  const timePlaceholder1 = preferredDate1
    ? isWeekend1
      ? "Office is closed on weekends"
      : "Select a 1-hour window"
    : "Pick a date first";
  const timePlaceholder2 = preferredDate2
    ? isWeekend2
      ? "Office is closed on weekends"
      : "Select a 1-hour window"
    : "Pick a date first";

  return (
    <>
      <MetaTags
        title="ZOOM! Whitening Schedule - Dr. Christopher B. Wong, DDS"
        description="Private scheduling page for invited patients booking a complimentary in-office ZOOM! Whitening session with photo and video capture."
        canonicalPath="/zoom-whitening/schedule"
        robots="noindex, nofollow, noarchive"
      />

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b1f3a] via-[#154477] to-[#f5f9fc] pt-24 pb-16">
        <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide">
                Invite-only scheduling
              </div>
              <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold font-heading leading-tight">
                ZOOM! Whitening photo and video session
              </h1>
              <p className="mt-4 text-lg text-white/85 leading-relaxed max-w-xl">
                This page is reserved for invited patients who are helping Dr. Wong with a marketing
                shoot. Your visit includes a complimentary in-office ZOOM! Whitening treatment while
                our team captures photos and video.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3 text-sm">
                <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3">
                  <Sparkles className="h-4 w-4 text-blue-200" />
                  Complimentary whitening
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3">
                  <Camera className="h-4 w-4 text-blue-200" />
                  Photo and video capture
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-3">
                  <Clock className="h-4 w-4 text-blue-200" />
                  About 90 minutes
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm text-white/85">
                <p className="font-semibold text-white">Choose two times that work for you.</p>
                <p className="mt-1">
                  Pick two date and 1-hour time windows within office hours. We will confirm the best fit.
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-white/95 p-6 sm:p-8 text-[#162338] shadow-2xl ring-1 ring-white/40 backdrop-blur">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading">Request your visit</h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Enter your name, then select two possible 1-hour windows. All times are Pacific.
              </p>

              <form
                action="https://formspree.io/f/mrebndyq"
                method="POST"
                className="mt-6 space-y-6"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      autoComplete="given-name"
                      required
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      autoComplete="family-name"
                      required
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-4 rounded-2xl bg-slate-50 p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    Preferred option 1
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate1">Date</Label>
                      <Input
                        id="preferredDate1"
                        name="preferredDate1"
                        type="date"
                        required
                        value={preferredDate1}
                        onChange={(event) => handlePreferredDate1Change(event.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredTime1">Time window (1 hour)</Label>
                      <select
                        id="preferredTime1"
                        name="preferredTime1"
                        required
                        value={preferredTime1}
                        onChange={(event) => setPreferredTime1(event.target.value)}
                        className={selectClassName}
                        disabled={!preferredDate1}
                      >
                        <option value="" disabled>
                          {timePlaceholder1}
                        </option>
                        {timeWindows1.map((window) => (
                          <option key={window.value} value={window.value}>
                            {window.label}
                          </option>
                        ))}
                      </select>
                      {isWeekend1 && preferredDate1 ? (
                        <p className="text-xs text-rose-600">
                          Office is closed on weekends. Please choose a weekday date.
                        </p>
                      ) : preferredDate1 ? (
                        <p className="text-xs text-slate-500">
                          Friday windows end at 2:00 PM.
                        </p>
                      ) : (
                        <p className="text-xs text-slate-500">
                          Select a date to see available time windows.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 rounded-2xl bg-slate-50 p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    Preferred option 2
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate2">Date</Label>
                      <Input
                        id="preferredDate2"
                        name="preferredDate2"
                        type="date"
                        required
                        value={preferredDate2}
                        onChange={(event) => handlePreferredDate2Change(event.target.value)}
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredTime2">Time window (1 hour)</Label>
                      <select
                        id="preferredTime2"
                        name="preferredTime2"
                        required
                        value={preferredTime2}
                        onChange={(event) => setPreferredTime2(event.target.value)}
                        className={selectClassName}
                        disabled={!preferredDate2}
                      >
                        <option value="" disabled>
                          {timePlaceholder2}
                        </option>
                        {timeWindows2.map((window) => (
                          <option key={window.value} value={window.value}>
                            {window.label}
                          </option>
                        ))}
                      </select>
                      {isWeekend2 && preferredDate2 ? (
                        <p className="text-xs text-rose-600">
                          Office is closed on weekends. Please choose a weekday date.
                        </p>
                      ) : preferredDate2 ? (
                        <p className="text-xs text-slate-500">
                          Friday windows end at 2:00 PM.
                        </p>
                      ) : (
                        <p className="text-xs text-slate-500">
                          Select a date to see available time windows.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 text-primary" />
                    <div>
                      <p className="font-semibold text-slate-700">Office hours</p>
                      <p className="text-slate-600">
                        Monday - Thursday: {officeInfo.hours.monday} | Friday: {officeInfo.hours.friday} | Closed weekends
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" className="h-12 w-full rounded-full px-6 text-base sm:w-auto">
                    Submit scheduling request
                  </Button>
                  <div className="flex items-start gap-2 text-xs text-slate-500">
                    <CheckCircle className="mt-0.5 h-3.5 w-3.5 text-primary" />
                    <span>
                      By submitting, you confirm you are comfortable with photo and video capture during your visit.
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50 p-6 sm:p-10 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Learn more
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold font-heading text-[#162338]">
                  See how ZOOM! Whitening works
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
                  Review the in-office process, timeline, and expected results before your visit.
                </p>
              </div>
              <Link href="/zoom-whitening">
                <Button className="h-12 w-full rounded-full px-6 text-base md:w-auto">
                  Explore the ZOOM! process
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ZoomWhiteningSchedule;
