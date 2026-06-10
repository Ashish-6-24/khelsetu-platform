# 31 — Real-time Behaviour

## 31.1 Where real-time matters

| Area | Updates | Why |
|---|---|---|
| Live score updates | every event / clock tick | Public + scorer + overlay parity |
| Match event updates | per event | Event log freshness |
| Standings updates | per completed match / recalc | League page accuracy |
| Notifications | per new event | Inbox + bell + toast |
| Overlays | per template & data update | Broadcast |
| Sync status | per queue change | Trust |
| Scoring replay | per snapshot / replay test | Verification UX |
| VAR status (football) | per state change | Operator + viewer |
| DRS status (cricket) | per state change | Operator + viewer |
| Shot clock (basketball) | per tick | Console + overlay |
| Game clock (football / basketball) | per tick | Console + overlay |
| Period changes | per transition | All consumers |
| Presence (co-scorers) | join / leave | Avoid double-scoring |
| Conflicts | when raised | Operator awareness |

## 31.2 Strategy per concern

| Concern | Strategy | Rationale |
|---|---|---|
| Scoring events, status, periods | **WebSocket (Socket.IO)** | Bidirectional, low latency, push semantics |
| Clocks (game / shot / match) | **Socket tick @ 1Hz** + client interpolation | Reduce bandwidth; smooth UI |
| Notifications | **WebSocket push** with **60s polling fallback** | Resilience |
| Standings | **WebSocket** notification → **React Query invalidate** | Standings recompute is heavier; let client re-fetch the view it needs |
| Sync queue / status | **Local store** (Zustand + IDB) + **WebSocket** sync feedback | Offline-first; server confirms |
| VAR / DRS status | **WebSocket** | Few events; instant required |
| Presence | **Socket.IO rooms** with TTL pings every 30s | Lightweight |
| Public overlay | **Same socket, read-only token** | One source of truth |
| Public live page | **Same socket** | Same |
| Heavy analytics | **Polling 30s** + manual refresh | Server-side aggregation is expensive |
| Audit live tail | **WebSocket** (admin only) | Forensic immediacy |

> Fallback: if WebSocket cannot connect after retries, fall back to
> **smart polling**: 5s for live match pages, 30s elsewhere.

## 31.3 Channel / room model

```
match:{matchId}                 score, events, clock, period, var, drs, pso
match:{matchId}:presence        join/leave
match:{matchId}:overlay         overlay-specific events
tournament:{tournamentId}       standings, fixtures
org:{orgId}                     notifications, billing, rbac, sync
org:{orgId}:audit               audit live tail (admin)
sync:device:{deviceId}          sync status
user:{userId}                   personal notifications, session events
```

Token-scoped rooms (public overlay) issue **read-only** subscriptions
that only receive non-sensitive events.

## 31.4 Event catalogue (recap + extended)

| Event | Payload | Channel | Subscribers |
|---|---|---|---|
| `match:status_change` | `{matchId, prevStatus, status, at}` | `match:{id}` | scorer, public, overlay, dashboard |
| `match:score_update` | `{matchId, score, period, clock}` | `match:{id}` | scorer, public, overlay |
| `match:event_added` | `{eventId, type, payload}` | `match:{id}` | event log, ticker, overlay |
| `match:event_undone` | `{eventId, reason, by}` | `match:{id}` | event log |
| `match:event_corrected` | `{eventId, before, after, reason, by}` | `match:{id}` | event log, audit |
| `match:clock_tick` | `{matchId, period, ms}` | `match:{id}` | scorer (when idle), overlay |
| `match:period_change` | `{matchId, fromPeriod, toPeriod}` | `match:{id}` | overlay, scorer |
| `standings:updated` | `{tournamentId, version}` | `tournament:{id}` | standings page, dashboard |
| `notification:new` | `Notification` | `user:{id}`, `org:{id}` | bell, dropdown, toast |
| `notification:read` / `notification:deleted` | `{id}` | `user:{id}` | sync read state across devices |
| `overlay:activated` / `overlay:deactivated` | `{overlayId}` | `match:{id}:overlay` | overlay consumers, manager |
| `sync:status` | `{deviceId, pending, syncing, lastSyncedAt}` | `sync:device:{id}` | sync banner, page |
| `sync:conflict_added` | `{syncItemId, entity}` | `org:{id}` | sync banner, notif |
| `sync:item_synced` | `{syncItemId}` | `sync:device:{id}` | queue page |
| `var:status` | `{reviewId, status}` | `match:{id}` | VAR panels, overlay |
| `var:decision` | `{reviewId, decision}` | `match:{id}` | VAR panels, overlay |
| `drs:status` | `{reviewId, status}` | `match:{id}` | DRS panel |
| `drs:decision` | `{reviewId, decision}` | `match:{id}` | DRS panel, overlay |
| `pso:kick_added` | `{kick}` | `match:{id}` | shootout board, overlay |
| `shot_clock:tick` | `{matchId, sec}` | `match:{id}` | scorer, overlay |
| `game_clock:tick` | `{matchId, ms}` | `match:{id}` | scorer, overlay |
| `team_fouls:updated` | `{matchId, teamId, fouls}` | `match:{id}` | console, overlay |
| `timeouts:updated` | `{matchId, teamId, left}` | `match:{id}` | console, overlay |
| `presence:join` / `presence:leave` | `{matchId, userId, role}` | `match:{id}:presence` | scorer presence avatars |
| `audit:event_added` | `AuditEvent` | `org:{id}:audit` | audit live tail (admin) |
| `rbac:role_updated` | `{roleId}` | `org:{id}` | RBAC store re-eval |
| `rbac:user_roles_updated` | `{userId}` | `org:{id}` | RBAC store for that user |
| `billing:updated` | `{subscriptionStatus, plan}` | `org:{id}` | billing pages |

