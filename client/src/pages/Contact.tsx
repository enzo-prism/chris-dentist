import { MapPin, Phone, Mail, Clock } from "lucide-react";
import AppointmentSection from "@/components/sections/AppointmentSection";
import OfficeInformationSection from "@/components/sections/OfficeInformationSection";
import ContactForm from "@/components/forms/ContactForm";

const Contact = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#F5F9FC] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-[#333333] mb-6">Contact Us</h1>
            <p className="text-xl text-[#333333] max-w-3xl mx-auto">Have questions or need assistance? Reach out to our friendly team using any of the methods below.</p>
          </div>
        </div>
      </section>

      {/* Office Information Section */}
      <OfficeInformationSection />

      {/* Contact Forms Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex -mx-4">
            <div className="md:w-1/2 px-4 mb-8 md:mb-0">
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <h3 className="text-xl font-bold font-heading text-[#333333] mb-4">Office Information</h3>
                
                <div className="flex items-start mb-6">
                  <MapPin className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Office Address</h4>
                    <p className="text-[#333333]">123 University Avenue<br />Palo Alto, CA 94301</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-6">
                  <Clock className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Office Hours</h4>
                    <p className="text-[#333333]">Monday - Thursday: 8:00 AM - 5:00 PM<br />
                    Friday: 8:00 AM - 2:00 PM<br />
                    Saturday - Sunday: Closed</p>
                  </div>
                </div>
                
                <div className="flex items-start mb-6">
                  <Phone className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p className="text-[#333333]">
                      <a href="tel:+16505551234" className="hover:text-primary transition-colors">
                        (650) 555-1234
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <p className="text-[#333333]">
                      <a href="mailto:info@drwongdental.com" className="hover:text-primary transition-colors">
                        info@drwongdental.com
                      </a>
                    </p>
                  </div>
                </div>
                
                {/* Office Photo */}
                <div className="mt-8 rounded-lg overflow-hidden shadow-md">
                  <img 
                    src="/images/dr-wong-reception.png" 
                    alt="Dr. Wong Dental Office Reception" 
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 px-4">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold font-heading text-[#333333] mb-4">Send Us a Message</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section id="appointment">
        <AppointmentSection />
      </section>

      {/* Insurance Section */}
      <section className="py-16 bg-[#F5F9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-[#333333] mb-4">Insurance Information</h2>
            <p className="text-[#333333] max-w-3xl mx-auto">We work with most major insurance providers. Contact us to verify your coverage.</p>
            <div className="w-24 h-1 bg-primary mx-auto mt-4"></div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold font-heading text-[#333333] mb-4">Accepted Insurance Plans</h3>
                <ul className="grid grid-cols-2 gap-y-3">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Delta Dental</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Cigna</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Aetna</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>MetLife</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Guardian</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>United Healthcare</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Blue Cross Blue Shield</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>And many more...</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold font-heading text-[#333333] mb-4">Insurance Questions?</h3>
                <p className="text-[#333333] mb-4">Our team is happy to help you understand your coverage and maximize your benefits. Contact us with your policy information, and we'll verify your benefits before your appointment.</p>
                <p className="text-[#333333] mb-4">For patients without insurance, we offer flexible payment options and an in-house dental plan to make quality dental care accessible.</p>
                <p className="flex items-center text-[#333333]">
                  <Phone className="h-5 w-5 text-primary mr-2" />
                  Call us at: (650) 555-1234
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
