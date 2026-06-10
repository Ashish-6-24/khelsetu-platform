# Design System Master — KhelSetu

> **LOGIC:** When building a specific page, first check `design-system/khelsetu/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** KhelSetu — Production-grade multi-tenant sports tournament management platform for Nepal
**Stack:** React 19 + Vite 8 + TypeScript 6 + Tailwind CSS v4 + Framer Motion + Recharts
**Generated:** 2026-06-05
**Category:** Sports Team/Club + Real-Time Monitoring Dashboard (multi-tenant B2B SaaS)

---

## 1. Product Profile

| Attribute | Value |
|---|---|
| **Product type** | B2B SaaS — Sports tournament management (cricket, football, volleyball, basketball) |
| **Target audience** | Tournament organizers, scorekeepers, team managers, broadcasters (Nepal-first, multi-lang: en/ne/hi) |
| **Core surfaces** | Dashboard, Scoring (live), Brackets, Standings, Analytics, Live Broadcast Overlay (OBS), Billing, Admin |
| **Tone keywords** | Energetic, real-time, professional, trustworthy, action-focused |
| **Density** | Data-dense on dashboards; spacious on landing/auth |

---

## 2. Style Direction

**Primary style:** **Vibrant & Block-based + Motion-Driven** (from `Sports Team/Club` product reasoning rule)
**Dashboard style:** **Data-Dense + Real-Time Monitoring** (IoT/Analytics reasoning rule)
**Landing style:** **Hero-Centric + Social Proof** (lead-gen for organizers)
**Auth style:** **Minimalism + Trust & Authority**

Best for: high-energy sports, real-time updates, multi-tenant data display, professional organizers.

---

## 3. Color System

### 3.1 Brand Palette (semantic tokens)

Define these in `src/styles/themes.css` as CSS variables and consume via Tailwind theme extension. Do **not** use raw hex in components.

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--color-primary` | `#2563EB` (blue-600) | `#3B82F6` (blue-500) | Primary actions, brand, active nav |
| `--color-primary-hover` | `#1D4ED8` (blue-700) | `#60A5FA` (blue-400) | Hover state of primary |
| `--color-primary-soft` | `#EFF6FF` (blue-50) | `#1E3A8A/20` (blue-900/20) | Selected/active backgrounds, soft chips |
| `--color-accent` | `#10B981` (emerald-500) | `#34D399` (emerald-400) | "Live" state, success, growth |
| `--color-accent-live` | `#EF4444` (red-500) | `#F87171` (red-400) | LIVE pulse, recording, urgent |
| `--color-warning` | `#F59E0B` (amber-500) | `#FBBF24` (amber-400) | Warnings, pending states |
| `--color-danger` | `#DC2626` (red-600) | `#F87171` (red-400) | Destructive actions, errors |
| `--color-success` | `#16A34A` (green-600) | `#4ADE80` (green-400) | Confirmations, positive deltas |
| `--color-info` | `#0EA5E9` (sky-500) | `#38BDF8` (sky-400) | Informational badges, links |
| `--color-cta` | `#F97316` (orange-500) | `#FB923C` (orange-400) | High-emphasis CTA on landing |

### 3.2 Surface & Text Tokens

| Token | Light | Dark | Notes |
|---|---|---|---|
| `--bg-primary` | `#FFFFFF` | `#0B1220` | Page background |
| `--bg-secondary` | `#F9FAFB` (gray-50) | `#111827` (gray-900) | Sidebar, raised surfaces |
| `--bg-tertiary` | `#F3F4F6` (gray-100) | `#1F2937` (gray-800) | Cards, modals |
| `--bg-elevated` | `#FFFFFF` + `shadow-md` | `#1F2937` + `shadow-lg` | Floating elements |
| `--text-primary` | `#111827` (gray-900) | `#F9FAFB` (gray-50) | Body, headings — must hit 4.5:1 |
| `--text-secondary` | `#4B5563` (gray-600) | `#D1D5DB` (gray-300) | Captions, helper text — 4.5:1 |
| `--text-tertiary` | `#6B7280` (gray-500) | `#9CA3AF` (gray-400) | Disabled/placeholder — 3:1 OK |
| `--text-on-primary` | `#FFFFFF` | `#FFFFFF` | Text on primary buttons — 4.5:1+ |
| `--border-subtle` | `#E5E7EB` (gray-200) | `#374151` (gray-700) | Dividers, card borders |
| `--border-strong` | `#D1D5DB` (gray-300) | `#4B5563` (gray-600) | Form borders |

