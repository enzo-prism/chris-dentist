import { CheckCircle, Phone, Calendar } from "lucide-react";
import TypeFormEmbed from "@/components/forms/TypeFormEmbed";
import { officeInfo } from "@/lib/data";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const AppointmentSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-10 sm:py-16 bg-[#F5F9FC]" id="appointments">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div 
          className="text-center mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeIn}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading mb-3">
            Schedule Your Appointment
          </h2>
          <p className="text-[#333333] max-w-2xl mx-auto text-sm sm:text-base">
            We offer flexible scheduling options to fit your busy lifestyle
          </p>
        </motion.div>
        
        {/* Appointment card */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left side - info section */}
            <div className="lg:w-1/2 bg-primary p-6 sm:p-8 lg:p-12 text-white">
              <h2 className="text-xl sm:text-2xl font-bold font-heading mb-4">Book Your Appointment</h2>
              <p className="mb-6 text-sm sm:text-base">Choose between in-person visits or convenient virtual consultations for your initial assessment.</p>
              
              {/* Benefits list */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-3 flex-shrink-0" />
                  <span className="text-sm sm:text-base">HIPAA-compliant secure scheduling</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-3 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Same-day appointments available</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-3 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Easy rescheduling if needed</span>
                </div>
              </div>
              
              {/* Office hours card */}
              <div className="p-4 bg-blue-900 bg-opacity-50 rounded-lg mb-6">
                <h3 className="font-bold mb-2 text-sm sm:text-base">Office Hours</h3>
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                  <div>Monday - Thursday</div>
                  <div>{officeInfo.hours.monday}</div>
                  <div>Friday</div>
                  <div>{officeInfo.hours.friday}</div>
                  <div>Saturday - Sunday</div>
                  <div>Closed</div>
                </div>
              </div>
              
              {/* Contact options */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <a href={`tel:${officeInfo.phone}`} className="flex items-center text-base sm:text-lg font-bold hover:text-blue-200 transition-colors">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span>{officeInfo.phone}</span>
                </a>
                
                <Button variant="outline" className="bg-white text-primary hover:bg-blue-50">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>View Calendar</span>
                </Button>
              </div>
            </div>
            
            {/* Right side - form section */}
            <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12">
              <h3 className="text-lg sm:text-xl font-bold font-heading text-[#333333] mb-2 sm:mb-4">Book Your Visit</h3>
              <p className="text-[#333333] mb-6 text-sm sm:text-base">Fill out the form below to schedule your appointment. We'll get back to you promptly to confirm your visit.</p>
              
              {/* TypeForm embedded form */}
              <TypeFormEmbed 
                formId="01JPZ57W1F3352Q1X0XK6P9SNV" 
                className="min-h-[350px] sm:min-h-[400px] w-full" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
