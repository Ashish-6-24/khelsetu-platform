# 01 — Product Overview

## Product in one sentence

KhelSetu is a **multi-tenant, real-time sports tournament management platform**
that lets organisations run football, cricket, and basketball competitions end to
end — from public discovery, to registration, to live scoring, to broadcast
overlays, to analytics, billing, and audit.

## Product type & classification

| Attribute              | Value                                                            |
| ---------------------- | ---------------------------------------------------------------- |
| **Type**               | B2B SaaS + Consumer public portal                                |
| **Multi-tenant**       | Yes — organisation-scoped data isolation                         |
| **Sports**             | Football, Cricket, Basketball (with a generic sport master)      |
| **Real-time**          | Yes — WebSocket / Socket.IO for scoring, overlays, notifications |
| **Offline**            | Yes — Web Worker sync queue, conflict resolution, device pairing |
| **Localisation**       | en, ne, hi (Nepal-first)                                         |
| **Public surfaces**    | Landing, public tournaments, live scores, plans                  |
| **Dashboard surfaces** | Org admin, scorer console, broadcaster, analyst, billing, audit  |
| **Mobile-first**       | Scorer console + public portal are mobile-first                  |
| **Broadcast-ready**    | OBS-style overlay URL (public token)                             |

## SaaS model

KhelSetu sells **subscriptions to organisations** (clubs, federations, schools,
leagues, broadcasters) and exposes a **free public portal** to drive adoption
and free-match creation.

- **Public tier** — free viewers can browse, watch live scores, and create a
  limited number of "free matches" via the public match creation flow.
- **Organisational tier** — paid plans (Starter / Pro / Enterprise — surfaced
  via `/api/public/plans`) unlock multi-user roles, scoring consoles, overlays,
  analytics, audit, sync, and unlimited matches.

## Multi-tenant structure

```
Tenant (Organisation)
├── Members (users with roles)
├── Sports (master, can be customised)
├── Tournaments
│   ├── Teams
│   ├── Players
│   └── Matches
│       ├── Officials
│       ├── Scoring events (cricket / football / basketball)
│       ├── Standings
│       └── Visualisations (formations + annotations)
├── Overlays (templates + active)
├── Analytics dashboards
├── Audit logs
├── Billing / subscription
└── Devices (offline sync)
```

The UI enforces tenant isolation through:

1. **Tenant context** — an `OrganisationProvider` wraps the dashboard and reads
   the active org id from URL (`/o/:orgSlug/...`).
2. **Permission context** — an `RBACProvider` exposes the current user's
   permissions, roles, and a `<Can>` guard.
3. **Forbidden / empty states** — every org-scoped page handles
   `403 Forbidden` (no membership) and `200 OK + []` (no data) explicitly.

## Public portal vs. dashboard portal

| Surface                    | Auth     | Org-membership | Permission       | Realtime      | Offline-friendly   | Mobile-first      |
| -------------------------- | -------- | -------------- | ---------------- | ------------- | ------------------ | ----------------- |
| Public landing             | —        | —              | —                | Light polling | Yes                | Yes               |
| Public tournament browse   | —        | —              | —                | Live scores   | Yes                | Yes               |
| Public live score page     | —        | —              | —                | Yes (socket)  | Read-only          | Yes               |
| Public overlay URL (token) | —        | —              | Token-gated      | Yes           | Read-only          | Read-only         |
| Public match create (free) | Required | —              | Quota-gated      | —             | Partial            | Yes               |
| Login / Register           | —        | —              | —                | —             | Yes                | Yes               |
| Dashboard (any org)        | Required | Required       | Scoped           | Yes           | Partial            | Partial           |
| Scorer console             | Required | Required       | `score:write`    | Yes           | **Yes (critical)** | **Yes (primary)** |
| Overlay manager            | Required | Required       | `overlay:*`      | Yes           | No                 | No                |
| Analytics                  | Required | Required       | `analytics:read` | Snapshot      | No                 | No                |
| Audit                      | Required | Required       | `audit:read`     | —             | No                 | No                |
| RBAC admin                 | Required | Required       | `rbac:*`         | —             | No                 | No                |
| Billing                    | Required | Required       | Owner / admin    | —             | No                 | Tablet            |
| Sync                       | Required | Required       | `sync:read`      | Yes           | **Yes (primary)**  | Yes               |
| Super-admin tenant mgmt    | Required | —              | `*`              | —             | No                 | No                |

