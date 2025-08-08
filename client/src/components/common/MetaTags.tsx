import { Helmet } from 'react-helmet-async';
import { drWongImages } from '@/lib/imageUrls';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function MetaTags({
  title = "Palo Alto Dentist | Dr. Christopher Wong DDS | Premier Care",
  description = "Dr. Christopher B. Wong, trusted Palo Alto dentist offering comprehensive dental care. Schedule your appointment today for exceptional dental services.",
  image = drWongImages.drWongPortrait1,
  url,
  type = "website"
}: MetaTagsProps) {
  // Normalize URL to always use the www version for consistency
  const normalizedUrl = url || (() => {
    const currentUrl = window.location.href;
    const urlObj = new URL(currentUrl);
    
    // Force www subdomain for canonical consistency
    if (!urlObj.hostname.startsWith('www.') && urlObj.hostname === 'chriswongdds.com') {
      urlObj.hostname = 'www.chriswongdds.com';
    }
    
    return urlObj.toString();
  })();
  
  // Ensure the image URL is absolute
  const fullImageUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      
      {/* SEO and duplicate content prevention */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={normalizedUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={normalizedUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={normalizedUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImageUrl} />
    </Helmet>
  );
}