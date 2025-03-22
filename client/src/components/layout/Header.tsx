import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

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
    { href: "/contact", label: "Contact" }
  ];

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <span className="text-primary font-heading font-bold text-2xl">Dr. Christopher B. Wong</span>
                <span className="ml-2 text-[#00AA90] font-heading text-lg">DDS</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`${isActive(link.href) ? 'text-primary font-semibold' : 'text-[#333333] hover:text-primary'} transition-colors duration-200 cursor-pointer`}>
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-[#333333]" />
              ) : (
                <Menu className="h-6 w-6 text-[#333333]" />
              )}
            </Button>
          </div>

          {/* Appointment Button */}
          <div className="hidden md:block">
            <Link href="/contact#appointment">
              <Button className="bg-[#E63946] hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md transition-transform hover:-translate-y-1 hover:shadow-md">
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
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
              <Link href="/contact#appointment">
                <Button 
                  className="bg-[#E63946] hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md w-full mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Appointment
                </Button>
              </Link>
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
