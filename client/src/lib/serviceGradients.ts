// Subtle and minimalistic gradient designs for each service card
export const serviceGradients = {
  "Preventive Dentistry": "bg-gradient-to-br from-emerald-50 to-teal-100",
  "Cosmetic Dentistry": "bg-gradient-to-br from-rose-50 to-pink-100",
  "Restorative Dentistry": "bg-gradient-to-br from-blue-50 to-indigo-100",
  "Pediatric Dentistry": "bg-gradient-to-br from-yellow-50 to-orange-100",
  "Orthodontics": "bg-gradient-to-br from-violet-50 to-purple-100",
  "Invisalign Clear Aligners": "bg-gradient-to-br from-sky-50 to-blue-100",
  "Emergency Dental Care": "bg-gradient-to-br from-red-50 to-rose-100",
  "Dental Implants": "bg-gradient-to-br from-slate-50 to-gray-100",
  "Teeth Whitening": "bg-gradient-to-br from-amber-50 to-yellow-100",
  "Root Canal Therapy": "bg-gradient-to-br from-green-50 to-emerald-100"
};

// Fallback gradient for any service not in the map
export const defaultGradient = "bg-gradient-to-br from-blue-50 to-indigo-100";

// Get gradient class for a service
export const getServiceGradient = (serviceTitle: string): string => {
  return serviceGradients[serviceTitle as keyof typeof serviceGradients] || defaultGradient;
};