===========================================
KHELSETU FOLDER STRUCTURE AUDIT
Backend Developer Guide (2026-07-01)
===========================================

# PURPOSE
This guide clarifies the KhelSetu project structure for backend developers integrating with the frontend. It identifies organizational patterns, duplication issues, and recommended fixes to eliminate confusion.

---

# ROOT DIRECTORY OVERVIEW

```
/home/ashish-subedi/khelsetu/
├── khelsetu-frontend/          [MAIN APPLICATION - React/TypeScript]
├── design-system/              [DESIGN DOCUMENTATION & TOKENS]
├── docs/                        [PROJECT DOCUMENTATION]
├── graphify-out/               [CODE KNOWLEDGE GRAPH - AUTO-GENERATED]
├── .opencode/                  [OPENCODE CONFIGURATION]
├── .superpowers/               [SUPERPOWERS CACHE - DO NOT EDIT]
└── [.git, .gitignore, etc.]
```

---

# SECTION 1: MAIN APPLICATION (khelsetu-frontend/)

## Location: `/khelsetu-frontend/`

The frontend application is a React 19 + TypeScript + Vite SPA with 28 feature modules.

### 1.1 Source Code Structure (`src/`)

```
src/
├── app/                    [Application setup & routing]
│   ├── layouts/
│   │   ├── AuthLayout.tsx          [Unauthenticated pages]
│   │   ├── DashboardLayout.tsx      [Authenticated pages]
│   │   ├── LandingLayout.tsx        [Public landing page]
│   │   └── index.ts                [Layout exports]
│   ├── providers/
│   │   └── [React providers & context setup]
│   └── router/
│       └── [Route configuration]
│
├── features/               [28 FEATURE MODULES - DOMAIN-DRIVEN]
│   └── [See Section 1.2 below]
│
├── pages/                  [PAGE COMPONENTS - Route-level UI]
│   ├── auth/
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   ├── tournaments/
│   ├── scoring/[matchId]/
│   ├── standings/
│   ├── live-broadcast/
│   ├── overlays/scoreboard/[matchId]/
│   └── [+20 more route pages]
│
├── shared/                 [SHARED UTILITIES & COMPONENTS]
│   ├── components/
│   │   ├── ui/             [Shadcn UI primitives]
│   │   ├── forms/          [Form wrappers]
│   │   ├── tables/         [Table components]
│   │   ├── charts/         [Chart components]
│   │   ├── navigation/     [Nav/header components]
│   │   ├── animations/     [Framer Motion animations]
│   │   ├── performance/    [Code splitting, lazy loading]
│   │   ├── error/          [Error boundaries, 404, 500]
│   │   └── theme-toggle/   [Dark mode toggle]
│   ├── constants/          [App-wide enums, constants]
│   ├── hooks/              [Custom React hooks]
│   ├── types/              [Shared TypeScript types]
│   └── utils/              [Utility functions]
│
├── lib/                    [LIBRARY SETUP]
│   ├── axios.ts            [HTTP client with interceptors]
│   ├── websocket-client.ts [WebSocket initialization]
│   ├── queryClient.ts      [TanStack Query setup]
│   └── storage.ts          [LocalStorage wrapper with type safety]
│
├── store/                  [GLOBAL STATE - Zustand]
│   ├── authStore.ts        [Auth state: user, token, permissions]
│   ├── uiStore.ts          [UI state: theme, modals, sidebar]
│   ├── tournamentStore.ts  [Tournament filters & UI state]
│   └── scoringStore.ts     [Live scoring real-time state]
│
├── styles/                 [GLOBAL STYLES]
│   ├── globals.css         [CSS variables, base styles, dark mode]
│   └── [theme-specific files]
│
├── assets/                 [STATIC ASSETS]
│   ├── icons/              [SVG component icons]
│   ├── illustrations/      [Illustration SVGs]
│   ├── images/             [PNG/JPG images]
│   └── videos/             [MP4/WebM videos]
│
├── tests/                  [CENTRALIZED TEST SUITE]
│   ├── unit/               [Component & utility tests (36+ files)]
│   ├── integration/        [Feature integration tests]
│   ├── mocks/              [Mock data & MSW handlers]
│   └── setup.ts            [Vitest setup]
│
├── stories/                [STORYBOOK COMPONENTS]
│   └── [Component stories for visual testing]
│
├── workers/                [WEB WORKERS]
│   └── [Background processing tasks]
│
├── App.tsx                 [Root component]
└── main.tsx                [Entry point]
```

