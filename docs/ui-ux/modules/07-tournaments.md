# 07 — Tournament Management UX

## Endpoints covered

```
POST  /api/tournaments
GET   /api/tournaments
GET   /api/tournaments/{id}
PUT   /api/tournaments/{id}
DELETE /api/tournaments/{id}
POST  /api/tournaments/{id}/status
GET   /api/tournaments/{id}/teams
POST  /api/tournaments/{id}/teams
DELETE /api/tournaments/{id}/teams/{teamId}
POST  /api/tournaments/{id}/fixtures
GET   /api/tournaments/{id}/fixtures
```

## Mental model

A **Tournament** is the top-level competition object. It owns:

- A sport (drives scoring + standings)
- A format (league / knockout / group+knockout / round-robin)
- A team set (registered teams)
- A fixture schedule (generated or manual)
- A status lifecycle (draft → registration → scheduled → live → completed →
  cancelled)

## Tournament lifecycle

```
draft → registration → scheduled → live → completed
                                     ↘ suspended → resumed
                                     ↘ postponed
                                     ↘ abandoned
                              cancelled (from any state)
```

The UI shows the current status as a **status badge** in the header. A
**status dropdown** allows transitions; transitions not allowed from the
current state are disabled with a tooltip explaining why.

## Screens

### 7.1 Tournament list — `/o/:orgSlug/tournaments`
- **Filters:** sport, status, format, date range, search.
- **Sort:** recently created, start date, status.
- **Cards / rows toggle:** cards for marketing, rows for dense browsing.
- **Bulk actions:** archive, export, clone.

### 7.2 Tournament create wizard — `/o/:orgSlug/tournaments/new`
- **Steps:**
  1. **Basics** — name, sport (card grid), format (radio: league, knockout,
     group+knockout, round-robin), start/end date.
  2. **Format detail** — group size (group+knockout), # of groups, leg count
     (single, double), seeding (manual, by rating, by random), tie-break
     order.
  3. **Rules** — sport-specific: overs per innings (cricket), half length
     (football), quarter length + overtime (basketball).
  4. **Teams** — select from existing teams, register new, set captain.
  5. **Schedule** — fixture generator preview, override individual matches.
  6. **Review** — summary + "Create".
- **Save as draft** at any step.
- **Validation** per step (Zod).
- **Progress bar** at top.

### 7.3 Tournament edit — `/o/:orgSlug/tournaments/:id/edit`
- Same wizard, pre-filled.
- Some fields lock once the tournament is `live` (sport, format, leg count).
- A "Locked fields" panel explains what is and isn't editable at this state.

### 7.4 Tournament detail / dashboard — `/o/:orgSlug/tournaments/:id`
- **Header:** logo, name, sport icon, status badge, dates, organiser,
  follow/share buttons.
- **Quick stats:** teams, matches, completed, live.
- **Tabs:** Overview, Teams, Fixtures, Standings, Matches, Officials,
  Stats, Settings.
- **Overview:** description, rules, key dates timeline, recent activity.
- **Teams:** registered teams table with status (confirmed, pending,
  invited), group, captain, "Add team" CTA.
- **Fixtures:** bracket view (knockout) or schedule (league), filter by
  date / group / round, click match → match detail.
- **Standings:** league table with form, points, GD, head-to-head toggle.
- **Matches:** table of all matches with status, date, score, "Score"
  action button.
- **Officials:** table of assigned officials per match, with role.
- **Stats:** top scorers, top performers, discipline, attendance.
- **Settings:** name, description, rules, banner image, social links,
  notifications defaults, danger zone (archive, delete).

### 7.5 Tournament status control
- **Status dropdown** in header.
- **Transitions:**
  - draft → registration: "Open team registration."
  - registration → scheduled: requires ≥ 2 teams.
  - scheduled → live: requires ≥ 1 fixture.
  - live → completed: confirms.
  - any → cancelled: confirmation.
  - live → suspended / postponed: reason modal.
- **Confirmations** use destructive dialogs only for cancellations.

### 7.6 Team registration flow
- **Two paths:**
  - Tournament admin registers teams manually (search org's teams).
  - Captain accepts an open invitation.
- **UI:** add team modal (search + create), pending list, approve / reject.
- **Empty state:** "No teams registered yet — add teams to get started."

### 7.7 Fixture generator
- **Step:**
  - Show preview: number of matches, total rounds, expected duration.
  - Allow editing: pin a team, set kickoff times, assign venues, exclude
    specific dates.
  - "Generate" → backend returns fixtures.
- **Progress:** progress bar for large tournaments.
- **Result:** "X fixtures generated" toast with "View fixtures" action.

### 7.8 Fixture viewer
- **League / group+league:** schedule list grouped by round.
- **Knockout:** bracket visualisation (single-elim, double-elim).
- **Round-robin:** matrix grid (teams × matchdays) + schedule list.
- **Filters:** date, group, status (scheduled, live, completed).
- **Print view** button for printable brackets.

### 7.9 Tournament progression view
- **Live indicator** on the current match (if any).
- **"Next up"** card with kickoff time + teams.
- **"Recently completed"** list.

## Components

- `<TournamentCard>`, `<TournamentForm>`, `<FixtureBracket>`, `<FixtureList>`,
  `<MatchCard>`, `<StatusBadge>`, `<FormatSelector>`, `<TeamRegistrationTable>`,
  `<FixtureGeneratorPreview>`, `<TournamentTimeline>`.

## States

- **Draft:** muted header, "Resume setup" CTA.
- **Registration:** open badge, "Add team" CTA prominent.
- **Scheduled:** calendar heatmap of fixtures.
- **Live:** LIVE pulse, current match widget.
- **Completed:** trophy icon, archived styling.
- **Suspended:** amber badge, "Reason" tooltip.
- **Cancelled:** red strikethrough, banner.
- **Postponed:** clock icon, "Reschedule" CTA.

## Permissions

- `tournament:read` for all viewing.
- `tournament:write` for create / edit.
- `tournament:delete` for delete.
- `tournament.status:write` for status changes.
- `tournament.team:register` for adding teams.
- `tournament.fixture:generate` for generating fixtures.

## Mobile

- Wizard becomes a stepper with sticky bottom "Next".
- Bracket is horizontal-scroll, pinch-zoom.
- Tables collapse to cards.

## Realtime

- `tournament:status`, `tournament:team_added`, `tournament:fixture_generated`,
  `tournament:match_added` events refresh views.
