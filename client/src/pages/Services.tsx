import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ServiceCard from "@/components/common/ServiceCard";
import MetaTags from "@/components/common/MetaTags";
import { drWongImages } from "@/lib/imageUrls";
import { Service } from "@shared/schema";

const Services = () => {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  return (
    <>
      <MetaTags 
        title="Dental Services | Dr. Christopher B. Wong, DDS"
        description="Explore our comprehensive dental services including preventive care, cosmetic treatments, restorative procedures, and more at Dr. Wong's Palo Alto practice."
        image={drWongImages.treatmentRoom}
      />
      {/* Hero Section */}
      <section className="bg-[#F5F9FC] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-[#333333] mb-6">Our Dental Services</h1>
            <p className="text-xl text-[#333333] max-w-3xl mx-auto">Comprehensive dental care using advanced techniques and technology to improve your oral health and enhance your smile.</p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#333333] mb-4">Comprehensive Dental Services</h2>
            <p className="text-[#333333] max-w-3xl mx-auto">From routine cleanings to complex restorations, we provide a full range of dental services to meet your needs.</p>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>
          
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md h-64 animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services?.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Insurance Section */}
      <section className="py-16 bg-[#F5F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold font-heading text-[#333333] mb-4">Insurance & Payment Options</h2>
              <p className="text-[#333333] mb-4">We work with most major insurance providers and offer flexible payment options to make dental care accessible.</p>
              <p className="text-[#333333] mb-6">Our team will help you understand your coverage and maximize your benefits. For patients without insurance, we offer an in-house dental plan and financing options.</p>
              
              <h3 className="text-xl font-bold font-heading text-[#333333] mb-3">We Accept:</h3>
              <ul className="grid grid-cols-2 gap-2 mb-6">
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 text-primary mr-2" />
                  <span>Delta Dental</span>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 text-primary mr-2" />
                  <span>Cigna</span>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 text-primary mr-2" />
                  <span>Aetna</span>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 text-primary mr-2" />
                  <span>MetLife</span>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 text-primary mr-2" />
                  <span>Guardian</span>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 text-primary mr-2" />
                  <span>United Healthcare</span>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 text-primary mr-2" />
                  <span>Blue Cross Blue Shield</span>
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 text-primary mr-2" />
                  <span>And many more...</span>
                </li>
              </ul>
              
              <Link href="/patient-resources#insurance">
                <Button className="bg-primary text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700">
                  Learn More About Insurance
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <img 
                src="https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Dental insurance" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-6">Ready to Schedule Your Appointment?</h2>
          <p className="text-white text-xl mb-8 max-w-3xl mx-auto">Contact us today to book your visit and take the first step toward optimal dental health.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/schedule#appointment">
              <Button className="bg-white text-primary hover:bg-gray-100 font-semibold px-8 py-3 rounded-md">
                Schedule Appointment
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-md">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
