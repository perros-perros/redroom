# Build Prompt - Redroom single-page landing site

You are building a **single-page marketing website** for **Redroom**, a Stockholm-based full-service contractor specializing in carpentry, construction, and interior design. They cover every branch of the skilled trades: carpentry, electrical, plumbing/HVAC, painting, design, interior styling, and technical installations.

The reference for **layout, rhythm, and editorial feel** is `https://watchhouse.com/` - a quiet, image-led, full-bleed marketing site that lets photography and confident typography do the work. Match that _structure and pacing_, **but do not reproduce its content, branding, or navigation**. Redroom's visual language comes from the attached design system (burgundy + bone + Montserrat), not from WatchHouse's coffee aesthetic.

**No site-wide navigation.** No top nav bar, no menu, no nav links. The page is meant to scroll start-to-finish. The only nav-like element allowed is the Redroom wordmark in the top-left of the hero, and a small footer link group.

---

## 1. Stack & setup

- **Next.js 14+** (App Router), TypeScript, single page at `app/page.tsx`.
- **Tailwind CSS** configured with the custom theme below - no external UI libraries (no shadcn, no Radix, no Headless UI). Build components by hand with Tailwind.
- **Montserrat** via `next/font/google`, weights `300, 400, 500, 600, 700, 800, 900` plus italic `300, 400`.
- **Light + dark mode** with `darkMode: 'class'`. Default to dark; respect OS preference on first load. Provide a small theme toggle pinned to the top-right corner of the viewport (fixed position, not in a nav bar).
- **Images**: use `next/image` with placeholder paths (`/images/hero.jpg`, `/images/project-01.jpg`, etc.). Use Unsplash construction/interior photography URLs as fillers if you must - high-end interior shots, raw construction in progress, craftsmanship close-ups (hands, wood, tools, brass fixtures, plaster). Avoid stock-cliché smiling-team shots.
- **No JS-heavy animations libraries.** Use CSS transitions and a single small intersection-observer hook for reveal-on-scroll if needed.
- Place the supplied `redroom-wordmark.svg` and `r-mark.svg` in `/public/brand/` and import them as React components or via `next/image` with `unoptimized`.

---

## 2. Brand assets (provided)

- `redroom-wordmark.svg` - full "redroom" wordmark, 337×48 viewBox, paths fill white by default. Use `fill-burgundy-600 dark:fill-bone-50` to color it via CSS (the SVG paths use `fill="white"` originally - strip `fill="white"` from the paths or wrap with `[&_path]:fill-current` so Tailwind classes work).
- `r-mark.svg` - the standalone R monogram (notched square), 48×48. Use as a favicon and as a quiet visual accent in section breaks.

---

## 3. Tailwind theme - copy this exactly into `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      colors: {
        burgundy: {
          50: "#FBF0F1",
          100: "#F4D6D9",
          200: "#E5A4AB",
          300: "#D2727C",
          400: "#B84954",
          500: "#9A2D38",
          600: "#7B1F2B", // primary
          700: "#631823",
          800: "#4A121B",
          900: "#320C12",
          950: "#1C060A",
        },
        bone: {
          50: "#FAF7F2", // light bg
          100: "#F2EDE4",
          200: "#E4DCCD",
          300: "#C9BCA3",
        },
        ink: {
          400: "#807870",
          500: "#5A544D",
          700: "#2B2823",
          800: "#1A1815",
          900: "#0F0E0C", // dark bg
        },
      },
      fontSize: {
        caption: ["0.75rem", { lineHeight: "1", letterSpacing: "0.18em" }],
        small: ["0.875rem", { lineHeight: "1.5" }],
        body: ["1rem", { lineHeight: "1.55" }],
        "body-lg": ["1.125rem", { lineHeight: "1.5" }],
        h5: ["1.375rem", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        h4: ["1.75rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        h3: ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        h2: ["3rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        h1: ["4.25rem", { lineHeight: "0.95", letterSpacing: "-0.04em" }],
        display: ["6rem", { lineHeight: "0.95", letterSpacing: "-0.045em" }],
      },
      letterSpacing: {
        editorial: "0.18em",
        label: "0.22em",
      },
      boxShadow: {
        burgundy: "0 18px 48px -12px rgba(123, 31, 43, 0.45)",
        "burgundy-lg": "0 24px 60px -12px rgba(154, 45, 56, 0.55)",
      },
      borderRadius: {
        pill: "9999px",
      },
    },
  },
} satisfies Config;
```

### Global CSS (`app/globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: light dark;
}

