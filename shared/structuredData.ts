import { officeInfo } from "./officeInfo";

export type JsonLdObject = Record<string, unknown>;

const SITE_URL = "https://www.chriswongdds.com";
const PRACTICE_NAME = "Christopher B. Wong, DDS";
const TELEPHONE_E164 = "+16503266319";

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: officeInfo.address.line1,
  addressLocality: "Palo Alto",
  addressRegion: "CA",
  postalCode: "94306",
  addressCountry: "US",
} as const;

const OPENING_HOURS_SPECIFICATION = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "08:00",
    closes: "17:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Friday",
    opens: "08:00",
    closes: "14:00",
  },
] as const;

export function buildDentistJsonLd(): JsonLdObject {
  const instagram = officeInfo.socialMedia.instagram;
  return {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${SITE_URL}/#dentist`,
    name: PRACTICE_NAME,
    url: `${SITE_URL}/`,
    telephone: TELEPHONE_E164,
    address: POSTAL_ADDRESS,
    isAcceptingNewPatients: true,
    medicalSpecialty: "https://schema.org/Dentistry",
    sameAs: instagram ? [instagram] : undefined,
    openingHoursSpecification: OPENING_HOURS_SPECIFICATION,
  };
}

export function buildOrganizationJsonLd(): JsonLdObject {
  const instagram = officeInfo.socialMedia.instagram;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: PRACTICE_NAME,
    url: `${SITE_URL}/`,
    telephone: TELEPHONE_E164,
    address: POSTAL_ADDRESS,
    sameAs: instagram ? [instagram] : undefined,
  };
}

export function buildWebSiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: PRACTICE_NAME,
    alternateName: "Dr. Christopher Wong Palo Alto Dentist",
    url: `${SITE_URL}/`,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function buildHomepageJsonLd(): JsonLdObject[] {
  return [buildDentistJsonLd(), buildOrganizationJsonLd(), buildWebSiteJsonLd()];
}

