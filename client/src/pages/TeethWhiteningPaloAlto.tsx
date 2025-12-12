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

const TeethWhiteningPaloAlto = () => {
  const seo = getSeoForPath("/teeth-whitening-palo-alto");
  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Teeth Whitening in Palo Alto", path: "/teeth-whitening-palo-alto" },
  ];

  const faqs = [
    {
      question: "Is professional teeth whitening safe?",
      answer:
        "Yes. We evaluate your teeth and gums first, then use dentist‑supervised whitening gel and controlled light or take‑home trays to brighten safely without harming enamel.",
    },
    {
      question: "How long do whitening results last?",
      answer:
        "Most patients enjoy results for 12–24 months. The exact timeline depends on coffee/tea, red wine, tobacco, and how consistently you follow home care.",
    },
    {
      question: "Will whitening make my teeth sensitive?",
      answer:
        "Mild sensitivity is common for a day or two. We tailor the strength and timing to your comfort and can recommend desensitizing toothpaste or in‑office fluoride.",
    },
    {
      question: "What’s the difference between ZOOM whitening and store‑bought kits?",
      answer:
        "In‑office whitening uses higher‑quality gel and professional isolation, so you see a bigger change faster and with less risk of irritation. Store kits can help, but they’re less predictable.",
    },
    {
      question: "Can crowns or veneers be whitened?",
      answer:
        "No. Whitening only changes natural enamel. If you have visible restorations, we’ll plan whitening first and then match new restorations to your brighter shade if needed.",
    },
  ];

  const structuredDataNodes: StructuredDataNode[] = [];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const faqSchema = buildFAQSchema(faqs, "/teeth-whitening-palo-alto");
  if (breadcrumbSchema) structuredDataNodes.push(breadcrumbSchema);
  if (faqSchema) structuredDataNodes.push(faqSchema);

  const relatedServices: RelatedServiceLink[] = [
    {
      href: "/zoom-whitening",
      anchorText: "ZOOM whitening in Palo Alto",
      description: "Fast, in‑office whitening for noticeable results in one visit.",
    },
    {
      href: "/dental-veneers",
      anchorText: "Cosmetic veneers in Palo Alto",
      description: "Cover deep stains and reshape teeth for a new smile.",
    },
    {
      href: "/invisalign",
      anchorText: "Invisalign clear aligners",
      description: "Straighten teeth before finishing with whitening.",
    },
    {
      href: "/services#preventive-dentistry",
      anchorText: "Preventive dentistry",
      description: "Cleanings and exams to keep your smile bright long‑term.",
    },
  ];

  return (
    <>
      <MetaTags title={seo.title} description={seo.description} />
      {structuredDataNodes.length > 0 && <StructuredData data={structuredDataNodes} />}
      <PageBreadcrumbs items={breadcrumbItems} />

      <section className="bg-[#F5F9FC] py-12 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-[#1F2933]">
            Teeth Whitening in Palo Alto
          </h1>
          <p className="text-lg text-slate-700 leading-relaxed">
            If your smile feels a little dull from coffee, tea, red wine, or natural
            aging, professional teeth whitening is one of the fastest ways to look
            refreshed. At Christopher B. Wong, DDS, we offer safe, dentist‑supervised
            whitening tailored to your goals and sensitivity level, so you get a
            noticeably brighter smile without guessing or over‑doing it.
          </p>
          <p className="text-lg text-slate-700 leading-relaxed">
            We start with a quick evaluation to make sure whitening is right for you.
            If there’s decay, worn enamel, or gum inflammation, we’ll address that
            first so whitening feels comfortable and lasts longer. For most Palo Alto
            patients, whitening is a great fit before a big event, as part of a smile
            makeover, or simply because you want to feel more confident day‑to‑day.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/schedule#appointment">
              <Button className="bg-primary text-white hover:bg-primary/90">
                Schedule whitening consultation
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
            Whitening options we offer
          </h2>
          <p className="text-slate-700 leading-relaxed">
            Our most popular option is professional in‑office whitening using ZOOM!
            technology. In a single visit, we isolate the gums, apply a high‑quality
            whitening gel, and activate it with a controlled light. Patients usually
            see multiple shades of improvement the same day. If you’d prefer a more
            gradual approach, we also offer custom take‑home trays with professional
            gel and precise instructions.
          </p>
          <p className="text-slate-700 leading-relaxed">
            Not sure which to choose? Many Palo Alto patients do a “boost + maintain”
            plan: an in‑office session for a quick jump in brightness, then take‑home
            trays a few times a year to maintain results. We’ll help you pick a plan
            that matches your timeline and comfort level.
          </p>

          <h2 className="text-3xl font-bold font-heading text-[#1F2933]">
            What to expect at your whitening visit
          </h2>
          <p className="text-slate-700 leading-relaxed">
            Your appointment starts with shade photos so we can measure improvement.
            We protect lips and gums, then apply the whitening gel in short sessions.
            If you’re prone to sensitivity, we can adjust the concentration or timing
            and add desensitizing steps. After we reach your target shade, we review
            home care and foods to avoid for the first 24–48 hours.
          </p>

          <h2 className="text-3xl font-bold font-heading text-[#1F2933]">
            Keeping your results bright
          </h2>
          <p className="text-slate-700 leading-relaxed">
            Whitening lasts longest when your teeth are healthy and clean. Regular
            visits for{" "}
            <Link href="/dental-cleaning-palo-alto" className="text-primary font-semibold hover:underline">
              dental cleanings in Palo Alto
            </Link>{" "}
            help remove surface stains and keep your shade stable. At home, brush
            twice daily, floss, and consider using a whitening toothpaste a few times
            per week. If you drink staining beverages, rinsing with water afterward
            can make a big difference.
          </p>
        </div>
      </section>

      <section className="py-12 bg-[#F5F9FC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-heading text-[#1F2933] mb-6">
            Teeth whitening FAQs
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

      <RelatedServices
        items={relatedServices}
        title="Related services"
        subtitle="Combine whitening with other smile‑enhancing treatments."
        className="bg-white"
      />

      <section className="py-12 bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-3xl font-bold font-heading">
            Ready for a brighter smile?
          </h2>
          <p className="text-white/90">
            We’ll help you choose the right whitening plan and reach a shade that looks
            natural on you. Schedule a visit or call our Palo Alto office today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/schedule#appointment">
              <Button className="bg-[#f2d785] text-[#0f2f27] hover:bg-[#f6e2a4] font-semibold">
                Book whitening visit
              </Button>
            </Link>
            <a href={`tel:${officeInfo.phoneE164}`}>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Call {officeInfo.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default TeethWhiteningPaloAlto;

