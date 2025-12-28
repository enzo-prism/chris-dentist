import { ArrowRight, Calendar, CheckCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { officeInfo } from "@/lib/data";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Animate on load
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Features list
  const features = [
    {
      title: "New patients welcome",
      description: "Comfort-first, unrushed visits"
    },
    {
      title: "PPO insurance accepted",
      description: "We’ll help verify benefits"
    },
    {
      title: "Modern dental technology",
      description: "Digital imaging and planning"
    },
    {
      title: "Family-friendly practice",
      description: "Kids, teens, and adults"
    }
  ];

  return (
    <section 
      className="bg-gradient-to-b from-[#0b1f3a] via-[#123a6b] to-white pb-16 md:pb-20 overflow-hidden relative"
      style={{
        marginTop: 'calc(var(--header-height, 136px) * -1)',
        paddingTop: 'var(--header-height, 136px)'
      }}
    >
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#1e3a8a_0%,transparent_40%),radial-gradient(circle_at_top_right,#1e3a8a_0%,transparent_40%)] opacity-70"></div>
        <div className="absolute inset-0 bg-[radial-gradient(2px_2px_at_20%_30%,rgba(147,197,253,0.18),transparent),radial-gradient(2px_2px_at_70%_60%,rgba(147,197,253,0.2),transparent),radial-gradient(1.5px_1.5px_at_40%_80%,rgba(255,255,255,0.18),transparent)]"></div>
        <div className="absolute -top-48 -right-32 w-80 h-80 bg-gradient-to-br from-[#93c5fd]/25 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-48 -left-32 w-96 h-96 bg-gradient-to-tr from-[#60a5fa]/20 to-transparent rounded-full blur-3xl"></div>
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
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 text-blue-200 px-4 py-2 text-sm font-semibold mb-4 backdrop-blur">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Palo Alto, CA
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
              Dentist in Palo Alto — Dr. Christopher B. Wong, DDS
            </h1>
            
            <p className="text-lg text-white/80 leading-relaxed mb-6 max-w-md">
              Modern, conservative care from Dr. Wong, DDS, your Palo Alto dentist—covering checkups, cleanings,
              Invisalign, cosmetic dentistry, and restorations.
            </p>

            {/* CTA Buttons with updated styling */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 mb-8">
              <Link href="/schedule#appointment">
                <Button className="bg-primary hover:bg-primary/90 text-white font-medium flex items-center justify-center gap-2 px-5 py-6 h-auto rounded-full shadow-sm transition-all">
                  <Calendar className="h-4 w-4" />
                  <span>Schedule an appointment</span>
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  variant="outline" 
                  className="border-white/30 text-white hover:text-blue-200 hover:border-blue-200/60 bg-white/5 font-medium flex items-center justify-center gap-2 px-5 py-6 h-auto rounded-full transition-all backdrop-blur"
                >
                  <span>Explore services</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {/* Patient Trust Indicator */}
            <div className="mb-12">
              <a
                href={officeInfo.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                <div className="flex items-center gap-1" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-3.5 h-3.5 text-blue-200 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="group-hover:underline">
                  Read patient reviews on Google
                </span>
                <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
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
              <picture>
                <source
                  type="image/webp"
                  srcSet="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989226/Post-11_nohz6f.webp"
                />
                <img
                  src="https://res.cloudinary.com/dhqpqfw6w/image/upload/v1762989226/Post-11_nohz6f.webp"
	                  width={960}
	                  height={720}
	                  loading="eager"
	                  decoding="async"
	                  fetchpriority="high"
	                  alt="Dr. Wong's modern Palo Alto dental office"
	                  className="w-full h-auto object-cover rounded-2xl aspect-[4/3]"
	                />
              </picture>
              
              {/* Status badge */}
              <div className="absolute bottom-5 left-5 bg-white/95 px-4 py-2 rounded-full shadow-sm text-sm font-medium text-gray-900 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <span>Welcoming new patients</span>
              </div>
              <div className="absolute top-4 right-4 bg-blue-100/90 text-blue-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                Palo Alto, CA
              </div>
            </div>
            
            {/* Features grid */}
            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-lg backdrop-blur">
              <p className="text-sm font-semibold text-slate-500">Why patients choose us</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 shadow-sm"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.1), ease: "easeOut" }}
                  >
                    <div className="mt-0.5 bg-primary/10 rounded-full p-1.5 text-primary shrink-0">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-semibold">{feature.title}</p>
                      <p className="text-sm text-slate-600 mt-1 leading-snug">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
