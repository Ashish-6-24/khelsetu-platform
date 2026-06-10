# 35 — Hard Rules Checklist

The hard rules from §35 of the brief, mapped to where each is fulfilled
in the blueprint. Anything below that isn't ✅ must not ship.

| # | Hard rule | Status | Where |
|---|---|---|---|
| 1 | Do not miss any endpoint group | ✅ | Each module file lists its endpoints; coverage spans Public, Auth, Organizations, Sports, Tournaments, Teams, Players, Matches, Scoring (generic + cricket + football + basketball), Standings, Notifications, Overlays, Visualization, Analytics, Audit, RBAC, Billing, Sync. |
| 2 | Do not miss any nested subfeature | ✅ | Every screen / form / table covers nested concerns (e.g., fixtures within tournaments; officials within matches; member invitations within orgs; conflict resolution within sync; report builder within analytics). |
| 3 | Do not miss any sport-specific scoring flow | ✅ | `scoring/11-generic-scoring.md`, `scoring/12-cricket-scoring.md`, `scoring/13-football-scoring.md`, `scoring/14-basketball-scoring.md`. |
| 4 | Do not miss any public portal area | ✅ | `modules/05-public-portal.md` + `inventory/screens.md` §27.1 (17 public screens). |
| 5 | Do not miss any permissions or role-based restrictions | ✅ | `02-information-architecture.md` §2.12 + 2.13, `modules/21-rbac.md` (role matrix, permission matrix, route / component / button gates). |
| 6 | Do not miss analytics | ✅ | `modules/19-analytics.md` + `inventory/screens.md` §27.13. |
| 7 | Do not miss audit | ✅ | `modules/20-audit.md` + `inventory/screens.md` §27.14. |
| 8 | Do not miss overlays | ✅ | `modules/17-overlays.md` + `inventory/screens.md` §27.11. |
| 9 | Do not miss visualization | ✅ | `modules/18-visualization.md` + `inventory/screens.md` §27.12. |
| 10 | Do not miss notifications | ✅ | `modules/16-notifications.md` + `inventory/screens.md` §27.10. |
| 11 | Do not miss sync | ✅ | `modules/23-sync.md` + `02-information-architecture.md` §2.11 + `31-realtime.md`. |
| 12 | Do not miss RBAC user-role features | ✅ | `modules/21-rbac.md` (roles list, role create/edit, role matrix, user-roles editor, user-permissions view, role permissions matrix, role/permission catalogue, assign-role modal, delete-role with impact preview). |
| 13 | Do not miss public plans / quota / free match flow | ✅ | `modules/05-public-portal.md` (plans page, comparison, free match create, quota banner) + `modules/22-billing.md`. |
| 14 | Do not miss football-specific features (lineup, subs, periods, injury time, eligibility, corrections, replay verify, VAR, penalties) | ✅ | `scoring/13-football-scoring.md` (13.1–13.13). |
| 15 | Do not miss cricket-specific features (innings, deliveries, undo, replay, DRS, follow-on, super over) | ✅ | `scoring/12-cricket-scoring.md` (12.1–12.11). |
| 16 | Do not miss basketball-specific features (initialize, field goals, free throws, rebounds, assists, steals, turnovers, blocks, fouls, timeouts, periods, overtime, game clock, shot clock) | ✅ | `scoring/14-basketball-scoring.md` (14.1–14.10). |
| 17 | Do not miss empty/loading/error states | ✅ | `32-ux-states.md` defines canonical states + per-module matrix; each module file restates the relevant states. |
| 18 | Do not miss responsive behavior | ✅ | `25-responsive.md` (breakpoints, postures, shells, patterns, scorer, public, broadcast, weak-network). |
| 19 | Do not miss mobile behavior | ✅ | Every module has a "Mobile" section + `25-responsive.md`. |
| 20 | Do not miss realtime behavior | ✅ | `31-realtime.md` (channels, events, strategies, optimistic, reconnect, performance, security) + every module's "Realtime" section. |
| 21 | Do not miss permission behavior | ✅ | `modules/21-rbac.md` + `02-information-architecture.md` §2.9 (route, component, service guards); every module has a "Permissions" section. |

## Master self-test

Run this checklist before shipping any module:

