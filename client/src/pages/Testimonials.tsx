import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import MetaTags from "@/components/common/MetaTags";
import { ogImages } from "@/lib/ogImages";
import { pageTitles, pageDescriptions } from "@/lib/metaContent";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import TestimonialCard from "@/components/common/TestimonialCard";
import type { Testimonial } from "@shared/schema";

const Testimonials = () => {
  const { data: testimonials, isLoading: isLoadingTestimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });
  
  return (
    <>
      <MetaTags 
        title={pageTitles.testimonials}
        description={pageDescriptions.testimonials}
        image={ogImages.testimonials}
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#F5F9FC] to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-[#333333] mb-6">
              Patient Testimonials
            </h1>
            <p className="text-xl text-[#333333] max-w-3xl mx-auto opacity-90">
              Discover what our patients are saying about their experience with Dr. Christopher B. Wong
            </p>
          </div>
        </div>
      </section>

      {/* Featured Quote */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Quote className="h-16 w-16 mx-auto mb-6 opacity-25" />
            <p className="text-2xl md:text-3xl italic font-light max-w-4xl mx-auto mb-8">
              Dr. Wong is not just a skilled dentist; he's an artist who transformed my smile and gave me back my confidence. 
              His practice combines cutting-edge technology with genuine care for patients.
            </p>
            <div className="flex items-center justify-center">
              <div 
                className="w-12 h-12 rounded-full border-2 border-white mr-4 flex items-center justify-center font-bold text-primary bg-white"
                aria-label="Avatar for Lisa M."
              >
                L
              </div>
              <div className="text-left">
                <h4 className="font-semibold">Lisa M.</h4>
                <p className="text-sm opacity-75">Palo Alto, CA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Testimonials Main Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#333333] mb-6">
              Patient Stories
            </h2>
            <p className="text-[#333333] max-w-3xl mx-auto mb-6">
              Read authentic experiences from our patients who have chosen Dr. Wong for their dental care needs.
              We're proud of our reputation for exceptional service and quality care.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
          </motion.div>
          
          {/* Testimonials Grid */}
          {isLoadingTestimonials ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {testimonials?.map((testimonial, index) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
              ))}
            </motion.div>
          )}
          
          {/* Additional benefits section */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mt-16"
          >
            <div className="bg-[#F5F9FC] p-6 rounded-lg text-center">
              <div className="text-primary text-4xl font-bold mb-2">200+</div>
              <p className="text-[#333333] font-medium">5-Star Reviews</p>
            </div>
            <div className="bg-[#F5F9FC] p-6 rounded-lg text-center">
              <div className="text-primary text-4xl font-bold mb-2">15+</div>
              <p className="text-[#333333] font-medium">Years of Excellence</p>
            </div>
            <div className="bg-[#F5F9FC] p-6 rounded-lg text-center">
              <div className="text-primary text-4xl font-bold mb-2">98%</div>
              <p className="text-[#333333] font-medium">Patient Satisfaction</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Share Your Experience */}
      <section className="py-16 bg-gradient-to-b from-white to-[#F5F9FC]">
        <motion.div 
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#333333] mb-4">
            Share Your Experience
          </h2>
          <p className="text-[#333333] mb-8 max-w-2xl mx-auto">
            Your feedback helps us improve our services and helps other patients make informed decisions.
            We appreciate you taking the time to share your experience at our practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300">
                Contact Us
              </Button>
            </Link>
            <Link href="/schedule">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 font-medium px-6 py-2 rounded-md transition-colors duration-300">
                Schedule Appointment
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Testimonials;
