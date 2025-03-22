import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Service } from "@shared/schema";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Card className="h-full overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300" id={service.slug}>
      <div className="h-48 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold font-heading text-[#333333] mb-2">{service.title}</h3>
        <p className="text-[#333333] mb-4">{service.description}</p>
        <Link href={`/services#${service.slug}`}>
          <a className="text-primary font-semibold hover:text-blue-700 flex items-center group transition-colors">
            Learn More
            <ArrowRight className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
