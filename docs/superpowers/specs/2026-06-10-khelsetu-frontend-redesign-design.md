# KhelSetu Frontend Redesign — Design Spec

> **Date:** 2026-06-10
> **Status:** Approved
> **Approach:** Foundation-First (Approach A)
> **Goal:** Complete all frontend work in a single day with premium, lightweight, dynamic, human-centered design.

---

## Design Principles

1. **Lightweight** — Fast (2G/3G friendly), visually clean, code-simple (few dependencies, easy to maintain)
2. **High Dynamics (Restrained)** — Micro-interactions, real-time updates, rich animations — all purposeful, never decorative
3. **Human Touch** — Warm & approachable, WCAG accessible, Nepal-first localization (EN/NE, NPR, eSewa/Khalti)
4. **Quiet Authority** — Maroon/navy/gold palette, generous whitespace, premium without being loud

---

## Phase 1: Design System Foundation

### Problem
`index.css` has v1 blue brand colors (`--color-brand-*` = blue scale) conflicting with v2 maroon tokens in `themes.css`. Components are scaffolded but not consistently using v2 tokens.

### Solution

#### 1.1 Unify Token System
- Remove v1 blue `--color-brand-50` through `--color-brand-950` from `index.css` `@theme`
- Replace with v2 maroon scale mapped to Tailwind utilities
- Keep font stack: `--font-display` (Cormorant Garamond), `--font-sans` (Inter), `--font-mono` (JetBrains Mono)
- Add `--font-devanagari` (Noto Sans Devanagari) for Nepali locale

#### 1.2 Consolidate CSS Files
| File | Action | Reason |
|------|--------|--------|
| `index.css` | Keep as main file | Tailwind imports + @theme + base + utilities |
| `themes.css` | Keep as reference | Semantic tokens (bg-brand-primary, text-secondary, etc.) |
| `animations.css` | Keep as-is | Solid, has prefers-reduced-motion |
| `globals.css` | Delete | Redundant (just `@import 'tailwindcss'`) |

#### 1.3 Tailwind v4 Token Mapping
- Semantic utilities: `bg-brand-primary`, `text-secondary`, `border-subtle`, `bg-surface`, etc.
- Sport accents: `bg-sport-cricket`, `text-sport-football`, etc.
- Shadows: `shadow-brand` (maroon-tinted), `shadow-gold` (gold-tinted)
- All tokens flip automatically in dark mode via `.dark` class

#### 1.4 Component Token Rules
- Components consume semantic tokens ONLY (`bg-brand-primary`, not `bg-red-800`)
- No raw hex values in component code
- Dark mode works automatically via token system

---

## Phase 2: Login Page (`/login`)

### Layout
- Centered single column, 480px max-width (`--container-narrow`)
- Background: `--bg-canvas` with subtle 1px grid pattern (3% opacity)
- No header/footer — full focus on form

### Form Structure
1. Logo + "KhelSetu" wordmark
2. "Welcome back." (Cormorant Garamond, `text-display-sm`)
3. "Sign in to manage your tournaments." (`text-secondary`)
4. Email field (label above, placeholder `you@club.org`, `inputmode="email"`)
5. Password field (show/hide toggle, 44px touch target)
6. "Forgot password?" link (right-aligned, `--text-link`)
7. "Sign in" button (maroon primary, full-width, 48px, `shine` effect)
8. "or" divider with hairlines
9. "Continue with Google" button (secondary, full-width)
10. "New to KhelSetu? Create an account" (centered)
11. Language toggle `EN | NE` at bottom-right

### States
- **Loading:** Spinner in button, all inputs disabled
- **Error:** Inline error below password, shake animation (200ms), red border
- **Forgot password:** Replaces form with email-only → "Send reset link" → success state

### Human Touch
- Warm micro-copy ("Welcome back" not "Login to your account")
- Smooth 240ms transitions on focus/hover
- Gold focus ring on inputs (`focus-gold` utility)
- Clean but approachable — banking app feel

### Components
- `Button` (primary + secondary) — v2 token update
- `Input` (with label + error) — v2 token update
- `Logo` — exists
- **New:** `LanguageToggle` (EN | NE segmented control)

---

## Phase 3: Landing Page (`/`)

### Section Stack (11 sections)

