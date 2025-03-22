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
                  <a className="hover:text-blue-200 transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="hover:text-blue-200 transition-colors">About Dr. Wong</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="hover:text-blue-200 transition-colors">Our Services</a>
                </Link>
              </li>
              <li>
                <Link href="/patient-resources">
                  <a className="hover:text-blue-200 transition-colors">Patient Resources</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="hover:text-blue-200 transition-colors">Dental Health Blog</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="hover:text-blue-200 transition-colors">Contact Us</a>
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
                  <a className="hover:text-blue-200 transition-colors">Preventive Dentistry</a>
                </Link>
              </li>
              <li>
                <Link href="/services#cosmetic-dentistry">
                  <a className="hover:text-blue-200 transition-colors">Cosmetic Dentistry</a>
                </Link>
              </li>
              <li>
                <Link href="/services#restorative-dentistry">
                  <a className="hover:text-blue-200 transition-colors">Restorative Dentistry</a>
                </Link>
              </li>
              <li>
                <Link href="/services#pediatric-dentistry">
                  <a className="hover:text-blue-200 transition-colors">Pediatric Dentistry</a>
                </Link>
              </li>
              <li>
                <Link href="/services#orthodontics">
                  <a className="hover:text-blue-200 transition-colors">Orthodontics</a>
                </Link>
              </li>
              <li>
                <Link href="/services#emergency-dental-care">
                  <a className="hover:text-blue-200 transition-colors">Emergency Dental Care</a>
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
              <a href="#" className="text-white hover:text-blue-200 transition-colors">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-white hover:text-blue-200 transition-colors">
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <Separator className="bg-blue-800" />
        
        <div className="pt-8 text-center text-sm">
          <p>&copy; {currentYear} Dr. Christopher B. Wong, DDS. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <Link href="/privacy-policy">
              <a className="hover:text-blue-200 transition-colors">Privacy Policy</a>
            </Link>
            <span>|</span>
            <Link href="/terms">
              <a className="hover:text-blue-200 transition-colors">Terms of Service</a>
            </Link>
            <span>|</span>
            <Link href="/hipaa">
              <a className="hover:text-blue-200 transition-colors">HIPAA Notice</a>
            </Link>
            <span>|</span>
            <Link href="/accessibility">
              <a className="hover:text-blue-200 transition-colors">Accessibility</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
