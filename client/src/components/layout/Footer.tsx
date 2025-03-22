import { Link } from "wouter";
import { Phone, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Practice Info */}
          <div>
            <h3 className="text-xl font-bold font-heading mb-4">Dr. Christopher B. Wong</h3>
            <p className="mb-4">Comprehensive dental care for patients of all ages in a comfortable, state-of-the-art environment.</p>
            <p className="flex items-center mb-2">
              <Phone className="h-5 w-5 mr-2" />
              <a href="tel:+16505551234" className="hover:text-blue-200 transition-colors">
                (650) 555-1234
              </a>
            </p>
            <p className="flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              <a href="mailto:info@drwongdental.com" className="hover:text-blue-200 transition-colors">
                info@drwongdental.com
              </a>
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold font-heading mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="hover:text-blue-200 transition-colors cursor-pointer">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="hover:text-blue-200 transition-colors cursor-pointer">About Dr. Wong</span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="hover:text-blue-200 transition-colors cursor-pointer">Our Services</span>
                </Link>
              </li>
              <li>
                <Link href="/patient-resources">
                  <span className="hover:text-blue-200 transition-colors cursor-pointer">Patient Resources</span>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <span className="hover:text-blue-200 transition-colors cursor-pointer">Dental Health Blog</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="hover:text-blue-200 transition-colors cursor-pointer">Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold font-heading mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#preventive-dentistry">
                  <span className="hover:text-blue-200 transition-colors cursor-pointer">Preventive Dentistry</span>
                </Link>
              </li>
              <li>
                <Link href="/services#cosmetic-dentistry">
                  <span className="hover:text-blue-200 transition-colors cursor-pointer">Cosmetic Dentistry</span>
                </Link>
              </li>
              <li>
                <Link href="/services#restorative-dentistry">
                  <span className="hover:text-blue-200 transition-colors cursor-pointer">Restorative Dentistry</span>
                </Link>
              </li>
              <li>
                <Link href="/services#pediatric-dentistry">
                  <span className="hover:text-blue-200 transition-colors cursor-pointer">Pediatric Dentistry</span>
                </Link>
              </li>
              <li>
                <Link href="/services#orthodontics">
                  <span className="hover:text-blue-200 transition-colors cursor-pointer">Orthodontics</span>
                </Link>
              </li>
              <li>
                <Link href="/services#emergency-dental-care">
                  <span className="hover:text-blue-200 transition-colors cursor-pointer">Emergency Dental Care</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold font-heading mb-4">Newsletter</h3>
            <p className="mb-4">Subscribe to our newsletter for dental health tips, practice updates, and special offers.</p>
            <NewsletterForm />
            <div className="flex space-x-4 mt-4">
              <div className="text-white hover:text-blue-200 transition-colors cursor-pointer">
                <FaFacebook className="h-6 w-6" />
              </div>
              <div className="text-white hover:text-blue-200 transition-colors cursor-pointer">
                <FaTwitter className="h-6 w-6" />
              </div>
              <div className="text-white hover:text-blue-200 transition-colors cursor-pointer">
                <FaInstagram className="h-6 w-6" />
              </div>
              <div className="text-white hover:text-blue-200 transition-colors cursor-pointer">
                <FaLinkedin className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="bg-blue-800" />
        
        <div className="pt-8 text-center text-sm">
          <p>&copy; {currentYear} Dr. Christopher B. Wong, DDS. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link href="/privacy-policy">
              <span className="hover:text-blue-200 transition-colors cursor-pointer">Privacy Policy</span>
            </Link>
            <span>|</span>
            <Link href="/terms">
              <span className="hover:text-blue-200 transition-colors cursor-pointer">Terms of Service</span>
            </Link>
            <span>|</span>
            <Link href="/hipaa">
              <span className="hover:text-blue-200 transition-colors cursor-pointer">HIPAA Notice</span>
            </Link>
            <span>|</span>
            <Link href="/accessibility">
              <span className="hover:text-blue-200 transition-colors cursor-pointer">Accessibility</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
