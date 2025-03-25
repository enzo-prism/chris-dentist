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
  title = "Dr. Christopher B. Wong, DDS | Palo Alto Dental Care",
  description = "Dr. Christopher B. Wong offers comprehensive dental care in Palo Alto, CA. Schedule your appointment today and experience exceptional dental services.",
  image = drWongImages.drWongPortrait1,
  url = window.location.href,
  type = "website"
}: MetaTagsProps) {
  // Ensure the image URL is absolute
  const fullImageUrl = image.startsWith('http') ? image : `${window.location.origin}${image}`;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImageUrl} />
    </Helmet>
  );
}