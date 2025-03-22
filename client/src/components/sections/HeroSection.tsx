import { CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="relative bg-[#F5F9FC] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-[#333333] leading-tight mb-4">
              Advanced Dental Care in the Heart of Palo Alto
            </h1>
            <p className="text-xl text-[#333333] mb-8">
              Comprehensive, gentle dental care using the latest technology and techniques for your optimal oral health.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/contact#appointment">
                <Button 
                  className="bg-primary text-white text-center font-semibold px-8 py-6 rounded-md hover:bg-blue-700 transition-transform hover:-translate-y-1 hover:shadow-md"
                >
                  Schedule Appointment
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  variant="outline" 
                  className="bg-white border-2 border-primary text-primary text-center font-semibold px-8 py-6 rounded-md hover:bg-[#F5F9FC]"
                >
                  Our Services
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center text-sm text-[#333333] space-y-2 sm:space-y-0">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-[#28A745] mr-2" />
                <span>Accepting new patients</span>
              </div>
              <span className="hidden sm:block mx-3">|</span>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-[#28A745] mr-2" />
                <span>Most insurance plans accepted</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12">
            <img 
              src="/images/dr-wong-office-2.png" 
              alt="Dr. Wong's Modern Dental Office" 
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-white" style={{ clipPath: "polygon(0 50%, 100% 0, 100% 100%, 0 100%)" }}></div>
    </section>
  );
};

export default HeroSection;
