# 02 — Information Architecture

This section defines the product topology that every screen, route, store, and
service must respect. It is the contract between backend, frontend, and design.

## 2.1 Product architecture

```
KhelSetu
├── Public Portal (no auth)
│   ├── Marketing (landing, pricing, about)
│   ├── Discovery (tournaments, teams, players, search)
│   ├── Live (match live score, fixtures, standings)
│   └── Public Match Creation (free-tier)
│
├── Auth Shell
│   ├── Public register
│   ├── Dashboard register
│   ├── Login
│   ├── Password reset
│   └── Invitation accept
│
├── Dashboard Shell (auth + org context)
│   ├── Org switcher / picker
│   ├── Top-level modules
│   │   ├── Sports master
│   │   ├── Tournaments
│   │   ├── Teams & Players
│   │   ├── Matches & Scoring
│   │   ├── Standings
│   │   ├── Visualisation
│   │   ├── Overlays
│   │   ├── Notifications
│   │   ├── Analytics & Reports
│   │   ├── Billing
│   │   ├── Members & RBAC
│   │   ├── Audit
│   │   └── Sync / Devices
│   └── Profile / Settings
│
├── Scorer Console (auth + match context, mobile-first)
│   ├── Pre-match (lineups, toss, officials)
│   ├── Live scoring
│   ├── Event history & undo
│   └── Post-match (summary, sign-off)
│
├── Broadcast Overlay (token-only, no chrome)
│   ├── Public scoreboard
│   ├── Lower-third
│   └── Sponsor / custom templates
│
└── Super-Admin (cross-tenant, restricted)
    ├── Tenants
    ├── Plans
    └── Platform audit
```

## 2.2 Module architecture

A **module** is a vertical slice of features grouped by domain. Each module
owns its routes, services, hooks, components, store slice, and types.

| Module           | Routes prefix                                                   | Owns                                           |
| ---------------- | --------------------------------------------------------------- | ---------------------------------------------- |
| `auth`           | `/auth`, `/me`                                                  | Sessions, profile, password, navigation        |
| `organizations`  | `/o/:orgSlug/...` (context), `/organizations`                   | Tenant context, members, invitations           |
| `sports`         | `/o/:orgSlug/sports`                                            | Sport master                                   |
| `tournaments`    | `/o/:orgSlug/tournaments`                                       | Tournament CRUD, status, fixtures              |
| `teams`          | `/o/:orgSlug/teams`                                             | Teams, rosters                                 |
| `players`        | `/o/:orgSlug/players`                                           | Players, eligibility, multi-team               |
| `matches`        | `/o/:orgSlug/matches`                                           | Match CRUD, officials, lifecycle               |
| `scoring`        | `/o/:orgSlug/scoring/:matchId`                                  | Generic, cricket, football, basketball scoring |
| `standings`      | `/o/:orgSlug/standings/:tournamentId`                           | League tables, snapshots, recalc               |
| `notifications`  | `/o/:orgSlug/notifications`                                     | Inbox, unread, mark-read                       |
| `overlays`       | `/o/:orgSlug/overlays`                                          | Templates, active overlays, public URLs        |
| `visualization`  | `/o/:orgSlug/visualization`                                     | Formations, annotations                        |
| `analytics`      | `/o/:orgSlug/analytics`                                         | Dashboard, tournament, team, player, reports   |
| `audit`          | `/o/:orgSlug/audit`                                             | Logs, entity history, user activity            |
| `rbac`           | `/o/:orgSlug/settings/roles`, `/settings/permissions`           | Roles, permissions, user-role matrix           |
| `billing`        | `/o/:orgSlug/billing`                                           | Plans, subscription, invoices, payment methods |
| `sync`           | `/o/:orgSlug/sync`                                              | Queue, status, conflicts, devices              |
| `public`         | `/`, `/tournaments`, `/matches`, `/players`, `/teams`, `/plans` | Public portal                                  |
| `overlay-public` | `/overlay/:token`                                               | Public broadcast overlay                       |
| `admin`          | `/admin` (super-admin)                                          | Tenants, plans, platform audit                 |

## 2.3 Feature architecture

Every module follows **feature-sliced design**:

```
features/<module>/
├── components/        # Feature-only UI
├── hooks/             # useXyz hooks
├── services/          # API service (axios)
├── store/             # Zustand slice (client state)
├── types/             # Zod schemas + TS types
├── utils/             # Local helpers
└── index.ts           # Public API
```

