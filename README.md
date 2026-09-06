# TraceGuardAI

**Observe. Protect. Optimize. Your AI in real time.**

A responsive, accessible B2B SaaS landing page for a fictional AI Observability,
Guardrails & Cost Management platform — built as a frontend internship project.

> **This is a fictional/demo product.** TraceGuardAI is not a real company or a
> real SaaS platform. No customers, statistics, certifications, or provider
> integrations shown on this page are real. See [Content Credibility](#content-credibility)
> below for details.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Design Decisions](#design-decisions)
- [Responsive Behavior](#responsive-behavior)
- [Accessibility](#accessibility)
- [Content Credibility](#content-credibility)
- [Running Locally](#running-locally)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)

---

## Project Overview

TraceGuardAI is presented as a real-time AI Observability, Guardrails, and Cost
Management platform for engineering teams running production AI systems. The
landing page communicates four core capabilities — cost control, security
guardrails, performance monitoring, and output quality detection — through a
single-page marketing site aimed at three audiences: software/AI engineers,
engineering leaders, and DevOps/security teams.

This repository contains the **Phase 3 frontend implementation**: a static,
dependency-free HTML/CSS/JS build of the approved Phase 2 design.

## Features

- **Responsive 10-section landing page** — navigation, hero, AI-ecosystem trust
  strip, problem/value proposition, core capabilities, a fully HTML/CSS mock
  product dashboard, a 3-step "how it works" flow, audience-specific solution
  cards, a final call-to-action, and a footer.
- **Accessible mobile navigation** — hamburger toggle driven entirely by the
  `aria-expanded` attribute, closable via link click, `Escape`, or an
  outside click, with focus returned to the toggle on close.
- **Pure-CSS/HTML dashboard mockup** — sidebar, metric tiles, an activity
  chart (built with `clip-path`, no images/canvas/JS), a recent-events feed,
  and security/quality indicators, all clearly labeled as demonstration data.
- **Honest handling of unbuilt destinations** — nav items with no real page
  (Pricing, Resources) are rendered as visibly disabled controls with a
  "Coming soon" label instead of dead links; "Get Started" / "Sign In" trigger
  an accessible toast explaining this is a demo with no live backend, instead
  of silently failing or faking a redirect.
- **Zero dependencies** — no frameworks, build step, or bundler. Just three
  files: `index.html`, `css/style.css`, `js/script.js`.

## Technologies Used

- **HTML5** — semantic markup, one primary `<h1>`, logical heading hierarchy
- **CSS3** — custom properties (design tokens), Flexbox, CSS Grid, mobile-first
  media queries, `clip-path` for the dashboard/hero chart visuals
- **Vanilla JavaScript (ES6+)** — no libraries; mobile nav state and a small
  accessible toast notification
- **[Inter](https://fonts.google.com/specimen/Inter)** — loaded via Google Fonts, with a full system-font fallback stack

No React, Vue, Angular, Tailwind, Bootstrap, or backend of any kind is used.

## Project Structure

traceguardai/
│
├── index.html # Full semantic markup, all 10 sections
│
├── css/
│ └── style.css # Design tokens, reset, and all component styles
│
├── js/
│ └── script.js # Mobile nav toggle + demo-action toast
│
├── assets/
│ ├── images/ # Reserved for future use (currently empty —
│ └── icons/ # the dashboard/hero visuals are pure CSS/SVG)
│
├── screenshots/ # Reserved for desktop/tablet/mobile screenshots
│
├── README.md # This file
├── .gitignore
└── LICENSE # MIT


## Design Decisions

**Color system.** All colors are CSS custom properties defined once in
`:root` (dark navy background `#07111F`, two lighter surface tones for
layering, a cyan accent `#22D3EE`, and semantic success/warning/danger/info
colors). No colors outside this approved palette were introduced.

**Section rhythm.** Backgrounds alternate gently between the base background
and a slightly lighter surface tone section-to-section (Hero → Ecosystem →
Problem → Capabilities → Dashboard → How It Works → Solutions → CTA) to create
visual rhythm down a long single page without adding dividers or heavy
borders everywhere.

**Typography.** A single mobile-first type scale (defined as CSS custom
properties) steps up at the `1024px` breakpoint — e.g. the hero heading is
40px on mobile and 64px on desktop — rather than maintaining two parallel
sets of font-size rules.

**Dashboard mockup.** Built entirely from HTML/CSS: the "chart" areas use a
`clip-path` polygon over a soft gradient to suggest an activity graph without
any image, canvas, or charting library, keeping the page lightweight. All
figures shown (request counts, costs, latency, error rates, event feed) are
explicitly labeled as demonstration data both visually and via `aria-label`.

**Trust/ecosystem section.** Provider names (OpenAI, Anthropic, Google, Azure,
AWS) are rendered as plain muted text, not styled as logo badges, and are
paired with an explicit disclaimer that they are shown as environment
context — not as customers or confirmed integrations.

**Unbuilt navigation destinations.** Rather than link to pages that don't
exist, "Pricing" and "Resources" are implemented as real, focusable
`<button disabled>` elements with a visible "Coming soon" tag. This was a
deliberate accessibility/honesty trade-off: WCAG explicitly exempts disabled
controls from color-contrast requirements, and it avoids both dead links and
fabricated pages.

## Responsive Behavior

Mobile-first, with three breakpoints used consistently throughout:

| Breakpoint | Range |
|---|---|
| Mobile | < 768px |
| Tablet | 768px – 1023px |
| Desktop | ≥ 1024px |

Notable responsive behavior:

- **Navigation** — hamburger menu on mobile/tablet; full horizontal bar on desktop.
- **Hero** — single column (text → CTAs → dashboard preview) on mobile; two-column grid on desktop.
- **Dashboard mockup** — sidebar is hidden below 768px, becomes a horizontally-scrollable strip on tablet, and a fixed left column on desktop; metrics grid steps from 2 columns (mobile) to 4 (desktop).
- **How It Works flow** — vertical stack with `↓` connectors on mobile; horizontal row with `→` connectors on desktop.
- **Card grids** (Problem, Capabilities, Solutions) — single column on mobile, 2 or 3 columns from tablet/desktop up.
- A dedicated small-phone refinement (< 480px) stacks CTA buttons full-width and adjusts a few components (metric tile sizing, ecosystem list spacing) for the tightest viewports.

No horizontal scrolling occurs at any tested width from 320px through large desktop.

## Accessibility

- Semantic landmarks throughout (`header`, `nav`, `main`, `section`, `footer`) with a skip-to-content link.
- Exactly one `<h1>`; logical, non-skipping `<h2>`/`<h3>` hierarchy.
- Every interactive element is a real `<button>` or `<a>` — no `<div>`-as-button patterns.
- Visible focus indicator (`:focus-visible`) on every interactive element.
- Mobile menu is fully keyboard operable: opens/closes via the toggle button, closes on `Escape` (returning focus to the toggle), and exposes its state via `aria-expanded`.
- All text/background color pairings were checked against actual WCAG contrast math (not just visual inspection) during a dedicated accessibility pass; two components (event badges, metric trend indicators) were changed from low-opacity color tints to solid-color chips after failing the 4.5:1 threshold, and a footer label was changed from reduced opacity to italics for the same reason.
- Color is never the sole carrier of meaning — every status badge/indicator pairs its color with an explicit text label.
- `prefers-reduced-motion` is respected globally.
- The dashboard's mock activity chart uses `role="img"` with a descriptive `aria-label` rather than being exposed as meaningless decorative markup.

## Content Credibility

TraceGuardAI is a fictional product built for a student/internship exercise.
In keeping with that, this project intentionally does **not** include:

- Real customer names, logos, or testimonials
- Fabricated user, revenue, or performance statistics
- Claims of SOC 2 / GDPR / ISO certification
- Claims of official integrations with OpenAI, Anthropic, Google, Azure, or AWS

Provider names appear only as ecosystem/environment context, and all
dashboard figures are explicitly labeled as demonstration data.

## Running Locally

No build step or package manager is required. Any of the following works:

**Option 1 — just open the file**
```bash
open index.html        # macOS
start index.html       # Windows
```

**Option 2 — serve it locally (recommended, avoids any local file:// quirks)**
```bash
# Python 3
python3 -m http.server 8000

# Node (if you have it)
npx serve .
```
Then visit `http://localhost:8000` (or whatever port your tool prints).

## Testing

This project was tested in two ways:

1. **Automated static checks** — validated JavaScript syntax, confirmed there
   are no duplicate IDs, no broken internal anchor links, balanced HTML tags,
   balanced CSS braces, no inline styles/event handlers, and that every
   button has an explicit `type` attribute.
2. **Manual browser testing** — layout and interaction were checked across
   Chrome, Firefox, and Safari at widths from 320px to 2560px using each
   browser's responsive design mode, along with keyboard-only navigation and
   screen-reader spot checks (VoiceOver/NVDA) of the nav toggle, dashboard
   "current item" state, and event badges.

If you find an issue, please open one against this repository.

## Deployment

This is a static site with no server-side dependencies, so it can be deployed
to any static host. Placeholder instructions for common options:

- **GitHub Pages:** push to a repository, then enable Pages on the `main`
  branch (root directory) in the repo settings.
- **Netlify / Vercel:** connect the repository; no build command is needed —
  set the publish directory to the project root.

*(project deployed at: )*

## License

Released under the [MIT License](./LICENSE).
