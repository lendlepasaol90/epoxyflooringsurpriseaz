# Epoxy Flooring Surprise AZ

Website for Epoxy Flooring Surprise AZ (epoxyflooringsurpriseaz.com), a floor coating contractor in Surprise, AZ.

Static HTML, no build step. Preview locally with `python3 -m http.server` from this folder and open http://localhost:8000 (opening the files directly won't resolve the root paths).

## Design
Industrial red, graphite black and white theme (same on every device): safety red `#D21F26` on white, graphite black bands (`#2A2C30`), chamfered corners, hazard-stripe dividers. Fonts are Barlow Condensed (headings), Barlow (body) and IBM Plex Mono (labels) from Google Fonts. All styles are in `assets/site.css` and all behavior in `assets/site.js`, shared by every page.

## Logo & favicon
- `assets/logo.png` / `logo.webp`: red and black logo, white background removed. Shown on a white plate in the footer and mobile menu
- Favicons come from the square logo on a white rounded tile: `assets/favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` and `site.webmanifest`
- Icons in the UI are from Lucide (ISC license)

## Design system
Built and audited with the UI/UX Pro Max skill. The source of truth is `design-system/epoxy-flooring-surprise-az/MASTER.md`, with page overrides in `pages/home.md` and `pages/service.md`. It lists every color token with its contrast ratio, the type scale, components and the pre-delivery checklist the site passes.

## Pages
- `index.html` (home)
- Nine service pages, each in its own folder so URLs have no `.html` (e.g. `garage-floor-coatings/index.html` is served at `/garage-floor-coatings/`), linked from the Services dropdown
- Links and assets use root paths (`/assets/...`), so serve the site from the domain root (Cloudflare Pages, Netlify, GitHub Pages with a custom domain, etc.)

## To add / update before launch
- **Phone and email** are placeholders: (623) 555-0172 and info@epoxyflooringsurpriseaz.com
- **Trust strip:** add license number, insurance and warranty items once confirmed by adding an `<li>` to the `.trust` list near the top of each page. Real customer reviews would complete the skill's "social proof before CTA" recommendation.
- **Forms** (hero quote form and estimate form) are front-end only with validation; connect them to a form service before launch
- Photos in `assets/photos` are from the same Envato Elements set used on the other sites (Lifetime Commercial License, account: Danny)

## Motion
Entrance animation on the hero, count-up stats, staggered reveals, process timeline, ticker band, button gloss sweep, flake broadcast animation and a scroll-progress bar. All motion turns off automatically for visitors who enable "reduce motion" in their device settings.

## Interactive features
- Coating picker (space + priority → suggested system)
- Flake blend preview (canvas, six blends, three chip sizes)
- Gallery lightbox with keyboard support, FAQ accordions, copy-to-clipboard contact buttons, mobile call bar

## SEO
- Keyword-named photos served as WebP with JPG fallback at 800px and 1600px (`srcset`), with alt text, width/height and lazy loading
- Each page has a unique title, meta description, canonical, Open Graph tags and JSON-LD (HomeAndConstructionBusiness + FAQPage on home; Service, BreadcrumbList, FAQPage and ImageGallery on service pages)
- `sitemap.xml` (with image entries), `robots.txt` and `_redirects` are at the root
