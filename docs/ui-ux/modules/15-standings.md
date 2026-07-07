# 15 — Standings UX

## Endpoints covered

```
GET  /api/standings/tournament/{tournamentId}
POST /api/standings/tournament/{tournamentId}/recalculate
POST /api/standings/tournament/{tournamentId}/snapshot
GET  /api/standings/tournament/{tournamentId}/snapshots
```

## Mental model

Standings are the **derived state** of all completed matches in a tournament.
They are computed server-side (the UI does **not** recompute) and exposed
through a single read endpoint. The UI:

- Renders a sortable, accessible **league table**.
- Allows admins to **recalculate** (after corrections) or **snapshot** (for
  archives, broadcast).
- Provides a **snapshot history** browser for time-travel.

Standings semantics vary by sport / competition type — league, knockout,
group + knockout, double round-robin. The endpoint always returns a normalised
shape: `rank`, `team`, `played`, `wins`, `draws`, `losses`, `for`, `against`,
`diff`, `points`, `form`, `tieBreakReason`.

## Screens

### 15.1 League table — `/o/:orgSlug/standings/:tournamentId`

- **Header**: tournament name, format chip (League / Group / Knockout),
  status, last calculated timestamp, **Recalculate** + **Snapshot** CTAs.
- **Filters**: group (if multi-group), gender, division, season.
- **Table** (default sort by `rank`):
  - `#` (rank with promotion/relegation/qualified row colour bands).
  - Team (crest + name, clickable to team detail).
  - `P` (played), `W`, `D`, `L`, `GF`, `GA`, `GD`, `Pts`.
  - **Form** column: last 5 results as `W L D W W` pills.
  - **Tie-break** indicator: small `i` icon → tooltip with applied
    tie-break rule (head-to-head, GD, GF, fair play).
- **Footer legend**: qualification bands (e.g., green = qualified, red =
  relegated).
- **Empty**: "Standings will appear after the first completed match."
- **Loading**: skeleton rows.
- **Error**: inline banner + retry.

### 15.2 Tournament standings (multi-group view)

- One **TableGroup** per group, each rendered as 15.1.
- **Cross-group rankings** tab: re-sorts all teams by points / GD /
  qualification probability.

### 15.3 Snapshot history — `/o/:orgSlug/standings/:tournamentId/snapshots`

- **List**: snapshot id, created by, created at, note, "Open" /
  "Restore" / "Diff" actions.
- **Open**: read-only standings as they were at snapshot time.
- **Restore**: applies a snapshot as the current canonical (admin only,
  confirm).
- **Diff**: side-by-side comparison with current standings, highlighting
  rank changes.

### 15.4 Recalculate action

- **CTA**: "Recalculate standings" → confirm modal listing what will
  change (e.g., 2 matches edited since last calc).
- **Endpoint**: `POST /standings/tournament/{tournamentId}/recalculate`.
- **Toast**: "Standings recalculated. 3 ranks changed."

### 15.5 Snapshot comparison

- **Choose** snapshot A and snapshot B (or current).
- **Side-by-side** league tables; cells diffed by colour:
  - Green = rank improved.
  - Red = rank dropped.
  - Grey = unchanged.
- **Export** as CSV / PDF for broadcasters.

### 15.6 Head-to-head view (optional sub-screen)

- For tied teams, a panel shows head-to-head record, mutual matches, GD
  in mutual matches.

### 15.7 Ranking and points display (widget)

- Compact widget for dashboard and public pages: top 5 / bottom 5 with
  crest, points, form pills.

## Components

- `<StandingsTable>`, `<StandingsRow>`, `<FormPills>`,
  `<TieBreakTooltip>`, `<QualificationLegend>`, `<SnapshotList>`,
  `<SnapshotDiff>`, `<RecalculateCTA>`, `<H2HPanel>`, `<StandingsWidget>`.

## UI requirements

- **Sortable** by any numeric column (with persistent default = rank).
- **Sticky** team column on horizontal scroll (mobile).
- **Qualification bands** visualised via row background or left border.
- **Form pills** are colour-coded: W = green, D = amber, L = red.
- **Snapshot timestamps** localised (date + time + relative).
- **Empty / loading / error** states all explicit.

## States

- **Empty**: no matches completed yet.
- **Partial**: only some matches completed → tooltip "Provisional".
- **Recalculating**: header banner + table dimmed.
- **Stale**: indicator if matches have been edited since last calc.
- **Snapshot view**: amber "Viewing snapshot from ..." banner with
  "Return to live" CTA.

## Permissions

- `standings:read` to view.
- `standings:recalculate` to recalculate.
- `standings.snapshot:write` to create / restore snapshots.

## Mobile

- Table converts to a **horizontal scroll** with sticky first column
  (rank + team).
- Form pills collapse to last 3 results.
- Snapshot list becomes a card list.
- Recalculate / Snapshot CTAs move into an overflow menu.

## Realtime

- `standings:updated` event triggers a soft re-fetch + toast "Standings
  updated".
- During a live match, a "Standings may change after this match" hint
  appears.

## Accessibility

- Table uses `<table>` semantics with `<th scope="col">` and `<th
scope="row">`.
- Form pills include text label (e.g., `aria-label="Lost"`).
- Rank-change indicators are not colour-only (use arrows ▲ ▼).
