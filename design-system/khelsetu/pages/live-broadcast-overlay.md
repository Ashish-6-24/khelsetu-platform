# Page Override — Live Broadcast Overlay (OBS)

**Overrides MASTER.md** for OBS browser-source overlays at `/overlays/scoreboard/[matchId]`.

## Style Adjustments

- **Mode:** Transparent-background overlay rendered in OBS browser source at 1920×1080.
- **Constraint:** No interactivity. Pure visual rendering. Updates via WebSocket.
- **Font sizes:** **Much larger** than rest of app (readable at broadcast distance).

## Color & Background

- **Background:** `transparent` (not white/dark) — OBS compositing
- **Text:** High contrast `text-white` with `text-shadow: 0 2px 8px rgba(0,0,0,0.8)` (drop shadow for legibility on any background)
- **Accents:** Use brand `--color-primary` and `--color-accent-live` (red) for LIVE
- **Anti-aliasing:** `-webkit-font-smoothing: antialiased`

## Component Specs

### Scoreboard Layout (1920×200 typical)
```
┌────────────────────────────────────────────────────────────┐
│  [Team A Logo] TEAM A NAME   186/4   ●LIVE   TEAM B NAME  [Team B Logo]  142 all out │
│              (18.2 overs)              (32.1 overs)                              │
└────────────────────────────────────────────────────────────┘
```

- Team names: `text-4xl font-bold`
- Scores: `text-7xl font-bold tabular-nums` (Space Grotesk)
- Overs: `text-2xl text-white/80 tabular-nums`
- LIVE indicator: `text-3xl` with `LivePulse` (red)

### Lower-Third (Player of the Match)
- Slide-in from left on first display, 400ms spring
- Width 600px, height 120px
- Background: gradient `from-blue-900/90 to-transparent`
- Player photo + name + stat

### Animated Transitions
- Score change: number flip animation (vertical) 500ms
- Wicket fall: brief red flash on score (200ms)
- Boundary (4/6): confetti / sparkle effect (300ms) — skip if reduced motion
- Innings break: full overlay fade + rebuild (800ms)

## Live Update Strategy

- **WebSocket** for real-time score (see `src/services/websocket/`)
- **Optimistic local update** for tap latency
- **Reconnection logic** with last-known-state
- **Throttle** to 4fps minimum, 30fps maximum (don't burn CPU)

## Accessibility

- Not applicable — overlay is for viewers, not screen-reader users
- Provide a parallel `/scoring/[matchId]` page with full a11y for organizers

## Performance

- No shadows in CSS that require recomposition per frame
- Use `transform` and `opacity` only for animations
- Single WebSocket connection per overlay
- Avoid React re-renders — use direct DOM updates for score numbers
