import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import ServiceCard from "@/components/common/ServiceCard";
import MetaTags from "@/components/common/MetaTags";
import { drWongImages } from "@/lib/imageUrls";
import { pageTitles, pageDescriptions } from "@/lib/metaContent";
import { Service } from "@shared/schema";
import OptimizedImage from "@/components/seo/OptimizedImage";
import StructuredData from "@/components/seo/StructuredData";
import {
  buildBreadcrumbSchema,
  buildItemListSchema,
  buildOrganizationSchema,
} from "@/lib/structuredData";

const Services = () => {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const servicesSchemas = [
    buildOrganizationSchema({
      services: services ?? [],
    }),
  ];

  const itemListSchema =
    services && services.length ? buildItemListSchema(services) : null;
  if (itemListSchema) {
    servicesSchemas.push(itemListSchema);
  }

  const serviceBreadcrumbs = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]);

  if (serviceBreadcrumbs) {
    servicesSchemas.push(serviceBreadcrumbs);
  }

  return (
    <>
      <MetaTags 
        title={pageTitles.services}
        description={pageDescriptions.services}
      />
      <StructuredData data={servicesSchemas} />
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
              <p className="text-[#333333] mb-4">We accept most major PPO dental insurance plans and offer flexible payment options to make dental care accessible.</p>
              <p className="text-[#333333] mb-6">Our team will help you understand your coverage and maximize your benefits. For patients without insurance, we offer an in-house dental plan.</p>
              
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-6">
                <h3 className="text-xl font-bold font-heading text-[#333333] mb-3">Accepted Insurance:</h3>
                <p className="text-[#333333] mb-3">We are in-network with most major PPO dental insurance plans only.</p>
                <p className="text-[#333333]">Please contact our office to verify your specific plan's coverage before your appointment.</p>
              </div>
              
              <Link href="/patient-resources#insurance">
                <Button className="bg-primary text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-700">
                  Learn More About Insurance
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <OptimizedImage
                src="https://imgur.com/hO02YQ0.jpg"
                alt="Payment processing with mobile device"
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