### 3.3 Sport-Specific Accents (optional, for team-color UI)

| Token | Hex | Use |
|---|---|---|
| `--sport-cricket` | `#F59E0B` | Cricket mode tint |
| `--sport-football` | `#16A34A` | Football mode tint |
| `--sport-volleyball` | `#0EA5E9` | Volleyball mode tint |
| `--sport-basketball` | `#EA580C` | Basketball mode tint |

### 3.4 Gradients (use sparingly, for primary CTAs & brand)

- **Primary gradient:** `from-blue-600 to-indigo-600` (hover: `from-blue-700 to-indigo-700`) — used in primary `<Button>`
- **Premium gradient:** `from-amber-400 to-orange-500` — only for `<Badge variant="premium">`
- **Live gradient:** `from-red-500 to-rose-600` — only for LIVE indicators
- **Score number gradient:** `from-blue-600 to-cyan-500` — large stat numbers

### 3.5 Color Usage Rules

- ✅ **Always** use semantic tokens (`bg-primary`, `text-secondary`)
- ❌ **Never** use raw hex in components (`bg-[#3b82f6]`)
- ❌ **Never** use emoji as icons (use Lucide)
- ❌ **Never** convey meaning with color alone (always pair with icon or text)
- 🎨 Test all combinations in **both** light and dark mode independently

---

## 4. Typography

### 4.1 Font Stack

```css
/* index.html — preload + display=swap */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

| Role | Family | Weights | Notes |
|---|---|---|---|
| **Headings** | `Space Grotesk` | 500, 600, 700 | Modern, slightly geometric — sports/tech feel |
| **Body** | `Inter` | 400, 500, 600 | Industry standard, excellent legibility |
| **Numbers/Stats** | `JetBrains Mono` | 400, 500 | Tabular figures for scores, timers, currency |
| **UI labels** | `Inter` | 500 | Buttons, badges, nav labels |

### 4.2 Type Scale (mobile-first)

| Token | Size | Line-height | Use |
|---|---|---|---|
| `text-xs` | 12px | 1.5 | Badges, micro-labels |
| `text-sm` | 14px | 1.5 | Body small, helper text |
| `text-base` | 16px | 1.6 | Body default (min 16px to avoid iOS auto-zoom) |
| `text-lg` | 18px | 1.5 | Card titles, lead text |
| `text-xl` | 20px | 1.4 | Section titles |
| `text-2xl` | 24px | 1.3 | Page H2 |
| `text-3xl` | 30px | 1.25 | Page H1 (mobile) |
| `text-4xl` | 36px | 1.2 | Landing hero mobile |
| `text-5xl` | 48px | 1.15 | Stat numbers (scoreboards) |
| `text-6xl` | 60px | 1.1 | Landing hero desktop, big counters |
| `text-7xl` | 72px | 1.0 | Live broadcast overlay (only in OBS pages) |

### 4.3 Rules

- ✅ Minimum 16px body text on mobile (avoids iOS auto-zoom)
- ✅ Use `font-display: swap` to prevent FOIT
- ✅ Preload only `Inter 400/600` and `Space Grotesk 600`
- ✅ Use `font-variant-numeric: tabular-nums` for all scoreboards, timers, currency
- ❌ No font-size below 12px
- ❌ Don't use `letter-spacing` tighter than -0.02em on body

---

## 5. Spacing & Layout

### 5.1 Spacing Scale (4pt grid)

Use Tailwind defaults but **enforce** this rhythm:

| Token | Value | Usage |
|---|---|---|
| `1` | 4px | Icon-to-text micro gap |
| `2` | 8px | Tight stack (icon + label) |
| `3` | 12px | Component internal padding |
| `4` | 16px | Card padding (default), section gap (small) |
| `6` | 24px | Section gap (medium) |
| `8` | 32px | Major section break |
| `12` | 48px | Hero gap, page top |
| `16` | 64px | Landing page hero top |
| `20` | 80px | Landing page section gap |
| `24` | 96px | Landing page footer gap |

### 5.2 Layout Tokens

- **Container max-width:** `max-w-7xl` (1280px) for dashboards; `max-w-6xl` for landing; `max-w-md` for auth
- **Sidebar width:** `256px` expanded, `80px` collapsed
- **Header height:** `64px`
- **Card radius:** `rounded-2xl` (16px) primary, `rounded-xl` (12px) secondary, `rounded-lg` (8px) inputs
- **Touch target minimum:** `min-h-[44px]` (Apple) / `min-h-[48px]` (Material) — use `min-h-11` Tailwind utility
- **z-index scale:** `0` base, `10` dropdown, `20` sticky, `30` overlay, `40` header, `50` modal, `60` toast, `9999` skip-link

### 5.3 Breakpoints (mobile-first)

```
sm:  640px   — small tablet portrait
md:  768px   — tablet portrait
lg:  1024px  — tablet landscape / small laptop (sidebar appears)
xl:  1280px  — desktop
2xl: 1536px  — large desktop
```

### 5.4 Responsive Rules

- ✅ Design mobile-first, scale up
- ✅ `min-h-dvh` (not `100vh`) for full-height pages
- ✅ Sidebar `hidden lg:flex` (need mobile drawer — see backlog)
- ❌ No fixed `px` widths on containers
- ❌ No horizontal scroll on mobile
- ❌ Never disable zoom — keep `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

