# Design Token System — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all hardcoded hex colors with CSS variable references and create a centralized token system with useTheme() hook.

**Architecture:** CSS variables in `themes.css` remain source of truth. New `tokens.ts` mirrors them for JS access. New `useTheme()` hook exposes theme state. ~60 files refactored to use tokens instead of hardcoded hex.

**Tech Stack:** TypeScript, React, Zustand, Tailwind CSS, CSS custom properties

---

## Task 1: Create Token Files

**Files:**
- Create: `khelsetu-frontend/src/styles/tokens.ts`
- Create: `khelsetu-frontend/src/styles/useTheme.ts`

- [ ] **Step 1: Create tokens.ts**

```ts
// khelsetu-frontend/src/styles/tokens.ts
/**
 * Design tokens — JS mirror of CSS custom properties.
 * Use these when you need JS values (inline styles, dynamic logic).
 * Prefer Tailwind classes with var() references in JSX.
 */
export const tokens = {
  color: {
    brand: {
      primary: 'var(--brand-primary)',
      primaryHover: 'var(--brand-primary-hover)',
      primaryActive: 'var(--brand-primary-active)',
      primarySoft: 'var(--brand-primary-soft)',
      primaryInk: 'var(--brand-primary-ink)',
      secondary: 'var(--brand-secondary)',
      secondarySoft: 'var(--brand-secondary-soft)',
      secondaryInk: 'var(--brand-secondary-ink)',
      accent: 'var(--brand-accent)',
      accentHover: 'var(--brand-accent-hover)',
      accentSoft: 'var(--brand-accent-soft)',
      accentInk: 'var(--brand-accent-ink)',
    },
    bg: {
      canvas: 'var(--bg-canvas)',
      surface: 'var(--bg-surface)',
      surfaceRaised: 'var(--bg-surface-raised)',
      surfaceSunken: 'var(--bg-surface-sunken)',
      inverse: 'var(--bg-inverse)',
      glass: 'var(--bg-glass)',
      glassStrong: 'var(--bg-glass-strong)',
    },
    text: {
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)',
      tertiary: 'var(--text-tertiary)',
      muted: 'var(--text-muted)',
      onPrimary: 'var(--text-on-primary)',
      onBrand: 'var(--text-on-brand)',
      onAccent: 'var(--text-on-accent)',
      link: 'var(--text-link)',
    },
    border: {
      subtle: 'var(--border-subtle)',
      default: 'var(--border-default)',
      strong: 'var(--border-strong)',
      brand: 'var(--border-brand)',
    },
    functional: {
      live: 'var(--color-live)',
      liveSoft: 'var(--color-live-soft)',
      success: 'var(--color-success)',
      successSoft: 'var(--color-success-soft)',
      warning: 'var(--color-warning)',
      warningSoft: 'var(--color-warning-soft)',
      danger: 'var(--color-danger)',
      dangerSoft: 'var(--color-danger-soft)',
      info: 'var(--color-info)',
      infoSoft: 'var(--color-info-soft)',
    },
    sport: {
      cricket: 'var(--sport-cricket)',
      football: 'var(--sport-football)',
      volleyball: 'var(--sport-volleyball)',
      basketball: 'var(--sport-basketball)',
    },
  },
  spacing: {
    '0.5': 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  typography: {
    display: 40,
    hero: 36,
    heading: 32,
    title: 24,
    subtitle: 18,
    body: 16,
    caption: 13,
    small: 12,
  },
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 999,
  },
  shadow: {
    xs: 'var(--shadow-xs)',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)',
    brand: 'var(--shadow-brand)',
    gold: 'var(--shadow-gold)',
    glow: 'var(--shadow-glow)',
  },
} as const;
```

- [ ] **Step 2: Create useTheme.ts**

