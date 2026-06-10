# 27 — Screen Inventory

Every screen below has: **route**, **role(s) required**, **purpose**,
**endpoint(s)**, **components**, **permissions**, **states (empty / loading
/ error)**, and **mobile behaviour**.

Conventions:
- `Pub` = public, no auth.
- `Auth` = requires auth.
- `Org` = requires org membership.
- `Sup` = requires super-admin.

---

## 27.1 Public portal

### Landing
- **Route**: `/`
- **Role**: Pub
- **Purpose**: Brand hero, value props, live ticker, plans CTA.
- **Endpoints**: `/api/public/tournaments`, `/api/public/plans`.
- **Components**: `<Hero>`, `<LiveTicker>`, `<FeatureGrid>`,
  `<PricingTeaser>`, `<Testimonials>`, `<Footer>`.
- **Permissions**: none.
- **Empty**: ticker shows "No live matches right now".
- **Loading**: skeleton hero + 3 ticker placeholders.
- **Error**: friendly retry banner.
- **Mobile**: stacked sections; sticky bottom CTA.

### Tournament browse
- **Route**: `/tournaments`
- **Role**: Pub
- **Purpose**: Discover tournaments (filter + search).
- **Endpoints**: `GET /api/public/tournaments`.
- **Components**: `<FilterBar>`, `<TournamentCard>` grid, `<Pagination>`.
- **Empty**: "No tournaments yet — check back soon."
- **Mobile**: filters → drawer; cards 1-up.

### Tournament detail (public)
- **Route**: `/tournaments/:id`
- **Role**: Pub
- **Endpoints**: `GET /api/public/tournaments/:id`.
- **Components**: `<TournamentHeader>`, `<TabsPublic>` (Fixtures /
  Standings / Teams / Players), `<MatchCard>` list.
- **States**: empty fixture list, loading skeletons, 404 / forbidden
  fallback.
- **Mobile**: tabs scroll horizontally.

### Live matches listing
- **Route**: `/matches?status=live`
- **Role**: Pub
- **Endpoints**: `GET /api/public/tournaments` (live filter) — or
  dedicated live endpoint when available.
- **Components**: `<LiveMatchCard>` grid, `<FilterBar>`.
- **Mobile**: 1-up cards with sticky filters trigger.

### Match details (public)
- **Route**: `/matches/:id`
- **Role**: Pub
- **Endpoints**: `GET /api/public/matches/:id/score`.
- **Components**: `<MatchHeaderPublic>`, `<LiveScoreboard>`,
  `<EventFeed>`, `<LineupView>`, `<StatsPanel>` (sport-specific).
- **States**: pre-match countdown, live (real-time), completed (summary),
  abandoned.
- **Mobile**: sticky score header.

### Public live score page
- **Route**: `/matches/:id/live`
- **Role**: Pub
- **Endpoints**: `GET /api/public/matches/:id/score` + socket.
- **Components**: `<BigScoreboard>`, `<EventTickerPublic>`,
  `<ShareButton>`.
- **Mobile**: full-screen, low chrome.

### Standings (public)
- **Route**: `/tournaments/:id/standings`
- **Endpoints**: `GET /api/standings/tournament/:tournamentId` (public
  surface).
- **Components**: `<StandingsTable>`.

### Fixtures (public)
- **Route**: `/tournaments/:id/fixtures`
- **Components**: `<FixtureList>`, `<BracketView>` (knockouts).

### Team page (public)
- **Route**: `/teams/:id`
- **Endpoints**: `GET /api/teams/:id` (public read), `/players`.
- **Components**: `<TeamHero>`, `<RosterTable>`, `<FormStrip>`.

### Player page (public)
- **Route**: `/players/:id`
- **Components**: `<PlayerHero>`, `<CareerStats>`, `<RecentMatches>`.

### Search
- **Route**: `/search?q=`
- **Components**: `<SearchInput>`, grouped result cards.

### Plans / pricing
- **Route**: `/plans`
- **Endpoints**: `GET /api/public/plans`.
- **Components**: `<PricingCard>` x N, `<ComparisonTable>`, `<FAQ>`.

### Plan comparison
- **Route**: `/plans/compare`
- **Components**: `<PlanComparisonMatrix>`.

### Free match create
- **Route**: `/matches/create`
- **Role**: Auth (public user).
- **Endpoints**: `GET /api/public/user/quota`,
  `POST /api/public/matches/create`.
- **Components**: `<QuotaBanner>`, `<MatchCreateForm>`,
  `<QuickStartGuide>`.
- **Empty**: quota exhausted → upgrade CTA.

### Quota indicator / usage banner
- **Surface**: dashboard top banner and `/matches/create`.
- **Components**: `<QuotaBanner>`.

---

## 27.2 Authentication

### Login
- **Route**: `/login`
- **Endpoints**: `POST /api/auth/login`.
- **Components**: `<LoginForm>`, `<OAuthButtons>` (if any).
- **States**: invalid creds, locked account, 2FA prompt (future).

### Register (dashboard)
- **Route**: `/register`
- **Endpoints**: `POST /api/auth/register`.

