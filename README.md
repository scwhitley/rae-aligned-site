# RaeAligned Strategic Services: website

Six-page site for raealignedservices.com, built to the October 2026 developer brief and addendum.
Built with [Eleventy](https://www.11ty.dev/) (a static site generator) and hosted on Netlify.
Every push to `main` rebuilds and republishes the site automatically.

## Pages

| URL | File |
| --- | --- |
| `/` Home | `src/index.njk` |
| `/about/` | `src/about.njk` |
| `/services/` | `src/services.njk` |
| `/notary/` Signing Solutions | `src/notary.njk` |
| `/contact/` | `src/contact.njk` |
| `/privacy/` (awaiting final text) | `src/privacy.njk` |
| `/thanks/`, `/404.html` | form confirmation and not-found page |

## Everyday edits (no code needed)

Edit these files on GitHub (pencil icon → Commit). The site updates in about a minute.

| What | File |
| --- | --- |
| Footer legal line, emails, booking links, on/off switches | `src/_data/site.json` |
| The six service descriptions | `src/_data/services.json` |
| Cities served | `src/_data/areas.json` |
| Notary FAQs | `src/_data/faqs.json` |
| Testimonials (real ones only) | `src/_data/testimonialsData.json`, then set `features.testimonials` to `true` |

### When the LLC is approved

In `src/_data/site.json`:
1. Set `"llcApproved": true` (turns on the division endorsement line in the footer).
2. Change `"legalLine"` to `© 2026 RaeAligned Strategic Services LLC. All rights reserved.`

Do not use `HOLD-raealigned-legal-footer-LLC.svg` until then. It is deliberately not in this repo.

### Booking

All booking buttons use one component (`booking` in `src/_includes/partials/components.njk`).
Set the tool in `site.json → booking`:
- `consulting`: Google Appointment Schedules (live).
- `notary`: Square Appointments. **The URL is empty until the Square page exists.** Until then, "Book an appointment" goes to the notary request form.
- `mode: "embed"` shows the scheduler inside the page instead of linking out.

## Forms

Netlify Forms handles both forms with a honeypot for spam protection:
- `contact`: general inquiries.
- `notary-request`: requires the signing address, document type, number of signatures and signers, the photo-ID confirmation, and the **travel-fee agreement checkbox** (North Carolina requires written agreement before travel).

In Netlify, go to **Site configuration → Notifications → Form submission notifications**. Send `contact` to info@ and `notary-request` to notary@.

## Photography (shoot booked)

The hero, About and notary layouts reserve photo slots at 4:5 (`photoSlot` component).
To add a photo, export `name.webp` and `name.jpg` into `src/assets/img/`, then pass `src="/assets/img/name"` and `alt` to the `photoSlot` call on that page.
The 400px headshot is used only at 200px in "Meet Raven", per the brief.

## Brand rules enforced in code

- Locked palette and contrast notes are at the top of `src/assets/css/styles.css`.
- Copper accent on umbrella pages and orchid only on `/notary/` (set by `accent:` in each page's front matter).
- Fonts are self-hosted woff2 (Playfair Display, Montserrat). Logos are the supplied outlined SVGs and are never re-typeset.

## Local development

```
npm install
npm start      # http://localhost:8080
```

## Phase two (structure is ready)

- Blog: posts go in `src/blog/posts/*.md`. Set `features.blog` to `true` to publish `/blog/`.
- Analytics: add the Plausible domain in `site.json → analytics`.
- A browser editor for Raven (Decap CMS) could sit on top of the same data files.