1. **Hero** (640px desktop, 480px mobile)
   - Background: `--gradient-hero` (maroon) with subtle grid overlay
   - Eyebrow: "KhelSetu · नेपालको लागि" (gold)
   - Headline: "Run your local tournament like a national one." (Cormorant, `text-display-xl`)
   - Subhead: operations platform description, max 2 lines
   - CTAs: "Start a tournament" (primary, 56px) + "Watch a 90-second tour" (ghost white)
   - Trust microcopy: "Free for clubs under 8 teams · No credit card · 24/7 Nepali support"

2. **Trust Bar** — Grayscale logo marquee, "Trusted by 500+ organizers across Nepal"

3. **Featured Sports** — 4-card grid (Cricket, Football, Volleyball, Basketball)
   - Each: sport icon (32px), name EN+NE, live count badge
   - Hover: 2px lift + sport-color top border

4. **Live Snapshot** — "Right now, on KhelSetu" with LIVE pulse chip
   - 3-column grid of live match cards
   - Empty state: "No matches live right now. Check back at 2 PM."

5. **Services Overview** — 3 alternating feature blocks (image-left/right)
   - Tournament Setup, Live Scoring, Results & Memberships

6. **Testimonials** — 3 cards side-by-side (no carousel)
   - Quote (italic, Cormorant), photo (48px circle), name + role + club

7. **Stats Strip** — 4 numbers with count-up on scroll
   - "1,200+ tournaments run" / "48,000+ matches scored" / "32 districts" / "98% retention"

8. **Pricing Teaser** — 3-tier cards
   - Starter (free) / Club (NPR 2,500/mo, highlighted) / District (NPR 9,500/mo)
   - Monthly/Annual toggle (17% off annual)

9. **News Highlights** — 3 latest articles (cover image, category, title, excerpt)

10. **Final CTA** — Full-bleed maroon gradient
    - "Ready to run your tournament like a national one?"

11. **Footer** — 4-column grid, dark background, social links

### Dynamics
- Count-up on stats (IntersectionObserver)
- Hero stagger-reveal (headline → sub → CTAs at 100ms intervals)
- Card hover lifts (2px + shadow)
- Trust bar marquee (40s infinite)
- All respect `prefers-reduced-motion`

### Performance Targets
- < 100KB critical CSS
- < 200KB JS for first load
- No images on first paint (hero is CSS gradient)
- Sport icons are inline SVGs
- Sections lazy-load below fold

### Components
- `Header` (sticky, glass on scroll) — v2 update
- `Footer` — v2 update
- `Button` (xl size, ghost variant)
- `SportIcon` — exists
- **New:** `StatCounter`, `TestimonialCard`, `PricingCard`, `LiveMatchCard`, `NewsCard`

---

## Phase 4: Dashboard (`/app`)

### Layout
- App sidebar (240px expanded / 64px collapsed) + main content
- Mobile: bottom tab bar (5 items) + drawer

### Page Structure

1. **Top bar (64px)** — "Dashboard" title, search button, notifications bell (badge), user avatar

2. **Welcome strip** — "Good morning, {name}." + "12 tournaments running, 4 matches live"

3. **KPI row (4 cards)** — Active tournaments, Live matches, Total teams, Pending actions
   - Each: icon, large number, trend delta, sparkline

4. **Live matches panel** — Cards with sport chip, teams, score, over/minute, "Open scorer" CTA

5. **Activity feed** — Recent actions, timestamped, filterable

6. **Quick actions grid** — 6 shortcut cards (New Tournament, Add Team, Schedule Match, etc.)

7. **Upcoming schedule** — Next 5 matches as compact cards

### Dynamics
- Real-time updates via WebSocket (scores, notifications)
- KPI count-up on mount
- Activity feed auto-scrolls
- Sidebar collapse animation (240ms)

### Components
- `Sidebar` + `SidebarContent` — v2 update
- `StatsCard` — v2 update
- `LiveMatchesPanel` — v2 update
- `ActivityFeed` — v2 update
- `OnboardingChecklist` — exists
- `CommandPalette` — exists
- `MobileTabBar` — v2 update

---

## Phase 5: Live Scoring (`/app/scoring/:matchId`)

### Layout
- Full-screen (no sidebar — maximize space)
- Top bar: match info + connection indicator (green/yellow/red)
- Main: sport-specific scoring panel
- Bottom: action bar (undo/redo, save, end match)

### Sport-Specific Panels

**Cricket** (most complex):
- `CricketScoringPanel` — Run buttons (0,1,2,3,4,6), Extras (wide, no-ball, bye, leg-bye)
- `BatsmanSelector` + `BowlerSelector`
- `OverTracker` — Visual over-by-over display
- `InningsSummary` — Full scorecard
- `PartnershipDisplay` + `LiveCommentary`
- `WicketModal` — Dismissal type, fielder selection

