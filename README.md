# RaeAligned Strategic Services — website

Static site for RaeAligned Strategic Services (Raleigh–Durham, NC). Plain HTML, CSS and JavaScript, with no build step.

## Structure

```
index.html      Landing page (monogram, tagline, highlight icons)
home.html       Main site: About, Services, Approach, Notary, Testimonials, Booking, Contact
css/styles.css  All styles and brand color tokens (top of file)
js/main.js      Mobile menu + contact form submission
images/         Put the headshot, logo and testimonial photos here
favicon.svg     Browser tab icon
netlify.toml    Netlify settings
```

## Deploy on Netlify

1. In Netlify, choose **Add new site → Import an existing project → GitHub** and pick `rae-aligned-site`.
2. Leave the build command empty and set the publish directory to `.` (already set in `netlify.toml`).
3. Deploy.

## Contact form

The form uses **Netlify Forms**, so it works once deployed with no extra code.

- Submissions appear in Netlify under **Site → Forms → contact**.
- To get them by email: **Site configuration → Notifications → Emails and webhooks → Form submission notifications**, and add info@raealignedservices.com.
- Spam protection uses a hidden honeypot field.

## Still to replace

| What | Where |
| --- | --- |
| Headshot | `home.html`, the `.portrait .ph` block in `#about`. Add `images/raven.jpg` and swap the placeholder for `<img src="images/raven.jpg" alt="Raven, founder of RaeAligned">` |
| Testimonials | `home.html`, `#testimonials`, three `.quote` blocks |
| Facebook link | `home.html` footer, "Facebook (link to add)" |
| Service copy | `home.html`, `#services` and `#about`: review the drafted descriptions |

## Brand

Colors are defined once at the top of `css/styles.css` (ink `#1F1D2B`, cream `#F2EEE8`, lavender `#8781B5`, plum `#46344F`, mauve `#958F9B`, orchid `#A563A0`). Fonts: Playfair Display (headings) and Montserrat (body), from Google Fonts.

Booking button links to the Google Calendar appointment page in `home.html` `#book`.
