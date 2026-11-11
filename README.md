# AS Groups — website

The website for AS Groups, Management & Business Consultant, Chennai. It is a plain HTML, CSS and JavaScript site with no build step, so it is cheap to host and anyone can edit it.

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| Business Setup & Growth | `business-setup.html` |
| Digital Marketing & Brand Growth | `digital-marketing.html` |
| Hospitality & Healthcare | `hospitality-healthcare.html` |
| Projects | `projects.html` |
| About | `about.html` |
| Careers | `careers.html` |
| Contact (with all reviews) | `contact.html` |
| Privacy note | `privacy.html` |

## Where do I change X?

| To change… | Edit | Notes |
|---|---|---|
| Phone numbers, WhatsApp number, email, reply time | `js/content.js` → `contact` | Used by the header, footer, pop-up and floating buttons. The contact page also has them written in. |
| LinkedIn / Instagram links | `js/content.js` → `social` | Also on `about.html`, `contact.html` and the founder section of `index.html`. |
| The counters (4+ set up, 2 in progress…) | `js/content.js` → `numbers` | They count up when scrolled into view. |
| Vertical cards and their Live / In progress counts | `js/content.js` → `verticals` | Use `null` for an unknown count; it shows `[00]`. |
| Add or edit a project | `js/content.js` → `projects` | It appears on the homepage, the Projects page and its vertical page. |
| Client videos | `js/content.js` → `stories` | Put the video link in `video`. |
| Text reviews | `js/content.js` → `reviews` | Two show at a time and rotate. |
| Reasons in the "Talk to us" pop-up | `js/content.js` → `reasons` | |
| Colours, fonts, spacing | `css/styles.css` → section 1 (`:root`) | |
| Animations | `css/styles.css` → section 4 | Everything stops for visitors who switch off motion on their device. |
| Phone layout | `css/styles.css` → section 5 | |
| Header menu items | `js/main.js` → `NAV` | |
| Footer | `js/main.js` → "shared footer" | |
| Page wording | That page's `.html` file | |
| Photos | `assets/img/` | Keep the same file name, or update the `src` in the page. Use `.webp`, about 1600px wide. |

Anything in `[square brackets]` is a placeholder still to be confirmed. It shows on the site in gold so it is easy to spot.

## How the enquiry form works

The "Talk to us" pop-up opens WhatsApp with the visitor's message filled in, addressed to the business number. Nothing is stored on the website. A later version can send it automatically through the WhatsApp Cloud API, in the same way as the Neev Careers site.

## Run it locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Put it live on Vercel

1. Push this folder to a GitHub repo.
2. In Vercel, choose **Add New → Project**, import the repo, keep **Framework: Other** and leave the build settings empty, then click **Deploy**.
3. Add the domain under **Settings → Domains**.

`vercel.json` turns on clean URLs (`/about` instead of `/about.html`) and sets caching for images.