### 1.2 Feature Modules (28 domains)

**Pattern:** Each feature follows this structure:
```
features/[feature-name]/
├── components/             [Feature UI components]
├── hooks/                  [Custom hooks specific to feature]
├── services/               [API calls, business logic]
├── store/                  [Feature-level Zustand store (optional)]
├── types/                  [TypeScript types for this feature]
├── utils/                  [Utility functions]
└── index.ts                [Public exports]
```

**28 Features:**

| Feature | Purpose | Has Store? |
|---------|---------|-----------|
| accessibility | WCAG compliance, a11y utilities | No |
| auth | Authentication (login/register) | No |
| billing | Payments, subscriptions | Yes |
| bracket-advanced | Tournament bracket logic | No |
| certificates | Achievement certificates | No |
| dashboard | Admin/user dashboard | No |
| formation | Player lineup/formation UI | No |
| i18n | Internationalization (EN, NP, HI) | No |
| live-broadcast | Live stream overlays | No |
| live-events | Real-time event updates | No |
| live-scoring | Real-time score updates | No |
| match-reports | Match analysis & reports | No |
| match-statistics | Stats aggregation | No |
| media-gallery | Image/video uploads | No |
| news | News articles/feeds | No |
| notifications | In-app & push notifications | Yes |
| offline-sync | Offline-first data sync | No |
| overlays | Broadcast graphics overlays | No |
| reports | Analytics reports | No |
| scoring | Sport-specific scoring | Yes |
| search | Global search functionality | No |
| standings | Tournament rankings | Yes |
| teams | Team management | No |
| tournaments | Tournament lifecycle | Yes |
| user-roles | RBAC role management | No |
| websocket | WebSocket real-time connection | Yes |
| (2 reserved) | - | - |

### 1.3 Incomplete Features (Pattern Violations)

**These features are missing subdirectories:**

| Feature | Missing |
|---------|---------|
| accessibility | services, types |
| auth | types, utils, hooks |
| dashboard | hooks, services, types, utils |
| search | services, utils |
| teams | hooks, utils |
| user-roles | services, utils |

**Action Required:** Standardize all features to have all 6 directories.

### 1.4 Testing Structure

```
tests/
├── unit/                   [Component & utility tests]
│   ├── [36 test files]
│   ├── Card.test.tsx
│   ├── Button.test.tsx
│   ├── i18n.test.ts
│   └── ... (performance, accessibility, etc.)
│
├── integration/            [Feature flow tests]
│   ├── login.test.tsx
│   └── register.test.tsx
│
├── mocks/
│   ├── data.ts             [Mock data for tests]
│   └── [MSW handlers]
│
└── setup.ts                [Vitest configuration]
```

### 1.5 Configuration Files (Root Level)

```
khelsetu-frontend/
├── vite.config.ts          [Vite build & dev server]
├── vitest.config.ts        [Vitest test runner]
├── playwright.config.ts    [Playwright E2E tests]
├── tsconfig.json           [TypeScript configuration]
├── .eslintrc.json          [ESLint linting rules]
├── .prettierrc.json        [Code formatting rules]
├── .commitlintrc.json      [Commit message linting]
├── package.json            [Dependencies & npm scripts]
├── package-lock.json       [Locked dependency versions]
└── README.md               [Frontend documentation]
```

### 1.6 Other Directories

```
khelsetu-frontend/
├── e2e/                    [End-to-end tests]
│   ├── auth.spec.ts
│   └── landing.spec.ts
│
├── public/                 [Static files - served at root]
│   ├── icons/              [Favicon, PWA icons]
│   └── manifest.json       [PWA manifest]
│
├── .storybook/             [Storybook configuration]
├── .husky/                 [Git hooks: pre-commit, pre-push]
└── .vscode/                [VS Code workspace settings]
```

---

# SECTION 2: DOCUMENTATION (docs/)

## Location: `/docs/`

Multiple documentation sources exist. **This creates confusion for backend developers.**

