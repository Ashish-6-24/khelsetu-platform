# KhelSetu Full Restructure — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure KhelSetu repo so frontend code lives at repo root (no `khelsetu-frontend/` subfolder), with feature-based internal architecture per `khelsetu-frontend-structure.md`.

**Architecture:** 3-phase migration: (1) flatten repo by moving `khelsetu-frontend/` contents to root, (2) reorganize internal structure (routes→features, lib→shared, core→app), (3) update all imports and CI.

**Tech Stack:** React 19, TypeScript, Vite 8, Zustand, React Query, Tailwind CSS 4

---

## Current State

```
khelsetu/                    ← repo root
├── .github/                 ← workflows reference khelsetu-frontend/
├── khelsetu-frontend/       ← ALL frontend code lives here
│   ├── src/
│   │   ├── core/            → layouts, providers, router
│   │   ├── features/        → 26 feature modules (already good)
│   │   ├── lib/             → axios, env, logger, queryClient, etc.
│   │   ├── routes/          → 27 page directories (separate from features)
│   │   ├── shared/          → ui, hooks, utils, types
│   │   ├── state/           → Zustand stores
│   │   ├── tests/           → unit + integration tests
│   │   ├── theme/           → CSS files
│   │   └── workers/         → web workers
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts + configs
├── scripts/
├── docs/
└── README.md, LICENSE
```

## Target State

```
khelsetu/                    ← repo root = frontend root
├── .github/                 ← workflows updated (no khelsetu-frontend/ prefix)
├── src/
│   ├── app/                 ← was core/ (layouts, providers, router)
│   ├── features/            → 26 feature modules + route pages merged in
│   ├── shared/              → ui, hooks, utils, types + lib/ merged in
│   ├── state/               → Zustand stores
│   ├── tests/               → unit + integration tests
│   ├── theme/               → CSS files
│   └── workers/             → web workers
├── e2e/                     → Playwright tests (moved from src/tests/e2e if exists)
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── configs...
```

---

## Phase 1: Flatten Repo (move khelsetu-frontend/ to root)

### Task 1: Move all files from khelsetu-frontend/ to repo root

- [ ] **Step 1: Move frontend files to root**

```bash
cd /home/ashish-subedi/khelsetu
# Move all files except .git from khelsetu-frontend/ to root
rsync -a khelsetu-frontend/ . --exclude='.git'
rm -rf khelsetu-frontend/
```

- [ ] **Step 2: Verify no data lost**

```bash
# Should show src/, index.html, package.json, etc. at root
ls -la
ls src/
```

Expected: `src/`, `index.html`, `package.json`, `vite.config.ts`, `tsconfig.json` all at repo root.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "refactor: flatten khelsetu-frontend/ to repo root