### Register (public user)
- **Route**: `/register/public`
- **Endpoints**: `POST /api/public/users/register`.

### Profile
- **Route**: `/me`
- **Endpoints**: `GET /api/auth/me`, `PUT /api/auth/profile`.

### Edit profile
- **Route**: `/me/edit`
- **Form**: `<ProfileForm>`.

### Change password
- **Route**: `/me/security`
- **Endpoints**: `POST /api/auth/change-password`.

### Logout
- **Behaviour**: clicking Logout in topbar → POST `/api/auth/logout` →
  redirect `/login`.

### Token refresh handling
- **Surface**: silent in background via `POST /api/auth/refresh`. UX:
  no spinner unless renewal fails.

### Session expiry UX
- **Surface**: modal "Your session expired — sign in to continue", deep
  link to return after login.

### Unauthorized state
- **Surface**: `/login?next=...`.

### Forbidden state
- **Surface**: `<ForbiddenScreen>` with "Request access".

### Accept invitation
- **Route**: `/accept/:token`
- **Endpoints**: `POST /api/organizations/invitations/:token/accept`.

---

## 27.3 Organizations

### Org list
- **Route**: `/organizations`
- **Endpoints**: `GET /api/organizations`.
- **Components**: `<OrgCard>` grid, `<NewOrgButton>`.

### Create organization
- **Route**: `/organizations/new`
- **Endpoints**: `POST /api/organizations`.
- **Form**: `<OrgForm>`.

### Organization home
- **Route**: `/o/:orgSlug`
- **Components**: `<OrgKPIStrip>`, `<LiveMatchesWidget>`,
  `<UpcomingMatchesWidget>`, `<QuotaCard>`, `<RecentActivity>`.

### Organization detail / settings
- **Route**: `/o/:orgSlug/settings/general`
- **Endpoints**: `GET/PUT /api/organizations/:id`.

### Members
- **Route**: `/o/:orgSlug/settings/members`
- **Endpoints**: `GET /api/organizations/:id/members`,
  `POST /api/organizations/:id/invitations`,
  `DELETE /api/organizations/:id/members/:userId`.
- **Components**: `<MembersTable>`, `<InviteModal>`,
  `<RemoveMemberConfirm>`.

### Invite member
- **Surface**: modal from Members page.

### Organization switcher
- **Component**: `<OrgSwitcher>` in topbar; lists user's orgs.

### Access denied
- **Component**: `<ForbiddenScreen>`.

### Empty org state
- **Component**: `<EmptyOrgState>` with "Create org" CTA.

---

## 27.4 Sports master

### Sports list
- **Route**: `/o/:orgSlug/sports`
- **Endpoints**: `GET /api/sports`.

### Create / edit sport
- **Route**: `/o/:orgSlug/sports/new`, `/o/:orgSlug/sports/:id`
- **Endpoints**: `POST`, `PUT /api/sports`.

### Sport detail
- **Route**: `/o/:orgSlug/sports/:id`
- **Endpoints**: `GET /api/sports/:id`.

---

## 27.5 Tournaments

### Tournament list
- **Route**: `/o/:orgSlug/tournaments`
- **Endpoints**: `GET /api/tournaments`.

### Tournament dashboard / detail
- **Route**: `/o/:orgSlug/tournaments/:id`
- **Endpoints**: `GET /api/tournaments/:id`.

### Tournament create wizard
- **Route**: `/o/:orgSlug/tournaments/new`
- **Endpoints**: `POST /api/tournaments`.

### Tournament edit
- **Route**: `/o/:orgSlug/tournaments/:id/edit`
- **Endpoints**: `PUT /api/tournaments/:id`.

### Tournament status control
- **Surface**: dropdown on detail page;
  `POST /api/tournaments/:id/status`.

### Team registration flow
- **Route**: `/o/:orgSlug/tournaments/:id/teams`
- **Endpoints**: `GET/POST/DELETE /api/tournaments/:id/teams[/:teamId]`.

### Fixture generator
- **Route**: `/o/:orgSlug/tournaments/:id/fixtures`
- **Endpoints**: `POST/GET /api/tournaments/:id/fixtures`.

### Fixture viewer
- **Components**: `<BracketView>`, `<LeagueScheduleView>`.

---

## 27.6 Teams & Players

### Team list / detail / new / edit
- `/o/:orgSlug/teams`, `/o/:orgSlug/teams/:id`
- Endpoints: `/api/teams*`.

### Team players
- `/o/:orgSlug/teams/:id` (Roster tab)
- Endpoint: `/api/teams/:id/players`.

### Player list / detail / new / edit
- `/o/:orgSlug/players`, `/o/:orgSlug/players/:id`
- Endpoints: `/api/players*`.

### Player team assignment
- Surface: modal on player detail; `POST/DELETE
  /api/players/:id/teams[/:teamId]`.

### Player team history
- Surface: tab on player detail; `GET /api/players/:id/teams`.

---

## 27.7 Matches

### Match list / new / detail / edit
- `/o/:orgSlug/matches`, `/o/:orgSlug/matches/new`,
  `/o/:orgSlug/matches/:id`.

