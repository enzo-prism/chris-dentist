import { Sparkles, Clock, Shield, Smile, ArrowRight, CheckCircle, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import MetaTags from "@/components/common/MetaTags";
import StructuredData from "@/components/seo/StructuredData";
import OptimizedImage from "@/components/seo/OptimizedImage";
import { pageTitles, pageDescriptions } from "@/lib/metaContent";
import { buildBreadcrumbSchema, buildHowToSchema, buildServiceSchema } from "@/lib/structuredData";
import { getTestimonialsByNames } from "@/lib/testimonials";
import { motion } from "framer-motion";
import { drWongImages } from "@/lib/imageUrls";
import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";

const ZoomWhitening = () => {
  const whiteningPerks = [
    {
      title: "Visible in one visit",
      description: "Up to eight shades brighter in a single 90-minute appointment.",
      icon: <Clock className="h-6 w-6 text-primary" />,
    },
    {
      title: "Minimized sensitivity",
      description: "Protective gel, desensitizing agents, and careful light settings keep you comfortable.",
      icon: <Shield className="h-6 w-6 text-primary" />,
    },
    {
      title: "Even, natural results",
      description: "Customized shade goals to brighten without looking artificial.",
      icon: <Smile className="h-6 w-6 text-primary" />,
    },
  ];

  const treatmentSteps = [
    { title: "Shade goal & exam", description: "We confirm your whitening goals, check for decay or cracks, and take baseline photos." },
    { title: "Prep & protection", description: "We isolate gums and lips, then apply a protective gel to keep soft tissue safe." },
    { title: "ZOOM light sessions", description: "Three to four 15-minute cycles with ZOOM whitening gel and controlled light activation." },
    { title: "Fluoride & post-care", description: "Sensitivity care, custom shade check, and at-home guidance to keep results bright." },
  ];

  const whiteningTestimonials = getTestimonialsByNames([
    "Kat Vasilakos",
    "Kevin Zhang",
    "Ashley Chung",
  ]);

  const serviceSchema = buildServiceSchema({
    name: "ZOOM! Teeth Whitening",
    description: "Fast in-office ZOOM! whitening in Palo Alto to lift deep stains and brighten smiles with minimal sensitivity.",
    slug: "/zoom-whitening",
    serviceType: "Teeth Whitening",
  });

  const howToSchema = buildHowToSchema({
    name: "ZOOM Whitening Appointment Steps",
    description: "What to expect during a ZOOM teeth whitening visit with Dr. Wong in Palo Alto.",
    steps: treatmentSteps.map((step, index) => ({
      title: step.title,
      description: step.description,
      duration: index === 2 ? "45-60 minutes" : undefined,
    })),
    pagePath: "/zoom-whitening",
  });

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "ZOOM Whitening", path: "/zoom-whitening" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  const schemaNodes = [serviceSchema];

  if (howToSchema) schemaNodes.push(howToSchema);
  if (breadcrumbSchema) schemaNodes.push(breadcrumbSchema);
  return (
    <>
      <MetaTags 
        title={pageTitles.zoomWhitening}
        description={pageDescriptions.zoomWhitening}
      />
      <StructuredData data={schemaNodes} />
      <PageBreadcrumbs items={breadcrumbItems} />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0f2f27] via-[#123129] to-white pt-28 pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-xs font-semibold mb-4 backdrop-blur">
                <Sun className="h-4 w-4" />
                In-office ZOOM! Whitening
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading leading-tight mb-4">
                Brighter teeth in one visit with ZOOM! Whitening in Palo Alto
              </h1>
              <p className="text-lg text-white/80 leading-relaxed mb-6 max-w-xl">
                Lift deep stains, coffee discoloration, and dullness with Dr. Wong&apos;s fast, gentle ZOOM! treatment—designed for noticeably whiter teeth with minimal sensitivity.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <Link href="/schedule#appointment">
                  <Button className="bg-[#f2d785] hover:bg-[#f6e2a4] text-[#0f2f27] font-semibold px-6 py-6 h-auto rounded-full flex items-center gap-2">
                    Book whitening visit
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-white/40 text-white hover:text-[#f2d785] hover:border-[#f2d785]/60 bg-white/5">
                    Ask a question
                  </Button>
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/75">
                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full">
                  <CheckCircle className="h-4 w-4 text-[#f2d785]" />
                  Same-day results
                </div>
                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full">
                  <CheckCircle className="h-4 w-4 text-[#f2d785]" />
                  Minimal downtime
                </div>
                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full">
                  <CheckCircle className="h-4 w-4 text-[#f2d785]" />
                  Sensitivity-managed
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-white/10 rounded-3xl blur-3xl" aria-hidden />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <OptimizedImage
                  src={drWongImages.drWongOffice2}
                  alt="Patient smiling after professional teeth whitening"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">
              Why patients choose ZOOM! Whitening with Dr. Wong
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Fast, controlled whitening with safeguards to keep teeth healthy and sensitivity low.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {whiteningPerks.map((perk, index) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {perk.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{perk.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-4">What to expect during your visit</h2>
              <p className="text-gray-600 mb-6">
                Every whitening appointment starts with a quick health check to ensure your gums, enamel, and restorations are ready for treatment.
              </p>
              <div className="space-y-4">
                {treatmentSteps.map((step, index) => (
                  <div key={step.title} className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-sm text-gray-600">
                Pro tip: avoid coffee, tea, or red wine for 48 hours after treatment to lock in your shade.
              </div>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Ideal for
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-primary" />
                  Surface and deeper stains from coffee, tea, wine, or aging
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-primary" />
                  Events and photos when you want same-day brightness
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 mt-0.5 text-primary" />
                  Patients who want professional oversight vs. DIY kits
                </li>
              </ul>
              <div className="mt-6 bg-[#F5F9FC] border border-gray-100 rounded-xl p-4">
                <p className="text-sm text-gray-700">
                  If you have veneers, crowns, or bonding on front teeth, we&apos;ll review options to match or refresh your shade.
                </p>
              </div>
              <div className="mt-6">
                <Link href="/schedule#appointment">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90">
                    Schedule ZOOM! whitening
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-900 mb-3">
              Patients love their brighter smiles
            </h2>
            <p className="text-gray-600">Real feedback from patients who trust Dr. Wong for cosmetic care.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {whiteningTestimonials.map((testimonial, index) => (
              <div key={testimonial.name} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Sparkles key={i} className={`h-4 w-4 ${i < testimonial.rating ? "fill-current" : ""}`} />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">“{testimonial.text}”</p>
                <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-4">
            Ready for a brighter smile?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-6">
            Book your ZOOM! teeth whitening visit in Palo Alto. We&apos;ll confirm you&apos;re a good candidate and set a shade goal that looks natural on you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/schedule#appointment">
              <Button className="bg-[#f2d785] text-[#0f2f27] hover:bg-[#f6e2a4] px-6 py-3 font-semibold shadow-sm">
                Schedule now
              </Button>
            </Link>
            <Link href="/services">
              <Button className="bg-white/10 text-white border border-white/70 hover:bg-white/20 px-6 py-3 font-semibold">
                Explore other services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ZoomWhitening;