```
docs/
├── ui-ux/                  [UI/UX SPECIFICATIONS]
│   ├── 01-product-overview.md
│   ├── 02-information-architecture.md
│   ├── 24-design-system.md
│   ├── 25-responsive.md
│   ├── 26-routes-layouts.md
│   ├── modules/            [Feature specs by domain]
│   │   ├── 04-auth.md
│   │   ├── 06-sports.md
│   │   ├── 07-tournaments.md
│   │   └── ... (19 files)
│   ├── scoring/            [Sport-specific scoring specs]
│   │   ├── 11-generic-scoring.md
│   │   ├── 12-cricket-scoring.md
│   │   ├── 13-football-scoring.md
│   │   └── 14-basketball-scoring.md
│   ├── inventory/          [Component inventory]
│   │   ├── components.md
│   │   ├── forms.md
│   │   ├── screens.md
│   │   └── tables.md
│   └── research/
│
├── superpowers/            [IMPLEMENTATION PLANS & SPECS]
│   ├── plans/              [Project plans - DATED]
│   │   ├── 2026-06-19-enterprise-features.md
│   │   ├── 2026-06-25-design-token-system.md
│   │   └── 2026-07-01-ui-css-variables-consistency.md
│   └── specs/              [Technical specs - DATED]
│       ├── 2026-06-10-khelsetu-frontend-redesign-design.md
│       ├── 2026-06-24-ci-cd-improvements-design.md
│       └── 2026-06-25-design-token-system.md
│
├── graphify-out/           [Code graph analysis]
│
├── API_INTEGRATION_GUIDE.md        [Backend API integration]
├── ARCHITECTURE.md                 [System architecture]
├── DEPLOYMENT.md                   [Deployment procedures]
├── DESIGN_SYSTEM.md                [Design system guide]
├── GETTING_STARTED.md              [Developer onboarding]
├── PROJECT_STRUCTURE.md            [Folder structure]
└── README.md                       [Documentation index]
```

---

# SECTION 3: DESIGN SYSTEM (design-system/)

## Location: `/design-system/`

```
design-system/
├── khelsetu/               [Design system components]
│   ├── DESIGN-BRIEF.md     [Design philosophy & principles]
│   ├── MASTER.md           [Master design tokens]
│   └── pages/              [Page design specifications]
│       ├── auth.md
│       ├── dashboard.md
│       ├── landing.md
│       ├── live-broadcast-overlay.md
│       ├── scoring.md
│       └── tournament-bracket.md
└── README.md               [Design system index]
```

---

# SECTION 4: AUTO-GENERATED/CACHE (DO NOT EDIT)

## graphify-out/ - Code Knowledge Graph

```
graphify-out/
├── graph.json              [AST & semantic relationships]
├── GRAPH_REPORT.md         [Analysis report]
├── cost.json               [Token cost metrics]
├── manifest.json
├── .graphify_labels.json
└── cache/
    ├── ast/                [AST cache files (13 hashes)]
    └── semantic/           [Semantic analysis cache]
```

**Note:** This is auto-generated by graphify tool. Do not edit manually.

## .opencode/ - OpenCode Configuration

```
.opencode/
└── skills/
    ├── ui-ux-pro-max/      [Custom UI/UX design skill]
    └── taste-skill/        [Project preferences]
```

## .superpowers/ - Superpowers Cache

```
.superpowers/
└── brainstorm/             [Brainstorm session cache]
```

**Note:** Runtime cache - do not edit.

---

# SECTION 5: DUPLICATION ANALYSIS

## 5.1 Critical Duplication Issues

### Issue 1: Documentation Scattered Across Multiple Locations

**Problem:** Design specifications exist in THREE places:
- `docs/ui-ux/24-design-system.md`
- `docs/superpowers/specs/2026-06-25-design-token-system.md`
- `design-system/khelsetu/MASTER.md`

**Impact:** Backend developers confused about source of truth.

---

### Issue 2: Feature Module Pattern Violations

**Problem:** 6 of 28 features don't follow standard structure:

```
Missing subdirectories:
✗ accessibility - Missing: services, types
✗ auth - Missing: types, utils, hooks
✗ dashboard - Missing: hooks, services, types, utils
✗ search - Missing: services, utils
✗ teams - Missing: hooks, utils
✗ user-roles - Missing: services, utils
```

**Impact:** Backend developers must search multiple places. Inconsistent patterns break conventions.

---

### Issue 3: Store State Architecture Unclear

**Problem:** Both global stores (`src/store/`) and feature-level stores exist with potential overlap:

```
Global stores:
- authStore (user, token)
- uiStore (theme, modals)
- tournamentStore (filters)
- scoringStore (live scores)

Feature stores also exist:
- billing/store/
- notifications/store/
- standings/store/
- tournaments/store/ ← CONFLICTS WITH GLOBAL tournamentStore
- websocket/store/
```

**Impact:** Unclear which store to modify. Risk of state duplication.

---

### Issue 4: Asset Organization Ambiguity

