import { officeInfo } from "./officeInfo";

export type MetaDefinition = {
  title: string;
  description: string;
};

/**
 * Meta titles for different pages of the website.
 */
export const pageTitles = {
  home: "Palo Alto Dentist | Dr. Christopher Wong DDS | Premier Care",
  about: "About Dr. Christopher Wong DDS | Palo Alto Dentist",
  services: "Palo Alto Dental Services | Dr. Christopher Wong DDS",
  patientResources: "Patient Resources | Palo Alto Dentist Dr. Christopher Wong",
  testimonials: "Patient Reviews | Palo Alto Dentist Dr. Christopher Wong",
  patientStories: "Patient Stories & Transformations | Dr. Christopher Wong DDS",
  blog: "Dental Health Blog | Dr. Christopher Wong DDS, Palo Alto",
  contact: "Contact Palo Alto Dentist Dr. Christopher Wong DDS",
  schedule: "Book Appointment | Palo Alto Dentist | Dr. Christopher Wong",
  invisalign: "Invisalign® Treatment in Palo Alto | Clear Aligners | Dr. Christopher Wong",
  emergencyDental: "Emergency Dental Care Palo Alto | 24/7 Dental Emergency | Dr. Wong",
  zoomWhitening: "ZOOM Teeth Whitening Palo Alto | Fast In-Office Whitening | Dr. Wong",
  dentalImplants: "Dental Implants in Palo Alto | Implant Dentist Dr. Christopher Wong",
  analytics: "Analytics Dashboard | Practice Performance Metrics | Dr. Wong",
  notFound: "Page Not Found | Dr. Christopher Wong Palo Alto DDS",
  default: "Palo Alto Dentist | Dr. Christopher Wong DDS Dental Care",
} as const;

/**
 * Meta descriptions for different pages of the website.
 */
export const pageDescriptions = {
  home:
    "Top-rated Palo Alto dentist Dr. Christopher Wong provides exceptional dental care. Services include cleanings, cosmetic dentistry and emergency treatments.",
  about:
    "Meet Dr. Christopher Wong, experienced Palo Alto dentist with years of excellence. Learn about our patient-centered approach to dental care in Palo Alto.",
  services:
    "Complete dental services in Palo Alto: preventive care, cosmetic dentistry, restorative treatments, orthodontics & emergency dental care. Top Palo Alto dentist.",
  patientResources:
    "Patient forms, insurance info & visit preparation for Dr. Wong's Palo Alto dental practice. Convenient resources for our dental patients.",
  testimonials:
    "Read patient reviews for Dr. Christopher Wong, trusted Palo Alto dentist. Real testimonials from satisfied patients in Palo Alto and surrounding areas.",
  patientStories:
    "Real patient case studies showing Invisalign, whitening, and bonding transformations by Palo Alto dentist Dr. Christopher Wong.",
  blog:
    "Dental health tips and news from Dr. Wong's Palo Alto dental practice. Stay informed about oral health and dental technology advances.",
  contact: `Contact Palo Alto dentist Dr. Christopher Wong at ${officeInfo.address.line1}, ${officeInfo.address.line2}. Call ${officeInfo.phone} to schedule your visit.`,
  schedule:
    "Schedule your appointment with Palo Alto dentist Dr. Christopher Wong. New patients welcome. Easy online booking for dental care in Palo Alto.",
  invisalign:
    "Invisalign® treatment in Palo Alto with Dr. Christopher Wong. Discreet, comfortable orthodontic treatment for teens and adults. Virtually invisible braces.",
  emergencyDental:
    "24/7 emergency dental care in Palo Alto. Dr. Wong provides immediate treatment for dental emergencies including toothaches, broken teeth, and trauma.",
  zoomWhitening:
    "Get a brighter smile fast with ZOOM! teeth whitening in Palo Alto. Dr. Wong offers same-day in-office whitening with minimal sensitivity.",
  dentalImplants:
    "Replace missing teeth with dental implants in Palo Alto. Dr. Wong offers implant planning, placement partners, and natural-looking restorations.",
  analytics:
    "Secure analytics dashboard showing practice performance metrics, marketing ROI, and patient engagement data for Dr. Wong's dental practice.",
  notFound:
    "Page not found. Return to Dr. Wong's Palo Alto dental practice homepage or contact our office for assistance with dental appointments.",
  default:
    "Dr. Christopher Wong, trusted Palo Alto dentist offering comprehensive dental care. Schedule your appointment today for exceptional dental services.",
  dentalVeneers:
    "Transform your smile with dental veneers in Palo Alto. Dr. Wong offers porcelain, composite, and no-prep options for beautiful results.",
  accessibility:
    "Learn about Dr. Wong's commitment to web accessibility and providing equal access to dental care for all patients, along with efforts to improve our site.",
  hipaa:
    "Learn about HIPAA rights and how Dr. Wong's dental practice protects health information privacy with policies for security and patient confidentiality.",
  privacyPolicy:
    "Learn how Dr. Wong's dental practice protects your personal information and maintains patient privacy in accordance with HIPAA regulations.",
  terms:
    "Read the terms and conditions for using Dr. Wong's dental practice website and the guidelines for receiving dental services in our Palo Alto office.",
  thankYou:
    "Thank you for scheduling your appointment with Dr. Wong's dental practice in Palo Alto. We look forward to providing exceptional care at your upcoming visit.",
  gaTest:
    "Internal testing page for Google Analytics events.",
} as const;

