import { ArrowRight } from "lucide-react";
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
      className="h-full overflow-hidden bg-white rounded-xl border-0 shadow-sm hover:shadow-md transition-all duration-300 group" 
      id={service.slug}
    >
      {/* Image container with responsive height */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
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
      
      <CardContent className="p-5">
        <h3 className="text-lg font-medium text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        
        {/* Description with line clamp for consistent card heights */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {service.description}
        </p>
        
        {/* Learn more link */}
        <Link href={`/services#${service.slug}`}>
          <div className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer group/link">
            <span>Learn more</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover/link:translate-x-0.5" />
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
