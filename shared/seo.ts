import { officeInfo } from "./officeInfo";

export type SeoDefinition = {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
};

const DEFAULT_OG_IMAGE = "/images/dr_wong_polaroids.png";

export function normalizePathname(pathname: string): string {
  const trimmed = pathname.split(/[?#]/)[0] || "/";
  if (trimmed.length > 1 && trimmed.endsWith("/")) {
    return trimmed.slice(0, -1);
  }
  return trimmed;
}

export const seoByPath: Record<string, SeoDefinition> = {
  "/": {
    title:
      "Palo Alto Dentist | Christopher B. Wong, DDS | Cosmetic & Family Dentistry",
    description:
      "Palo Alto dentist Dr. Christopher B. Wong, DDS provides family, cosmetic & restorative dentistry, Invisalign, implants, and emergency care. Book online.",
    canonicalPath: "/",
    ogImage: "https://i.imgur.com/BeX3mhS.png",
  },
  "/about": {
    title: "Dr. Christopher B. Wong, DDS | Palo Alto Dentist",
    description:
      "Learn about Dr. Wong, DDS, a Palo Alto dentist focused on conservative care, Invisalign, and implant restoration. Looking for a Wong dentist in Palo Alto? Meet the team and our approach.",
    canonicalPath: "/about",
    ogImage: "https://i.imgur.com/iqBXT9y.png",
  },
  "/services": {
    title: "Palo Alto Dental Services | Dr. Christopher Wong DDS",
    description:
      "Complete dental services in Palo Alto: preventive care, cosmetic dentistry, restorative treatments, orthodontics & emergency dental care. Top Palo Alto dentist.",
    canonicalPath: "/services",
    ogImage: "https://i.imgur.com/hO02YQ0.png",
  },
  "/preventive-dentistry": {
    title: "Preventive Dentistry in Palo Alto | Exams & Cleanings | Dr. Wong, DDS",
    description:
      "Preventive dentistry in Palo Alto including exams, cleanings, screenings, and personalized care to avoid cavities and gum disease.",
    canonicalPath: "/preventive-dentistry",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/restorative-dentistry": {
    title: "Restorative Dentistry in Palo Alto | Fillings, Crowns & Implants | Dr. Wong, DDS",
    description:
      "Restore damaged or missing teeth with restorative dentistry in Palo Alto. Dr. Wong offers fillings, crowns, bridges, and implant restorations.",
    canonicalPath: "/restorative-dentistry",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/pediatric-dentistry": {
    title: "Pediatric Dentistry in Palo Alto | Kids’ Dental Care | Dr. Wong, DDS",
    description:
      "Gentle pediatric dentistry in Palo Alto for infants, kids, and teens. Preventive cleanings, sealants, and family‑friendly care.",
    canonicalPath: "/pediatric-dentistry",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/patient-resources": {
    title: "Patient Resources | Palo Alto Dentist Dr. Christopher Wong",
    description:
      "Patient forms, insurance info & visit preparation for Dr. Wong's Palo Alto dental practice. Convenient resources for our dental patients.",
    canonicalPath: "/patient-resources",
    ogImage: "https://i.imgur.com/wt7peyr.png",
  },
  "/testimonials": {
    title: "Patient Reviews | Palo Alto Dentist | Dr. Wong, DDS",
    description:
      "Read patient reviews for Dr. Christopher Wong, trusted Palo Alto dentist. Real testimonials from satisfied patients in Palo Alto and surrounding areas.",
    canonicalPath: "/testimonials",
    ogImage: "https://i.imgur.com/ypt5eZ7.png",
  },
  "/patient-stories": {
    title: "Patient Stories & Transformations | Dr. Christopher Wong DDS",
    description:
      "Real patient case studies showing Invisalign, whitening, and bonding transformations by Palo Alto dentist Dr. Christopher Wong.",
    canonicalPath: "/patient-stories",
    ogImage:
      "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1765382510/IMG_8356_bjxk7p.webp",
  },
  "/blog": {
    title: "Dental Health Blog | Dr. Christopher Wong DDS, Palo Alto",
    description:
      "Dental health tips and news from Dr. Wong's Palo Alto dental practice. Stay informed about oral health and dental technology advances.",
    canonicalPath: "/blog",
    ogImage: "https://i.imgur.com/qK5nPtS.png",
  },
  "/contact": {
    title: "Contact | Palo Alto Dentist | Dr. Wong, DDS",
    description: `Contact Palo Alto dentist Dr. Christopher Wong at ${officeInfo.address.line1}, ${officeInfo.address.line2}. Call ${officeInfo.phone} to schedule your visit.`,
    canonicalPath: "/contact",
    ogImage: "https://i.imgur.com/nGlhUdH.png",
  },
  "/schedule": {
    title: "Book Appointment | Palo Alto Dentist | Dr. Christopher Wong",
    description:
      "Schedule your appointment with Palo Alto dentist Dr. Christopher Wong. New patients welcome. Easy online booking for dental care in Palo Alto.",
    canonicalPath: "/schedule",
    ogImage: "https://i.imgur.com/AC5lGu3.png",
  },
  "/invisalign": {
    title:
      "Invisalign Palo Alto, CA | Clear Aligners | Dr. Christopher B. Wong, DDS",
    description:
      "Invisalign dentist in Palo Alto offering clear aligners with digital scans, personalized plans, and easy checkups for teens and adults. Schedule a consult today.",
    canonicalPath: "/invisalign",
    ogImage: "/images/invisalign-treatment.jpg",
  },
  "/invisalign/resources": {
    title: "Invisalign Resources in Palo Alto | Dr. Christopher B. Wong, DDS",
    description:
      "Invisalign resources for Palo Alto patients: timelines, attachments, costs, and aftercare. Explore clear aligner guidance and book a consult.",
    canonicalPath: "/invisalign/resources",
    ogImage: "/images/invisalign-treatment.jpg",
  },
  "/emergency-dental": {
    title: "Emergency Dentist in Palo Alto | Same-Day Care | Dr. Wong, DDS",
    description:
      "Emergency dentist in Palo Alto offering same-day care for urgent toothaches, broken teeth, infections, and dental trauma. Call now for relief.",
    canonicalPath: "/emergency-dental",
    ogImage: "https://i.imgur.com/hO02YQ0.png",
  },
  "/zoom-whitening": {
    title: "ZOOM Whitening in Palo Alto | In-Office Teeth Whitening | Dr. Wong, DDS",
    description:
      "In‑office ZOOM! whitening in Palo Alto for a noticeably brighter smile. Professional isolation, shade planning, and sensitivity management—book a visit.",
    canonicalPath: "/zoom-whitening",
    ogImage: "https://i.imgur.com/qK5nPtS.png",
  },
  "/teeth-whitening-palo-alto": {
    title: "Palo Alto Teeth Whitening | In-Office & Take-Home Options | Dr. Wong, DDS",
    description:
      "Palo Alto teeth whitening with dentist‑supervised options: in‑office whitening and custom take‑home trays. Safe care with sensitivity planning—schedule a visit.",
    canonicalPath: "/teeth-whitening-palo-alto",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/dental-cleaning-palo-alto": {
    title: "Dental Cleaning in Palo Alto | Preventive Care | Dr. Wong, DDS",
    description:
      "Gentle dental cleanings in Palo Alto to remove plaque, prevent cavities, and keep gums healthy. Family‑friendly care at Dr. Wong’s office.",
    canonicalPath: "/dental-cleaning-palo-alto",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/cavity-fillings-palo-alto": {
    title:
      "Cavity Fillings in Palo Alto | Tooth‑Colored Restorations | Dr. Wong, DDS",
    description:
      "Treat cavities early with tooth‑colored fillings in Palo Alto. Conservative composite restorations that look natural and restore strength.",
    canonicalPath: "/cavity-fillings-palo-alto",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/crowns-palo-alto": {
    title: "Dental Crowns in Palo Alto | Natural‑Looking Protection | Dr. Wong, DDS",
    description:
      "Custom dental crowns in Palo Alto to repair large cavities or cracks. Durable, natural‑looking restorations designed for comfort.",
    canonicalPath: "/crowns-palo-alto",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/pediatric-dentist-palo-alto": {
    title: "Pediatric Dentist in Palo Alto | Kids’ Dentistry | Dr. Wong, DDS",
    description:
      "Gentle pediatric dentistry in Palo Alto for infants, kids, and teens. Preventive cleanings, sealants, and family‑centered care.",
    canonicalPath: "/pediatric-dentist-palo-alto",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/dentist-menlo-park": {
    title: "Menlo Park Family Dentist | Nearby Palo Alto Care | Dr. Wong, DDS",
    description:
      "Family dentist near Menlo Park for kids, teens, adults, and seniors. Preventive checkups, cleanings, fillings, Invisalign, and emergency care—visit our nearby Palo Alto office.",
    canonicalPath: "/dentist-menlo-park",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/dentist-stanford": {
    title: "Stanford Dentist | Convenient Palo Alto Dental Care | Dr. Wong, DDS",
    description:
      "Stanford students and families choose Dr. Wong in Palo Alto for cleanings, Invisalign, restorations, and same‑day emergency visits.",
    canonicalPath: "/dentist-stanford",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/dental-implants": {
    title: "Dental Implants in Palo Alto | Implant Restoration | Dr. Wong, DDS",
    description:
      "Replace missing teeth with dental implants in Palo Alto. Dr. Wong offers implant planning, placement partners, and natural-looking restorations.",
    canonicalPath: "/dental-implants",
    ogImage: "https://i.imgur.com/hO02YQ0.png",
  },
  "/dental-veneers": {
    title:
      "Dental Veneers Palo Alto | Dr. Christopher Wong | Porcelain & Composite Veneers",
    description:
      "Transform your smile with dental veneers in Palo Alto. Dr. Wong offers porcelain, composite, and no-prep options for beautiful results.",
    canonicalPath: "/dental-veneers",
    ogImage: "https://i.imgur.com/hO02YQ0.png",
  },
  "/accessibility": {
    title: "Accessibility Statement | Christopher B. Wong, DDS",
    description:
      "Learn about Dr. Wong's commitment to web accessibility and providing equal access to dental care for all patients, along with efforts to improve our site.",
    canonicalPath: "/accessibility",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/hipaa": {
    title: "HIPAA Notice | Christopher B. Wong, DDS",
    description:
      "Learn about HIPAA rights and how Dr. Wong's dental practice protects health information privacy with policies for security and patient confidentiality.",
    canonicalPath: "/hipaa",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/privacy-policy": {
    title: "Privacy Policy | Christopher B. Wong, DDS",
    description:
      "Learn how Dr. Wong's dental practice protects your personal information and maintains patient privacy in accordance with HIPAA regulations.",
    canonicalPath: "/privacy-policy",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/terms": {
    title: "Terms of Service | Christopher B. Wong, DDS",
    description:
      "Read the terms and conditions for using Dr. Wong's dental practice website and the guidelines for receiving dental services in our Palo Alto office.",
    canonicalPath: "/terms",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/thank-you": {
    title: "Thank You - Appointment Scheduled | Dr. Christopher Wong DDS",
    description:
      "Thank you for scheduling your appointment with Dr. Wong's dental practice in Palo Alto. We look forward to providing exceptional care at your upcoming visit.",
    canonicalPath: "/thank-you",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/analytics": {
    title: "Analytics Dashboard | Practice Performance Metrics | Dr. Wong",
    description:
      "Secure analytics dashboard showing practice performance metrics, marketing ROI, and patient engagement data for Dr. Wong's dental practice.",
    canonicalPath: "/analytics",
    ogImage: DEFAULT_OG_IMAGE,
  },
  "/ga-test": {
    title: "Google Analytics Test Page",
    description: "Internal testing page for Google Analytics events.",
    canonicalPath: "/ga-test",
    ogImage: DEFAULT_OG_IMAGE,
  },
};

const DEFAULT_SEO: SeoDefinition = {
  title: seoByPath["/"].title,
  description: seoByPath["/"].description,
  canonicalPath: "/",
  ogImage: DEFAULT_OG_IMAGE,
};

export function getSeoForPath(pathname: string): SeoDefinition {
  const normalized = normalizePathname(pathname);
  const entry = seoByPath[normalized];
  if (entry) {
    return entry;
  }

  return {
    ...DEFAULT_SEO,
    canonicalPath: normalized,
  };
}

export function buildExcerpt(text: string, limit = 160): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= limit) return normalized;
  return `${normalized.slice(0, Math.max(limit - 1, 0))}…`;
}