## 31.5 Optimistic update behaviour

- **Score events**: insert into local log with `status: pending`, cap at
  10 simultaneously pending; promote to `synced` on confirm; mark
  `failed` and surface in sync banner on error.
- **Lifecycle transitions**: optimistic chip flip, rollback with toast
  on failure.
- **Lineup save**: optimistic local; reconciled by server response.
- **Substitutions**: optimistic player swap; rollback if eligibility
  fails.
- **Snapshot creation**: optimistic entry in browser; replaced by server
  id when ready.
- **Notifications**: mark-as-read is optimistic; counts adjust
  immediately.
- **Undo**: optimistic removal; rollback if server rejects.

For **destructive** actions (delete entity), prefer server-confirmed —
the brief loading state is safer than an optimistic surprise.

## 31.6 Conflict behaviour

- Generic strategy: **server is authority** for canonical state; client
  optimistic deltas are reconciled.
- **Field-level conflicts** (two scorers, two devices): the sync engine
  raises a `sync:conflict_added`; the UI surfaces a banner and routes
  the user to the conflict resolver (§23.3).
- **Cricket / football / basketball event ordering**: the engine uses
  `(matchId, sequenceNumber)`; if a late event arrives out of order, the
  UI shows a "Re-order detected — verify" badge.
- **Presence collision**: if two users have `match.score:write` open on
  the same match, the UI shows both avatars and a soft warning
  ("Co-scoring: 2 active operators. Coordinate to avoid duplicates.").

## 31.7 Offline fallback

- Scorer console **fully functional** offline (see §23).
- Public live page falls back to **cached snapshot + polling** when
  socket disconnects; banner is non-intrusive.
- Overlay caches **last frame** when disconnected (broadcast must not
  blank out).
- Dashboard pages show "Reconnecting…" pill in topbar; queries continue
  to use cache.

## 31.8 Reconnection UX

- Exponential backoff: 1s, 2s, 5s, 10s, 30s, 60s (cap).
- Visible "Reconnecting…" pill with attempt count.
- On reconnect: refresh active queries via `queryClient.refetchQueries`
  for any `live` flag, re-subscribe to rooms.
- Show toast "Reconnected" once on resume.
- Public overlay never shows reconnection chrome.

## 31.9 Live indicator design

- **LIVE pulse**: red dot pulsing 1.4s ease-in-out; paired with the
  word "LIVE" (text matters for screen readers + non-colour).
- **Streaming pill**: small grey "Live" pill in dashboard widgets that
  receive socket updates.
- **Stale indicator**: amber "Updated 12m ago" chip when data exceeds
  freshness threshold.
- **Latency badge** (debug mode only): RTT in ms.

## 31.10 Data freshness indicators

- Each chart / KPI card carries an "as of HH:MM:SS" timestamp on hover.
- Tables show a "Last updated: 23s ago" line in their toolbar; live ones
  pulse.
- Standings page shows "Last calculated: …" with a recalc CTA.

## 31.11 Performance budgets

- WebSocket payloads ≤ 4KB typical; binary frames where supported.
- Tick events ≤ 1Hz per match for clocks.
- Coalesce score updates (debounce 50ms in client) for high-frequency
  cricket / basketball sequences.
- Limit subscriptions: a user is auto-subscribed only to rooms relevant
  to the current view; unsubscribe on route change.

## 31.12 Security

- Tokens scoped per channel (org / match / overlay-public).
- Public overlay token is **read-only**; cannot subscribe to admin
  rooms.
- Audit live tail requires `audit:read` + super-admin in cross-tenant.
- Rate-limit per device; suspicious spikes (>50 msg/s) → server soft
  kick.

## 31.13 Implementation notes

```ts
// features/websocket/socketClient.ts
import { io } from 'socket.io-client';
import { useRealtimeStore } from './store';

export const socket = io(import.meta.env.VITE_WS_URL, {
  withCredentials: true,
  transports: ['websocket'],
  reconnectionDelayMax: 60_000,
});

socket.on('connect', () => useRealtimeStore.getState().setStatus('online'));
socket.on('disconnect', () => useRealtimeStore.getState().setStatus('offline'));

// Subscribe per view
export function subscribeMatch(matchId: string) {
  socket.emit('subscribe', { room: `match:${matchId}` });
  return () => socket.emit('unsubscribe', { room: `match:${matchId}` });
}
```

```ts
// features/websocket/hooks/useRealtime.ts
export function useRealtime<T>(event: string, handler: (data: T) => void) {
  useEffect(() => {
    socket.on(event, handler);
    return () => { socket.off(event, handler); };
  }, [event, handler]);
}
```

```ts
// Example: live scoreboard subscribes
useEffect(() => subscribeMatch(matchId), [matchId]);
useRealtime<ScoreUpdate>('match:score_update', (u) =>
  scoreboardStore.apply(u)
);
useRealtime<MatchEvent>('match:event_added', (e) => eventLog.add(e));
```

## 31.14 Testing realtime

- **Local mock socket** for Storybook & unit tests.
- **Playwright e2e**: spin up a test server, drive a match through full
  lifecycle, assert UI parity across two browser contexts (scorer +
  public).
- **Chaos test**: drop connection mid-event, expect UI recovery within
  10s with state consistency.
- **Latency test**: 1s injected latency must not block scoring (queue
  works).
