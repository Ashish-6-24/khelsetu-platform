# Page Override — Dashboard

**Overrides MASTER.md** for the main authenticated dashboard at `/dashboard`.

## Style Adjustments

- **Density:** Data-dense. Multiple cards visible above the fold (375px height minimum).
- **Layout:** 12-column grid, cards span 3/4/6/12 columns responsive.
- **Primary metric cards:** `text-5xl font-bold` (Space Grotesk, tabular-nums).
- **Charts:** Always show sparkline + current value + delta indicator (`↑ +12%`).

## Color Emphasis

- **Live indicator:** Always pulse (red-500 + red dot) for any active match
- **Status colors:**
  - Green (`--color-accent`): Up trend, won, success
  - Red (`--color-danger`): Down trend, lost, error
  - Amber (`--color-warning`): Pending, draw
  - Blue (`--color-primary`): Neutral info, ongoing

## Component Specs

- **Stat card:** `Card` + big number (text-5xl tabular-nums) + label (text-sm text-secondary) + trend chip (Badge variant=success/error)
- **Chart card:** `Card` + title row + Recharts ResponsiveContainer + legend
- **Recent activity list:** Time on left (text-xs text-tertiary), title (text-sm), status badge
- **Quick action buttons:** 2×2 grid of icon+label buttons, primary variant

## Layout Grid

```
┌─────────────────────────────────────────┐
│  Welcome back, [Name]    [Live Pulse]  │  ← Header
├─────────────────────────────────────────┤
│ [Stat] [Stat] [Stat] [Stat]            │  ← 4-col stats row
├─────────────────────────────────────────┤
│ [Chart: Tournaments] [Chart: Activity] │  ← 2-col
├─────────────────────────────────────────┤
│ [Recent Matches]   [Quick Actions]     │  ← 2-col
└─────────────────────────────────────────┘
```

## Data Loading

- **Stats:** Skeleton cards (`<SkeletonCard>`) while loading
- **Charts:** Recharts with `isAnimationActive={!useReducedMotion()}`
- **Lists:** `<SkeletonText lines={3} />` placeholders

## Accessibility

- Each stat card is a `<section aria-labelledby="stat-[name]-title">`
- Charts have `role="img"` + `aria-label="Tournament count over last 30 days"`
- Provide `<details>` with data table fallback below each chart
