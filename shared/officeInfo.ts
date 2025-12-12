export const officeInfo = {
  name: "Christopher B. Wong, DDS",
  phoneE164: "+16503266319",
  address: {
    line1: "409 Cambridge Ave",
    line2: "Palo Alto, CA 94306",
    city: "Palo Alto",
    region: "CA",
    postalCode: "94306",
    country: "US",
  },
  mapUrl: "https://maps.app.goo.gl/UCTqQ1fZsdMq7vma9",
  hours: {
    monday: "8:00 AM - 5:00 PM",
    tuesday: "8:00 AM - 5:00 PM",
    wednesday: "8:00 AM - 5:00 PM",
    thursday: "8:00 AM - 5:00 PM",
    friday: "8:00 AM - 2:00 PM",
    saturday: "Closed",
    sunday: "Closed",
  },
  openingHoursSpecification: [
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
  ],
  phone: "(650) 326-6319",
  email: "info@drwongdental.com",
  socialMedia: {
    facebook: "https://facebook.com/drwongdental",
    twitter: "https://twitter.com/drwongdental",
    instagram: "https://www.instagram.com/dr_wong_paloalto/",
    linkedin: "https://linkedin.com/in/drchristopherwong",
  },
} as const;

export type OfficeInfo = typeof officeInfo;

export const holidayHours = {
  active: true,
  id: "winter-break-2025-2026",
  title: "Winter holiday hours",
  description:
    "We’ll be closed after Friday, December 19 and will reopen on Monday, January 5, 2026 at 8:00 AM.",
  entries: [
    { day: "Friday, December 19", hours: "8:00 AM – 1:00 PM" },
    { day: "December 20 – January 4", hours: "Closed for the holidays" },
    { day: "Monday, January 5, 2026", hours: "Reopening at 8:00 AM" },
  ],
  cta: {
    label: "Plan your January visit",
    href: "/schedule#appointment",
  },
} as const;