const staticMetaByPath: Record<string, MetaDefinition> = {
  "/": { title: pageTitles.home, description: pageDescriptions.home },
  "/about": { title: pageTitles.about, description: pageDescriptions.about },
  "/services": {
    title: pageTitles.services,
    description: pageDescriptions.services,
  },
  "/patient-resources": {
    title: pageTitles.patientResources,
    description: pageDescriptions.patientResources,
  },
  "/testimonials": {
    title: pageTitles.testimonials,
    description: pageDescriptions.testimonials,
  },
  "/patient-stories": {
    title: pageTitles.patientStories,
    description: pageDescriptions.patientStories,
  },
  "/blog": { title: pageTitles.blog, description: pageDescriptions.blog },
  "/contact": { title: pageTitles.contact, description: pageDescriptions.contact },
  "/schedule": {
    title: pageTitles.schedule,
    description: pageDescriptions.schedule,
  },
  "/invisalign": {
    title: pageTitles.invisalign,
    description: pageDescriptions.invisalign,
  },
  "/emergency-dental": {
    title: pageTitles.emergencyDental,
    description: pageDescriptions.emergencyDental,
  },
  "/zoom-whitening": {
    title: pageTitles.zoomWhitening,
    description: pageDescriptions.zoomWhitening,
  },
  "/dental-implants": {
    title: pageTitles.dentalImplants,
    description: pageDescriptions.dentalImplants,
  },
  "/dental-veneers": {
    title:
      "Dental Veneers Palo Alto | Dr. Christopher Wong | Porcelain & Composite Veneers",
    description: pageDescriptions.dentalVeneers,
  },
  "/accessibility": {
    title: "Accessibility Statement | Christopher B. Wong, DDS",
    description: pageDescriptions.accessibility,
  },
  "/hipaa": {
    title: "HIPAA Notice | Christopher B. Wong, DDS",
    description: pageDescriptions.hipaa,
  },
  "/privacy-policy": {
    title: "Privacy Policy | Christopher B. Wong, DDS",
    description: pageDescriptions.privacyPolicy,
  },
  "/terms": {
    title: "Terms of Service | Christopher B. Wong, DDS",
    description: pageDescriptions.terms,
  },
  "/thank-you": {
    title: "Thank You - Appointment Scheduled | Dr. Christopher Wong DDS",
    description: pageDescriptions.thankYou,
  },
  "/analytics": {
    title: pageTitles.analytics,
    description: pageDescriptions.analytics,
  },
  "/ga-test": {
    title: "Google Analytics Test Page",
    description: pageDescriptions.gaTest,
  },
};

export function normalizePathname(pathname: string): string {
  const trimmed = pathname.split(/[?#]/)[0] || "/";
  if (trimmed.length > 1 && trimmed.endsWith("/")) {
    return trimmed.slice(0, -1);
  }
  return trimmed;
}

export function getMetaForPath(pathname: string): MetaDefinition {
  const normalized = normalizePathname(pathname);
  return (
    staticMetaByPath[normalized] ?? {
      title: pageTitles.default,
      description: pageDescriptions.default,
    }
  );
}

export function buildExcerpt(text: string, limit = 160): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= limit) return normalized;
  return `${normalized.slice(0, Math.max(limit - 1, 0))}…`;
}

