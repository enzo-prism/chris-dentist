import { ArrowRight, Calendar, CheckCircle, ChevronDown, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { drWongImages } from "@/lib/imageUrls";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import OptimizedImage from "@/components/seo/OptimizedImage";

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
    <section className="bg-white pt-20 pb-16 md:pt-28 md:pb-20 overflow-hidden relative">
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/3 to-blue-100/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-50/8 to-primary/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-transparent via-primary/2 to-transparent rounded-full blur-3xl animate-spin" style={{ animationDuration: '30s' }}></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

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
              Palo Alto Dentist – Dr. Christopher B. Wong
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-md">
              Trusted by the community for long-term oral health and confident smiles.
            </p>
            
            {/* CTA Buttons with updated styling */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 mb-8">
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
            
            {/* Patient Trust Indicator */}
            <div className="mb-12">
              <button
                onClick={() => {
                  const testimonialsSection = document.getElementById('testimonials');
                  if (testimonialsSection) {
                    testimonialsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group flex items-center gap-2 text-gray-500 hover:text-primary transition-colors duration-200 text-sm font-medium cursor-pointer"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="group-hover:underline">Trusted by 316+ patients on Google</span>
                <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
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
              <OptimizedImage
                src={drWongImages.heroImage || drWongImages.drWongOffice2}
                alt="Dr. Wong's Modern Dental Office"
                className="w-full h-auto object-cover rounded-2xl aspect-[4/3]"
                priority
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
