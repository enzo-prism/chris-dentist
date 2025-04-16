import { useEffect, useRef } from 'react';

interface GoogleReviewsWidgetProps {
  className?: string;
}

/**
 * Google Reviews Widget component that embeds the Elfsight Google Reviews widget
 * This component handles the proper loading of the Elfsight script and ensures
 * the widget renders correctly
 */
const GoogleReviewsWidget = ({ className = '' }: GoogleReviewsWidgetProps) => {
  const widgetRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create script element for Elfsight platform
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    
    // Add the script to the document if it doesn't already exist
    if (!document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
      document.body.appendChild(script);
    }
    
    // If the widget is already loaded, we need to manually initialize it
    if (window.hasOwnProperty('ElfSight')) {
      const w = window as any;
      if (w.ElfSight && typeof w.ElfSight.reinit === 'function') {
        w.ElfSight.reinit();
      }
    }
    
    // Clean up script when component unmounts
    return () => {
      // We don't remove the script on unmount as it might be used by other widgets
    };
  }, []);
  
  return (
    <div className={`elfsight-google-reviews-container ${className}`} ref={widgetRef}>
      <div 
        className="elfsight-app-97536d24-590e-4a39-ae4c-c3fb469042f8" 
        data-elfsight-app-lazy
      ></div>
    </div>
  );
};

export default GoogleReviewsWidget;