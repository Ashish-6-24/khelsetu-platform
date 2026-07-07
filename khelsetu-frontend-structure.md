# KhelSetu Frontend — Folder Structure Documentation

**Project:** khelsetu-frontend
**Pattern:** Feature-Based (Feature-Sliced) Architecture
**Audience:** Frontend contributors, reviewers, new onboarding developers
**Status:** Proposed restructuring

---

## 1. Purpose of This Document

This document defines the target folder structure for `khelsetu-frontend`, the reasoning behind each decision, and the rules contributors must follow to keep the codebase maintainable as it grows. It is meant to be the single source of truth referenced in PR reviews when a folder placement is in question.

---

## 2. Why Restructure

The project currently has **14 features and 27 route pages** organized in a flat structure (`components/`, `pages/`, `services/`, `hooks/`, `utils/`, `lib/`, `types-domain/`). At this scale, a flat structure creates three recurring problems:

1. **Scattered ownership** — fixing one feature (e.g. scoring) touches unrelated top-level folders (`components/scoring`, `services/scoring`, `pages/ScoringPage`).
2. **No enforced boundaries** — nothing prevents one feature from reaching into another feature's internals, causing circular dependencies over time.
3. **Ambiguous placement** — new contributors can't tell whether something belongs in `lib/` or `utils/`, or in `components/` vs a feature folder.

The feature-based structure solves this by grouping all files related to one feature together, and by drawing a hard line between **feature-specific** code and **shared** code.

---

## 3. Target Structure

```
khelsetu-frontend/
└── src/
    ├── features/
    │   ├── scoring/
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   ├── services/
    │   │   ├── pages/
    │   │   ├── types.ts
    │   │   └── index.ts
    │   ├── tournaments/
    │   │   ├── components/
    │   │   ├── hooks/
    │   │   ├── services/
    │   │   ├── pages/
    │   │   ├── types.ts
    │   │   └── index.ts
    │   ├── teams/
    │   ├── players/
    │   ├── auth/
    │   ├── navigation/
    │   └── ... (one folder per remaining feature)
    │
    ├── shared/
    │   ├── components/
    │   ├── hooks/
    │   ├── utils/
    │   ├── assets/
    │   ├── config/
    │   └── types/
    │
    ├── app/
    │   ├── router.tsx
    │   ├── providers.tsx
    │   └── layout.tsx
    │
    ├── App.jsx
    └── main.jsx
```

---

## 4. Folder-by-Folder Reference

### 4.1 `features/<name>/`

Each feature is a self-contained module. A feature owns everything it needs to function and exposes only what other parts of the app are allowed to use.

| Subfolder     | Contents                                                             | Rule                                                |
| ------------- | -------------------------------------------------------------------- | --------------------------------------------------- |
| `components/` | UI components used only within this feature                          | Must not be imported by another feature directly    |
| `hooks/`      | Feature-specific hooks (e.g. `useLiveScore`, `useTournamentBracket`) | Business logic for this feature only                |
| `services/`   | API calls, websocket handlers scoped to this feature                 | Do not call another feature's endpoints from here   |
| `pages/`      | Route-level page components for this feature                         | Thin — composition only, no business logic          |
| `types.ts`    | TypeScript types/interfaces for this feature's domain                | Exported through `index.ts` if needed elsewhere     |
| `index.ts`    | Barrel file — the feature's public API                               | The **only** entry point other code may import from |

**Example — correct import:**

```ts
import { ScoreBoard } from 'features/scoring';
```

**Example — incorrect import (do not do this):**

```ts
import { ScoreBoard } from 'features/scoring/components/ScoreBoard';
```

The barrel-file rule exists so that internal refactors inside a feature (renaming files, moving components) never break other parts of the app.

---

### 4.2 `shared/`

Contains code with **zero business logic** — anything here must be usable by any feature without knowing what that feature does.

| Subfolder     | Contents                  | What belongs here                                 |
| ------------- | ------------------------- | ------------------------------------------------- |
| `components/` | Generic UI primitives     | Button, Modal, Input, Card, Spinner               |
| `hooks/`      | Generic reusable hooks    | `useDebounce`, `useLocalStorage`, `useMediaQuery` |
| `utils/`      | Pure helper functions     | Date formatting, string helpers, math utilities   |
| `assets/`     | App-wide static files     | Logos, shared icons, fonts                        |
| `config/`     | Environment and constants | `env.ts`, feature flags, API base URLs            |
| `types/`      | Global TypeScript types   | Types not owned by any single feature             |

> **Note:** `lib/` and `utils/` from the old structure are merged into `shared/utils/` to remove the ambiguity of deciding which one a new helper belongs in.

---

### 4.3 `app/`

Bootstrapping and app-wide wiring only — no business logic, no feature-specific code.

