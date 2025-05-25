import { ArrowRight, Calendar, CheckCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { drWongImages } from "@/lib/imageUrls";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Animate on load
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Features list
  const features = [
    {
      title: "Accepting new patients",
      description: "No waiting list required"
    },
    {
      title: "Insurance accepted",
      description: "Most plans covered"
    },
    {
      title: "Advanced technology",
      description: "Cutting-edge equipment"
    },
    {
      title: "Family-friendly",
      description: "All ages welcome"
    }
  ];

  return (
    <section className="bg-white pt-20 pb-16 md:pt-28 md:pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero layout */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16">
          {/* Text content - left side */}
          <motion.div 
            className="w-full lg:w-5/12 lg:sticky lg:top-28"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight mb-6">
              Modern dental care with a gentle touch
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-md">
              Dr. Wong provides comprehensive dental care with a focus on conservative, ethical approaches to help you achieve a healthy, functional, and brilliant smile.
            </p>
            
            {/* CTA Buttons with updated styling */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 mb-4">
              <Link href="/schedule#appointment">
                <Button className="bg-primary hover:bg-primary/90 text-white font-medium flex items-center justify-center gap-2 px-5 py-6 h-auto rounded-full shadow-sm transition-all">
                  <Calendar className="h-4 w-4" />
                  <span>Book Appointment</span>
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  variant="outline" 
                  className="border-gray-200 text-gray-700 hover:text-primary hover:border-primary/30 bg-transparent font-medium flex items-center justify-center gap-2 px-5 py-6 h-auto rounded-full transition-all"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {/* Memorial Day Notice */}
            <div className="text-sm text-gray-600 italic border-l-2 border-primary/30 pl-3 mb-10 max-w-md">
              Please note: Our office will be closed on Monday, May 26 in observance of Memorial Day.
            </div>
            
            {/* Scroll indicator - now at bottom of text column */}
            <div className="hidden lg:flex justify-center mt-12 -ml-2">
              <a 
                href="#features" 
                className="group flex flex-col items-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors"
              >
                <span>Scroll to learn more</span>
                <div className="p-2 rounded-full border border-gray-200 group-hover:border-primary/30 transition-colors">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </a>
            </div>
          </motion.div>
          
          {/* Right side: Image and features */}
          <motion.div 
            className="w-full lg:w-7/12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {/* Main image with styling */}
            <div className="relative rounded-2xl overflow-hidden shadow-sm mb-12">
              <img 
                src={drWongImages.heroImage || drWongImages.drWongOffice2} 
                alt="Dr. Wong's Modern Dental Office" 
                className="w-full h-auto object-cover rounded-2xl aspect-[4/3]"
              />
              
              {/* Status badge */}
              <div className="absolute bottom-5 left-5 bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium text-gray-900 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2.5 animate-pulse"></span>
                <span>Now accepting new patients</span>
              </div>
            </div>
            
            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + (index * 0.1), ease: "easeOut" }}
                >
                  <div className="mt-0.5 bg-primary/10 rounded-full p-1.5 text-primary">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">{feature.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
