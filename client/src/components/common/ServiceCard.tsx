
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

import { Service } from "@shared/schema";
import { getServiceGradient } from "@/lib/serviceGradients";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  // Custom CTA text based on service type
  const getCtaText = (serviceTitle: string): string => {
    switch(serviceTitle) {
      case "Preventive Dentistry":
        return "Schedule Your Checkup";
      case "Cosmetic Dentistry":
        return "Transform Your Smile";
      case "Restorative Dentistry":
        return "Restore Your Teeth";
      case "Pediatric Dentistry":
        return "Book a Kid's Visit";
      case "Orthodontics":
        return "Start Your Alignment";
      case "Emergency Dental Care":
        return "Get Urgent Care";
      default:
        return "Book Your Appointment";
    }
  };

  return (
    <Card 
      className="h-full w-full overflow-hidden bg-white rounded-2xl border border-gray-100/50 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col" 
      id={service.slug}
    >
      {/* Minimalistic gradient container with consistent height */}
      <div className={`relative h-48 sm:h-52 md:h-56 overflow-hidden ${getServiceGradient(service.title)} transition-all duration-300 group-hover:shadow-inner`}>
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/8 to-transparent"></div>
        
        {/* Featured badge */}
        {service.featured && (
          <Badge 
            className="absolute top-4 left-4 bg-white/95 text-primary px-3 py-1 text-xs font-medium rounded-full shadow-sm border border-primary/10"
          >
            Popular
          </Badge>
        )}
      </div>
      
      <CardContent className="p-6 md:p-7 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary transition-colors leading-tight">
          {service.title}
        </h3>
        
        {/* Description with consistent height and line clamp */}
        <p className="text-sm md:text-base text-gray-600 leading-relaxed flex-grow line-clamp-3">
          {service.description}
        </p>
      </CardContent>
      
      <CardFooter className="px-6 md:px-7 pb-6 md:pb-7 pt-0">
        <Link href="/schedule#appointment" className="w-full">
          <Button className="w-full bg-primary text-white hover:bg-primary/90 group transition-all hover:scale-[1.02] py-3 rounded-lg font-medium">
            {getCtaText(service.title)}
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
