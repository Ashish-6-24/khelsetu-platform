# 09 — Players UX

## Endpoints covered

```
POST  /api/players
GET   /api/players
GET   /api/players/{id}
PUT   /api/players/{id}
DELETE /api/players/{id}
POST  /api/players/{id}/teams
GET   /api/players/{id}/teams
DELETE /api/players/{id}/teams/{teamId}
```

## Mental model

A **Player** is a person who can be assigned to one or more teams (current
and historical). Players have:

- A profile (name, dob, nationality, photo, position)
- A sport affinity (e.g. a footballer can also be on a futsal team)
- Eligibility flags (age, gender, ban status)
- Career stats derived from match events

A player's **team history** is critical: a player moves teams, and the UI
must show their full career path with stats per stint.

## Screens

### 9.1 Player list — `/o/:orgSlug/players`

- **Table:** avatar, name, position, current team, age, status, eligibility.
- **Filters:** sport, position, age range, team, status (active, injured,
  suspended), search.
- **Sort:** name, age, recent activity.
- **Empty:** "No players yet — add your first player."

### 9.2 Player detail — `/o/:orgSlug/players/:id`

- **Header:** avatar, name, position, current team(s), nationality, dob,
  eligibility chips.
- **Quick stats:** career matches, goals/runs/points, win rate, awards.
- **Tabs:** Overview, Teams, Stats, Matches, Eligibility, History.
- **Overview:** bio, contact (org-internal only), social links.
- **Teams:** current teams + team history (sorted by date range). "Assign
  to team" CTA.
- **Stats:** career stats by sport with sparklines and per-team
  comparison.
- **Matches:** list of all matches the player has been in.
- **Eligibility:** sport-specific flags, age eligibility, ban status.
- **History:** transfer / assignment timeline.

### 9.3 Create player — `/o/:orgSlug/players/new`

- **Fields:** first name, last name, dob, nationality, photo, position,
  jersey #, sport, primary team (optional), contact (org-internal),
  social links.
- **Validation:** dob in past, jersey # unique per team.
- **Submit:** creates player → inline prompt "Assign to a team?"

### 9.4 Edit player — `/o/:orgSlug/players/:id/edit`

- Same form, pre-filled.
- "Sensitive fields" (dob, nationality) require re-auth to change.

### 9.5 Delete player confirmation

- Destructive dialog with type-to-confirm.
- Lists affected teams and matches.

### 9.6 Player team assignment

- **Modal:** team search, jersey #, role (captain, vice-captain, player),
  start date, end date.
- **Conflict warning:** if the player is already on another team in an
  active tournament with overlapping schedule.

### 9.7 Player team history

- **Timeline view:** vertical list of team stints with start/end dates,
  team logo, role, key stats.
- "Edit stint" to fix dates or split a stint.

### 9.8 Player statistics

- **Cards:** by sport — total matches, goals/runs/points, win rate,
  discipline, awards.
- **Charts:** per-match trend lines, vs-team comparison.
- **Date range picker** at top.

### 9.9 Player eligibility views

- **Sport-specific:**
  - Cricket: age, gender category, ICC eligibility.
  - Football: age, contract status, registration status.
  - Basketball: age, eligibility (NCAA / professional), transfers.
- **Badge:** ✅ Eligible / ⚠ Restricted / ❌ Ineligible with reason.

## Components

- `<PlayerCard>`, `<PlayerForm>`, `<PlayerAssignmentModal>`,
  `<PlayerTeamHistory>`, `<PlayerStatCard>`, `<EligibilityBadge>`.

## States

- **Loading:** skeleton.
- **Empty:** primary CTA.
- **Error:** inline + retry.
- **Multi-team:** icon + count "On 3 teams".
- **Ineligible:** red chip with reason tooltip.
- **Injured:** amber chip.

## Permissions

- `player:read` for view.
- `player:write` for create / edit.
- `player:delete` for delete.

## Mobile

- Cards single column, sticky bottom "Add" CTA.
- Team history → vertical timeline with sticky date header.
- Photo upload uses the native camera input.

## Realtime

- `player:created`, `player:updated`, `player:deleted`, `player:team_added`,
  `player:team_removed` events.
