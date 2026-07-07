# 26 — Routes & Layouts (Frontend Architecture)

Assumed stack: **Next.js 15 (App Router) or Vite + React 19**, TypeScript,
TailwindCSS v4, Shadcn UI, TanStack React Query, Zustand, Socket.IO,
React Hook Form + Zod, Recharts, Framer Motion, Web Workers, IndexedDB
(via Dexie).

If the team uses **Vite + React Router** (current `khelsetu-frontend`
posture), translate route segments accordingly; the structure below maps
cleanly to either.

## 26.1 Folder structure

```
src/
├── app/                             # (Next.js) or src/main.tsx + Router
│   ├── (public)/
│   │   ├── layout.tsx               # PublicLayout
│   │   ├── page.tsx                 # Landing
│   │   ├── tournaments/...
│   │   ├── matches/...
│   │   ├── teams/...
│   │   ├── players/...
│   │   ├── plans/...
│   │   └── search/page.tsx
│   ├── (auth)/
│   │   ├── layout.tsx               # AuthLayout
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── public-register/page.tsx
│   │   ├── reset/page.tsx
│   │   └── accept/[token]/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx               # DashboardLayout (org context guard)
│   │   ├── organizations/page.tsx   # Org picker / list
│   │   ├── organizations/new/page.tsx
│   │   └── o/[orgSlug]/
│   │       ├── layout.tsx           # OrgScopedLayout
│   │       ├── page.tsx             # Org home (KPIs)
│   │       ├── sports/...
│   │       ├── tournaments/...
│   │       ├── teams/...
│   │       ├── players/...
│   │       ├── matches/...
│   │       ├── scoring/[matchId]/   # Scorer routes (ScorerLayout)
│   │       │   ├── layout.tsx
│   │       │   ├── page.tsx
│   │       │   ├── lineup/page.tsx
│   │       │   ├── eligibility/page.tsx
│   │       │   ├── var/page.tsx
│   │       │   ├── penalties/page.tsx
│   │       │   ├── corrections/page.tsx
│   │       │   ├── fouls/[teamId]/page.tsx
│   │       │   └── stats/page.tsx
│   │       ├── standings/[tournamentId]/page.tsx
│   │       ├── notifications/page.tsx
│   │       ├── overlays/...
│   │       ├── visualization/...
│   │       ├── analytics/...
│   │       ├── audit/...
│   │       ├── settings/
│   │       │   ├── general/page.tsx
│   │       │   ├── members/page.tsx
│   │       │   ├── roles/page.tsx
│   │       │   └── permissions/page.tsx
│   │       ├── billing/...
│   │       └── sync/...
│   ├── (admin)/
│   │   ├── layout.tsx               # AdminLayout (super-admin guard)
│   │   └── admin/...
│   ├── overlay/[token]/
│   │   ├── layout.tsx               # OverlayLayout (no chrome)
│   │   └── page.tsx
│   ├── api/                          # (Next only) BFF routes if needed
│   ├── error.tsx                     # Root error boundary
│   ├── not-found.tsx
│   └── global-error.tsx
│
├── components/
│   ├── ui/                           # Shadcn primitives
│   ├── layout/                       # Header, Sidebar, Topbar, BottomNav
│   ├── charts/                       # Wrapped Recharts
│   ├── empty-states/
│   ├── icons/
│   ├── animations/
│   ├── data-table/
│   └── overlays/                     # Broadcast components
│
├── features/
│   ├── auth/{components,hooks,services,store,types,utils}
│   ├── organizations/...
│   ├── sports/...
│   ├── tournaments/...
│   ├── teams/...
│   ├── players/...
│   ├── matches/...
│   ├── scoring/{cricket,football,basketball,generic}/...
│   ├── standings/...
│   ├── notifications/...
│   ├── overlays/...
│   ├── visualization/...
│   ├── analytics/...
│   ├── audit/...
│   ├── rbac/...
│   ├── billing/...
│   ├── sync/...
│   ├── public/...
│   └── admin/...
│
├── hooks/                            # Shared hooks
│   ├── useOrg.ts
│   ├── useUser.ts
│   ├── useCan.ts
│   ├── useRealtime.ts
│   ├── useOnline.ts
│   ├── useDevicePosture.ts
│   └── useDebounce.ts
│
├── services/
│   ├── apiClient.ts                  # Axios w/ interceptors
│   ├── queryClient.ts                # TanStack
│   ├── socketClient.ts               # Socket.IO
│   ├── i18n.ts                       # i18next
│   └── analytics.ts                  # PostHog/Segment
│
├── store/
│   ├── authStore.ts
│   ├── orgStore.ts
│   ├── uiStore.ts
│   ├── realtimeStore.ts
│   └── deviceStore.ts
│
├── lib/
│   ├── rbac/                         # <Can>, <RequirePermission>
│   ├── validation/                   # Zod schemas
│   ├── format/                       # date, number, currency
│   ├── url/                          # URL state helpers
│   └── errors/                       # Mapped error messages
│
├── workers/
│   ├── sync.worker.ts                # Sync queue drain
│   └── replay.worker.ts              # Replay tests
│
├── styles/
│   ├── globals.css
│   └── themes.css
│
├── types/
│   ├── api.d.ts                      # Generated from OpenAPI
│   └── domain.d.ts
│
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

## 26.2 Route map

### Public (no auth)

```
/                                    Landing
/tournaments                         Tournament browse
/tournaments/:id                     Tournament detail (public)
/tournaments/:id/standings           Public standings
/tournaments/:id/fixtures            Public fixtures
/matches/:id                         Match detail (public)
/matches/:id/live                    Public live score
/matches/create                      Public free match create (auth + quota)
/teams/:id                           Team profile (public)
/players/:id                         Player profile (public)
/search                              Global search
/plans                               Pricing
/plans/compare                       Plan comparison
/about, /contact, /privacy, /terms   Marketing
```

### Auth

```
/login
/register
/register/public                     Public user register
/reset
/accept/:token                       Invitation accept
/logout
```

### Dashboard (auth + org)

```
/organizations                       Org list / picker
/organizations/new                   Create org
/o/:orgSlug                          Org home
/o/:orgSlug/sports
/o/:orgSlug/sports/new
/o/:orgSlug/sports/:id
/o/:orgSlug/tournaments
/o/:orgSlug/tournaments/new          (wizard)
/o/:orgSlug/tournaments/:id
/o/:orgSlug/tournaments/:id/edit
/o/:orgSlug/tournaments/:id/teams
/o/:orgSlug/tournaments/:id/fixtures
/o/:orgSlug/teams
/o/:orgSlug/teams/:id
/o/:orgSlug/players
/o/:orgSlug/players/:id
/o/:orgSlug/matches
/o/:orgSlug/matches/new
/o/:orgSlug/matches/:id
/o/:orgSlug/matches/:id/center
/o/:orgSlug/schedule                 Calendar view
/o/:orgSlug/scoring/:matchId         Scorer console (sport routed by match.sport)
/o/:orgSlug/scoring/:matchId/lineup
/o/:orgSlug/scoring/:matchId/eligibility       (football)
/o/:orgSlug/scoring/:matchId/var               (football)
/o/:orgSlug/scoring/:matchId/penalties         (football)
/o/:orgSlug/scoring/:matchId/corrections       (football)
/o/:orgSlug/scoring/:matchId/stats             (basketball / general)
/o/:orgSlug/scoring/:matchId/fouls/:teamId     (basketball)
/o/:orgSlug/standings/:tournamentId
/o/:orgSlug/standings/:tournamentId/snapshots
/o/:orgSlug/notifications
/o/:orgSlug/overlays
/o/:orgSlug/overlays/new
/o/:orgSlug/overlays/templates
/o/:orgSlug/overlays/templates/:id
/o/:orgSlug/visualization/board/:matchId
/o/:orgSlug/visualization/formations/:matchId/:teamId
/o/:orgSlug/analytics
/o/:orgSlug/analytics/tournaments/:id
/o/:orgSlug/analytics/matches/:id
/o/:orgSlug/analytics/teams/:id
/o/:orgSlug/analytics/players/:id
/o/:orgSlug/analytics/reports/custom
/o/:orgSlug/analytics/leaderboards
/o/:orgSlug/audit
/o/:orgSlug/audit/entity/:type/:id
/o/:orgSlug/audit/user/:userId
/o/:orgSlug/settings/general
/o/:orgSlug/settings/members
/o/:orgSlug/settings/members/:userId/roles
/o/:orgSlug/settings/members/:userId/permissions
/o/:orgSlug/settings/roles
/o/:orgSlug/settings/roles/new
/o/:orgSlug/settings/roles/:id
/o/:orgSlug/settings/roles/matrix
/o/:orgSlug/settings/permissions
/o/:orgSlug/billing
/o/:orgSlug/billing/invoices
/o/:orgSlug/billing/invoices/:id
/o/:orgSlug/billing/usage
/o/:orgSlug/billing/payment-methods
/o/:orgSlug/billing/upgrade
/o/:orgSlug/billing/cancel
/o/:orgSlug/sync
/o/:orgSlug/sync/conflicts
/o/:orgSlug/sync/devices
/me                                  Profile
/me/security                         Password
/me/devices                          Personal devices
```

### Overlay (token only)

```
/overlay/:token                      Public broadcast overlay
```

### Admin (super-admin)

```
/admin
/admin/tenants
/admin/tenants/:id
/admin/plans
/admin/audit
```

## 26.3 Layout structure

| Layout          | File                                                       | Composition                                                            | Guards                                 |
| --------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------- |
| PublicLayout    | `app/(public)/layout.tsx`                                  | Top nav, footer, language switcher                                     | none                                   |
| AuthLayout      | `app/(auth)/layout.tsx`                                    | Logo, language switcher, footer                                        | redirect if logged-in                  |
| DashboardLayout | `app/(dashboard)/layout.tsx`                               | Top nav (no sidebar — org picker only)                                 | RequireAuth                            |
| OrgScopedLayout | `app/(dashboard)/o/[orgSlug]/layout.tsx`                   | Sidebar + topbar + breadcrumbs + org switcher + Realtime + Sync banner | RequireAuth + RequireOrgMember         |
| ScorerLayout    | `app/(dashboard)/o/[orgSlug]/scoring/[matchId]/layout.tsx` | Full-bleed sticky header + content + bottom action bar                 | + RequirePermission `match.score:read` |
| OverlayLayout   | `app/overlay/[token]/layout.tsx`                           | No chrome, transparent body                                            | TokenGuard                             |
| AdminLayout     | `app/(admin)/admin/layout.tsx`                             | Admin sidebar + topbar                                                 | RequireSuperAdmin                      |
| EmbedLayout     | `components/embed/EmbedLayout.tsx`                         | Used by iframes (compact widgets)                                      | TokenGuard                             |

## 26.4 Feature module structure (recap from §2.3)

```
features/<module>/
├── components/        # Feature-only UI
├── hooks/             # useXyz hooks
├── services/          # API service (axios + zod)
├── store/             # Zustand slice
├── types/             # Zod schemas + TS types
├── utils/
└── index.ts
```

## 26.5 API service structure

Each `services/*.ts`:

- Pure functions (`getOne`, `list`, `create`, `update`, `remove`, custom).
- Accept typed input, return typed output (Zod-parsed).
- Throw normalised errors via `apiClient` interceptor.
- Never touch React.

`services/apiClient.ts`:

- Axios instance, base URL, JSON, timeout.
- Interceptors:
  - Attach `Authorization: Bearer …` and `X-Org-Id` (active org).
  - Attach `X-Device-Id`.
  - 401 → refresh once, then logout.
  - 403 → throw `ForbiddenError`.
  - 5xx → throw `ServerError` (with retry hint).
  - Network → throw `NetworkError`, push to sync queue if writable.

## 26.6 Hook structure

- **Query**: `useTournaments`, `useTournament`, `useMatch`, etc. wrap
  TanStack `useQuery`.
- **Mutation**: `useCreateMatch`, `useUpdateMatch` wrap `useMutation`
  with optimistic update + cache invalidation.
- **Realtime**: `useMatchEvents(matchId)` returns a live stream wired
  through the realtime store.
- **UI**: `useDevicePosture`, `useOnline`, `useCan`, `useUrlFilter`.

## 26.7 State management

| Concern       | Library                                                    |
| ------------- | ---------------------------------------------------------- |
| Server cache  | TanStack React Query                                       |
| Client UI     | Zustand                                                    |
| Form          | React Hook Form + Zod                                      |
| URL           | `useSearchParams` (router)                                 |
| Realtime      | Zustand slice fed by socket                                |
| Offline queue | IndexedDB (Dexie) + Web Worker                             |
| Auth tokens   | HttpOnly cookies (preferred) or localStorage with rotation |

## 26.8 Permission utility structure

```
lib/rbac/
├── permissions.ts        # constants
├── roles.ts              # default roles
├── Can.tsx               # <Can permission="...">
├── RequirePermission.tsx # route guard
├── RequireRole.tsx
├── RequireAuth.tsx
├── RequireOrgMember.tsx
├── usePermissions.ts     # selector
└── helpers.ts            # hasAny, hasAll, owns, etc.
```

## 26.9 Realtime service structure

```
features/websocket/
├── socketClient.ts       # io() factory, reconnect strategy
├── eventMap.ts           # typed event → handler map
├── store.ts              # Zustand slice
├── hooks/
│   ├── useRealtime.ts
│   ├── usePresence.ts
│   └── useChannel.ts
└── components/
    ├── ConnectionStatusPill.tsx
    └── PresenceAvatars.tsx
```

## 26.10 Sync service structure

```
features/sync/
├── queue.ts              # Enqueue, dequeue, mark synced/failed
├── conflictResolver.ts   # Strategies
├── sync.worker.ts        # Web Worker drain loop
├── db.ts                 # Dexie schema
├── hooks/
│   ├── useSyncStatus.ts
│   └── useConflicts.ts
└── components/
    ├── ConnectionBanner.tsx
    ├── SyncStatusPill.tsx
    ├── SyncQueueTable.tsx
    └── ConflictDiffViewer.tsx
```

## 26.11 Error boundary strategy

- **Global**: `app/error.tsx` (Next) or `<RootErrorBoundary>` (Vite)
  catches uncaught render errors with a friendly screen + "Reload".
- **Per-shell**: each layout has its own boundary so a dashboard error
  doesn't blank the public site.
- **Per-feature**: heavy features (scoring console, overlay editor, sync
  page) wrap in their own boundary with a "Recover" button that resets
  feature state.

## 26.12 Loading strategy

- **Skeletons** at the component level (not whole-page spinners) when
  > 150ms.
- **Streamed SSR / suspense** (Next) for above-the-fold content where
  available.
- **Pre-fetch** on hover for primary nav.
- **Idle pre-fetch** for likely next pages.

## 26.13 Cache strategy

- TanStack defaults: `staleTime: 30s`, `cacheTime: 5m`.
- Live entities (match, scoring) `staleTime: 0`, real-time push wins.
- Static-ish entities (sports master, plans) `staleTime: 1h`.
- Prefetch on hover for tables (visible rows).
- Invalidation rules per feature in `services/*.ts`.

## 26.14 Optimistic update strategy

- Use TanStack `onMutate` with rollback.
- Patterns:
  - **Score event**: insert into event log immediately, mark "pending"
    until server confirms.
  - **Substitution**: swap player tokens instantly; rollback to original
    with a toast on error.
  - **Lineup save**: commit locally + IDB, queue, server reconcile.
- For destructive actions (delete), prefer **server-confirmed** with a
  brief loading state to avoid optimistic surprises.
- All optimistic UIs surface a tiny "pending" indicator.