### Match center
- `/o/:orgSlug/matches/:id/center`.

### Match scheduling (calendar)
- `/o/:orgSlug/schedule`.

### Match lifecycle controls
- Surface: dropdown on match header; endpoints
  `/api/matches/:id/{start,end,suspend,resume,postpone,abandon}`.

### Officials management
- Modal on match detail; `/api/matches/:id/officials*`.

### Period transition / with-period view / timeline
- Endpoints: `/api/matches/:id/period/transition`,
  `/api/matches/:id/with-period`.

---

## 27.8 Scoring

### Generic scoring console
- `/o/:orgSlug/scoring/:matchId` — sport routed by match.sport.

### Cricket scoring console + sub-screens
- Innings start, ball-by-ball, DRS, super-over, follow-on, replay-test.

### Football scoring console + sub-screens
- Lineup, eligibility, VAR, penalties, corrections, period control.

### Basketball scoring console + sub-screens
- State, stats, fouls/:teamId, clocks.

(Each detail screen is fully specified in §11–14.)

---

## 27.9 Standings

### League / tournament standings
- `/o/:orgSlug/standings/:tournamentId`.

### Snapshot history
- `/o/:orgSlug/standings/:tournamentId/snapshots`.

### Recalculate / snapshot CTAs
- Inline buttons on standings header.

---

## 27.10 Notifications

### Notification dropdown (from bell)
- Surface: in `<TopBar>`.

### Notification center
- `/o/:orgSlug/notifications` (or `/notifications` for personal).

### Notification settings
- `/me/notifications`.

---

## 27.11 Overlays

### Templates manager
- `/o/:orgSlug/overlays/templates`, `/.../templates/:id`.

### Live overlays manager
- `/o/:orgSlug/overlays`.

### Create overlay (wizard)
- `/o/:orgSlug/overlays/new`.

### Overlay preview
- Modal.

### Public overlay render
- `/overlay/:token` — `OverlayLayout`, no chrome.

---

## 27.12 Visualization

### Formation builder
- `/o/:orgSlug/visualization/formations/:matchId/:teamId`.

### Tactical board
- `/o/:orgSlug/visualization/board/:matchId`.

### Match visualization (read-only)
- `/o/:orgSlug/matches/:id/visualization`.

---

## 27.13 Analytics

### Dashboard
- `/o/:orgSlug/analytics`.

### Tournament / match / team / player analytics
- `/o/:orgSlug/analytics/{tournaments,matches,teams,players}/:id`.

### Custom report builder
- `/o/:orgSlug/analytics/reports/custom`.

### Leaderboards
- `/o/:orgSlug/analytics/leaderboards`.

---

## 27.14 Audit

### Audit logs
- `/o/:orgSlug/audit`.

### Entity history
- `/o/:orgSlug/audit/entity/:type/:id`.

### User activity
- `/o/:orgSlug/audit/user/:userId`.

---

## 27.15 RBAC

### Roles list / create / edit / matrix
- `/o/:orgSlug/settings/roles[...]`.

### Permissions catalogue
- `/o/:orgSlug/settings/permissions`.

### User roles / permissions
- `/o/:orgSlug/settings/members/:userId/{roles,permissions}`.

---

## 27.16 Billing

### Subscription dashboard
- `/o/:orgSlug/billing`.

### Invoices / invoice detail / usage / payment methods
- `/o/:orgSlug/billing/{invoices,usage,payment-methods}`.

### Upgrade / downgrade / cancel wizards
- `/o/:orgSlug/billing/{upgrade,cancel}`.

---

## 27.17 Sync

### Sync queue
- `/o/:orgSlug/sync`.

### Conflicts
- `/o/:orgSlug/sync/conflicts`.

### Devices
- `/o/:orgSlug/sync/devices`.

---

## 27.18 Profile / personal

### Profile, security, devices, notifications
- `/me`, `/me/security`, `/me/devices`, `/me/notifications`.

---

## 27.19 Admin (super)

### Tenants list, tenant detail, plans, platform audit
- `/admin/tenants`, `/admin/tenants/:id`, `/admin/plans`,
  `/admin/audit`.

---

## 27.20 Error / system pages

- `404 Not Found`
- `403 Forbidden`
- `500 Internal Error`
- `Offline`
- `Maintenance`

Each page has:
- Illustration, headline, helper, primary CTA back to a safe place.
- Distinct routes for super-admin emergency operations.

---

## Aggregate counts

| Category | Screens |
|---|---|
| Public portal | 17 |
| Auth | 8 |
| Organizations | 8 |
| Sports | 4 |
| Tournaments | 9 |
| Teams & Players | 10 |
| Matches | 8 |
| Scoring (incl. sport sub-screens) | 22 |
| Standings | 3 |
| Notifications | 3 |
| Overlays | 6 |
| Visualization | 3 |
| Analytics | 9 |
| Audit | 4 |
| RBAC | 7 |
| Billing | 9 |
| Sync | 3 |
| Personal | 4 |
| Admin | 4 |
| System | 5 |
| **Total** | **146** |
