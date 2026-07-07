# Page Override — Landing Page

**Overrides MASTER.md** for the public marketing page at `/`.

## Style Adjustments

- **Mode:** Conversion-focused, brand-first, generous whitespace.
- **Pattern:** Hero-Centric + Social Proof + Feature Showcase (3 sections).
- **Density:** Spacious — `py-20` between sections on desktop, `py-12` on mobile.

## Color & Visual

- **Hero gradient background:** `from-blue-50 via-white to-indigo-50` (light) / `from-gray-900 via-gray-900 to-blue-950` (dark)
- **Primary CTA:** Large (`size="xl"` Button), gradient, prominent — repeats after every section
- **Secondary CTA:** Ghost variant, "Learn more" with arrow
- **Feature cards:** Glass variant (`Card glass`) for visual interest, not standard Card
- **Social proof:** Logo strip of fake/integrated sports brands (replace with real)

## Component Specs

### Hero

- Headline: `text-4xl sm:text-6xl font-bold tracking-tight` (Space Grotesk)
- Subhead: `text-lg sm:text-xl text-secondary max-w-2xl mx-auto`
- CTA row: Primary + ghost, centered, with `gap-x-6`
- Below: Live demo screenshot or animated GIF (lazy-loaded, `loading="lazy"`)

### Features Section

- 3-column grid on desktop, 1-column mobile
- Each feature: Lucide icon (size 32, color primary) + title (text-xl font-semibold) + description (text-secondary)
- Card padding: p-6, glass background

### Social Proof

- 4–6 logo placeholders in a row, `opacity-60 grayscale`
- "Trusted by 500+ organizers across Nepal" + 3 testimonial cards

### Pricing Teaser

- 3 plans (Starter, Pro, Enterprise)
- Middle plan highlighted with `border-2 border-primary` + "Most Popular" badge
- CTA at bottom of each card

### Final CTA

- Full-width band, primary gradient background
- White headline + subhead + large CTA button (white background, blue text)

## Typography

- Use `text-balance` on hero headline (modern CSS)
- Generous line-height: `leading-relaxed` on body paragraphs
- Maximum width `max-w-3xl` for readability

## Animation

- **Hero entrance:** Stagger children (headline, sub, CTAs) at 100ms intervals
- **Feature cards:** Stagger in on scroll into view (use `whileInView` from framer-motion)
- **Stats counter:** Animated number counter on scroll into view
- **Reduced motion:** Skip stagger, show all at once

## SEO & Meta

- `<title>` and `<meta description>` filled
- Open Graph tags for social sharing
- `lang="en"` on `<html>` (with i18n swap for ne/hi)

## Accessibility

- Headings: single `<h1>` in hero, `<h2>` per section
- All CTAs keyboard-reachable
- Skip link to main content
- Color contrast verified in both themes
