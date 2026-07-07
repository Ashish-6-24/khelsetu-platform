# 12 — Cricket Scoring UX

## Endpoints covered

```
POST /api/scoring/matches/{matchId}/innings/start
POST /api/scoring/matches/{matchId}/deliveries
POST /api/scoring/matches/{matchId}/deliveries/{deliveryId}/undo
GET  /api/scoring/matches/{matchId}/innings/{inningsNumber}
GET  /api/scoring/matches/{matchId}/replay/test
POST /api/scoring/matches/{matchId}/super-over/start
POST /api/scoring/matches/{matchId}/super-over/deliveries
POST /api/scoring/matches/{matchId}/super-over/complete
POST /api/scoring/matches/{matchId}/reviews/initialize
POST /api/scoring/matches/{matchId}/reviews/request
PUT  /api/scoring/matches/{matchId}/reviews/{reviewId}/decide
GET  /api/scoring/matches/{matchId}/reviews
```

## Mental model

Cricket scoring is a **ball-by-ball** event stream with rich state
(overs, wickets, partnerships, follow-on, DRS, super over). The scoring
console is the most demanding surface in the product: it must be fast,
unambiguous, and forgiving.

The cricket engine is built on the generic event log with cricket-specific
event types: `delivery`, `innings_start`, `innings_end`, `wicket`, `wide`,
`no_ball`, `bye`, `leg_bye`, `free_hit`, `drs_request`, `drs_decision`,
`super_over_*`.

## Screens

### 12.1 Cricket scoring console — `/o/:orgSlug/scoring/:matchId`

- **Top: Score header**
  - Team A: logo, name, score (runs/wickets), overs (e.g. "12.3"), RR.
  - Team B: same.
  - Target: shown in 2nd innings.
  - Required RR, current RR.
  - **LivePulse** + "LIVE" badge.
  - Match clock (for limited-overs cutoff).
- **Middle: Batsmen & Bowler**
  - Striker card: name, runs, balls, 4s, 6s, SR, "on strike" indicator.
  - Non-striker card.
  - Bowler card: name, overs, maidens, runs, wickets, econ.
  - **Partnership** pill: runs, balls.
  - **Last ball** indicator (4, 6, W, Wd, Nb, etc.).
- **Right (desktop) / Bottom (mobile): Action grid**
  - **Run buttons:** 0, 1, 2, 3, 4, 6 (large, primary / accent).
  - **Extras:** Wd, Nb, B, Lb (with sub-buttons for "+runs").
  - **Wicket:** W (danger).
  - **Special:** Free Hit, DRS, Review, End Over, New Batsman, New Bowler.
  - **Undo** (top-right of action panel).
- **Bottom-right: Event log** (or bottom on mobile).
  - This over: sequence of balls.
  - Recent overs: collapsible.
  - Each ball: icon, label, batsman, bowler, run/wicket, total.

### 12.2 Innings start screen

- **Form:** batting team, bowling team, opening batsmen (×2), opening
  bowler, format reminder (T20 / ODI / Custom).
- **Validation:** at least 2 batsmen and 1 bowler.
- **Submit:** "Start innings" → console opens with first ball ready.

### 12.3 Ball-by-ball scorer

- The action grid is the ball-by-ball scorer.
- Tapping a run button records the ball.
- **Runs + extras:** modal asks for "batsman runs" and any byes / leg-byes.
- **Wicket:** modal asks for wicket type (bowled, caught, lbw, run-out,
  stumped, hit-wicket), fielder (if applicable), new batsman.
- **Free hit** is shown as a chip after a no-ball; the next delivery is
  marked automatically.

### 12.4 Delivery result form (modal)

- **Common:** batsman (default striker), bowler, runs off bat, total runs
  (auto-fills based on extras).
- **Extras:** wide (+1..+5), no-ball (+1), bye (+1..+4), leg-bye (+1..+4).
- **Wicket:** wicket type, fielder, new batsman (if batsman out).
- **Confirmation** for any wicket (destructive action).
- **Save & Next Ball** (default) / **Save & End Over**.

### 12.5 Undo delivery flow

- **Quick undo:** top-right "Undo" reverts last ball with a confirm modal.
- **Selective undo:** from the event log, swipe / tap a ball to undo it
  and all subsequent balls in the over.
