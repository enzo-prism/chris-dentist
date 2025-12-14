import { Helmet } from "@/lib/helmet";
import { normalizePathname } from "@/lib/seo";
import { useLocation } from "wouter";

const PreloadResources = () => {
  const [location] = useLocation();
  const normalizedLocation = normalizePathname(location || "/");
  const isHome = normalizedLocation === "/";

  return (
    <Helmet>
      {/* Preload critical fonts */}
      <link 
        rel="preload" 
        href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&family=Lato:wght@400;700&display=swap" 
        as="style"
      />
      
      {/* Preload critical images */}
      <link rel="preload" href="/favicon/apple-touch-icon.png" as="image" type="image/png" />
	      {isHome && (
	        <link
	          rel="preload"
	          as="image"
	          href="/images/hero-office-960.webp"
	          imageSrcSet="/images/hero-office-640.webp 640w, /images/hero-office-960.webp 960w, /images/hero-office-1280.webp 1280w"
	          imageSizes="(max-width: 1024px) 100vw, 60vw"
	          type="image/webp"
	        />
	      )}
      
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Resource hints for better performance */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
    </Helmet>
  );
};

export default PreloadResources;