### Routing & access
- [ ] Route registered in `26-routes-layouts.md` route map.
- [ ] Guards wired (`RequireAuth`, `RequireOrgMember`, `RequirePermission`,
      `RequireRole` as appropriate).
- [ ] 401 → login redirect; 403 → friendly forbidden; 404 → not-found.
- [ ] Org switcher does not list orgs the user cannot access.

### Data
- [ ] Each endpoint has a typed service function (Zod-parsed).
- [ ] Each list has a React Query hook with sensible cache strategy.
- [ ] Mutations use optimistic update where safe; rollback on error.
- [ ] Network errors push writes to sync queue when applicable.

### Realtime
- [ ] Component subscribes to relevant rooms on mount; unsubscribes on
      unmount.
- [ ] Updates use throttling for high-frequency events.
- [ ] Disconnect / reconnect UX present.

### Sync / offline
- [ ] Scorer-related mutations write to IDB queue first.
- [ ] Connection banner appears when offline.
- [ ] Conflicts route to resolver UI.

### States
- [ ] Loading: skeletons appear within 100ms.
- [ ] Empty: friendly with primary CTA.
- [ ] Error: inline + retry; per-feature boundary as fallback.
- [ ] Live, suspended, abandoned, postponed, cancelled, completed
      where relevant.
- [ ] Pending sync, conflict, stale where relevant.

### Forms
- [ ] Validation runs on blur and submit; messages are plain English.
- [ ] Required fields marked + `aria-required`.
- [ ] Submit disabled while invalid or in flight; spinner in button.
- [ ] Success toast + redirect / reset / inline confirmation.
- [ ] Destructive confirms (typed where high-impact).

### Tables
- [ ] Columns + sort + filter + search + pagination per
      `inventory/tables.md`.
- [ ] Loading / empty / error states.
- [ ] Mobile collapses to cards.
- [ ] Filters / sort / pagination sync to URL.

### Permissions
- [ ] `<Can>` wraps action buttons.
- [ ] Disabled buttons explain the missing permission in tooltip.
- [ ] Routes redirect or forbid based on missing permission/role.
- [ ] Sidebar hides items the user cannot access.

### Design system
- [ ] Uses semantic tokens; no raw hex.
- [ ] Spacing, type, radii from system.
- [ ] Icons from Lucide / bundled sports set; no emoji.
- [ ] Status badges include text, not colour-only.

### Responsive & touch
- [ ] Tested at 375 / 768 / 1024 / 1440 / 1920 widths.
- [ ] Touch targets ≥ 44 px; scoring ≥ 64 px.
- [ ] Bottom nav on mobile dashboard; sidebar collapses on tablet.
- [ ] Sticky score header + bottom action bar on scoring mobile.

### Accessibility
- [ ] Axe: 0 serious/critical issues.
- [ ] Keyboard-only walkthrough passes.
- [ ] Screen reader walkthrough passes (NVDA + VoiceOver).
- [ ] Focus visible everywhere.
- [ ] `prefers-reduced-motion` honoured.
- [ ] Contrast ≥ 4.5:1 body / ≥ 3:1 UI.

### Localisation
- [ ] All strings i18n-keyed (no hard-coded copy).
- [ ] Numbers, dates, currency locale-formatted.

### Audit & safety
- [ ] Mutating actions create audit events with before/after.
- [ ] Undo within grace window for safe destructive actions.
- [ ] Typed confirmation for high-impact destructive actions.
- [ ] No secrets logged; no PII to analytics without consent.

### Performance
- [ ] LCP / TTI within budget per surface (§25.11).
- [ ] Lazy-load below-the-fold.
- [ ] Bundle split per module.
- [ ] Lists virtualised when >100 rows.

### Testing
- [ ] Storybook stories for each major component.
- [ ] Unit tests for hooks, services, reducers.
- [ ] E2E test for the happy path (Playwright).
- [ ] Visual regression for primitives + key composites.

### Documentation
- [ ] Feature README under `features/<module>/README.md`.
- [ ] Component documented (props, slots, stories).
- [ ] Endpoint map updated in `services/<module>.ts` header.

---

If any cell above is unchecked, the feature is **not ready** for the
release. Per §34.6 the "Done" definition is a superset of this list.
