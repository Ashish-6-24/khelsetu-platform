# 34 — Final Output Summary

This section is the **executive index** that maps the 20 deliverables
from the brief to the documents that fulfil them, plus a development
roadmap, the API integration plan, and the explicit list of backend
needs the frontend has discovered.

## 34.1 Deliverable map

| #   | Deliverable                           | Location                                                             |
| --- | ------------------------------------- | -------------------------------------------------------------------- |
| 1   | Product overview                      | `01-product-overview.md`                                             |
| 2   | User personas                         | `01-product-overview.md` (§"Persona map")                            |
| 3   | Module breakdown                      | `02-information-architecture.md` (§2.2)                              |
| 4   | Full sitemap                          | `26-routes-layouts.md` (§26.2) + `inventory/screens.md`              |
| 5   | Route map                             | `26-routes-layouts.md` (§26.2)                                       |
| 6   | Navigation structure                  | `02-information-architecture.md` (§2.6) + `25-responsive.md` (§25.3) |
| 7   | Screen inventory                      | `inventory/screens.md`                                               |
| 8   | Component inventory                   | `inventory/components.md`                                            |
| 9   | Forms inventory                       | `inventory/forms.md`                                                 |
| 10  | Table inventory                       | `inventory/tables.md`                                                |
| 11  | Permission matrix                     | `modules/21-rbac.md` + `02-information-architecture.md` (§2.12)      |
| 12  | Real-time architecture                | `31-realtime.md`                                                     |
| 13  | Offline / sync architecture           | `modules/23-sync.md` + `02-information-architecture.md` (§2.11)      |
| 14  | Design system                         | `design-system/khelsetu/MASTER.md` + `24-design-system.md`           |
| 15  | Responsive strategy                   | `25-responsive.md`                                                   |
| 16  | Folder structure                      | `26-routes-layouts.md` (§26.1)                                       |
| 17  | API integration plan                  | §34.2 below                                                          |
| 18  | Missing frontend-facing backend needs | §34.3 below                                                          |
| 19  | UI/UX recommendations                 | §34.4 below                                                          |
| 20  | Development roadmap                   | §34.5 below                                                          |

## 34.2 API integration plan

### Service layer

- One `services/<module>.ts` per module mapping endpoints to typed
  functions.
- All requests via `services/apiClient.ts` (Axios) with interceptors
  for auth, org context, device id, 401 refresh, 403/5xx error
  normalisation, network errors → sync queue.
- Schemas defined with **Zod** and reused at the boundary (parse
  responses, infer types).
- Auto-generation: if/when an OpenAPI spec is available, generate
  baseline types into `types/api.d.ts` and wrap with Zod for runtime
  safety.

### Query layer

- TanStack React Query per module hook (`useTournaments`, `useMatch`,
  etc.).
- Defaults:
  - `staleTime` 30s; `cacheTime` 5m.
  - Live entities (match, scoring, sync): `staleTime` 0; rely on
    realtime push or short polling.
  - Static-ish entities (sports master, plans): `staleTime` 1h.
- Mutations use optimistic updates with rollback (see §31.5).
- Cache invalidation policies documented per module.

### Realtime layer

- One Socket.IO connection per session, per `features/websocket/`.
- Auto-subscribe / unsubscribe on route change.
- Event handlers update Zustand store; selectors keep components lean.

### Sync / offline layer

- IndexedDB via Dexie; tables: `matches`, `events`, `lineups`,
  `syncQueue`, `conflicts`, `device`.
- Web Worker drains queue with exponential backoff + idempotency keys
  per event.
- Conflict resolution UI per §23.3.

### Auth layer

- Tokens stored in HttpOnly cookies (preferred) or `localStorage` with
  rotation.
- `Authorization: Bearer <accessToken>` header + `X-Org-Id` for
  org-scoped calls + `X-Device-Id` for device tracking.
- Silent refresh on 401; full logout if refresh fails.

### Endpoint coverage (per module)

- See each `modules/*` or `scoring/*` file for the endpoints it
  covers. Every documented endpoint in the brief is mapped to at least
  one screen + service function.

### Error normalisation

- Server errors → `ApiError` with `status`, `code`, `message`,
  `requestId`.
- UI mapping: validation → field-level, business → inline banner,
  network → sync queue, server → retry CTA + support link.

## 34.3 Missing frontend-facing backend needs

The brief lists endpoints that are clearly required; this section
flags additional endpoints / capabilities the frontend will need.

