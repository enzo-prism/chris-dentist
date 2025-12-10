import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Phone, MapPin, ChevronDown, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { officeInfo } from "@/lib/data";
import HolidayHoursNotice from "@/components/common/HolidayHoursNotice";
import { cn } from "@/lib/utils";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const holidayWrapperRef = useRef<HTMLDivElement>(null);

  // Calculate and set header height
  useEffect(() => {
    const updateHeaderHeight = () => {
      const holidayHeight = holidayWrapperRef.current?.offsetHeight || 0;
      // Base height: TopBar (40px) + NavBar (approx 96px max) = 136px safe buffer
      const baseHeight = 136; 
      const totalHeight = baseHeight + holidayHeight;
      document.documentElement.style.setProperty('--header-height', `${totalHeight}px`);
    };

    // Initial calculation
    updateHeaderHeight();

    // Observe changes
    const observer = new ResizeObserver(updateHeaderHeight);
    if (holidayWrapperRef.current) {
      observer.observe(holidayWrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenus = () => setMobileMenuOpen(false);
  
  const toggleSubmenu = (label: string) => {
    setExpandedMenus(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (path: string) => location === path;
  const isParentActive = (children: any[]) => children.some(child => isActive(child.href));

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
        { href: "/services", label: "View All Services" }
      ]
    },
    { href: "/patient-stories", label: "Patient Stories" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex flex-col isolation-auto">
      <div ref={holidayWrapperRef} className="relative z-[101]">
        <HolidayHoursNotice />
      </div>
      
      {/* Top Bar - Contact & Info */}
      <motion.div 
        className={cn(
          "w-full bg-[#0a1f1a] text-white/80 transition-all duration-300 overflow-hidden relative z-[101]",
          scrolled ? "h-0 opacity-0 pointer-events-none" : "h-10 opacity-100 border-b border-white/5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex justify-between items-center text-xs sm:text-sm font-medium">
          <div className="flex items-center space-x-6">
            <a href="tel:+16503266319" className="flex items-center hover:text-[#f2d785] transition-colors group">
              <Phone className="h-3.5 w-3.5 mr-2 text-[#f2d785] group-hover:scale-110 transition-transform" />
              <span>(650) 326-6319</span>
            </a>
            <div className="hidden sm:flex items-center text-white/60">
              <Clock className="h-3.5 w-3.5 mr-2" />
              <span>Mon - Fri: 8am - 5pm</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="https://maps.app.goo.gl/UCTqQ1fZsdMq7vma9"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center hover:text-[#f2d785] transition-colors group"
            >
              <MapPin className="h-3.5 w-3.5 mr-2 text-[#f2d785] group-hover:scale-110 transition-transform" />
              <span>409 Cambridge Ave, Palo Alto</span>
            </a>
            <a 
              href={officeInfo.socialMedia.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center hover:text-[#f2d785] transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation Bar */}
      <div 
        className={cn(
          "w-full transition-all duration-300 border-b border-white/5 relative z-[101]",
          scrolled 
            ? "bg-[#0f2f27]/95 backdrop-blur-md shadow-lg py-2" 
            : "bg-[#0f2f27] py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <Link href="/" className="group relative z-[102]">
              <div className="flex items-center gap-3">
                <div className="relative overflow-hidden rounded-lg bg-white/5 p-1 ring-1 ring-white/10 transition-all group-hover:bg-white/10">
                  <img 
                    src="/logo.png" 
                    alt="Dr. Wong Logo" 
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm sm:text-lg font-serif tracking-wide text-white group-hover:text-[#f2d785] transition-colors">
                    Christopher B. Wong, DDS
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/50 group-hover:text-white/70 transition-colors">
                    Cosmetic & Family Dentistry
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 relative z-[102]">
              {navLinks.map((link) => (
                <div 
                  key={link.label}
                  className="relative group"
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  <Link href={link.href}>
                    <span className={cn(
                      "flex items-center gap-1.5 py-2 text-sm font-medium tracking-wide transition-colors cursor-pointer relative z-[102]",
                      isActive(link.href) || (link.submenu && isParentActive(link.submenu))
                        ? "text-[#f2d785]" 
                        : "text-white/90 hover:text-[#f2d785]"
                    )}>
                      {link.label}
                      {link.submenu && (
                        <ChevronDown className="h-3 w-3 transition-transform duration-300 group-hover:-rotate-180" />
                      )}
                    </span>
                  </Link>

                  {/* Animated Underline */}
                  {(isActive(link.href) || (link.submenu && isParentActive(link.submenu))) && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#f2d785] z-[101]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {link.submenu && hoveredLink === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64 z-[103]"
                      >
                        {/* Transparent bridge to prevent mouseleave when moving to dropdown */}
                        <div className="absolute top-0 left-0 w-full h-4 bg-transparent -mt-4" />
                        
                        <div className="bg-[#0f2f27] border border-white/10 rounded-xl shadow-2xl overflow-hidden p-2 relative z-[103]">
                          {link.submenu.map((subItem) => (
                            <Link key={subItem.href} href={subItem.href}>
                              <div className={cn(
                                "flex items-center justify-between px-4 py-3 rounded-lg group/item transition-colors cursor-pointer relative z-[104]",
                                isActive(subItem.href) 
                                  ? "bg-white/10 text-[#f2d785]" 
                                  : "hover:bg-white/5 text-white/90 hover:text-white"
                              )}>
                                <span className="text-sm font-medium">{subItem.label}</span>
                                <ArrowRight className={cn(
                                  "h-3 w-3 opacity-0 -translate-x-2 transition-all",
                                  isActive(subItem.href) ? "opacity-100 translate-x-0" : "group-hover/item:opacity-100 group-hover/item:translate-x-0"
                                )} />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link href="/schedule#appointment">
                <Button 
                  className="bg-[#f2d785] text-[#0f2f27] hover:bg-[#fff0c0] hover:scale-105 transition-all duration-300 font-semibold rounded-full px-6 shadow-[0_0_15px_rgba(242,215,133,0.3)] hover:shadow-[0_0_25px_rgba(242,215,133,0.5)]"
                >
                  Book Appointment
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden relative z-50 p-2 text-white hover:text-[#f2d785] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden bg-[#0f2f27]"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 bg-[url('/bg-pattern.png')] bg-cover pointer-events-none" />
            
            <div 
              className="flex flex-col h-full px-6 pb-8 overflow-y-auto scrollbar-hide"
              style={{ paddingTop: 'var(--header-height)' }}
            >
              <nav className="flex-1 space-y-1">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    {!link.submenu ? (
                      <Link href={link.href}>
                        <div 
                          onClick={closeMenus}
                          className={cn(
                            "text-xl sm:text-2xl font-serif font-medium py-4 border-b border-white/5 transition-colors flex items-center justify-between group",
                            isActive(link.href) ? "text-[#f2d785]" : "text-white/80"
                          )}
                        >
                          <span className="group-active:scale-95 transition-transform">{link.label}</span>
                          <ArrowRight className={cn(
                            "h-5 w-5 opacity-0 -translate-x-2 transition-all",
                            isActive(link.href) ? "opacity-100 translate-x-0" : "group-active:opacity-100 group-active:translate-x-0"
                          )} />
                        </div>
                      </Link>
                    ) : (
                      <div className="border-b border-white/5">
                        <button
                          onClick={() => toggleSubmenu(link.label)}
                          className={cn(
                            "w-full text-xl sm:text-2xl font-serif font-medium py-4 transition-colors flex items-center justify-between group",
                            isActive(link.href) || isParentActive(link.submenu) ? "text-[#f2d785]" : "text-white/80"
                          )}
                        >
                          <span className="group-active:scale-95 transition-transform">{link.label}</span>
                          <ChevronDown 
                            className={cn(
                              "h-5 w-5 transition-transform duration-300",
                              expandedMenus.includes(link.label) ? "rotate-180 text-[#f2d785]" : "text-white/50"
                            )} 
                          />
                        </button>
                        
                        <AnimatePresence>
                          {expandedMenus.includes(link.label) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pb-4 space-y-1 border-l-2 border-[#f2d785]/20 ml-1 mb-2">
                                {link.submenu.map((subLink) => (
                                  <Link key={subLink.href} href={subLink.href}>
                                    <div
                                      onClick={closeMenus}
                                      className={cn(
                                        "py-3 px-2 text-base sm:text-lg font-medium transition-colors block rounded-md active:bg-white/5",
                                        isActive(subLink.href) ? "text-[#f2d785]" : "text-white/70"
                                      )}
                                    >
                                      {subLink.label}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 space-y-4"
              >
                <Link href="/schedule#appointment">
                  <Button className="w-full bg-[#f2d785] text-[#0f2f27] hover:bg-[#fff0c0] font-bold text-lg h-14 rounded-xl shadow-lg active:scale-[0.98] transition-all">
                    Book Appointment Now
                  </Button>
                </Link>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <a href="tel:+16503266319" className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 active:bg-white/10 transition-colors text-white border border-white/5">
                    <Phone className="h-6 w-6 mb-2 text-[#f2d785]" />
                    <span className="text-sm font-medium">Call Us</span>
                  </a>
                  <a href="https://maps.app.goo.gl/UCTqQ1fZsdMq7vma9" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 active:bg-white/10 transition-colors text-white border border-white/5">
                    <MapPin className="h-6 w-6 mb-2 text-[#f2d785]" />
                    <span className="text-sm font-medium">Directions</span>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
