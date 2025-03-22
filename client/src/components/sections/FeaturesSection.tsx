import { ClipboardList, Clock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
    {
      icon: <ClipboardList className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
      title: "Advanced Technology",
      description: "State-of-the-art equipment and techniques for precise diagnostics and comfortable treatment.",
      color: "primary",
    },
    {
      icon: <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-[#00AA90]" />,
      title: "Convenient Scheduling",
      description: "Book appointments online 24/7 with options for both in-person and virtual consultations.",
      color: "secondary",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6 text-[#E63946]" />,
      title: "HIPAA Compliant",
      description: "Secure online forms and communications that protect your privacy and meet all regulatory requirements.",
      color: "highlight",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-10 sm:py-16" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-3">
            Why Choose Dr. Wong's Practice
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#333333] max-w-2xl mx-auto">
            Experience dental care that combines cutting-edge technology with personalized attention
          </p>
        </div>
        
        {/* Features grid - responsive from 1 column on mobile to 3 columns on desktop */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className={`bg-white p-5 sm:p-6 rounded-lg shadow-md border-t-4 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                feature.color === "primary" 
                  ? "border-primary" 
                  : feature.color === "secondary" 
                  ? "border-[#00AA90]" 
                  : "border-[#E63946]"
              }`}
              variants={item}
            >
              <div className="rounded-full bg-[#F5F9FC] p-3 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-heading mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-[#333333]">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
