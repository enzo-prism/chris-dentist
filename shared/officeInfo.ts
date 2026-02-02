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
  id: "office-closure-2026-02-16",
  title: "Monday, February 16th, 2026",
  description:
    "Our Palo Alto office will be closed on Monday, February 16th, 2026. We reopen Tuesday, February 17th, 2026 at 8:00 AM.",
  entries: [
    { day: "Monday, February 16th, 2026", hours: "Closed" },
    { day: "Tuesday, February 17th, 2026", hours: "8:00 AM - 5:00 PM" },
  ],
  cta: {
    label: "Schedule after February 16th, 2026",
    href: "/schedule#appointment",
  },
} as const;
