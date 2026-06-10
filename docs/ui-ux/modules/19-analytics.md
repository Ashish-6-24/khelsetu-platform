# 19 — Analytics UX

## Endpoints covered

```
GET /api/analytics/dashboard/stats
GET /api/analytics/tournaments/{id}/stats
GET /api/analytics/matches/{id}/stats
GET /api/analytics/teams/{id}/stats
GET /api/analytics/players/{id}/stats
GET /api/analytics/reports/custom
GET /api/analytics/leaderboards
```

## Mental model

Analytics is the **insight layer** that turns events into KPIs, trends, and
comparisons. It is read-mostly, snapshot-friendly, and built around five
scopes:

1. **Organisation-wide dashboard** — global KPIs across all matches.
2. **Tournament** — per-tournament stats and trends.
3. **Match** — per-match stats, sport-specific.
4. **Team** — career stats with filters.
5. **Player** — career stats with filters.

Plus **leaderboards** (top scorers, top assists, etc.) and **custom
reports** (filter / group / export).

Charts come from a small, consistent palette: line, bar, stacked bar,
area, pie, radar, scatter, heatmap — see Section 24 for chart styles.

## Screens

### 19.1 Analytics dashboard — `/o/:orgSlug/analytics`
- **Header**: org name, date range picker (default: last 30 days),
  refresh, export.
- **KPI strip** (4–6 cards):
  - Total matches.
  - Live matches now.
  - Tournaments active.
  - Total players.
  - Total teams.
  - Quota usage (% with plan name).
- **Charts row**:
  - Matches per day (line).
  - Matches by sport (donut).
  - Top tournaments by activity (bar).
- **Insights** cards (auto-generated):
  - "Cricket matches up 24% week-over-week."
  - "Tournament X has the most active scorers."
- **Quick links** to deep dives.

### 19.2 Tournament analytics — `/o/:orgSlug/analytics/tournaments/:id`
- **Header**: tournament name, format, status, dates.
- **KPIs**: matches played / total, goals/runs/points, average attendance
  (if tracked), top scorer, top team.
- **Charts**:
  - Goals/runs per match-day (line).
  - Wins distribution per team (stacked bar).
  - Discipline (cards/fouls) per team (bar).
  - Standings trend (multi-line, top 5 by points over time).
- **Tables**: top scorers, top assists, discipline log, best XI.

### 19.3 Match analytics — `/o/:orgSlug/analytics/matches/:id`
- **Header**: match summary card.
- **Sport-specific KPIs**:
  - **Cricket**: run rate (line per innings), wickets fall, partnerships,
    fall-of-wickets chart, batting / bowling tables, extras breakdown.
  - **Football**: possession (donut), shots (bar), shots on target
    (stacked), xG (line over time), pass network (graph), heatmap (per
    team).
  - **Basketball**: shooting % by zone (heatmap), lead chart, points by
    quarter (stacked bar), player efficiency, plus-minus table.
- **Event timeline** with milestone markers.

### 19.4 Team analytics — `/o/:orgSlug/analytics/teams/:id`
- **Header**: team card with crest, founded, sport, base.
- **Filters**: date range, tournament, season, home/away, vs opponent.
- **KPIs**: matches, win %, GF, GA, GD, points won, longest streak.
- **Charts**:
  - Win/draw/loss split (stacked area over time).
  - Form (last N matches W/D/L pills).
  - Goals scored / conceded by period (stacked bar).
  - Discipline trend (line).
- **Roster contribution table** (top scorers, top assists from this team).

### 19.5 Player analytics — `/o/:orgSlug/analytics/players/:id`
- **Header**: player card (avatar, name, position, age, team(s)).
- **Filters**: date range, tournament, team, opponent.
- **Career KPIs**: matches, minutes, goals, assists, cards, MoTM count.
- **Sport-specific KPIs**:
  - **Cricket**: batting avg, strike rate, 50s/100s, bowling avg,
    economy, 5-wicket hauls.
  - **Football**: goals, assists, shot conversion, pass accuracy, key
    passes, tackles, interceptions.
  - **Basketball**: PPG, RPG, APG, FG%, 3P%, FT%, TS%, PER (if
    computable).
