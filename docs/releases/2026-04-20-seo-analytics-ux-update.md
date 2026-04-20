# Chris Wong DDS release note, 2026-04-20

## Summary
This release improves local SEO coverage, booking-funnel analytics, structured data consistency, and appointment-path UX across the site.

## What changed

### SEO and metadata
- Tightened titles and descriptions for core money pages and nearby-city pages.
- Replaced weak blog-post snippets with cleaner generated meta descriptions.
- Improved internal linking from blog posts to relevant service pages, especially around whitening, Invisalign, emergency care, implants, and local-intent pages.

### Structured data
- Strengthened the global business schema to better represent the practice as a `Dentist`, `LocalBusiness`, and `MedicalBusiness`.
- Preserved breadcrumb schema across pages.
- Added or standardized `Service` schema coverage on high-intent pages including:
  - `/crowns-palo-alto`
  - `/cavity-fillings-palo-alto`
  - `/dental-cleaning-palo-alto`
  - `/pediatric-dentist-palo-alto`
  - existing core service pages such as implants, Invisalign, whitening, veneers, emergency, and preventive/restorative pages continue to emit service schema.

### Analytics and conversion tracking
- Added booking-funnel events around the Typeform scheduling flow:
  - `booking_form_ready`
  - `booking_form_start`
  - `booking_form_step_view`
  - `booking_form_step_complete`
  - `booking_form_submit`
- Added global `phone_click` tracking.
- Added `schedule_cta_click` tracking for schedule-intent links.

### UX improvements
- Reduced scheduling friction by strengthening the instant-call path on key pages.
- Updated hero and appointment messaging to better differentiate Dr. Wong and emphasize conservative, comfort-first care.
- Kept the stale holiday closure notice inactive and normalized its default office-hours state.

## Key files changed
- `client/src/components/common/GoogleAnalytics.tsx`
- `client/src/components/forms/TypeFormEmbed.tsx`
- `client/src/components/sections/AppointmentSection.tsx`
- `client/src/components/sections/HeroSection.tsx`
- `client/src/lib/analytics.ts`
- `client/src/lib/seo.ts`
- `client/src/lib/structuredData.ts`
- `client/src/pages/BlogPost.tsx`
- `client/src/pages/CavityFillingsPaloAlto.tsx`
- `client/src/pages/CrownsPaloAlto.tsx`
- `client/src/pages/DentalCleaningPaloAlto.tsx`
- `client/src/pages/DentalImplants.tsx`
- `client/src/pages/Home.tsx`
- `client/src/pages/PediatricDentistPaloAlto.tsx`
- `client/src/pages/Schedule.tsx`
- `server/vite.ts`
- `shared/metaContent.ts`
- `shared/officeInfo.ts`
- `shared/seo.ts`
- `shared/structuredData.ts`

## Validation
- `pnpm check` ✅
- `pnpm build` ✅

## March 2026 analytics snapshot used to prioritize fixes
- GA4 property: `503642498`
  - 41 sessions
  - 35 users
  - 77 pageviews
- Google Search Console domain: `chriswongdds.com`
  - 98 clicks
  - 5,408 impressions
  - 1.81% CTR
  - average position: 19.0

## Follow-up notes
- GitHub CLI auth and Vercel CLI auth were not usable in the local environment during this pass, so direct CLI-based remote inspection was limited.
- If production is connected to Git-based auto-deploys on `main`, pushing this commit should publish the update automatically.
