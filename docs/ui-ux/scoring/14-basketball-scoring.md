# 14 — Basketball Scoring UX

## Endpoints covered

```
POST /api/matches/{matchId}/basketball/initialize
POST /api/matches/{matchId}/basketball/field-goal
POST /api/matches/{matchId}/basketball/free-throw
POST /api/matches/{matchId}/basketball/rebound
POST /api/matches/{matchId}/basketball/assist
POST /api/matches/{matchId}/basketball/steal
POST /api/matches/{matchId}/basketball/turnover
POST /api/matches/{matchId}/basketball/block
POST /api/matches/{matchId}/basketball/foul
POST /api/matches/{matchId}/basketball/timeout
POST /api/matches/{matchId}/basketball/period/start
POST /api/matches/{matchId}/basketball/period/end
POST /api/matches/{matchId}/basketball/overtime/start
POST /api/matches/{matchId}/basketball/end
GET  /api/matches/{matchId}/basketball/state
GET  /api/matches/{matchId}/basketball/stats
GET  /api/matches/{matchId}/basketball/fouls/{teamId}
POST /api/matches/{matchId}/basketball/clock/game
POST /api/matches/{matchId}/basketball/clock/shot
```

## Mental model

Basketball is **possession-driven** with two clocks running simultaneously
(game clock + shot clock) and rapid event entry (a make + assist + rebound
sequence can happen in seconds). The console must:

- Show both clocks at all times, large and unmistakable.
- Make field-goal entry a single tap with a quick assist follow-up.
- Track team fouls per period (bonus implications) and player fouls
  (5/6-foul-out limit).
- Track timeouts left per team per half.
- Handle quarters → overtime cleanly.

The basketball engine event types: `field_goal_attempt`, `field_goal_made`,
`free_throw_attempt`, `free_throw_made`, `rebound_offensive`,
`rebound_defensive`, `assist`, `steal`, `turnover`, `block`,
`personal_foul`, `technical_foul`, `flagrant_foul`, `timeout`,
`period_start`, `period_end`, `overtime_start`, `game_end`.

## Screens

### 14.1 Basketball scoring console — `/o/:orgSlug/scoring/:matchId` (sport=basketball)

- **Top: Score header**
  - Team A: logo, name, score, fouls (this period), timeouts left.
  - Team B: same.
  - **Quarter chip** (`Q1`, `Q2`, `Q3`, `Q4`, `OT1`, `OT2`...).
  - **Game clock** (mm:ss, large, monospaced).
  - **Shot clock** (24s, red when ≤5s, pulsing when ≤3s).
  - **LIVE pulse**.
- **Middle: Possession indicator** — arrow pointing to team with the ball;
  toggle on rebound / change-of-possession.
- **Right (desktop) / Bottom (mobile): Action grid**
  - **Big score buttons** (per team): `+1` (FT), `+2` (FG), `+3` (3PT).
    Tapping opens a quick chooser: shooter (avatar), assister (optional),
    location chip.
  - **Foul**: player + type (personal, technical, flagrant), shooting flag.
  - **Rebound**: offensive / defensive, player.
  - **Assist**: player (also auto-suggested after a FG made).
  - **Steal / Block / Turnover**: player.
  - **Timeout**: team, type (full, short, official).
  - **End period / Start OT / End game**: lifecycle actions.
  - **Undo**.
- **Right rail: Live boxscore** (collapsible) per player: MIN, PTS, REB,
  AST, STL, BLK, TO, PF.

### 14.2 Game state dashboard

- **Read-only summary** for non-scorers: `/basketball/state` returns the
  full state object.
- **Display**: score, quarter, clocks, possession, last 5 events,
  player-on-floor lineup (if tracked).

### 14.3 Shot clock control

- **Buttons**: `Reset 24`, `Reset 14`, `Set 8`, custom seconds.
- **Auto-reset rules**: after FG made (24 for opponent), after defensive
  rebound (24), after offensive rebound (14), after foul on offense (24).
- **Pause / resume** linked to game clock.
- **Violation**: when shot clock hits 0 with no shot, prompt "Shot clock
  violation? Turnover for Team X".
- **Endpoint**: `POST /basketball/clock/shot`.

### 14.4 Game clock control

- **Buttons**: `Start`, `Stop`, `Set`.
- **Auto-stop**: on whistle (foul, timeout, made FT, last 2:00 of period
  on made FG), per rules.
- **Auto-start**: on inbound (manual confirm).
- **Endpoint**: `POST /basketball/clock/game`.

### 14.5 Foul tracker — `/o/:orgSlug/scoring/:matchId/fouls/:teamId`

- **Per-team panel**: team fouls (this period), bonus state ("In bonus"
  when ≥ 5), penalty state.
- **Per-player list**: foul count, foul-out warning at 4, foul-out at 5
  (NBA: 6).
