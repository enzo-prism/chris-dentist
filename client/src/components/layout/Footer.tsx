import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Footer link sections
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Dr. Wong" },
    { href: "/services", label: "Our Services" },
    { href: "/patient-resources", label: "Patient Resources" },
    { href: "/blog", label: "Dental Health Blog" },
    { href: "/contact", label: "Contact Us" }
  ];

  const services = [
    { href: "/services#preventive-dentistry", label: "Preventive Dentistry" },
    { href: "/services#cosmetic-dentistry", label: "Cosmetic Dentistry" },
    { href: "/services#restorative-dentistry", label: "Restorative Dentistry" },
    { href: "/services#pediatric-dentistry", label: "Pediatric Dentistry" },
    { href: "/services#orthodontics", label: "Orthodontics" },
    { href: "/services#emergency-dental-care", label: "Emergency Dental Care" }
  ];

  const legalLinks = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/hipaa", label: "HIPAA Notice" },
    { href: "/accessibility", label: "Accessibility" }
  ];

  // Social media links
  const socialMedia = [
    { icon: <FaFacebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <FaTwitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <FaInstagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <FaLinkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-primary text-white">
      {/* Desktop footer - hidden on mobile */}
      <div className="hidden md:block pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Practice Info */}
            <div>
              <h3 className="text-xl font-bold font-heading mb-4">Dr. Christopher B. Wong</h3>
              <p className="mb-4">Comprehensive dental care for patients of all ages in a comfortable, state-of-the-art environment.</p>
              <div className="space-y-3">
                <p className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                  <a href="tel:+16505551234" className="hover:text-blue-200 transition-colors">
                    (650) 555-1234
                  </a>
                </p>
                <p className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                  <a href="mailto:info@drwongdental.com" className="hover:text-blue-200 transition-colors">
                    info@drwongdental.com
                  </a>
                </p>
                <p className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>123 Main Street, Palo Alto, CA 94301</span>
                </p>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold font-heading mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href}>
                      <span className="hover:text-blue-200 transition-colors cursor-pointer">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-xl font-bold font-heading mb-4">Services</h3>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link href={service.href}>
                      <span className="hover:text-blue-200 transition-colors cursor-pointer">
                        {service.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-bold font-heading mb-4">Newsletter</h3>
              <p className="mb-4">Subscribe to our newsletter for dental health tips, practice updates, and special offers.</p>
              <NewsletterForm />
              <div className="flex space-x-4 mt-4">
                {socialMedia.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.href} 
                    className="text-white hover:text-blue-200 transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <Separator className="bg-blue-800" />
          
          <div className="pt-8 text-center text-sm">
            <p>&copy; {currentYear} Dr. Christopher B. Wong, DDS. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-x-4 mt-4">
              {legalLinks.map((link, index) => (
                <div key={index} className="flex items-center">
                  <Link href={link.href}>
                    <span className="hover:text-blue-200 transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                  {index < legalLinks.length - 1 && <span className="ml-4">|</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile footer - visible only on mobile */}
      <div className="md:hidden pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold font-heading mb-2">Dr. Christopher B. Wong</h3>
            <p className="text-sm text-blue-100 mb-4">Comprehensive dental care in Palo Alto</p>
            
            <div className="flex justify-center space-x-4 mb-6">
              {socialMedia.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  className="text-white hover:text-blue-200 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Accordion menu for mobile */}
          <Accordion type="single" collapsible className="mb-6">
            <AccordionItem value="quick-links" className="border-blue-800">
              <AccordionTrigger className="text-white hover:text-blue-200 py-2">
                Quick Links
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 py-2">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link href={link.href}>
                        <span className="hover:text-blue-200 transition-colors cursor-pointer block py-1">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="services" className="border-blue-800">
              <AccordionTrigger className="text-white hover:text-blue-200 py-2">
                Our Services
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 py-2">
                  {services.map((service, index) => (
                    <li key={index}>
                      <Link href={service.href}>
                        <span className="hover:text-blue-200 transition-colors cursor-pointer block py-1">
                          {service.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="contact" className="border-blue-800">
              <AccordionTrigger className="text-white hover:text-blue-200 py-2">
                Contact Us
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 py-2">
                  <p className="flex items-center">
                    <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                    <a href="tel:+16505551234" className="hover:text-blue-200 transition-colors">
                      (650) 555-1234
                    </a>
                  </p>
                  <p className="flex items-center">
                    <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                    <a href="mailto:info@drwongdental.com" className="hover:text-blue-200 transition-colors">
                      info@drwongdental.com
                    </a>
                  </p>
                  <p className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span>123 Main Street, Palo Alto, CA 94301</span>
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {/* Newsletter - Simplified for mobile */}
          <div className="mb-6">
            <h3 className="text-lg font-bold font-heading mb-2 text-center">Join Our Newsletter</h3>
            <NewsletterForm />
          </div>
          
          <Separator className="bg-blue-800" />
          
          <div className="pt-6 text-center text-xs">
            <p>&copy; {currentYear} Dr. Christopher B. Wong, DDS. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {legalLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <span className="hover:text-blue-200 transition-colors cursor-pointer mx-1">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
