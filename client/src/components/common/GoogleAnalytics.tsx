import { useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';

// Define the global gtag function
interface GTagWindow extends Window {
  gtag: (
    command: string,
    action: string,
    params?: Record<string, any>
  ) => void;
}

// This component handles Google Analytics page view tracking for SPAs
const GoogleAnalytics = () => {
  const [location] = useLocation();

  // Track page views
  const trackPageView = useCallback((path: string) => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      // Use type assertion to tell TypeScript that window has gtag property
      const gtagWindow = window as GTagWindow;
      gtagWindow.gtag('config', 'G-9B141WTH4R', {
        page_path: path,
      });
    }
  }, []);

  // Listen for location changes and send page views to GA
  useEffect(() => {
    trackPageView(location);
  }, [location, trackPageView]);

  return null; // This component doesn't render anything
};

export default GoogleAnalytics;