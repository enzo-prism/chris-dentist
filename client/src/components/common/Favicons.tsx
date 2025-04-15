import { Helmet } from 'react-helmet-async';

/**
 * This component adds favicons to the document head
 * It uses the Chris Wong Dental logo for consistent branding across devices
 */
export default function Favicons() {
  return (
    <Helmet>
      {/* Basic favicon */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      
      {/* PNG favicon for better quality in modern browsers */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      
      {/* Apple Touch Icon for iOS devices */}
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      
      {/* Android Chrome */}
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Safari pinned tab */}
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#005f40" />
      
      {/* Microsoft Tiles */}
      <meta name="msapplication-TileColor" content="#005f40" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      
      {/* Theme color for browser UI */}
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
  );
}