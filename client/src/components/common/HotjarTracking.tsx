import { useEffect } from 'react';

// Define types for Hotjar
interface HotjarWindow extends Window {
  hj?: any;
  _hjSettings: {
    hjid: number;
    hjsv: number;
  };
}

// This component initializes Hotjar tracking
const HotjarTracking = () => {
  useEffect(() => {
    // Initialize Hotjar
    if (typeof window !== 'undefined') {
      const hotjarWindow = window as HotjarWindow;
      
      // Define hj function (safely)
      hotjarWindow.hj = hotjarWindow.hj || function() { 
        (hotjarWindow.hj as any).q = (hotjarWindow.hj as any).q || [];
        (hotjarWindow.hj as any).q.push(arguments);
      };
      
      // Set Hotjar settings
      hotjarWindow._hjSettings = { hjid: 5170965, hjsv: 6 };
      
      // Load Hotjar script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://static.hotjar.com/c/hotjar-${hotjarWindow._hjSettings.hjid}.js?sv=${hotjarWindow._hjSettings.hjsv}`;
      document.head.appendChild(script);
    }
  }, []);

  return null; // This component doesn't render anything
};

export default HotjarTracking;