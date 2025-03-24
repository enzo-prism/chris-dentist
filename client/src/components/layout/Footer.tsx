import { Link } from "wouter";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button"; 
import NewsletterForm from "@/components/forms/NewsletterForm";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Footer link sections
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Dr. Wong" },
    { href: "/services", label: "Services" },
    { href: "/patient-resources", label: "Patient Resources" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" }
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
    { icon: <FaFacebook className="h-4 w-4" />, href: "#", label: "Facebook" },
    { icon: <FaTwitter className="h-4 w-4" />, href: "#", label: "Twitter" },
    { icon: <FaInstagram className="h-4 w-4" />, href: "#", label: "Instagram" },
    { icon: <FaLinkedin className="h-4 w-4" />, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-primary bg-opacity-95 text-white">
      {/* Desktop footer - hidden on mobile */}
      <div className="hidden md:block py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {/* Practice Info */}
            <div>
              <h3 className="text-lg font-medium tracking-tight mb-4">Dr. Christopher B. Wong</h3>
              <p className="text-sm text-white/80 mb-6 leading-relaxed">Comprehensive dental care in a comfortable, state-of-the-art environment.</p>
              <div className="space-y-4">
                <p className="flex items-center text-sm text-white/90">
                  <Phone className="h-4 w-4 mr-3 flex-shrink-0 text-white/70" />
                  <a href="tel:+16505551234" className="hover:text-white transition-colors">
                    (650) 555-1234
                  </a>
                </p>
                <p className="flex items-center text-sm text-white/90">
                  <Mail className="h-4 w-4 mr-3 flex-shrink-0 text-white/70" />
                  <a href="mailto:info@drwongdental.com" className="hover:text-white transition-colors">
                    info@drwongdental.com
                  </a>
                </p>
                <p className="flex items-start text-sm text-white/90">
                  <MapPin className="h-4 w-4 mr-3 mt-0.5 flex-shrink-0 text-white/70" />
                  <span>123 Main Street, Palo Alto, CA 94301</span>
                </p>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-sm uppercase tracking-wider mb-4 font-medium">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index} className="text-sm text-white/80">
                    <Link href={link.href}>
                      <span className="hover:text-white transition-colors cursor-pointer inline-flex items-center">
                        {link.label}
                        <ExternalLink className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-sm uppercase tracking-wider mb-4 font-medium">Services</h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="text-sm text-white/80">
                    <Link href={service.href}>
                      <span className="hover:text-white transition-colors cursor-pointer">
                        {service.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Newsletter */}
            <div>
              <h3 className="text-sm uppercase tracking-wider mb-4 font-medium">Newsletter</h3>
              <p className="text-sm text-white/80 mb-4 leading-relaxed">Stay informed with the latest dental care tips and office updates.</p>
              <NewsletterForm />
              <div className="flex space-x-3 mt-5">
                {socialMedia.map((social, index) => (
                  <a 
                    key={index} 
                    href={social.href} 
                    className="text-white/80 hover:text-white transition-colors bg-white/10 p-2 rounded-full"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <Separator className="my-8 bg-white/20" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-white/70">&copy; {currentYear} Dr. Christopher B. Wong, DDS. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {legalLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <span className="text-xs text-white/70 hover:text-white transition-colors cursor-pointer">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile footer - visible only on mobile */}
      <div className="md:hidden py-8">
        <div className="max-w-md mx-auto px-5">
          <div className="text-center mb-8">
            <h3 className="text-lg font-medium mb-2">Dr. Christopher B. Wong</h3>
            <p className="text-sm text-white/80 mb-4">Comprehensive dental care in Palo Alto</p>
            
            <div className="flex justify-center space-x-3 mb-4">
              {socialMedia.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href} 
                  className="text-white/80 hover:text-white transition-colors bg-white/10 p-2 rounded-full"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Contact info for mobile */}
          <div className="bg-white/10 rounded-lg p-4 mb-6">
            <div className="space-y-3">
              <p className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-3 flex-shrink-0 text-white/70" />
                <a href="tel:+16505551234" className="hover:text-white transition-colors">
                  (650) 555-1234
                </a>
              </p>
              <p className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-3 flex-shrink-0 text-white/70" />
                <a href="mailto:info@drwongdental.com" className="hover:text-white transition-colors">
                  info@drwongdental.com
                </a>
              </p>
              <p className="flex items-start text-sm">
                <MapPin className="h-4 w-4 mr-3 mt-0.5 flex-shrink-0 text-white/70" />
                <span>123 Main Street, Palo Alto, CA 94301</span>
              </p>
            </div>
          </div>
          
          {/* Accordion menu for mobile */}
          <Accordion type="single" collapsible className="mb-8">
            <AccordionItem value="quick-links" className="border-white/20">
              <AccordionTrigger className="text-sm py-3 text-white hover:text-white/90">
                Quick Links
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 py-2 pl-2">
                  {quickLinks.map((link, index) => (
                    <li key={index} className="text-sm text-white/80">
                      <Link href={link.href}>
                        <span className="hover:text-white transition-colors cursor-pointer block py-1">
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="services" className="border-white/20">
              <AccordionTrigger className="text-sm py-3 text-white hover:text-white/90">
                Our Services
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 py-2 pl-2">
                  {services.map((service, index) => (
                    <li key={index} className="text-sm text-white/80">
                      <Link href={service.href}>
                        <span className="hover:text-white transition-colors cursor-pointer block py-1">
                          {service.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          {/* Newsletter - Simplified for mobile */}
          <div className="mb-8">
            <h3 className="text-sm uppercase tracking-wider mb-3 font-medium text-center">Newsletter</h3>
            <p className="text-sm text-white/80 mb-4 text-center">Stay updated with our latest news.</p>
            <NewsletterForm />
          </div>
          
          <Separator className="bg-white/20 mb-6" />
          
          <div className="text-center">
            <p className="text-xs text-white/70 mb-4">&copy; {currentYear} Dr. Christopher B. Wong, DDS. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4">
              {legalLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <span className="text-xs text-white/70 hover:text-white transition-colors cursor-pointer">
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