**Football:**
- `FootballScoringPanel` — Goal button, Card buttons (yellow/red)
- `MatchTimer` — Running clock, half-time indicator
- `EventTimeline` + `StatsTracker` (possession, shots, fouls)

**Volleyball:**
- `VolleyballScoringPanel` — Point buttons per team
- Set tracker, rotation indicator

**Basketball:**
- `BasketballScoringPanel` — 1pt/2pt/3pt buttons
- Foul tracker, quarter timer

### Dynamics
- WebSocket real-time updates — score changes push to all clients
- Optimistic UI — instant update on tap, sync with server
- Undo/redo stack (last 5 actions)
- Score flash animation (200ms gold pulse)
- Offline queue — actions queue when disconnected, sync when back online
- Live indicator: green dot pulses every 2s

### Error Handling
- Connection lost: yellow banner "Reconnecting...", actions queued
- Server error: toast, retry once, then queue
- Validation: inline errors (e.g., "Select batsman first"), not blocking

### Testing
- Unit: scoring calculations (cricket run rates, football timer)
- Integration: scoring flow (add event → update score → undo)
- E2E: full match scoring session (Playwright)

---

## Phase 6: Remaining Pages

### Auth Pages
- **Register** (`/signup`) — 3-step wizard (account → organization → first tournament)
- **Forgot password** — Email flow, success state

### Public Pages
- **About** (`/about`) — Mission, timeline, team, values
- **Services** (`/services`) — Feature catalog, comparison table
- **Teams** (`/teams`) — Filterable grid + detail page with tabs
- **Schedules** (`/schedules`) — Calendar/list toggle, filter bar, match cards
- **Membership** (`/membership`) — 3-tier pricing, FAQ, payment methods
- **News** (`/news`) — Article grid + detail (prose container, 720px)
- **Contact** (`/contact`) — Form + info card + FAQ

### App Pages
- **Tournaments** — CRUD, bracket view, form wizard
- **Teams** — CRUD, player management
- **Players** — Profiles, edit
- **Schedule** — Match scheduling, calendar
- **Standings** — Auto-calculated rankings table
- **Billing** — Current plan, usage meters, history
- **Notifications** — Notification center
- **Settings** — Profile, organization, users
- **Reports** — Charts (Recharts), data visualization
- **User Roles** — Permission management
- **Audit Log** — Activity tracking table
- **Data Import** — Bulk import tools
- **Live Broadcast** — Streaming, overlay management
- **Search** — Global search results
- **Offline Sync** — Queue status, retry controls

### Shared Patterns (all pages)
- Consistent header/sidebar from Phase 4
- Same card, table, form, modal components
- Same motion tokens (200ms transitions, card hover lifts)
- Same error/loading/empty states
- Dark mode automatic via token system

### Quality Gates (per page)
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] Dark mode renders correctly
- [ ] Keyboard navigation works
- [ ] Empty states have honest, helpful copy
- [ ] Loading states use skeletons (not spinners)
- [ ] Error states are inline, not blocking
- [ ] No raw hex values (semantic tokens only)
- [ ] `prefers-reduced-motion` respected
- [ ] Focus states visible
- [ ] `cursor-pointer` on all clickable elements

---

## Technical Decisions

### CSS Architecture
- Tailwind v4 with `@tailwindcss/vite` plugin
- Semantic tokens in `@theme` block
- Dark mode via `.dark` class on `<html>`
- Component styles via `@layer components`

### Font Loading
- Self-hosted (Google Fonts CDN blocked in parts of Nepal)
- `font-display: swap` for all fonts
- Preload Latin subset for landing; Latin + Devanagari for NE locale

### Performance
- Code splitting via Vite manual chunks (vendor-react, vendor-query, vendor-motion, etc.)
- CSS code splitting enabled
- Target: < 100KB critical CSS, < 200KB JS for first load
- Lazy-load sections below fold
- Inline SVGs for icons (no icon font)

### Accessibility
- WCAG AA compliance (4.5:1 text contrast minimum)
- `prefers-reduced-motion` disables all animations
- Focus rings visible (2px maroon outline, 2px offset)
- `lang="ne"` on `<html>` when Nepali locale active
- Skip-to-content link
- ARIA labels on all interactive elements

### Testing
- Unit: Vitest (stores, utilities, scoring logic)
- Integration: Vitest + React Testing Library (component flows)
- E2E: Playwright (Chromium + Mobile Chrome)
- Coverage target: 80% for stores and utilities
