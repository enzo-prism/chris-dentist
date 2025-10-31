import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, MapPin, Search, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";
import { FaInstagram } from "react-icons/fa";
import { officeInfo } from "@/lib/data";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (searchOpen) setSearchOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { 
      href: "/services", 
      label: "Services",
      submenu: [
        { href: "/invisalign", label: "Invisalign" },
        { href: "/dental-veneers", label: "Dental Veneers" },
        { href: "/dental-implants", label: "Dental Implants" },
        { href: "/emergency-dental", label: "Emergency Care" },
        { href: "/services", label: "All Services" }
      ]
    },
    { href: "/patient-resources", label: "Patient Resources" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" }
  ];

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top info bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-8">
          <div className="hidden md:flex items-center space-x-4 text-sm text-gray-500">
            <a href="tel:+16503266319" className="text-gray-500 hover:text-primary flex items-center">
              <Phone className="h-3 w-3 mr-1.5" />
              <span>(650) 326-6319</span>
            </a>
            <a
              href="https://maps.app.goo.gl/UCTqQ1fZsdMq7vma9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors flex items-center"
            >
              <MapPin className="h-3 w-3 mr-1.5" />
              <span>409 Cambridge Ave, Palo Alto, CA 94306</span>
            </a>
          </div>
          <div className="hidden md:flex items-center">
            <a 
              href={officeInfo.socialMedia.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary transition-colors" 
              aria-label="Instagram"
            >
              <FaInstagram className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <div className="flex-shrink-0 lg:w-1/4">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img 
                  src="/logo.png" 
                  alt="Dr. Christopher B. Wong DDS" 
                  className="h-10 w-auto"
                />
                <span className="ml-3 text-gray-900 font-medium text-xl">Dr. Wong</span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation - center aligned */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <ul className="flex items-center justify-center w-full mx-auto">
              {navLinks.map((link) => (
                <li key={link.href} className="mx-3 relative group">
                  {link.submenu ? (
                    <div className="relative">
                      <Link href={link.href}>
                        <div className={`px-2 py-2 relative text-center group/item ${isActive(link.href) || link.submenu.some(sub => isActive(sub.href)) ? 'text-primary' : 'text-gray-700'}`}>
                          <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors flex items-center">
                            {link.label}
                            <ChevronDown className="h-3 w-3 ml-1 group-hover:rotate-180 transition-transform duration-200" />
                          </span>
                          {(isActive(link.href) || link.submenu.some(sub => isActive(sub.href))) && (
                            <span className="absolute bottom-0 left-0 right-0 mx-auto w-full h-0.5 bg-primary"></span>
                          )}
                          <span className="absolute bottom-0 left-0 right-0 mx-auto w-0 h-0.5 bg-primary group-hover/item:w-full transition-all duration-300 ease-in-out"></span>
                        </div>
                      </Link>
                      
                      {/* Dropdown menu */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                        <div className="py-2">
                          {link.submenu.map((subLink, index) => (
                            <Link key={subLink.href} href={subLink.href}>
                              <div className={`px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${isActive(subLink.href) ? 'text-primary bg-primary/5' : 'text-gray-700'}`}>
                                <span className="text-sm font-medium">{subLink.label}</span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link href={link.href}>
                      <div className={`px-2 py-2 relative text-center group/item ${isActive(link.href) ? 'text-primary' : 'text-gray-700'}`}>
                        <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">
                          {link.label}
                        </span>
                        {isActive(link.href) && (
                          <span className="absolute bottom-0 left-0 right-0 mx-auto w-full h-0.5 bg-primary"></span>
                        )}
                        <span className="absolute bottom-0 left-0 right-0 mx-auto w-0 h-0.5 bg-primary group-hover/item:w-full transition-all duration-300 ease-in-out"></span>
                      </div>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3 lg:w-1/4 justify-end">
            {/* Search button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSearch}
              aria-label="Search"
              className="text-gray-700 rounded-full h-9 w-9 p-0"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Appointment button */}
            <Link href="/schedule#appointment">
              <Button
                className="bg-primary hover:bg-primary/90 text-white rounded-md hidden sm:flex px-4 h-9"
              >
                <span>Book Appointment</span>
              </Button>
            </Link>

            {/* Mobile menu toggle */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                aria-label="Menu"
                className="text-gray-700 rounded-full h-9 w-9 p-0"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="pb-3"
            >
              <SearchBar />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-t border-gray-100 bg-white"
          >
            <div className="max-w-6xl mx-auto px-4 py-3">
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    <Link href={link.href}>
                      <div
                        className={`py-3 px-2 ${
                          isActive(link.href) || (link.submenu && link.submenu.some(sub => isActive(sub.href)))
                            ? 'text-primary font-medium'
                            : 'text-gray-700'
                        }`}
                        onClick={closeMenus}
                      >
                        {link.label}
                      </div>
                    </Link>
                    {link.submenu && (
                      <div className="ml-4 space-y-1">
                        {link.submenu.map((subLink) => (
                          <Link key={subLink.href} href={subLink.href}>
                            <div
                              className={`py-2 px-2 text-sm ${
                                isActive(subLink.href)
                                  ? 'text-primary font-medium'
                                  : 'text-gray-600'
                              }`}
                              onClick={closeMenus}
                            >
                              {subLink.label}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link href="/schedule#appointment">
                  <Button
                    className="bg-primary hover:bg-primary/90 text-white text-sm w-full mt-2 rounded-md"
                    onClick={closeMenus}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Book Appointment</span>
                  </Button>
                </Link>
                
                {/* Social media links */}
                <div className="flex justify-center mt-4 pt-4 border-t border-gray-100">
                  <a 
                    href={officeInfo.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-500 hover:text-primary px-3 py-2"
                    onClick={closeMenus}
                    aria-label="Follow us on Instagram"
                  >
                    <FaInstagram className="h-5 w-5 mr-2" />
                    <span className="text-sm">Follow us on Instagram</span>
                  </a>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