- **Audit:** all undos are recorded with reason.

### 12.6 Innings stats panel

- **Top:** runs, wickets, overs, RR.
- **Batsmen table:** runs, balls, 4s, 6s, SR, out / not out.
- **Bowlers table:** overs, maidens, runs, wickets, econ.
- **Fall of wickets:** list of partnerships broken with score at fall.
- **Partnerships:** unbroken + broken.
- **Extras breakdown:** wd, nb, b, lb, total.

### 12.7 DRS review panel

- **Trigger:** during a live match, the "DRS" button (or "Review" in
  limited-overs) opens the request form.
- **Form:** reviewing team, batsman / bowler, reason (chips: caught
  behind, LBW, run-out, stumping, other + text), third umpire.
- **State machine:** `requested → in_review → upheld | overturned |
pending`.
- **UI:** timeline of all reviews with decisions and impact on score.
- **Decision buttons:** "Upheld" / "Overturned" / "Pending" with reason.

### 12.8 Super over panel

- **Trigger:** tied match → "Start Super Over" CTA.
- **Form:** batting team, bowling team, batsmen, bowler.
- **Console:** mini scoring console (max 6 balls per side).
- **Complete:** winner declared. If still tied, second super over.

### 12.9 Replay test panel

- **Use:** verifying scoring state by re-running deliveries.
- **UI:** "Run replay test" button → progress → result (OK / mismatch).
- **Mismatch:** show diff between expected and actual state.

### 12.10 Follow-on eligibility panel

- **Trigger:** end of 1st innings.
- **API:** `/api/scoring/matches/{matchId}/follow-on/check` returns eligible
  / not eligible.
- **UI:** "Follow-on available" or "Not eligible (lead < 200)" badge.
- **Action:** "Enforce follow-on" button if captain chooses to enforce.

### 12.11 Cricket live scoreboard (overlay-ready widget)

- **Large scoreboard** for OBS overlay: team A, team B, score, overs,
  batsmen, bowler, RR, target.
- **Compact** for public portal: team A score, team B score, overs, RR.
- **Lower-third** style for broadcast.

## Components

- `<CricketScoreboard>`, `<CricketActionGrid>`, `<BatsmanCard>`,
  `<BowlerCard>`, `<PartnershipPill>`, `<ThisOverStrip>`, `<WicketModal>`,
  `<DRSRequestModal>`, `<DRSTimeline>`, `<SuperOverConsole>`,
  `<InningsStatsPanel>`, `<CricketOverlayWidget>`.

## UX principles

- **Glanceable:** batsman, bowler, score, overs, this over always visible.
- **One-tap actions:** 0/1/2/3/4/6 are single tap.
- **Safe destructive:** wicket and DRS decisions confirm.
- **Keyboard-friendly:** number keys 0-6, W for wicket, U for undo.
- **Touch-friendly:** buttons ≥ 64×64px.

## States

- **Pre-innings:** lineup form.
- **1st innings / 2nd innings / Super over / Innings break.**
- **All out:** show batting card end, prompt for new innings.
- **Declared:** show declaration reason, prompt for new innings.
- **Drs in progress:** modal blocks input; show progress.
- **Match over:** summary view, "Sign off" CTA.

## Permissions

- `match.score:write` to add deliveries.
- `match.score:undo` to undo deliveries.
- `scoring.replay:read` to view replay.

## Mobile

- Action grid: 3×3 with 0/1/2/3 on top, 4/6/extras on second row,
  wicket/specials on third row.
- Batsmen / bowler cards collapse to a single horizontal scroll.
- "End over" button is sticky.

## Realtime

- All scoring events stream to public scoreboard and overlay.
- `match:clock_tick` updates the match clock.
- `drs:status` events update the DRS panel.

## Keyboard shortcuts (tablet scoring)

| Key   | Action                           |
| ----- | -------------------------------- |
| 0–6   | Run                              |
| W     | Wicket                           |
| E     | Extras (cycle: Wd → Nb → B → Lb) |
| U     | Undo                             |
| Space | End over                         |
| N     | New batsman                      |
| B     | Change bowler                    |
| D     | DRS                              |
| Esc   | Close modal                      |
