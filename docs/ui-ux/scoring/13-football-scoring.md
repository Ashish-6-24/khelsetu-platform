# 13 — Football Scoring UX

## Endpoints covered

```
POST   /api/scoring/matches/{matchId}/football/lineup
POST   /api/scoring/matches/{matchId}/football/substitutions
GET    /api/scoring/matches/{matchId}/football/substitutions
GET    /api/scoring/matches/{matchId}/football/substitutions/{teamId}/status
POST   /api/scoring/matches/{matchId}/football/period/start
POST   /api/scoring/matches/{matchId}/football/period/end
GET    /api/scoring/matches/{matchId}/football/period/current
GET    /api/scoring/matches/{matchId}/football/periods
PATCH  /api/scoring/matches/{matchId}/football/period/injury-time
POST   /api/scoring/matches/{matchId}/football/verify-replay
POST   /api/scoring/matches/{matchId}/football/match/end
POST   /api/scoring/matches/{matchId}/football/events/{eventId}/undo
GET    /api/scoring/matches/{matchId}/football/corrections
POST   /api/scoring/matches/{matchId}/football/events/{eventId}/correct
POST   /api/scoring/matches/{matchId}/football/eligibility/initialize
POST   /api/scoring/matches/{matchId}/football/eligibility/lineup
GET    /api/scoring/matches/{matchId}/football/eligibility/team/{teamId}
GET    /api/scoring/matches/{matchId}/football/eligibility/player/{playerId}
GET    /api/scoring/matches/{matchId}/football/eligibility
POST   /api/scoring/matches/{matchId}/football/var/initiate
PATCH  /api/scoring/matches/{matchId}/football/var/{reviewId}/status
POST   /api/scoring/matches/{matchId}/football/var/{reviewId}/decision
GET    /api/scoring/matches/{matchId}/football/var/stats
GET    /api/scoring/matches/{matchId}/football/var
POST   /api/scoring/matches/{matchId}/football/penalties/initialize
POST   /api/scoring/matches/{matchId}/football/penalties/start
POST   /api/scoring/matches/{matchId}/football/penalties/kick
GET    /api/scoring/matches/{matchId}/football/penalties/kicks
GET    /api/scoring/matches/{matchId}/football/penalties/next-kicker
POST   /api/scoring/matches/{matchId}/football/penalties/abandon
GET    /api/scoring/matches/{matchId}/football/penalties/status
```

## Mental model

Football scoring is a **clock-driven event stream** where the source of truth is
the **period state machine** (1H → HT → 2H → FT → ET1 → ET2 → PSO) plus a
running clock with injury time. Every event (goal, card, sub, foul, VAR) is
timestamped to a period + minute + injury minute. The console must:

- Always show the live clock and current period.
- Enforce substitution / eligibility rules client-side and reconcile with
  server.
- Treat **VAR** and **Penalty shootout** as first-class flows with their own
  modal stack.
- Provide **corrections** (post-event edits) and **undo** within a grace
  window.

The football engine builds on the generic event log with football event
types: `goal`, `own_goal`, `penalty_goal`, `yellow_card`, `red_card`,
`second_yellow`, `substitution`, `foul`, `offside`, `corner`, `free_kick`,
`shot`, `save`, `var_review`, `injury_time_added`, `period_start`,
`period_end`, `penalty_shootout_kick`.

## Screens

### 13.1 Football scoring console — `/o/:orgSlug/scoring/:matchId` (sport=football)

- **Top: Sticky score header**
  - Team A: crest, name, score, possession % (if tracked).
  - Team B: same.
  - **Period chip** (`1H`, `2H`, `ET1`, `ET2`, `PSO`), **clock** (mm:ss),
    **+injury time** badge.
  - **LIVE pulse**, **VAR badge** when active.
- **Middle: Pitch mini-map** (optional, collapsible)
  - 2D pitch with goal scorers' positions, current possession side.
- **Right (desktop) / Bottom (mobile): Action grid**
  - **Goal** (primary): opens goal modal (scorer, assist, shot type, body
    part, position chip).
  - **Card** (yellow / red / 2nd-yellow): player, reason chip.
  - **Substitution**: out / in players, eligibility check.
  - **Foul / Offside / Corner / Free kick / Shot / Save**: secondary chips.
  - **VAR**: opens VAR modal.
  - **Injury time +1 / +2 / +3 / custom**.
  - **End period** (primary at end of half).
  - **Undo** (top-right, last action one-tap).
- **Bottom-right: Event feed** (filterable by team, type, period).
- **Left rail: Lineup panel** (collapsible) showing starting XI and bench
  with quick-sub.

