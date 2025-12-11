import { officeInfo } from './data';

/**
 * Meta titles for different pages of the website.
 * Each title is concise and includes the practice name.
 */
export const pageTitles = {
  // Home page
  home: `Palo Alto Dentist | Dr. Christopher Wong DDS | Premier Care`,
  
  // About page
  about: `About Dr. Christopher Wong DDS | Palo Alto Dentist`,
  
  // Services page
  services: `Palo Alto Dental Services | Dr. Christopher Wong DDS`,
  
  // Patient resources
  patientResources: `Patient Resources | Palo Alto Dentist Dr. Christopher Wong`,
  
  // Testimonials
  testimonials: `Patient Reviews | Palo Alto Dentist Dr. Christopher Wong`,
  patientStories: `Patient Stories & Transformations | Dr. Christopher Wong DDS`,
  
  // Blog page
  blog: `Dental Health Blog | Dr. Christopher Wong DDS, Palo Alto`,
  
  // Contact page
  contact: `Contact Palo Alto Dentist Dr. Christopher Wong DDS`,
  
  // Schedule page
  schedule: `Book Appointment | Palo Alto Dentist | Dr. Christopher Wong`,
  
  // Invisalign page
  invisalign: `Invisalign® Treatment in Palo Alto | Clear Aligners | Dr. Christopher Wong`,
  
  // Emergency dental page
  emergencyDental: `Emergency Dental Care Palo Alto | 24/7 Dental Emergency | Dr. Wong`,
  
  // ZOOM Whitening page
  zoomWhitening: `ZOOM Teeth Whitening Palo Alto | Fast In-Office Whitening | Dr. Wong`,
  
  // Analytics page
  analytics: `Analytics Dashboard | Practice Performance Metrics | Dr. Wong`,
  
  // Not found page
  notFound: `Page Not Found | Dr. Christopher Wong Palo Alto DDS`,
  
  // Default fallback
  default: `Palo Alto Dentist | Dr. Christopher Wong DDS Dental Care`
};

/**
 * Meta descriptions for different pages of the website.
 * Each description is concise (<160 characters) and highlights key page content.
 */
export const pageDescriptions = {
  // Home page
  home: `Top-rated Palo Alto dentist Dr. Christopher Wong provides exceptional dental care. Services include cleanings, cosmetic dentistry and emergency treatments.`,
  
  // About page
  about: `Meet Dr. Christopher Wong, experienced Palo Alto dentist with years of excellence. Learn about our patient-centered approach to dental care in Palo Alto.`,
  
  // Services page
  services: `Complete dental services in Palo Alto: preventive care, cosmetic dentistry, restorative treatments, orthodontics & emergency dental care. Top Palo Alto dentist.`,
  
  // Patient resources
  patientResources: `Patient forms, insurance info & visit preparation for Dr. Wong's Palo Alto dental practice. Convenient resources for our dental patients.`,
  
  // Testimonials
  testimonials: `Read patient reviews for Dr. Christopher Wong, trusted Palo Alto dentist. Real testimonials from satisfied patients in Palo Alto and surrounding areas.`,
  
  patientStories: `Real patient case studies showing Invisalign, whitening, and bonding transformations by Palo Alto dentist Dr. Christopher Wong.`,
  
  // Blog page
  blog: `Dental health tips and news from Dr. Wong's Palo Alto dental practice. Stay informed about oral health and dental technology advances.`,
  
  // Contact page
  contact: `Contact Palo Alto dentist Dr. Christopher Wong at ${officeInfo.address.line1}, ${officeInfo.address.line2}. Call ${officeInfo.phone} to schedule your visit.`,
  
  // Schedule page
  schedule: `Schedule your appointment with Palo Alto dentist Dr. Christopher Wong. New patients welcome. Easy online booking for dental care in Palo Alto.`,
  
  // Invisalign page
  invisalign: `Invisalign® treatment in Palo Alto with Dr. Christopher Wong. Discreet, comfortable orthodontic treatment for teens and adults. Virtually invisible braces.`,
  
  // Emergency dental page
  emergencyDental: `24/7 emergency dental care in Palo Alto. Dr. Wong provides immediate treatment for dental emergencies including toothaches, broken teeth, and trauma.`,
  
  // ZOOM Whitening page
  zoomWhitening: `Get a brighter smile fast with ZOOM! teeth whitening in Palo Alto. Dr. Wong offers same-day in-office whitening with minimal sensitivity.`,
  
  // Analytics page
  analytics: `Secure analytics dashboard showing practice performance metrics, marketing ROI, and patient engagement data for Dr. Wong's dental practice.`,
  
  // Not found page
  notFound: `Page not found. Return to Dr. Wong's Palo Alto dental practice homepage or contact our office for assistance with dental appointments.`,
  
  // Default fallback
  default: `Dr. Christopher Wong, trusted Palo Alto dentist offering comprehensive dental care. Schedule your appointment today for exceptional dental services.`
};
