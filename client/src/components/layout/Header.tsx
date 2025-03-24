import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
    <header className={`sticky top-0 z-50 bg-white backdrop-blur-sm bg-opacity-90 transition-all duration-300 ${scrolled ? 'shadow-sm py-2' : 'py-3'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar with contact info - visible on medium screens and up */}
        <div className="hidden md:flex items-center justify-between text-sm text-gray-500 mb-2">
          <div className="flex items-center">
            <a href="tel:+16505551234" className="flex items-center hover:text-primary transition-colors">
              <Phone className="h-4 w-4 mr-1" />
              <span className="text-xs">(650) 555-1234</span>
            </a>
          </div>
          <div>
            <p className="text-xs">123 Main Street, Palo Alto, CA 94301</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <span className="text-primary font-heading font-bold text-lg sm:text-xl md:text-2xl tracking-tight">Dr. Christopher B. Wong</span>
                <span className="ml-1 sm:ml-2 text-primary/80 font-heading text-xs sm:text-sm md:text-base tracking-wide">DDS</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - visible on large screens */}
          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`${isActive(link.href) ? 'text-primary font-medium' : 'text-gray-700 hover:text-primary'} transition-colors duration-200 cursor-pointer text-sm`}>
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSearch}
              aria-label="Search"
              className="text-gray-700 hover:text-primary hover:bg-primary/10"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Appointment Button */}
            <Link href="/schedule#appointment">
              <Button 
                variant="default"
                size="sm"
                className="bg-primary hover:bg-primary/90 text-white hidden sm:flex items-center space-x-1.5 px-3 py-1.5 text-xs rounded-full transition-all shadow-sm"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Book Appointment</span>
              </Button>
            </Link>

            {/* Mobile Navigation Button - hidden on large screens */}
            <div className="lg:hidden">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileMenu}
                aria-label="Menu"
                className="text-gray-700 hover:text-primary hover:bg-primary/10"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Search Bar - toggles visibility */}
        {searchOpen && (
          <div className="py-3 mt-2 animate-in fade-in-0 slide-in-from-top-5 duration-300">
            <SearchBar />
          </div>
        )}

        {/* Mobile Menu - toggles visibility */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 mt-2 animate-in fade-in-0 slide-in-from-top-5 duration-300">
            <Separator className="mb-4" />
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span 
                    className={`${isActive(link.href) ? 'text-primary font-medium' : 'text-gray-700 hover:text-primary'} py-1 block cursor-pointer text-sm`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/schedule#appointment">
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white font-medium px-4 py-2 rounded-full text-sm w-full mt-2 flex items-center justify-center space-x-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Appointment</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