---

## 6. Elevation (Shadows)

| Token | Class | Use |
|---|---|---|
| **e0** | none | Inline elements |
| **e1** | `shadow-sm` | Inputs, list rows |
| **e2** | `shadow-md` | Cards at rest |
| **e3** | `shadow-lg` | Cards hover, dropdowns |
| **e4** | `shadow-xl` | Modals, popovers |
| **e5** | `shadow-2xl` | Large dialogs, broadcast overlay frames |
| **glow** | `shadow-lg shadow-blue-500/25` | Primary CTA glow |
| **glow-live** | `shadow-lg shadow-red-500/30` | LIVE indicator |

**Rule:** Use one elevation level per surface. Don't stack shadows.

---

## 7. Motion

### 7.1 Duration Tokens (from ui-ux-pro-max §7)

| Token | Value | Use |
|---|---|---|
| `duration-fast` | 150ms | Hover, small state changes |
| `duration-base` | 200ms | Default for most UI |
| `duration-slow` | 300ms | Page transitions, modals |
| `duration-slower` | 400ms | Hero animations, complex reveals |
| `duration-slowest` | 500ms | Loading bars, progress fill |

### 7.2 Easing

- **Entry:** `ease-out` or spring (stiffness 260, damping 20)
- **Exit:** `ease-in` (60–70% of entry duration)
- **Layout:** spring (stiffness 200, damping 25)
- ❌ Avoid `linear` for UI transitions

### 7.3 Transform-Only Animations

- ✅ Animate `transform` (translate, scale, rotate) and `opacity` only
- ❌ Never animate `width`, `height`, `top`, `left` (causes reflow)
- ✅ Use `whileTap={{ scale: 0.97 }}` for press feedback
- ✅ Use `whileHover={{ scale: 1.02 }}` for cards/buttons (subtle)

### 7.4 Reduced Motion

**MANDATORY:** Wrap all `framer-motion` components in `useReducedMotion()` check from `src/features/accessibility/hooks/index.ts`. If reduced motion is preferred, replace with instant transitions.

### 7.5 Animation Library

- **Framer Motion** for all React animations
- **CSS keyframes** (in `src/styles/animations.css`) for: `pulse` (LIVE dot), `spin` (loader), `fadeIn`, `slideIn`
- **Stagger** lists: 30–50ms per item via `StaggerContainer`/`StaggerItem`

---

## 8. Touch & Interaction

- **Minimum touch target:** 44×44px (use `min-h-11 min-w-11` or `p-3` for icon buttons)
- **8px minimum gap** between adjacent touch targets
- **Loading feedback:** `isLoading` prop on `<Button>` shows spinner + disables click
- **Press feedback:** scale 0.95–0.97 on tap, 200ms ease-out
- **Hover feedback:** scale 1.02 + bg shift, 150ms
- **Disabled state:** `opacity-50` + `cursor-not-allowed` + `disabled` attribute
- **Touch delay:** add `touch-action: manipulation` to interactive elements (eliminates 300ms tap delay)

