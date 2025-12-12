import { Helmet } from "@/lib/helmet";

/**
 * This component adds a sitemap link to the document head
 * to help search engines discover the sitemap
 */
export default function SitemapLink() {
  return (
    <Helmet>
      <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    </Helmet>
  );
}
