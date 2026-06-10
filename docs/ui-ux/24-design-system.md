# 24 — Design System Extensions

This section **extends** (does not replace) the canonical design system at
`design-system/khelsetu/MASTER.md`. Per-page overrides live in
`design-system/khelsetu/pages/`.

Everything below is the contract that every KhelSetu feature must follow,
expressed in terms of product needs (scoring, public, broadcast). When in
doubt, defer to `MASTER.md`; this file fills the product-shaped gaps it
does not address.

## 24.1 Token additions (product-specific)

Add these tokens to `src/styles/themes.css` next to the existing brand
tokens.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--score-stat-bg` | `#0F172A` | `#0B1220` | Background for big score numbers (broadcast/console) |
| `--score-stat-fg` | `#F8FAFC` | `#F8FAFC` | Foreground for big score numbers |
| `--live-pulse` | `#EF4444` | `#F87171` | LIVE pulse colour (mirrors `--color-accent-live`) |
| `--possession-a` | `--color-primary` | `--color-primary` | Possession arrow team A |
| `--possession-b` | `--color-cta` | `--color-cta` | Possession arrow team B |
| `--shot-clock-warn` | `#F59E0B` | `#FBBF24` | Shot clock 5–10s |
| `--shot-clock-crit` | `#DC2626` | `#F87171` | Shot clock ≤5s, pulsing |
| `--field-grass` | `#15803D` | `#166534` | Football pitch base |
| `--field-line` | `#FFFFFF` | `#F8FAFC` | Pitch / court lines |
| `--court-hardwood` | `#D97706` | `#B45309` | Basketball court base |
| `--pitch-oval` | `#65A30D` | `#4D7C0F` | Cricket oval base |
| `--bracket-line` | `#94A3B8` | `#475569` | Tournament bracket connectors |

## 24.2 Typography scale (component-level)

`MASTER.md` defines the global type system. Product surfaces use these
named slots:

| Slot | Family | Weight | Size (desktop / mobile) | Use |
|---|---|---|---|---|
| `display-score` | Display sans (e.g., Sora) | 800 | 96 / 64 | Score numbers in overlay & scorer |
| `display-stat` | Display sans | 700 | 64 / 44 | Big KPI numbers |
| `headline-1` | Display sans | 700 | 40 / 30 | Page headlines |
| `headline-2` | Display sans | 700 | 28 / 22 | Section headlines |
| `headline-3` | Body sans | 600 | 22 / 18 | Card titles |
| `body-1` | Body sans | 400 | 16 / 16 | Body copy |
| `body-2` | Body sans | 400 | 14 / 14 | Secondary copy |
| `caption` | Body sans | 400 | 12 / 12 | Captions, metadata |
| `mono-clock` | Mono (e.g., JetBrains Mono) | 600 | 48 / 32 | Clocks, timers |
| `code` | Mono | 400 | 14 / 12 | Code / event log |

Tabular numerals (`font-variant-numeric: tabular-nums`) are mandatory on
all score / clock / KPI surfaces.

## 24.3 Spacing scale

Tailwind v4 default, plus product names:

| Token | Px | Use |
|---|---|---|
| `space-x` | 2 | Hairline |
| `space-1` | 4 | Tight |
| `space-2` | 8 | Inline |
| `space-3` | 12 | Form field gap |
| `space-4` | 16 | Card padding small |
| `space-5` | 20 | Card padding default |
| `space-6` | 24 | Section gap |
| `space-8` | 32 | Page gap |
| `space-10` | 40 | Wide section |
| `space-12` | 48 | Hero |
| `space-16` | 64 | Mega hero |

## 24.4 Icon usage

- **Lucide** is the canonical icon set; do not mix sets.
- Sport-specific glyphs: a small bundled set under `components/icons/sports/`
  for cricket bat/ball, football, basketball.
- Status icons: always paired with text label (no colour-only meaning).
- Sizes: 16, 20, 24, 32 only.

## 24.5 Buttons

