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
      <Card className="h-full bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
        {/* Decorative quote icon */}
        <div className="absolute -top-1 -right-1 text-primary/5">
          <Quote className="w-16 h-16 sm:w-20 sm:h-20" strokeWidth={1} />
        </div>
        
        <CardContent className="p-0 relative z-10">
          {/* Star rating */}
          <div className="flex text-yellow-400 mb-3 sm:mb-4">
            {Array(5).fill(0).map((_, i) => (
              <Star 
                key={i} 
                className="h-4 w-4 sm:h-5 sm:w-5" 
                fill={i < rating ? "currentColor" : "none"} 
              />
            ))}
          </div>
          
          {/* Testimonial text */}
          <p className="text-[#333333] italic mb-4 text-sm sm:text-base line-clamp-6 sm:line-clamp-none">
            "{text}"
          </p>
          
          {/* Author info */}
          <div className="flex items-center mt-auto pt-2 border-t border-gray-100">
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 flex items-center justify-center font-bold text-white bg-primary"
              aria-label={`Avatar for ${name}`}
            >
              {name.charAt(0)}
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base">{name}</h4>
              <p className="text-xs sm:text-sm text-gray-600">{location}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TestimonialCard;
