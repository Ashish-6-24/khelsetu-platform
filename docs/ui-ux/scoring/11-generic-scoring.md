# 11 — Generic Scoring UX

## Endpoints covered

```
GET  /api/scoring/matches/{matchId}/history
POST /api/scoring/matches/{matchId}/events
GET  /api/scoring/matches/{matchId}/events
POST /api/scoring/events/{eventId}/undo
GET  /api/scoring/matches/{matchId}/snapshot
POST /api/scoring/snapshots/{snapshotId}/replay
POST /api/scoring/validate
GET  /api/scoring/matches/{matchId}/analytics
GET  /api/scoring/matches/{matchId}/follow-on/check
```

## Mental model

Generic scoring is the **event-sourcing backbone** for all sport-specific
scoring consoles. Every ball, goal, point, foul, or substitution is an
**event** with a type, value, and metadata. Events are append-only and
undoable. Snapshots are point-in-time captures used for replay.

The generic layer:

- Validates events (server-side `validate` endpoint).
- Tracks history with full audit.
- Provides analytics.
- Exposes follow-on (cricket-specific but lives here).
- Provides replay & snapshot for time-travel debugging.

## Screens

### 11.1 Live scoring timeline — `/o/:orgSlug/scoring/:matchId`
- **Sticky score header** (sport-specific) with team A, team B, score,
  period/over/clock, LIVE pulse.
- **Action panel** (left on desktop, bottom on mobile) with sport-specific
  buttons.
- **Event log** (right on desktop, middle on mobile) with all events,
  newest first.
- **Undo bar** (sticky bottom on mobile) with last action + confirm.

### 11.2 Event entry panel
- **Tap action button** → opens a contextual modal:
  - Cricket: ball-by-ball, asks for runs / extra / wicket.
  - Football: goal (player, assist), card (yellow, red, second-yellow),
    substitution, foul, shot, save, var, etc.
  - Basketball: 2pt / 3pt / free throw / rebound / assist / steal / block /
    turnover / foul / timeout.
- **Modal fields:** event type, player (type-ahead), team, value, minute /
  over, metadata.
- **Submit:** optimistic update + send. If validation fails, banner with
  reason and "Re-edit" CTA.

### 11.3 Event history list
- **Virtualised list** (newest first).
- Each row: timestamp, icon, event type, player, value, "Undo" button.
- **Filter chips:** team, type, period, scorer.
- **Search** by player name or event text.
- **Bulk undo** with confirmation (e.g., undo last 5 events).

### 11.4 Undo action
- **Single undo:** swipe / button on event row. Confirm modal.
- **Multi undo:** select multiple events, "Undo selected" CTA.
- **Audit:** undo events are themselves logged.

### 11.5 Snapshot browser
- **Modal/page:** list of snapshots with timestamp, scorer, description,
  event count.
- **Action:** "Preview" (read-only replay), "Restore" (with confirm).
- **Use case:** scorer realises they made mistakes 10 minutes ago, jumps
  to a known-good snapshot.

### 11.6 Replay viewer
- **Timeline scrubber** at bottom.
- **Play / pause / speed** (0.5x, 1x, 2x, 4x).
- **Step events** (arrow keys).
- **Filter by team / type**.
- **Read-only** — no edits.

### 11.7 Validation feedback
- **Inline errors** in event entry form (server validation echoed).
- **Banner** if the scorer attempts a state-violating event (e.g., starting
  a 3rd innings in a 2-innings match).
- **Pre-flight check** button: "Validate match state" returns OK / issues.

### 11.8 Analytics panel
- Sport-specific score analytics:
  - Run rate (cricket)
  - xG, possession, shots (football)
  - Pace, efficiency, true shooting (basketball)
- **KPIs at top**, charts below.
- **Compare** to tournament average or to opponent.

### 11.9 Deterministic replay UX
- **Re-running a snapshot** must produce identical state. The UI shows a
  "Replaying..." banner.
- **Conflicts** if events are out of order: warning with "Fix" CTA.
- **Useful for:** post-match verification, dispute resolution.

### 11.10 Error correction UI
- **Inline correction:** edit an event within a grace period (configurable,
  default 5 min).
- **Audit log** of every correction with reason.
- **"Mark as corrected"** flag visible in event log.

### 11.11 Audit-friendly event logging
- Every event carries: `id`, `matchId`, `scorerId`, `timestamp`, `type`,
  `payload`, `clientEventId` (idempotency).
- Every undo carries: original event id, scorer, reason.
- **Audit page** (read-only) shows full event stream.

## Components

- `<ScoringHeader>`, `<EventEntryModal>`, `<EventLog>`, `<UndoBar>`,
  `<SnapshotBrowser>`, `<ReplayViewer>`, `<ValidationBanner>`,
  `<EventTypeIcon>`, `<MatchClock>`.

## UX principles

- **Fast:** every action has ≤ 100 ms visual feedback (optimistic update).
- **Accurate:** pre-flight validation, no silent failures.
- **Safe:** confirm destructive, audit everything.
- **Realtime:** events stream into the log as they happen.
- **Undo-friendly:** last event is one tap away.
- **Match-operator friendly:** large touch targets, no hidden gestures,
  glove-friendly (see scoring page override).

## States

- **Idle (no live match):** "Select a match to start scoring" + list of
  scorer's upcoming matches.
- **Pre-match:** lineup / toss / official check.
- **Live:** full scoring console.
- **Half-time / break:** muted action panel, "Resume" CTA.
- **Post-match:** summary view, "Sign off" CTA, snapshot created
  automatically.
- **Suspended:** amber banner, "Resume" CTA.
- **Abandoned:** read-only summary.

## Permissions

- `match.score:read` for view.
- `match.score:write` for adding events.
- `match.score:undo` for undoing.
- `scoring.replay:read` for replay viewer.
- `scoring.replay:write` for snapshot restore.

## Mobile

- Two-pane (actions + log) collapses to: sticky header → event log
  (scrollable) → action buttons (sticky bottom) → undo bar.
- Long-press for advanced options (e.g., undo specific event in history).
- Swipe-to-undo on event rows.

## Realtime

- `scoring:event_added`, `scoring:event_undone`, `scoring:snapshot_created`.
- `match:clock_tick` updates the clock.
- Reconnection banner if socket drops.
