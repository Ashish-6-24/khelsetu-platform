# Page Override — Scoring (Live Match)

**Overrides MASTER.md** for live scoring at `/scoring` and `/scoring/[matchId]`.

## Style Adjustments

- **Mode:** Action-first, low-friction, glove-friendly.
- **Touch targets:** **64×64px minimum** (operators may wear gloves; larger is critical).
- **Spacing:** Generous 24px gap between scoring buttons to prevent mis-taps.
- **Visual feedback:** **Every tap** must produce immediate (≤100ms) visual + optional haptic feedback.

## Color Emphasis

- **Primary scoring buttons:** Large, primary gradient, `shadow-glow`
- **Danger actions** (wicket, foul, red card): `--color-danger` background, prominent
- **Bonus actions** (six, goal): `--color-accent` (emerald) background
- **Undo button:** Always visible, top-right, secondary variant
- **Live indicator:** Top of screen, pulsing red dot + "LIVE" text

## Component Specs

### Score Header
- Team A logo + name (text-lg) + score (text-7xl Space Grotesk, tabular-nums)
- Team B name + score + logo
- Center: match clock (text-2xl tabular-nums) + over/quarter indicator
- Bottom: `LivePulse` + "LIVE" badge

### Action Grid
- 2×3 or 3×3 grid of large action buttons (cricket: 0/1/2/3/4/6 + WIDE/NB/OUT)
- Each button: min-h-16, primary or accent gradient, text-xl font-bold
- Press state: scale 0.95 + brightness reduction

### Event Log
- Vertical timeline, newest at top
- Each entry: timestamp (text-xs tabular-nums) + icon (event type) + description
- Latest entry: highlighted with `bg-primary-soft` border-l-4 border-primary

### Undo Bar
- Sticky bottom bar with "Undo Last" + "Confirm & Continue" buttons
- Always visible during active scoring

## Animation

- Score number change: tween animation 300ms with overshoot (spring)
- New event added: slide-in from right + fade, 250ms
- Pulse: `LivePulse` continues throughout match
- Reduced motion: skip score tween, instant number swap

## Accessibility

- All scoring buttons must be keyboard-accessible (for tablet scoring)
- Number keys (0–6) as shortcuts documented in help
- `aria-live="polite"` announces each scoring event
- `aria-label` includes player + event (e.g., "4 runs to Batsman Khan")
- Confirm destructive actions with haptic + visual flash
