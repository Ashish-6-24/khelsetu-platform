# UI CSS Variables Consistency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all hardcoded Tailwind colors with CSS variables across 7 UI files to ensure dark theme consistency, accessibility compliance, and brand color enforcement.

**Architecture:** Audit identified 10 critical/high-severity color inconsistencies. Fix by converting hardcoded `text-gray-*`, `bg-blue-*`, `text-red-*` to `[var(--text-primary)]`, `[var(--brand-primary)]`, etc. Add missing animations and fix accessibility issues (focus rings, text sizes).

**Tech Stack:** TypeScript, React, Tailwind CSS, framer-motion

---

## File Structure

**Files to Modify:**
1. `components/tables/DataTable.tsx` — 7 hardcoded colors
2. `pages/standings/page.tsx` — 9 hardcoded colors + brand selector inconsistency
3. `components/navigation/Header.tsx` — 1 focus ring hardcode + 1 MenuItem danger state
4. `pages/dashboard/page.tsx` — 2 hardcoded colors + 2 undefined animations
5. `components/ui/Badge.tsx` — 5 BadgeDot hardcoded colors
6. `components/navigation/MobileTabBar.tsx` — 1 text size accessibility fix
7. `pages/tournaments/page.tsx` — 1 error color hardcode
8. `globals.css` — Add missing animation definitions

**Files Verified (No Changes):**
- `components/ui/Card.tsx` — all CSS vars ✓
- `components/ui/Button.tsx` — all CSS vars ✓
- `components/navigation/Sidebar.tsx` — all CSS vars ✓

---

## Task Checklist

- [ ] Task 1: Fix DataTable.tsx color hardcodes (7 replacements)
- [ ] Task 2: Fix Badge.tsx BadgeDot colors (5 replacements)
- [ ] Task 3: Fix Tournaments error color (1 replacement)
- [ ] Task 4: Fix Dashboard pulse & colors (2 color + 2 animation fixes)
- [ ] Task 5: Fix Header focus ring & MenuItem (2 fixes)
- [ ] Task 6: Fix Standings page colors & brand selector (9 colors + 1 brand fix)
- [ ] Task 7: Fix MobileTabBar text size (1 accessibility fix)
- [ ] Task 8: Add missing animations to globals.css
- [ ] Task 9: Run build & verify no errors
- [ ] Task 10: Commit all changes

---

## Tasks

### Task 1: Fix DataTable.tsx Color Hardcodes

**Files:**
- Modify: `src/components/tables/DataTable.tsx:18-52`

**Changes:**
Replace all `divide-gray-*`, `bg-gray-*`, `text-gray-*` with CSS variable equivalents.

- [ ] **Step 1: Replace table border color**

Old line 18:
```jsx
<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
```

New:
```jsx
<table className="min-w-full divide-y divide-[var(--border-subtle)]">
```

- [ ] **Step 2: Replace thead background**

Old line 19:
```jsx
<thead className="bg-gray-50 dark:bg-gray-800">
```

New:
```jsx
<thead className="bg-[var(--bg-surface-sunken)]">
```

- [ ] **Step 3: Replace th text color**

Old line 24:
```jsx
className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
```

New:
```jsx
className="px-6 py-3 text-left text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider"
```

- [ ] **Step 4: Replace tbody background & border**

Old line 31:
```jsx
<tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
```

New:
```jsx
<tbody className="bg-[var(--bg-surface)] divide-y divide-[var(--border-subtle)]">
```

- [ ] **Step 5: Replace hover state**

Old line 38:
```jsx
? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800'
```

New:
```jsx
? 'cursor-pointer hover:bg-[var(--bg-surface-sunken)]'
```

- [ ] **Step 6: Replace td text color**

Old line 45:
```jsx
className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
```

New:
```jsx
className="px-6 py-4 whitespace-nowrap text-sm text-[var(--text-primary)]"
```

- [ ] **Step 7: Verify file compiles**

Run: `npm run build:check` in `khelsetu-frontend/`

Expected: No TypeScript errors

---

### Task 2: Fix Badge.tsx BadgeDot Colors

**Files:**
- Modify: `src/components/ui/Badge.tsx:102-108`

**Context:** BadgeDot colors need CSS variable equivalents. Create mapping to use semantic color variables.

- [ ] **Step 1: Replace dotColors mapping**

Old lines 102-108:
```javascript
const dotColors: Record<NonNullable<BadgeDotProps['variant']>, string> = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  neutral: 'bg-slate-400',
};
```

New:
```javascript
const dotColors: Record<NonNullable<BadgeDotProps['variant']>, string> = {
  success: 'bg-[var(--color-success)]',
  warning: 'bg-[var(--color-warning)]',
  error: 'bg-[var(--color-danger)]',
  info: 'bg-[var(--color-info)]',
  neutral: 'bg-[var(--text-tertiary)]',
};
```

- [ ] **Step 2: Verify file compiles**

Run: `npm run build:check` in `khelsetu-frontend/`

Expected: No TypeScript errors

---

### Task 3: Fix Tournaments Error Color

