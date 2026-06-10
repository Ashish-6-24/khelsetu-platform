# 08 — Teams UX

## Endpoints covered

```
POST  /api/teams
GET   /api/teams
GET   /api/teams/{id}
PUT   /api/teams/{id}
DELETE /api/teams/{id}
GET   /api/teams/{id}/players
```

## Mental model

A **Team** is a roster of players, optionally associated with a sport and
tournaments. A team can be in multiple tournaments. Players can be on
multiple teams (transfers, all-star squads). Teams have a captain, optional
logo and home venue, and a season record.

## Screens

### 8.1 Teams list — `/o/:orgSlug/teams`
- **Table / Card toggle** (default: cards).
- **Card:** logo, name, sport, city, captain, # of players, # of active
  tournaments, win/draw/loss badge.
- **Filters:** sport, status, search.
- **Sort:** name, recent activity, win-rate.
- **Empty:** "No teams yet — add your first team."
- **Bulk actions:** export, archive, transfer to another org.

### 8.2 Team detail — `/o/:orgSlug/teams/:id`
- **Header:** logo, name, sport, captain, city, founded, social links.
- **Quick stats:** matches played, W/D/L, top scorer, recent form.
- **Tabs:** Roster, Tournaments, Schedule, Stats, History, Settings.
- **Roster:** player table with role (captain, vice-captain, player), join
  date, status. "Add player" CTA.
- **Tournaments:** list of tournaments the team is registered in with
  status.
- **Schedule:** upcoming + past matches.
- **Stats:** sport-specific team stats, season comparison.
- **Settings:** edit details, danger zone (archive, delete).

### 8.3 Create team — `/o/:orgSlug/teams/new`
- **Fields:** name, sport (select), logo, city, home venue (search),
  founded year, captain (select from players, optional), contact email,
  social links.
- **Submit:** creates team → "Add players next?" inline prompt.

### 8.4 Edit team — `/o/:orgSlug/teams/:id/edit`
- Same form, pre-filled.
- "Transfer ownership" action visible only to org owners.

### 8.5 Delete team confirmation
- **Type:** destructive dialog.
- **Body:** "Delete {team}? They will be removed from {N} active tournaments
  and {M} scheduled matches. This cannot be undone."
- **Input:** type team name to confirm.
- **Action:** soft-delete (archive) by default, hard-delete on second
  confirm.

### 8.6 Team roster — `/o/:orgSlug/teams/:id/roster`
- **Table:** avatar, name, role, jersey #, joined, status, actions.
- **Drag to reorder** for jersey numbers / starting order.
- **Add player:** chip search (org players), invite external, create new.
- **Empty:** "No players on this team yet — add players to start scoring."

### 8.7 Team players (read-only) — `/o/:orgSlug/teams/:id/players`
- Compact list view for quick scanning. Same data as roster, no actions.

### 8.8 Team analytics summary — `/o/:orgSlug/teams/:id/stats`
- KPI cards: matches, wins, win rate, goals/runs/points scored, conceded,
  clean sheets, etc.
- Charts: form sparkline, season comparison, opponent history, home vs
  away.

### 8.9 Team assignment flow (in tournament context)
- **Modal:** "Add team to tournament" with team search + role + group
  assignment.
- **Bulk:** multi-select teams table with "Add selected" CTA.

## Components

- `<TeamCard>`, `<TeamForm>`, `<TeamRosterTable>`, `<TeamSearch>`,
  `<TeamAssignmentModal>`, `<TeamDeleteConfirm>`.

## States

- **Loading:** skeleton card / table.
- **Empty:** friendly state with primary CTA.
- **Error:** inline error + retry.
- **Deleting:** optimistic removal with 5s undo.
- **In-tournament-warning:** on delete, warn about active tournament
  registrations.

## Permissions

- `team:read` for view.
- `team:write` for create / edit.
- `team:delete` for delete.

## Mobile

- Cards single column, sticky bottom "Add" CTA.
- Roster table → cards with collapsed actions in a sheet.
- Drag-to-reorder becomes "Move up / Move down" buttons (touch friendly).

## Realtime

- `team:created`, `team:updated`, `team:deleted`, `team:player_added`,
  `team:player_removed` events.
- Roster updates without page reload.
