import MetaTags from "@/components/common/MetaTags";
import CanonicalUrl from "@/components/seo/CanonicalUrl";
import StructuredData from "@/components/seo/StructuredData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { officeInfo } from "@/lib/data";
import { ogImages } from "@/lib/ogImages";
import { pageDescriptions, pageTitles } from "@/lib/metaContent";
import { absoluteUrl } from "@/lib/structuredData";
import { cn } from "@/lib/utils";
import { ArrowRight, ShieldCheck, Sparkles, Timer } from "lucide-react";
import { Link } from "wouter";

type CaseImage = {
  src: string;
  alt: string;
};

type CaseStudy = {
  id: string;
  title: string;
  subtitle: string;
  patientSummary: string;
  timeline: string;
  summary: string;
  challenges: string[];
  treatments: string[];
  outcomes: string[];
  services: string[];
  quote: string;
  quoteAttribution: string;
  images: CaseImage[];
  heroImage: string;
  metrics: { label: string; value: string; description?: string }[];
};

const caseStudies: CaseStudy[] = [
  {
    id: "invisalign-whitening-bonding-66yo",
    title: "Never too late for a new smile",
    subtitle: "66-year-old patient | Alignment, whitening, and bonding",
    patientSummary:
      "She wanted a confident smile for everyday moments and photos.",
    timeline: "Roughly 12 months with Invisalign®, 1 in-office Zoom! Whitening session, followed by precise bonding to close lower black triangles.",
    summary:
      "A thoughtful sequence of orthodontics, whitening, and minimally invasive bonding created a brighter, fuller smile without aggressive drilling or veneers.",
    challenges: [
      "Crowding and rotated teeth that had shifted over time",
      "Black triangle spaces on the lower front teeth",
      "Darkened shade from years of coffee and tea",
    ],
    treatments: [
      "Invisalign® clear aligners for about a year to gently align teeth",
      "One in-office Zoom! Whitening session after aligner therapy",
      "Targeted composite bonding on lower front teeth to close black triangles",
    ],
    outcomes: [
      "Aligned, more balanced smile arc",
      "Brighter shade after whitening with a natural finish",
      "Closed black triangles for a fuller, more youthful look",
    ],
    services: ["Invisalign®", "Zoom! Whitening", "Cosmetic Bonding"],
    quote: "",
    quoteAttribution: "",
    heroImage:
      "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1765382510/IMG_8356_bjxk7p.webp",
    metrics: [
      { label: "Treatment span", value: "~12 months", description: "Clear aligners at a steady pace" },
      { label: "Finishing touch", value: "1 visit", description: "Zoom! Whitening in-office" },
      { label: "Detailing", value: "Composite bonding", description: "Closed lower black triangles" },
    ],
    images: [
      {
        src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1765382511/IMG_8352_qyutwv.webp",
        alt: "Aligned smile after Invisalign treatment",
      },
      {
        src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1765382511/IMG_8340_xzb2ng.webp",
        alt: "Close-up of patient smile after whitening",
      },
      {
        src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1765382511/IMG_8344_jdmiv8.webp",
        alt: "Lower front teeth after bonding",
      },
      {
        src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1765382510/IMG_8356_bjxk7p.webp",
        alt: "Full face smiling portrait after treatment",
      },
      {
        src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1765382510/IMG_8358_ksxmqv.webp",
        alt: "Side profile of smile showing alignment",
      },
      {
        src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1765382511/IMG_8360_jdhsxg.webp",
        alt: "Smiling portrait with improved symmetry",
      },
      {
        src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1765382511/IMG_8348_rk2lap.webp",
        alt: "Lower teeth detail after black triangle closure",
      },
      {
        src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1765382511/IMG_8346_aqnhjl.webp",
        alt: "Upper teeth detail after whitening",
      },
    ],
  },
];

