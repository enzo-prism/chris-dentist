import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, MapPin, Search, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

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
    { href: "/services", label: "Services" },
    { href: "/patient-resources", label: "Patient Resources" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" }
  ];

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header 
      ref={headerRef}
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-3 sm:py-4'
      }`}
    >
      {/* Info bar */}
      <div className="bg-gray-50 py-2 absolute top-0 left-0 right-0 -z-10 hidden md:block">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <a href="tel:+16505551234" className="flex items-center text-gray-600 hover:text-primary transition-colors text-xs">
                <Phone className="h-3 w-3 mr-1.5" />
                <span>(650) 555-1234</span>
              </a>
              <span className="text-gray-300">|</span>
              <div className="flex items-center text-gray-600 text-xs">
                <MapPin className="h-3 w-3 mr-1.5" />
                <span>123 Main Street, Palo Alto, CA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-baseline cursor-pointer">
                <span className="text-gray-900 font-medium text-lg sm:text-xl md:text-2xl">Dr. Christopher B. Wong</span>
                <span className="ml-1.5 text-primary font-light text-xs sm:text-sm tracking-wide">DDS</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - visible on large screens */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <div className={`relative group ${isActive(link.href) ? 'text-primary' : 'text-gray-700'}`}>
                      <span className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">
                        {link.label}
                      </span>
                      {/* Animated underline */}
                      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ${
                        isActive(link.href) ? 'w-full' : 'group-hover:w-full'
                      }`}></span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Search button */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={toggleSearch}
              aria-label="Search"
              className="text-gray-700 hover:text-primary rounded-full p-2 h-8 w-8"
            >
              <Search className="h-4 w-4" />
            </Button>

            {/* Appointment Button */}
            <Link href="/schedule#appointment">
              <Button 
                variant="default"
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white hidden sm:flex items-center gap-1.5 px-4 py-2 h-9 text-xs rounded-full transition-all"
                onClick={closeMenus}
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Book Appointment</span>
              </Button>
            </Link>

            {/* Mobile Navigation Button - hidden on large screens */}
            <div className="lg:hidden">
              <Button 
                variant={mobileMenuOpen ? "default" : "ghost"}
                size="sm"
                onClick={toggleMobileMenu}
                aria-label="Menu"
                className={`rounded-full p-2 h-8 w-8 ${
                  mobileMenuOpen 
                    ? "bg-primary text-white" 
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar - with animation */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="py-3 mt-2"
            >
              <SearchBar />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu - with animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-white border-t border-gray-100 shadow-sm"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
              <nav className="flex flex-col divide-y divide-gray-100">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <div 
                      className={`py-3 block transition-colors ${
                        isActive(link.href) 
                          ? 'text-primary font-medium' 
                          : 'text-gray-700 hover:text-primary'
                      }`}
                      onClick={closeMenus}
                    >
                      <div className="flex justify-between items-center">
                        <span>{link.label}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${isActive(link.href) ? 'text-primary rotate-180' : 'text-gray-400'}`} />
                      </div>
                    </div>
                  </Link>
                ))}
              </nav>
              
              {/* Action buttons in mobile menu */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <a 
                  href="tel:+16505551234"
                  className="flex items-center justify-center gap-2 text-sm text-gray-700 border border-gray-200 rounded-full py-2.5 hover:border-gray-300 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call Us</span>
                </a>
                
                <Link href="/schedule#appointment">
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white text-sm rounded-full w-full flex items-center justify-center gap-2 h-10"
                    onClick={closeMenus}
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Book Now</span>
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