Cross-cutting (shared) lives in `components/ui/`, `components/animations/`,
`hooks/`, `services/`, `store/`, `lib/`.

## 2.4 Screen architecture

Screens are **route-level pages** that compose feature components and shared
components. They own:

- Route guards (auth, role, permission)
- Data fetching (TanStack Query)
- Page-level state (Zustand)
- Layout composition (header, sidebar, breadcrumbs)
- Error boundaries + skeletons

Screens **never** call the API directly. They go through `services/`.

## 2.5 Route architecture

Two route trees:

- `publicRouter` — Landing, public portal, public overlay, auth flows.
- `dashboardRouter` — `/o/:orgSlug/*` with org context, role guards, and
  module lazy loading.

A top-level `<RootRouter>` switches based on `pathname` (overlay routes are
deliberately separate so they don't load dashboard chrome).

## 2.6 Layout architecture

| Layout            | Used by                        | Notes                                              |
| ----------------- | ------------------------------ | -------------------------------------------------- |
| `PublicLayout`    | Landing, public portal         | Marketing nav, footer, language switcher           |
| `AuthLayout`      | Login, register, accept invite | Minimal — logo, language, footer                   |
| `DashboardLayout` | All `/o/:orgSlug/*`            | Sidebar + topbar + breadcrumbs + org switcher      |
| `ScorerLayout`    | `/scoring/*`                   | Full-bleed, sticky score header, bottom action bar |
| `OverlayLayout`   | `/overlay/:token`              | No chrome; transparent; OBS-tested                 |
| `AdminLayout`     | `/admin/*`                     | Same as dashboard, different sidebar               |

## 2.7 Component architecture

Three tiers:

1. **Primitives** (`components/ui/*`) — Button, Input, Card, Modal, Toast,
   Tabs, Badge, Skeleton, Progress, Accordion, Avatar.
2. **Composite** (`components/*`) — DataTable, FilterBar, SearchBar, Charts,
   Sidebar, Header, NotificationPanel, EmptyState, ErrorBoundary.
3. **Feature** (`features/*/components/*`) — ScorerActionGrid, DeliveryForm,
   LineupBuilder, PenaltyShootoutPanel, TacticalBoard, DRSReviewPanel.

Composites consume primitives. Features consume composites + primitives.

## 2.8 State architecture

Dual strategy (per README):

| Concern         | Tool                             | Lives in                                  |
| --------------- | -------------------------------- | ----------------------------------------- |
| Server cache    | TanStack React Query             | `services/*` + `hooks/useXxx.ts`          |
| Client UI state | Zustand                          | `store/uiStore.ts`, `store/authStore.ts`  |
| Scorer runtime  | Zustand (with persist + IDB)     | `features/scoring/store/`                 |
| Form state      | React Hook Form                  | Forms (`features/*/components/*Form.tsx`) |
| URL state       | React Router `useSearchParams`   | Filter / sort / pagination                |
| WebSocket state | Zustand store with event reducer | `features/websocket/store/`               |
| Offline queue   | IndexedDB + Web Worker           | `workers/sync.worker.ts`                  |
| Permissions     | React context + selector         | `lib/rbac/`                               |

## 2.9 Permission architecture

Three layers:

1. **Route guards** — `RequireAuth`, `RequireOrgMember`, `RequireRole`,
   `RequirePermission`.
2. **Component guards** — `<Can permission="overlay:write">…</Can>`.
3. **Service guards** — service methods early-return on missing permission
   (defence in depth).

The `<Can>` component takes either a permission key or a role, and supports
`<Can not>` for inverse checks.

## 2.10 Realtime architecture

Single `RealtimeProvider` mounts a Socket.IO client, normalises events into a
typed stream, and writes to per-event Zustand slices. Components subscribe via
slim selectors — no prop drilling. See `31-realtime.md` for events and
strategies.

## 2.11 Offline / sync architecture

- **IndexedDB** stores the offline queue (`syncQueue`), cached matches, and
  match-state snapshots.
- A **Web Worker** (`sync.worker.ts`) drains the queue when online, with
  exponential backoff and idempotency keys.
- **Conflicts** are presented in a dedicated UI — never silently overwritten.
- The **scorer console** is the primary offline surface; public overlay is
  read-only and can fall back to polling.
- A persistent **connectivity banner** shows online / offline / syncing.

## 2.12 Permission keys (master list)

These names align with `/api/rbac/permissions` responses.

| Key                                                                                   | Purpose                                   |
| ------------------------------------------------------------------------------------- | ----------------------------------------- |
| `org:read`, `org:write`, `org:delete`                                                 | Org settings                              |
| `org.member:read`, `org.member:write`, `org.member:remove`                            | Members                                   |
| `org.invitation:send`, `org.invitation:accept`                                        | Invitations                               |
| `sport:read`, `sport:write`, `sport:delete`                                           | Sports master                             |
| `tournament:read`, `tournament:write`, `tournament:delete`, `tournament.status:write` | Tournaments                               |
| `tournament.team:read`, `tournament.team:register`, `tournament.team:remove`          | Team registration                         |
| `tournament.fixture:read`, `tournament.fixture:generate`                              | Fixtures                                  |
| `team:read`, `team:write`, `team:delete`                                              | Teams                                     |
| `player:read`, `player:write`, `player:delete`                                        | Players                                   |
| `match:read`, `match:write`, `match:delete`                                           | Match CRUD                                |
| `match.officials:read`, `match.officials:write`                                       | Officials                                 |
| `match.lifecycle:write`                                                               | Start/end/suspend/resume/postpone/abandon |
| `match.score:read`, `match.score:write`, `match.score:undo`                           | Scoring                                   |
| `scoring.replay:read`, `scoring.replay:write`                                         | Replay & snapshots                        |
| `standings:read`, `standings:recalculate`, `standings.snapshot:write`                 | Standings                                 |
| `notification:read`, `notification:delete`                                            | Notifications                             |
| `overlay:read`, `overlay:write`, `overlay.activate`, `overlay.template:write`         | Overlays                                  |
| `visualization:read`, `visualization:write`                                           | Formations & annotations                  |
| `analytics:read`, `analytics.report:create`, `analytics.report:export`                | Analytics                                 |
| `audit:read`, `audit.export`                                                          | Audit                                     |
| `rbac:read`, `rbac.role:write`, `rbac.permission:assign`                              | RBAC                                      |
| `billing:read`, `billing:write`, `billing.invoice:read`                               | Billing                                   |
| `sync:read`, `sync:write`, `sync.device:manage`                                       | Sync                                      |
| `public.match:create`                                                                 | Public free match                         |
| `*`                                                                                   | Super-admin                               |

## 2.13 Default roles (seeded by backend)

| Role             | Key permissions                                                                     |
| ---------------- | ----------------------------------------------------------------------------------- |
| Owner            | `org:*`, `billing:*`, `rbac:*`, plus all read                                       |
| Admin            | All read + write within org, no billing, no rbac                                    |
| Tournament Admin | `tournament:*`, `team:*`, `player:*`, `match:*`, `match.officials:*`, `standings:*` |
| Scorer           | `match:read`, `match.score:read`, `match.score:write`, `match.score:undo`           |
| Coach            | `team:read`, `player:read`, `match:read`, `analytics:read`                          |
| Viewer           | `*:read` within org                                                                 |
| Public User      | `public.match:create` (with quota)                                                  |
| Super Admin      | `*` (cross-tenant)                                                                  |

## 2.14 Real-time event catalogue

| Event                                | Source               | Subscribers                           |
| ------------------------------------ | -------------------- | ------------------------------------- |
| `match:score_update`                 | scoring service      | public score page, overlay, dashboard |
| `match:status_change`                | match service        | public, dashboard, overlay            |
| `match:event_added`                  | scoring service      | event log, broadcast ticker           |
| `match:event_undone`                 | scoring service      | event log                             |
| `match:clock_tick`                   | scoring service      | overlay, scorer (when idle)           |
| `match:period_change`                | scoring service      | overlay, scorer                       |
| `standings:updated`                  | standings service    | standings page, dashboard             |
| `notification:new`                   | notification service | bell, toast                           |
| `overlay:activated` / `deactivated`  | overlay service      | overlay manager                       |
| `sync:status`                        | sync service         | sync panel, banner                    |
| `var:status`, `drs:status`           | scoring service      | VAR/DRS panels                        |
| `shot_clock:tick`, `game_clock:tick` | scoring service      | scorer, overlay                       |
| `presence:join` / `leave`            | realtime             | scorer presence indicator             |

## 2.15 Information architecture summary

A user lands in one of three app-shells. The shell loads the right router. The
router enforces the right guards. The page uses feature components. The feature
components read from Zustand (client) + React Query (server) + Realtime
(websocket) + IndexedDB (offline). The design system defines the visual
language. Permissions wrap every layer. Errors and loading are explicit.
