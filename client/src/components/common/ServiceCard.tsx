import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Service } from "@shared/schema";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card 
      className="h-full overflow-hidden bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group" 
      id={service.slug}
    >
      {/* Image container with responsive height */}
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Optional promotional badge  */}
        {service.featured && (
          <Badge 
            className="absolute top-2 right-2 bg-primary text-white px-2.5 py-0.5 text-xs font-medium"
          >
            Popular
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4 sm:p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg sm:text-xl font-bold font-heading text-[#333333]">{service.title}</h3>
          {/* Quick action button that appears on larger screens */}
          <Link href={`/services#${service.slug}`} className="hidden sm:block">
            <div className="bg-gray-100 p-1.5 rounded-full text-gray-500 hover:text-primary hover:bg-gray-200 transition-colors">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </Link>
        </div>
        
        {/* Description with line clamp for consistent card heights */}
        <p className="text-sm sm:text-base text-[#333333] mb-4 line-clamp-3">
          {service.description}
        </p>
        
        {/* Learn more link */}
        <Link href={`/services#${service.slug}`}>
          <div className="text-primary font-semibold hover:text-blue-700 flex items-center group transition-colors cursor-pointer text-sm sm:text-base">
            Learn More
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