const PatientStories = () => {
  const structuredData = caseStudies.map((study) => ({
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: study.title,
    description: study.summary,
    howPerformed: study.treatments.join("; "),
    preparation: study.timeline,
    outcome: study.outcomes.join("; "),
    image: study.images.map((img) => img.src),
    procedureType: "Dental",
    provider: {
      "@type": "Dentist",
      name: officeInfo.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: officeInfo.address.line1,
        addressLocality: "Palo Alto",
        addressRegion: "CA",
        postalCode: "94306",
        addressCountry: "US",
      },
    },
    url: absoluteUrl(`/patient-stories#${study.id}`),
  }));

  return (
    <>
      <MetaTags
        title={pageTitles.patientStories}
        description={pageDescriptions.patientStories}
        image={ogImages.patientStories}
      />
      <CanonicalUrl path="/patient-stories" />
      <StructuredData data={structuredData} />

      <section className="bg-gradient-to-b from-[#F5F9FC] via-white to-[#F5F9FC] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/15">
              Patient Stories & Transformations
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-[#1F2933] mb-4">
              Real patients. Real results.
            </h1>
            <p className="text-lg text-[#334155] leading-relaxed mb-6">
              Every smile starts with a conversation. See how Dr. Wong and the team combine conservative care,
              technology, and attention to detail to help patients feel confident at any age.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/schedule#appointment">
                <Button className="bg-primary text-white hover:bg-primary/90">
                  Schedule a consultation
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Ask a question
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-4 sm:grid-cols-3">
          <Card className="border-slate-100 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3 pb-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Timer className="h-5 w-5" />
              </div>
              <CardTitle className="text-base font-semibold text-slate-800">Thoughtful sequencing</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Align first, brighten next, then refine with bonding. We stage care to protect tooth structure and maximize results.
            </CardContent>
          </Card>
          <Card className="border-slate-100 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3 pb-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <CardTitle className="text-base font-semibold text-slate-800">Conservative dentistry</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              We prioritize minimally invasive options—aligners and bonding before irreversible drilling or crowns.
            </CardContent>
          </Card>
          <Card className="border-slate-100 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3 pb-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <CardTitle className="text-base font-semibold text-slate-800">Confidence that lasts</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              Shade, alignment, and tooth shape are balanced to look natural today and age gracefully over time.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {caseStudies.map((study) => (
            <article
              key={study.id}
              id={study.id}
              className="rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden"
            >
              <div className="grid lg:grid-cols-[1.2fr_1fr] gap-0">
                <div className="p-8 md:p-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      Featured case
                    </Badge>
                    <span className="text-sm text-slate-500">{study.subtitle}</span>
                  </div>
                  <h2 className="text-3xl font-bold font-heading text-slate-900 mb-3">
                    {study.title}
                  </h2>
                  <p className="text-slate-700 leading-relaxed mb-4">{study.patientSummary}</p>
                  <div className="text-sm text-slate-600 bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6">
                    <strong className="text-slate-800">Plan: </strong>
                    {study.timeline}
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    {study.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                        <p className="text-xs uppercase tracking-wide text-slate-500 mb-1">{metric.label}</p>
                        <p className="text-lg font-semibold text-slate-900">{metric.value}</p>
                        {metric.description && (
                          <p className="text-xs text-slate-500 mt-1">{metric.description}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 mb-6">
                    <p className="text-sm font-semibold text-slate-800">What bothered the patient</p>
                    <ul className="list-disc list-inside text-slate-700 space-y-1">
                      {study.challenges.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 mb-6">
                    <p className="text-sm font-semibold text-slate-800">How we treated it</p>
                    <ul className="list-disc list-inside text-slate-700 space-y-1">
                      {study.treatments.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-3 mb-6">
                    <p className="text-sm font-semibold text-slate-800">Outcome</p>
                    <ul className="list-disc list-inside text-slate-700 space-y-1">
                      {study.outcomes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {study.services.map((service) => (
                      <Badge key={service} variant="outline" className="border-primary/30 text-primary">
                        {service}
                      </Badge>
                    ))}
                  </div>

                  {study.quote && (
                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 mb-8">
                      <p className="text-primary font-semibold leading-relaxed">“{study.quote}”</p>
                      {study.quoteAttribution && (
                        <p className="text-sm text-primary/80 mt-2">{study.quoteAttribution}</p>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/schedule#appointment">
                      <Button className="bg-primary text-white hover:bg-primary/90">
                        Start your plan
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                        Talk with our team
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 md:p-8">
                  <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm mb-4">
                    <img
                      src={study.heroImage}
                      alt="Case study hero"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    Progress photos from the case — aligner tracking, shade improvement, and bonding detailing.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {study.images.map((image, index) => (
                      <div
                        key={`${image.src}-${index}`}
                        className={cn(
                          "overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm",
                          "transition transform hover:-translate-y-1 hover:shadow-md"
                        )}
                      >
                        <img src={image.src} alt={image.alt} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-primary text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="text-3xl font-heading font-bold">Your story can be next.</h3>
          <p className="text-white/90 max-w-3xl mx-auto">
            Whether you want subtle refinements or a full smile refresh, we’ll map a plan that fits your goals and timeline.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link href="/schedule#appointment">
              <Button className="bg-white text-primary hover:bg-white/90">
                Book a visit
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Explore services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Separator />
    </>
  );
};

export default PatientStories;