**Problem:** Two icon directories with unclear purpose:
```
public/icons/        [PWA icons or component icons?]
src/assets/icons/    [Component SVA icons or PWA icons?]
```

**Impact:** Unclear where to place new icons. Risk of duplication.

---

### Issue 5: Test Organization Strategy Unclear

**Problem:** Centralized tests in `src/tests/` but no documentation on whether co-located tests are allowed.

**Impact:** Inconsistent test placement across features.

---

### Issue 6: Configuration File Sprawl

**Problem:** 8 configuration files at root with no clear organization.

**Impact:** Hard to maintain, potential for conflicts.

---


# SECTION 6: RECOMMENDED FIXES

## 6.1 Fix #1: Standardize Feature Module Patterns

### Current State (BROKEN)
6 features missing subdirectories:
- auth, dashboard, accessibility, search, teams, user-roles

### Target State (FIXED)
All 28 features follow same structure:
```
features/[name]/
  ├── components/
  ├── hooks/
  ├── services/
  ├── types/
  ├── utils/
  └── index.ts
```

### Implementation Steps

1. Create missing directories:
```bash
cd khelsetu-frontend/src/features/auth
mkdir -p hooks services types utils
touch hooks/index.ts services/index.ts types/index.ts utils/index.ts
```

2. Move existing code to correct directories:
   - Auth utility functions → utils/
   - Auth API calls → services/
   - Auth types → types/
   - Auth hooks → hooks/

3. Create barrel exports in each index.ts:
```typescript
// features/auth/index.ts
export * from './components'
export * from './hooks'
export * from './services'
export * from './types'
export * from './utils'
```

### Expected Outcome
✓ All features consistent
✓ Backend developers know where to find/add API integration code
✓ Easy to onboard new team members

---

## 6.2 Fix #2: Document Store Architecture

### Create File: `docs/STATE_MANAGEMENT.md`

Content should clarify:

**Global Store (src/store/)** - App-wide state:
- authStore: User, token, permissions
- uiStore: Theme, modals, sidebar
- tournamentStore: Filters, current selection
- scoringStore: Live scores, real-time state

