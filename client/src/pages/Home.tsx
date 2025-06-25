import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import AboutDoctorSection from "@/components/sections/AboutDoctorSection";
import ServiceCard from "@/components/common/ServiceCard";
import TestimonialCard from "@/components/common/TestimonialCard";
import TypeFormEmbed from "@/components/forms/TypeFormEmbed";
import MetaTags from "@/components/common/MetaTags";
import StructuredData from "@/components/seo/StructuredData";
import CanonicalUrl from "@/components/seo/CanonicalUrl";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Stethoscope, Award, User, ChevronRight, Phone } from "lucide-react";
import { Link } from "wouter";
import { Service, Testimonial } from "@shared/schema";
import { motion } from "framer-motion";
import { ogImages } from "@/lib/ogImages";
import { pageTitles, pageDescriptions } from "@/lib/metaContent";
import { drWongImages } from "@/lib/imageUrls";

const Home = () => {

  
  // Fetch services
  const { data: services, isLoading: isLoadingServices } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  // Fetch testimonials
  const { data: testimonials, isLoading: isLoadingTestimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  return (
    <>
      <MetaTags 
        title={pageTitles.home}
        description={pageDescriptions.home}
        image={ogImages.home}
      />
      <StructuredData type="organization" />
      <CanonicalUrl path="/" />
      <HeroSection />

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
              Comprehensive dental care using the latest techniques and technology to improve your oral health and enhance your smile.
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
                    <div>8:00 AM - 5:00 PM</div>
                    <div>Friday</div>
                    <div>8:00 AM - 2:00 PM</div>
                    <div>Saturday - Sunday</div>
                    <div>Closed</div>
                  </div>
                </div>
                <a href="tel:+16505551234" className="flex items-center text-xl font-bold hover:text-blue-200 transition-colors">
                  <Phone className="h-6 w-6 mr-2" />
                  (650) 555-1234
                </a>
              </div>
              
              <div className="md:w-1/2 p-8 md:p-12">
                <h3 className="text-xl font-bold font-heading text-[#333333] mb-4">Book Your Visit</h3>
                <p className="text-[#333333] mb-6">Fill out the form below to schedule your appointment. We'll get back to you promptly to confirm your visit.</p>
                <TypeFormEmbed 
                  formId="01JPZ57W1F3352Q1X0XK6P9SNV" 
                  className="min-h-[400px] w-full" 
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
          
          {isLoadingTestimonials ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-gray-200 h-12 w-12 mr-4"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials?.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          )}
          
          {/* Local Dental Practice Info */}
          <div className="mt-12 mb-10 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 bg-primary text-white text-center">
              <h3 className="text-xl font-bold mb-2">Your Trusted Palo Alto Dental Practice</h3>
              <p className="text-blue-100">Serving Palo Alto, Menlo Park, Stanford, and surrounding communities</p>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">15+ Years</div>
                  <p className="text-gray-600">Serving Palo Alto Community</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">200+</div>
                  <p className="text-gray-600">Five-Star Patient Reviews</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-2">Same Day</div>
                  <p className="text-gray-600">Emergency Dental Care</p>
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