### 13.2 Lineup builder — `/o/:orgSlug/scoring/:matchId/lineup`

- **Two columns**: Team A, Team B.
- **Formation selector** (4-4-2, 4-3-3, 3-5-2, 4-2-3-1, custom).
- **Drag-and-drop** players onto pitch positions; bench underneath.
- **Captain badge** (single per team), **GK badge** (auto for goalkeeper).
- **Eligibility chip** per player (eligible / suspended / not registered).
- **Squad numbers** editable inline.
- **Save**: posts to `/football/lineup`, locks lineup once match starts.
- **Validation**: 11 starters per team, 1 goalkeeper, max bench size from
  tournament rules, no suspended players.

### 13.3 Substitution panel

- **Modal opened from action grid or lineup**.
- **Fields**: out player (from on-field), in player (from bench), minute,
  reason (tactical, injury, red-card replacement).
- **Live counter**: subs used / max allowed per team (configurable; default
  5 in modern rules with 3 windows).
- **Window enforcement**: warn when team has used all 3 substitution
  windows.
- **Status view**: `/football/substitutions/{teamId}/status` shows
  remaining subs and windows.
- **Concurrent subs**: support 2+ subs in one stoppage (same window).
- **Confirm** → optimistic update → server reconciliation.

### 13.4 Period timer control

- **Persistent clock widget** in console header.
- **Start period** button (`POST /football/period/start`): only enabled when
  prior state is `ready` or `period_ended`.
- **End period** button (`POST /football/period/end`): confirmation modal
  showing snapshot of score, events, injury time added.
- **Auto-suggest** end-of-period at minute 45 + injury, 90 + injury.
- **Pause / resume** for stoppages (injury, VAR, cooling break).
- **Period list view**: `/football/periods` rendered as a timeline of all
  periods with start/end timestamps and injury added.

### 13.5 Injury time editor

- **PATCH `/football/period/injury-time`** updates the displayed extra
  minutes for the current period.
- **UI**: stepper (`+1 / +2 / +3`) or custom input.
- **Display**: appears as `+3'` chip next to the clock.
- **Audit**: changes are logged with editor and timestamp.

### 13.6 Replay verification screen

- **Trigger**: post-match or during a dispute, run
  `/football/verify-replay`.
- **Output**: deterministic replay of the entire event stream.
- **UI**: progress bar, then PASS (green) / MISMATCH (red) with diff.
- **Mismatch panel**: lists divergences with "Open event" deep links.

### 13.7 Event correction screen — `/o/:orgSlug/scoring/:matchId/corrections`

- **List**: all events with `is_correctable` flag.
- **Inline edit**: modify scorer/assist for a goal, change card type,
  reassign foul to another player.
- **Reason field** required for any correction.
- **History**: `/football/corrections` returns all corrections with editor,
  before/after, reason. Rendered as a timeline.
- **Undo path**: `POST /football/events/{eventId}/undo` removes an event
  outright (vs correct, which mutates).

### 13.8 Eligibility dashboard — `/o/:orgSlug/scoring/:matchId/eligibility`

- **Initialize**: `POST /football/eligibility/initialize` (once per match).
- **Per-team table** (`/eligibility/team/{teamId}`): each player with
  status (eligible, suspended, yellow-card-accumulated, injured, ineligible
  registration), reason, source rule, override CTA (admin only).
- **Per-player view** (`/eligibility/player/{playerId}`): suspension
  history, yellow accumulation, return date.
- **Match-wide view** (`/eligibility`): ineligible players highlighted with
  badges; lineup-time validation `POST /football/eligibility/lineup`
  blocks ineligible players from the starting XI.

### 13.9 VAR dashboard — `/o/:orgSlug/scoring/:matchId/var`

- **Header**: VAR connection state, VAR official, current review.
- **Initiate review** modal: incident type (goal, penalty, red card,
  mistaken identity), event link, on-field decision, location chip.
- **Status board**: review lifecycle (`pending → in_review → on_field_review
→ decision`). PATCH status for each transition.
- **Decision modal**: confirm / overturn / no review possible, final
  decision text, optional clip URL.
- **VAR stats panel** (`/var/stats`): total reviews, average duration,
  reversals.
- **VAR list** (`/var`): full review history.

### 13.10 VAR review queue (broadcast aside)

- A **side drawer** visible on the scoring console while a VAR is active:
  - Pulsing "VAR CHECK" banner.
  - Incident summary.
  - On-field decision.
  - Suggested actions (confirm / change).
  - Block scoring inputs that depend on the disputed event until decision.

