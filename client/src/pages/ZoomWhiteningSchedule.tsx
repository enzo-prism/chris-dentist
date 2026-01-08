import { CalendarDays, Camera, CheckCircle, Clock, Sparkles } from "lucide-react";
import MetaTags from "@/components/common/MetaTags";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { officeInfo } from "@/lib/data";

const ZoomWhiteningSchedule = () => {
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
                  Pick two date and time options within office hours. We will confirm the best fit.
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-white/95 p-6 sm:p-8 text-[#162338] shadow-2xl ring-1 ring-white/40 backdrop-blur">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading">Request your visit</h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600">
                Enter your name, then select two possible appointment windows. All times are Pacific.
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
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredTime1">Time</Label>
                      <Input
                        id="preferredTime1"
                        name="preferredTime1"
                        type="time"
                        min="08:00"
                        max="17:00"
                        step="900"
                        required
                        className="h-12 rounded-xl"
                      />
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
                        className="h-12 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredTime2">Time</Label>
                      <Input
                        id="preferredTime2"
                        name="preferredTime2"
                        type="time"
                        min="08:00"
                        max="17:00"
                        step="900"
                        required
                        className="h-12 rounded-xl"
                      />
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
    </>
  );
};

export default ZoomWhiteningSchedule;
