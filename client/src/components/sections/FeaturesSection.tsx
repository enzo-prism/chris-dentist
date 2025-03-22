import { ClipboardList, Clock, ShieldCheck } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <ClipboardList className="h-6 w-6 text-primary" />,
      title: "Advanced Technology",
      description: "State-of-the-art equipment and techniques for precise diagnostics and comfortable treatment.",
      color: "primary",
    },
    {
      icon: <Clock className="h-6 w-6 text-[#00AA90]" />,
      title: "Convenient Scheduling",
      description: "Book appointments online 24/7 with options for both in-person and virtual consultations.",
      color: "secondary",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-[#E63946]" />,
      title: "HIPAA Compliant",
      description: "Secure online forms and communications that protect your privacy and meet all regulatory requirements.",
      color: "highlight",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-lg shadow-md border-t-4 ${
                feature.color === "primary" 
                  ? "border-primary" 
                  : feature.color === "secondary" 
                  ? "border-[#00AA90]" 
                  : "border-[#E63946]"
              }`}
            >
              <div className="rounded-full bg-[#F5F9FC] p-3 w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">{feature.title}</h3>
              <p className="text-[#333333]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
