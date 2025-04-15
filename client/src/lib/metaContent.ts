import { officeInfo } from './data';

/**
 * Meta titles for different pages of the website.
 * Each title is concise and includes the practice name.
 */
export const pageTitles = {
  // Home page
  home: `${officeInfo.name} | Premier Dental Care in Palo Alto`,
  
  // About page
  about: `About Our Team | ${officeInfo.name}`,
  
  // Services page
  services: `Dental Services | ${officeInfo.name}`,
  
  // Patient resources
  patientResources: `Patient Resources | ${officeInfo.name}`,
  
  // Testimonials
  testimonials: `Patient Success Stories | ${officeInfo.name}`,
  
  // Blog page
  blog: `Dental Health Blog | ${officeInfo.name}`,
  
  // Contact page
  contact: `Contact Our Palo Alto Office | ${officeInfo.name}`,
  
  // Schedule page
  schedule: `Book Your Appointment | ${officeInfo.name}`,
  
  // Not found page
  notFound: `Page Not Found | ${officeInfo.name}`,
  
  // Default fallback
  default: `${officeInfo.name} | Palo Alto Dental Care`
};

/**
 * Meta descriptions for different pages of the website.
 * Each description is concise (<160 characters) and highlights key page content.
 */
export const pageDescriptions = {
  // Home page
  home: `Experience exceptional dental care with Dr. Christopher Wong in Palo Alto. We provide comprehensive, patient-centered services in a comfortable environment.`,
  
  // About page
  about: `Meet Dr. Christopher Wong and our skilled dental team. Learn about our patient-centered approach and commitment to excellence in Palo Alto dental care.`,
  
  // Services page
  services: `Comprehensive dental services in Palo Alto including preventive care, cosmetic dentistry, restorative treatments, orthodontics, and emergency care.`,
  
  // Patient resources
  patientResources: `Access forms, insurance information, and preparation tips for your visit to Dr. Wong's dental practice in Palo Alto. Making your care convenient.`,
  
  // Testimonials
  testimonials: `Read authentic patient stories and testimonials about their experiences with Dr. Christopher Wong's dental practice in Palo Alto.`,
  
  // Blog page
  blog: `Stay informed with the latest dental health tips, news, and advances in dental technology from Dr. Wong's practice in Palo Alto.`,
  
  // Contact page
  contact: `Contact Dr. Wong's dental practice in Palo Alto. Our office is conveniently located at ${officeInfo.address.line1}, ${officeInfo.address.line2}.`,
  
  // Schedule page
  schedule: `Book your dental appointment with Dr. Christopher Wong in Palo Alto. New patients welcome. Easy online scheduling available.`,
  
  // Not found page
  notFound: `The page you're looking for cannot be found. Return to our Palo Alto dental practice homepage or contact our office for assistance.`,
  
  // Default fallback
  default: `Dr. Christopher Wong offers comprehensive dental care in Palo Alto, CA. Schedule your appointment today and experience exceptional dental services.`
};