**Files:**
- Modify: `src/pages/tournaments/page.tsx:51`

**Context:** Error message uses hardcoded red instead of CSS danger color variable.

- [ ] **Step 1: Replace error text color**

Old line 51:
```jsx
<p className="mt-1 text-sm text-red-600 dark:text-red-400">
```

New:
```jsx
<p className="mt-1 text-sm text-[var(--color-danger)]">
```

- [ ] **Step 2: Verify file compiles**

Run: `npm run build:check` in `khelsetu-frontend/`

Expected: No TypeScript errors

---

### Task 4: Fix Dashboard Page Colors & Animations

**Files:**
- Modify: `src/pages/dashboard/page.tsx:144, 232, 227-228, 273-274`

**Context:** Dashboard has hardcoded colors in live indicators and undefined animation classes.

- [ ] **Step 1: Fix live indicator pulse color (line 144)**

Old line 144:
```jsx
<span className="inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-emerald-300" />
```

New:
```jsx
<span className="inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-[var(--color-success)]" />
```

- [ ] **Step 2: Fix live badge dot color (line 232)**

Old line 232:
```jsx
<span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-red-500" />
```

New:
```jsx
<span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[var(--color-live)]" />
```

- [ ] **Step 3: Note animation delay (lines 227-228, 273-274)**

These lines are correct — they reference animation classes defined in globals.css. No change needed here; we'll add the animation definitions in Task 8.

- [ ] **Step 4: Verify file compiles**

Run: `npm run build:check` in `khelsetu-frontend/`

Expected: No TypeScript errors

---

### Task 5: Fix Header Focus Ring & MenuItem Danger State

**Files:**
- Modify: `src/components/navigation/Header.tsx:159, 246`

**Context:** Focus ring hardcoded to blue (should be brand primary). MenuItem danger state mixed hardcode/var.

- [ ] **Step 1: Fix focus ring color (line 159)**

Old line 159:
```jsx
className="flex items-center gap-2 rounded-full p-0.5 transition-all hover:ring-2 hover:ring-blue-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
```

New:
```jsx
className="flex items-center gap-2 rounded-full p-0.5 transition-all hover:ring-2 hover:ring-[var(--brand-primary)]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]"
```

- [ ] **Step 2: Fix MenuItem danger state (line 246)**

Old line 246:
```jsx
? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-[var(--color-danger-soft)]'
```

New:
```jsx
? 'text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10 dark:text-[var(--color-danger)] dark:hover:bg-[var(--color-danger-soft)]'
```

- [ ] **Step 3: Verify file compiles**

Run: `npm run build:check` in `khelsetu-frontend/`

Expected: No TypeScript errors

---

### Task 6: Fix Standings Page Colors & Brand Selector

**Files:**
- Modify: `src/pages/standings/page.tsx:53, 56, 75, 90-94, 96, 112, 134, 137, 167`

**Context:** Multiple hardcoded gray colors and tournament selector uses blue instead of brand maroon.

- [ ] **Step 1: Fix h1 color (line 53)**

Old line 53:
```jsx
<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
```

New:
```jsx
<h1 className="text-2xl font-bold text-[var(--text-primary)]">
```

- [ ] **Step 2: Fix description color (line 56)**

Old line 56:
```jsx
<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
```

New:
```jsx
<p className="mt-1 text-sm text-[var(--text-tertiary)]">
```

- [ ] **Step 3: Fix "Select Tournament" label (line 75)**

Old line 75:
```jsx
<h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
```

New:
```jsx
<h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3">
```

- [ ] **Step 4: Fix tournament selector button styling (lines 90-94)**

Old lines 90-94:
```jsx
className={`w-full text-left p-3 rounded-lg transition-colors ${
  selectedTournamentId === tournament.id
    ? 'bg-blue-50 border-2 border-blue-500 dark:bg-blue-900/20'
    : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border-2 border-transparent'
}`}
```

New:
```jsx
className={`w-full text-left p-3 rounded-lg transition-colors ${
  selectedTournamentId === tournament.id
    ? 'bg-[var(--bg-brand-soft)] border-2 border-[var(--brand-primary)] dark:bg-[var(--brand-primary)]/10'
    : 'bg-[var(--bg-surface-sunken)] hover:bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] dark:hover:bg-[var(--bg-surface-raised)] border-2 border-transparent'
}`}
```

**Note:** If `--bg-brand-soft` CSS variable doesn't exist, use `[var(--brand-primary)]/5` instead.

- [ ] **Step 5: Fix tournament name color (line 96)**

Old line 96:
```jsx
<p className="font-medium text-sm text-gray-900 dark:text-white truncate">
```

New:
```jsx
<p className="font-medium text-sm text-[var(--text-primary)] truncate">
```

- [ ] **Step 6: Fix sport label color (line 112)**

Old line 112:
```jsx
<span className="text-xs text-gray-500 dark:text-gray-400">
```

New:
```jsx
<span className="text-xs text-[var(--text-tertiary)]">
```

- [ ] **Step 7: Fix selected tournament heading (line 134)**

