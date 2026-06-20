# 25 — Responsive Experience

> See also: `research/mobile-first-responsive-research.md` for Nepal-specific
> data, touch target research, offline patterns, and performance budgets.

## 25.1 Breakpoint system

Standard Tailwind breakpoints, with product-named intents.

| Breakpoint | Min width | Intent | Primary surfaces |
|---|---|---|---|
| `xs` | 0 | Phone portrait | Public portal, scorer (mini) |
| `sm` | 640 | Phone landscape / phablet | Public portal |
| `md` | 768 | Small tablet | Scorer console (single-pane), dashboard read-only |
| `lg` | 1024 | Tablet landscape | Scorer console (dual-pane), dashboard |
| `xl` | 1280 | Laptop | Dashboard primary |
| `2xl` | 1536 | Desktop | Dashboard wide, overlay editing |
| `3xl` | 1920 | Studio / broadcast | Overlay 1080p preview |

**Nepal context**: 360px captures most Nepali budget phones (Samsung, Xiaomi,
Realme at 360x800). Design must be functional at 360px before responsive
enhancements. Target median: 6.5" screen, 1080x2400. Test floor: 1280x720,
4 GB RAM.

`prefers-color-scheme`, `prefers-reduced-motion`, and `prefers-contrast`
are honoured throughout. Container queries (`@container`, `@sm:`, `@md:`)
used for reusable components that appear in variable-width contexts.

## 25.2 Device postures

We don't just rely on width; the app reads device posture from a
`<DevicePostureProvider>`:

| Posture | Signal | Effect |
|---|---|---|
| `mobile-portrait` | width < 640 + portrait | Bottom nav, sheets |
| `mobile-landscape` | width < 900 + landscape | Compact topbar, side action panel |
| `tablet-portrait` | width 640–1024 + portrait | Dashboard cards 2-up, drawer-based detail |
| `tablet-landscape` | width 900–1366 + landscape | Scorer dual-pane, dashboard 3-up |
| `desktop` | width ≥ 1280 | Full dashboard |
| `large-desktop` | width ≥ 1920 | Wide overlay editor, broadcast tools |
| `overlay-render` | URL is `/overlay/:token` | No chrome, transparent, 1080p assumed |

## 25.3 Shell responsiveness

### Public shell
- **Desktop**: top nav (links + CTA), full-width hero, multi-column
  sections.
- **Tablet**: same as desktop with reduced padding.
- **Mobile**: hamburger nav, single-column, sticky bottom CTA on
  pricing.

### Dashboard shell
- **Desktop**: persistent left sidebar (240px) + topbar + content.
- **Tablet**: collapsible sidebar (icons only at 80px), topbar.
- **Mobile**: bottom nav (5 tabs: Home, Matches, Scoring, Notifications,
  More), topbar with org switcher; sidebar opens as a sheet.

### Scorer shell
- **Tablet landscape** (primary): score header + dual-pane (actions left,
  event log right).
- **Tablet portrait**: score header + actions, event log in a drawer.
- **Mobile**: score header (sticky) + scrollable event log + sticky
  bottom action grid.
- **Desktop**: rare — use tablet-landscape layout centered, max-w-1600.

### Overlay shell
- **Always**: 16:9 transparent canvas; safe-area aware; uses absolute
  positioning per template.

### Admin shell
- Desktop-only experience; mobile shows a "Switch to desktop" prompt.

## 25.4 Pattern adaptations

### Tables
- ≥ md: full table with all columns.
- < md: row collapses to card with primary fields + "View all" link.
- Sticky first column in horizontal scroll on tablet+ for wide tables.

### Forms
- ≥ lg: two-column for related fields.
- < lg: single column, full-width buttons.
- Bottom sheet for inline-edit on mobile.

### Filter bars
- ≥ md: inline chips and selects.
- < md: "Filters" button opens a left drawer.

### Modals
- ≥ md: centered modal.
- < md: bottom sheet (full-height for forms, partial for confirmations).

### Navigation
- Desktop: sidebar + topbar.
- Tablet: sidebar collapsed to icons, topbar.
- Mobile: bottom tab bar + topbar.

### Cards & grids
- 4-up on desktop, 3-up on laptop, 2-up on tablet, 1-up on mobile.

## 25.5 Scorer console specific

- **Sticky live score header** — always visible at the top regardless of
  scroll.
- **Quick action controls** — bottom sheet on mobile, right pane on
  tablet-landscape; one-tap (≥64px) targets.
- **Drawer-based forms on mobile** — wicket / goal / sub forms slide up
  from bottom; full-screen, swipe to dismiss.
- **Responsive tables** — event log collapses to compact rows on mobile
  with expandable details.
- **Collapsible filters** — filter chips collapse into a single "Filters"
  drawer on mobile.
