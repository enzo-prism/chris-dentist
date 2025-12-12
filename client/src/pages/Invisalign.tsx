import { CheckCircle, ArrowRight, Shield, Clock, Star, Users, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import MetaTags from "@/components/common/MetaTags";
import StructuredData from "@/components/seo/StructuredData";
import { motion } from "framer-motion";
import OptimizedImage from "@/components/seo/OptimizedImage";
import TestimonialQuote from "@/components/testimonials/TestimonialQuote";
import { getTestimonialsByNames } from "@/lib/testimonials";
import PageBreadcrumbs from "@/components/common/PageBreadcrumbs";
import {
  buildBreadcrumbSchema,
  buildHowToSchema,
  buildServiceSchema,
} from "@/lib/structuredData";
import RelatedServicePosts from "@/components/blog/RelatedServicePosts";
import { pageDescriptions, pageTitles } from "@/lib/metaContent";

const Invisalign = () => {
  const invisalignTestimonials = getTestimonialsByNames([
    "Kevin Zhang",
    "Ashley Chung",
    "Abdel Fahmy",
  ]);

  const invisalignBenefits = [
    {
      title: "Virtually Invisible",
      description: "Clear aligners are nearly invisible, so you can smile confidently during treatment",
      icon: <Smile className="h-8 w-8 text-primary" />
    },
    {
      title: "Removable Convenience",
      description: "Remove aligners for eating, drinking, brushing, and special occasions",
      icon: <Shield className="h-8 w-8 text-primary" />
    },
    {
      title: "Comfortable Fit",
      description: "Smooth plastic aligners are more comfortable than traditional metal braces",
      icon: <Star className="h-8 w-8 text-primary" />
    },
    {
      title: "Predictable Results",
      description: "Advanced 3D technology allows you to see your treatment plan and expected results",
      icon: <Clock className="h-8 w-8 text-primary" />
    }
  ];

  const treatmentProcess = [
    {
      step: "1",
      title: "Initial Consultation",
      description: "Dr. Wong evaluates your teeth and discusses your goals to determine if Invisalign is right for you.",
      duration: "60 minutes"
    },
    {
      step: "2", 
      title: "3D Digital Scan",
      description: "We create precise 3D images of your teeth using advanced digital scanning technology.",
      duration: "30 minutes"
    },
    {
      step: "3",
      title: "Custom Treatment Plan",
      description: "Your personalized treatment plan is created, showing the step-by-step movement of your teeth.",
      duration: "1-2 weeks"
    },
    {
      step: "4",
      title: "Aligner Fabrication",
      description: "Your custom aligners are manufactured using state-of-the-art technology.",
      duration: "2-3 weeks"
    },
    {
      step: "5",
      title: "Treatment Begins",
      description: "You receive your first set of aligners and begin your smile transformation journey.",
      duration: "12-18 months average"
    }
  ];

  const conditions = [
    "Crowded teeth",
    "Gaps between teeth",
    "Overbite or underbite",
    "Crossbite",
    "Open bite",
    "Crooked or misaligned teeth"
  ];

  const careInstructions = [
    "Wear aligners 20-22 hours per day for optimal results",
    "Remove aligners when eating or drinking (except water)",
    "Clean aligners daily with lukewarm water and mild soap",
    "Brush and floss teeth before reinserting aligners",
    "Store aligners in their case when not wearing them",
    "Follow your scheduled aligner changes as directed"
  ];

  const ageGroups = [
    {
      title: "Invisalign for Teens",
      description: "Special features designed for teenage lifestyles, including compliance indicators and replacement aligners for lost or broken ones.",
      features: ["Blue dot wear indicators", "Replacement aligners included", "Designed for growing mouths"]
    },
    {
      title: "Invisalign for Adults",
      description: "Professional discretion meets effective treatment. Perfect for working adults who want to improve their smile without compromising their professional image.",
      features: ["Completely discreet treatment", "Minimal lifestyle disruption", "No dietary restrictions"]
    }
  ];

  const serviceSchema = buildServiceSchema({
    name: "Invisalign Clear Aligners",
    description:
      "Invisible orthodontic treatment using custom clear aligners to straighten teeth discreetly for teens and adults.",
    slug: "/invisalign",
  });

  const invisalignHowTo = buildHowToSchema({
    name: "Invisalign Treatment Journey",
    description: "Step-by-step guide for Invisalign treatment with Dr. Wong in Palo Alto.",
    steps: treatmentProcess.map((step) => ({
      title: step.title,
      description: `${step.description}${step.duration ? ` (${step.duration})` : ""}`,
    })),
    pagePath: "/invisalign",
  });

  const breadcrumbItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Invisalign", path: "/invisalign" },
  ];
  const invisalignBreadcrumbs = buildBreadcrumbSchema(breadcrumbItems);

  const pageSchemas = [serviceSchema];

  if (invisalignHowTo) {
    pageSchemas.push(invisalignHowTo);
  }

  if (invisalignBreadcrumbs) {
    pageSchemas.push(invisalignBreadcrumbs);
  }

  return (
    <>
      <MetaTags 
        title={pageTitles.invisalign}
        description={pageDescriptions.invisalign}
      />
      <StructuredData data={pageSchemas} />
      <PageBreadcrumbs items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#F5F9FC] to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-[#333333] mb-6">
              Straighten Your Teeth Invisibly with Invisalign® Treatment in Palo Alto
            </h1>
            <p className="text-xl text-[#333333] max-w-4xl mx-auto mb-8">
              Achieve the smile you've always wanted with Invisalign clear aligners at Dr. Christopher B. Wong's 
              Palo Alto practice. Virtually invisible, removable, and comfortable orthodontic treatment for teens and adults.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/schedule">
                <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-3">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 px-8 py-3">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Invisalign */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold font-heading text-[#333333] mb-6">
                What is Invisalign?
              </h2>
              <p className="text-[#333333] mb-6 text-lg">
                Invisalign is a revolutionary orthodontic treatment that uses a series of custom-made, 
                clear plastic aligners to gradually move your teeth into their desired positions. 
                Unlike traditional braces, Invisalign aligners are virtually invisible and removable.
              </p>
              <h3 className="text-xl font-semibold text-[#333333] mb-4">Invisalign Can Treat:</h3>
              <div className="space-y-3">
                {conditions.map((condition, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <span className="text-[#333333]">{condition}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
	              <OptimizedImage
	                src="/images/invisalign-treatment.jpg"
	                alt="Invisalign clear aligners treatment at Dr. Christopher B. Wong's Palo Alto practice"
	                className="w-full h-56 sm:h-72 md:h-96 object-cover rounded-lg shadow-lg"
	              />
              <div className="absolute inset-0 bg-primary/10 rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits of Invisalign */}
      <section className="py-16 bg-[#F5F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#333333] mb-6">
              Why Choose Invisalign?
            </h2>
            <p className="text-[#333333] max-w-3xl mx-auto">
              Invisalign offers numerous advantages over traditional braces, making it the preferred choice 
              for both teens and adults seeking a more comfortable and discreet orthodontic experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {invisalignBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6 text-center"
              >
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold font-heading text-[#333333] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-[#333333]">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Confidence */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#1F2933]">
              Clear aligners with real-life results
            </h2>
            <p className="mt-4 text-sm text-[#4B5563] sm:text-base">
              Patients appreciate the modern technology, approachable team, and flexible care behind every Invisalign plan.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {invisalignTestimonials.map((testimonial) => (
              <TestimonialQuote key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#333333] mb-6">
              Your Invisalign Journey
            </h2>
            <p className="text-[#333333] max-w-3xl mx-auto">
              From consultation to your new smile, here's what you can expect during your Invisalign treatment 
              at our Palo Alto practice.
            </p>
          </motion.div>

          <div className="space-y-8">
            {treatmentProcess.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 bg-[#F5F9FC] rounded-lg p-8">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-heading text-[#333333]">
                        {step.title}
                      </h3>
                      <span className="text-primary font-medium">{step.duration}</span>
                    </div>
                  </div>
                  <p className="text-[#333333]">{step.description}</p>
                </div>
	                <div className="w-full md:w-64 lg:w-72 xl:w-80 aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
	                  <OptimizedImage
	                    src={`/images/invisalign-step-${step.step}.png`}
	                    alt={`Invisalign treatment step ${step.step}: ${step.title}`}
	                    className="w-full h-full object-cover"
	                  />
	                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Age-Specific Options */}
      <section className="py-16 bg-[#F5F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#333333] mb-6">
              Invisalign for Every Age
            </h2>
            <p className="text-[#333333] max-w-3xl mx-auto">
              Whether you're a teenager or an adult, Invisalign offers age-appropriate solutions 
              designed to fit your lifestyle and orthodontic needs.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {ageGroups.map((group, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-2xl font-bold font-heading text-[#333333]">
                    {group.title}
                  </h3>
                </div>
                <p className="text-[#333333] mb-6">{group.description}</p>
                <h4 className="font-semibold text-[#333333] mb-3">Key Features:</h4>
                <div className="space-y-2">
                  {group.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <Star className="h-4 w-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-[#333333]">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dr. Wong's Approach */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
	              <OptimizedImage
	                src="/images/dr-wong-polaroids.png"
	                alt="Dr. Christopher Wong in his dental practice - professional polaroid photos"
	                className="w-full h-56 sm:h-72 md:h-96 object-cover rounded-lg shadow-lg"
	              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold font-heading text-[#333333] mb-6">
                Dr. Wong's Personalized Approach
              </h2>
              <p className="text-[#333333] mb-6">
                Dr. Christopher B. Wong combines years of experience with the latest Invisalign technology 
                to create personalized treatment plans. His careful attention to detail ensures optimal 
                results while maintaining your comfort throughout the process.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-primary mt-1 mr-4" />
                  <div>
                    <h4 className="font-semibold text-[#333333] mb-1">Comprehensive Evaluation</h4>
                    <p className="text-[#333333]">Thorough assessment to ensure Invisalign is the right choice for your needs.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-primary mt-1 mr-4" />
                  <div>
                    <h4 className="font-semibold text-[#333333] mb-1">Regular Monitoring</h4>
                    <p className="text-[#333333]">Scheduled check-ups to ensure your treatment is progressing as planned.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Caring for Your Aligners */}
      <section className="py-16 bg-[#F5F9FC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold font-heading text-[#333333] mb-6">
              Caring for Your Invisalign Aligners
            </h2>
            <p className="text-[#333333] max-w-2xl mx-auto">
              Proper care of your aligners is essential for successful treatment and maintaining good oral hygiene.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {careInstructions.map((instruction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start bg-white p-6 rounded-lg shadow-md"
              >
                <CheckCircle className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span className="text-[#333333]">{instruction}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <RelatedServicePosts serviceSlug="invisalign" serviceName="Invisalign Treatment" />

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold font-heading mb-6">
              Ready to Start Your Invisalign Journey?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Schedule your consultation with Dr. Wong today to discover if Invisalign is right for you. 
              Transform your smile discreetly and comfortably.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/schedule">
                <Button className="bg-white text-primary hover:bg-gray-100 font-medium px-8 py-3">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="bg-white text-primary hover:bg-white/90 border-white px-8 py-3">
                  Ask Questions
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Invisalign;