Old line 134:
```jsx
<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
```

New:
```jsx
<h2 className="text-lg font-semibold text-[var(--text-primary)]">
```

- [ ] **Step 8: Fix "Points Table" label (line 137)**

Old line 137:
```jsx
<p className="text-sm text-gray-500 dark:text-gray-400">
```

New:
```jsx
<p className="text-sm text-[var(--text-tertiary)]">
```

- [ ] **Step 9: Fix empty state message (line 167)**

Old line 167:
```jsx
<p className="text-gray-500 dark:text-gray-400 text-lg">
```

New:
```jsx
<p className="text-[var(--text-tertiary)] text-lg">
```

- [ ] **Step 10: Verify file compiles**

Run: `npm run build:check` in `khelsetu-frontend/`

Expected: No TypeScript errors

---

### Task 7: Fix MobileTabBar Text Size Accessibility

**Files:**
- Modify: `src/components/navigation/MobileTabBar.tsx:66`

**Context:** Tab labels are `text-[10px]` — too small for accessibility. Per mobile-first research, should be `text-xs` (12px) for readability on budget phones.

- [ ] **Step 1: Increase label text size**

Old line 66:
```jsx
className={clsx(
  'group relative flex h-full w-full flex-col items-center justify-center gap-0.5 rounded-lg text-[10px] font-semibold tracking-wide transition-colors',
```

New:
```jsx
className={clsx(
  'group relative flex h-full w-full flex-col items-center justify-center gap-0.5 rounded-lg text-xs font-semibold tracking-wide transition-colors',
```

- [ ] **Step 2: Verify file compiles**

Run: `npm run build:check` in `khelsetu-frontend/`

Expected: No TypeScript errors

---

### Task 8: Add Missing Animation Definitions

**Files:**
- Modify: `src/globals.css` (add animations section)

**Context:** Dashboard references `animate-fade-in-up` and `live-card` classes that don't exist in Tailwind config. Add them to globals.css.

- [ ] **Step 1: Add animations to globals.css**

Find the `@layer components` section (or add one if missing). Add these animation definitions:

```css
@layer utilities {
  /* Fade in up animation for staggered entrance */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.5s ease-out forwards;
  }

  /* Live card border glow for active matches */
  @keyframes liveCardBorder {
    0%, 100% {
      box-shadow: inset 0 0 0 1px rgba(220, 38, 38, 0.3);
    }
    50% {
      box-shadow: inset 0 0 0 1px rgba(220, 38, 38, 0.8);
    }
  }

  .live-card-border {
    animation: liveCardBorder 2s ease-in-out infinite;
    background: linear-gradient(to right, var(--color-live), transparent);
  }
}
```

- [ ] **Step 2: Verify CSS syntax**

Run: `npm run build:check` in `khelsetu-frontend/`

Expected: No CSS parsing errors

---

### Task 9: Build & Verify

**Files:**
- Test: Full build

- [ ] **Step 1: Run full build**

```bash
cd khelsetu-frontend/
npm run build
```

Expected: Build succeeds with no errors or warnings about CSS variables

- [ ] **Step 2: Check for type errors**

```bash
npm run type-check
```

Expected: 0 type errors

- [ ] **Step 3: Lint check**

```bash
npm run lint
```

Expected: 0 lint errors (warnings okay if pre-existing)

---

### Task 10: Commit All Changes

**Files:**
- All modified files from Tasks 1-8

- [ ] **Step 1: Stage all changes**

```bash
cd khelsetu-frontend/
git add src/components/tables/DataTable.tsx \
         src/components/ui/Badge.tsx \
         src/pages/tournaments/page.tsx \
         src/pages/dashboard/page.tsx \
         src/components/navigation/Header.tsx \
         src/pages/standings/page.tsx \
         src/components/navigation/MobileTabBar.tsx \
         src/globals.css
```

- [ ] **Step 2: Commit with message**

```bash
git commit -m "fix: replace hardcoded colors with CSS variables for theme consistency

- DataTable: 7 hardcoded grays -> CSS variables
- Badge: 5 hardcoded status colors -> CSS variables  
- Tournaments: error red -> var(--color-danger)
- Dashboard: pulse colors + add missing animations
- Header: focus ring blue -> brand primary
- Standings: 9 hardcodes + tournament selector maroon
- MobileTabBar: increase label text for accessibility (10px -> 12px)
- Add fadeInUp and liveCardBorder animations

Fixes: color consistency, accessibility, focus indicators, dark theme"
```

- [ ] **Step 3: Verify commit**

```bash
git log --oneline -1
```

Expected: Shows commit message with all files

---

## Execution Recommendation

Plan complete and saved to `docs/superpowers/plans/2026-07-01-ui-css-variables-consistency.md`.

**Recommended execution:** Subagent-Driven approach using superpowers:subagent-driven-development — dispatch one task at a time, review, iterate. This allows catching integration issues early (e.g., if CSS variables don't exist, we catch it in Task 2 build check vs. at the end).

**Estimated total time:** ~90 minutes (including builds & verification)

