# Design Token System — Full Design System

**Date:** 2026-06-25
**Status:** Approved
**Scope:** Centralized design tokens + useTheme() hook + component refactoring

## Goal

Establish a single source of truth for all design decisions — colors, spacing, typography, radii, shadows — so every component consumes the same tokens. Switching themes automatically updates the entire interface.

## Architecture

### Source of Truth: CSS Variables

`src/styles/themes.css` defines all tokens as CSS custom properties. This file already exists and is correct for both light and dark themes.

### JS Mirror: `src/styles/tokens.ts`

A TypeScript file that mirrors CSS variables as JS values for cases requiring dynamic/computed styling (inline styles, conditional logic).

```ts
export const tokens = {
  color: {
    brand: { primary: 'var(--brand-primary)', ... },
    bg: { canvas: 'var(--bg-canvas)', surface: 'var(--bg-surface)', ... },
    text: { primary: 'var(--text-primary)', secondary: 'var(--text-secondary)', ... },
    border: { subtle: 'var(--border-subtle)', strong: 'var(--border-strong)' },
    functional: { live: 'var(--color-live)', success: 'var(--color-success)', ... },
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 48, '3xl': 64 },
  typography: { display: 40, hero: 36, heading: 32, title: 24, subtitle: 18, body: 16, caption: 13, small: 12 },
  radius: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, full: 999 },
  shadow: { xs: 'var(--shadow-xs)', sm: 'var(--shadow-sm)', ... },
} as const;
```

### Theme Hook: `src/styles/useTheme.ts`

```ts
import { useUIStore } from '@store/uiStore';

import { tokens } from './tokens';

export function useTheme() {
  const theme = useUIStore((s) => s.theme);
  const isDark = document.documentElement.classList.contains('dark');

  return {
    theme, // 'light' | 'dark' | 'system'
    isDark,
    colors: tokens.color,
    spacing: tokens.spacing,
    typography: tokens.typography,
    radius: tokens.radius,
    shadow: tokens.shadow,
  };
}
```

## Component Refactoring Rules

### Rule 1: Never hardcode colors

```tsx
// ❌ Bad
<div className="bg-[#0F172A] text-[#F1F5F9]">
<div style={{ backgroundColor: '#0F172A' }}>

// ✅ Good
<div className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
<div style={{ backgroundColor: tokens.color.bg.surface }}>
```

### Rule 2: Use Tailwind classes when possible

Tailwind classes are preferred over inline styles. Only use `useTheme()` when you need JS values for dynamic computation.

### Rule 3: Component variants use tokens

```tsx
// Button variants reference brand tokens
const variantStyles = {
  primary: 'bg-[var(--brand-primary)] text-[var(--text-on-brand)]',
  secondary: 'bg-[var(--bg-surface)] text-[var(--text-primary)]',
  danger: 'bg-[var(--color-danger)] text-white',
  // ...
};
```

### Rule 4: Shadows adapt to theme

CSS variables handle this automatically — `var(--shadow-md)` resolves differently in light vs dark mode.

### Rule 5: Spacing uses the scale

```tsx
// ❌ Bad
padding: 12, margin: 15, fontSize: 18

// ✅ Good — Tailwind
<p className="p-4 mb-3 text-base">

// ✅ Good — JS tokens
style={{ padding: tokens.spacing.md, fontSize: tokens.typography.body }}
```

## Files to Create

| File                     | Purpose         |
| ------------------------ | --------------- |
| `src/styles/tokens.ts`   | JS token mirror |
| `src/styles/useTheme.ts` | Theme hook      |

## Files to Refactor

### UI Components (remove hardcoded hex)

- `src/components/ui/Button.tsx` — variant styles use hex (`#991B1B`, `#FCA5A5`, `#B8860B`)
- `src/components/ui/Badge.tsx` — variant styles use hex
- `src/components/ui/Card.tsx` — some hex references
- `src/components/ui/Select.tsx` — any remaining hex
- `src/components/ui/Modal.tsx` — any remaining hex
- `src/components/ui/Input.tsx` — any remaining hex

### Landing Page Components

- `src/components/landing/` — hero gradients, CTA colors

### CSS Utilities

- `src/index.css` — hardcoded hex in `.cert-paper`, `.skeleton-shimmer`, `.empty-state-title`, `.empty-state-description`, `.live-dot`, `.skeleton-shimmer`

### Already Fixed (no changes needed)

- 74 components from dark mode audit — already use CSS variables

## Verification

After implementation:

1. `npm run lint` — no new errors
2. `npm run typecheck` — no type errors
3. `npm test -- --run` — all 245 tests pass
4. Visual: toggle light/dark mode — all components should look correct
5. Grep for remaining hardcoded hex: `rg '#[0-9a-fA-F]{6}' src/components/ src/pages/` — should only find intentional brand hex in themes.css
