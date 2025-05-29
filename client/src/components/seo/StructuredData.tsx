import { Helmet } from 'react-helmet-async';
import { officeInfo, doctorInfo } from '@/lib/data';

interface StructuredDataProps {
  type?: 'organization' | 'dentist' | 'service' | 'review';
  serviceData?: {
    name: string;
    description: string;
    slug: string;
  };
  reviewData?: {
    rating: number;
    reviewCount: number;
  };
}

const StructuredData = ({ type = 'organization', serviceData, reviewData }: StructuredDataProps) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  // Organization schema for the dental practice
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${baseUrl}/#organization`,
    "name": officeInfo.name,
    "alternateName": "Dr. Wong's Dental Practice",
    "description": "Premier dental care practice in Palo Alto providing comprehensive dental services with a focus on conservative, ethical approaches.",
    "url": baseUrl,
    "logo": `${baseUrl}/favicon/apple-touch-icon.png`,
    "image": `${baseUrl}/favicon/apple-touch-icon.png`,
    "telephone": officeInfo.phone,
    "email": officeInfo.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": officeInfo.address.line1,
      "addressLocality": "Palo Alto",
      "addressRegion": "CA",
      "postalCode": "94306",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "37.4419",
      "longitude": "-122.1430"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
        "opens": "08:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Friday",
        "opens": "08:00",
        "closes": "16:00"
      }
    ],
    "priceRange": "$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Credit Card, Insurance",
    "areaServed": {
      "@type": "City",
      "name": "Palo Alto",
      "sameAs": "https://en.wikipedia.org/wiki/Palo_Alto,_California"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Dental Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Preventive Dentistry",
            "description": "Comprehensive preventive care including cleanings, exams, and fluoride treatments"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Restorative Dentistry",
            "description": "Dental restorations including fillings, crowns, and bridges"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cosmetic Dentistry",
            "description": "Aesthetic dental treatments to enhance your smile"
          }
        }
      ]
    },
    "founder": {
      "@type": "Person",
      "@id": `${baseUrl}/#person-dr-wong`,
      "name": doctorInfo.name,
      "jobTitle": "Doctor of Dental Surgery",
      "description": doctorInfo.bio,
      "alumniOf": "University of the Pacific Arthur A. Dugoni School of Dentistry",
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "degree",
        "recognizedBy": {
          "@type": "Organization",
          "name": "American Dental Association"
        }
      }
    },
    "sameAs": [
      "https://www.healthgrades.com/",
      "https://www.yelp.com/"
    ]
  };

  // Dentist person schema
  const dentistSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person-dr-wong`,
    "name": doctorInfo.name,
    "jobTitle": "Doctor of Dental Surgery",
    "description": doctorInfo.bio,
    "worksFor": {
      "@id": `${baseUrl}/#organization`
    },
    "alumniOf": {
      "@type": "Organization",
      "name": "University of the Pacific Arthur A. Dugoni School of Dentistry"
    },
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Dentist",
      "occupationLocation": {
        "@type": "City",
        "name": "Palo Alto, CA"
      }
    },
    "memberOf": {
      "@type": "Organization",
      "name": "American Dental Association"
    }
  };

  // Service schema
  const serviceSchema = serviceData ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/services#${serviceData.slug}`,
    "name": serviceData.name,
    "description": serviceData.description,
    "provider": {
      "@id": `${baseUrl}/#organization`
    },
    "areaServed": {
      "@type": "City",
      "name": "Palo Alto"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": serviceData.name,
      "itemListElement": [{
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": serviceData.name
        }
      }]
    }
  } : null;

  // Review aggregate schema
  const reviewSchema = reviewData ? {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "ratingValue": reviewData.rating,
    "reviewCount": reviewData.reviewCount,
    "bestRating": "5",
    "worstRating": "1",
    "itemReviewed": {
      "@id": `${baseUrl}/#organization`
    }
  } : null;

  const getSchema = () => {
    switch (type) {
      case 'dentist':
        return dentistSchema;
      case 'service':
        return serviceSchema;
      case 'review':
        return reviewSchema;
      default:
        return organizationSchema;
    }
  };

  const schema = getSchema();

  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;