- **Endpoint**: `GET /basketball/fouls/{teamId}`.

### 14.6 Timeout manager

- **Per-team chip strip**: full timeouts left, short timeouts left.
- **Call timeout** opens modal: team, type, reason (optional).
- **Half reset**: timeouts reset per rules.

### 14.7 Period control

- **Start period** (`POST /basketball/period/start`).
- **End period** (`POST /basketball/period/end`) — confirm score / fouls
  reset.
- **Quarter break UI**: muted action grid, "Start Q2" CTA, halftime
  banner with extended break.

### 14.8 Overtime flow

- **Trigger**: tied at end of regulation → "Start Overtime" CTA.
- **Endpoint**: `POST /basketball/overtime/start`.
- **OT period**: 5-minute clock, foul count resets, timeouts per OT rules.
- **Repeat** if still tied.

### 14.9 Stats dashboard — `/o/:orgSlug/scoring/:matchId/stats`

- **Endpoint**: `GET /basketball/stats`.
- **Team stats**: PTS, FGM/FGA, 3PM/3PA, FTM/FTA, REB (O/D/T), AST, STL,
  BLK, TO, PF, fast-break PTS, paint PTS.
- **Player stats**: full boxscore table.
- **Trend chart**: lead by quarter, biggest run.
- **Compare** to opponent.

### 14.10 Event entry panel (modals)

- **Field goal modal**: shooter, points (2/3), shot type (jumper, layup,
  dunk), assister, contested flag, location chip.
- **Free throw modal**: shooter, attempt # (1-of-2), make/miss.
- **Rebound modal**: rebounder, type, team.
- **Foul modal**: fouled player, fouler, type, shooting-foul flag,
  resulting FTs.
- **Turnover modal**: player, type (bad pass, lost ball, offensive foul,
  shot clock), team.

## Components

- `<BasketballScoreboard>`, `<GameClock>`, `<ShotClock>`,
  `<PossessionArrow>`, `<TeamFoulsChip>`, `<TimeoutChips>`,
  `<FoulOutWarning>`, `<FieldGoalModal>`, `<FreeThrowModal>`,
  `<ReboundModal>`, `<FoulModal>`, `<TimeoutModal>`, `<LiveBoxscore>`,
  `<BasketballOverlayWidget>`.

## UX principles

- **Both clocks must always be visible** — game clock large, shot clock
  pulsing.
- **Quick scoring**: a tap on `+2` should produce a sensible default
  (shooter = last assister or top scorer) and let user override.
- **Auto-suggest assist** modal after a FG-made event (within 5s).
- **Bonus & foul-out** are surfaced prominently (chips & banners).
- **Possession arrow** is touchable to flip; it must reconcile with rebound
  events.
- **Timeouts** are tracked per half/per OT; visual cue when team is out.

## States

- **Pre-match**: lineup / starting five form, captain, tip-off team.
- **Initialized**: `POST /basketball/initialize` produces baseline state;
  scoring locked until period starts.
- **Q1 / Q2 / Q3 / Q4 / OT1...**: distinct period states.
- **Halftime / quarter break**: muted actions, "Start QN" CTA.
- **Bonus**: orange chip on team with ≥5 fouls in period.
- **Foul-out**: red chip on player with 5+ (or 6+) fouls; substitution
  prompt.
- **Game ended**: read-only boxscore, MVP selection, sign-off CTA.

## Permissions

- `match.score:write` to add events.
- `match.score:undo` to undo events.
- `match.lifecycle:write` to control periods, overtime, end game.

## Mobile

- Collapse the live boxscore to a horizontal scroll of top performers.
- Action grid becomes a tabbed bottom sheet:
  - **Score** (FG, 3PT, FT)
  - **Rebound / Assist / Steal / Block / TO**
  - **Foul / Timeout**
  - **Clock / Period**
- Shot clock stays as a sticky chip at the top regardless of scroll.

## Realtime

- `match:score_update`, `match:event_added`, `match:event_undone`.
- `game_clock:tick` (1s cadence), `shot_clock:tick` (1s cadence).
- `match:period_change` on quarter / OT transitions.
- `team_fouls:updated`, `timeouts:updated`.

## Keyboard shortcuts (tablet scoring)

| Key   | Action                |
| ----- | --------------------- |
| 1     | +1 (free throw)       |
| 2     | +2 (field goal)       |
| 3     | +3 (three-pointer)    |
| R     | Rebound modal         |
| A     | Assist modal          |
| S     | Steal modal           |
| B     | Block modal           |
| T     | Turnover modal        |
| F     | Foul modal            |
| O     | Timeout modal         |
| Space | Start/Stop game clock |
| C     | Reset shot clock      |
| N     | End period            |
| U     | Undo                  |
| Esc   | Close modal           |
