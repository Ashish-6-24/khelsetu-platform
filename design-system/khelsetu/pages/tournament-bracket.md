# Page Override — Tournament Bracket

**Overrides MASTER.md** for the tournament bracket view at `/tournaments/[id]/bracket`.

## Style Adjustments

- **Mode:** Read-mostly, visual-first, zoomable.
- **Orientation:** Horizontal scroll on mobile, vertical columns on desktop.
- **Visual hierarchy:** Match cards with connecting lines to next round.

## Color Emphasis

- **Completed matches:** `bg-tertiary` with `text-secondary`
- **Live match:** `bg-accent-soft` border-2 border-accent with `LivePulse`
- **Upcoming:** `bg-primary-soft` border border-primary-soft
- **Winner highlight:** bold + accent color on advancing team
- **Loser:** `text-tertiary` line-through

## Component Specs

### Match Card
```
┌─────────────────┐
│ Team A   [logo] │
│ 124/3 (18.2)   │  ← text-sm tabular-nums
│ ─────────────── │
│ Team B   [logo] │
│ 98 all out     │
├─────────────────┤
│ Status badge    │  ← top-right corner
└─────────────────┘
```
- Width: 240px fixed (bracket alignment)
- Padding: p-4
- Hover: scale 1.02 + shadow-md (desktop)
- Click: navigate to match detail

### Connector Lines
- SVG paths between match cards (right edge of round N to left edge of round N+1)
- Stroke: `--border-strong`, 2px
- Animated draw-in (600ms) on initial load (skipped if reduced motion)

### Round Headers
- Sticky at top: "Round of 16", "Quarter Final", "Semi Final", "Final"
- text-sm font-semibold uppercase tracking-wider text-tertiary

## Layout

- **Desktop (≥lg):** All rounds visible, horizontal scroll if >4 rounds
- **Mobile:** Horizontal scroll, snap to round boundaries (`scroll-snap-type: x mandatory`)
- **Zoom:** Pinch-to-zoom on touch, ctrl+wheel on desktop (50%–200% range)

## Accessibility

- Each match card is a `<button>` with full aria-label
- Bracket structure described via `aria-describedby` pointing to hidden text summary
- Keyboard: arrow keys to navigate between matches, Enter to open
- Provide text-based "list view" alternative (`/tournaments/[id]/matches`)

## Performance

- Virtualize matches when >50 visible (use `VirtualList`)
- Debounce zoom updates (16ms)
- Static bracket structure after draw, only status updates
