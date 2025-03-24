import { ClipboardList, Clock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const FeaturesSection = () => {
  const features = [
    {
      icon: <ClipboardList className="h-5 w-5 text-primary" />,
      title: "Advanced Technology",
      description: "State-of-the-art equipment and techniques for precise diagnostics and comfortable treatment.",
    },
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      title: "Convenient Scheduling",
      description: "Book appointments online 24/7 with options for both in-person and virtual consultations.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-primary" />,
      title: "HIPAA Compliant",
      description: "Secure online forms and communications that protect your privacy and meet all regulatory requirements.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50" id="features">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Why Choose Dr. Wong
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Experience dental care that combines modern technology with personalized attention
          </p>
        </div>
        
        {/* Features grid with clean, minimal styling */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-6 md:p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow transition-all duration-300 group"
              variants={item}
            >
              <div className="bg-primary/10 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
