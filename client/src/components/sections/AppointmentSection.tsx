import { CheckCircle, Phone } from "lucide-react";
import TypeFormEmbed from "@/components/forms/TypeFormEmbed";
import { officeInfo } from "@/lib/data";

const AppointmentSection = () => {
  return (
    <section className="py-16 bg-[#F5F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 bg-primary p-8 md:p-12 text-white">
              <h2 className="text-3xl font-bold font-heading mb-4">Schedule Your Appointment</h2>
              <p className="mb-6">Choose between in-person visits or convenient virtual consultations for your initial assessment.</p>
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-5 w-5 mr-3" />
                  <span>HIPAA-compliant secure scheduling</span>
                </div>
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-5 w-5 mr-3" />
                  <span>Same-day appointments available</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3" />
                  <span>Easy rescheduling if needed</span>
                </div>
              </div>
              <div className="p-4 bg-blue-900 bg-opacity-50 rounded-lg mb-6">
                <h3 className="font-bold mb-2">Office Hours</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Monday - Thursday</div>
                  <div>{officeInfo.hours.monday}</div>
                  <div>Friday</div>
                  <div>{officeInfo.hours.friday}</div>
                  <div>Saturday - Sunday</div>
                  <div>Closed</div>
                </div>
              </div>
              <a href={`tel:${officeInfo.phone}`} className="flex items-center text-xl font-bold hover:text-blue-200 transition-colors">
                <Phone className="h-6 w-6 mr-2" />
                {officeInfo.phone}
              </a>
            </div>
            
            <div className="md:w-1/2 p-8 md:p-12">
              <h3 className="text-xl font-bold font-heading text-[#333333] mb-4">Book Your Visit</h3>
              <p className="text-[#333333] mb-6">Fill out the form below to schedule your appointment. We'll get back to you promptly to confirm your visit.</p>
              <TypeFormEmbed 
                formId="01JPZ57W1F3352Q1X0XK6P9SNV" 
                className="min-h-[400px] w-full" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentSection;
