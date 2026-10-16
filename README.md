# Epoxy Flooring Surprise AZ

Website for Epoxy Flooring Surprise AZ (epoxyflooringsurpriseaz.com), a floor coating contractor in Surprise, AZ.

Static HTML, no build step. Preview locally with `python3 -m http.server` from this folder and open http://localhost:8000 (opening the files directly won't resolve the root paths).

## Design
Industrial red and white theme: safety red `#D21F26` on white, charcoal bands, chamfered corners, hazard-stripe dividers. Fonts are Barlow Condensed (headings), Barlow (body) and IBM Plex Mono (labels) from Google Fonts. All styles are in `assets/site.css` and all behavior in `assets/site.js`, shared by every page.

## Pages
- `index.html` (home)
- Nine service pages, each in its own folder so URLs have no `.html` (e.g. `garage-floor-coatings/index.html` is served at `/garage-floor-coatings/`), linked from the Services dropdown
- Links and assets use root paths (`/assets/...`), so serve the site from the domain root (Cloudflare Pages, Netlify, GitHub Pages with a custom domain, etc.)

## To add / update before launch
- **Logo:** the header and footer show a red "S" mark with text. Replace the `.brand` link contents with `<img src="/assets/logo.png" alt="Epoxy Flooring Surprise AZ" height="48">` on each page.
- **Favicon:** pages already link `/assets/favicon.ico`, `/assets/favicon-32.png` and `/assets/apple-touch-icon.png`. Drop those three files into `assets/`.
- **Phone and email** are placeholders: (623) 555-0172 and info@epoxyflooringsurpriseaz.com
- **Forms** (hero quote form and estimate form) are front-end only with validation; connect them to a form service before launch
- Photos in `assets/photos` are from the same Envato Elements set used on the other sites (Lifetime Commercial License, account: Danny)

## Interactive features
- Coating picker (space + priority → suggested system)
- Flake blend preview (canvas, six blends, three chip sizes)
- Gallery lightbox with keyboard support, FAQ accordions, copy-to-clipboard contact buttons, mobile call bar

## SEO
- Keyword-named photos served as WebP with JPG fallback at 800px and 1600px (`srcset`), with alt text, width/height and lazy loading
- Each page has a unique title, meta description, canonical, Open Graph tags and JSON-LD (HomeAndConstructionBusiness + FAQPage on home; Service, BreadcrumbList, FAQPage and ImageGallery on service pages)
- `sitemap.xml` (with image entries), `robots.txt` and `_redirects` are at the root