| File            | Purpose                                       |
| --------------- | --------------------------------------------- |
| `router.tsx`    | Route definitions, lazy-loaded feature pages  |
| `providers.tsx` | Context providers (theme, auth, query client) |
| `layout.tsx`    | App shell (header, nav, footer wrapper)       |

---

## 5. Migration Map (Old → New)

| Old location              | New location                                                                             |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| `components/scoring/*`    | `features/scoring/components/`                                                           |
| `components/navigation/*` | `features/navigation/components/`                                                        |
| `components/ui/*`         | `shared/components/`                                                                     |
| `pages/*` (27 files)      | Distributed into each owning `features/<name>/pages/`                                    |
| `services/api/*`          | Split into `features/<name>/services/` by domain                                         |
| `services/websocket/*`    | `features/scoring/services/` (or relevant real-time feature)                             |
| `hooks/*`                 | Split: feature-specific → `features/<name>/hooks/`; generic → `shared/hooks/`            |
| `utils/*` + `lib/*`       | Merged into `shared/utils/`                                                              |
| `types-domain/*`          | Split: feature-owned types → `features/<name>/types.ts`; cross-cutting → `shared/types/` |
| `store/*` (Zustand)       | Keep at `src/store/`, or co-locate slices inside owning feature if feature-specific      |
| `workers/*`               | Keep at `src/workers/` unless tied to one feature                                        |

---

## 6. Import & Dependency Rules

1. **Features may import from `shared/`** — always allowed.
2. **Features may NOT import from another feature's internals** — only through that feature's `index.ts`.
3. **`shared/` may NOT import from `features/`** — this would invert the dependency direction and break the architecture.
4. **`app/` may import from `features/` and `shared/`** — it sits at the top of the dependency graph.
5. **Pages stay thin** — a page composes feature components and hooks; it does not contain business logic or direct API calls.

### Enforcing the rules

Add `eslint-plugin-boundaries` (or `eslint-plugin-import` with custom restricted paths) to fail CI when these rules are violated:

```js
// .eslintrc example (conceptual)
'boundaries/element-types': [
  'error',
  {
    default: 'disallow',
    rules: [
      { from: 'features', allow: ['shared'] },
      { from: 'shared', allow: [] },
      { from: 'app', allow: ['features', 'shared'] },
    ],
  },
],
```

This turns the folder structure from a convention into something CI actively checks.

---

## 7. Naming Conventions

| Item            | Convention                      | Example                          |
| --------------- | ------------------------------- | -------------------------------- |
| Feature folders | lowercase, singular concept     | `scoring`, `auth`, `tournaments` |
| Components      | PascalCase                      | `ScoreBoard.tsx`                 |
| Hooks           | camelCase, `use` prefix         | `useLiveScore.ts`                |
| Services        | camelCase, `.service.ts` suffix | `scoring.service.ts`             |
| Types           | PascalCase for types/interfaces | `Tournament`, `MatchScore`       |
| Barrel files    | always `index.ts`               | one per feature root             |

---

## 8. Testing Conventions

- **Unit tests** are co-located with the file they test: `ScoreBoard.tsx` + `ScoreBoard.test.tsx` in the same folder.
- **E2E tests** (Playwright) live in a top-level `e2e/` folder outside `src/`, organized by feature name to mirror `features/`.
- Every feature's `services/` layer should have at least one test mocking the API response shape.

---

## 9. Path Aliases

Configure `tsconfig.json` (or `vite.config.ts`) so imports are unambiguous and refactor-safe:

```json
{
  "compilerOptions": {
    "paths": {
      "@/features/*": ["src/features/*"],
      "@/shared/*": ["src/shared/*"],
      "@/app/*": ["src/app/*"]
    }
  }
}
```

---

## 10. Migration Checklist

- [ ] Create `src/features/`, `src/shared/`, `src/app/` skeleton folders
- [ ] Move each of the 14 existing features into `features/<name>/` with `components/`, `hooks/`, `services/`, `pages/` subfolders
- [ ] Create `index.ts` barrel file per feature
- [ ] Merge `lib/` and `utils/` into `shared/utils/`
- [ ] Move generic UI from `components/ui` into `shared/components/`
- [ ] Split `types-domain/` between feature-owned types and `shared/types/`
- [ ] Update all imports to use path aliases and barrel files
- [ ] Add `eslint-plugin-boundaries` rule set to CI
- [ ] Update `README.md` project structure section to match this document
- [ ] Run full test suite (`npm run validate`) after migration to catch broken imports

---

## 11. Summary

| Principle                           | Why it matters                                |
| ----------------------------------- | --------------------------------------------- |
| Group by feature, not by file type  | Everything for one feature is in one place    |
| Shared code has zero business logic | Prevents hidden coupling between features     |
| One public entry point per feature  | Internal refactors never break other features |
| Enforce with linting, not just docs | Structure survives team growth and turnover   |

This structure is the one recommended for large, scalable, production-grade React/TypeScript applications, and matches KhelSetu's current scale of 14 features and 27 pages.