```ts
// khelsetu-frontend/src/styles/useTheme.ts
import { useMemo } from 'react';
import { tokens } from './tokens';
import { useUIStore } from '@store/uiStore';

export function useTheme() {
  const theme = useUIStore((s) => s.theme);

  const isDark = useMemo(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  }, [theme]);

  return {
    /** Current theme setting: 'light' | 'dark' | 'system' */
    theme,
    /** Whether dark mode is actively applied */
    isDark,
    /** Color tokens (reference CSS variables) */
    colors: tokens.color,
    /** Spacing scale in px */
    spacing: tokens.spacing,
    /** Typography scale in px */
    typography: tokens.typography,
    /** Border radius scale in px */
    radius: tokens.radius,
    /** Shadow tokens (reference CSS variables) */
    shadow: tokens.shadow,
  } as const;
}

export type ThemeContext = ReturnType<typeof useTheme>;
```

- [ ] **Step 3: Verify import resolution**

Run: `cd khelsetu-frontend && npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No new errors

- [ ] **Step 4: Commit**

```bash
git add src/styles/tokens.ts src/styles/useTheme.ts
git commit -m "feat(design-tokens): add centralized token system and useTheme hook"
```

---

## Task 2: Refactor UI Components — Button, Badge, Input

**Files:**
- Modify: `khelsetu-frontend/src/components/ui/Button.tsx`
- Modify: `khelsetu-frontend/src/components/ui/Badge.tsx`
- Modify: `khelsetu-frontend/src/components/ui/Input.tsx`

- [ ] **Step 1: Refactor Button.tsx**

Replace all hardcoded hex in variant styles with CSS variable references. The Button component uses Tailwind `dark:` variants — replace `dark:bg-[#FCA5A5]` with `dark:bg-[var(--brand-primary)]`, etc.

Key replacements:
- `#7F1D1D` → `var(--brand-primary)` (or `var(--brand-primary-hover)` for hover)
- `#991B1B` → `var(--brand-primary-hover)`
- `#450A0A` → `var(--brand-primary-active)` (use as shadow color only)
- `#FCA5A5` → `var(--brand-primary)` (dark mode brand)
- `#FECACA` → `var(--brand-primary-hover)` (dark mode)
- `#1A0A0A` → `var(--brand-primary-ink)` (text on brand)
- `#0F172A` → `var(--text-primary)` or `var(--bg-inverse)`
- `#1E293B` → `var(--bg-surface-raised)`
- `#F1F5F9` → `var(--text-primary)` (dark mode text)
- `#E7E5E4` → `var(--border-subtle)`
- `#D6D3D1` → `var(--border-strong)`
- `#F5F5F4` → `var(--bg-surface-sunken)`
- `#3F3F46` → `var(--border-strong)` (dark mode)
- `#13131A` → `var(--bg-surface)` (dark mode)
- `#1A1A23` → `var(--bg-surface-raised)` (dark mode)
- `#52525B` → `var(--border-strong)` (dark mode)
- `#B91C1C` → `var(--color-danger)`
- `#15803D` → `var(--color-success)`
- `#166534` → `var(--color-success)` (darker)
- `#14532D` → `var(--color-success)` (darkest)
- `#B8860B` → `var(--brand-accent)`
- `#A07A0A` → `var(--brand-accent-hover)`
- `#7A5A08` → `var(--brand-accent-hover)` (darker)
- `#C4930A` → `var(--brand-accent-hover)` (lighter)
- `#8B6709` → `var(--brand-accent-hover)` (darker)
- `#E5B547` → `var(--brand-accent)` (dark mode)
- `#D1A73D` → `var(--brand-accent-hover)` (dark mode)
- `#F87171` → `var(--color-live)` (dark mode)
- `rgb(127_29_29/...)` → use `var(--brand-primary)` in shadow (note: CSS var in shadow requires careful handling — may need to keep RGB for shadows)

**Note on shadows:** CSS custom properties cannot be used directly in `rgb()` notation in Tailwind. For shadows using brand colors, keep the RGB values but add a comment noting they must match `themes.css`. This is acceptable since shadows are defined in CSS variables already (`var(--shadow-brand)`, etc.).

- [ ] **Step 2: Refactor Badge.tsx**

Replace hardcoded hex in variantStyles:
- `#F5F5F4` → `var(--bg-surface-sunken)`
- `#0F172A` → `var(--text-primary)`
- `#1A1A23` → `var(--bg-surface-raised)`
- `#F1F5F9` → `var(--text-primary)` (dark)
- `#DC2626` → `var(--color-live)`
- `#B8860B` → `var(--brand-accent)`
- `#C4930A` → `var(--brand-accent-hover)`
- `#1A0A0A` → `var(--brand-accent-ink)`
- `#7A5A08` → `var(--brand-accent-hover)` (ring)
- `#7F1D1D` → `var(--brand-primary)`
- `#5B1414` → `var(--brand-primary-active)` (ring)
- `#E7E5E4` → `var(--border-subtle)`
- `#3F3F46` → `var(--border-strong)` (dark)

- [ ] **Step 3: Refactor Input.tsx**

Replace focus ring colors:
- `#7F1D1D` → `var(--brand-primary)`
- `#FCA5A5` → `var(--brand-primary)` (dark mode)

- [ ] **Step 4: Verify**

Run: `npm run typecheck && npm run lint`
Expected: Pass

- [ ] **Step 5: Commit**

```bash
git add src/components/ui/Button.tsx src/components/ui/Badge.tsx src/components/ui/Input.tsx
git commit -m "refactor(design-tokens): replace hardcoded hex in Button, Badge, Input with CSS variables"
```

---

## Task 3: Refactor Remaining UI Components (14 files)

**Files:**
- Modify: `khelsetu-frontend/src/components/ui/LiveIndicator.tsx`
- Modify: `khelsetu-frontend/src/components/ui/GlowPulse.tsx`
- Modify: `khelsetu-frontend/src/components/ui/PremiumCard.tsx`
- Modify: `khelsetu-frontend/src/components/ui/FloatingOrb.tsx`
- Modify: `khelsetu-frontend/src/components/ui/AnimatedBackground.tsx`
- Modify: `khelsetu-frontend/src/components/ui/MomentumChart.tsx`
- Modify: `khelsetu-frontend/src/components/ui/Progress.tsx`
- Modify: `khelsetu-frontend/src/components/ui/Toast.tsx`
- Modify: `khelsetu-frontend/src/components/ui/EmptyState.tsx`
- Modify: `khelsetu-frontend/src/components/ui/ShimmerCard.tsx`
- Modify: `khelsetu-frontend/src/components/ui/LanguageToggle.tsx`
- Modify: `khelsetu-frontend/src/components/ui/Avatar.tsx`
- Modify: `khelsetu-frontend/src/components/ui/CardSpotlight.tsx`
- Modify: `khelsetu-frontend/src/components/ui/ScoreFlash.tsx`

- [ ] **Step 1: Refactor LiveIndicator.tsx**

Replace:
- `#DC2626` → `var(--color-live)`
- `#F87171` → `var(--color-live)` (dark mode)
- `#7F1D1D` → `var(--brand-primary)`
- `#991B1B` → `var(--brand-primary-hover)`
- `#B8860B` → `var(--brand-accent)`
- `#9A7209` → `var(--brand-accent-hover)`
- `#15803D` → `var(--color-success)`
- `#166534` → `var(--color-success)` (darker)
- `#D97706` → `var(--color-warning)`
- `#B45309` → `var(--color-warning)` (darker)
- `#13131A` → `var(--bg-surface)` (dark mode)

- [ ] **Step 2: Refactor GlowPulse.tsx**

Replace variant color maps:
- `#DC2626` → `var(--color-live)`, rgba → use CSS variable in style
- `#15803D` → `var(--color-success)`
- `#2563EB` → `var(--color-info)`
- `#B8860B` → `var(--brand-accent)`
- `#7F1D1D` → `var(--brand-primary)`

Note: For `rgba()` glow effects, use inline style with `var()` or keep RGB values with comment.

- [ ] **Step 3: Refactor PremiumCard.tsx**

Replace gradient overlays and shadow values. Use CSS variables for bg colors, keep RGB for shadows.

- [ ] **Step 4: Refactor FloatingOrb.tsx**

Replace default prop `#7F1D1D` → `'var(--brand-primary)'`

- [ ] **Step 5: Refactor AnimatedBackground.tsx**

Replace default prop `#7F1D1D` → `'var(--brand-primary)'`

- [ ] **Step 6: Refactor MomentumChart.tsx**

Replace default colors:
- `#7F1D1D` → `'var(--brand-primary)'`
- `#B8860B` → `'var(--brand-accent)'`

- [ ] **Step 7: Refactor Progress.tsx**

Replace gradient colors with CSS variables.

- [ ] **Step 8: Refactor Toast.tsx**

Replace progress bar gradient `#7F1D1D`/`#B8860B` → CSS variables.

- [ ] **Step 9: Refactor EmptyState.tsx**

Replace background gradient glow colors.

- [ ] **Step 10: Refactor ShimmerCard.tsx**

Replace dark bg and shimmer gradient colors.

- [ ] **Step 11: Refactor LanguageToggle.tsx**

Replace active toggle text colors.

- [ ] **Step 12: Refactor Avatar.tsx**

Replace default gradient colors.

- [ ] **Step 13: Refactor CardSpotlight.tsx**

Replace spotlight color.

- [ ] **Step 14: Refactor ScoreFlash.tsx**

Replace positive/negative flash colors.

- [ ] **Step 15: Verify**

Run: `npm run typecheck && npm run lint`
Expected: Pass

- [ ] **Step 16: Commit**

```bash
git add src/components/ui/
git commit -m "refactor(design-tokens): replace hardcoded hex in remaining UI components"
```

---

## Task 4: Refactor Animation & Chart Components

**Files:**
- Modify: `khelsetu-frontend/src/components/animations/LivePulse.tsx`
- Modify: `khelsetu-frontend/src/components/animations/CursorGlow.tsx`
- Modify: `khelsetu-frontend/src/components/charts/index.tsx`

- [ ] **Step 1: Refactor LivePulse.tsx**

Replace `#DC2626` → `var(--color-live)`, `#15803D` → `var(--color-success)`

- [ ] **Step 2: Refactor CursorGlow.tsx**

Replace `rgba(127,29,29,0.06)` → use CSS variable.

- [ ] **Step 3: Refactor charts/index.tsx**

Replace `#3b82f6` → `var(--color-info)` for chart strokes.

- [ ] **Step 4: Verify & Commit**

```bash
npm run typecheck && npm run lint
git add src/components/animations/ src/components/charts/
git commit -m "refactor(design-tokens): replace hardcoded hex in animation and chart components"
```

---

## Task 5: Refactor Dashboard & Navigation Components

**Files:**
- Modify: `khelsetu-frontend/src/components/dashboard/OnboardingChecklist.tsx`
- Modify: `khelsetu-frontend/src/components/dashboard/StatsCard.tsx`
- Modify: `khelsetu-frontend/src/components/tournament/TournamentCard.tsx`
- Modify: `khelsetu-frontend/src/components/navigation/MobileTabBar.tsx`
- Modify: `khelsetu-frontend/src/components/navigation/SidebarContent.tsx`

- [ ] **Step 1: Refactor OnboardingChecklist.tsx**

Replace gradient colors with CSS variables.

- [ ] **Step 2: Refactor StatsCard.tsx**

Replace gradient and hover glow colors.

- [ ] **Step 3: Refactor TournamentCard.tsx**

Replace accent bar gradient.

- [ ] **Step 4: Refactor MobileTabBar.tsx**

Replace active tab indicator gradient.

- [ ] **Step 5: Refactor SidebarContent.tsx**

Replace active indicator and promo card gradient colors.

- [ ] **Step 6: Verify & Commit**

```bash
npm run typecheck && npm run lint
git add src/components/dashboard/ src/components/tournament/ src/components/navigation/
git commit -m "refactor(design-tokens): replace hardcoded hex in dashboard, tournament, navigation components"
```

---

## Task 6: Refactor Feature Components — Formation, Certificates

**Files:**
- Modify: `khelsetu-frontend/src/features/formation/utils/formations.ts`
- Modify: `khelsetu-frontend/src/features/formation/components/PlayerBench.tsx`
- Modify: `khelsetu-frontend/src/features/formation/components/TacticalBoard.tsx`
- Modify: `khelsetu-frontend/src/features/formation/components/FormationSelector.tsx`
- Modify: `khelsetu-frontend/src/features/formation/components/DraggablePlayer.tsx`
- Modify: `khelsetu-frontend/src/features/formation/components/FootballPitch.tsx`
- Modify: `khelsetu-frontend/src/features/certificates/types/index.ts`
- Modify: `khelsetu-frontend/src/features/certificates/utils/certificateRenderer.ts`
- Modify: `khelsetu-frontend/src/features/certificates/components/CertificateForm.tsx`
- Modify: `khelsetu-frontend/src/features/certificates/components/CertificateGenerator.tsx`
- Modify: `khelsetu-frontend/src/features/certificates/components/CertConfetti.tsx`
- Modify: `khelsetu-frontend/src/features/certificates/components/CertificateQR.tsx`

- [ ] **Step 1: Refactor formation utils and components**

Replace POSITION_COLORS map values, tactical board colors, and gradient colors with CSS variables.

- [ ] **Step 2: Refactor certificate types and components**

Replace tier colors, form focus rings, button gradients, confetti colors, QR colors.

- [ ] **Step 3: Verify & Commit**

```bash
npm run typecheck && npm run lint
git add src/features/formation/ src/features/certificates/
git commit -m "refactor(design-tokens): replace hardcoded hex in formation and certificate features"
```

---

## Task 7: Refactor Feature Components — Match Reports, Live Events, Brackets

**Files:**
- Modify: `khelsetu-frontend/src/features/match-reports/components/ReportEditor.tsx`
- Modify: `khelsetu-frontend/src/features/match-reports/components/MatchReport.tsx`
- Modify: `khelsetu-frontend/src/features/live-events/components/LiveEventCenter.tsx`
- Modify: `khelsetu-frontend/src/features/live-events/components/EventInputPanel.tsx`
- Modify: `khelsetu-frontend/src/features/live-events/components/MatchControls.tsx`
- Modify: `khelsetu-frontend/src/features/bracket-advanced/utils/bracketExport.ts`
- Modify: `khelsetu-frontend/src/features/bracket-advanced/components/AdvancedBracketView.tsx`
- Modify: `khelsetu-frontend/src/features/bracket-advanced/components/BracketControls.tsx`
- Modify: `khelsetu-frontend/src/features/bracket-advanced/components/BracketMatchCard.tsx`

- [ ] **Step 1: Refactor match-reports components**

Replace save button gradients, focus rings, timeline node gradients.

- [ ] **Step 2: Refactor live-events components**

Replace active tab gradients, focus rings, score text gradients.

- [ ] **Step 3: Refactor bracket-advanced components**

Replace champion card colors, progress bar gradients, focus rings, winner gradients.

- [ ] **Step 4: Verify & Commit**

```bash
npm run typecheck && npm run lint
git add src/features/match-reports/ src/features/live-events/ src/features/bracket-advanced/
git commit -m "refactor(design-tokens): replace hardcoded hex in match-reports, live-events, bracket features"
```

---

## Task 8: Refactor Feature Components — News, Media, Stats, Broadcast, Scoring, i18n, Roles

**Files:**
- Modify: `khelsetu-frontend/src/features/news/components/NewsArticle.tsx`
- Modify: `khelsetu-frontend/src/features/news/components/NewsFilters.tsx`
- Modify: `khelsetu-frontend/src/features/news/components/NewsCard.tsx`
- Modify: `khelsetu-frontend/src/features/news/components/NewsFeed.tsx`
- Modify: `khelsetu-frontend/src/features/news/components/NewsSearch.tsx`
- Modify: `khelsetu-frontend/src/features/media-gallery/components/GalleryFilters.tsx`
- Modify: `khelsetu-frontend/src/features/media-gallery/components/GalleryGrid.tsx`
- Modify: `khelsetu-frontend/src/features/media-gallery/components/MediaGallery.tsx`
- Modify: `khelsetu-frontend/src/features/match-statistics/components/StatChart.tsx`
- Modify: `khelsetu-frontend/src/features/live-broadcast/components/index.tsx`
- Modify: `khelsetu-frontend/src/features/scoring/components/cricket/InningsSummary.tsx`
- Modify: `khelsetu-frontend/src/features/i18n/components/index.tsx`
- Modify: `khelsetu-frontend/src/features/user-roles/components/index.tsx`

- [ ] **Step 1: Refactor news components (5 files)**

Replace card borders, filter chips, search input styles, article body text colors.

- [ ] **Step 2: Refactor media-gallery components (3 files)**

Replace active filter gradients, highlight badge, trophy icon colors.

- [ ] **Step 3: Refactor match-statistics components**

Replace chart grid stroke, tick text, team A/B colors.

- [ ] **Step 4: Refactor live-broadcast components**

Replace section icon colors, source button styles.

- [ ] **Step 5: Refactor scoring components**

Replace innings card gradient.

- [ ] **Step 6: Refactor i18n and user-roles components**

Replace active language card, user avatar gradient.

- [ ] **Step 7: Verify & Commit**

```bash
npm run typecheck && npm run lint
git add src/features/news/ src/features/media-gallery/ src/features/match-statistics/ src/features/live-broadcast/ src/features/scoring/ src/features/i18n/ src/features/user-roles/
git commit -m "refactor(design-tokens): replace hardcoded hex in news, media, stats, broadcast, scoring, i18n, roles"
```

---

## Task 9: Refactor Page Components

**Files:**
- Modify: `khelsetu-frontend/src/pages/landing/page.tsx`
- Modify: `khelsetu-frontend/src/pages/about/page.tsx`
- Modify: `khelsetu-frontend/src/pages/contact/page.tsx`
- Modify: `khelsetu-frontend/src/pages/dashboard/page.tsx`
- Modify: `khelsetu-frontend/src/pages/settings/page.tsx`
- Modify: `khelsetu-frontend/src/pages/auth/login/page.tsx`
- Modify: `khelsetu-frontend/src/pages/news/page.tsx`
- Modify: `khelsetu-frontend/src/pages/news/[id]/page.tsx`
- Modify: `khelsetu-frontend/src/pages/players/[id]/page.tsx`
- Modify: `khelsetu-frontend/src/pages/i18n/page.tsx`

- [ ] **Step 1: Refactor landing page (174 hex values — largest file)**

This is the biggest single file. Replace all brand colors, gold accents, neutral grays, semantic colors, sport accents with CSS variables. For inline `style={{}}` hex values, use `tokens.color.*` references.

- [ ] **Step 2: Refactor about page (~60 hex values)**

Replace page bg, section borders, heading/body text, brand accents, CTA buttons.

- [ ] **Step 3: Refactor contact page (~40 hex values)**

Replace page bg, form input styles, error states, CTA cards.

- [ ] **Step 4: Refactor dashboard page (~20 hex values)**

Replace FloatingOrb colors, hero banner gradient, PremiumCard glow, progress bars.

- [ ] **Step 5: Refactor settings page (~10 hex values)**

Replace focus ring, save button gradient, avatar gradient.

- [ ] **Step 6: Refactor auth/login page**

Replace checkbox focus ring. Keep Google logo SVG colors (intentional brand).

- [ ] **Step 7: Refactor news pages**

Replace heading/text colors, loading skeleton gradient, error state colors.

- [ ] **Step 8: Refactor players page**

Replace avatar gradient.

- [ ] **Step 9: Refactor i18n page**

Replace active language card border/bg.

- [ ] **Step 10: Verify & Commit**

```bash
npm run typecheck && npm run lint
git add src/pages/
git commit -m "refactor(design-tokens): replace hardcoded hex in all page components"
```

---

## Task 10: Final Verification

- [ ] **Step 1: Run full test suite**

Run: `npm test -- --run`
Expected: All 245 tests pass

- [ ] **Step 2: Run typecheck**

Run: `npm run typecheck`
Expected: No errors

- [ ] **Step 3: Run lint**

Run: `npm run lint`
Expected: No new errors

- [ ] **Step 4: Grep for remaining hardcoded hex**

Run: `rg '#[0-9a-fA-F]{6}' src/components/ src/pages/ src/features/ --include='*.tsx' --include='*.ts' -c | sort -t: -k2 -rn | head -20`
Expected: Only themes.css, Logo.tsx, ThemeToggle, index.css definitions remain

- [ ] **Step 5: Visual verification**

Toggle light/dark mode in browser. All components should look correct with no color regressions.

- [ ] **Step 6: Final commit if any cleanup needed**

```bash
git add -A
git commit -m "chore(design-tokens): final cleanup and verification"
```
