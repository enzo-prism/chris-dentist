import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, MapPin, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";

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
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top info bar */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-8">
          <div className="hidden md:flex items-center space-x-4 text-sm text-gray-500">
            <a href="tel:+16505551234" className="text-gray-500 hover:text-primary flex items-center">
              <Phone className="h-3 w-3 mr-1.5" />
              <span>(650) 555-1234</span>
            </a>
            <div className="text-gray-500 flex items-center">
              <MapPin className="h-3 w-3 mr-1.5" />
              <span>123 Main Street, Palo Alto, CA</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <span className="text-gray-900 font-medium text-xl">Dr. Christopher B.</span>
                <span className="text-primary ml-1.5">Wong</span>
              </div>
            </Link>
          </div>

          {/* Desktop navigation - center aligned */}
          <nav className="hidden lg:flex items-center justify-center flex-1 px-8">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <div className={`px-1 py-2 relative ${isActive(link.href) ? 'text-primary' : 'text-gray-700'}`}>
                      <span className="text-sm cursor-pointer hover:text-primary transition-colors">
                        {link.label}
                      </span>
                      {isActive(link.href) && (
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
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
                  <Link key={link.href} href={link.href}>
                    <div
                      className={`py-3 px-2 ${
                        isActive(link.href)
                          ? 'text-primary font-medium'
                          : 'text-gray-700'
                      }`}
                      onClick={closeMenus}
                    >
                      {link.label}
                    </div>
                  </Link>
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
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
