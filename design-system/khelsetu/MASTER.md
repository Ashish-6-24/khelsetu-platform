# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** KhelSetu
**Generated:** 2026-07-02 (updated from source of truth)
**Category:** Multi-tenant Sports Operations Platform

---

## Global Rules

### Color Palette

| Role       | Hex                    | CSS Variable        |
| ---------- | ---------------------- | ------------------- |
| Primary    | `#7F1D1D` (maroon-800) | `--brand-primary`   |
| Secondary  | `#1E293B` (slate-800)  | `--brand-secondary` |
| Accent     | `#B8860B` (dark gold)  | `--brand-accent`    |
| Background | `#FAFAF9` (stone-50)   | `--bg-canvas`       |
| Text       | `#0F172A` (slate-900)  | `--text-primary`    |

**Color Notes:** Maroon / Navy / Gold — "Quiet Authority" brand. Source of truth: `src/styles/themes.css`.

### Typography

- **Display Font:** Cormorant Garamond (headlines, hero)
- **Body Font:** Inter (UI, body, buttons, labels)
- **Devanagari Font:** Noto Sans Devanagari (Nepali text)
- **Mono Font:** JetBrains Mono (code, data)
- **Mood:** premium, quiet authority, editorial, organized
- **Google Fonts:** [Cormorant Garamond + Inter](https://fonts.google.com/share?selection.family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400|Inter:wght@300;400;500;600;700)

**CSS Import:**

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
```

### Spacing Variables

| Token         | Value             | Usage                     |
| ------------- | ----------------- | ------------------------- |
| `--space-xs`  | `4px` / `0.25rem` | Tight gaps                |
| `--space-sm`  | `8px` / `0.5rem`  | Icon gaps, inline spacing |
| `--space-md`  | `16px` / `1rem`   | Standard padding          |
| `--space-lg`  | `24px` / `1.5rem` | Section padding           |
| `--space-xl`  | `32px` / `2rem`   | Large gaps                |
| `--space-2xl` | `48px` / `3rem`   | Section margins           |
| `--space-3xl` | `64px` / `4rem`   | Hero padding              |

### Shadow Depths

| Level         | Value                          | Usage                       |
| ------------- | ------------------------------ | --------------------------- |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)`   | Subtle lift                 |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)`    | Cards, buttons              |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)`  | Modals, dropdowns           |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

See `src/shared/components/ui/Button.tsx` for the canonical implementation.

Variants: `primary`, `secondary`, `outline`, `ghost`, `danger`, `success`, `glass`, `gold`, `live`, `create`.
Sizes: `xs` (28px), `sm` (36px), `md` (40px), `lg` (48px), `xl` (56px).

### Cards

See `src/shared/components/ui/Card.tsx` for the canonical implementation.

Default: `bg-surface`, `rounded-xl`, `border border-subtle`, `shadow-sm`. Hover: `lift-2` (translateY -6px + shadow-lg).

### Inputs

See `src/shared/components/ui/Input.tsx` for the canonical implementation.

Default: `bg-surface`, `border border-subtle`, `rounded-lg`, `h-10`. Focus: `border-brand`, `ring-2 ring-brand/20`.

### Modals

See `src/shared/components/ui/Modal.tsx` for the canonical implementation.

Sizes: `sm` (480px), `md` (640px), `lg` (768px), `xl` (960px). Backdrop: `bg-black/40 backdrop-blur-sm`.

---

## Style Guidelines

**Style:** "Quiet Authority" — premium sports operations

**Keywords:** Maroon, navy, gold, premium, editorial, organized, restrained, trustworthy, Nepal-first

**Best For:** Sports tournament management, club operations, local organizers

**Key Effects:** Subtle gradients (maroon→gold), glass morphism, spring-physics hover, scroll-reveal, live pulse animations

### Page Pattern

**Pattern Name:** Sports Operations Platform

- **Conversion Strategy:** Show real screenshots. Include live match previews. Social proof from Nepali organizers.
- **CTA Placement:** "Start a tournament" in hero, after features, after pricing, final CTA
- **Section Order:** 1. Hero with live score ticker, 2. Social proof, 3. Sports picker, 4. Features, 5. Metrics, 6. How it works, 7. Testimonials, 8. Pricing, 9. FAQ, 10. Final CTA

---

## Anti-Patterns (Do NOT Use)

- ❌ Poor audio player
- ❌ Cluttered layout

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
