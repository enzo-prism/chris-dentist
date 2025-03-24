import { CheckCircle, ArrowRight, ChevronDown, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { drWongImages } from "@/lib/imageUrls";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Animate on load
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-16 md:py-24 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text content */}
          <div className={`w-full lg:w-1/2 mb-12 lg:mb-0 transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight mb-6">
              Modern dental care for your family
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Dr. Wong provides comprehensive, gentle dental care using advanced techniques for optimal oral health.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
              <Link href="/schedule#appointment">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white font-medium flex items-center justify-center space-x-2 px-5 py-3 rounded-full shadow-sm transition-all"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Appointment</span>
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  variant="outline" 
                  className="border-primary/20 text-primary bg-white hover:bg-primary/5 font-medium flex items-center justify-center space-x-2 px-5 py-3 rounded-full transition-all"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            {/* Features */}
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3 group">
                <div className="mt-0.5 bg-primary/10 rounded-full p-1 text-primary group-hover:bg-primary/20 transition-colors">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium">Accepting new patients</p>
                  <p className="text-sm text-gray-500 mt-0.5">No waiting list required</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="mt-0.5 bg-primary/10 rounded-full p-1 text-primary group-hover:bg-primary/20 transition-colors">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium">Insurance accepted</p>
                  <p className="text-sm text-gray-500 mt-0.5">Most plans covered</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="mt-0.5 bg-primary/10 rounded-full p-1 text-primary group-hover:bg-primary/20 transition-colors">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium">Advanced technology</p>
                  <p className="text-sm text-gray-500 mt-0.5">Cutting-edge equipment</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="mt-0.5 bg-primary/10 rounded-full p-1 text-primary group-hover:bg-primary/20 transition-colors">
                  <CheckCircle className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-gray-800 font-medium">Family-friendly</p>
                  <p className="text-sm text-gray-500 mt-0.5">All ages welcome</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image with styling */}
          <div className={`w-full lg:w-1/2 lg:pl-16 transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              {/* Main image */}
              <img 
                src={drWongImages.heroImage || drWongImages.drWongOffice2} 
                alt="Dr. Wong's Modern Dental Office" 
                className="w-full h-auto object-cover rounded-2xl"
              />
              
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent"></div>
              
              {/* Badge overlay */}
              <div className="absolute bottom-4 left-4 bg-white/95 px-3 py-1.5 rounded-full shadow-sm text-xs font-medium text-gray-800 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span>Now accepting new patients</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="hidden md:flex justify-center mt-12 animate-bounce">
          <a href="#about" className="bg-primary/10 rounded-full p-2 text-primary hover:bg-primary/20 transition-colors">
            <ChevronDown className="h-5 w-5" />
          </a>
        </div>
      </div>
      
      {/* Subtle divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;
