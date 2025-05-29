import { Helmet } from 'react-helmet-async';

interface CanonicalUrlProps {
  path?: string;
}

const CanonicalUrl = ({ path }: CanonicalUrlProps) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const currentPath = path || (typeof window !== 'undefined' ? window.location.pathname : '');
  const canonicalUrl = `${baseUrl}${currentPath}`;

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
    </Helmet>
  );
};

export default CanonicalUrl;