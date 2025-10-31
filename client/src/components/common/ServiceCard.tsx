
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
  const getDetailPath = (slug: string): string => {
    switch (slug) {
      case "invisalign":
        return "/invisalign";
      case "emergency-dental":
        return "/emergency-dental";
      case "cosmetic-dentistry":
        return "/dental-veneers";
      case "dental-implants":
        return "/dental-implants";
      case "preventive-dentistry":
      case "restorative-dentistry":
      case "pediatric-dentistry":
      default:
        return `/services#${slug}`;
    }
  };

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
      className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
      id={service.slug}
    >
      <div
        className={`relative flex min-h-[140px] w-full items-start justify-between rounded-b-[48px] bg-slate-100 ${getServiceGradient(service.title)} px-6 py-5`}
      >
        {service.slug === "preventive-dentistry" && (
          <Badge className="bg-white/90 text-primary shadow-sm">
            Popular
          </Badge>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col gap-4 p-6 md:p-7">
        <div>
          <h3 className="text-xl font-semibold leading-tight text-slate-900 transition-colors group-hover:text-primary">
            {service.title}
          </h3>
          <p className="mt-3 text-sm text-slate-600 md:text-base">
            {service.description}
          </p>
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-6 pt-0 md:px-7 md:pb-7">
        <div className="grid w-full gap-3">
          <Link href={getDetailPath(service.slug)} className="w-full">
            <Button
              variant="outline"
              className="w-full border-primary text-primary transition hover:bg-primary/5"
            >
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/schedule#appointment" className="w-full">
            <Button className="w-full bg-primary text-white transition hover:bg-primary/90">
              {getCtaText(service.title)}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
