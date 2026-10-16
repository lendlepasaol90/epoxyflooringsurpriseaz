# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/epoxy-flooring-surprise-az/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Epoxy Flooring Surprise AZ
**Generated with:** UI/UX Pro Max (`--design-system --persist`), then refined to the implemented site
**Category:** Home Services / local contractor
**Implementation:** `assets/site.css` (tokens on `:root`) and `assets/site.js`

---

## Skill recommendation → what we shipped

| Area | UI/UX Pro Max recommended | Implemented | Why |
|------|---------------------------|-------------|-----|
| Style | Flat Design | Flat, industrial spec-sheet: no soft shadows or gradients on UI, hard 2px borders, chamfered corners, hazard stripes | "Industrial" brief from the client |
| Pattern | Conversion-Optimized + Trust, CTA above fold | Quote form in hero, trust strip under hero, mobile call bar, estimate form at end of every page | Matches pattern |
| Primary | `#DC2626` red | `#D21F26` safety red (5.3:1 on white) | Passes 4.5:1 for white button text |
| Typography | Clash Display / Satoshi (Outfit / Rubik on Google) | Barlow Condensed / Barlow / IBM Plex Mono | Skill's `typography` search for "industrial bold condensed" returned Barlow Condensed + Barlow |
| Effects | Simple color/opacity hovers, 150–200ms | 150–200ms color, border and offset-shadow hovers; no movement on hover | "Stable hover states" rule |

---

## Color Tokens

| Role | Hex | CSS Variable | Contrast |
|------|-----|--------------|----------|
| Primary / CTA | `#D21F26` | `--red` | White text 5.3:1 |
| Primary hover / red text | `#A8141B` | `--red-dark` | 7.6:1 on white |
| Deep red | `#7A0E13` | `--red-ink` | |
| Error tint | `#FCECEC` | `--red-tint` | |
| Background | `#FFFFFF` | `--white` | |
| Section gray | `#F2F2F0` | `--concrete` | |
| Dark sections (graphite black) | `#2A2C30` | `--char` | White text 14:1, `#B8BDC3` 7.4:1 |
| Body text | `#151719` | `--ink` | 18:1 on white |
| Muted text | `#565A5F` | `--muted` | 6.9:1 on white |
| Borders | `#D9D9D4` / `#151719` | `--line` / `--ink` | |
| Red on graphite | `#FF3B42` | `--red-bright` | 4:1 on `--char`; hero H1 accent, step numbers, icons on dark |

Rule: red text or icons on `--char` use `--red-bright`, never `--red` or `--red-dark`. Buttons keep `--red` with white text.

### Theme

Light theme only (red, graphite black, white) on every device, by client choice. No automatic dark mode. Never hard-code `#fff` as a surface; use `--surface`.

## Logo & icons

- Logo: `assets/logo.png` / `.webp`, red and black wide lockup, 70px tall in the header (52px on phones)
- On graphite (footer, mobile menu) the logo sits on a white chamfered plate (`.brand-plate`) so the black lettering stays readable
- Favicons: square logo on a white rounded tile: `favicon.ico` (16/32/48), `favicon-32.png`, `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png` via `site.webmanifest`
- UI icons: official Lucide set (ISC license), inline SVG, 24×24 viewBox

## Typography

- **Headings:** Barlow Condensed 700/800, uppercase, line-height .9–1.05
- **Body:** Barlow 400–600, 17.5px desktop / 17px mobile, line-height 1.62
- **Labels:** IBM Plex Mono 500, uppercase, tracked .1em+, min 13px on mobile
- **Line length:** paragraphs capped at 54ch (≈ 70–75 characters, because Barlow is narrow)
- Google Fonts loaded with `display=swap`

## Spacing & Layout

- Container: `--wrap` 1240px, gutter `clamp(16px,4vw,40px)`
- Section padding: `clamp(64px,9vw,120px)`
- Breakpoints: 1180 (nav collapses), 980 (single column), 640 (phone)
- Grid children use `min-width:0` so long strings never force horizontal scroll
- Z-index scale: bar 30, nav 40, mobile menu 50, lightbox 60

## Components

- **Buttons:** min-height 52px, chamfered `clip-path`, red fill / ink outline ghost; hover darkens color, arrow nudges 3px
- **Cards (`.svc`):** 2px ink border; hover/focus = red border + 6px red offset shadow, no translate
- **Inputs:** 48px min height, 1.5px border, focus = 3px red outline + ink border, error = red border + tint + text message linked via `aria-describedby`
- **Forms:** hero form 3 fields (name, phone, project); validate on blur and submit; button shows spinner + "Sending…" then a success panel with `role="status"`
- **Dialogs (lightbox, mobile menu):** Escape closes, focus moves in and returns, Tab is trapped inside
- **Icons:** official Lucide icons, inline SVG, 24×24 viewBox, 1.8 stroke. No emojis.

## Motion

All motion uses transform/opacity, ease-out curves, and is disabled under `prefers-reduced-motion: reduce`.

| Element | Motion | Timing |
|---------|--------|--------|
| Hero | Photo push-in; tag, H1, lede, chips, buttons rise in sequence; red H1 line wipes in; form slides from right | 0.05–0.8s stagger, once |
| Hazard stripe under hero | Slow drift like caution tape | 2.4s loop |
| Stats | Count up when 60% visible | 1.1s, ease-out cubic |
| Card grids, steps, trust strip | Children reveal one after another | 70ms stagger, 0.55s each |
| Process | Red line draws across, step markers pop | 1.4s line, 180ms per marker |
| Ticker (home) | Red band of process words scrolls; pauses on hover | 38s loop |
| Buttons | Gloss sweep on hover | 0.6s |
| Service photos | 1.05 zoom inside frame on hover (no layout shift) | 0.5s |
| FAQ, picker result | Content rises in when opened/changed | 0.3s |
| Flake preview | Chips land in random order on blend change | 0.65s |
| Header | Red scroll-progress bar | scroll-linked |

A scroll sweep reveals anything already passed, so fast jumps never leave content hidden.

---

## Anti-Patterns (Do NOT Use)

- ❌ Hidden contact info (phone is in the top bar, nav, estimate block, footer and mobile call bar)
- ❌ No trust markers (trust strip on every page; add license/insurance/warranty when confirmed)
- ❌ Emojis as icons
- ❌ Missing cursor:pointer on clickable elements
- ❌ Hover effects that move or scale layout
- ❌ Text under 4.5:1 contrast
- ❌ Removing focus outlines without a replacement
- ❌ Placeholder-only inputs, or no feedback after submit

---

## Pre-Delivery Checklist (last audit: all 10 pages at 375 / 768 / 1024 / 1440)

- [x] No emojis used as icons
- [x] Consistent icon set (Lucide)
- [x] Light theme forced on all devices (dark-mode devices tested)
- [x] `cursor: pointer` on all clickable elements
- [x] Hover transitions 150–300ms, no layout shift
- [x] Text contrast ≥ 4.5:1 (≥ 3:1 for large text)
- [x] Visible focus states, including form fields
- [x] Touch targets ≥ 44×44px on mobile
- [x] `prefers-reduced-motion` respected
- [x] No horizontal scroll at any breakpoint
- [x] No content hidden behind the sticky nav (`scroll-margin-top` on sections)
- [x] All images have alt text and width/height; below-fold images lazy-loaded
- [x] All inputs have `<label for>`
- [x] Color is not the only error indicator (text messages)