| Variant | Use | Visual |
|---|---|---|
| Primary | Main CTA | Filled primary, white text, primary gradient on hover |
| Secondary | Alternative CTA | Outlined primary, primary text |
| Tertiary | Low-emphasis | Text only, primary text, underline on hover |
| Danger | Destructive | Filled red, white text |
| Success | Positive | Filled green, white text |
| Ghost | Toolbar | Transparent, hover bg-tertiary |
| Icon | Toolbar | Square 32/40, ghost or filled |
| Score | Scoring console | Square ≥64×64, bold label, large hit target |
| Live-action | Console primary action | Same as Score with pulse |

States: default, hover, active, focus (2px ring), disabled, loading
(spinner replaces label, button retains width).

## 24.6 Form controls

- **Inputs** — 40 (md) / 32 (sm) / 48 (lg) height, 12-14px label above,
  helper text below, error in red below.
- **Selects** — native `<select>` with `<Combobox>` upgrade for search.
- **Date pickers** — Radix-based, supports ranges; presets surfaced in
  the popover.
- **Toggles** — 44×24, accent on, gray off, label to the left for
  settings, to the right for inline.
- **Checkbox / Radio** — 16×16 default, 20×20 on touch.
- **Sliders** — for shot clock / time editors only.
- **Stepper** — for injury time, foul count, points.
- **File upload** — drag-and-drop + click; image previews for crests.

## 24.7 Cards

- Default: `--bg-tertiary`, `border-subtle`, radius 12, padding 5, shadow
  none.
- Elevated: + shadow-md on hover.
- Interactive: + cursor-pointer, hover bg-secondary on dark, border
  primary on focus.
- Sport-themed: optional left border in sport accent colour.

## 24.8 Tables

- Header sticky.
- Zebra rows optional (off by default for data-dense; on for browse).
- Row height: 40 (compact) / 48 (default) / 56 (comfortable).
- Sort icons in header; arrow indicates direction.
- Multi-select column on left with master check in header.
- Row actions on right with overflow `…` menu.
- Pagination at footer.
- Empty / loading / error states templated.

## 24.9 Tabs

- Underline tabs by default; pill tabs for content switchers in cards.
- Active tab text in primary; underline 2px primary.
- Keyboard: arrow keys to navigate, Home/End to jump.

## 24.10 Badges

- Variants: default, primary, success, warning, danger, info, premium,
  live, scorer, official, sport-cricket, sport-football,
  sport-basketball.
- Live badge pulses; premium uses premium gradient.
- Size: sm (h-5), md (h-6), lg (h-7).

## 24.11 Alerts

- Inline (within a card), banner (top of page), toast (ephemeral).
- Variants: info, success, warning, error.
- Icon mandatory, dismiss optional.
- Action button optional on the right.

## 24.12 Modals & Drawers

- Modal: centered, max-w-lg default, max-w-2xl wide, max-w-4xl mega.
- Drawer: right (default), bottom (mobile sheet), left (filters).
- Animation: fade + scale 95→100 (modal), slide-from-side (drawer); 200ms
  ease-out.
- Focus trap, ESC closes, click outside closes (configurable).

## 24.13 Toasts

See §16. Top-right desktop, top-center mobile, stack max 4.

## 24.14 Skeletons

- Use for any data fetch that may exceed 200ms.
- Shape mimics the target component (avatar circle, line bars, card
  block).
- Soft shimmer (linear-gradient sweep, 1.4s loop).
- `prefers-reduced-motion` disables shimmer.

## 24.15 Empty states

- Pattern: small illustration (sport-themed for sport pages),
  one-line headline, one-sentence helper, primary CTA, optional
  secondary link.
- Stock illustrations live under `components/empty-states/`.

## 24.16 Pagination

- Pattern: rows-per-page selector, page count, prev/next, "Go to page".
- Cursor-based for audit + sync; offset-based for everything else.

## 24.17 Filters

- Filter bar lives above tables / grids.
- Chips are pressed buttons with `aria-pressed`.
- "Clear all" link visible when any filter active.
- Filter state syncs to URL.
- Quick filters (saved presets) live in a dropdown on the left.

## 24.18 Search bars

- Always with an icon left + clear button right.
- Debounce 250ms, optimistic UI shows last results.
- Keyboard shortcut: `/` to focus.

