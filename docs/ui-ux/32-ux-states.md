# 32 — UX States (cross-module)

Every module ships with the full set of states. This section defines the
canonical taxonomy and the visual treatment per state. It also lists, per
module, which states are mandatory.

## 32.1 Canonical states

| State | Trigger | Default treatment |
|---|---|---|
| **Loading** | initial fetch / refetch | Skeleton matching final layout; never a centred spinner-only screen |
| **Empty** | endpoint returns no rows | Illustration + headline + helper + primary CTA |
| **Success** | data rendered | Normal layout |
| **Error** | request failed (>=500, network) | Inline banner with retry; per-feature error boundary as fallback |
| **Unauthorized** | 401 | Redirect to `/login?next=...` with toast |
| **Forbidden** | 403 / missing permission | `<ForbiddenScreen>` with "Request access" CTA |
| **Offline** | no network | Connection banner + cached read + queued writes |
| **Pending sync** | item in queue | Tiny "pending" chip on the affected row/event |
| **Conflict** | sync conflict | Red banner + link to resolver; blocks further edits on the conflicting entity |
| **Partial data** | some sub-resources failed | Render available; show "Some data unavailable" notice; per-cell `—` |
| **Live** | live status active | LIVE pulse + sticky header + realtime |
| **Completed** | terminal status | Read-only summary; trophy/checkmark cue |
| **Suspended** | match suspended | Amber banner + reason; locked editing |
| **Abandoned** | match abandoned | Red banner; read-only |
| **Postponed** | match postponed | Clock icon; new time; reschedule CTA |
| **Cancelled** | match/tournament cancelled | Greyed; reason tooltip; non-actionable |
| **Stale** | data older than threshold | Amber "Updated Nm ago" chip + refresh CTA |
| **Validating** | server-side validation in flight | Spinner inline + disabled submit |
| **Pending review** | item awaits decision (VAR/DRS) | Pulsing chip + locked input around it |
| **Recalculating** | standings recompute in progress | Page dimmed + progress bar |
| **Replaying** | scoring replay in progress | Banner + locked write actions |
| **Read-only** | permission gated or after termination | Hide write affordances; banner if needed |
| **Maintenance** | platform maintenance window | Page-level banner with ETA |

## 32.2 State chips & banners

- **Chip**: a small inline indicator. Used for non-blocking states
  (pending, stale).
- **Banner**: a horizontal strip across the page. Used for blocking or
  attention-required states (offline, conflict, abandoned, maintenance).
- **Toast**: ephemeral. Used for transient events (saved, recalculated,
  reconnected).
- **Modal**: blocking. Used for required actions (session expired,
  conflict resolution, typed confirms).

## 32.3 Empty state pattern

```
[illustration]
Headline (1 line, sentence case)
Helper (1–2 lines, secondary text)
[ Primary CTA ]   [ Secondary link ]
```

Examples:
- **Tournaments empty**: "No tournaments yet — Create your first one to
  get started." → `[ + New tournament ]`.
- **Matches empty**: "No matches scheduled — Create one or generate
  fixtures." → `[ + New match ]  Generate fixtures`.
- **Standings empty**: "Standings will appear after the first completed
  match.".
- **Notifications empty**: "You're all caught up.".

## 32.4 Loading pattern

- Skeletons mirror the final layout (avatar circles, line bars, table
  rows).
- Trigger after 100ms (avoid flash).
- Soft shimmer 1.4s loop; disabled under `prefers-reduced-motion`.
- For long fetches (>2s) add a "Still loading…" subtle helper after
  2s; cancel button after 10s.

## 32.5 Error pattern

- Inline (within the failing component): icon + message + retry button.
- Page-level: keep the rest of the page functional; only error out the
  failing card.
- Catastrophic (router-level): friendly screen with reload + link to
  status page.
- Never expose stack traces in production; surface a `requestId` for
  support.

## 32.6 Unauthorized & forbidden

- **Unauthorized (401)** is treated as a session issue — redirect to
  `/login?next=...`; never show a hostile blank.