---

## 9. Forms

- **Labels:** Always visible, above the field. **Never** placeholder-only.
- **Required indicator:** Red asterisk `*` after label
- **Error placement:** Below the field, red-600/red-400 (dark)
- **Helper text:** Below the field, gray-500 (4.5:1)
- **Validation:** On blur (not keystroke), Zod schema via RHF
- **Submit feedback:** Loading spinner → success toast (3–5s) → redirect
- **Password fields:** Show/hide eye toggle
- **Input types:** Use semantic types (`email`, `tel`, `number`, `date`) for mobile keyboard
- **Autocomplete:** `autocomplete="email"`, `autocomplete="current-password"`, etc.
- **Focus management:** On submit error, auto-focus first invalid field
- **Toast position:** Bottom-right (desktop), top-full-width (mobile)

---

## 10. Accessibility (WCAG 2.1 AA target)

- ✅ SkipLink wired into every layout → `id="main-content"` on `<main>`
- ✅ All interactive elements keyboard-reachable in visual order
- ✅ Focus rings: `focus:ring-2 focus:ring-blue-500 focus:ring-offset-2` on all focusable
- ✅ `aria-current="page"` on active nav link
- ✅ `aria-live="polite"` for non-critical updates, `assertive` for errors
- ✅ `aria-invalid` + `aria-describedby` on form errors
- ✅ `aria-label` on icon-only buttons (e.g., close, delete, mark-read)
- ✅ All images have `alt` (empty `alt=""` for decorative)
- ✅ Color contrast 4.5:1 normal text, 3:1 large text (18px+ bold or 24px+)
- ✅ `prefers-reduced-motion` respected in all animations
- ✅ `prefers-color-scheme` supported (light default, dark via class toggle)
- ✅ Modal: focus trap, Escape to close, body scroll lock, focus restoration
- ✅ Headings sequential: no `<h3>` without `<h2>` before
- ❌ Never disable focus rings (`focus:outline-none` only if replaced)

---

## 11. Navigation Patterns

- **Desktop (≥lg):** Persistent left sidebar (256px, collapsible to 80px) + sticky top header
- **Mobile (<lg):** Bottom tab bar (max 5 top-level items) + hamburger drawer — **MISSING, see backlog**
- **Active state:** `bg-primary-soft text-primary` with left border indicator
- **Search:** Top bar, accessible via `/` keyboard shortcut
- **Back behavior:** Browser back preserved (no `replace`滥用)
- **Deep linking:** All routes reachable via URL
- **Logout:** In user menu dropdown (top-right), never in main nav
- **Breadcrumbs:** For 3+ level deep (e.g., Tournament → Match → Scoring)

---

## 12. Data Display (Charts)

- **Library:** **Recharts** (installed) — replace custom SVGs in `src/components/charts/`
- **Color guidance:** Use semantic tokens, never red/green alone (add icon/pattern)
- **Pattern:** Pair color with line-dash or dot-pattern for colorblind users
- **Legend:** Always visible, clickable to toggle series
- **Tooltip:** On hover (desktop) / tap (mobile) showing exact value
- **Empty state:** "No data yet" + helpful action, never blank axis
- **Loading:** Skeleton placeholder matching chart shape
- **Number formatting:** Locale-aware via `Intl.NumberFormat` (`en-NP` for NPR currency)
- **Live data:** Use `useReducedMotion` to disable entrance animation on update

---

## 13. Components Inventory

| Component | Path | Notes |
|---|---|---|
| Button | `src/components/ui/Button.tsx` | ✅ 6 variants, 5 sizes, loading state, motion |
| Card | `src/components/ui/Card.tsx` | ✅ 3 sub-components, hover, glass variant |
| Input | `src/components/ui/Input.tsx` | ✅ Label, error, helper, icons |
| Select | `src/components/ui/Select.tsx` | ✅ Native select, label, error |
| Modal | `src/components/ui/Modal.tsx` | 🟡 Add focus trap |
| Toast | `src/components/ui/Toast.tsx` | 🟡 Replace unicode icons with Lucide |
| Badge | `src/components/ui/Badge.tsx` | ✅ 7 variants, pulse option |
| Progress | `src/components/ui/Progress.tsx` | ✅ 4 sizes, 4 variants |
| Skeleton | `src/components/ui/Skeleton.tsx` | ✅ 3 variants |
| Sidebar | `src/components/navigation/Sidebar.tsx` | 🟡 Add aria-current |
| Header | `src/components/navigation/Header.tsx` | 🟡 Logout in menu, not plain button |
| Animations | `src/components/animations/index.tsx` | 🟡 Wire useReducedMotion |

