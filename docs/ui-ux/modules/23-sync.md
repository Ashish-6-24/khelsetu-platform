# 23 — Sync / Offline UX

## Endpoints covered

```
POST /api/sync/queue
POST /api/sync/process
GET  /api/sync/status
POST /api/sync/conflicts/{syncItemId}/resolve
POST /api/sync/device/register
GET  /api/sync/device
```

## Mental model

Sync is the **offline-first nervous system** for the scorer console (and,
secondarily, for tactical/visualisation edits). It ensures that a scorer
working in a stadium with weak/no connectivity can keep working, and that
their events are reliably persisted, deduplicated, ordered, and
conflict-resolved when the network returns.

Architecture (see §2.11):

- **IndexedDB** caches matches, lineups, latest server snapshot.
- **Sync queue** (per device): every mutation is appended with a
  `clientEventId` (UUIDv7), `entity`, `op`, `payload`, `createdAt`,
  `retryCount`, `lastError`, `status`.
- **Web Worker** drains the queue with exponential backoff & idempotency.
- **Conflict resolution** is presented in a dedicated UI; nothing is
  silently dropped.

## Screens

### 23.1 Sync queue page — `/o/:orgSlug/sync`
- **Header**: connectivity chip (Online / Offline / Limited), device
  chip (current device name), "Process now" CTA (forces a drain).
- **Tabs**: Pending, In-progress, Failed, Conflicts, Synced (last 24h).
- **Table**:
  - Created at, entity (match, event, lineup, annotation), op, payload
    summary (truncated), retries, last error, status, actions
    (Retry, Discard, Open conflict).
- **Bulk**: retry selected, discard selected (with confirmation).
- **Filters**: status, entity, match.
- **Empty (Pending)**: "All caught up." with last-sync timestamp.

### 23.2 Sync status panel (global)
- Sticky panel in the scorer console + dashboard sidebar:
  - Connectivity indicator (green / amber / red dot).
  - Pending count.
  - "Last synced" relative time.
  - Tooltip with details on hover.
- Real-time updates via `sync:status` socket event.

### 23.3 Conflict resolution page — `/o/:orgSlug/sync/conflicts`
- **List** of conflicts: entity, your version, server version,
  timestamp, scorer.
- **Detail panel** on selection:
  - Side-by-side diff (your / theirs) with field-level highlights.
  - "Keep mine" / "Keep theirs" / "Merge fields" controls.
  - For event-level conflicts (rare): show context (surrounding events)
    and offer "Insert as new event with timestamp T" option.
- **Submit**: `POST /sync/conflicts/{syncItemId}/resolve` with the chosen
  strategy.
- **Audit** entry created for every resolution.

### 23.4 Device registration
- **Flow**: first time a device connects, prompt "Name this device"
  (auto-suggest: hostname + OS).
- **Endpoint**: `POST /sync/device/register`.
- **Store** device id in IndexedDB; sent on every mutation as
  `X-Device-Id`.

### 23.5 Device info panel — `/o/:orgSlug/sync/devices`
- **List** (`GET /sync/device`): device name, OS, browser, last seen,
  pending queue depth, "Logout this device" (revokes refresh tokens).
- **Per-device** stats: avg sync latency, conflict count this month.

### 23.6 Connection state banner (global)
- **Online**: hidden.
- **Slow connection** (detected via latency >2s): subtle amber pill
  "Slow connection — your work is queued".
- **Offline**: prominent amber bar "Offline mode — N events queued —
  they will sync when you're back online" with "Open sync queue" link.
- **Reconnecting**: spinner pill.
- **Conflict requires attention**: red bar "N conflicts — resolve to
  continue" link.

### 23.7 Offline-first behaviour for scoring (companion)
- The scorer console writes events to IDB first, optimistically updates
  UI, and queues the network call.
- Reads (snapshot, history) prefer cache, refresh on focus / reconnect.
- The scorer never sees a spinner unless they explicitly request a
  fresh state (pull-to-refresh).
- All clocks are computed client-side from an authoritative
  `match:clock_tick` and fall back to local interpolation when offline.

## Components

- `<ConnectionBanner>`, `<SyncStatusPill>`, `<SyncQueueTable>`,
  `<ConflictList>`, `<ConflictDiffViewer>`, `<ResolveControls>`,
  `<DeviceNamePrompt>`, `<DevicesTable>`, `<DeviceCard>`,
  `<ProcessNowButton>`, `<RetryButton>`, `<DiscardButton>`.

## UI requirements

- **Offline queue** prominent, clear, recoverable.
- **Pending / synced / failed / conflict** distinct visual states.
- **Retry action** per-item and bulk.
- **Conflict resolution controls**: side-by-side diff, keep-mine / keep-
  theirs / merge / insert-as-new.
- **Device tracking**: human-readable names, last-seen, kill switch.
- **Connection state banner** non-blocking but unambiguous.
- **Offline-first scoring**: zero perceptible delay from the scorer's
  POV.

## States

- **All clear**: no banner, "Up to date" tooltip on the sync pill.
- **Queued (online)**: subtle amber pill with count.
- **Offline**: amber banner, queue grows; UI fully functional for
  scoring + cached reads.
- **Syncing**: blue pill with spinner; auto-clears.
- **Failed (retry pending)**: amber with retry countdown.
- **Failed (max retries)**: red, requires manual action.
- **Conflict**: red banner, blocks new actions on the affected entity
  until resolved.
- **Conflict resolved**: green toast "Conflict resolved — synced".

## Permissions

- `sync:read` — view own queue / status.
- `sync:write` — process / retry / discard.
- `sync.device:manage` — register / revoke devices.
- Admins can view org-wide queue and devices.

## Mobile

- Sync queue page becomes a card list with pull-to-refresh.
- Conflict resolver becomes full-screen with stacked diff (your above,
  theirs below).
- Connection banner sticks to the top above the scorer console.

## Realtime

- `sync:status` event delivers queue / device / conflict deltas.
- `sync:conflict_added` raises a high-priority notification (toast +
  bell badge).
- `sync:item_synced` removes the item from the pending list (with a
  brief check-mark animation).

## Edge cases

- **Clock skew**: device clock can be wrong; the server stamps
  authoritative timestamps. UI shows both when relevant.
- **App close mid-sync**: queue persists in IDB; resumes on next load.
- **Storage quota exceeded**: amber banner "Local storage almost full —
  process queue" with "Process now" CTA.
- **Multi-tab**: a BroadcastChannel coordinates so only one tab drains
  the queue at a time.
- **Account switch**: queue is per (userId, orgId) and per device;
  switching org pauses sync for the previous org until a foreground
  drain.

## Accessibility

- Connection banner has `role="status"` (online → offline transition)
  and `role="alert"` (conflict).
- Conflict diff viewer announces added/removed/changed fields.
- Buttons have descriptive `aria-label` ("Retry sync for event ...").
- Status pills include text label, never colour-only.
