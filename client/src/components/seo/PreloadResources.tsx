import { Helmet } from "@/lib/helmet";

const PreloadResources = () => {
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
