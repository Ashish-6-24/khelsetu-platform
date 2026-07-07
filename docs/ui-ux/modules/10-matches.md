# 10 — Match Management UX

## Endpoints covered

```
POST  /api/matches
GET   /api/matches/tournament/{tournamentId}
GET   /api/matches/{id}
PUT   /api/matches/{id}
DELETE /api/matches/{id}
POST  /api/matches/{id}/start
POST  /api/matches/{id}/end
POST  /api/matches/{id}/score
POST  /api/matches/{id}/officials
GET   /api/matches/{id}/officials
DELETE /api/matches/{id}/officials/{userId}
GET   /api/matches/{id}/with-period
POST  /api/matches/{id}/period/transition
POST  /api/matches/{id}/abandon
POST  /api/matches/{id}/suspend
POST  /api/matches/{id}/resume
POST  /api/matches/{id}/postpone
```

## Mental model

A **Match** is a single game within a tournament (or a free match). It owns:

- Two teams (or more in special formats)
- Sport-specific config
- Officials (referees, scorers, observers)
- A period / phase state machine
- A scoring session (only one active at a time)
- A timeline of events (sport-specific)

## Match lifecycle

```
scheduled → live → completed
              ↘ suspended → resumed | postponed → rescheduled
              ↘ abandoned
              ↘ cancelled
```

The UI surfaces this with a **status chip** in the match header, a
**lifecycle control** dropdown, and a **timeline view** of transitions.

## Screens

### 10.1 Match list — `/o/:orgSlug/matches`

- **Filters:** tournament, status, sport, date range, team, search.
- **Sort:** date, status (live first), recently scored.
- **Table columns:** teams, score, status, period, scheduled time, officials,
  actions (Start, Resume, Score, View, Edit).
- **Live row** is sticky and has a red border-left.
- **Empty:** "No matches scheduled — create one or generate fixtures."

### 10.2 Match create — `/o/:orgSlug/matches/new` (or within tournament)

- **Fields:** tournament (pre-filled if from tournament context), teams
  (A, B), sport (from tournament), venue, scheduled time, officials
  (multi-select with role), match type (group, knockout, friendly, free),
  notes.
- **Conflict warnings:** same venue/time, team playing twice in a day.

### 10.3 Match detail — `/o/:orgSlug/matches/:id`

- **Header:** team A vs team B, current score, status, period, scheduled
  time, venue, "Score" CTA, share, follow, "Open in scorer console" link.
- **Tabs:** Center (live), Lineup, Officials, Events, Stats, Settings.
- **Center tab:** the live scorer's view (read-only for non-scorers).
- **Lineup:** formation (football) / playing XI (cricket) / starting five
  (basketball).
- **Officials:** table with role, name, status (confirmed, pending).
- **Events:** filterable timeline of all events.
- **Stats:** sport-specific stats.
- **Settings:** edit details, assign scorer, change venue/time (with
  audit), danger zone (abandon, cancel, delete).

### 10.4 Match center — `/o/:orgSlug/matches/:id/center`

- The "live" tab of the match detail. Read-only for non-scorers; full
  scoring for users with `match.score:write`.
- Components: `<Scoreboard>`, `<EventFeed>`, `<ScoringActions>`, `<Clock>`,
  `<OfficialsCard>`.

### 10.5 Match scheduling screen — `/o/:orgSlug/schedule`

- **Calendar view** (week / month) with all matches colour-coded by
  tournament.
- **Drag-to-reschedule** (org admin / tournament admin only).
- **Day view** with time slots.
- **Filters:** tournament, status, venue.

### 10.6 Match lifecycle control

- **Dropdown** in match header with all valid transitions.
- **Confirmations:**
  - Start: none (fast).
  - End: confirm score is final.
  - Suspend: reason modal.
  - Resume: confirm teams/venue.
  - Postpone: new time picker.
  - Abandon: reason modal.
  - Cancel: reason modal.

### 10.7 Officials management

- **Modal:** role select (referee, umpire, scorer, observer, commissioner),
  user search (org members), notes.
- **Status:** pending, confirmed, declined.
- **Bulk actions:** send reminders.

### 10.8 Match start/end controls

- **Start:** if teams and officials ready, button is enabled. Confirms
  starting XI / lineup.
- **End:** confirm final score, optional "MVP" selection.

### 10.9 Period transition controls

- **Auto-flow:** cricket overs, football halves, basketball quarters.
- **Manual override:** period dropdown (e.g. "extra time", "super over",
  "overtime").
- **Sport-specific UI:** see scoring specs.

### 10.10 Suspend / resume / postpone flow

- **Suspend:** reason (chips: rain, power outage, injury, dispute, other
  - text), timestamp captured automatically.
- **Resume:** if same day, confirms teams/venue; if new day, asks for new
  start time.
- **Postpone:** new date/time picker, reason.

### 10.11 Abandon match confirmation

- **Destructive dialog** with reason.
- **Consequence:** match result stands at time of abandon; standings update;
  audit entry.

### 10.12 Match with period view

- A read-only composite view showing current period + clock + score, used
  in lists and dashboard widgets.

### 10.13 Match timeline

- Vertical timeline: lifecycle transitions, events, scoring milestones
  (wickets, goals, lead changes, milestones).
- Filter by team, type, period.
- Sticky date headers.

## Components

- `<MatchCard>`, `<MatchForm>`, `<MatchHeader>`, `<MatchLifecycleDropdown>`,
  `<OfficialsModal>`, `<MatchTimeline>`, `<PeriodSelector>`,
  `<MatchStatusChip>`, `<MatchWithPeriodWidget>`.

## States

- **Scheduled:** muted, countdown to kickoff.
- **Live:** pulsing red dot, current period, score.
- **Suspended:** amber banner with reason.
- **Postponed:** clock icon, "Reschedule" CTA.
- **Completed:** trophy-style header, summary card.
- **Abandoned:** red slash, partial stats.
- **Cancelled:** greyed out, "Reason" tooltip.

## Permissions

- `match:read` for view.
- `match:write` for create / edit.
- `match:delete` for delete.
- `match.officials:write` for assigning officials.
- `match.lifecycle:write` for status transitions.
- `match.score:write` for scoring.

## Mobile

- Match list → cards with key info and a "Score" button.
- Match header becomes a sticky bar at top.
- Lifecycle dropdown is a bottom sheet.

## Realtime

- `match:status_change`, `match:score_update`, `match:event_added`,
  `match:officials_assigned` events.
- Public live page subscribes to the same events with a public-safe view.