| #   | Need                                                                                                                                          | Why                                                               |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| 1   | `GET /api/billing/subscription`, `POST /api/billing/subscription`, `DELETE /api/billing/subscription`                                         | Subscription dashboard, upgrade / cancel flow (§22)               |
| 2   | `GET /api/billing/usage`                                                                                                                      | Usage dashboard (§22.5)                                           |
| 3   | `GET /api/billing/invoices`, `GET /api/billing/invoices/{id}`                                                                                 | Invoice list + detail (§22.4 / 22.11)                             |
| 4   | `GET/POST/DELETE /api/billing/payment-methods[/{id}]`                                                                                         | Payment methods manager (§22.6)                                   |
| 5   | `POST /api/billing/checkout/session`, `POST /api/billing/portal/session`                                                                      | Stripe-style checkout + customer portal (§22.7)                   |
| 6   | `POST /api/auth/password/reset`, `POST /api/auth/password/reset/confirm`                                                                      | Password reset flow (§4 + `/reset`)                               |
| 7   | `POST /api/auth/verify-email`, `POST /api/auth/verify-email/confirm`                                                                          | Email verification for trust + register flow                      |
| 8   | `GET /api/notifications/settings`, `PUT /api/notifications/settings`                                                                          | Per-category notification preferences (§16.9)                     |
| 9   | `POST /api/notifications/push/subscribe`, `DELETE /api/notifications/push/subscribe`                                                          | Web Push registration                                             |
| 10  | `GET /api/public/matches?status=live` (or filter on existing)                                                                                 | Public live matches listing (§27.1)                               |
| 11  | `GET /api/search?q=&type=`                                                                                                                    | Global search across public + dashboard                           |
| 12  | `POST /api/uploads/sign` (S3-style presign)                                                                                                   | Crests / logos / template assets                                  |
| 13  | `GET /api/devices` (current user across orgs)                                                                                                 | `/me/devices`                                                     |
| 14  | `POST /api/auth/2fa/*` (future)                                                                                                               | 2FA / MFA                                                         |
| 15  | `WS` channel auth tokens (`POST /api/realtime/token`)                                                                                         | Socket.IO authentication separation from REST token               |
| 16  | `POST /api/admin/impersonate/{userId}` (super-admin)                                                                                          | Tenant support; audited                                           |
| 17  | `POST /api/admin/tenants/{id}/suspend` / `restore`                                                                                            | Tenant ops                                                        |
| 18  | `GET /api/health`, `GET /api/version`                                                                                                         | Footer / status indicator                                         |
| 19  | `GET /api/audit/export?...`                                                                                                                   | Forensic exports (§20)                                            |
| 20  | `POST /api/overlays/{id}/regenerate-token`                                                                                                    | Public token rotation (§17)                                       |
| 21  | `POST /api/visualization/annotations/bulk`                                                                                                    | Tactical board batch saves                                        |
| 22  | `GET /api/scoring/matches/{matchId}/snapshots`, `POST /api/scoring/snapshots/{id}/restore`                                                    | Snapshot browser (§11.5 — implied by `/snapshot` + `/replay`)     |
| 23  | `GET /api/tournaments/{id}/groups`, `POST /api/tournaments/{id}/groups`                                                                       | Multi-group standings UX (§15) — currently inferred from `format` |
| 24  | `GET /api/standings/tournament/{id}/snapshots/{snapshotId}`                                                                                   | Snapshot detail view                                              |
| 25  | Public overlay needs **read-only token bootstrap endpoint** to fetch initial state without auth: `GET /api/overlays/public/{token}/bootstrap` | Overlay rendering (§17.7)                                         |

> Backend team: please confirm or add these to the API surface before
> the milestones in §34.5 reach the affected features.

## 34.4 UI/UX recommendations

1. **Adopt a "scorer-first" design tenet**. The scoring console is the
   most demanding surface; make every visual decision pass the
   stadium-conditions test.
2. **Treat the public overlay as a product, not an afterthought**.
   Broadcast-grade visuals win deals; keep the overlay shell strictly
   chrome-free and test in OBS.
3. **Default to optimistic UI for safe mutations** and server-confirmed
   for destructive ones. Pair every optimistic write with a clear
   pending indicator and rollback story.
4. **Make permissions readable**. Wrap every action in `<Can>` and use
   tooltip-explained disabled states rather than hiding things —
   especially in the scoring console where invisible affordances confuse
   handoffs.
5. **Pre-build the offline story**. Don't bolt on sync after MVP. Wire
   the queue + worker in week 1 and grow with it.
6. **Invest in keyboard shortcuts for scoring**. Tablet scorers will
   build muscle memory; every minute saved per match × thousands of
   matches matters.
7. **Standardise empty / loading / error**. Use the canonical
   templates; do not let teams ship custom one-offs.