Moved all frontend code from khelsetu-frontend/ subfolder to repo root.
This is the standard structure for a frontend-only repo."
```

---

### Task 2: Update CI workflows — remove khelsetu-frontend/ prefix

Files to modify:

- `.github/workflows/ci.yml` — `WORKING_DIR: khelsetu-frontend` → `WORKING_DIR: .` and all `working-directory: khelsetu-frontend` → `working-directory: .`
- `.github/workflows/security.yml` — same pattern
- `.github/workflows/ai-qa.yml` — same pattern
- `.github/workflows/review-gate.yml` — same pattern if present
- `.github/actions/setup-node/action.yml` — remove `cache-dependency-path: khelsetu-frontend/package-lock.json` and `working-directory: khelsetu-frontend`
- `.github/dependabot.yml` — `directory: '/khelsetu-frontend'` → `directory: '/'`

- [ ] **Step 1: Update ci.yml**

Read `.github/workflows/ci.yml` and replace all `khelsetu-frontend` references.

- [ ] **Step 2: Update other workflow files**

Same pattern for security.yml, ai-qa.yml, review-gate.yml.

- [ ] **Step 3: Update setup-node action**

Read `.github/actions/setup-node/action.yml` and remove khelsetu-frontend paths.

- [ ] **Step 4: Update dependabot**

Read `.github/dependabot.yml` and change directory.

- [ ] **Step 5: Verify build still works**

```bash
cd /home/ashish-subedi/khelsetu
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add .github/
git commit -m "ci: update workflow paths after flattening khelsetu-frontend/"
```

---

## Phase 2: Internal Reorganization

### Task 3: Rename core/ → app/

- [ ] **Step 1: Rename directory**

```bash
mv src/core src/app
```

- [ ] **Step 2: Update tsconfig paths**

In `tsconfig.json`, change `@core/*` alias to `@app/*`:

```json
"@app/*": ["src/app/*"]
```

Remove the old `@core/*` entry.

- [ ] **Step 3: Update vite.config.ts aliases**

In `vite.config.ts`, change:

```ts
'@core': path.resolve(src, './core'),
```

to:

```ts
'@app': path.resolve(src, './app'),
```

- [ ] **Step 4: Update all imports**

Find all files importing from `@core/`:

```bash
grep -rn "@core/" src/ --include="*.tsx" --include="*.ts" -l
```

For each file, replace `@core/` with `@app/`.

- [ ] **Step 5: Verify build**

```bash
npm run build && npx tsc --noEmit
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor: rename core/ to app/"
```

---

### Task 4: Merge lib/ into shared/

- [ ] **Step 1: Create shared/lib/ directory**

```bash
mkdir -p src/shared/lib
```

- [ ] **Step 2: Move lib files**

```bash
mv src/lib/* src/shared/lib/
rmdir src/lib
```

- [ ] **Step 3: Update tsconfig paths**

Add `@shared/lib/*` or keep using `@lib/*` → `src/shared/lib/*`:

```json
"@lib/*": ["src/shared/lib/*"]
```

- [ ] **Step 4: Update vite.config.ts**

Change:

```ts
'@lib': path.resolve(src, './lib'),
```

to:

```ts
'@lib': path.resolve(src, './shared/lib'),
```

- [ ] **Step 5: Update imports**

All `@lib/` imports should still work with the updated alias. Verify:

```bash
grep -rn "@lib/" src/ --include="*.tsx" --include="*.ts" | head -20
```

- [ ] **Step 6: Verify build**

```bash
npm run build && npx tsc --noEmit
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "refactor: merge lib/ into shared/lib/"
```

---

### Task 5: Move routes into feature modules

This is the largest phase. Each route page moves to its owning feature's `pages/` subfolder.

#### Route → Feature mapping:

| Route                                          | Target Feature                                              |
| ---------------------------------------------- | ----------------------------------------------------------- |
| `routes/dashboard/page.tsx`                    | `features/dashboard/pages/DashboardPage.tsx`                |
| `routes/scoring/[matchId]/page.tsx`            | `features/scoring/pages/ScoringPage.tsx`                    |
| `routes/tournaments/page.tsx`                  | `features/tournaments/pages/TournamentsPage.tsx`            |
| `routes/tournaments/[id]/page.tsx`             | `features/tournaments/pages/TournamentDetailPage.tsx`       |
| `routes/tournaments/[id]/bracket/page.tsx`     | `features/tournaments/pages/TournamentBracketPage.tsx`      |
| `routes/tournaments/[id]/edit/page.tsx`        | `features/tournaments/pages/TournamentEditPage.tsx`         |
| `routes/tournaments/create/page.tsx`           | `features/tournaments/pages/TournamentCreatePage.tsx`       |
| `routes/teams/page.tsx`                        | `features/teams/pages/TeamsPage.tsx`                        |
| `routes/teams/[id]/page.tsx`                   | `features/teams/pages/TeamDetailPage.tsx`                   |
| `routes/players/page.tsx`                      | `features/players/pages/PlayersPage.tsx`                    |
| `routes/players/[id]/page.tsx`                 | `features/players/pages/PlayerDetailPage.tsx`               |
| `routes/players/[id]/edit/page.tsx`            | `features/players/pages/PlayerEditPage.tsx`                 |
| `routes/standings/page.tsx`                    | `features/standings/pages/StandingsPage.tsx`                |
| `routes/venues/page.tsx`                       | `features/venues/pages/VenuesPage.tsx`                      |
| `routes/broadcast/page.tsx`                    | `features/broadcast/pages/BroadcastPage.tsx`                |
| `routes/overlays/page.tsx`                     | `features/overlays/pages/OverlaysPage.tsx`                  |
| `routes/overlays/scoreboard/page.tsx`          | `features/overlays/pages/ScoreboardPage.tsx`                |
| `routes/reports/page.tsx`                      | `features/reports/pages/ReportsPage.tsx`                    |
| `routes/matches/reports/[matchId]/page.tsx`    | `features/reports/pages/MatchReportPage.tsx`                |
| `routes/matches/statistics/[matchId]/page.tsx` | `features/statistics/pages/MatchStatisticsPage.tsx`         |
| `routes/matches/formation/[matchId]/page.tsx`  | `features/formation/pages/FormationPage.tsx`                |
| `routes/matches/events/[matchId]/page.tsx`     | `features/events/pages/MatchEventsPage.tsx`                 |
| `routes/news/page.tsx`                         | `features/news/pages/NewsPage.tsx`                          |
| `routes/news/[id]/page.tsx`                    | `features/news/pages/NewsArticlePage.tsx`                   |
| `routes/notifications/page.tsx`                | `features/notifications/pages/NotificationsPage.tsx`        |
| `routes/search/page.tsx`                       | `features/search/pages/SearchPage.tsx`                      |
| `routes/analytics/page.tsx`                    | `features/statistics/pages/AnalyticsPage.tsx`               |
| `routes/settings/page.tsx`                     | `features/auth/pages/SettingsPage.tsx`                      |
| `routes/schedule/page.tsx`                     | `features/tournaments/pages/SchedulePage.tsx`               |
| `routes/billing/page.tsx`                      | `features/billing/pages/BillingPage.tsx`                    |
| `routes/certificates/page.tsx`                 | `features/certificates/pages/CertificatesPage.tsx`          |
| `routes/data-import/page.tsx`                  | `features/offline-sync/pages/DataImportPage.tsx`            |
| `routes/i18n/page.tsx`                         | `features/i18n/pages/I18nPage.tsx`                          |
| `routes/accessibility/page.tsx`                | `features/accessibility/pages/AccessibilityPage.tsx`        |
| `routes/access-control/page.tsx`               | `features/access-control/pages/AccessControlPage.tsx`       |
| `routes/audit-logs/page.tsx`                   | `features/access-control/pages/AuditLogsPage.tsx`           |
| `routes/media-gallery/page.tsx`                | `features/media-gallery/pages/MediaGalleryPage.tsx`         |
| `routes/messages/page.tsx`                     | `features/notifications/pages/MessagesPage.tsx`             |
| `routes/offline-sync/page.tsx`                 | `features/offline-sync/pages/OfflineSyncPage.tsx`           |
| `routes/auth/login/page.tsx`                   | `features/auth/pages/LoginPage.tsx`                         |
| `routes/auth/register/page.tsx`                | `features/auth/pages/RegisterPage.tsx`                      |
| `routes/landing/page.tsx`                      | `features/dashboard/pages/LandingPage.tsx`                  |
| `routes/about/page.tsx`                        | `features/dashboard/pages/AboutPage.tsx`                    |
| `routes/contact/page.tsx`                      | `features/dashboard/pages/ContactPage.tsx`                  |
| `routes/not-found/page.tsx`                    | `shared/ui/NotFoundPage.tsx` (shared, not feature-specific) |

#### Landing page sections:

| Route                           | Target                                        |
| ------------------------------- | --------------------------------------------- |
| `routes/landing/sections/*.tsx` | `features/dashboard/components/landing/*.tsx` |

#### Steps per route:

- [ ] **Step 1: Create pages/ directory in target feature**

```bash
mkdir -p src/features/<feature>/pages
```

- [ ] **Step 2: Move the page file**

```bash
mv src/routes/<route>/page.tsx src/features/<feature>/pages/<PageName>.tsx
```

- [ ] **Step 3: Update the feature's barrel export**

Add the new page to `src/features/<feature>/index.ts`:

```ts
export { PageName } from './pages/PageName';
```

- [ ] **Step 4: Repeat for all routes**

Do this for every route in the mapping table above.

- [ ] **Step 5: Remove empty routes/ directory**

```bash
rm -rf src/routes
```

- [ ] **Step 6: Update router imports**

The router at `src/app/router/` imports pages. Update all imports from:

```ts
import { DashboardPage } from '@routes/dashboard/page';
```

to:

```ts
import { DashboardPage } from '@features/dashboard';
```

- [ ] **Step 7: Update tsconfig paths**

Remove `@routes/*` alias from tsconfig.json and vite.config.ts.

- [ ] **Step 8: Verify no remaining @routes/ imports**

```bash
grep -rn "@routes/" src/ --include="*.tsx" --include="*.ts"
```

- [ ] **Step 9: Verify build**

```bash
npm run build && npx tsc --noEmit && npm run lint
```

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "refactor: move all route pages into feature modules

Routes are now co-located with their owning features.
Removed @routes/ path alias."
```

---

## Phase 3: Final Cleanup

### Task 6: Update router to use new imports

- [ ] **Step 1: Read current router**

Read `src/app/router/index.tsx` and all route files.

- [ ] **Step 2: Update all page imports**

Change every import from `@routes/X/page` to `@features/Y` (barrel import).

- [ ] **Step 3: Update lazy imports**

```tsx
// Before
const DashboardPage = lazy(() => import('@routes/dashboard/page'));

// After
const DashboardPage = lazy(() => import('@features/dashboard/pages/DashboardPage'));
// OR use barrel if feature re-exports
```

- [ ] **Step 4: Verify build + tests**

```bash
npm run build && npx tsc --noEmit && npm run test:run
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "refactor: update router imports for new feature-based structure"
```

---

### Task 7: Update test imports

- [ ] **Step 1: Find tests referencing old paths**

```bash
grep -rn "@routes/" src/tests/ --include="*.ts" --include="*.tsx"
grep -rn "@core/" src/tests/ --include="*.ts" --include="*.tsx"
```

- [ ] **Step 2: Update test imports**

Replace `@routes/X` with `@features/Y` and `@core/` with `@app/`.

- [ ] **Step 3: Run tests**

```bash
npm run test:run
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: update test imports for new structure"
```

---

### Task 8: Update README and docs

- [ ] **Step 1: Update README.md project structure section**

Replace old structure diagram with new one.

- [ ] **Step 2: Delete khelsetu-frontend-structure.md** (its content is now the reality)

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "docs: update README structure, remove migration plan"
```

---

### Task 9: Final verification

- [ ] **Step 1: Full build**

```bash
npm run build
```

- [ ] **Step 2: Full lint + typecheck**

```bash
npm run lint && npx tsc --noEmit
```

- [ ] **Step 3: Full test suite**

```bash
npm run test:run
```

- [ ] **Step 4: Format**

```bash
npm run format
```

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final formatting after full restructure"
```

---

## Risk Mitigation

1. **Git history preservation**: Use `git mv` where possible to preserve file history
2. **Incremental commits**: Each phase is a separate commit so we can revert if needed
3. **Build verification**: Run build after each phase
4. **Test verification**: Run tests after each phase
5. **Import verification**: Grep for old paths after each phase to ensure nothing is missed

## Estimated Impact

- **Files moved**: ~300+ (all route pages, lib files)
- **Files modified**: ~200+ (imports updated)
- **Lines changed**: ~1000+ (import statements)
- **Time**: 30-60 minutes with parallel agents
