// Beautiful gradient designs for each service card
export const serviceGradients = {
  "Preventive Dentistry": "bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600",
  "Cosmetic Dentistry": "bg-gradient-to-br from-pink-400 via-rose-500 to-purple-600",
  "Restorative Dentistry": "bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600",
  "Pediatric Dentistry": "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500",
  "Orthodontics": "bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600",
  "Invisalign Clear Aligners": "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600",
  "Emergency Dental Care": "bg-gradient-to-br from-red-400 via-pink-500 to-rose-600",
  "Dental Implants": "bg-gradient-to-br from-slate-400 via-gray-500 to-zinc-600",
  "Teeth Whitening": "bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500",
  "Root Canal Therapy": "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600"
};

// Fallback gradient for any service not in the map
export const defaultGradient = "bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600";

// Get gradient class for a service
export const getServiceGradient = (serviceTitle: string): string => {
  return serviceGradients[serviceTitle as keyof typeof serviceGradients] || defaultGradient;
};