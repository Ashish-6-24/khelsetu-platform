# KhelSetu — Premium UI/UX Design Brief

> **One document. The full system.**
> Version: 2.0 (rebrand)
> Status: Design Source of Truth — implementation-grade
> Audience: Designers, front-end engineers, and AI agents building KhelSetu.
> Scope: All 10 surfaces in the KhelSetu IA, every reusable primitive, Nepal-specific adaptations, performance plan, accessibility plan.

---

## Table of Contents

1. [Product Brief & Brand Concept](#1-product-brief--brand-concept)
2. [Design System — Tokens](#2-design-system--tokens)
3. [Sport System](#3-sport-system)
4. [Typography & i18n](#4-typography--i18n)
5. [Iconography](#5-iconography)
6. [Motion & Micro-interactions](#6-motion--micro-interactions)
7. [Information Architecture](#7-information-architecture)
8. [Global Layout Primitives](#8-global-layout-primitives)
9. [Page-by-Page Specs](#9-page-by-page-specs)
   - 9.1 Home
   - 9.2 About
   - 9.3 Services
   - 9.4 Team & Player Management
   - 9.5 Event Scheduling
   - 9.6 Membership
   - 9.7 News & Blog
   - 9.8 Contact
   - 9.9 Admin Login
   - 9.10 Dashboard
10. [Component Library](#10-component-library)
11. [Nepal-Specific Adaptations](#11-nepal-specific-adaptations)
12. [Performance Plan](#12-performance-plan)
13. [Accessibility Plan](#13-accessibility-plan)
14. [Conversion & Trust Strategy](#14-conversion--trust-strategy)
15. [Pre-Delivery Checklist](#15-pre-delivery-checklist)
16. [What Replaces What](#16-what-replaces-what)

---

## 1. Product Brief & Brand Concept

### 1.1 What is KhelSetu?

KhelSetu ("bridge to sports") is a **multi-tenant sports operations platform** for local-level games in Nepal. It runs cricket, football, volleyball, and basketball tournaments end-to-end: registration, fixtures, live scoring, brackets, results, memberships, and a public news/blog surface.

The platform is **trusted by local clubs, schools, tournament organizers, players, coaches, and members** across Nepal. It is not a consumer app; it is **operational software that local organizers will share screenshots of in WhatsApp groups**, so it must look like a tool a serious organization uses.

### 1.2 Brand Concept — "Quiet Authority"

Most sports platforms shout: clashing gradients, motion-blur shots, screaming live badges. KhelSetu is the opposite.

**Core feeling:** _Quiet Authority._ Like a well-tailored blazer at a cricket pavilion — present, considered, confident, never loud.

| Trait                   | Expression                                                                                                           |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **Premium**             | Generous whitespace, considered spacing scale, restrained gradients, no visual noise.                                |
| **Clean**               | One primary action per screen. Hierarchy is established by type and space, not color overload.                       |
| **Modern**              | Variable-weight type, soft long shadows, subtle glass for elevated surfaces, no skeuomorphism.                       |
| **Organized**           | Information is grouped, scannable, never dense-for-the-sake-of-density.                                              |
| **Trustworthy**         | Real screenshots over mockups, real numbers over vanity metrics, named organizers over "Team 1".                     |
| **Localized for Nepal** | English + Nepali (Devanagari). NPR formatting. Cricket-first feature parity. eSewa / Khalti / Fonepay payment slots. |
| **Fast & lightweight**  | 2G/3G-friendly. < 100KB critical CSS, < 200KB JS for first load on landing.                                          |
| **Human-centered**      | Coach with 8 teams and a T-3 day deadline is the primary user, not the data scientist.                               |

### 1.3 Brand Voice

- Confident, not cocky.
- Specific, not generic: "12 teams registered, 4 matches live" beats "Powerful, fast, modern."
- Bilingual: every product string ships EN + NE. NE copy uses plain, modern Devanagari — not formal/legal register.

### 1.4 Anti-patterns (the "Do Not" list)

These are the failure modes that _every_ sports platform eventually slides into. KhelSetu does not:

- ❌ Emoji as icons (use Lucide SVG).
- ❌ Photo backgrounds behind text (low contrast, slow, bad on 3G).
- ❌ Marquee/ticker-tape animations on landing.
- ❌ Live badges that pulse faster than once per 2s.
- ❌ Gradients on body copy or table cells.
- ❌ Drop shadows on text.
- ❌ Decorative dividers (use 1px hairline `--border-subtle`).
- ❌ Cluttered nav with 9+ top-level items.
- ❌ "Sign up now — 5 minutes!" urgency on a B2B ops tool.
- ❌ Generic stock photos of people high-fiving. Use real tournament photography or honest illustration.

### 1.5 What Replaces the v1 System

The v1 design system used a **blue / indigo / emerald** palette (premium SaaS feel). v2 is a **maroon / navy / gold** palette (premium sports authority). All existing Tailwind tokens, page overrides, and component variants must be updated. v1 tokens should be archived, not deleted (used for historical screenshots).

---

## 2. Design System — Tokens

All design decisions are made through **semantic tokens**, not raw values. Components consume `bg-primary`, `text-secondary`, etc. Tailwind config maps tokens to colors. **Never** use raw hex in components.

### 2.1 Color System

#### 2.1.1 Brand Palette

| Token                    | Light                  | Dark                          | Role                                                |
| ------------------------ | ---------------------- | ----------------------------- | --------------------------------------------------- |
| `--brand-primary`        | `#7F1D1D` (maroon-800) | `#FCA5A5` (maroon-300)        | Brand mark, primary actions, strong emphasis        |
| `--brand-primary-hover`  | `#991B1B` (maroon-900) | `#FECACA` (maroon-200)        | Hover/active for primary                            |
| `--brand-primary-soft`   | `#FEF2F2` (maroon-50)  | `#7F1D1D/15` (maroon-800/15)  | Selected/active backgrounds, soft chips, hover wash |
| `--brand-primary-ink`    | `#FFFFFF`              | `#1A0A0A` (deep maroon-black) | Text/icons on `--brand-primary`                     |
| `--brand-secondary`      | `#1E293B` (slate-800)  | `#0F172A` (slate-950)         | Headings, body emphasis, secondary surfaces         |
| `--brand-secondary-soft` | `#F1F5F9` (slate-100)  | `#1E293B/60`                  | Sidebar/drawer backgrounds                          |
| `--brand-accent`         | `#B8860B` (dark gold)  | `#E5B547` (light gold)        | Premium tier emphasis, awards, badges, "verified"   |
| `--brand-accent-soft`    | `#FEF3C7` (amber-100)  | `#B8860B/15`                  | Soft gold wash, premium chip background             |
| `--brand-accent-ink`     | `#1A0A0A`              | `#1A0A0A`                     | Text on gold (light & dark)                         |

**Why maroon / navy / gold:**

- Maroon is **already in the Nepal flag** and is the traditional color of cricket, kabaddi, and national sport kits. It is locally read as authoritative and trustworthy — not aggressive.
- Navy/slate anchors the brand to "operations software" rather than "team store."
- Gold is the premium cue. Used sparingly, it signals membership tier, awards, sponsorship tiers.

#### 2.1.2 Semantic Surfaces & Text

| Token                 | Light                   | Dark                                  | Use                                               |
| --------------------- | ----------------------- | ------------------------------------- | ------------------------------------------------- |
| `--bg-canvas`         | `#FAFAF9` (stone-50)    | `#0A0A0F` (near-black with cool tint) | Page background                                   |
| `--bg-surface`        | `#FFFFFF`               | `#13131A` (raised dark)               | Cards, modals, panels                             |
| `--bg-surface-raised` | `#FFFFFF` + `shadow-md` | `#1A1A23` + `shadow-lg`               | Floating elements, popovers                       |
| `--bg-surface-sunken` | `#F5F5F4` (stone-100)   | `#0F0F14`                             | Inputs, code blocks, table row hover              |
| `--bg-inverse`        | `#0F172A` (slate-900)   | `#FAFAF9` (stone-50)                  | Inverted surfaces (footer, dark CTAs)             |
| `--text-primary`      | `#0F172A` (slate-900)   | `#FAFAF9` (stone-50)                  | Body, headings — **must hit 7:1** for trust pages |
| `--text-secondary`    | `#475569` (slate-600)   | `#CBD5E1` (slate-300)                 | Captions, helper, secondary labels — **4.5:1**    |
| `--text-tertiary`     | `#94A3B8` (slate-400)   | `#94A3B8` (slate-400)                 | Disabled, placeholder — **3:1** OK                |
| `--text-on-brand`     | `#FFFFFF`               | `#FFFFFF`                             | Text on `--brand-primary`                         |
| `--text-on-accent`    | `#1A0A0A`               | `#1A0A0A`                             | Text on `--brand-accent`                          |
| `--text-link`         | `#7F1D1D` (maroon-800)  | `#FCA5A5` (maroon-300)                | Inline links (same as primary, intentional)       |
| `--border-subtle`     | `#E7E5E4` (stone-200)   | `#27272A` (zinc-800)                  | Default dividers, card edges                      |
| `--border-strong`     | `#D6D3D1` (stone-300)   | `#3F3F46` (zinc-700)                  | Form borders, focused outlines halo               |
| `--border-brand`      | `#7F1D1D`               | `#FCA5A5`                             | Brand-bordered cards (membership premium)         |

#### 2.1.3 Functional Colors

| Token             | Light                 | Dark                  | Use                                                    |
| ----------------- | --------------------- | --------------------- | ------------------------------------------------------ |
| `--color-live`    | `#DC2626` (red-600)   | `#F87171` (red-400)   | LIVE pulse, recording state, urgent — WCAG AA on white |
| `--color-success` | `#15803D` (green-700) | `#4ADE80` (green-400) | Confirmations, positive deltas, "won"                  |
| `--color-warning` | `#B45309` (amber-700) | `#FBBF24` (amber-400) | Warnings, pending state                                |
| `--color-danger`  | `#B91C1C` (red-700)   | `#FCA5A5` (red-300)   | Destructive actions, errors                            |
| `--color-info`    | `#0369A1` (sky-700)   | `#38BDF8` (sky-400)   | Informational badges, neutral links                    |

#### 2.1.4 Sport-Specific Accents

| Token                | Hex                    | Use                             |
| -------------------- | ---------------------- | ------------------------------- |
| `--sport-cricket`    | `#15803D` (green-700)  | Cricket tabs, cricket-mode tint |
| `--sport-football`   | `#1E40AF` (blue-700)   | Football tint                   |
| `--sport-volleyball` | `#B45309` (amber-700)  | Volleyball tint                 |
| `--sport-basketball` | `#C2410C` (orange-700) | Basketball tint                 |

> Sport accents are **never used for primary CTAs** — they only tint chips, dots, and sport-pickers. Primary CTAs are always maroon.

#### 2.1.5 Gradients (Restrained)

| Name                         | Recipe                                                                  | Use                             |
| ---------------------------- | ----------------------------------------------------------------------- | ------------------------------- |
| `--gradient-hero`            | `linear-gradient(135deg, #7F1D1D 0%, #450A0A 100%)`                     | Hero background, premium banner |
| `--gradient-card-brand`      | `linear-gradient(135deg, #FAFAF9 0%, #FEF2F2 100%)` (light)             | Premium membership card light   |
| `--gradient-card-brand-dark` | `linear-gradient(135deg, #1A1A23 0%, #2A1010 100%)`                     | Premium membership card dark    |
| `--gradient-divider`         | `linear-gradient(90deg, transparent 0%, #E7E5E4 50%, transparent 100%)` | Section separator (light)       |

**Gradient rules:**

- ✅ Use for hero, premium cards, premium tier.
- ❌ Never on body text, table cells, form fields, or icon backgrounds.
- ❌ Never more than 2 stops. No rainbow gradients.
- ❌ No `bg-gradient-to-r` decorations on every card — that's noise.

### 2.2 Spacing Scale

4px base unit. Standard Tailwind scale is fine; **specific values used:**

| Token        | px  | Use                                            |
| ------------ | --- | ---------------------------------------------- |
| `--space-0`  | 0   | Reset                                          |
| `--space-1`  | 4   | Icon-to-text gap, fine dividers                |
| `--space-2`  | 8   | Tight stacking, badge padding                  |
| `--space-3`  | 12  | Form label gap, list item vertical             |
| `--space-4`  | 16  | Card padding (compact), form field gap         |
| `--space-6`  | 24  | Card padding (default), section gap (mobile)   |
| `--space-8`  | 32  | Card padding (loose), section gap (tablet)     |
| `--space-12` | 48  | Section gap (desktop), hero padding y (mobile) |
| `--space-16` | 64  | Section gap (desktop), hero padding y (tablet) |
| `--space-20` | 80  | Hero padding y (desktop)                       |
| `--space-24` | 96  | Major section break (desktop)                  |

**Tailwind classes to use:** `gap-2`, `gap-4`, `gap-6`, `gap-8`, `p-6`, `p-8`, `py-12`, `py-16`, `py-20`, `py-24`. Do not invent custom spacing in components.

### 2.3 Radius Scale

| Token           | px   | Use                            |
| --------------- | ---- | ------------------------------ |
| `--radius-none` | 0    | Tables, full-bleed images      |
| `--radius-sm`   | 4    | Badges, inline tags            |
| `--radius-md`   | 8    | Form fields, small buttons     |
| `--radius-lg`   | 12   | Cards, default buttons, modals |
| `--radius-xl`   | 16   | Featured cards, hero insets    |
| `--radius-2xl`  | 24   | Brand mark, hero badges        |
| `--radius-full` | 9999 | Avatars, pills                 |

**Tailwind classes:** `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-full`. Use `rounded-lg` as the default for cards and `rounded-md` for inputs.

### 2.4 Shadow System

Soft, long, low-opacity shadows. **No hard `shadow-md` defaults** — they feel cheap on premium content.

| Token            | Definition                                                                     | Use                                    |
| ---------------- | ------------------------------------------------------------------------------ | -------------------------------------- |
| `--shadow-xs`    | `0 1px 2px rgb(15 23 42 / 0.04)`                                               | Hairline elevation, form fields        |
| `--shadow-sm`    | `0 1px 3px rgb(15 23 42 / 0.06), 0 1px 2px rgb(15 23 42 / 0.04)`               | Cards at rest, dropdowns               |
| `--shadow-md`    | `0 4px 8px -2px rgb(15 23 42 / 0.06), 0 2px 4px -2px rgb(15 23 42 / 0.04)`     | Cards on hover, modals                 |
| `--shadow-lg`    | `0 12px 24px -6px rgb(15 23 42 / 0.08), 0 4px 8px -2px rgb(15 23 42 / 0.05)`   | Popovers, command palette              |
| `--shadow-xl`    | `0 24px 48px -12px rgb(15 23 42 / 0.12), 0 8px 16px -4px rgb(15 23 42 / 0.06)` | Hero glow, large modals                |
| `--shadow-brand` | `0 8px 24px -8px rgb(127 29 29 / 0.25)`                                        | Primary CTA hover glow (maroon-tinted) |
| `--shadow-gold`  | `0 8px 24px -8px rgb(184 134 11 / 0.35)`                                       | Premium tier card                      |

Dark-mode shadows use higher base opacity (0.2–0.4) and a cool tint.

### 2.5 Border & Outline

- **Default border:** `1px solid var(--border-subtle)`. Use `border` class.
- **Focus ring:** `2px solid var(--brand-primary)` with `2px` offset on `--bg-canvas`. Always visible.
- **Brand outline (premium cards):** `1.5px solid var(--brand-primary)`. Use `border-brand` class.

### 2.6 Layout Primitives

| Token                   | Value        | Use                              |
| ----------------------- | ------------ | -------------------------------- |
| `--container-max`       | 1280px       | Public pages, dashboard          |
| `--container-prose`     | 720px        | Blog/news article body           |
| `--container-narrow`    | 480px        | Auth forms, single-column modals |
| `--gutter-mobile`       | 16px         | Page padding (mobile)            |
| `--gutter-tablet`       | 24px         | Page padding (tablet)            |
| `--gutter-desktop`      | 32px         | Page padding (desktop)           |
| `--section-gap-mobile`  | 48px (py-12) | Vertical section gap             |
| `--section-gap-tablet`  | 64px (py-16) |                                  |
| `--section-gap-desktop` | 96px (py-24) |                                  |

---

## 3. Sport System

KhelSetu supports **4 sports**: cricket, football, volleyball, basketball. Each has:

- A **monoline SVG icon** (already in `src/components/ui/SportIcon.tsx`).
- A **sport accent token** (see 2.1.4) for chips, dots, and sport pickers.
- A **sport landing page** with sport-specific copy and a featured live match (if running).
- A **sport-aware scoreboard** component (cricket uses overs/wickets/runs, football uses goals/half-time, etc.).

**Kabaddi is intentionally excluded** from v2.0. The product is focused on the four sports with the deepest local followings and most complete data models.

### 3.1 Sport Picker Component

```
┌─────────┬─────────┬─────────┬─────────┐
│ 🏏      │ ⚽      │ 🏐      │ 🏀      │
│ Cricket │Football │Volley-  │Basket-  │
│         │         │ball     │ball     │
│  142    │  12     │   8     │   6     │
│ live    │ live    │ live    │ live    │
└─────────┴─────────┴─────────┴─────────┘
   ↑          ↑         ↑         ↑
cricket-    football-  volley-   basket-
green dot   blue dot   amber     orange
```

- 4-column grid desktop, 2x2 mobile.
- Active state: `--brand-primary-soft` background, `--brand-primary` icon, top border `--brand-accent` 2px.
- Each card shows: icon, sport name (EN + NE), live count.
- Click → `/sports/[sport]` landing page.

---

## 4. Typography & i18n

### 4.1 Type Stack

KhelSetu uses **three** font families:

| Role                           | Family                                       | Why                                                                                                                            |
| ------------------------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Display (headlines)**        | **Cormorant Garamond** (variable, 400-700)   | Editorial authority, perfect for the "quiet authority" voice. The high-contrast strokes feel premium without being decorative. |
| **UI (body, buttons, labels)** | **Inter** (variable, 400-700)                | Best-in-class UI legibility, tabular figures, excellent Devanagari pairing.                                                    |
| **Devanagari (Nepali)**        | **Noto Sans Devanagari** (variable, 400-700) | The only Devanagari web font with proper weight matching; pairs visually with Inter.                                           |

**Google Fonts import (for self-hosting target):**

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
}
@font-face {
  font-family: 'Cormorant Garamond';
  src: url('/fonts/CormorantGaramond-Variable.woff2') format('woff2-variations');
  font-weight: 400 700;
  font-display: swap;
}
@font-face {
  font-family: 'Noto Sans Devanagari';
  src: url('/fonts/NotoSansDevanagari-Variable.woff2')
    format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
}
```

**Why self-host:** Google Fonts CDN is blocked or throttled in parts of Nepal. Self-hosting with `font-display: swap` and preloaded subset files (Latin only for landing, Latin + Devanagari for NE-locale pages) keeps first paint fast.

### 4.2 Type Scale

| Token                | Size / Line      | Tailwind      | Use                      |
| -------------------- | ---------------- | ------------- | ------------------------ |
| `--text-display-2xl` | 72 / 80, -0.02em | `text-7xl`    | Hero headline (desktop)  |
| `--text-display-xl`  | 60 / 68, -0.02em | `text-6xl`    | Hero headline (tablet)   |
| `--text-display-lg`  | 48 / 56, -0.02em | `text-5xl`    | Section H1               |
| `--text-display-md`  | 36 / 44, -0.01em | `text-4xl`    | Section H2               |
| `--text-display-sm`  | 30 / 38, -0.01em | `text-3xl`    | Card H1, modal title     |
| `--text-h1`          | 24 / 32          | `text-2xl`    | Page H1, card title      |
| `--text-h2`          | 20 / 28          | `text-xl`     | Card H2, sub-section     |
| `--text-h3`          | 18 / 26          | `text-lg`     | Stat label, form section |
| `--text-body-lg`     | 16 / 24          | `text-base`   | Body, paragraph          |
| `--text-body`        | 14 / 22          | `text-sm`     | Default body, table cell |
| `--text-caption`     | 12 / 18          | `text-xs`     | Caption, helper, badge   |
| `--text-micro`       | 11 / 16          | `text-[11px]` | KBD, tag, micro-copy     |

**Default body:** `text-sm` (14px), `leading-relaxed` (1.6) — comfortable for long-form Nepali reading.

**Headlines:** `font-display` (Cormorant). For maximum legibility, use `font-medium` (500) at 36+ sizes; `font-semibold` (600) for shorter impact lines.

### 4.3 i18n Strategy — EN + NE

#### 4.3.1 Locale Toggle

- Header right rail: `EN | NE` segmented control. **Single tap to switch**, no dropdown.
- Persisted in `localStorage` (`khelsetu-locale`) and `URL` (`?lang=ne`).
- Server-rendered pages (or SSG) read `Accept-Language` and the URL param in that order.
- Default: `EN`. NE must be complete enough to ship; do not ship a half-translated product.

#### 4.3.2 String Length Tolerance

Nepali strings are typically **30–50% shorter** than English equivalents. Buttons, badges, and nav items must tolerate ±40% length without breaking layout. Rules:

- **Buttons:** use `min-w-0` and `truncate` only as a last resort. Prefer wider button sizes (`size="md"` minimum for NE-locale pages) or icon+label.
- **Table headers:** allow wrap; use `whitespace-normal` and let cells expand to `min-w-[120px]`.
- **Form labels:** place above input, never inline. NE Devanagari is taller than Latin lowercase.
- **Nav items:** allow 2 lines, `whitespace-nowrap` only on primary nav.

#### 4.3.3 Number, Date, Currency Formatting

- **Currency:** NPR via `Intl.NumberFormat('en-NP', { style: 'currency', currency: 'NPR' })`. For NE locale, use `Intl.NumberFormat('ne-NP', { ... })` — Nepali numerals (०-९) optional, controlled by user preference. Default to EN-NP numerals for clarity.
- **Dates:** `Intl.DateTimeFormat(userLocale, { dateStyle: 'medium' })`. EN: "Mar 15, 2026". NE: "२०८२ फागुन ३१" (Bikram Sambat) is the local default, with AD as a hover.
  - **Bikram Sambat (BS) support is a roadmap item** — v2.0 ships AD with NE-locale month names.
- **Phone numbers:** +977 XX XXXX XXXX. Use `inputmode="tel"`.
- **Time:** 12-hour with AM/PM, Nepali timezone (+05:45). Tournament schedules show in the user's local time.

#### 4.3.4 Devanagari Rendering Quality

- Always set `lang="ne"` on `<html>` when NE locale is active. Critical for proper conjunct rendering.
- Use `font-feature-settings: 'kern' 1, 'liga' 1` for proper Devanagari ligature behavior.
- Avoid `text-transform: uppercase` on NE text (no casing in Devanagari).
- Use `line-height: 1.7` (instead of 1.6) for Devanagari body — taller glyphs need more breathing room.

### 4.4 Text Treatment Rules

- **No more than 2 type families per screen.** (Display + UI. Devanagari is conditional on locale.)
- **No `text-transform: uppercase` on body text** — only on labels and buttons (`tracking-wider` for spacing).
- **Hero headlines use `font-display`** and `text-balance` for natural line breaks.
- **No `font-weight: 900` or `font-weight: 800`** anywhere. Max is `font-bold` (700). The brand is not loud.
- **Tabular figures for all numbers** (`font-feature-settings: 'tnum' 1`). Stat counters, scoreboards, table cells, currency.

---

## 5. Iconography

### 5.1 Icon Set

- **Primary:** Lucide React (already in use).
- **Sport icons:** Custom monoline SVGs in `src/components/ui/SportIcon.tsx`.
- **Brand mark:** Custom SVG in `src/components/ui/Logo.tsx`. Crimson hexagon with white "K" stroke. No notification dot.

### 5.2 Icon Sizing

| Token        | Size | Use                           |
| ------------ | ---- | ----------------------------- |
| `--icon-xs`  | 12px | Inline with caption text      |
| `--icon-sm`  | 16px | Inline with body text, badges |
| `--icon-md`  | 20px | Buttons, form fields          |
| `--icon-lg`  | 24px | Card icons, nav items         |
| `--icon-xl`  | 32px | Section icons, feature cards  |
| `--icon-2xl` | 48px | Empty states, hero icons      |

**Rule:** `h-4 w-4` (16px) inline with body text. `h-5 w-5` (20px) in buttons. `h-6 w-6` (24px) standalone. Never mix sizes in a single visual group.

### 5.3 Icon Color

- **Default:** `text-secondary` (slate-600 / slate-300).
- **In brand primary button:** `text-on-brand` (white).
- **In brand accent surface:** `text-on-accent` (near-black).
- **Active nav item:** `text-brand-primary`.
- **Destructive action:** `text-danger`.

### 5.4 Sport Icons

Custom monoline (2px stroke, 24x24 viewBox):

- Cricket: bat + ball
- Football: ball with pentagon pattern
- Volleyball: ball with curved panels
- Basketball: ball with cross-line pattern

Icons are **not emojis**. They are line-art, single color, drawn at 24px, with `stroke-linecap: round` and `stroke-linejoin: round`.

---

## 6. Motion & Micro-interactions

The brand is quiet. Motion should match.

### 6.1 Motion Principles

- **Purpose over decoration.** Every animation answers "what just changed?"
- **Restrained duration:** 150-250ms for state changes, 300-400ms for entrances.
- **Soft easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (gentle ease-out) for entrances; `cubic-bezier(0.7, 0, 0.84, 0)` for exits. Never `linear`.
- **No bounce, no elastic.** Spring physics only for layout shifts (e.g., sidebar collapse, toast stack).
- **`prefers-reduced-motion: reduce` is a hard requirement** — see §13.

### 6.2 Motion Tokens

| Token              | Duration | Easing          | Use                          |
| ------------------ | -------- | --------------- | ---------------------------- |
| `--motion-instant` | 100ms    | ease-out        | Hover color, border, opacity |
| `--motion-fast`    | 180ms    | ease-out        | Button press, badge state    |
| `--motion-base`    | 240ms    | gentle ease-out | Card hover, tab switch       |
| `--motion-slow`    | 400ms    | gentle ease-out | Modal enter, dropdown open   |
| `--motion-page`    | 500ms    | gentle ease-out | Page enter, hero reveal      |
| `--motion-stagger` | 60ms     | —               | Stagger between list items   |

**Tailwind classes:** `transition-colors duration-200`, `transition-transform duration-200`, `transition-opacity duration-200`. Never `transition-all`.

### 6.3 What Animates (and What Doesn't)

| Surface          | Animates                           | Does NOT animate                                                              |
| ---------------- | ---------------------------------- | ----------------------------------------------------------------------------- |
| Buttons          | Color, shadow (200ms)              | Scale (use active state with `active:translate-y-px` for press feedback only) |
| Cards            | Shadow + 1px lift on hover (200ms) | Content, layout, internal data                                                |
| Live badge       | Pulse dot, 2s                      | Whole banner                                                                  |
| Modal            | Scale 0.98→1, fade (240ms)         | Backdrop flash                                                                |
| Toast            | Slide-up + fade (240ms)            | Background color cycling                                                      |
| Sidebar collapse | Width 240ms                        | Reorder, fade                                                                 |
| Page transitions | Fade + 8px Y (300ms)               | Hero text per-letter                                                          |
| Charts           | Line draw on enter (600ms)         | Continuous animation when data updates (only the data points flash briefly)   |

### 6.4 Scroll-driven Animations

Limited to:

- Stat counters: count-up on `IntersectionObserver` first reveal.
- Hero headline: stagger-reveal (headline → sub → CTAs) at 100ms intervals on first mount.

**No parallax, no scroll-jacking, no "scroll to see the magic" sections.** They tank Lighthouse scores and confuse users on low-end devices.

---

## 7. Information Architecture

### 7.1 Primary Navigation (Top-level IA)

Public surface (unauthenticated):

```
Home                /
About               /about
Services            /services
Teams & Players     /teams
Schedules           /schedules
Membership          /membership
News                /news
Contact             /contact
Login               /login
```

Authenticated surface (post-login, replaces nav):

```
Dashboard           /app
Tournaments         /app/tournaments
Teams               /app/teams
Schedule            /app/schedule
Scoring (live)      /app/scoring
Members             /app/members
Billing             /app/billing
News (CMS)          /app/news
Settings            /app/settings
```

### 7.2 Nav Limits (Anti-clutter)

- **Public nav:** max 7 visible items + Login CTA. Anything else goes in a "More" menu or footer.
- **App sidebar:** max 8 first-level items. Group secondary items under "Settings" or "Account".
- **Mobile nav:** bottom tab bar (5 items max) for primary actions; hamburger drawer for everything else.

### 7.3 Sitemap

```
/ (Home)
/about
/services
/teams                  → public team directory
/teams/:slug
/schedules              → public schedule
/schedules/:id
/membership
/membership/plans
/news                   → article list
/news/:slug             → article detail
/contact
/login
/signup
/forgot-password

/app                    → Dashboard (authenticated)
/app/tournaments
/app/tournaments/new
/app/tournaments/:id
/app/tournaments/:id/bracket
/app/teams
/app/teams/:id
/app/players
/app/players/:id
/app/schedule
/app/schedule/new
/app/scoring
/app/scoring/:matchId
/app/members
/app/billing
/app/billing/plans
/app/billing/history
/app/news
/app/news/new
/app/news/:id/edit
/app/settings
/app/settings/profile
/app/settings/organization
/app/settings/users
/app/settings/integrations

/legal/privacy
/legal/terms
/legal/refund
/help
/help/:article
```

---

## 8. Global Layout Primitives

### 8.1 Public Header (Desktop)

```
┌────────────────────────────────────────────────────────────────┐
│  [K] KhelSetu   Home  About  Services  Teams  Schedules       │
│                            News  Contact      EN | NE  [Login] │
└────────────────────────────────────────────────────────────────┘
```

- **Position:** sticky top, 64px height, `--bg-surface` with `--shadow-xs` after scroll.
- **Logo:** left, brand mark + wordmark.
- **Nav:** center-left, max 7 items. Active item has `--brand-primary` underline (2px) and weight 600.
- **Right cluster:** language toggle, login button (secondary), "Get started" CTA (primary).
- **Behavior on scroll:** becomes `backdrop-blur-md bg-surface/85` with hairline border bottom.

### 8.2 Public Header (Mobile)

- **Logo + hamburger** in a 56px sticky bar.
- **Language toggle** appears inside the hamburger drawer, not in the top bar (saves space).
- **Primary CTA** "Get started" pinned to the bottom of the drawer.

### 8.3 Footer (Public)

```
┌────────────────────────────────────────────────────────────────┐
│  [Brand mark]                                                  │
│  Quiet authority for local sports in Nepal.                    │
│                                                                │
│  Product        Company        Resources     Legal             │
│  Features       About          Help          Privacy           │
│  Pricing        Blog           API docs      Terms             │
│  Schedules      Careers        Status        Refund            │
│  Tournaments    Press          Changelog     Cookies           │
│                                                                │
│  ───────────────────────────────────────────────                │
│  © 2026 KhelSetu · Made in Nepal  ·  EN | NE  ·  social links   │
└────────────────────────────────────────────────────────────────┘
```

- **4-column grid desktop, 2-column tablet, stacked mobile.**
- **Background:** `--bg-inverse` (slate-900 light, off-white dark).
- **Text:** slate-300 / slate-200.
- **No newsletter signup.** Local tools don't need email capture. If we add it later, it goes in the contact page, not the footer.

### 8.4 App Sidebar (Dashboard)

- **Width:** 240px expanded, 64px collapsed.
- **Position:** sticky left, full height.
- **Sections:** Primary nav (Tournaments, Teams, Schedule, Scoring), Admin (Members, Billing, News), User (Settings, Help, Logout).
- **Active item:** `--brand-primary-soft` background, `--brand-primary` icon and label, 3px left border.
- **Collapse:** icon-only mode remembers user preference in `localStorage`.

### 8.5 App Bottom Tab Bar (Mobile)

5 items max, 56-64px height, safe-area inset:

```
┌──────┬──────┬──────┬──────┬──────┐
│ Home │ Tour │Score │Inbox │ More │
└──────┴──────┴──────┴──────┴──────┘
```

- Active tab: `--brand-primary` icon + label, 2px top border.
- Inbox shows unread count badge.
- "More" opens full sidebar drawer.

### 8.6 Modal/Dialog

- **Sizes:** `sm` (480px), `md` (640px), `lg` (768px), `xl` (960px), `full` (100% with 16px margin).
- **Background:** `--bg-surface-raised` with `--shadow-xl`.
- **Padding:** 24px default, 32px for `xl`.
- **Backdrop:** `bg-black/40` with `backdrop-blur-sm`.
- **Close:** X button top-right, ESC key, click outside.
- **Sticky footer** for confirm/destructive dialogs.

### 8.7 Toast/Notification

- **Position:** top-right (desktop), top-center (mobile).
- **Max visible:** 3, with `+N more` overflow.
- **Auto-dismiss:** 5s default, paused on hover.
- **Variants:** success, info, warning, error, neutral.
- **Icon:** Lucide matching the variant.
- **Action button:** optional, right-aligned.

### 8.8 Page Layout Containers

| Page         | Container                                              | Padding y       | Notes                                          |
| ------------ | ------------------------------------------------------ | --------------- | ---------------------------------------------- |
| Home         | `--container-max` (1280px)                             | `py-20` desktop | Sections stack vertically with `py-24` between |
| About        | `--container-prose` (720px) for body, `max-w` for hero | `py-16`         | Reading-friendly                               |
| Services     | `--container-max`                                      | `py-20`         | Card grid 3-col desktop, 1-col mobile          |
| Teams        | `--container-max`                                      | `py-16`         | Filter bar + grid                              |
| Schedules    | `--container-max`                                      | `py-16`         | Calendar + list toggle                         |
| Membership   | `--container-max`                                      | `py-20`         | 3-tier pricing                                 |
| News list    | `--container-max`                                      | `py-16`         | 2-col article grid                             |
| News article | `--container-prose`                                    | `py-12`         | Reading mode                                   |
| Contact      | `--container-narrow` (480px) + sidebar                 | `py-16`         | 2-col desktop, stacked mobile                  |
| Login        | `--container-narrow` (480px)                           | `py-12`         | Centered, no sidebar                           |
| Dashboard    | `--container-max`                                      | `py-8`          | Density allowed                                |

---

## 9. Page-by-Page Specs

### 9.1 Home — `/`

**Purpose:** Convert organizers and clubs. Show that KhelSetu is the local, professional way to run a tournament.

**Pattern:** Hero-Centric + Social Proof + Feature Showcase + Pricing Teaser + Final CTA.

**Section flow:**

1. **Hero (640px tall desktop, 480px mobile)**
   - **Background:** `--gradient-hero` with subtle 1px stone-200 grid overlay (5% opacity, not noise).
   - **Eyebrow:** `KhelSetu · नेपालको लागि` (gold accent).
   - **Headline (h1, display):** "Run your local tournament like a national one." (`text-display-xl`, `text-balance`, `text-white`).
   - **Subhead (body-lg, slate-200):** "KhelSetu is the operations platform for cricket, football, volleyball, and basketball organizers across Nepal. Set up fixtures, run live scoring, and share results — in 10 minutes." Max 2 lines.
   - **Primary CTA:** "Start a tournament" (maroon-50 bg, maroon-900 text, 56px tall, `size="xl"`).
   - **Secondary CTA:** "Watch a 90-second tour" (ghost, white text, leading `▶` icon).
   - **Trust microcopy below CTAs:** "Free for clubs under 8 teams · No credit card · 24/7 Nepali support."

2. **Trust Bar (no section heading)**
   - Single row, grayscale logos: "Trusted by 500+ organizers across Nepal." 6 club/school placeholder logos, `opacity-60 grayscale`, separated by 32px gaps.
   - No testimonial cards in this row — the real social proof comes in section 6.

3. **Featured Sports (4 cards)**
   - Section title: "Choose your sport." `text-display-sm`.
   - 4-column grid desktop, 2x2 mobile.
   - Each card: sport icon (32px), sport name EN + NE, live count badge, "Explore [sport] →" link. Hover: card lifts 2px + sport-color 1.5px top border appears.
   - Subtle hover micro-interaction: card's "→" translates 4px right.

4. **Live Snapshot (real-time)**
   - Section title: "Right now, on KhelSetu." `text-display-sm`.
   - Eyebrow chip: "LIVE" with pulse dot.
   - 3-column grid of live matches: each shows sport, two teams, score, over/minute, "Watch live" link.
   - Empty state (no live matches): honest empty state — "No matches live right now. Check back at 2 PM for the Pokhara Premier League."

5. **Services Overview (3 large feature blocks)**
   - Section title: "Everything you need to run a tournament." `text-display-sm`.
   - Subhead: "From the first registration to the final trophy photo."
   - 3 feature blocks (full-width, alternating image-left / image-right):
     - **Tournament Setup:** "Set up your tournament in 10 minutes." Bullet: formats (round-robin, knockout, league), automated fixtures, venues.
     - **Live Scoring:** "Run a match from one phone." Bullet: ball-by-ball for cricket, real-time goals for football, offline-capable, broadcast overlay.
     - **Results & Memberships:** "Share results and grow your club." Bullet: result tables, player stats, member subscriptions, news publishing.
   - Each block: 60% image / 40% copy desktop, stacked mobile. Images are real screenshots, not illustrations, with 12px radius and `shadow-md`.

6. **Social Proof — Testimonials**
   - Section title: "What organizers say." `text-display-sm`.
   - 3 testimonial cards, each: quote (italic, display-md, slate-700), photo (48px rounded-full), name + role + club.
   - Quote icon (large Lucide `Quote`, 64px, `--brand-primary-soft` color, decorative).
   - No carousel — just 3 cards, side by side. Carousels hide content.

7. **Stats Strip (4 numbers)**
   - 4 columns desktop, 2x2 mobile. Each: large display-md number (count-up on scroll), caption (text-secondary).
   - "1,200+ tournaments run" / "48,000+ matches scored" / "32 districts" / "98% organizer retention"
   - **No "users worldwide" vanity metrics.** Local metrics, real, on-brand.

8. **Pricing Teaser**
   - Section title: "Pricing that fits a local club." `text-display-sm`.
   - Subhead: "Pay in NPR. Cancel anytime. Proceeds support Nepali sports programs."
   - 3 plans: **Starter** (free, 1 tournament, 4 teams) / **Club** (NPR 2,500/month, 5 tournaments, 24 teams, featured) / **District** (NPR 9,500/month, unlimited, custom domain). Monthly/Annual toggle with 17% off annual.
   - Middle plan highlighted with `--brand-primary` border, "Most popular" gold badge.

9. **News Highlights (3 latest posts)**
   - Section title: "From the KhelSetu newsroom." `text-display-sm`.
   - 3-column grid, each card: cover image (16:9), category chip, title, date, 2-line excerpt.
   - "All news →" link at section end.

10. **Final CTA (full-bleed maroon)**
    - Background: `--gradient-hero` reverse.
    - Headline (display-lg, white): "Ready to run your tournament like a national one?"
    - Subhead: "Set up your first tournament in 10 minutes. No credit card. No commitment."
    - CTA: "Start a tournament — free" (white background, maroon text, 56px).
    - Secondary: "Talk to a Nepali organizer" (ghost white).

11. **Footer** (see §8.3)

**Conversion strategy:** Primary CTA appears in hero, after services, after pricing, and in final CTA. Each appearance has different copy framing (action vs. value), never the same exact button twice on one page.

---

### 9.2 About — `/about`

**Purpose:** Build trust. Explain what KhelSetu is, why it exists, who builds it.

**Pattern:** Mission + Story + Team + Values.

**Section flow:**

1. **Hero (320px tall)**
   - Eyebrow: "About KhelSetu"
   - Headline: "Built in Nepal. For Nepal."
   - Subhead: "We're a small team of engineers, designers, and former tournament organizers building the operating system for local sports in Nepal."
   - No CTA in hero — about pages should be about, not conversion.

2. **Mission Statement**
   - Container: `--container-prose`.
   - Two paragraphs, display-md, `text-secondary`. 1.7 line-height.
   - The mission in one sentence, set as a `<blockquote>` with a 4px maroon left border: "We believe a local club in Dolpa should have the same tools as the IPL — without needing a 12-person tech team."

3. **Our Story (Timeline)**
   - Vertical timeline, 4-5 milestones.
   - Each milestone: year (display-md, maroon), title, 2-3 sentence description.
   - No fake founders. Honest: "Founded in 2024 by 3 engineers from Kathmandu."

4. **Team (3-6 people)**
   - 3-column grid desktop, 2-column tablet, 1-column mobile.
   - Each card: photo (240px square, 8px radius), name, role, 1-line bio, LinkedIn link.
   - No "executive headshots" — use candid photos.

5. **Values (3-4 items)**
   - 2-column grid, each value: large number (display-xl, gold), title (h2), description (body).
   - Example values: "Local first. Always." / "Quiet over loud." / "Reliable over flashy." / "Pay in NPR, not USD."

6. **Backed by / Partners (logo strip)**
   - Same format as trust bar on home.
   - Tagline: "Supported by the local sports community."

7. **CTA strip** (small, not full-bleed)
   - "Want to know more? Read our [blog], [contact us], or [start a tournament]."

---

### 9.3 Services — `/services`

**Purpose:** Show the breadth of features. Help organizers self-identify which tier/feature fits.

**Pattern:** Feature catalog with grouping.

**Section flow:**

1. **Hero (320px)**
   - Headline: "Everything KhelSetu does."
   - Subhead: "Twelve tools. One platform. Built for local sports organizers."

2. **Feature groups (alternating sections):**
   - **Tournament Management:** create tournament, format selection, fixture generation, schedule, results.
   - **Live Scoring:** cricket scoring, football scoring, volleyball scoring, basketball scoring, broadcast overlay.
   - **Teams & Players:** team registration, player profiles, transfers, statistics, photo galleries.
   - **Communication:** news publishing, announcements, in-app notifications, email digest.
   - **Memberships & Payments:** membership plans, NPR payments, eSewa/Khalti/Fonepay, member directory, expiry tracking.
   - **Analytics:** organizer dashboard, team stats, player stats, tournament reports.

   Each group: section title (display-md), 2-3 sentence intro, 4-6 feature cards (icon + title + 1-line description), 1 large product screenshot.

3. **Comparison table** (light)
   - 3 columns: Starter / Club / District.
   - Rows: every feature as ✓/—/label.
   - Sticky header on scroll.
   - "Choose plan" CTA in each column header.

4. **CTA strip** — same as About §9.2.7.

---

### 9.4 Team & Player Management — `/teams`

**Purpose:** Public team directory. Show the depth of the local sports ecosystem. Allow clubs to claim/edit their team page.

**Public page (`/teams`):**

1. **Hero (240px)**
   - Headline: "Clubs and teams on KhelSetu."
   - Subhead: "Browse registered teams across Nepal. Filter by sport, district, or age group."
   - Search bar (large, 56px, icon-left).

2. **Filter bar (sticky)**
   - Sport chips (Cricket, Football, Volleyball, Basketball) + "All sports".
   - District dropdown (all 7 provinces + 77 districts, searchable).
   - Age group chips (U-13, U-15, U-17, U-19, Senior).
   - "Verified only" toggle.
   - Sort: Recently active / Most matches / A-Z.

3. **Team grid (3-col desktop, 2-col tablet, 1-col mobile)**
   - Each card: team logo (80px), team name, sport chip, district, member count, "Verified" gold badge if applicable, "View team" link.
   - Empty state: "No teams match your filters. [Reset filters]."

**Team detail page (`/teams/:slug`):**

- **Header:** team logo, name, sport chip, district, "Verified" badge, "Follow" button.
- **Tabs:** Overview / Players / Schedule / Results / Stats / News.
- **Overview:** bio (2-3 paragraphs), home ground, contact, social links, year established.
- **Players table:** photo, name, role, age, matches played, total runs/goals.
- **Schedule:** upcoming matches (cards), past results (table).
- **Stats:** aggregate numbers (matches, win/loss/draw, top scorer).
- **News:** team-related news posts.

**Authenticated app surface (`/app/teams`):** See §9.10 Dashboard.

---

### 9.5 Event Scheduling — `/schedules`

**Purpose:** Public schedule. Anyone can see what matches are happening when, where, and in what stage.

**Public page (`/schedules`):**

1. **Hero (240px)**
   - Headline: "Upcoming matches across Nepal."
   - Subhead: "Filter by tournament, sport, or district. Subscribe to get a weekly digest."

2. **Filter bar (sticky)**
   - Date range picker (default: next 7 days).
   - Sport, district, tournament dropdowns.
   - "Live now" toggle (filters to matches currently in progress).

3. **Calendar / List toggle**
   - Calendar view: month grid with match dots, click a day to see matches.
   - List view: chronological cards, grouped by day, sticky day headers.

4. **Match cards**
   - Sport chip, tournament name, two teams (with logos), time, venue, status badge (scheduled / live / completed).
   - Live matches: maroon border-left 3px, "LIVE" pulse chip, current score overlay.
   - Completed matches: final score, "View scorecard" link.
   - Click → `/schedules/:id` detail.

5. **Subscribe strip**
   - "Get weekly schedule digest" — single email input, no marketing fluff, single CTA "Subscribe".

**Match detail (`/schedules/:id`):**

- Header: tournament, two teams with logos, score, status.
- Tabs: Scorecard / Commentary / Stats / Lineup.
- Scorecard: sport-specific (cricket: full scorecard with batsmen, bowlers, fall of wickets, partnerships).
- For live matches: refreshes every 15s, no manual refresh button needed.

---

### 9.6 Membership — `/membership`

**Purpose:** Convert free organizers to paid. Show the value of each tier.

**Page structure:**

1. **Hero (320px)**
   - Headline: "Pricing for local clubs, not international SaaS."
   - Subhead: "Pay in NPR. Cancel anytime. 17% off annual plans. Free for clubs under 8 teams."
   - **Toggle:** Monthly | Annual (with "Save 17%" gold badge).

2. **Plan grid (3 tiers)**
   - **Starter (Free):** for small clubs, 1 tournament, up to 4 teams, 1 organizer account, email support, KhelSetu branding on public pages.
   - **Club (NPR 2,500/mo, NPR 25,000/yr):** MOST POPULAR, 5 tournaments, 24 teams, unlimited organizers, custom branding, priority support, payment collection via eSewa/Khalti, news publishing.
   - **District (NPR 9,500/mo, NPR 95,000/yr):** unlimited tournaments, unlimited teams, custom domain, white-label public pages, dedicated account manager, API access, multi-club sub-accounts.
   - Each plan card: tier name, price (display-lg, maroon), period, 6-feature bullet list, primary CTA ("Start with [tier]"), "What's included" expandable.

3. **Comparison table** (full feature matrix)
   - Same as services page but with prices and "Get started" CTAs.
   - Sticky header.

4. **Nepal-specific payment methods**
   - Icons: eSewa, Khalti, Fonepay, bank transfer, ConnectIPS.
   - Note: "All plans billed in NPR. Pay via eSewa, Khalti, Fonepay, or direct bank transfer. Invoices in Nepali or English."

5. **FAQ (8-10 questions)**
   - "Can I switch plans anytime?" / "What payment methods do you accept?" / "Do you offer discounts for schools?" / "Is there a free trial?" / "What happens if I cancel?" / "Can I get a refund?" / "Is my data safe?" / "How is this different from international platforms?" / "Do you offer student/youth club discounts?" / "Can I pay annually?"

6. **Trust strip** — short testimonials, "500+ clubs in Nepal trust KhelSetu."

7. **Final CTA** — "Start free. Upgrade when ready."

**Authenticated billing (`/app/billing`):**

- Current plan card (highlighted, "Active").
- Usage meters (tournaments used / limit, teams used / limit, organizers used / limit).
- Payment method on file.
- Billing history table (date, amount NPR, status, invoice download).
- "Change plan" → /app/billing/plans.
- "Cancel subscription" → confirmation modal.

---

### 9.7 News & Blog — `/news`

**Purpose:** Content marketing + community news. Long-form articles about Nepali sports, tournament announcements, platform updates.

**List page (`/news`):**

1. **Hero (240px)**
   - Headline: "News & stories from Nepali sports."
   - Subhead: "Tournament recaps, platform updates, organizer interviews, and more."

2. **Featured article (full-width)**
   - The latest "Editor's pick" — large cover image (16:9, full container width), title (display-lg), 3-line excerpt, byline + date + read time.

3. **Category filter chips**
   - All / Tournament recaps / Organizer stories / Platform updates / Cricket / Football / Volleyball / Basketball / Coaching.

4. **Article grid (3-col desktop, 2-col tablet, 1-col mobile)**
   - Each card: cover image (16:9), category chip, title (h2), 2-line excerpt, byline, date, read time.
   - Load more (infinite scroll, 9 articles per page).

5. **Newsletter strip** — same as schedules §9.5.5.

**Article page (`/news/:slug`):**

- **Container:** `--container-prose` (720px max) for reading.
- **Header:** category chip, title (display-lg), byline, date, read time, share buttons.
- **Cover image:** full-bleed within container, 12px radius.
- **Body:** prose styling (display-sm, 1.7 line-height, 60ch line length, 24px paragraph gap).
- **Inline images:** full-width, 12px radius, with caption (caption text style).
- **Pull quotes:** display-md, italic, 4px maroon left border.
- **Code blocks:** for platform update articles.
- **Related articles (3 cards)** at bottom.
- **Share:** copy link, X, Facebook, WhatsApp (WhatsApp is critical for Nepal).

**Authenticated CMS (`/app/news`):**

- Article list (table) with: title, status (draft / scheduled / published), author, last edited, views.
- Filters: status, category, author.
- "New article" primary CTA.
- Bulk actions: archive, delete, export.

**Article editor (`/app/news/new`, `/app/news/:id/edit`):**

- 2-pane layout: editor left (60%), live preview right (40%) on desktop. Tabbed on mobile.
- Title input (display-md), category, cover image upload, body markdown editor.
- Toolbar: bold, italic, link, H2, H3, list, quote, image, code.
- Publish actions: Save draft / Schedule for later / Publish now.
- SEO panel: title, description, slug, OG image.

---

### 9.8 Contact — `/contact`

**Purpose:** Allow organizers, sponsors, and press to reach the team.

**Page structure:**

1. **Hero (200px)**
   - Headline: "Get in touch."
   - Subhead: "We read every message. Replies within 24 hours, in English or Nepali."

2. **2-column layout (desktop)**
   - **Left (60%):** Contact form.
     - Name (required)
     - Email (required, validated)
     - Phone (optional, with country code +977 default)
     - Topic dropdown: General / Sales / Support / Press / Partnership / Bug report
     - Message (textarea, 6 rows, 500 char max with live counter)
     - Preferred language: EN | NE (radio)
     - Submit button: "Send message" (primary, 48px)
   - **Right (40%):** Contact info card.
     - Email: hello@khelsetu.app
     - Support: support@khelsetu.app (response within 24h)
     - Press: press@khelsetu.app
     - Phone: +977 1 4XXX XXXX (10am-6pm NPT)
     - Address: Kathmandu, Nepal
     - WhatsApp button: "Chat on WhatsApp" (green, with icon).
     - Social links: X, Facebook, Instagram, LinkedIn, YouTube.

3. **FAQ mini-section (4 questions)**
   - "How do I report a bug?" / "How do I become a partner?" / "Do you offer phone support?" / "Can I visit your office?"

4. **Map (optional, lazy-loaded)**
   - Embedded map of Kathmandu office. Lazy-loaded; do not block first paint.

---

### 9.9 Admin Login — `/login`

**Purpose:** Convert to authenticated app. Clean, trustworthy, no friction.

**Page structure:**

- **Layout:** centered single column, `--container-narrow` (480px), no header/footer distractions.
- **Background:** `--bg-canvas`, subtle 1px grid pattern (3% opacity), no photo.

**Form:**

- **Logo + brand name** at top.
- **Headline:** "Welcome back." `text-display-sm`.
- **Subhead:** "Sign in to manage your tournaments." `text-secondary`.
- **Email field:** label "Email" above, placeholder "you@club.org", `inputmode="email"`, autocomplete="email".
- **Password field:** label "Password", with show/hide eye icon (44px touch target), autocomplete="current-password".
- **Forgot password?** link, right-aligned, `--text-link` color.
- **Submit button:** "Sign in" (primary, 48px, full-width).
- **Divider:** "or" with 1px hairlines.
- **Continue with Google** button (secondary, full-width, with Google logo).
- **Sign-up CTA:** "New to KhelSetu? [Create an account]" (centered, text-secondary with link).
- **Language toggle:** bottom-right, `EN | NE`.

**States:**

- **Loading:** submit button shows spinner, all other inputs disabled.
- **Error:** inline error below password field (`text-danger`), shake animation (200ms), field border `--color-danger`.
- **Forgot password flow:** replaces form with email-only → "Send reset link" → success state with back-to-login link.
- **First-time signup:** separate `/signup` page, 3-step wizard (account → organization → first tournament).

**Auth aesthetic:** Minimalism + Trust & Authority. The page should feel like opening a banking app, not a marketing site. No promotional copy, no test logos, no "trusted by" strip.

---

### 9.10 Dashboard — `/app`

**Purpose:** The authenticated home for organizers. The "where am I and what needs attention right now" page.

**Layout:** App sidebar (left, 240px / 64px collapsed) + main content area. Mobile: bottom tab bar + drawer.

**Page structure:**

1. **Top bar (64px)**
   - **Page title:** "Dashboard" (h1, text-h1).
   - **Right cluster:** search button (opens command palette), notifications bell (with badge), user avatar (opens account menu).
   - **Breadcrumbs:** below title, `Home / Dashboard`. (Only on deep pages.)

2. **Welcome strip (full-width)**
   - "Good [morning/afternoon/evening], {first name}." `text-h2`.
   - One-line status: "12 tournaments running, 4 matches live right now."
   - Quick action: "Start scoring" (if any live matches exist) or "Create tournament" (if none).

3. **Summary cards (4 cards, 4-col desktop / 2-col tablet / 1-col mobile)**
   - **Active tournaments:** number, "+2 this week" delta.
   - **Live matches now:** number, "across X sports" sub.
   - **Registered teams:** total, "across Y tournaments" sub.
   - **Members:** paid member count, "+5 this month" delta.
   - Each card: large number (display-md, maroon), caption (text-secondary), small delta chip (green/red), 1 trend sparkline (sparkline is a 60x20px mini line, no axis labels).
   - Hover: card lifts 1px, sparkline reveals full trend.

4. **Live matches (full-width)**
   - Section header: "Live now" + "View all" link.
   - Horizontal scroll of match cards (each: sport chip, two teams, score, "Open scoring" CTA).
   - Empty state: "No live matches. [Create a tournament]."

5. **Upcoming fixtures (full-width)**
   - Section header: "Next 7 days" + "View schedule" link.
   - List (5 items max) of upcoming matches: date, time, two teams, venue, sport chip.
   - "See all X fixtures" footer link.

6. **Recent activity (full-width or 2-col with chart)**
   - Section header: "Recent activity" + "View all".
   - List of 5-8 activity items: avatar/icon, who did what, when (relative).
   - Activities: "Tournament X created", "Player Y registered", "Match Z completed".

7. **Member growth chart (2-col)**
   - Section header: "Members over time" + range toggle (7d / 30d / 90d / 1y).
   - Line chart, area-fill below, 1 sport-accent color, hairline gridlines.
   - Tooltip on hover: date + member count.

8. **Onboarding checklist (collapsible)**
   - 4 steps: Create tournament / Add teams / Configure scoring / Publish public page.
   - Per-step status: complete (green check) / pending.
   - Progress bar at top: "3 of 4 complete".
   - "Dismiss" button (persists in localStorage).
   - Collapses once all steps complete.

9. **Admin tools (collapsible)**
   - Only visible to users with admin role.
   - Quick links: Manage users / Approve organizers / Review reported content / View audit log.

10. **Footer of main area**
    - "Last refreshed: 2 min ago" (with refresh button).
    - Status indicator: "All systems operational" (green dot) or "Degraded" (amber).

**Dashboard density:** This is the one place density is allowed (per design system MASTER). Cards are tighter, tables are denser, type is smaller. But never cramped — `gap-4` between cards, `p-4` card padding minimum.

---

## 10. Component Library

The component library is the **application of the design system**, not a separate system. Each component is documented with: visual, anatomy, props/usage, states, accessibility, do/don't.

### 10.1 Buttons

| Variant       | Use                                   | Visual                                                                      |
| ------------- | ------------------------------------- | --------------------------------------------------------------------------- |
| **primary**   | Primary CTA. One per surface area.    | `--brand-primary` background, white text, `--shadow-brand` on hover.        |
| **secondary** | Secondary action, "Cancel" buttons.   | `--bg-surface` background, `--text-primary` text, `--border-subtle` border. |
| **outline**   | Tertiary action, link-style buttons.  | Transparent background, `--brand-primary` border and text.                  |
| **ghost**     | Inline action, table row action, nav. | Transparent, hover shows `--bg-surface-sunken`.                             |
| **danger**    | Destructive action.                   | `--color-danger` background, white text.                                    |
| **success**   | Confirm action (rare).                | `--color-success` background, white text.                                   |
| **gold**      | Premium tier actions, awards.         | `--brand-accent` background, `--brand-accent-ink` text.                     |
| **glass**     | Floating elements, popovers.          | `--bg-surface/70` + `backdrop-blur-md`, `--border-subtle` border.           |

**Sizes:** `xs` (28px) / `sm` (36px) / `md` (40px) / `lg` (48px) / `xl` (56px). Default is `md`.

**States:**

- **Hover:** `bg-brand-primary-hover`, shadow deepens.
- **Active:** `active:translate-y-px`, background darkens.
- **Disabled:** 50% opacity, `cursor-not-allowed`.
- **Loading:** spinner replaces icon, label remains, `aria-busy="true"`.
- **Icon-only:** square (1:1), `aria-label` required.

**Rules:**

- One primary button per "section" (not just per page). Multiple sections = multiple primaries OK.
- Never use `primary` + `danger` adjacent. Use `danger` only when destroying user data.
- Button text ≤ 3 words. "Sign in", not "Sign in to your account".

### 10.2 Cards

The fundamental content container.

**Anatomy:**

```
┌─────────────────────────────┐
│ [Image / Header]            │  ← optional
├─────────────────────────────┤
│  Title                      │
│  Description                │  ← body
│                             │
│  [footer actions]           │  ← optional
└─────────────────────────────┘
```

**Variants:**

- **default:** `--bg-surface`, 1px border, `--radius-lg`, `p-6`, `--shadow-xs` at rest, `--shadow-md` on hover.
- **brand:** `--gradient-card-brand` background, `--border-brand` 1.5px border, `--shadow-gold`. Used for premium tier cards.
- **flat:** no shadow, no border, just `--bg-surface` background. For lists.
- **elevated:** `--bg-surface-raised`, `--shadow-md` always. For floating elements.
- **interactive:** adds `cursor-pointer`, hover lift 1px, focus ring on Tab.

**Card sections:**

- `<CardHeader>` — title + optional eyebrow + actions.
- `<CardBody>` — main content, padding `p-6` default.
- `<CardFooter>` — actions row, 1px top border, padding `p-4`.

### 10.3 Tables

**Anatomy:**

- Header row: 48px tall, `--bg-surface-sunken` background, 12px text, weight 600, uppercase tracking-wider.
- Body rows: 56px tall (40px compact), 14px text, 1px hairline border-bottom, hover `--bg-surface-sunken`.
- Sticky header on scroll (within container).

**Variants:**

- **default:** simple table.
- **striped:** alternate row backgrounds.
- **bordered:** all cells bordered (use sparingly; creates noise).
- **compact:** 40px row height, 13px text.

**Features:**

- **Sortable columns:** chevron icon in header, click to sort.
- **Selectable rows:** checkbox column, sticky left, "X selected" toolbar appears.
- **Bulk actions:** appear in toolbar (Delete, Archive, Export, Change status).
- **Inline editing:** click cell to edit, `Enter` to save, `Esc` to cancel.
- **Empty state:** centered icon + message + primary action.
- **Pagination:** bottom right, "1-25 of 248", page numbers, prev/next.

### 10.4 Forms

**Anatomy:**

```
Label (14px, weight 500, mb-1.5)
[Input field]
Helper text (12px, secondary)  ← optional
Error text (12px, danger)      ← when invalid
```

**Input variants:**

- **text** (default)
- **email** (with email validation)
- **password** (with show/hide toggle)
- **number** (inputmode="numeric")
- **tel** (inputmode="tel")
- **url**
- **date / time / datetime-local**
- **select** (custom dropdown with search)
- **combobox** (search + create new)
- **textarea** (auto-resize option)
- **file upload** (drag-and-drop + click)
- **checkbox** / **radio** / **switch**
- **slider** (range)

**Field states:**

- **default:** `--border-strong` border, `--bg-surface` background.
- **hover:** border `--text-primary`.
- **focus:** 2px `--brand-primary` ring, 2px offset.
- **disabled:** `--bg-surface-sunken` background, `--text-tertiary` text, `cursor-not-allowed`.
- **error:** `--color-danger` border + ring, error text below.
- **success:** optional green check icon right.

**Field sizes:** `sm` (32px) / `md` (40px) / `lg` (48px). Default `md`.

**Form layout:**

- **1 column** mobile, **2 columns** desktop for short fields (name/email pairs).
- **Labels always above inputs** (not inline). Exception: checkboxes/radios can have right labels.
- **Required field indicator:** asterisk after label, not separate text.
- **Helper text:** 12px, `--text-secondary`, can include a link.
- **Error summary at top of form** for multi-field validation errors, plus inline errors per field.

**Touch targets:** 44px minimum on mobile. Form fields are 48px on mobile to accommodate.

### 10.5 Badges & Tags

| Variant     | Use                               | Visual                                     |
| ----------- | --------------------------------- | ------------------------------------------ |
| **neutral** | Default state.                    | Stone background, primary text.            |
| **brand**   | Brand callout, primary status.    | Maroon background, white text.             |
| **live**    | Currently in progress, recording. | Red-600 background, white text, pulse dot. |
| **success** | Confirmed, paid, won.             | Green-50 background, green-700 text.       |
| **warning** | Pending, awaiting action.         | Amber-50 background, amber-700 text.       |
| **danger**  | Failed, overdue, error.           | Red-50 background, red-700 text.           |
| **info**    | Informational, scheduled.         | Sky-50 background, sky-700 text.           |
| **gold**    | Premium tier, verified, awards.   | Gold-100 background, gold-800 text.        |
| **sport**   | Sport label.                      | Sport-specific accent background.          |

**Sizes:** `sm` (20px) / `md` (24px) / `lg` (28px). Default `sm`.

**Shape:** `rounded-full` for tags, `rounded-md` for status badges.

**Rules:**

- Pair with icon when color is the only differentiator (e.g., green check for success).
- Don't use badges for clickable actions (use buttons or link chips).

### 10.6 Navigation Components

- **Top nav (public):** see §8.1.
- **Sidebar (app):** see §8.4.
- **Bottom tab bar (app mobile):** see §8.5.
- **Breadcrumbs:** `Home / Section / Page`, separated by `>`, 13px text, `--text-tertiary` with `--text-secondary` on the last item.
- **Tabs:** underline indicator (2px, `--brand-primary`), 48px height, label + count, animated indicator on change.
- **Stepper:** for multi-step forms, numbered circles + connector line.

### 10.7 Modal/Dialog

See §8.6 for sizing.

**Types:**

- **Alert:** icon + title + message + OK button.
- **Confirm:** title + message + Cancel + Confirm (primary or danger).
- **Form:** title + form fields + Cancel + Submit.
- **Drawer:** slides from right, 400-600px wide, used for detail editing.

**Behavior:**

- Trap focus inside the dialog.
- `Esc` closes (cancel action).
- Click outside closes only for non-destructive dialogs.
- Announce open/close to screen readers via `aria-modal="true"`, `role="dialog"`, `aria-labelledby`.

### 10.8 Toast/Notification

See §8.7 for placement.

**Variants:** success, info, warning, error, neutral.

**Anatomy:** icon (left) + title + optional description + optional action + close (X).

**Behavior:**

- Stack from top-right, max 3 visible.
- Auto-dismiss: 5s (success/info), 8s (warning), persistent (error until user dismisses).
- Hover pauses auto-dismiss.
- ARIA: `role="status"`, `aria-live="polite"` for non-error, `aria-live="assertive"` for errors.

### 10.9 Command Palette

Modal launched with `Cmd/Ctrl-K`. 2-column layout:

- **Left (60%):** search input + grouped results (Navigate, Actions, Help, Recent).
- **Right (40%):** preview panel showing details of the highlighted item.
- Footer: keyboard shortcut hints (↑↓ navigate, ↵ select, esc close).

**Behavior:**

- Fuzzy search across all items.
- Arrow keys to navigate, Enter to select.
- Recent items (last 5) shown first.
- Keyboard shortcuts shown in results (e.g., "New tournament [C]").

### 10.10 Calendar

Two views: **Month** and **List** (see Schedules §9.5).

**Month view:**

- 7-column grid, 5-6 rows.
- Each cell: date number (top-left), 1-3 match dots (max 3, "+N more" overflow).
- Today: maroon text, subtle `--brand-primary-soft` background.
- Selected day: maroon text on white, 2px maroon border.
- Days outside current month: 40% opacity.

**Event dot:** 6px circle, sport-accent color. Hover: shows match count tooltip.

**List view:** sticky day headers, chronological match cards (see §9.5.4).

### 10.11 Upload Component

**Variants:**

- **button:** single file, button + filename display.
- **dropzone:** large area, drag-and-drop, click to browse.
- **multi-file:** dropzone with file list, progress bars, remove buttons.

**States:**

- **default:** dashed `--border-strong` border, icon + "Drop file or click to browse".
- **hover:** border `--brand-primary`, `--brand-primary-soft` background.
- **uploading:** progress bar (maroon), percentage label.
- **success:** green check, file size.
- **error:** red border, error message, retry button.

**Constraints:**

- File type: image (jpg, png, webp), pdf, csv, xlsx.
- Max size: 10MB images, 25MB documents.
- Multiple files: max 10 per upload.

### 10.12 Empty States

**Anatomy:**

- Centered icon (64px, `--text-tertiary`).
- Headline (`text-h2`, `--text-primary`).
- Description (body, `--text-secondary`, max 2 lines).
- Primary action button.

**Variants:**

- **no-data:** "No tournaments yet." + "Create your first tournament" CTA.
- **no-results:** "No teams match your filters." + "Reset filters" CTA.
- **no-access:** "You don't have access to this." + "Request access" CTA.
- **error:** "Something went wrong." + "Try again" CTA.
- **no-connection:** "You're offline." + "We'll sync when you're back." (no CTA).

**Visual:** honest, never decorative. No illustrations of confused people or empty boxes. Just an icon and a clear next step.

### 10.13 Loading States

**Variants:**

- **skeleton:** for content placeholders (cards, tables, lists). Use `--bg-surface-sunken` background with shimmer animation (1.5s linear gradient). `prefers-reduced-motion` disables shimmer.
- **spinner:** for action-level loading (button, form submit). 16px circular.
- **progress bar:** for known-duration operations (upload, import). Maroon fill on stone track.
- **page-level:** full-page skeleton matches final layout structure. Centered brand mark + "Loading..." caption.

**Rules:**

- Skeleton mirrors final layout dimensions (no layout shift on load).
- Skeleton duration: < 1.5s preferred, fallback to spinner if longer.
- Never use spinner on text content (use skeleton).

### 10.14 Status Indicators

- **Dot:** 8px circle, color only (success/warning/danger/info). Always paired with text or icon — never color-only.
- **Pulse:** for "live" states. 2s pulse animation. `prefers-reduced-motion` disables pulse, replaces with static red dot.
- **Counter:** for "unread" badges in nav. 18px circle, brand-primary background, white text, 10-12px font.
- **Bar:** for "strength" indicators (password, completion). Horizontal bar with fill %.

---

## 11. Nepal-Specific Adaptations

### 11.1 Locale & Language

- **Default locale:** `en-NP` (English in Nepal).
- **Supported:** `en` (English), `ne` (Nepali/Devanagari). `hi` (Hindi) is roadmap.
- **Bilingual strategy:** every product string has both `en` and `ne` keys. Default to `en`, swap to `ne` on toggle.
- **Format dates in Bikram Sambat (BS) as a v2.1 feature** — v2.0 ships AD with NE-locale month names.
- **Nepali numerals (०-९) optional**, user-controlled in settings. Default: Latin numerals for clarity.

### 11.2 Payments

**Supported payment methods (NPR):**

| Method               | Use                                 | UX                                              |
| -------------------- | ----------------------------------- | ----------------------------------------------- |
| **eSewa**            | Wallet, primary for retail.         | Redirect to eSewa, callback on return.          |
| **Khalti**           | Wallet, primary for digital.        | Redirect to Khalti, callback.                   |
| **Fonepay**          | Bank-direct, popular in Nepal.      | Redirect to Fonepay, callback.                  |
| **ConnectIPS**       | Real-time bank transfer, interbank. | Bank selection → redirect → confirm.            |
| **Bank transfer**    | For large amounts (District tier).  | Manual verification, 1-3 day clearing.          |
| **Cash (in-person)** | For clubs without digital access.   | Generate invoice, mark "paid offline" manually. |

**Payment UX:**

- **Method selector:** grid of 6 payment options, logo + name, radio selection.
- **Selected method:** maroon border, "Continue with [method]" CTA.
- **Redirect flow:** show "Redirecting to eSewa..." with logo, 10s timeout fallback.
- **Return flow:** success page with receipt download, automatic plan activation, email confirmation.
- **Failure:** stay on payment page, show error, "Try again" + "Choose different method".

**Pricing display rules:**

- All prices in NPR by default. No USD, no "international pricing".
- Annual plans: show monthly equivalent + total + "Save 17%".
- Free tier: "Free" not "NPR 0".
- Pro-rated upgrades: show "Pay NPR X for remaining 18 days" clearly.

### 11.3 Imagery

**Allowed:**

- Real tournament photography (cricket in Dasharath Stadium, football in Pokhara, etc.).
- Real team logos and player photos (with permission).
- Honest illustrations of sports concepts (line-art, brand colors).
- Nepal flag, map silhouette (used sparingly, not decoratively).

**Not allowed:**

- Generic stock photos of "Indian cricket" or "American football".
- Cliché "team high-five" photos.
- Emoji in any context.
- Decorative illustrations that don't communicate.
- Photos with people whose faces are not in product (no random avatars).

**Photo treatment:**

- Subtle 1px `--border-subtle` border, 8px radius, `--shadow-sm`.
- No filters, no overlay text, no gradient masks.
- Lazy-loaded, with `<img loading="lazy" decoding="async">`.
- WebP or AVIF format, 2x for retina, max 200KB per image.

### 11.4 Connectivity & Low-Bandwidth

- **Default network profile:** Nepal 3G (~1.6 Mbps, 300ms RTT). Design must work on this.
- **2G fallback:** text-only, no images, no JS-required interactions for primary content.
- **Asset budget:** First load < 200KB JS gzipped, < 100KB CSS gzipped, < 1MB total transferred.
- **Lazy loading:** below-fold images, route-split JS, deferred analytics.
- **Compression:** Brotli preferred, gzip fallback, all text assets pre-compressed.
- **Service worker:** cache static assets, offline shell for read-only pages.
- **No autoplay video.** No background video. No heavy Lottie animations.

### 11.5 Devices

- **Primary:** Low-end Android (Moto E, Samsung A-series, 2-3GB RAM, 720p screen).
- **Secondary:** Mid-range Android, iPhone SE, iPhone 12+.
- **Design constraints:**
  - Touch targets ≥ 44px (Apple HIG) — we use 48px for primary actions.
  - Body text ≥ 14px on mobile.
  - No hover-only interactions on mobile.
  - No fixed pixel widths for layouts — use responsive grids.
  - Test on 360px width (smallest common Android).

### 11.6 Local Idioms in Copy

- **Use "you" not "user".** KhelSetu speaks to organizers as a person, not a role.
- **Use specific Nepali examples:** "Pokhara Premier League", "Kathmandu School League", not "Tournament A".
- **Currency in NPR, prices in lakh/crore for large amounts.** NPR 25,000 is "twenty-five thousand", not "$200".
- **Time in 12-hour with NPT (UTC+5:45).** No mention of UTC or GMT.
- **Phone numbers with +977** as the country code.

---

## 12. Performance Plan

### 12.1 Core Web Vitals Targets

| Metric                              | Target     | Critical Threshold |
| ----------------------------------- | ---------- | ------------------ |
| **LCP** (Largest Contentful Paint)  | < 1.8s     | < 2.5s             |
| **INP** (Interaction to Next Paint) | < 150ms    | < 200ms            |
| **CLS** (Cumulative Layout Shift)   | < 0.05     | < 0.1              |
| **TTFB** (Time to First Byte)       | < 400ms    | < 800ms            |
| **TBT** (Total Blocking Time)       | < 150ms    | < 300ms            |
| **Bundle JS (first load)**          | < 150KB gz | < 250KB gz         |
| **Bundle CSS (first load)**         | < 50KB gz  | < 100KB gz         |

### 12.2 Bundle Strategy

- **Route splitting:** every page is its own chunk. Landing, dashboard, scoring each < 100KB gz.
- **Vendor splitting:** react, motion, forms, recharts in separate vendor chunks. Cache aggressively.
- **Feature splitting:** scoring, brackets, analytics are dynamic imports. Only loaded when user navigates there.
- **No barrel files** (`index.ts` re-exports) for production-critical imports — tree-shaking loses efficiency.

### 12.3 Image Strategy

- **Format:** WebP (primary), AVIF (modern browsers), JPEG fallback.
- **Sizes:** 1x, 2x (retina). Use `<picture>` with `srcset`.
- **Loading:** `loading="lazy"` (default), `loading="eager"` for above-fold only.
- **Decoding:** `decoding="async"` always.
- **CDN:** all images served from a CDN with `Cache-Control: public, max-age=31536000, immutable`.

### 12.4 Font Strategy

- **Self-host** all 3 font families (Inter, Cormorant Garamond, Noto Sans Devanagari).
- **Variable fonts** to reduce file count.
- **Subset:** Latin-only for default landing, Devanagari added when NE locale is active.
- **Preload** the font files in `<head>` with `rel="preload" as="font" type="font/woff2" crossorigin`.
- **`font-display: swap`** to prevent FOIT.

### 12.5 JavaScript

- **No runtime CSS-in-JS.** Tailwind compiled at build time.
- **Memo where it matters:** chart components, large lists. Use `React.memo`, `useMemo`, `useCallback` judiciously.
- **Virtualize long lists** (news feed, member directory) with `react-virtuoso` or `react-window`.
- **Debounce search input** (300ms).
- **Throttle scroll handlers.**
- **No `useEffect` chains** that trigger cascading renders.

### 12.6 Network

- **HTTP/2** or HTTP/3 enabled.
- **Brotli compression** for text (HTML, CSS, JS, JSON, SVG).
- **Service worker** for offline shell, cache-first for static assets.
- **Prefetch** next-likely-route on hover (Cmd-K opens, dashboard sidebar items prefetch).
- **No third-party scripts on landing.** Analytics deferred to post-LCP.

### 12.7 Build

- **Terser** for minification, **esbuild** for transpilation, **SWC** for React.
- **Tree-shaking** enabled, side effects marked explicitly.
- **Source maps** in production for error tracking, hidden from bundle.
- **Bundle analyzer** run on every PR; alerts if any chunk grows > 5%.

---

## 13. Accessibility Plan

### 13.1 Compliance Target

**WCAG 2.2 Level AA** as the minimum. AAA where achievable (text contrast, no timeouts).

### 13.2 Perceivable

**Color contrast:**

- Body text: 4.5:1 minimum (AA), 7:1 target (AAA).
- Large text (24px+): 3:1 minimum.
- UI components: 3:1 for borders, focus rings, icons.
- All combinations tested in **both** light and dark mode.

**Don't rely on color alone:** status indicators always pair color with icon or text (e.g., red dot + "Live" label).

**Text alternatives:**

- All images have `alt` text. Decorative images have `alt=""`.
- Icons used as buttons have `aria-label`.
- Charts have data tables or descriptions.

**Responsive text:** text reflows at 320px width without horizontal scroll, except for data tables (which can horizontal-scroll with sticky first column).

### 13.3 Operable

**Keyboard:**

- All interactive elements reachable via Tab.
- Focus order matches visual order.
- Skip link at top of every page: "Skip to main content".
- Command palette as keyboard-first navigation.
- Modal focus trap, return focus to trigger on close.
- Dropdown menus: arrow keys to navigate, Enter to select, Esc to close.

**Focus visible:**

- 2px `--brand-primary` focus ring, 2px offset.
- Never `outline: none` without a replacement.
- Focus ring respects `prefers-contrast: more` (thicker ring).

**Touch targets:**

- 44px minimum (Apple HIG), 48px for primary actions.
- 8px minimum spacing between adjacent touch targets.

**Pointer:**

- All clickable elements have `cursor-pointer`.
- Hover states distinct from focus states.
- No essential interaction depends on hover.

### 13.4 Understandable

**Language:** `<html lang="en">` (or `lang="ne"` when NE active).

**Predictable:** navigation is consistent across pages, modal patterns are consistent, no surprise pop-ups or auto-redirects.

**Input assistance:**

- Form errors: descriptive text, suggest fix, near the field.
- Required fields marked.
- Confirmation step for destructive actions.
- Search results announced via `aria-live`.

### 13.5 Robust

**Semantic HTML:**

- `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` used correctly.
- Heading hierarchy: one `<h1>` per page, no skipped levels.
- Lists use `<ul>`, `<ol>`, `<dl>`.
- Tables use `<thead>`, `<tbody>`, `<th scope>`.
- Buttons are `<button>`, links are `<a>`.

**ARIA:**

- Modals: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
- Live regions: `aria-live="polite"` for status, `aria-live="assertive"` for errors.
- Expandable: `aria-expanded`, `aria-controls`.
- Forms: `aria-invalid`, `aria-describedby` for errors.
- Tabs: `role="tablist"`, `role="tab"`, `aria-selected`, arrow-key navigation.

### 13.6 Reduced Motion

- All animations wrapped in `prefers-reduced-motion: no-preference` media query.
- When reduced motion is requested:
  - **No** entrance animations (fade-in, slide-up, scale).
  - **No** scroll-driven animations.
  - **No** autoplay video or animated backgrounds.
  - **No** pulse/ping animations on live badges (static red dot instead).
  - **No** parallax.
  - **Yes** to state-change transitions under 100ms (color, opacity).
  - **Yes** to functional motion (modal close, dropdown).

### 13.7 Testing

- **Automated:** axe-core on every PR via Playwright.
- **Manual:** NVDA on Windows, VoiceOver on Mac, TalkBack on Android (quarterly).
- **Keyboard-only:** quarterly audit of every page.
- **Color contrast:** automated on every PR, manual for brand colors.
- **Reduced motion:** tested on macOS and iOS.

---

## 14. Conversion & Trust Strategy

KhelSetu is a B2B operations tool with B2C-style marketing. Conversion is about trust, not urgency.

### 14.1 CTA Hierarchy

Every page has a **primary conversion goal** (sign up, start tournament, contact) and **secondary** actions. CTAs follow a hierarchy:

1. **Hero CTA** (most prominent, 1 primary + 1 secondary).
2. **Mid-page CTA** (after value is established, 1 primary).
3. **Pre-footer CTA** (final push, 1 primary).
4. **Sticky CTA** (mobile only, appears on scroll-up after hero, 1 primary).
5. **Inline CTAs** (within content, contextual, "Start a cricket tournament" inside the cricket section).

**Rule:** never two primary CTAs visible at the same scroll position. Secondary + primary is OK. Two primaries is not.

### 14.2 Social Proof

**Forms of proof used:**

- **Numbered trust:** "500+ clubs in Nepal", "1,200+ tournaments run". Specific, not vanity.
- **Testimonials:** real organizers, real names, real clubs. Photo + name + role + club + 1 quote.
- **Logo strip:** partner schools, federations, sponsors.
- **Case studies:** 1 deep case study per major feature, with metrics.
- **"Used by" callouts:** in the dashboard, "12 organizers in Pokhara used this template last month".

**Forms NOT used:**

- ❌ Fake "as seen in" press logos.
- ❌ Generic "trusted by millions" claims.
- ❌ Unverified user counts.
- ❌ Stock photo testimonials.

### 14.3 Trust Signals

- **Pricing transparency:** all prices on the public pricing page. No "contact us for pricing".
- **Real screenshots:** every feature page shows a real screenshot from the actual product, not a wireframe.
- **Real data:** stat counters show real numbers, not "10K+" padding.
- **Refund policy:** visible in footer, in plain English (and Nepali).
- **Privacy:** GDPR-aligned data handling, local data residency (Nepal region).
- **Security:** SSL badge in footer, 2FA on all organizer accounts.
- **Contact:** real email, real phone, real office address (not just a contact form).

### 14.4 Friction Reduction

- **Free tier:** Starter is genuinely free, no credit card, no trial countdown.
- **No popups:** no "subscribe to newsletter" modal, no "install our app" prompt.
- **Short forms:** 3 fields max for sign-up (email, password, organization name).
- **Single-page sign-up:** no multi-step wizard for the initial signup. Onboarding checklist comes after.
- **No required phone number** at signup. Email + password is enough.
- **One-click social sign-in:** Google. (Apple and Facebook are roadmap.)
- **Persistent cart / draft:** tournament creation saves draft automatically, no "you'll lose your work" warning.

### 14.5 Onboarding (Post-Signup)

**3-step setup:**

1. **Organization:** name, sport, district, contact. (Pre-filled if signed up via Google.)
2. **First tournament:** name, format, dates. (Optional, can skip.)
3. **Invite team:** add at least one team manager. (Optional, can skip.)

**After signup:**

- Onboarding checklist in dashboard (see §9.10.8).
- Email sequence: Day 0 welcome, Day 2 "create your first tournament", Day 7 "your team is waiting".
- Empty states always have a CTA, never just "no data".

---

## 15. Pre-Delivery Checklist

Run this checklist on **every** page before marking it complete.

### 15.1 Visual Quality

- [ ] No emoji used as icons (all icons from Lucide or custom SVG).
- [ ] All icons same size within a visual group.
- [ ] Brand colors come from semantic tokens (`bg-brand-primary`), not raw hex.
- [ ] Hover states don't cause layout shift (no scale transforms on cards).
- [ ] Light and dark mode both tested, both look intentional.
- [ ] Borders visible in both modes (no `border-white/10` on light backgrounds).
- [ ] Glass/transparent elements have ≥ 80% opacity in light mode.
- [ ] No `text-balance` failures (long headlines don't break awkwardly).
- [ ] No `transition-all` (use specific properties).

### 15.2 Interaction

- [ ] All clickable elements have `cursor-pointer`.
- [ ] All hover states have transition (150-300ms).
- [ ] All focus states visible (2px maroon ring).
- [ ] All buttons keyboard-reachable (Tab order logical).
- [ ] No hover-only essential interactions.
- [ ] Touch targets ≥ 44px on mobile.

### 15.3 Layout

- [ ] Works at 360px, 768px, 1024px, 1440px.
- [ ] No horizontal scroll on mobile (except data tables, with sticky first column).
- [ ] Sticky elements don't overlap content.
- [ ] Container widths consistent (`max-w-7xl` default).
- [ ] No content hidden behind fixed navbars.
- [ ] Page padding matches gutter tokens.

### 15.4 Accessibility

- [ ] Color contrast 4.5:1 body text, 3:1 large text, 3:1 UI components.
- [ ] All images have alt text (or `alt=""` if decorative).
- [ ] All form inputs have labels.
- [ ] All icons-as-buttons have `aria-label`.
- [ ] Headings follow hierarchy (one h1, no skipped levels).
- [ ] Modals trap focus, return focus on close.
- [ ] `prefers-reduced-motion: reduce` disables all non-essential motion.
- [ ] `prefers-contrast: more` increases border weights and focus rings.
- [ ] Tested with keyboard only.
- [ ] Tested with NVDA / VoiceOver / TalkBack.

### 15.5 Performance

- [ ] First load < 200KB JS gzipped.
- [ ] LCP < 2.5s on simulated 3G.
- [ ] CLS < 0.1.
- [ ] All images lazy-loaded (except above-fold hero).
- [ ] All fonts preloaded and `font-display: swap`.
- [ ] No render-blocking third-party scripts.
- [ ] No `useEffect` chains causing cascading renders.
- [ ] Long lists virtualized (if applicable).

### 15.6 Nepal-Specific

- [ ] All copy has EN and NE keys.
- [ ] All prices in NPR.
- [ ] All phone numbers +977.
- [ ] All times in NPT (UTC+5:45).
- [ ] Payment methods include eSewa, Khalti, Fonepay, ConnectIPS, bank transfer.
- [ ] Tested on low-end Android (Moto E or similar).
- [ ] Tested on simulated 3G.
- [ ] Devanagari text tested with proper `lang="ne"` and font features.

### 15.7 Conversion

- [ ] Each page has a clear primary CTA.
- [ ] Primary CTA appears in hero, mid-page, and pre-footer.
- [ ] No two primary CTAs visible at the same scroll position.
- [ ] All CTAs action-oriented ("Start tournament", not "Learn more").
- [ ] Trust signals visible (testimonials, stats, partner logos).
- [ ] Empty states have CTAs.
- [ ] No fake urgency ("Only 3 spots left!").

---

## 16. What Replaces What

| v1 (current system)                                                              | v2 (this brief)                                  | Why                                                    |
| -------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------ |
| Blue / indigo / emerald                                                          | Maroon / navy / gold                             | Brand alignment with Nepali sports + premium authority |
| Vibrant & Block-based                                                            | Quiet Authority (Exaggerated Minimalism + Trust) | Brief specifies premium, not energetic                 |
| Display font: Space Grotesk                                                      | Display font: Cormorant Garamond                 | Editorial authority, premium feel                      |
| 4 sports (cricket, football, volleyball, basketball)                             | Same 4 sports (kabaddi excluded)                 | Brief asked to skip kabaddi                            |
| en/ne/hi roadmap, en-only ship                                                   | en-NP + ne, both must ship complete              | Brief requires bilingual                               |
| Inter for UI                                                                     | Inter for UI (kept)                              | Best UI legibility                                     |
| EN-only date format                                                              | EN/NE, AD dates, BS roadmap                      | Local relevance                                        |
| Stripe-shaped billing                                                            | eSewa / Khalti / Fonepay / ConnectIPS / bank     | Brief requires Nepal payment methods                   |
| Heavy SPA, 370KB JS                                                              | < 150KB JS first load                            | Brief requires low-bandwidth support                   |
| 7 pages (landing, dashboard, scoring, bracket, OBS overlay, auth, design system) | 10 pages (full IA from brief)                    | Brief requires full IA coverage                        |
| No command palette                                                               | Command palette (Cmd/Ctrl-K)                     | Power-user productivity                                |
| English-only content                                                             | Bilingual content                                | Bilingual is mandatory                                 |
| Devanagari roadmap                                                               | NE locale ships v2.0                             | Brief requires NE at launch                            |

---

## Appendix A — Quick Reference: Tailwind Token Map

```ts
// tailwind.config.ts (mapping)
colors: {
  // Brand
  'brand-primary': 'var(--brand-primary)',
  'brand-primary-hover': 'var(--brand-primary-hover)',
  'brand-primary-soft': 'var(--brand-primary-soft)',
  'brand-secondary': 'var(--brand-secondary)',
  'brand-secondary-soft': 'var(--brand-secondary-soft)',
  'brand-accent': 'var(--brand-accent)',
  'brand-accent-soft': 'var(--brand-accent-soft)',
  // Surface
  canvas: 'var(--bg-canvas)',
  surface: 'var(--bg-surface)',
  'surface-raised': 'var(--bg-surface-raised)',
  'surface-sunken': 'var(--bg-surface-sunken)',
  // Text
  ink: 'var(--text-primary)',
  muted: 'var(--text-secondary)',
  subtle: 'var(--text-tertiary)',
  // Functional
  live: 'var(--color-live)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  danger: 'var(--color-danger)',
  info: 'var(--color-info)',
  // Sport
  'sport-cricket': 'var(--sport-cricket)',
  'sport-football': 'var(--sport-football)',
  'sport-volleyball': 'var(--sport-volleyball)',
  'sport-basketball': 'var(--sport-basketball)',
},
fontFamily: {
  display: ['"Cormorant Garamond"', 'serif'],
  sans: ['"Inter"', 'system-ui', 'sans-serif'],
  devanagari: ['"Noto Sans Devanagari"', 'sans-serif'],
},
borderRadius: {
  none: '0',
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
},
boxShadow: {
  xs: 'var(--shadow-xs)',
  sm: 'var(--shadow-sm)',
  DEFAULT: 'var(--shadow-sm)',
  md: 'var(--shadow-md)',
  lg: 'var(--shadow-lg)',
  xl: 'var(--shadow-xl)',
  brand: 'var(--shadow-brand)',
  gold: 'var(--shadow-gold)',
},
transitionDuration: {
  instant: '100ms',
  fast: '180ms',
  DEFAULT: '240ms',
  base: '240ms',
  slow: '400ms',
  page: '500ms',
},
```

## Appendix B — Component Mapping (Current → v2)

| v1 Component                                 | v2 Component                                   | Changes                     |
| -------------------------------------------- | ---------------------------------------------- | --------------------------- |
| `<Button variant="primary">` (blue gradient) | `<Button variant="primary">` (maroon gradient) | Token swap                  |
| `<Button variant="cta">` (orange)            | `<Button variant="gold">` (gold)               | Rename + token swap         |
| `<Card>`                                     | `<Card>` (kept)                                | Token-driven, same API      |
| `<Card variant="glass">`                     | `<Card variant="glass">` (kept)                | Token swap, more opaque     |
| `<Badge variant="live">` (red)               | `<Badge variant="live">` (red, kept)           | Darker red for AA           |
| `<Badge variant="premium">` (gold)           | `<Badge variant="gold">` (renamed)             | Token swap                  |
| `<CommandPalette>` (cmdk)                    | `<CommandPalette>` (kept)                      | Updated items to use new IA |
| `<Sidebar>`                                  | `<Sidebar>` (kept)                             | Updated nav groups          |
| `<MobileTabBar>`                             | `<MobileTabBar>` (kept)                        | Updated items               |
| `OnboardingChecklist`                        | `OnboardingChecklist` (kept)                   | Token-driven                |
| `EmptyState`                                 | `EmptyState` (kept)                            | Token-driven                |
| `RelativeTime`                               | `RelativeTime` (kept)                          | Token-driven                |
| `Skeleton`                                   | `Skeleton` (kept)                              | Token-driven                |
| `Toast` (with action)                        | `Toast` (with action)                          | Token-driven                |

## Appendix C — File Organization

```
design-system/
├── README.md                          ← existing
└── khelsetu/
    ├── MASTER.md                      ← UPDATE: maroon/navy/gold tokens
    ├── DESIGN-BRIEF.md                ← THIS FILE
    └── pages/
        ├── landing.md                 ← UPDATE: new hero, pricing, FAQ
        ├── about.md                   ← NEW
        ├── services.md                ← NEW
        ├── teams.md                   ← NEW (public + detail)
        ├── schedules.md               ← NEW (public + match detail)
        ├── membership.md              ← NEW (public + app/billing)
        ├── news.md                    ← NEW (public + app/cms)
        ├── contact.md                 ← NEW
        ├── auth.md                    ← UPDATE: trust & authority style
        ├── dashboard.md               ← UPDATE: new summary cards, chart
        ├── scoring.md                 ← UPDATE: token-driven
        ├── tournament-bracket.md      ← UPDATE: token-driven
        └── live-broadcast-overlay.md  ← UPDATE: token-driven
```

---

**End of Brief.**

This document is the **source of truth** for KhelSetu v2.0. Any UI work in the codebase that contradicts this brief is wrong. When in doubt, refer here.

> "Quiet authority. Built in Nepal. For the local clubs that make Nepali sports what it is."
