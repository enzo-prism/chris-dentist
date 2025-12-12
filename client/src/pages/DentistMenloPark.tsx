import MetaTags from "@/components/common/MetaTags";
import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";
import RelatedServices, { type RelatedServiceLink } from "@/components/common/RelatedServices";
import StructuredData from "@/components/seo/StructuredData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { officeInfo } from "@/lib/data";
import { getSeoForPath } from "@/lib/seo";
import { buildBreadcrumbSchema, buildFAQSchema, type StructuredDataNode } from "@/lib/structuredData";
import { Link } from "wouter";

const DentistMenloPark = () => {
  const seo = getSeoForPath("/dentist-menlo-park");
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Menlo Park Dentist", path: "/dentist-menlo-park" },
  ];

  const faqs = [
    {
      question: "Do you accept patients from Menlo Park?",
      answer:
        "Yes. Many of our patients live or work in Menlo Park and appreciate how close our Palo Alto office is for routine and urgent care.",
    },
    {
      question: "What services are most popular for Menlo Park patients?",
      answer:
        "Preventive cleanings, Invisalign, cosmetic veneers, implant restorations, and same‑day emergency visits are common reasons Menlo Park patients see us.",
    },
    {
      question: "Is parking easy at your office?",
      answer:
        "Yes. Our Palo Alto location has nearby street and lot parking, and we’ll share the best options when you schedule.",
    },
    {
      question: "Can I bring my whole family?",
      answer:
        "Absolutely. We’re a family practice and welcome kids, teens, adults, and seniors.",
    },
  ];

  const structuredDataNodes: StructuredDataNode[] = [];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const faqSchema = buildFAQSchema(faqs, "/dentist-menlo-park");
  if (breadcrumbSchema) structuredDataNodes.push(breadcrumbSchema);
  if (faqSchema) structuredDataNodes.push(faqSchema);

  const relatedServices: RelatedServiceLink[] = [
    { href: "/invisalign", anchorText: "Invisalign in Palo Alto" },
    { href: "/dental-implants", anchorText: "Dental implants near Menlo Park" },
    { href: "/emergency-dental", anchorText: "Emergency dentist for Menlo Park patients" },
    { href: "/teeth-whitening-palo-alto", anchorText: "Teeth whitening in Palo Alto" },
    { href: "/services", anchorText: "All dental services" },
  ];

  return (
    <>
      <MetaTags title={seo.title} description={seo.description} />
      {structuredDataNodes.length > 0 && <StructuredData data={structuredDataNodes} />}
      <PageBreadcrumbs items={breadcrumbItems} />

      <section className="bg-[#F5F9FC] py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-[#1F2933]">
            Menlo Park Dentist — Care Nearby in Palo Alto
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed">
            If you’re searching for a trusted Menlo Park dentist, our office is just
            a short drive away in Palo Alto. Dr. Christopher B. Wong provides modern,
            conservative dentistry for patients throughout the Peninsula. Many Menlo
            Park families choose us for personalized care, clear communication, and a
            practice that feels calm from the moment you walk in.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            Whether you need a routine cleaning, Invisalign, a cosmetic upgrade, or
            help with a sudden toothache, we make it easy to get the care you need
            close to home. Our team sees adults, seniors, teens, and children, so your
            whole household can stay on one consistent dental schedule.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/schedule#appointment">
              <Button className="bg-primary text-white hover:bg-primary/90">
                Schedule a visit
              </Button>
            </Link>
            <a href={`tel:${officeInfo.phoneE164}`}>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                Call {officeInfo.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-bold font-heading text-[#1F2933]">
            What Menlo Park patients come to us for
          </h2>
          <p className="text-slate-700 leading-relaxed">
            We’re known for thorough preventive care and a conservative approach to
            restoring teeth. That means we focus on protecting healthy structure,
            catching problems early, and avoiding unnecessary treatment. If you’re
            considering orthodontics,{" "}
            <Link href="/invisalign" className="text-primary font-semibold hover:underline">
              Invisalign in Palo Alto
            </Link>{" "}
            is one of our most requested services because it fits busy Menlo Park
            work and school schedules.
          </p>
          <p className="text-slate-700 leading-relaxed">
            For patients with missing teeth, we work closely with trusted surgical
            partners and provide long‑term implant restorations. If something urgent
            happens, our{" "}
            <Link href="/emergency-dental" className="text-primary font-semibold hover:underline">
              emergency dental care
            </Link>{" "}
            team can often see Menlo Park patients the same day.
          </p>

          <h2 className="text-3xl font-bold font-heading text-[#1F2933]">
            Convenient location and clear communication
          </h2>
          <p className="text-slate-700 leading-relaxed">
            Our office is located at {officeInfo.address.line1}, {officeInfo.address.line2}.
            We’ll give you straightforward recommendations and explain what we see in
            plain language. If there are multiple options, we’ll walk through pros,
            costs, and timing so you can decide confidently.
          </p>

          <h2 className="text-3xl font-bold font-heading text-[#1F2933]">
            Why Menlo Park patients choose Dr. Wong
          </h2>
          <p className="text-slate-700 leading-relaxed">
            Many Menlo Park neighbors tell us they value a practice that feels personal,
            not rushed. Dr. Wong takes time to understand your goals, review the health
            of your teeth and gums, and outline a plan that makes sense for you. We’re
            focused on long‑term stability—protecting the teeth you have and restoring
            them in ways that look natural and hold up to daily life.
          </p>
          <p className="text-slate-700 leading-relaxed">
            You’ll also find a modern, comfortable environment. We use digital imaging,
            conservative techniques, and clear follow‑up so you know what to expect
            before, during, and after treatment. Whether you’re coming in for routine
            care or a bigger restorative project, our team aims to make every visit
            smooth and predictable.
          </p>
        </div>
      </section>

      <section className="py-12 bg-[#F5F9FC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-heading text-[#1F2933] mb-6">
            Menlo Park dentist FAQs
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.question}
                value={faq.question}
                className="bg-white rounded-2xl border border-slate-100 px-5"
              >
                <AccordionTrigger className="text-left text-slate-900">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <RelatedServices items={relatedServices} className="bg-white" />
    </>
  );
};

export default DentistMenloPark;
