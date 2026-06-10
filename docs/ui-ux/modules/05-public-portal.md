# 05 — Public Portal UX

## Endpoints covered

```
GET  /api/public/tournaments
GET  /api/public/tournaments/{id}
GET  /api/public/matches/{id}/score
GET  /api/public/user/quota
POST /api/public/matches/create
GET  /api/public/plans
```

## Public portal mental model

The public portal is the **growth engine** of KhelSetu. It must be:

- **Fast** — under 1.5s LCP on 3G.
- **Mobile-first** — 80% of public traffic is expected on phones.
- **Localised** — `en` (default), `ne` (Nepali), `hi` (Hindi).
- **Read-mostly** — only one mutation: creating a free match (gated by quota).
- **Realtime on the live page** — WebSocket subscription per match.

## Screens

### 5.1 Public home — `/`
- **Hero:** Bold headline ("Run real sports, in real time."), 2 CTAs
  ("Watch live" / "Create free match"), live match ticker (top 3 LIVE
  matches, horizontal scroll on mobile).
- **Sections (in order):**
  1. Live now (carousel of LIVE matches)
  2. Featured tournaments (cards)
  3. Sports (icons + counters: "124 football, 87 cricket, 41 basketball")
  4. How it works (3 steps, animation on scroll)
  5. Plans teaser (3 cards, "Best for organisers")
  6. Testimonials / social proof (carousel)
  7. Final CTA + footer
- **Header:** logo, Tournaments, Live, Plans, Sign in, language switcher.
- **Mobile:** sticky bottom CTA "Create free match".

### 5.2 Tournament listing — `/tournaments`
- **Filters:** sport (chips), status (upcoming, live, completed), country
  (Nepal first), date range, search.
- **Sort:** relevance, date, popularity, "live first".
- **Cards:** logo, name, sport icon, status badge, start–end date, team count,
  "View" button.
- **Pagination:** infinite scroll with sentinel loading.
- **Empty:** "No tournaments match your filters" + "Clear filters" CTA.
- **Loading:** 6 skeleton cards.

### 5.3 Tournament details — `/tournaments/:id`
- **Header:** logo, name, sport, status, date range, organiser, follow
  button (saves to local list).
- **Tabs:** Overview, Teams, Fixtures, Standings, Stats.
- **Overview:** description, rules (markdown), venue(s), gallery, "Share"
  button.
- **Teams:** grid of team cards (logo, name, captain, group).
- **Fixtures:** bracket view (knockout) or schedule list (league) with date
  filter.
- **Standings:** read-only table with form, points, GD.
- **Stats:** top scorers, top wicket-takers, discipline, attendance.

### 5.4 Live matches listing — `/live`
- All matches currently LIVE, sorted by recency.
- Card shows team logos, current score, period/over, "LIVE" pulse, "Watch"
  button.
- Empty state: "No live matches right now. Check the schedule."

### 5.5 Match details — `/matches/:id`
- **Header:** teams, current score (big), live indicator, share, follow.
- **Tabs:** Live, Scorecard/Stats, Commentary, Lineups, Timeline.
- **Live tab:** event feed + clock, "Join conversation" (future).
- **Scorecard tab:** sport-specific breakdown (cricket scorecard, football
  stats, basketball box score).
- **Commentary tab:** commentary items as a feed.
- **Lineups tab:** formations (football), playing XI (cricket), starting five
  (basketball).
- **Timeline tab:** all events, filterable by team and type.

### 5.6 Live score page — `/matches/:id/live`
- **Sticky score header** with team A name + score, team B name + score,
  period/over/clock, LIVE pulse.
- Below: event log (newest first), with sport-specific formatting.
- **Subscribe:** on mount, opens WebSocket to that match. Unsubscribes on
  unmount.
- **Reconnect indicator:** small dot in header if disconnected.

### 5.7 Standings — `/tournaments/:id/standings`
- League table (sortable), form icons (W/D/L), tie-break indicator.
- Snapshot timestamps at bottom.
- Mobile: sticky first column, horizontal scroll for the rest.

### 5.8 Fixtures — `/tournaments/:id/fixtures`
- Bracket view (knockout) or schedule (league) with date filters.
- Click a match → match details page.

### 5.9 Team page — `/teams/:id`
- Team header (logo, name, sport, city).
- Tabs: Overview, Roster, Schedule, Stats, History.
- Follow button.

### 5.10 Player page — `/players/:id`
- Player header (avatar, name, role, current teams).
- Career stats by sport.
- Match log.

### 5.11 Search results — `/search?q=...`
- Top: search input with type-ahead suggestions.
- Tabs: All, Tournaments, Teams, Players, Matches.
- Empty / no results state with popular suggestions.

### 5.12 Plans / Pricing — `/plans`
- Three pricing cards (Starter, Pro, Enterprise).
- Feature comparison table.
- "Most popular" badge on Pro.
- CTAs: "Start free" / "Talk to sales".
- FAQ accordion.

### 5.13 Free match creation — `/matches/new`
- **Wizards:** Basics → Teams → Sport config → Review.
- **Quota indicator** at top: "You've used X of N free matches this month."
- **Sport config:**
  - Cricket: overs, format (T20/ODI/custom), follow-on toggle.
  - Football: halves, extra time, penalties, substitutions.
  - Basketball: quarters, overtime, shot clock.
- **Review:** shows summary + estimated resource use.
- **Success:** match created, "Take me to scoring" or "Share with friends".

### 5.14 Quota indicator / usage banner
- **Inline banner** on the free-match wizard: progress bar of usage.
- **Toast** when 80% and 100% thresholds are reached.
- **Modal** when over quota: upgrade CTA.

## Public UX requirements (cross-cutting)

- **Performance budgets:** LCP < 1.5s, CLS < 0.05, INP < 200 ms.
- **Card grid:** 4 cols ≥ xl, 3 cols ≥ lg, 2 cols ≥ md, 1 col < md.
- **Live emphasis:** any LIVE match has a red pulse + glow. NEVER use
  `text-red-500` alone — always pair with an icon.
- **Search:** top bar with `/` keyboard shortcut, type-ahead.
- **Filters:** collapsible on mobile (chip bar) + filter sheet.
- **Sorting:** dropdown with `aria-label="Sort by"`.
- **Standings:** tabular numbers, monospace digits.
- **Timeline:** vertical, newest at top, virtualised.
- **Team / player profile cards:** include follow button + share.
- **CTA to register / log in:** inline banner on every public page if the
  visitor is anonymous ("Sign in to follow this tournament").
- **Plan comparison:** highlight differences with checkmarks and "—" not
  just colour.
- **Free quota awareness:** persistent banner on /matches/new with reset
  date.

## Mobile layout

- Bottom tab bar on home, tournaments, live, plans, profile.
- Top bar with search + language switcher.
- Cards collapse to single column.
- Filters in a bottom sheet.

## Realtime

- `/live` page subscribes to `live:ticker` (server emits a list of LIVE
  matches periodically).
- `/matches/:id/live` subscribes to `match:{id}` and `match:{id}:score_update`,
  `match:{id}:event_added`, `match:{id}:status_change`.
- Disconnection shows a small dot — the page keeps working with last-known
  data and re-syncs on reconnect.

## Offline behaviour

- Public portal caches the last 10 visited pages in a service worker
  (stale-while-revalidate).
- The live page gracefully degrades to polling every 15s when offline.
- Read-only experience — no offline mutations on public.
