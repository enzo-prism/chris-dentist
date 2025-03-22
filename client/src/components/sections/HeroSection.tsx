import { CheckCircle, Clock, ChevronDown } from "lucide-react";
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
    <section className="relative bg-[#F5F9FC] py-10 sm:py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main content */}
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text content */}
          <div className={`w-full lg:w-1/2 mb-8 lg:mb-0 transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-[#333333] leading-tight mb-4">
              Advanced Dental Care in the Heart of Palo Alto
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-[#333333] mb-6 sm:mb-8">
              Comprehensive, gentle dental care using the latest technology and techniques for your optimal oral health.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href="/contact#appointment">
                <Button 
                  className="bg-primary text-white text-center font-semibold text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-6 rounded-md hover:bg-blue-700 transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  Schedule Appointment
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  variant="outline" 
                  className="bg-white border-2 border-primary text-primary text-center font-semibold text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-6 rounded-md hover:bg-[#F5F9FC]"
                >
                  Our Services
                </Button>
              </Link>
            </div>
            
            {/* Features */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#333333]">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-[#28A745] mr-2 flex-shrink-0" />
                <span>Accepting new patients</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-[#28A745] mr-2 flex-shrink-0" />
                <span>Most insurance plans accepted</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-[#28A745] mr-2 flex-shrink-0" />
                <span>State-of-the-art equipment</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-[#28A745] mr-2 flex-shrink-0" />
                <span>Family-friendly environment</span>
              </div>
            </div>
          </div>
          
          {/* Image - animated entry from right */}
          <div className={`w-full lg:w-1/2 lg:pl-8 xl:pl-12 transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src={drWongImages.heroImage || drWongImages.drWongOffice2} 
                alt="Dr. Wong's Modern Dental Office" 
                className="w-full h-auto object-cover rounded-lg"
              />
              
              {/* Overlay gradient for better text contrast if needed */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-60 rounded-lg"></div>
              
              {/* Optional badge/info overlay */}
              <div className="absolute bottom-4 right-4 bg-white/90 px-4 py-2 rounded-full shadow-md text-sm font-medium text-gray-800">
                Modern & Comfortable
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="hidden sm:flex justify-center mt-8 animate-bounce">
          <a href="#about" className="text-primary opacity-80 hover:opacity-100 transition-opacity">
            <ChevronDown className="h-8 w-8" />
          </a>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#FFFFFF" fillOpacity="1" d="M0,224L60,229.3C120,235,240,245,360,245.3C480,245,600,235,720,208C840,181,960,139,1080,128C1200,117,1320,139,1380,149.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