## Persona map

### 1. Public Visitor ("Fan")

- **Goal:** Find a tournament, follow a live match, share a score link.
- **Touches:** Landing → Tournament browse → Match detail → Live score.
- **Permissions:** None.
- **Devices:** Mobile (80% traffic expected), tablet, desktop.
- **Needs:** Fast loads, low data usage, clear "LIVE" cues, shareable URLs.

### 2. Registered User (no organisation yet)

- **Goal:** Get a public account, create a free match, follow tournaments.
- **Touches:** Register → `/me` profile → create free match.
- **Permissions:** Public-only endpoints + `public.matches.create` (quota).
- **Devices:** Mobile, desktop.

### 3. Organisation Owner

- **Goal:** Set up the org, invite staff, choose plan, manage billing.
- **Touches:** Org create → Members invite → Billing.
- **Permissions:** All within their org.
- **Devices:** Desktop, tablet.

### 4. Organisation Admin

- **Goal:** Manage members, roles, sports, tournaments, settings.
- **Permissions:** All except billing-critical.
- **Devices:** Desktop, tablet.

### 5. Tournament Admin

- **Goal:** Create / run a tournament, manage teams, schedule, generate
  fixtures, oversee match officials.
- **Permissions:** `tournament:*`, `team:*`, `player:*`, `match:*`, `match.officials:*`.
- **Devices:** Desktop, tablet.

### 6. Scorer

- **Goal:** Score matches live, undo mistakes, validate events, hand off
  matches.
- **Permissions:** `match.score:write`, `match.score:undo`, `match.score:read`.
- **Devices:** **Tablet, phone (primary)**, with a "scorer" layout.

### 7. Coach / Staff

- **Goal:** View their team's analytics, lineup, and upcoming matches.
- **Permissions:** `team:read`, `match:read`, `analytics:read`.
- **Devices:** Mobile, tablet, desktop.

### 8. Broadcaster

- **Goal:** Manage overlay templates, activate overlays, copy public URLs
  into OBS, monitor connection.
- **Permissions:** `overlay:*`, `match:read`.
- **Devices:** Desktop (primary).

### 9. Analyst

- **Goal:** Build reports, view leaderboards, custom queries.
- **Permissions:** `analytics:read`, `analytics.report:create`.
- **Devices:** Desktop.

### 10. Super Admin (platform)

- **Goal:** Tenant management, abuse response, plan configuration.
- **Permissions:** `*` (cross-tenant).
- **Devices:** Desktop, secure environment.

## Product surfaces — what it "feels like"

| Surface            | Feeling                                                                   |
| ------------------ | ------------------------------------------------------------------------- |
| Public landing     | Confident, energetic, trust-building. Hero with live match ticker.        |
| Public live score  | Sticky score header, event timeline, refresh-light, broadcast-clean.      |
| Public overlay     | Pure broadcast, no chrome, no auth, 16:9, OBS-tested.                     |
| Dashboard home     | Dense, real-time, customisable. KPIs at top, action cards below.          |
| Scorer console     | **Fast, glove-friendly, undo-friendly, big targets, low cognitive load.** |
| Tournament bracket | Visual, printable, sharable. Static when idle, animated on update.        |
| Analytics          | Insight cards first, drill-down tables. Recharts everywhere.              |
| Billing            | Plain English, clear pricing, transparent quota usage.                    |
| Audit              | Forensic, dense, filterable, exportable.                                  |
| Offline sync       | Reassuring — "your work is safe" — with explicit status & retry.          |
| Mobile             | All public flows and the scorer console are touch-first.                  |

## What this means for the frontend

- The product has **three main app-shells**: `PublicShell`, `DashboardShell`,
  and `OverlayShell` (no chrome).
- There are **two device postures** for scoring: phone (glove-friendly) and
  tablet (larger buttons, multi-pane). Use a `<DevicePostureProvider>` to
  switch.
- Every screen declares its **role requirement** and the router enforces it.
- Every action that mutates state has an **undo or confirmation** affordance.
- The UI is **bilingual** (en/ne first, hi second) — every string is i18n-keyed.
- The platform is **offline-tolerant** for the scorer console and public
  overlay; the dashboard is online-first.
