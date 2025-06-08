
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

import { Service } from "@shared/schema";
import OptimizedImage from "@/components/seo/OptimizedImage";

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
      className="h-full overflow-hidden bg-white rounded-xl border-0 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col" 
      id={service.slug}
    >
      {/* Image container with responsive height */}
      <div className="relative h-48 overflow-hidden">
        <OptimizedImage
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 to-transparent"></div>
        
        {/* Featured badge */}
        {service.featured && (
          <Badge 
            className="absolute top-3 left-3 bg-white/90 text-primary px-2 py-0.5 text-xs font-medium rounded-full"
          >
            Popular
          </Badge>
        )}
      </div>
      
      <CardContent className="p-5 flex-grow">
        <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        
        {/* Description with line clamp for consistent card heights */}
        <p className="text-sm text-gray-600 leading-relaxed">
          {service.description}
        </p>
      </CardContent>
      
      <CardFooter className="px-5 pb-5 pt-0">
        <Link href="/schedule#appointment">
          <Button className="w-full bg-primary text-white hover:bg-primary/90 group">
            {getCtaText(service.title)}
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
