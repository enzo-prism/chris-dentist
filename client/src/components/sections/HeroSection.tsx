import { ArrowRight, Calendar, CheckCircle, Snowflake, Gift } from "lucide-react";
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
    <section className="bg-gradient-to-b from-[#0f2f27] via-[#123129] to-white pt-20 pb-16 md:pt-28 md:pb-20 overflow-hidden relative">
      {/* Festive background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#1a4a3f_0%,transparent_40%),radial-gradient(circle_at_top_right,#1a4a3f_0%,transparent_40%)] opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(2px_2px_at_20%_30%,rgba(242,215,133,0.18),transparent),radial-gradient(2px_2px_at_70%_60%,rgba(242,215,133,0.2),transparent),radial-gradient(1.5px_1.5px_at_40%_80%,rgba(255,255,255,0.18),transparent)]"></div>
        <div className="absolute -top-48 -right-32 w-80 h-80 bg-gradient-to-br from-[#f2d785]/25 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 -left-32 w-96 h-96 bg-gradient-to-tr from-[#d83b52]/15 to-transparent rounded-full blur-3xl"></div>
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
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 text-[#f2d785] px-4 py-2 text-sm font-semibold mb-4 backdrop-blur">
              <Snowflake className="h-4 w-4" aria-hidden="true" />
              Warm smiles for the holidays
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
              Palo Alto Dentist – Dr. Christopher B. Wong
            </h1>
            
            <p className="text-lg text-white/80 leading-relaxed mb-6 max-w-md">
              Trusted by the community for long-term oral health and confident smiles—now with holiday-friendly scheduling.
            </p>

            <div className="flex items-center gap-3 mb-6 text-sm text-white/80">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1">
                🎁 Closed Dec 20 – Jan 4
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#f2d785]/20 text-[#f2d785] px-3 py-1">
                ✨ Reopens Jan 5, 8:00 AM
              </span>
            </div>
            
            {/* CTA Buttons with updated styling */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 mb-8">
              <Link href="/schedule#appointment">
                <Button className="bg-[#f2d785] hover:bg-[#f6e2a4] text-[#0f2f27] font-medium flex items-center justify-center gap-2 px-5 py-6 h-auto rounded-full shadow-sm transition-all">
                  <Calendar className="h-4 w-4" />
                  <span>Start your plan</span>
                </Button>
              </Link>
              <Link href="/testimonials">
                <Button 
                  variant="outline" 
                  className="border-white/30 text-white hover:text-[#f2d785] hover:border-[#f2d785]/50 bg-white/5 font-medium flex items-center justify-center gap-2 px-5 py-6 h-auto rounded-full transition-all backdrop-blur"
                >
                  <span>Read testimonials</span>
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
                    <svg key={i} className="w-3.5 h-3.5 text-[#f2d785] fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="group-hover:underline text-white">316+ patient reviews on Google</span>
                <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
            
            {/* Scroll indicator removed */}
          </motion.div>
          
          {/* Right side: Image and features */}
          <motion.div 
            className="w-full lg:w-7/12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {/* Main image with styling */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/10 mb-12">
              <OptimizedImage
                src={drWongImages.heroImage || drWongImages.drWongOffice2}
                alt="Dr. Wong's Modern Dental Office"
                className="w-full h-auto object-cover rounded-2xl aspect-[4/3]"
                priority
              />
              
              {/* Status badge */}
              <div className="absolute bottom-5 left-5 bg-white/95 px-4 py-2 rounded-full shadow-sm text-sm font-medium text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Holiday-friendly scheduling</span>
              </div>
              <div className="absolute top-4 right-4 bg-[#f2d785]/90 text-[#0f2f27] px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 shadow-sm">
                <Gift className="h-4 w-4" aria-hidden="true" />
                Plan ahead
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