html,
body {
  height: 100%;
}

body {
  background: #faf7f2; /* bone-50 */
  color: #0f0e0c; /* ink-900 */
  font-family: var(--font-montserrat), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition:
    background-color 0.5s ease-out,
    color 0.5s ease-out;
}
html.dark body {
  background: #0f0e0c;
  color: #faf7f2;
}

::selection {
  background: #7b1f2b;
  color: #faf7f2;
}

/* Film-grain overlay - subtle on light, slightly stronger on dark */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  opacity: 0.03;
  mix-blend-mode: multiply;
  transition:
    opacity 0.5s ease-out,
    mix-blend-mode 0.5s;
}
html.dark body::before {
  opacity: 0.05;
  mix-blend-mode: overlay;
}

/* Reveal-on-scroll */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.9s cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 0.9s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.reveal.is-visible {
  opacity: 1;
  transform: none;
}

/* Editorial label - small uppercase label with leading rule */
.label {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 0.75rem;
  line-height: 1;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  font-weight: 500;
  color: #7b1f2b;
}
html.dark .label {
  color: #b84954;
}
.label::before {
  content: "";
  display: block;
  width: 28px;
  height: 1px;
  background: currentColor;
}

/* Hero / display titles */
.hero-title {
  font-size: clamp(4.5rem, 13vw, 11rem);
  line-height: 0.92;
  letter-spacing: -0.045em;
  font-weight: 700;
}
.section-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 0.95;
  letter-spacing: -0.04em;
  font-weight: 600;
}

/* Button base */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  border-radius: 9999px;
  white-space: nowrap;
  cursor: pointer;
  border: 0;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.btn:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px #faf7f2,
    0 0 0 4px #d2727c;
}
html.dark .btn:focus-visible {
  box-shadow:
    0 0 0 2px #0f0e0c,
    0 0 0 4px #d2727c;
}
.btn-sm {
  padding: 8px 16px;
  font-size: 0.75rem;
  line-height: 1;
  letter-spacing: 0.18em;
}
.btn-md {
  padding: 12px 24px;
  font-size: 0.875rem;
  line-height: 1.5;
}
.btn-lg {
  padding: 16px 32px;
  font-size: 1.125rem;
  line-height: 1.5;
}
.btn-primary {
  background: #7b1f2b;
  color: #faf7f2;
}
.btn-primary:hover {
  background: #9a2d38;
  transform: translateY(-1px);
}
.btn-secondary {
  background: transparent;
  color: #0f0e0c;
  box-shadow: inset 0 0 0 1px rgba(15, 14, 12, 0.2);
}
.btn-secondary:hover {
  background: #0f0e0c;
  color: #faf7f2;
  box-shadow: inset 0 0 0 1px #0f0e0c;
}
html.dark .btn-secondary {
  color: #faf7f2;
  box-shadow: inset 0 0 0 1px rgba(250, 247, 242, 0.2);
}
html.dark .btn-secondary:hover {
  background: #faf7f2;
  color: #0f0e0c;
}
.btn-ghost {
  background: transparent;
  color: #5a544d;
}
.btn-ghost:hover {
  color: #0f0e0c;
}
html.dark .btn-ghost {
  color: rgba(250, 247, 242, 0.55);
}
html.dark .btn-ghost:hover {
  color: #faf7f2;
}