**Feature Store (src/features/*/store/)** - Domain-specific:
- billing/store: Subscription plans
- notifications/store: Notification queue
- websocket/store: Connection status

**Rule: Global > Feature > React Query > Local**
1. Global store if app-wide needed
2. Feature store if domain-specific
3. React Query if async API data
4. useState if component-only

### Action
This document prevents confusion about state placement.

---

## 6.3 Fix #3: Consolidate Documentation

### Current (BROKEN)
```
docs/ui-ux/24-design-system.md
docs/superpowers/specs/2026-06-25-design-token-system.md
design-system/khelsetu/MASTER.md
[3 conflicting sources]
```

### Target (FIXED)
```
docs/
├── design/
│   ├── TOKENS.md          [Design tokens & CSS variables]
│   ├── COLORS.md          [Color palette]
│   ├── TYPOGRAPHY.md      [Font scales]
│   └── pages/             [Page layouts]
│
├── features/
│   ├── auth.md
│   ├── scoring.md
│   └── ...
│
├── api/
│   ├── endpoints.md
│   ├── authentication.md
│   └── real-time.md
│
└── architecture/
    ├── overview.md
    ├── state-management.md
    └── security.md
```

### Steps
1. Create new doc directories
2. Copy design-system/khelsetu/MASTER.md → docs/design/TOKENS.md
3. Archive old docs/ui-ux/ and docs/superpowers/
4. Add redirects to old locations

### Expected Outcome
✓ Single source of truth
✓ Backend developers know exactly where to find specs

---

## 6.4 Fix #4: Clarify Asset Organization

### Target
```
public/icons/          [PWA & Favicon ONLY]
  ├── favicon.ico
  ├── apple-touch-icon.png
  ├── icon-192x192.png
  └── icon-512x512.png

src/assets/icons/      [Component SVG icons]
  ├── ChevronDown.svg
  ├── Menu.svg
  └── ...
```

### Steps
1. Audit public/icons/ - move component icons to src/assets/icons/
2. Keep only PWA manifest files in public/
3. Document in docs/ASSETS.md

### Expected Outcome
✓ Clear separation of concerns
✓ No duplication
✓ Organized imports

---

## 6.5 Fix #5: Test Organization Policy

### Decision
**CENTRALIZED TESTING ONLY** - No co-located tests.

All tests go in: `src/tests/`
```
src/tests/
├── unit/          [Component & utility tests]
├── integration/   [Feature flow tests]
└── mocks/         [Mock data & MSW handlers]
```

### Action
1. Document in docs/TESTING.md
2. Add ESLint rule to prevent .test.ts files outside src/tests/
3. Update contributing guide

### Expected Outcome
✓ Consistent test placement
✓ Easy to locate tests
✓ Reduced maintenance burden

---

## 6.6 Fix #6: Organize Configuration Files (Optional)

### Current
8 config files scattered at root.

### Option A: Keep as-is (Lowest effort)
Keep current structure. Update docs/CONFIGURATION.md to explain each file.

### Option B: Organize into ./config/ (Better UX)
```
config/
├── vite.config.ts
├── vitest.config.ts
├── playwright.config.ts
├── tsconfig.json
├── eslint.config.js
└── prettier.config.js

Root references: package.json points to config/*
```

### Recommendation
Keep Option A for now (no refactoring needed). Document in config README.

---

# SECTION 7: IMPLEMENTATION ROADMAP

## Priority 1: CRITICAL (Blocks backend integration)

- [ ] Fix #1: Standardize all 28 features
  - Task: Create missing directories in 6 incomplete features
  - Time: ~2 hours
  - Blocker: None

- [ ] Fix #2: Document store architecture
  - Task: Create docs/STATE_MANAGEMENT.md
  - Time: ~1 hour
  - Blocker: None

## Priority 2: HIGH (Reduces confusion)

- [ ] Fix #3: Consolidate documentation
  - Task: Reorganize docs/ structure
  - Time: ~3 hours
  - Blocker: None

- [ ] Fix #4: Clarify asset organization
  - Task: Audit and move icons
  - Time: ~1 hour
  - Blocker: None

## Priority 3: MEDIUM (Nice-to-have)

- [ ] Fix #5: Test organization policy
  - Task: Document in docs/TESTING.md
  - Time: ~30 min
  - Blocker: None

- [ ] Fix #6: Config file organization
  - Task: Optional - update docs/CONFIGURATION.md
  - Time: ~30 min (or skip)
  - Blocker: None

---

# SECTION 8: BACKEND INTEGRATION CHECKLIST

Before backend developers start integration, ensure:

**Folder Structure:**
- [ ] All 28 features follow consistent pattern
- [ ] All feature directories have: components/, hooks/, services/, types/, utils/
- [ ] All features have index.ts barrel exports

**State Management:**
- [ ] docs/STATE_MANAGEMENT.md created and reviewed
- [ ] Team understands global vs feature stores
- [ ] No state duplication between layers

**Documentation:**
- [ ] Single docs/design/ directory for all design specs
- [ ] Single docs/api/ directory for all API specs
- [ ] docs/api/endpoints.md lists all backend endpoints
- [ ] docs/api/authentication.md documents auth flow

**Assets:**
- [ ] public/icons/ contains only PWA icons
- [ ] src/assets/icons/ contains all component icons
- [ ] No duplicate icons across directories

**Testing:**
- [ ] All tests in src/tests/
- [ ] No .test.ts files outside src/tests/
- [ ] docs/TESTING.md documents testing strategy

**Configuration:**
- [ ] docs/CONFIGURATION.md explains all root-level configs
- [ ] No conflicting tsconfig files
- [ ] All ESLint/Prettier rules documented

---

# SECTION 9: QUICK REFERENCE FOR BACKEND DEVELOPERS

## Finding Things

**API Integration?**
→ src/features/[feature]/services/

**Component Props?**
→ src/features/[feature]/types/

**Styling Constants?**
→ src/shared/constants/

**Shared Utilities?**
→ src/shared/utils/

**UI Components?**
→ src/shared/components/

**Real-time Events?**
→ src/features/websocket/services/

**State Management?**
→ See docs/STATE_MANAGEMENT.md

**API Specs?**
→ See docs/api/

**Design Tokens?**
→ See docs/design/TOKENS.md

---

# SECTION 10: NEXT STEPS

1. **Immediate (This week):**
   - [ ] Standardize all 28 feature modules
   - [ ] Create docs/STATE_MANAGEMENT.md
   - [ ] Create docs/CONFIGURATION.md

2. **This sprint:**
   - [ ] Consolidate documentation structure
   - [ ] Audit and organize assets
   - [ ] Create docs/TESTING.md

3. **Before backend integration:**
   - [ ] All checklist items complete
   - [ ] Team review & approval
   - [ ] Update this guide with any changes

---

Generated: 2026-07-01
Author: Backend Folder Structure Audit
Purpose: Clear organization for backend developer integration

