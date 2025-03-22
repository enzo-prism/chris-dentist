import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Testimonial } from "@shared/schema";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  const { name, location, rating, text, image } = testimonial;

  return (
    <Card className="h-full bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="flex text-yellow-400 mb-4">
          {Array(5).fill(0).map((_, i) => (
            <Star 
              key={i} 
              className="h-5 w-5" 
              fill={i < rating ? "currentColor" : "none"} 
            />
          ))}
        </div>
        <p className="text-[#333333] italic mb-4">{text}</p>
        <div className="flex items-center">
          <img 
            src={image} 
            alt={name} 
            className="w-12 h-12 rounded-full mr-4 object-cover"
          />
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-gray-600">{location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