### 13.11 Penalty shootout screen — `/o/:orgSlug/scoring/:matchId/penalties`

- **Initialize**: `POST /football/penalties/initialize` (team order, taker
  list per team).
- **Start**: `POST /football/penalties/start`.
- **Kick form**: kicker (auto from `/penalties/next-kicker`), result
  (scored / saved / missed / hit post / hit bar), GK, save/save-position.
- **Scorecard grid**: 5x2 + sudden death rows, each cell shows kicker,
  result icon, current running tally.
- **Next kicker preview** banner.
- **Status panel** (`/penalties/status`): current round, score, sudden
  death flag, winner if decided.
- **Abandon flow**: `POST /penalties/abandon` with reason (lights out,
  crowd safety) → confirm modal.

### 13.12 Match end confirmation

- **CTA**: "End match" (only enabled when current period is full-time or
  shootout decided).
- **Modal**: final score, period summary, MOTM (optional), any pending
  reviews warning.
- **Action**: `POST /football/match/end`.

### 13.13 Correct scoring event flow

- From **event feed**, swipe / context-menu → "Correct".
- Modal pre-fills event data; reason required.
- `POST /football/events/{eventId}/correct` updates and creates a
  correction record.
- Undo (separate) wipes the event; correction edits in place.

## Components

- `<FootballScoreboard>`, `<PeriodClock>`, `<InjuryTimeStepper>`,
  `<LineupBuilder>`, `<FormationPicker>`, `<SubstitutionModal>`,
  `<SubstitutionStatusChip>`, `<GoalEntryModal>`, `<CardEntryModal>`,
  `<EventCorrectionModal>`, `<ReplayVerifyPanel>`, `<EligibilityTable>`,
  `<EligibilityBadge>`, `<VARStatusBanner>`, `<VARReviewModal>`,
  `<VARStatsPanel>`, `<PenaltyShootoutBoard>`, `<NextKickerCard>`,
  `<MatchEndConfirmModal>`, `<FootballOverlayWidget>`.

## UX principles

- **Always show the clock and period.** The user must never lose temporal
  context.
- **One screen for VAR, one for penalties.** Don't bury these in modals
  that compete with normal scoring.
- **Enforce eligibility at lineup time, not just at submit time.**
  Players ineligible for the match should be visually blocked.
- **Undo wipes; Correct edits.** The two are presented separately and
  labelled clearly.
- **Substitutions show remaining count and remaining windows** so coaches
  can plan.
- **Penalty shootout grid is the single source of truth** during the
  shootout — block other scoring actions.

## States

- **Pre-match:** lineup not submitted → "Submit lineup to start" banner.
- **Lineup submitted, not started:** "Start 1st Half" CTA.
- **1H / 2H / HT / FT / ET1 / ET2 / PSO** — each is a distinct console
  state with different available actions.
- **VAR in progress:** banner + locked actions for the disputed event.
- **Shootout in progress:** dedicated screen, normal scoring disabled.
- **Match ended:** read-only summary, MOTM picker, sign-off CTA.
- **Suspended / abandoned:** amber / red banner, reason, resume / cancel.

## Permissions

- `match.score:write` to add events.
- `match.score:undo` to undo / correct events (correction requires both
  `match.score:write` and `match.score:undo`).
- `match.lifecycle:write` to end the match or transition periods.
- `match.officials:write` to set VAR officials.

## Mobile

- Collapse the pitch mini-map by default.
- Action grid becomes a **bottom sheet** with tabs (Score / Cards / Sub /
  More).
- Sub modal becomes a full-screen sheet with two list panes (out / in).
- VAR banner becomes a sticky top toast.
- Shootout grid is full-screen with thumb-reachable kick buttons.

## Realtime

- `match:event_added`, `match:event_undone`, `match:event_corrected`
  stream to public score, overlay, scorer.
- `match:clock_tick` (1s cadence) for the clock.
- `match:period_change` for period boundaries.
- `var:status` + `var:decision` for VAR banner updates.
- `pso:kick_added` for penalty shootout updates.

## Keyboard shortcuts (tablet scoring)

| Key   | Action             |
| ----- | ------------------ |
| G     | Goal modal         |
| Y     | Yellow card        |
| R     | Red card           |
| S     | Substitution modal |
| F     | Foul               |
| C     | Corner             |
| O     | Offside            |
| V     | VAR modal          |
| I     | Injury time +1     |
| U     | Undo last event    |
| P     | Pause/Resume clock |
| Enter | Confirm modal      |
| Esc   | Close modal        |
