# Mobile-First Responsive Design Research — KhelSetu

> Research completed: 2026-06-20
> Stack: React 19, TypeScript 6, Tailwind CSS v4
> Users: Sports organizers, team managers, players in Nepal
> Target devices: Budget Android phones, tablets, desktop

---

## 1. Breakpoint Strategy

### Nepal Mobile Market Context (2026)

Nepal's mobile landscape is dominated by Android at 88-92% market share. iOS accounts for only 8-12%, concentrated in urban Kathmandu and Pokhara. The median Nepali user has a budget Android phone with 2-3 GB RAM (Tecno, Itel, Realme, Oppo, Xiaomi entry-level). Screen resolutions cluster around 360x800, 414x896, and 393x873. Smartphone penetration is 65% nationally (80%+ urban, 50-55% rural).

**Key insight**: Design for a 6.5-inch screen at 1080x2400 resolution as the median, but test down to 1280x720 with 4 GB RAM — this is the floor for most Nepali users.

### Recommended Breakpoints

| Breakpoint | Min-width | Tailwind prefix | Nepal device target | Intent |
|---|---|---|---|---|
| `xs` | 0 | (default) | Budget phone portrait (360px) | Phone portrait — public portal, scorer mini |
| `sm` | 640px | `sm:` | Phone landscape / phablet | Public portal expanded |
| `md` | 768px | `md:` | Small tablet | Scorer console single-pane, dashboard read-only |
| `lg` | 1024px | `lg:` | Tablet landscape | Scorer dual-pane, dashboard full |
| `xl` | 1280px | `xl:` | Laptop | Dashboard primary |
| `2xl` | 1536px | `2xl:` | Desktop | Dashboard wide, overlay editing |
| `3xl` | 1920px | `3xl:` | Broadcast monitor | Overlay 1080p preview |

**Why these specific values**:
- **360px base**: Nepal's top mobile screen resolutions are 360x800 (most Samsung, Xiaomi budget phones). Starting at 360px captures the majority of Nepali users. The design must be functional at 360px before adding any responsive enhancements.
- **640px sm**: Standard Tailwind — captures phablets and phones in landscape. No need to deviate.
- **768px md**: Matches iPad portrait and most tablets. This is where scorer console transitions from single to dual pane.
- **1024px lg**: iPad landscape. Scorer dual-pane becomes primary. Dashboard gets its full sidebar.
- **1280px+ xl**: Laptop and desktop. Full dashboard experience.

**Container queries for components**: Tailwind v4's `@container` with `@sm:`, `@md:`, `@lg:` should be used for reusable components (cards, widgets, score cards) that appear in multiple layout contexts. Use viewport breakpoints for page-level layout decisions.

### Tailwind Configuration

```css
/* app.css */
@theme {
  /* Nepal-optimized breakpoints */
  --breakpoint-xs: 0;
  /* sm, md, lg, xl, 2xl, 3xl use Tailwind defaults */
}
```

---

## 2. Touch Interaction Patterns

### Touch Target Sizing

Research consensus across WCAG, Material Design, Apple HIG, and NN/g:

| Standard | Minimum size | Spacing | Notes |
|---|---|---|---|
| WCAG 2.5.8 (AA legal) | 24x24 CSS px | 24px exclusion zone | Legal floor — never ship at this size |
| WCAG 2.5.5 (AAA) | 44x44 CSS px | 8px between targets | Comfortable target |
| Apple HIG | 44x44 pt | Varies | iOS standard since 2007 |
| Material Design | 48x48 dp | 8dp between targets | Most generous — recommended |
| NN/g research | 1cm x 1cm physical | 8px minimum | Physical measurement — 45-57 CSS px |
| BBC guidelines | 7-10mm physical | 1px minimum between | For accessibility |

**KhelSetu standard**: **48x48px minimum** for all interactive controls, **8px spacing** between adjacent targets. Scorer action buttons: **64x64px** (mobile), **80x80px** (tablet) — these are primary action targets used during live scoring with one hand.

