import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { Testimonial } from "@shared/schema";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

const TestimonialCard = ({ testimonial, index = 0 }: TestimonialCardProps) => {
  const { name, location, rating, text, image } = testimonial;

  // Truncate text if it's too long (for very small screens)
  const truncateText = (str: string, maxLength: number = 180) => {
    if (str.length <= maxLength) return str;
    return str.substring(0, maxLength) + '...';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className="h-full bg-white p-6 rounded-xl border-0 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden">
        {/* Decorative quote icon */}
        <div className="absolute -top-2 -right-2 text-primary/5">
          <Quote className="w-16 h-16" strokeWidth={1} />
        </div>
        
        <CardContent className="p-0 relative z-10">
          {/* Star rating */}
          <div className="flex text-amber-400 mb-4">
            {Array(5).fill(0).map((_, i) => (
              <Star 
                key={i} 
                className="h-4 w-4 mr-0.5" 
                fill={i < rating ? "currentColor" : "none"} 
                strokeWidth={1.5}
              />
            ))}
          </div>
          
          {/* Testimonial text */}
          <p className="text-gray-700 mb-5 text-sm leading-relaxed line-clamp-4">
            "{text}"
          </p>
          
          {/* Author info with modern styling */}
          <div className="flex items-center">
            <div 
              className="w-10 h-10 rounded-full mr-3 flex items-center justify-center font-medium text-white bg-gradient-to-br from-primary to-primary/80 shadow-sm"
              aria-label={`Avatar for ${name}`}
            >
              {name.charAt(0)}
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm">{name}</h4>
              <p className="text-xs text-gray-500">{location}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;