8. **Localise from day one**. Even if launch is English-only, every
   string must be keyed so adding Nepali later is a translation task,
   not a refactor.
9. **Build a `<ConnectionBanner>` early** and use it everywhere. Trust
   in offline / live data is a product-level promise.
10. **Treat audit as a feature**, not a compliance checkbox. Operators
    use it daily to settle disputes; design accordingly.
11. **Charts use the same colour scheme as scoring** so a chart of
    Team A vs Team B reads consistently with the score header.
12. **Adopt cursor-based pagination** for audit and sync — these grow
    fast and offset paging breaks.
13. **Ship a `<KbdShortcutOverlay>`** and Command Palette early to
    expose power users to the shortcuts you spent time on.
14. **Test scorer handoffs** end-to-end (two devices, mid-match) before
    GA. This is where bugs ruin trust.
15. **Animate sparingly** in the dashboard; the scorer needs static
    UIs to think.

## 34.5 Development roadmap

### Phase 0 — Foundations (Sprint 0–1)

- Repo, tooling, CI, Storybook, design tokens, shadcn primitives.
- `RootRouter`, shells (Public / Auth / Dashboard / Scorer / Overlay /
  Admin).
- `apiClient`, `queryClient`, `socketClient`, `i18n`, `<RBACProvider>`,
  `<DevicePostureProvider>`, `<OrganizationProvider>`.
- Sync skeleton (Dexie + Worker + Banner).

### Phase 1 — Auth + Organisations (Sprint 2)

- Auth flows, profile, change password, accept invitation.
- Org list, create, switch, settings, members, invitations.
- Forbidden / 404 / offline screens.

### Phase 2 — Sports, Tournaments, Teams, Players (Sprint 3–4)

- Sports master.
- Tournaments CRUD + wizard + status + team registration + fixtures.
- Teams CRUD + roster.
- Players CRUD + assignment + history.

### Phase 3 — Matches + Generic Scoring (Sprint 5–6)

- Match CRUD + officials + lifecycle.
- Match center read-only.
- Generic scoring console + event log + undo + snapshots + replay.

### Phase 4 — Sport-specific Scoring (Sprint 7–10)

- **Cricket** (Sprint 7): innings, ball-by-ball, undo, DRS, super
  over, follow-on, replay test.
- **Football** (Sprint 8–9): lineup, eligibility, periods, injury
  time, subs, corrections, VAR, penalties, replay verify, end match.
- **Basketball** (Sprint 10): initialize, scoring events, clocks,
  fouls, timeouts, periods, overtime, end game.

### Phase 5 — Standings, Notifications, Analytics (Sprint 11–12)

- Standings table + snapshots + recalc.
- Notifications bell + center + toasts + settings.
- Analytics dashboard, tournament / match / team / player analytics.
- Leaderboards.

### Phase 6 — Overlays + Visualization (Sprint 13–14)

- Templates editor.
- Overlay manager + public render + token rotation.
- Tactical board + formations + annotations.

### Phase 7 — Audit + RBAC + Billing + Sync (Sprint 15–16)

- Audit logs + entity history + user activity + live tail.
- RBAC: roles, permissions, user roles, role matrix.
- Billing: subscription, invoices, payment methods, upgrade / cancel,
  quota banners.
- Sync: queue page + conflict resolver + devices.

### Phase 8 — Public Portal Polish + Admin (Sprint 17–18)

- Public portal: landing, browse, live ticker, tournament page,
  match live page, plans page, free match flow.
- Admin: tenants list, plans, platform audit.

### Phase 9 — Hardening (Sprint 19+)

- Accessibility sweep + VPAT.
- Performance budgets enforcement.
- Localisation (Nepali, Hindi).
- E2E coverage for live scoring across two devices.
- Beta with pilot organisations.

### Gates between phases

- All forms have validation + states.
- All tables have loading / empty / error.
- All screens pass keyboard + screen reader review.
- All endpoints integrated have a Zod schema + a query/mutation hook.
- All realtime updates verified end-to-end.

## 34.6 Done definition (per feature)

A feature is "done" when:

- All screens in `inventory/screens.md` for the feature exist and are
  reachable.
- All forms specified in `inventory/forms.md` work and validate.
- All tables specified in `inventory/tables.md` render with all states.
- All endpoints have a service function + at least one consuming hook.
- All realtime events are subscribed and processed.
- All permissions are wired (route + component + button level).
- Mobile behaviour matches §25.
- Accessibility passes axe with no serious/critical issues.
- Stories exist for primary components.
- E2E test covers the happy path.
- Audit events visible after any mutation.
- Localised strings keyed.