---

## 14. Pre-Delivery Checklist (run before merge)

### Visual
- [ ] No emoji as icons (all SVG Lucide)
- [ ] Semantic tokens used (no raw hex)
- [ ] Tested in both light and dark mode
- [ ] Text contrast 4.5:1 verified
- [ ] Borders/dividers visible in both modes
- [ ] Press states don't shift layout

### Interaction
- [ ] Touch targets ≥44×44px
- [ ] Tap feedback within 100ms
- [ ] Loading state on all async actions
- [ ] Disabled state visually + semantically clear
- [ ] Keyboard tab order matches visual order
- [ ] No gesture conflicts

### Animation
- [ ] Duration 150–300ms
- [ ] Easing `ease-out` for entry, `ease-in` for exit
- [ ] Transform-only (no width/height anim)
- [ ] `useReducedMotion` respected
- [ ] Stagger 30–50ms

### Accessibility
- [ ] SkipLink works
- [ ] All images have alt
- [ ] All icon buttons have aria-label
- [ ] Forms have visible labels
- [ ] Color not only indicator
- [ ] Modals have focus trap + escape

### Responsive
- [ ] 375px (small phone)
- [ ] 768px (tablet portrait)
- [ ] 1024px (tablet landscape)
- [ ] 1440px (desktop)
- [ ] No horizontal scroll
- [ ] Safe area padding (iOS)

### Performance
- [ ] Images have width/height (no CLS)
- [ ] Lazy load below-fold images
- [ ] No layout shift on font load
- [ ] Code split by route/feature
- [ ] Debounce search/scroll/resize

---

## 15. Open Backlog (from audit)

| Priority | Issue | Reference |
|---|---|---|
| 🔴 CRITICAL | Wire `SkipLink` into all layouts + add `id="main-content"` to `<main>` | `src/features/accessibility/components/SkipLink.tsx` |
| 🔴 CRITICAL | Replace emoji icons in `NotificationDropdown.tsx:19-25` with Lucide | `src/features/notifications/components/NotificationDropdown.tsx` |
| 🔴 CRITICAL | Add mobile nav (hamburger/drawer + bottom tab bar) | `src/components/navigation/Sidebar.tsx:134` |
| 🟠 HIGH | Enforce 44×44px touch targets on all icon buttons | `Header.tsx:48`, `NotificationItem.tsx:55-67` |
| 🟠 HIGH | Apply `useReducedMotion` in all animation primitives | `src/components/animations/index.tsx` |
| 🟠 HIGH | Add `aria-current="page"` on active Sidebar links | `src/components/navigation/Sidebar.tsx:178` |
| 🟠 HIGH | Add focus trap to Modal | `src/components/ui/Modal.tsx` |
| 🟠 HIGH | Add password toggle + autocomplete to Login/Register | `src/pages/auth/login/page.tsx` |
| 🟡 MEDIUM | Replace custom SVGs with Recharts + add legend/tooltip | `src/components/charts/index.tsx` |
| 🟡 MEDIUM | Preload Inter/Space Grotesk in `index.html` | `index.html` |
| 🟡 MEDIUM | Add `lang` attribute switching for ne/hi | `index.html:2` |
| 🟡 MEDIUM | Wire `useLiveAnnouncer` in app shell for route changes | `src/features/accessibility/hooks/index.ts` |

---

## 16. Usage

When asked to build a page or component, the AI MUST:

1. Read this Master file
2. Check `design-system/khelsetu/pages/[page-name].md` for overrides
3. Use semantic tokens (not raw hex)
4. Respect reduced motion
5. Hit WCAG AA contrast in both themes
6. Run the Pre-Delivery Checklist before marking complete