## 24.19 Chart styles

Reuse the Recharts theme defined in `MASTER.md`. Product-specific rules:

- **Line chart** — score progression, trend; max 4 series.
- **Bar / stacked bar** — comparisons; categorical x.
- **Area** — possession over time.
- **Donut** — possession, shot distribution; ≤6 slices.
- **Radar** — player percentile rank (5–8 axes).
- **Heatmap** — pitch / court heatmaps; sport-aware grid.
- **Scatter** — xG vs xT, etc.

Colour rules:

- Team A always `--color-primary`, Team B always `--color-cta`.
- Use pattern fills as an additional channel for accessibility.
- Always show units in axis labels.
- Tooltip uses elevated surface + tabular nums.

## 24.20 Live score widgets

- **CompactLiveScore** — used in lists; team A, team B, score, status,
  minute / overs, LIVE pulse.
- **TickerLiveScore** — single-line scrolling for the public ticker.
- **OverlayLiveScore** — broadcast-grade with team logos, scores, period,
  clock, possession.
- **PublicLiveScore** — public match page hero with all the above plus
  event log preview.

## 24.21 Match event chips

- Per sport, a set of icon-and-label chips (goal, card, sub; ball,
  wicket; bucket, foul). Same component, different icon map.

## 24.22 Status indicators

- Match: Scheduled, Live, HT, FT, ET, PSO, Suspended, Postponed,
  Abandoned, Cancelled, Completed.
- Tournament: Draft, Published, Open Registration, Closed, In Progress,
  Completed, Archived.
- Subscription: Active, Trial, Past-due, Canceled, Paused.
- Sync: Online, Offline, Syncing, Conflict, Failed.

Each uses the corresponding badge variant + icon.

## 24.23 Sport-specific visual language

| Sport | Accent | Field | Iconography | Notes |
|---|---|---|---|---|
| Cricket | `--sport-cricket` (amber) | Oval | Bat, ball, stumps | Overs, RR are mono |
| Football | `--sport-football` (green) | Pitch | Boot, card, whistle | Clock + injury time |
| Basketball | `--sport-basketball` (orange) | Court | Ball, hoop, whistle | Shot + game clocks |

Use sport accent only as **secondary** signal — primary remains brand.

## 24.24 Surfaces by shell

| Shell | Background | Density | Notes |
|---|---|---|---|
| Public | `--bg-primary` | Spacious | Marketing, conversion |
| Auth | `--bg-secondary` | Minimal | Trust, simple |
| Dashboard | `--bg-secondary` (sidebar) + `--bg-primary` (content) | Data-dense | KPIs, tables |
| Scorer | `--bg-tertiary` (sticky areas) + `--bg-primary` (content) | Tactile | Big buttons |
| Overlay | transparent | Broadcast | No chrome |
| Admin | `--bg-secondary` | Dense | Cross-tenant |

## 24.25 Motion

- Default ease: `cubic-bezier(0.4, 0, 0.2, 1)`.
- Defaults: page enter 200ms fade, modal 200ms scale, drawer 250ms slide,
  toast 150ms.
- LIVE pulse: 1.4s ease-in-out infinite.
- Score change: brief flash + 1.05x scale 250ms.
- `prefers-reduced-motion: reduce` disables non-essential motion; keeps
  state transitions.

## 24.26 Z-index scale

| Layer | Z |
|---|---|
| Base | 0 |
| Sticky header / footer | 10 |
| Dropdowns | 30 |
| Popovers | 40 |
| Modals | 50 |
| Drawers | 60 |
| Toasts | 70 |
| Connection banner | 80 |
| Tooltips | 90 |
| Loading overlays | 100 |

## 24.27 Support for shells

- **Public portal**: full design system + marketing extensions.
- **Dashboard**: full design system + dense data components.
- **Mobile**: bottom sheets, bottom nav, larger touch targets.
- **Tablet**: scorer console primary, dual-pane scorer.
- **Live scoring**: glove-friendly 64+ px buttons, sticky clocks, big
  numerals.
- **Broadcast overlays**: no chrome, transparent bg, custom theme
  cascade per template.