/* Animated arrow inside buttons */
.btn .arrow {
  transition: transform 0.4s ease-out;
}
.btn:hover .arrow {
  transform: translateX(3px);
}
```

---

## 4. Page structure (top to bottom)

The page lives entirely in `app/page.tsx`, composed of section components in `/components`. **No persistent navigation.** Sections are separated by thin horizontal rules (`border-t border-ink-900/10 dark:border-bone-50/10`) and generous vertical padding (`py-32` desktop, `py-20` mobile).

Container: `max-w-[1440px] mx-auto px-6 sm:px-12`. Most sections sit inside this. Two sections (hero photo, full-bleed image bands) break out edge-to-edge.

### Section 1 - Hero (full viewport, image background)

- Full-bleed background image: a beautiful dim interior shot or a craftsperson at work, treated with a dark gradient overlay (`from-ink-900/80 via-ink-900/40 to-ink-900/90` in dark mode; lighter in light mode using bone tones).
- Top-left, absolute-positioned: the **redroom wordmark** in `bone-50` (or `burgundy-600` in light mode) at `h-7 w-auto`. Top-right: tiny editorial caption `STOCKHOLM` and the theme toggle.
- Centered or bottom-left content block:
  - Editorial label: `(01) - Full-service contractor`
  - Hero title (use `.hero-title` class):
    > "Built in **Stockholm.**<br />Finished with _intent._"
    >
    > - the word **Stockholm** and _intent_ are styled with `font-light italic text-burgundy-400` for the italic accents, à la the design system.
  - Lede paragraph (`text-body-lg max-w-xl text-bone-50/75`): "Redroom is a full-service contractor working across carpentry, construction, and interior design. From structure to surface, we cover every trade - and answer for the result."
  - Two buttons: primary `Start a project →` and ghost `See our work`.
- Use `.reveal` with staggered delays (`d1`, `d2`, `d3` - copy the pattern from the design system: 0.1s / 0.25s / 0.4s).

### Section 2 - Editorial intro / mission

- White space heavy. No image.
- Left column (1/3): label `(02) - Approach` + small heading `One firm, every trade.`
- Right column (2/3): a single large paragraph in `.section-title` style (`clamp(2rem, 4vw, 3rem)`, weight 500, tight tracking) with key phrases italicized in `burgundy-600 dark:burgundy-300`:
  > "We design and build _environments where craft is visible_ - homes, shops, restaurants, and offices across Stockholm. Carpentry, electrical, plumbing, HVAC, painting, interior styling, technical installations: handled in-house, sequenced cleanly, _finished without compromise._"

### Section 3 - Services grid (the heart of the page)

- Label: `(03) - Services`
- Heading: `Every branch of the trade.`
- Sub: `From rough-in to final styling - a single point of responsibility, eight disciplines under one roof.`
- Grid of **8 service cards** in a `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-900/10 dark:bg-bone-50/10` pattern (the gap-px trick creates hairline dividers between cards). Each card: `bg-bone-50 dark:bg-ink-900` (matches body bg, so the border-only effect reads cleanly), `p-8 md:p-10`, hover state lifts background to `bone-100`/`ink-800`.
- Each card contains:
  - A two-digit number top-left in `text-caption tracking-label text-burgundy-600` (`01`, `02`, …)
  - A simple line-icon SVG (24×24, stroke 1.5, `currentColor`) - pick from: hammer/saw, brick/wall, lightning bolt, water droplet, paint roller, ruler/triangle, sofa, gear/tool. Inline the SVGs.
  - Service name (`text-h5 font-semibold tracking-tight`) and one-line description (`text-small text-ink-500 dark:text-bone-50/55`).
- Services in order:
  1. **Carpentry.** - Bespoke joinery, framing, finish work.
  2. **Construction.** - Renovations, builds, structural changes.
  3. **Electrical.** - Wiring, lighting, certified installations.
  4. **Plumbing & HVAC.** - Water, heating, ventilation, climate.
  5. **Painting.** - Surface prep, finishes, specialty coatings.
  6. **Design.** - Spatial planning, drawings, material selection.
  7. **Interior styling.** - Furnishing, soft goods, final dressing.
  8. **Technical installations.** - AV, smart home, networking.

### Section 4 - Full-bleed image band #1

- Edge-to-edge image, ~70vh tall, of a finished interior detail (a kitchen, a staircase, a tiled bathroom - luxe but warm).
- Overlaid bottom-left: editorial caption `(04) - Selected work` and a single line `Project N° 014 - Östermalm Apartment, 2025`.

### Section 5 - Selected projects (3-up)

- Label `(05) - Recent`, heading `A few we're proud of.`
- 3 project cards in a grid. Each card:
  - Aspect-ratio 4/5 image area with a subtle inner ring (`ring-1 ring-ink-900/10 dark:ring-bone-50/10 rounded-3xl overflow-hidden`).
  - Below the image: project name (`text-body-lg font-medium`), location & type in caption style (`(SE) · Residential`), and a small round secondary button with an external-arrow icon (use the design system's `M3 11L11 3M5 3h6v6` SVG path).
- Sample projects: `Östermalm Apartment` / `Residential`, `Söder Workshop Café` / `Hospitality`, `Vasastan Townhouse` / `Residential`.
- Below the grid, right-aligned: ghost button `View all projects →`.

### Section 6 - Process (the differentiator)

- Two-column layout on desktop. Left: heading and copy. Right: numbered list.
- Label `(06) - Process`. Heading: `One contract. One number to call.`
- Lede: `Most projects fail at the seams between trades. We don't have seams - every discipline reports through one project lead, on one schedule, against one budget.`
- Right column: a numbered ordered list, four items, each with:
  - A two-digit number in burgundy editorial caption style.
  - A short title (`text-h5`) and a one-sentence description (`text-small text-ink-500`).
- Items:
  1. **Brief.** - We listen, walk the site, and ask the questions that surface the real budget and timeline.
  2. **Design.** - Drawings, material samples, and a fixed price before a tool comes out.
  3. **Build.** - Trades sequenced and supervised by your project lead, daily on-site.
  4. **Hand-over.** - Walkthrough, snag list, warranty - and we stay reachable.

### Section 7 - Demo/pull-quote panel (lift directly from design system)

Mirror the design system's "(In Use)" demo block - a rounded burgundy-tinted panel with a soft radial gradient glow, an editorial label, a large italic-accented headline, body text, and two CTAs:

- Container: `relative overflow-hidden rounded-3xl bg-bone-100 dark:bg-[#16140F] ring-1 ring-ink-900/10 dark:ring-bone-50/10 px-12 py-24`
- Absolute glow div: top-right, `w-[600px] h-[600px] rounded-full opacity-50 blur-2xl pointer-events-none` with `background: radial-gradient(circle, #631823, transparent 65%)`.
- Editorial micro-label: `Stockholm · SE - Est. 20XX`
- Title (`.section-title`):
  > "We build _environments_ - where every trade is _answerable._"
- Body (`text-body-lg max-w-xl text-ink-500 dark:text-bone-50/55`): "A senior-led practice working across residential, retail, and hospitality - from one-room renovations to full fit-outs."
- CTAs: primary `Start a project →` + ghost `Or read our process →`.

### Section 8 - Full-bleed image band #2

- A second edge-to-edge image - this one a craftsmanship close-up (hands working wood, a brass detail, plaster being smoothed). Slightly shorter than the first band, ~50vh.
- No overlay text. Just the image, breathing.

### Section 9 - Contact / inquiry form

- Two-column on desktop, single column on mobile.
- **Left column**: large heading `Tell us about your project.` (`.section-title`), lede `We respond within two working days. For urgent jobs, call directly.`, and a stack of contact lines in caption style:
  - `hello@redroom.se`
  - `+46 8 000 00 00`
  - `Stockholm · SE`
- **Right column** (sits inside a `.card` style block - `bg-bone-100 dark:bg-[#16140F] ring-1 ring-ink-900/10 dark:ring-bone-50/10 rounded-3xl p-10`): the form, using the design-system field style (no boxes - just bottom-borders that turn burgundy on focus).
  - Fields: Name, Email, Project type (select: Residential / Commercial / Hospitality / Other), Message (textarea, 4 rows).
  - Submit: `btn btn-primary btn-lg` with arrow → label `Send enquiry`.
  - Important: do **not** wrap in a `<form>` if this is to render as a static artifact; for the real Next.js build, use a server action or a simple POST handler stub with `'use client'` and `useState` for controlled inputs. State is up to you - show a "Thanks, we'll be in touch" success state on submit.

### Section 10 - Footer (minimal, no nav)

Echo the design system's footer but trimmed:

- Top row, grid of 2 cols on mobile / 4 on desktop:
  - **Col 1 (spans 2 on desktop)**: A large statement in `text-h3 leading-tight tracking-tight font-medium max-w-md`:
    > "A full-service contractor for buildings that should _outlast_ their brief."
    >
    > - _outlast_ in italic burgundy.
  - **Col 2 - Studio**: small caption header, then a list (small text, hover to ink-900/bone-50): `Stockholm`, `Established 20XX`, `Org.nr 000000-0000`.
  - **Col 3 - Contact**: `hello@redroom.se`, `+46 8 000 00 00`, `Mon–Fri 08:00–17:00`.
  - **Col 4 - Social**: `Instagram`, `LinkedIn` (text links - no icons needed).
- Bottom bar (separated by a top border): flex row, justify-between, caption-style text:
  - Left: `© 2026 Redroom AB`
  - Right: `Built in Stockholm · #7B1F2B`

---

## 5. Behaviour & micro-interactions

- **Reveal on scroll**: write a small `useReveal` hook that adds `is-visible` to elements with `.reveal` once they enter the viewport (IntersectionObserver, `threshold: 0.15`, `rootMargin: '0px 0px -10% 0px'`, unobserve after first trigger).
- **Theme toggle**: small fixed pill toggle, top-right, ~60×32px, with a knob that slides between sun and moon icons. Persist via `localStorage` keyed `redroom-theme`. Initial value: `localStorage` → fallback to `prefers-color-scheme: dark`. Apply `.dark` class on `<html>`. To prevent flash, run an inline blocking script in `app/layout.tsx`'s `<head>` that reads the preference and sets the class before paint.
- **Button hover**: arrow translates 3px right, button lifts 1px on primary. Already in the CSS above.
- **Cursor on cards**: subtle - no custom cursors. Just rely on the hover background change.
- **Smooth scroll**: enable globally with `html { scroll-behavior: smooth }` (only useful if any anchor links exist; OK to add).
- **Reduced motion**: wrap reveals in `@media (prefers-reduced-motion: reduce)` to disable transforms, leave opacity at 1.

---

## 6. Voice & copy rules

- **Confident, terse, low-adjective.** No "passion-driven solutions." No "we're a team of dreamers." Trade-credible, slightly editorial.
- **Use periods inside section labels and brand statements** (`Carpentry.`, `Construction.`) - it's a recurring micro-pattern in the brand.
- **Italic accents on key words** in headlines: usually one to three words per heading, in `burgundy-600 dark:burgundy-300 font-light italic`.
- **Numbered editorial markers** (`(01) -`, `N° 014`) appear in caption text throughout.
- All copy is in **English** even though the firm is Swedish - international clientele is implied. A single Swedish flourish is fine (e.g. `Stockholm · SE`, `Org.nr`).

---

## 7. Accessibility & performance

- Every image gets a meaningful `alt`. Decorative gradients use `aria-hidden`.
- Color contrast: burgundy-600 on bone-50 passes AA for body; for small text on dark backgrounds, prefer `bone-50/80` over `bone-50/55`.
- All buttons are real `<button>` or `<a>`. All form fields have associated `<label>`s.
- The theme toggle has `role="switch"` and `aria-checked`.
- Lighthouse target: 95+ across the board. Lazy-load all imagery below the fold; the hero image is `priority`.
- No layout shift: every image gets explicit `width`/`height` or fills a sized container.

---

## 8. File layout

```
app/
  layout.tsx              ← Montserrat via next/font, theme-init script in <head>, <body class="font-sans">
  page.tsx                ← composes all section components in order
  globals.css             ← the CSS above
components/
  ThemeToggle.tsx
  Hero.tsx
  Intro.tsx
  Services.tsx
  ImageBand.tsx           ← reused for sections 4 and 8 (props: src, alt, height, caption?)
  Projects.tsx
  Process.tsx
  Pullquote.tsx           ← the "demo" panel from section 7
  Contact.tsx
  Footer.tsx
hooks/
  useReveal.ts
public/
  brand/
    redroom-wordmark.svg
    r-mark.svg
  images/                 ← placeholder paths
tailwind.config.ts
```

---

## 9. What "done" looks like

- One single scrollable page. No header nav, no menu, no breadcrumbs. The wordmark is the only branding mark up top, and it doesn't link anywhere (it's `aria-label="Redroom"` only).
- Both light and dark modes are fully styled - no missing dark variants.
- The page reads as one continuous editorial story: hero → mission → services → work → process → manifesto → contact → footer.
- It feels visually adjacent to watchhouse.com (full-bleed images, generous whitespace, confident type, minimal chrome) but the _palette_ and _type_ are unmistakably Redroom (burgundy, bone, Montserrat, italic accents).
- Everything is responsive down to ~360px without horizontal scroll. Hero title scales fluidly via `clamp()`. Service grid collapses 4→2→1 columns. Two-column layouts collapse to single column under `md`.

Build it.