### Fitts's Law on Mobile

Fitts's Law: Time to reach a target = f(distance / size). Smaller targets take longer to acquire because they require more precise finger movements. Key implications:

- **Thumb zone**: On a 6.5" phone held one-handed, the comfortable thumb reach is a ~40mm arc from the bottom-center. Primary actions must live here.
- **Edge targets**: Screen edges are easier to hit (infinite edge effect). Bottom nav items and edge-swipe actions benefit from this.
- **One-handed use**: Sports users often hold a phone in one hand (other hand holding a drink, scarf, or clipboard). All critical actions must be reachable without a second hand.

### Touch Target CSS Pattern

```tsx
// Minimum touch target with padding expansion
<button className="
  min-h-[48px] min-w-[48px]
  p-2
  /* Scorer buttons get larger */
  sm:min-h-[64px] sm:min-w-[64px]
  lg:min-h-[80px] lg:min-w-[80px]
">
  {children}
</button>

// Link in text — expand touch area
<a className="
  py-1 px-2
  min-h-[48px] min-w-[48px]
  inline-flex items-center
">
  {label}
</a>
```

### 300ms Tap Delay

Mobile browsers historically added a 300ms delay to tap events to detect double-tap-to-zoom. Fix: add `touch-action: manipulation` to interactive elements, or set in CSS:

```css
* {
  touch-action: manipulation;
}
```

This eliminates the delay without disabling pinch-to-zoom.

### Pointer Media Queries

Use `@media (any-pointer: coarse)` to increase touch targets for touchscreen users regardless of screen size:

```css
@media (any-pointer: coarse) {
  .interactive {
    min-height: 48px;
    min-width: 48px;
  }
}
```

---

## 3. Mobile Navigation Approach

### Research Findings

| Pattern | Engagement impact | Discoverability | Best for |
|---|---|---|---|
| Bottom tab bar | +30-40% engagement with secondary sections | High (always visible) | 4-5 primary sections |
| Hamburger menu | Baseline (hidden = undiscovered) | Low (out of sight, out of mind) | Secondary nav, 6+ items |
| Horizontal scroll tabs | High for content browsing | Medium (peek at edges) | Match lists, league filters |
| Edge swipe drawer | Low (hidden gesture) | Very low | Settings, secondary |

**BBC Sport study**: Adding bottom navigation increased content consumption by 7-9% and reduced time-in-app by 4% — users got what they wanted faster.

**NN/g finding**: Visible navigation increases engagement with navigation items by 30-40% compared to hiding behind hamburger.

**Sports app specific**: During matches, users don't explore — they hunt. Navigation should prioritize live score, lineups, key moments, and chat. Deep menus kill engagement.

### KhelSetu Navigation Architecture

#### Mobile (< 768px)

**Bottom tab bar** — 5 tabs, always visible:
1. Home (dashboard feed)
2. Matches (live + upcoming)
3. Scoring (active match / quick start)
4. Notifications
5. More (profile, settings, teams)

```
┌─────────────────────────────────────────┐
│  Topbar: Org switcher + search          │
├─────────────────────────────────────────┤
│                                         │
│           Main content area             │
│                                         │
├─────────────────────────────────────────┤
│  🏠    ⚽    📊    🔔    ⋯             │
│ Home Matches Score  Notif  More         │
└─────────────────────────────────────────┘
```