- **Charts**: form line, percentile radar vs position peers.
- **Comparison**: side-by-side with another player.

### 19.6 Custom report builder — `/o/:orgSlug/analytics/reports/custom`
- **Step 1 — Scope**: sport, tournament(s), team(s), date range, match
  type.
- **Step 2 — Metrics**: pick from a metric catalogue grouped by entity
  (match, team, player, event).
- **Step 3 — Group by**: none, tournament, team, player, date, sport.
- **Step 4 — Visualise**: table, line, bar, pie, scatter.
- **Step 5 — Save / share / export**: save preset, share read-only link,
  export CSV / PDF / PNG.
- **Saved reports** sidebar with run / edit / duplicate / delete.

### 19.7 Leaderboards page — `/o/:orgSlug/analytics/leaderboards`
- **Tabs**: scope (org / tournament / team).
- **Categories**: top scorers, top assists, top rebounders (basketball),
  top wicket-takers (cricket), most cards, most MoTMs, most minutes.
- **Filters**: sport, date range, tournament.
- **Table** with avatar, name, team, value, trend arrow.

## Components

- `<KPIStat>`, `<KPIStrip>`, `<DateRangePicker>`, `<MetricPicker>`,
  `<ChartCard>` (wrapper), `<LineChart>`, `<BarChart>`, `<StackedBar>`,
  `<AreaChart>`, `<DonutChart>`, `<RadarChart>`, `<ScatterChart>`,
  `<HeatmapChart>`, `<InsightCard>`, `<LeaderboardRow>`,
  `<ComparePicker>`, `<ReportBuilder>`, `<ReportPreviewModal>`,
  `<ExportMenu>`.

## UI requirements

- **KPI cards** must show value, delta (vs prior period), and small
  sparkline.
- **Chart panels** include title, subtitle, legend, unit, tooltip,
  empty/loading/error.
- **Date range picker** with presets (Today, 7d, 30d, 90d, Season,
  Custom).
- **Filters** persist via URL params (shareable links).
- **Comparison mode** for two entities side-by-side.
- **Export controls** (CSV, PDF, PNG) per chart and per page.
- **Tables** virtualised, sortable, filterable, exportable.
- **Insight cards** auto-generated server-side or via simple rules
  (deltas, streaks, outliers).
- **Trend indicators** ▲ ▼ ▬ with colour + symbol (never colour-only).

## States

- **Loading**: skeleton KPIs + chart placeholders.
- **Empty**: "Not enough data yet — come back after more matches."
- **Partial**: greyed bars + tooltip "Based on N events".
- **Stale**: timestamp + refresh CTA when older than 5 min.
- **Error**: per-chart inline retry; page-level error fallback.
- **Permission denied**: friendly forbidden screen.

## Permissions

- `analytics:read` — view all analytics pages.
- `analytics.report:create` — build / save custom reports.
- `analytics.report:export` — export PDF / CSV / PNG.

## Mobile

- KPI strip becomes a 2-column grid then a horizontal scroll on small
  screens.
- Charts use simplified labels and reduced data density.
- Custom report builder is desktop/tablet only (read-only on phone).
- Leaderboards adapt to compact rows.

## Realtime

- Dashboard auto-refreshes every 30s for "live matches now" KPI.
- Match analytics page subscribes to `match:event_added` for live
  updates.
- Standings-linked charts subscribe to `standings:updated`.

## Performance

- Charts virtualise / sample data for ranges > 1k points.
- Heavy reports computed server-side; UI shows progress and ETA.
- Caching: TanStack Query with `staleTime: 60s`, `cacheTime: 5m`.

## Accessibility

- Each chart has an accessible table fallback (`<details>` + `<table>`).
- Colours pass 3:1 against the chart background; pattern fills for
  colour-blind safety.
- `aria-describedby` links each chart to its summary insight.
- Keyboard: tab between data points (where supported by Recharts).