- **Forbidden (403)** uses `<ForbiddenScreen>`:
  - Headline: "You don't have access to this."
  - Helper: explains the missing permission/role in plain English.
  - CTA: "Request access" (sends an internal notification to org
    admins).

## 32.7 Offline / sync states

- **Offline banner** appears within 5s of detection.
- **Pending chip** on each affected row/event ("pending sync").
- **Conflict banner** is red and links to the resolver; affected entity
  is locked.
- **Reconnected toast** appears once on recovery.
- **All caught up** chip appears in the sync pill when the queue is
  empty.

## 32.8 Live / lifecycle states (matches)

| State | Visual |
|---|---|
| Scheduled | muted, countdown chip |
| Pre-match | "Pre-match" amber chip; lineup/toss flow |
| Live | red LIVE pulse + period + clock |
| HT / quarter break | grey "HT" chip; actions muted; "Resume" CTA |
| Suspended | amber banner with reason; lifecycle dropdown highlighted |
| Postponed | clock icon; new datetime; reschedule CTA |
| Abandoned | red strikethrough; partial stats; read-only |
| Cancelled | greyed card; reason tooltip |
| Completed | green check chip; summary card; "Sign off" CTA before lock |

## 32.9 Tournament lifecycle states

- Draft → Published → Open Registration → Registration Closed →
  In Progress → Completed → Archived.
- Each gets its own chip colour (grey / blue / green / amber / pulse /
  trophy / muted).

## 32.10 Subscription / billing states

- Active (green), Trialing (blue, with countdown), Past-due (red banner
  across dashboard), Canceled (amber read-only), Paused (grey banner).

## 32.11 Per-module mandatory states

| Module | Loading | Empty | Error | Unauthorized | Forbidden | Offline | Pending sync | Conflict | Partial | Live | Completed | Suspended | Abandoned | Postponed | Cancelled |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Auth | ✓ | — | ✓ | ✓ | ✓ | ✓ | — | — | — | — | — | — | — | — | — |
| Organizations | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — | — | — | — | — | — | — |
| Sports | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — | — | — | — | — | — | — |
| Tournaments | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | ✓ | — | ✓ | — | — | — | ✓ |
| Teams / Players | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | ✓ | — | — | — | — | — | — |
| Matches | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Scoring (generic) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
| Scoring (cricket) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
| Scoring (football) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
| Scoring (basketball) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
| Standings | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | ✓ | — | — | — | — | — | — |
| Notifications | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — | — | — | — | — | — | — |
| Overlays | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — | ✓ | ✓ | — | — | — | — | — |
| Visualization | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — | — | — | — |
| Analytics | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | ✓ | ✓ | — | — | — | — | — |
| Audit | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | ✓ | ✓ | — | — | — | — | — |
| RBAC | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — | — | — | — | — | — | — |
| Billing | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | ✓ | — | — | — | — | — | — |
| Sync | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | — | — | — |
| Public portal | ✓ | ✓ | ✓ | — | — | ✓ | — | — | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Admin | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — | ✓ | — | — | — | — | — | — |

## 32.12 Recovery patterns

- **Retry** button is always present on errors (with bounded retries).
- **Undo** toast for destructive actions where safe (5s window).
- **Discard** for dirty forms after navigation prompt.
- **Recover scoring** after a crash: scorer console hydrates from IDB
  and re-subscribes; banner: "Recovered N pending events".

## 32.13 Notifications about states

- A state transition that affects others raises a notification:
  - Match goes Suspended → notification to scorers/officials.
  - Sync conflict raised → notification to scorer.
  - Standings recalculated → notification to admins.
  - Subscription past-due → notification to owner & admins.

## 32.14 Accessibility for states

- **Live** content is announced via `aria-live="polite"` (e.g., score
  updates).
- **Errors** announced via `role="alert"`.
- **Loading** announced via `aria-busy="true"` on the parent region.
- **Forbidden / unauthorized / offline** pages have a single `<h1>` and
  the CTA is the first interactive focus target.
