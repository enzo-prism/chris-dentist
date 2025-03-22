import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/patient-resources", label: "Patient Resources" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/blog", label: "Blog" },
    { href: "/schedule", label: "Schedule" },
    { href: "/contact", label: "Contact" }
  ];

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-md py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with contact info - visible on medium screens and up */}
        <div className="hidden sm:flex items-center justify-between text-sm text-gray-600 mb-2">
          <div className="flex items-center">
            <a href="tel:+16505551234" className="flex items-center hover:text-primary transition-colors">
              <Phone className="h-4 w-4 mr-1" />
              <span>(650) 555-1234</span>
            </a>
          </div>
          <div>
            <p className="text-sm">123 Main Street, Palo Alto, CA 94301</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <span className="text-primary font-heading font-bold text-xl sm:text-2xl">Dr. Christopher B. Wong</span>
                <span className="ml-1 sm:ml-2 text-[#00AA90] font-heading text-sm sm:text-lg">DDS</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - visible on large screens */}
          <nav className="hidden lg:flex space-x-4 xl:space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`${isActive(link.href) ? 'text-primary font-semibold' : 'text-[#333333] hover:text-primary'} transition-colors duration-200 cursor-pointer text-sm xl:text-base`}>
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation Button - hidden on large screens */}
          <div className="lg:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu}
              aria-label="Menu"
              className="ml-2"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-[#333333]" />
              ) : (
                <Menu className="h-6 w-6 text-[#333333]" />
              )}
            </Button>
          </div>

          {/* Appointment Button - Always visible but changes size based on screen */}
          <div className="hidden sm:block">
            <Link href="/schedule#appointment">
              <Button className="bg-[#E63946] hover:bg-red-600 text-white font-semibold px-3 sm:px-4 md:px-6 py-1 sm:py-2 rounded-md transition-all hover:-translate-y-1 hover:shadow-md text-xs sm:text-sm md:text-base">
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu - toggles visibility */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 bg-white border-t mt-2 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span 
                    className={`${isActive(link.href) ? 'text-primary font-semibold' : 'text-[#333333] hover:text-primary'} py-2 block cursor-pointer`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <div className="sm:hidden">
                <Link href="/schedule#appointment">
                  <Button 
                    className="bg-[#E63946] hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md w-full mt-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
        
        {/* Search Bar */}
        <div className="py-2 border-t mt-2">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
