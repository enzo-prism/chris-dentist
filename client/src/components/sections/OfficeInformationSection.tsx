import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { officeInfo } from "@/lib/data";

const OfficeInformationSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#333333] mb-4">Contact Us</h2>
          <p className="text-[#333333] max-w-3xl mx-auto">Have questions or need assistance? Reach out to our friendly team using any of the methods below.</p>
          <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="rounded-full bg-primary bg-opacity-10 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold font-heading text-[#333333] mb-2">Our Location</h3>
            <p className="text-[#333333]">{officeInfo.address.line1}<br/>{officeInfo.address.line2}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="rounded-full bg-primary bg-opacity-10 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold font-heading text-[#333333] mb-2">Phone</h3>
            <p className="text-[#333333]">
              <a href={`tel:${officeInfo.phone}`} className="hover:text-primary transition-colors">
                {officeInfo.phone}
              </a>
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="rounded-full bg-primary bg-opacity-10 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold font-heading text-[#333333] mb-2">Email</h3>
            <p className="text-[#333333]">
              <a href={`mailto:${officeInfo.email}`} className="hover:text-primary transition-colors">
                {officeInfo.email}
              </a>
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="rounded-full bg-primary bg-opacity-10 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold font-heading text-[#333333] mb-2">Office Hours</h3>
            <p className="text-[#333333] text-sm">
              Mon-Thu: {officeInfo.hours.monday}<br/>
              Fri: {officeInfo.hours.friday}<br/>
              Sat-Sun: Closed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfficeInformationSection;