- Bottom bar height: 56px + safe area inset
- Active tab: filled icon + brand maroon (#811D1D) color
- Inactive: gray-500 outline icon
- Tab bar has `backdrop-blur-sm bg-white/90` for glass effect

**Sidebar becomes bottom sheet** — On mobile, the dashboard sidebar opens as a full-height bottom sheet triggered from the "More" tab or a hamburger icon in the topbar.

**Scorer console bottom nav** — Separate 5-tab bar for scoring context:
1. Lineup
2. Center (live view)
3. Events (ball-by-ball)
4. Stats
5. Settings

#### Tablet (768-1280px)

**Collapsed sidebar** — Icons only at 80px width. Expand to 240px on hover or toggle.
**Topbar** — Persistent with search, notifications, profile.

#### Desktop (> 1280px)

**Full sidebar** — 240px persistent left sidebar with labels.
**Topbar** — Full with breadcrumbs, search, notifications.

### Horizontal Scroll for Match Lists

For match cards and league filters, use horizontal scroll with scroll-snap:

```css
.match-list {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  gap: 12px;
  padding: 0 16px;
}

.match-card {
  scroll-snap-align: start;
  flex: 0 0 85%; /* Show peek of next card */
}
```

This pattern is used by ESPN, Cricbuzz, and all major sports apps for match browsing on mobile.

---

## 4. Live Scoring on Mobile

### Research Findings

**Cricbuzz model**: Sub-second latency from ball to app update. The entire product promise is speed. Users want the score, current batters, and run rate visible in under 2 seconds.

**ESPN model**: Score worm (visual run-rate graph) is a key UI element. Vertically aligned with quarter-by-quarter scores below.

**Cricket.com model**: Card-based layout with inverted pyramid — most important info first. Five-second rule: every user group's critical info visible in first scroll.

**Key UI elements for live scoring on small screens**:

| Element | Priority | Mobile adaptation |
|---|---|---|
| Current score (runs/wickets/overs) | 1 | Sticky header, always visible |
| Required run rate | 2 | Below score in header |
| Current batters | 3 | Compact row with names + runs |
| Ball-by-ball feed | 4 | Scrollable list below |
| Win probability | 5 | Small gauge in header |
| Commentary | 6 | Expandable section |

### Mobile Live Score Layout

```
┌─────────────────────────────────────────┐
│  🔴 LIVE  Nepal vs India  T20          │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   │
│  Nepal  142/3  (16.2 overs)            │
│  Req: 8.2 RPO | RR: 8.71              │
│  🏏 R. Paudel 45(32)  S. Lamichhane 28(18) │
├─────────────────────────────────────────┤
│  ← Previous ball | Next ball →         │
│  ○ ○ 4 ○ W ○ 2                         │
├─────────────────────────────────────────┤
│  Ball-by-ball:                          │
│  16.2 • S. Lamichhane drives to cover   │
│  16.1 • Wide, down leg                  │
│  16.0 • 4! R. Paudel pulls to midwicket │
│  ... (scrollable)                       │
└─────────────────────────────────────────┘
```

**Critical patterns**:
- **Sticky score header**: Always visible at top, never scrolls away. Contains score, run rate, current batters.
- **Last-over summary**: Compact dot-by-dot visualization (○ ○ 4 ○ W ○ 2) immediately below header.
- **Values update in place**: No layout shift when scores change. Numbers replace in the same row frame with zero height changes.
- **Predictable motion**: Updates are subtle pulse animations, not jumping elements. Users judge "fast" by how quickly the brain understands what changed.
- **Offline indicator**: Small banner if connection drops. "Reconnecting..." with auto-retry.

### Swipe Between Matches

```
← Swipe left: next match | Swipe right: previous match →

┌─────────────────────────────────────────┐
│  ←  Match 3/12  →                      │
│  Nepal vs India                         │
│  ...score...                            │
└─────────────────────────────────────────┘
```

- Show match counter (3/12) to hint at swipeability
- Peeking adjacent match card edges to suggest content
- Swipe animation: 200-300ms ease-out slide
- Always allow tap on match counter as alternative

---

## 5. Swipe Gestures

### Research Findings

Swipe gestures are now universal muscle memory. They're intuitive, fast, and require no instruction. Key patterns:

| Gesture | Use case | Accessibility |
|---|---|---|
| Horizontal swipe | Navigate between matches, tabs, pages | Must provide tap alternative |
| Vertical swipe | Scroll content (default) | Native |
| Swipe to reveal | Show contextual actions (archive, delete) | Provide visible button alternative |
| Pull to refresh | Refresh live data | Must have manual refresh button too |
| Edge swipe | Back navigation (iOS), drawer reveal | System gesture — don't override |

**NN/g warning**: Limit contextual swipe to destructive actions. Burying key actions behind swipe prevents discovery. Keep swipe behavior consistent within the app.

**Sports app patterns**:
- Swipe between matches in live view
- Swipe between innings (cricket)
- Swipe between tabs (stats, commentary, scorecard)
- Swipe to dismiss bottom sheets
- Swipe to reveal match actions (share, follow, set reminder)

### KhelSetu Swipe Rules

1. **Never override system gestures** (iOS back swipe, Android edge swipe)
2. **Always provide tap alternatives** for critical swipe actions
3. **Consistent direction**: Swipe left = forward/next, swipe right = back/previous
4. **Visual affordance**: Show peek of adjacent content, match counter, or arrow indicators
5. **Haptic feedback**: `navigator.vibrate(10)` on gesture completion (subtle, not on every interaction)
6. **Accessibility**: WCAG 2.1 requires single-pointer alternatives for pointer gestures

### Swipe Implementation Pattern

```tsx
// Horizontal swipe container with peek
<div className="overflow-x-auto flex snap-x snap-mandatory gap-3 px-4">
  {matches.map(match => (
    <div key={match.id} className="snap-start flex-none w-[85%]">
      <MatchCard match={match} />
    </div>
  ))}
</div>

// Swipe-to-reveal for match actions
<div className="relative">
  <div className="bg-white p-4 rounded-lg">
    {/* Main content */}
  </div>
  <div className="absolute right-0 top-0 bottom-0 flex items-center gap-2 pr-2">
    {/* Revealed actions */}
    <button className="min-h-[48px] min-w-[48px]">Follow</button>
    <button className="min-h-[48px] min-w-[48px]">Share</button>
  </div>
</div>
```

---

## 6. Pull-to-Refresh

### Research Findings

Pull-to-refresh is a native mobile pattern that users expect. For sports apps with live data, it's essential. Key considerations:

- **Native vs custom**: Mobile browsers have built-in pull-to-refresh that refreshes the entire page. For SPAs, you need a custom implementation to refresh only data.
- **CSS overscroll-behavior**: `overscroll-behavior-y: contain` on `html` prevents the browser's native pull-to-refresh and page bounce.
- **Service worker coordination**: For PWAs, the pull-to-refresh can trigger service worker cache invalidation.
- **Premium feel**: Subtle spinner animation, physics-based feel (deceleration factor ~0.5), clear status text.

### Pull-to-Refresh States

```
1. Idle → User pulls down
2. "Pull to refresh" → threshold not reached
3. "Release to refresh" → threshold reached
4. "Refreshing..." → spinner active
5. "Updated!" → brief success message
6. Idle → content refreshed
```

### Implementation

```tsx
// React pull-to-refresh with overscroll containment
<div className="overscroll-contain">
  <PullToRefresh
    onRefresh={async () => {
      await refreshMatchData();
    }}
    pullThreshold={80}
    maxPull={120}
  >
    <MatchList />
  </PullToRefresh>
</div>
```

```css
/* Prevent native browser pull-to-refresh */
html {
  overscroll-behavior-y: contain;
}
```

**Key rules**:
- Use `overscroll-behavior-y: contain` to prevent browser native refresh
- Threshold: 80px pull distance (not too sensitive, not too hard)
- Max pull: 120px (rubber-band effect)
- Spinner animation: CSS transform-based (GPU accelerated, 60fps)
- Status text: "Pull down to refresh" → "Release to refresh" → "Updating..." → "Done"
- Manual refresh button always available as alternative
- Haptic feedback on refresh trigger (10ms vibration)

---

## 7. Mobile Performance Budget

### Nepal Network Reality (2026)

| Environment | Speed | Latency | Design target |
|---|---|---|---|
| Kathmandu fiber/4G | 20-100 Mbps | 50-150ms | Ideal |
| Kathmandu 4G under load | 1-5 Mbps | 200-500ms | Evening peaks |
| Tier-2 cities 4G | 5-25 Mbps | 100-300ms | Pokhara, Biratnagar |
| Rural/hill districts | 0.5-5 Mbps | Variable | Where coverage exists |

**Design for the median**: 4G under load, ~3 Mbps, ~200ms latency. A site that works there works everywhere.

### Core Web Vitals Targets

| Metric | Good | Target for KhelSetu |
|---|---|---|
| LCP | ≤ 2.5s | < 2.0s (sports urgency) |
| INP | ≤ 200ms | < 150ms (live scoring) |
| CLS | ≤ 0.1 | < 0.05 (no layout shift during live updates) |
| TBT | ≤ 200ms | < 100ms (scorer console) |

### Performance Budget by Surface

| Surface | TTI (3G) | TTI (4G) | LCP target | Bundle size |
|---|---|---|---|---|
| Public landing | < 4s | < 2s | < 2.5s | < 150KB |
| Public live score | < 3s | < 1.5s | < 2s | < 100KB |
| Dashboard home | < 4s | < 2s | < 2.5s | < 200KB |
| Scorer console | < 3s | < 1.5s | < 2s | < 150KB |
| Overlay | < 2s | < 1s | < 1.5s | < 50KB |

### Critical Performance Tactics

**1. DOM size**: Keep initial render under 1,500 nodes. Style recalculation on 10,000 nodes takes ~180ms on budget Android — 10x the frame budget.

**2. Virtualize lists**: Any list over 100 items must be virtualized. Use `@tanstack/virtual` or `react-virtuoso`. Match lists, event logs, player lists — all virtualized.

**3. Passive touch listeners**: Add `{ passive: true }` to all `touchstart`, `touchmove`, `wheel` listeners. Without it, browser waits for JS before scrolling.

**4. CSS containment**: Add `content-visibility: auto` to long page sections. Add `contain: layout style paint` to card components.

**5. IntersectionObserver**: Replace scroll event listeners with IntersectionObserver for lazy loading, infinite scroll, and scroll-triggered animations.

**6. Image optimization**:
- WebP/AVIF with JPG fallback (25-35% smaller than JPG)
- `srcset` + `sizes` for responsive images
- `loading="lazy"` + `decoding="async"` below the fold
- Explicit width/height to prevent CLS
- Compress at q=75 (40% smaller than q=95, indistinguishable)

**7. Font optimization**:
- Self-host fonts (Barlow Condensed + Barlow)
- Subset Devanagari + Latin to used characters
- Preload critical font faces
- `font-display: swap` to prevent FOIT

**8. Bundle splitting**:
- Route-level code splitting with `React.lazy()`
- Dynamic imports for heavy components (charts, editors)
- Tree-shake unused dependencies
- Audit: single emoji package can add 80KB

**9. Animation budget**:
- Only `transform` and `opacity` for animations (compositor-only)
- No `top/left/width/height` animations (triggers layout)
- 200-300ms max duration for UI transitions
- `will-change` sparingly — only for known animation targets
- Disable animations on `prefers-reduced-motion`

**10. Third-party audit**:
- Facebook Pixel: ~70KB — audit necessity
- Live chat (Intercom): 200-400KB — defer or remove
- Analytics: defer with `next/script lazyOnload`
- Remove unused polyfills

### Budget Device Testing

**Must test on**: Tecno/Itel/Realme entry-level phone with 2-3 GB RAM. This is what most Nepali users have. NOT a Pixel or flagship Samsung.

**Test network**: Chrome DevTools → Network throttling → Regular 3G (1.5 Mbps down, 562ms RTT)

**Lighthouse target**: 75+ on mobile preset. Below 50 means real users are abandoning.

---

## 8. Offline Support Strategy

### Nepal Connectivity Reality

- 40% network drop in hilly districts
- 8-hour load shedding in some areas (Pokhara)
- Metered data plans — data is expensive
- 70% of devices are low-end Androids
- Feature phones still relevant for older/rural users (<1%, declining)

### Offline-First Architecture

**Principle**: Local database is source of truth. Server is sync target. UI never waits on network.

```
┌─────────────────────────────────────────┐
│              UI Layer                    │
│  Always reads from local (IndexedDB)     │
│  Never blocks on network                 │
├─────────────────────────────────────────┤
│           Sync Layer                     │
│  Outbound queue → FIFO pending actions   │
│  Inbound sync → merge server changes     │
│  Conflict resolution → last-write-wins   │
├─────────────────────────────────────────┤
│          Local Storage                   │
│  IndexedDB for structured data           │
│  Cache API for static assets             │
│  localStorage for preferences            │
├─────────────────────────────────────────┤
│        Service Worker                    │
│  Cache strategies per content type       │
│  Background sync when online             │
│  Push notifications                      │
└─────────────────────────────────────────┘
```

### Caching Strategies by Content Type

| Content | Strategy | Rationale |
|---|---|---|
| App shell (HTML, CSS, JS) | Cache-first (versioned) | Static, instant load |
| Images/fonts | Cache-first | Rarely change, large files |
| Match list | Network-first → stale-while-revalidate | Fresh preferred, show cached as fallback |
| Live scores | Network-only | Stale data worse than no data |
| Player/team data | Stale-while-revalidate | Can be slightly stale |
| User profile | Network-first | Must be current |
| Tournament brackets | Stale-while-revalidate | Updates are infrequent |
| Offline fallback | Cache-only | Must always be available |

### Service Worker Setup

```tsx
// Workbox-based service worker
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

// Precache app shell
precacheAndRoute(self.__WB_MANIFEST);

// Cache-first for static assets
registerRoute(
  ({ request }) => request.destination === 'image' || request.destination === 'font',
  new CacheFirst({ cacheName: 'static-assets', plugins: [new ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 30 * 24 * 60 * 60 })] })
);

// Network-first for API with offline fallback
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({ cacheName: 'api-cache', networkTimeoutSeconds: 3 })
);

// Stale-while-revalidate for match data
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/matches'),
  new StaleWhileRevalidate({ cacheName: 'matches-cache' })
);
```

### Offline UI Patterns

1. **Connection banner**: Appears within 5s of detecting offline. Non-invasive top banner: "You're offline — showing saved data"
2. **Optimistic updates**: Writes succeed immediately to local DB, sync in background
3. **Draft saved offline**: Auto-save form data every 30s with "Draft saved offline" indicator
4. **Sync queue indicator**: "3 items pending sync" in bottom sheet
5. **Manual sync button**: For critical actions (payments, match results)
6. **Wifi-only toggle**: Respect metered data plans — give users the option
7. **Offline fallback page**: Always available — "You're offline. Check your connection and try again."

### Background Sync

```tsx
// Queue write operations
async function submitMatchResult(result: MatchResult) {
  // Write to local DB immediately
  await localDB.matchResults.add(result);
  
  // Queue for sync
  await syncQueue.add({
    type: 'MATCH_RESULT',
    data: result,
    timestamp: Date.now(),
  });
  
  // Attempt sync if online
  if (navigator.onLine) {
    await syncQueue.processPending();
  } else {
    // Register for background sync
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      const reg = await navigator.serviceWorker.ready;
      await reg.sync.register('sync-match-results');
    }
  }
}
```

---

## 9. Viewport Units

### The `100vh` Problem on Mobile

Traditional `vh` units on mobile correspond to the **large viewport** (browser toolbar hidden). When the toolbar is visible (initial page load), `100vh` is taller than the actual visible area, causing content to overflow and requiring scroll to see the bottom.

### Viewport Unit Types

| Unit | Represents | When to use |
|---|---|---|
| `vh` | Large viewport (toolbar hidden) | Legacy fallback only |
| `svh` | Small viewport (toolbar visible) | Above-the-fold content, hero sections |
| `lvh` | Large viewport (toolbar hidden) | Immersive full-screen, splash screens |
| `dvh` | Dynamic viewport (changes with toolbar) | Adaptive layouts, sticky footers |

### Browser Support (2026)

| Browser | svh/lvh/dvh support |
|---|---|
| Chrome | 108+ ✅ |
| Safari | 15.4+ ✅ |
| Firefox | 101+ ✅ |
| Edge | 108+ ✅ |
| Samsung Internet | 21+ ✅ |
| KaiOS | ❌ not supported |

Coverage is ~96% globally. Always include `vh` fallback.

### KhelSetu Viewport Strategy

```css
/* Safe default for most full-height sections */
.hero-section {
  height: 100vh; /* Fallback */
  height: 100dvh; /* Dynamic — adapts to toolbar */
}

/* For above-the-fold content that must fit */
.live-score-header {
  min-height: 100svh; /* Always fits visible area */
}

/* For immersive overlays */
.fullscreen-overlay {
  height: 100lvh; /* Maximum space */
}
```

**Rules**:
1. **Default to `dvh`** for full-height containers — handles toolbar show/hide
2. **Use `svh`** for hero sections and above-the-fold content — must fit on initial load
3. **Use `lvh`** for immersive overlays and splash screens — fill maximum space
4. **Always include `vh` fallback** — `height: 100vh; height: 100dvh;`
5. **Avoid `dvh` on scroll-heavy elements** — causes layout reflow during toolbar transitions
6. **Test on real mobile browsers** — virtual keyboards don't affect viewport units, but some iOS versions have quirks with `position: fixed` + `dvh`

### Safe Area Insets

For edge-to-edge displays with notches and home indicators:

```css
.safe-bottom {
  padding-bottom: max(env(safe-area-inset-bottom, 0px), 16px);
}

.fullscreen-content {
  padding: env(safe-area-inset-top) env(safe-area-inset-right) 
           env(safe-area-inset-bottom) env(safe-area-inset-left);
}
```

---

## 10. Summary: KhelSetu Mobile-First Principles

### Design Principles

1. **Android-first**: 90%+ Nepali users are on Android. Test on budget phones.
2. **Mobile-first CSS**: Start with mobile layout, progressively enhance. Unprefixed = mobile.
3. **Touch-first interaction**: 48px minimum targets, one-handed use, no hover dependency.
4. **Offline-first architecture**: Local DB as source of truth, background sync, graceful degradation.
5. **Performance budget**: Design for 3G (~3 Mbps). If it works there, it works everywhere.
6. **Bottom nav on mobile**: 5 tabs, always visible. Hamburger for secondary nav only.
7. **Live data stability**: Scores update in place, no layout shift, predictable motion.
8. **Viewport-aware sizing**: Use `dvh` for full-height, `svh` for above-fold. Never bare `vh`.
9. **Swipe with alternatives**: Swipe gestures for navigation, but always provide tap fallbacks.
10. **Test on real devices**: Desktop throttling doesn't simulate budget Android. Test on actual hardware.

### Testing Matrix

| Device | Browser | Network | Priority |
|---|---|---|---|
| Budget Android (Tecno/Realme) | Chrome | 3G | **Critical** |
| Samsung A-series | Chrome | 4G | **Critical** |
| iPhone 12/14 | Safari | 4G | High |
| iPad Air | Safari | WiFi | High |
| Desktop 1440p | Chrome | WiFi | Medium |
| 1920p broadcast | Chrome | WiFi | Medium (overlay only) |

### Network Testing

| Throttle | Speed | Latency | Use case |
|---|---|---|---|
| Regular 3G | 1.5 Mbps | 562ms | Worst-case rural |
| Slow 4G | 4 Mbps | 200ms | Typical urban evening |
| Fast 4G | 20 Mbps | 50ms | Ideal mobile |
| WiFi | 50+ Mbps | 50ms | Home/office |