- **Bottom nav** present on mobile for jumping between
  Lineup / Center / Events / Stats / Settings.
- **Fast touch interactions** — no long-press for primary actions; long-
  press reserved for secondary menus.

## 25.6 Public portal specific

- **Hero** — full-bleed on desktop, stacked on mobile.
- **Match cards** — 3-up desktop, 2-up tablet, 1-up mobile.
- **Live ticker** — horizontal scroll on mobile, marquee on desktop.
- **Standings table** — sticky first column on horizontal scroll.
- **Filter bar** — chips desktop, drawer mobile.
- **Sticky bottom CTA** on pricing / plan pages on mobile.

## 25.7 Broadcast overlay specific

- **Designed for 1920×1080**; safe zones at 5% edges.
- **Scales** with `transform: scale()` to 720p if requested via
  `?w=1280`.
- **Vertical layouts** (1080×1920) require dedicated templates flagged in
  the editor.

## 25.8 Offline / weak-network behaviour

- See §23. The UI must always be responsive even when the network is
  slow:
  - Skeletons appear within 100ms.
  - Optimistic updates within 200ms.
  - Banner appears within 5s of detecting offline.
  - Buttons never get stuck in a loading state — automatic timeout +
    retry pattern at 30s.

## 25.9 Sticky elements

- **Score header**: scorer console + public live page.
- **Connection banner**: top of every page when offline / failing.
- **Bottom action bar**: scorer console mobile.
- **Bottom nav**: dashboard mobile.
- **Filter bar**: above tables on tablet+ (sticky on scroll).
- **CTA bars**: pricing pages on mobile.

## 25.10 Touch & pointer

- Min **48×48 px** hit area for any interactive control (Material Design).
- Scorer buttons: **64×64 (mobile)**, **80×80 (tablet)** — Fitts's law: larger
  targets are faster to acquire during live scoring with one hand.
- **8px minimum spacing** between adjacent touch targets.
- Sliders / steppers: 48 px height on touch.
- `touch-action: manipulation` on all interactive elements (eliminates 300ms
  tap delay).
- Hover-only affordances forbidden; provide tap equivalent.
- `:focus-visible` styles for keyboard users; not shown on mouse click.
- `@media (any-pointer: coarse)` to increase targets for touchscreen users.
- Haptic feedback (`navigator.vibrate(10)`) on gesture completion, not every
  tap.

## 25.11 Performance budgets

**Nepal network reality**: Design for 4G under load (~3 Mbps, ~200ms latency).
Kathmandu fiber: 20-100 Mbps. Kathmandu 4G evenings: 1-5 Mbps. Tier-2 cities:
5-25 Mbps. Rural: 0.5-5 Mbps. A site that works at 3 Mbps works everywhere.

**Budget device**: V8 engine on budget Android runs JS 5-10x slower than
developer MacBook. DOM >1,500 nodes causes jank. Passive listeners mandatory.

| Surface | TTI (3G) | TTI (4G) | LCP target | Bundle |
|---|---|---|---|---|
| Public landing | < 4s | < 2s | < 2.5s | < 150KB |
| Public live score | < 3s | < 1.5s | < 2s | < 100KB |
| Dashboard home | < 4s | < 2s | < 2.5s | < 200KB |
| Scorer console | < 3s | < 1.5s | < 2s | < 150KB |
| Overlay | < 2s | < 1s | < 1.5s | < 50KB |

## 25.12 Testing matrix

- Browsers: Chrome (Stable), Safari (latest 2), Firefox (latest 2), Edge
  (latest).
- Devices to test on (minimum):
  - **Budget Android** (Tecno/Realme/Itel, 2-3 GB RAM) — **Critical**
  - **Samsung A-series** — **Critical**
  - iPhone 12 / 14 (Safari)
  - Samsung Galaxy S22 (Chrome)
  - iPad Air (Safari)
  - Surface Pro (Edge)
  - 1440p desktop (Chrome)
  - 1920p large desktop (broadcast preview)
- Network: **Regular 3G (1.5 Mbps)**, Slow 4G (4 Mbps), Wi-Fi.
- Orientation: portrait + landscape for tablet & phone.

## 25.13 Layout rules of thumb

- **Never** rely on hover for revealing content on touch surfaces.
- **Never** show two scrolling containers next to each other on mobile.
- **Always** reserve space for sticky headers (no content jump on
  scroll).
- **Always** size by `dvh` for full-height containers with `vh` fallback
  (avoids iOS URL bar jumping). Use `svh` for above-the-fold content
  that must fit on initial load.
- **Always** test in landscape mode for the scorer console.
- **Always** include `env(safe-area-inset-*)` padding for edge-to-edge
  displays with notches.
