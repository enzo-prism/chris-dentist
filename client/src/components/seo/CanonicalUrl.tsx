import { Helmet } from 'react-helmet-async';

interface CanonicalUrlProps {
  path?: string;
}

const CanonicalUrl = ({ path }: CanonicalUrlProps) => {
  // Always normalize to www version for canonical URLs
  const canonicalUrl = (() => {
    if (typeof window === 'undefined') return '';
    
    const urlObj = new URL(window.location.href);
    
    // Force www subdomain for canonical consistency
    if (!urlObj.hostname.startsWith('www.') && urlObj.hostname === 'chriswongdds.com') {
      urlObj.hostname = 'www.chriswongdds.com';
    }
    
    // Use provided path or current pathname
    if (path !== undefined) {
      urlObj.pathname = path;
    }
    
    // Remove search params and hash for clean canonical URLs
    urlObj.search = '';
    urlObj.hash = '';
    
    return urlObj.toString();
  })();

  if (!canonicalUrl) return null;

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default CanonicalUrl;