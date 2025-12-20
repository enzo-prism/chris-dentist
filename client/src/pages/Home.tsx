import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import AboutDoctorSection from "@/components/sections/AboutDoctorSection";
import ServiceCard from "@/components/common/ServiceCard";
import TestimonialCard from "@/components/common/TestimonialCard";
import TypeFormEmbed from "@/components/forms/TypeFormEmbed";
import MetaTags from "@/components/common/MetaTags";
import FAQSection from "@/components/common/FAQSection";
import StructuredData from "@/components/seo/StructuredData";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Phone } from "lucide-react";
import { Link } from "wouter";
import { Service, Testimonial } from "@shared/schema";
import { motion } from "framer-motion";
import { pageTitles, pageDescriptions } from "@/lib/metaContent";
import { buildInsertTestimonial, testimonialSeedData } from "@shared/testimonialsData";
import { officeInfo } from "@/lib/data";
import {
  buildFAQSchema,
  buildOrganizationSchema,
  buildPersonSchema,
  buildWebSiteSchema,
  type FAQEntry,
} from "@/lib/structuredData";

const Home = () => {

  
  // Fetch services
  const { data: services, isLoading: isLoadingServices } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  // Fetch testimonials
  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const fallbackTestimonials = useMemo<Testimonial[]>(() => {
    return testimonialSeedData.map((seed, index) => ({
      id: index + 1,
      ...buildInsertTestimonial(seed, index),
    }));
  }, []);

  const apiCount = testimonials?.length ?? 0;
  const fallbackCount = fallbackTestimonials.length;
  const shouldUseApiData = apiCount >= fallbackCount && apiCount > 0;
  const testimonialsData = shouldUseApiData ? testimonials! : fallbackTestimonials;
  const testimonialsToShow = testimonialsData.slice(0, 4);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const cardWidth = container.firstElementChild?.clientWidth ?? 1;
    const scrollLeft = container.scrollLeft;
    const index = Math.round(scrollLeft / cardWidth);
	    setActiveTestimonial(Math.min(Math.max(index, 0), testimonialsToShow.length - 1));
	  };

    const homeFaqs: FAQEntry[] = [
      {
        question: "Where is your Palo Alto dental office located?",
        answer: `Our office is located at ${officeInfo.address.line1}, ${officeInfo.address.line2}. Use the directions link on this page or call our team if you’d like parking tips before your visit.`,
      },
      {
        question: "Are you accepting new patients?",
        answer:
          "Yes—new patients are welcome. We’ll start with a thorough exam and a clear conversation about your goals, concerns, and the next best steps.",
      },
      {
        question: "What services do you offer?",
        answer:
          "We offer preventive checkups and cleanings, cosmetic dentistry, Invisalign, restorative care, and emergency dental visits. Explore our services page for details and common next steps.",
      },
      {
        question: "Do you accept dental insurance?",
        answer:
          "We work with many PPO insurance plans. If you share your plan information, our team can help verify benefits and walk through expected costs before you commit to treatment.",
      },
      {
        question: "What if I have a dental emergency?",
        answer:
          "If you have significant pain, swelling, or a broken tooth, call our office as soon as possible. We’ll help you understand what to do next and schedule urgent care when available.",
      },
      {
        question: "How do I schedule an appointment?",
        answer:
          "You can request an appointment online or call our office. We’ll confirm a time and help you prepare for your first visit.",
      },
    ];

    const schemaNodes = [
      buildOrganizationSchema({ services: services ?? [] }),
      buildPersonSchema(),
      buildWebSiteSchema(),
    ];
    const faqSchema = buildFAQSchema(homeFaqs, "/");
    if (faqSchema) {
      schemaNodes.push(faqSchema);
    }

	  return (
	    <>
	      <MetaTags 
        title={pageTitles.home}
        description={pageDescriptions.home}
      />
      <StructuredData data={schemaNodes} />
      <HeroSection />

      {/* Local relevance section */}
      <section id="palo-alto-dentist" className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#1F2933]">
                Dentist in Palo Alto, CA
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                If you’re looking for a dentist in Palo Alto, our team provides
                modern, conservative dentistry focused on long‑term comfort and
                oral health. We welcome patients from Palo Alto, Stanford,
                Menlo Park, and nearby Peninsula neighborhoods.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                From checkups and cleanings to Invisalign, cosmetic veneers, and
                restorative care, we’ll explain what we see and help you choose
                a plan that fits your goals and schedule.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link href="/schedule#appointment">
                  <Button className="bg-primary text-white hover:bg-primary/90">
                    Request an appointment
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                    Explore dental services
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-100 bg-[#F5F9FC] p-6 shadow-sm space-y-5">
                <div>
                  <h3 className="text-sm font-semibold tracking-wide text-slate-900 uppercase">
                    Office location
                  </h3>
                  <p className="mt-2 text-slate-800 leading-relaxed">
                    {officeInfo.address.line1}
                    <br />
                    {officeInfo.address.line2}
                  </p>
                  <a
                    href={officeInfo.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center text-primary font-semibold hover:underline"
                  >
                    Get directions
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-semibold tracking-wide text-slate-900 uppercase">
                    Call
                  </h3>
                  <a
                    href={`tel:${officeInfo.phoneE164}`}
                    className="mt-2 inline-flex items-center text-slate-800 font-semibold hover:text-primary transition-colors"
                  >
                    {officeInfo.phone}
                  </a>
                </div>

                <div>
                  <h3 className="text-sm font-semibold tracking-wide text-slate-900 uppercase">
                    Hours
                  </h3>
                  <p className="mt-2 text-slate-700 leading-relaxed text-sm">
                    Mon–Thu: {officeInfo.hours.monday}
                    <br />
                    Fri: {officeInfo.hours.friday}
                    <br />
                    Sat–Sun: {officeInfo.hours.saturday}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Testimonials Spotlight */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-white via-[#F5F9FC] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#1F2933]">Loved by our patients</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full"
          >
            <div
              className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 sm:hidden"
              onScroll={handleScroll}
            >
              {testimonialsToShow.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="snap-center shrink-0 basis-full px-4"
                  style={{ minWidth: "0" }}
                >
                  <TestimonialCard testimonial={testimonial} index={index} />
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 sm:hidden">
              {testimonialsToShow.map((_, index) => (
                <span
                  key={`dot-${index}`}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    activeTestimonial === index ? "bg-primary w-3" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>

            <div className="hidden grid-cols-2 gap-6 sm:grid xl:grid-cols-4">
              {testimonialsToShow.map((testimonial, index) => (
                <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} index={index} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 flex justify-center"
          >
            <Link href="/testimonials">
              <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-full inline-flex items-center gap-2 shadow-sm transition hover:shadow-md hover:scale-105">
                Read more patient stories
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <FeaturesSection />

      {/* About Section */}
      <AboutDoctorSection />

      {/* Services Section */}
	      <section id="services" className="py-16 md:py-20 bg-gradient-to-b from-white to-gray-50/30">
	        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-gray-900 mb-6">
              Our Services
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive dental care using the latest techniques and technology to improve your oral health and enhance your smile.{" "}
              <Link
                href="/invisalign"
                className="text-primary font-semibold hover:underline"
              >
                Invisalign in Palo Alto
              </Link>{" "}
              offers a discreet way to straighten teeth with a personalized plan.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto mt-8 rounded-full"></div>
          </div>
          
          {/* Services Grid - Responsive: 1 column on mobile, 3 columns on desktop */}
          {isLoadingServices ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
                  <div className="w-full h-48 md:h-56 bg-gray-200"></div>
                  <div className="p-6 md:p-8">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {services?.slice(0, 3).map((service) => (
                <div key={service.id} className="h-full">
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>
          )}
          
          {/* CTA Button */}
          <div className="text-center mt-16">
            <Link href="/services">
              <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-4 rounded-full inline-flex items-center gap-2 shadow-sm transition-all hover:shadow-md hover:scale-105">
                <span>View All Services</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
	        </div>
	      </section>

        <FAQSection
          title="Palo Alto dentist FAQs"
          subtitle="Quick answers about visiting our office, insurance, and scheduling."
          items={homeFaqs}
          className="bg-white"
        />

	      {/* Appointment Section */}
	      <section id="appointment" className="py-16 bg-[#F5F9FC]">
	        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-primary p-8 md:p-12 text-white">
                <h2 className="text-3xl font-bold font-heading mb-4">Schedule Your Appointment</h2>
                <p className="mb-6">Choose between in-person visits or convenient virtual consultations for your initial assessment.</p>
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>HIPAA-compliant secure scheduling</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>Same-day appointments available</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>Easy rescheduling if needed</span>
                  </div>
                </div>
                <div className="p-4 bg-blue-900 bg-opacity-50 rounded-lg mb-6">
                  <h3 className="font-bold mb-2">Office Hours</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Monday - Thursday</div>
                    <div>{officeInfo.hours.monday}</div>
                    <div>Friday</div>
                    <div>{officeInfo.hours.friday}</div>
                    <div>Saturday - Sunday</div>
                    <div>{officeInfo.hours.saturday}</div>
                  </div>
                </div>
                <a
                  href={`tel:${officeInfo.phoneE164}`}
                  className="flex items-center text-xl font-bold hover:text-blue-200 transition-colors"
                >
                  <Phone className="h-6 w-6 mr-2" />
                  {officeInfo.phone}
                </a>
              </div>
              
              <div className="md:w-1/2 p-8 md:p-12">
                <h3 className="text-xl font-bold font-heading text-[#333333] mb-4">Book Your Visit</h3>
                <p className="text-[#333333] mb-6">Fill out the form below to schedule your appointment. We'll get back to you promptly to confirm your visit.</p>
	                <TypeFormEmbed 
	                  formId="01JPZ57W1F3352Q1X0XK6P9SNV" 
	                  className="min-h-[320px] sm:min-h-[400px] w-full" 
	                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#333333] mb-4">What Our Patients Say</h2>
            <p className="text-[#333333] max-w-3xl mx-auto">Real experiences from our patients who have trusted us with their dental care.</p>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonialsData.slice(0, 3).map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} index={index} />
            ))}
          </div>
          
	          {/* Local Dental Practice Info */}
	          <div className="mt-12 mb-10 bg-white rounded-lg shadow-lg overflow-hidden">
	            <div className="p-6 bg-primary text-white text-center">
	              <h3 className="text-xl font-bold mb-2">Your Trusted Palo Alto Dental Practice</h3>
	              <p className="text-blue-100">Serving Palo Alto, Menlo Park, Stanford, and surrounding communities</p>
	            </div>
	            <div className="p-6">
	              <div className="grid md:grid-cols-3 gap-6 text-center">
	                <div>
	                  <div className="text-lg font-bold text-primary mb-2">Conservative care</div>
	                  <p className="text-gray-600">Clear options, no pressure</p>
	                </div>
	                <div>
	                  <div className="text-lg font-bold text-primary mb-2">Comprehensive dentistry</div>
	                  <p className="text-gray-600">Preventive, cosmetic, restorative</p>
	                </div>
	                <div>
	                  <div className="text-lg font-bold text-primary mb-2">Urgent visits</div>
	                  <p className="text-gray-600">Call us for emergency care</p>
	                </div>
	              </div>
	            </div>
	          </div>
          
          <div className="text-center mt-8">
            <Link href="/testimonials">
              <span className="text-primary font-semibold hover:text-blue-700 inline-flex items-center cursor-pointer">
                Read More Patient Stories
                <ArrowRight className="h-5 w-5 ml-1" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
