# GA4 marketing attribution tracking

## What is tracked in code

### Page and CTA intent
- SPA pageviews through `GoogleAnalytics`
- `schedule_cta_click`
- `phone_click`

### Booking funnel
- `booking_form_ready`
- `booking_form_start`
- `booking_form_step_view`
- `booking_form_step_complete`
- `booking_form_submit`

The live booking flow is the embedded Typeform used on the main scheduling surfaces.

### Native form lead events
- `contact_form_submit` on successful native contact-form submission
- `booking_form_submit` on successful native appointment-form submission

## Attribution captured client-side

A lightweight localStorage attribution layer now preserves both first-touch and last-touch context for:
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `gclid`
- landing page
- referrer
- timestamp

Additional submission context is also attached when available:
- submission page path
- submission page URL
- submission form identifier
- submission type

## Where attribution is passed
- GA4 event payloads are enriched with first-touch and last-touch context
- Typeform hidden fields are populated with attribution values when the embedded widget is created
- native `/api/contact` submissions persist attribution in the stored lead record
- native `/api/appointments` submissions persist attribution in the stored lead record

## Manual GA4 / Google Ads tasks still required

### GA4
Mark these as key events after verifying volume and data quality:
- `phone_click`
- `schedule_cta_click`
- `booking_form_start`
- `booking_form_submit`
- `contact_form_submit`

Also verify:
- Google Ads linking
- internal traffic filters
- referral exclusions
- enhanced measurement deduplication
- conversion reporting for booking and contact paths

### Google Ads
Recommended import priority:
1. `booking_form_submit`
2. `contact_form_submit`
3. `phone_click` only as a secondary conversion unless real call tracking is added

## Recommended next steps outside code
- Add call tracking if phone calls are a primary lead source, ideally CallRail or an equivalent dynamic number insertion setup
- Implement offline conversion imports for qualified lead, appointment scheduled, completed visit, and treatment acceptance if the practice workflow can export those states reliably

## Privacy / logging note
API request logging was tightened so JSON response bodies are no longer written to logs for `/api/*` routes.
