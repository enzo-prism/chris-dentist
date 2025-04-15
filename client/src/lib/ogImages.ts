import { drWongImages } from './imageUrls';

/**
 * OpenGraph images for different pages of the website.
 * These are optimized for social media sharing (1200x630 aspect ratio recommended).
 */
export const ogImages = {
  // Home page
  home: drWongImages.drWongOffice1,
  
  // About page
  about: drWongImages.drWongPortrait2,
  
  // Services page with treatment room view
  services: drWongImages.treatmentRoom,
  
  // Patient resources with office entrance
  patientResources: drWongImages.officeEntrance,
  
  // Testimonials with team photo
  testimonials: drWongImages.teamPhoto,
  
  // Blog page with lab image
  blog: drWongImages.drWongLab1,
  
  // Contact page with reception desk
  contact: drWongImages.drWongReception,
  
  // Schedule page with waiting area
  schedule: drWongImages.drWongWaiting,
  
  // Default/fallback image
  default: drWongImages.drWongPortrait1
};