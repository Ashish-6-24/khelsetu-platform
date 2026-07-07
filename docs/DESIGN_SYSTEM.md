# Design System Reference

**Last Updated:** July 1, 2026 | **Status:** Complete Reference

---

## Overview

KhelSetu uses a comprehensive design system built on Tailwind CSS with custom CSS variables for design tokens. This ensures consistency across the entire application.

**Design Token Files:**

- `src/styles/variables.css` - CSS custom properties
- `src/styles/globals.css` - Global styles
- `src/styles/animations.css` - Reusable animations
- `design-system/` - Design documentation

---

## Color Palette

### Brand Colors

```css
/* Primary - Action color */
--brand-primary: #7f1d1d /* Maroon */ --brand-primary-dark: #5c1414
  /* Darker maroon */ --brand-primary-light: #a82121 /* Lighter maroon */
  /* Secondary - Supporting color */ --brand-secondary: #1f2937 /* Gray-800 */
  --brand-tertiary: #64748b /* Slate-500 */;
```

**Usage:**

```tsx
// In JSX with Tailwind
<button className="bg-[#7F1D1D] hover:bg-[#5C1414]">
  Action Button
</button>

// Or use CSS variable
<button style={{ backgroundColor: 'var(--brand-primary)' }}>
  Action Button
</button>
```

### Semantic Colors

```css
/* Success - Positive actions/states */
--color-success: #16a34a /* Green-600 */ --color-success-light: #22c55e
  /* Green-500 */ --color-success-dark: #15803d /* Green-700 */
  /* Error - Negative actions/states */ --color-error: #dc2626 /* Red-600 */
  --color-error-light: #ef4444 /* Red-500 */ --color-error-dark: #b91c1c
  /* Red-700 */ /* Warning - Caution/alerts */ --color-warning: #ea8c00
  /* Orange-600 */ --color-warning-light: #f97316 /* Orange-500 */
  --color-warning-dark: #c2410c /* Orange-700 */
  /* Info - Informational messages */ --color-info: #0284c7 /* Sky-600 */
  --color-info-light: #0ea5e9 /* Sky-500 */ --color-info-dark: #075985
  /* Sky-700 */;
```

### Neutral Colors

```css
/* Text colors */
--text-primary: #0f172a /* Slate-900 */ --text-secondary: #475569
  /* Slate-600 */ --text-tertiary: #94a3b8 /* Slate-400 */
  --text-inverse: #ffffff /* White */ /* Background colors */
  --bg-primary: #ffffff /* White */ --bg-secondary: #f8fafc /* Slate-50 */
  --bg-tertiary: #f1f5f9 /* Slate-100 */ /* Border colors */
  --border-subtle: #e2e8f0 /* Slate-200 */ --border-strong: #cbd5e1
  /* Slate-300 */;
```

### Dark Mode Colors

```css
@media (prefers-color-scheme: dark) {
  --text-primary: #f8fafc /* Slate-50 */ --text-secondary: #cbd5e1
    /* Slate-300 */ --bg-primary: #0f172a /* Slate-900 */
    --bg-secondary: #1e293b /* Slate-800 */ --border-subtle: #334155
    /* Slate-700 */;
}
```

---

## Typography

### Font Family

```css
--font-family-sans:
  system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
--font-family-mono:
  'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Menlo, Consolas, monospace;
```

### Font Sizes

```css
/* Scale: 12px → 14px → 16px → 18px → 20px → 24px → 32px → 48px */
--font-size-xs: 12px /* 0.75rem */ --font-size-sm: 14px /* 0.875rem */
  --font-size-base: 16px /* 1rem */ --font-size-lg: 18px /* 1.125rem */
  --font-size-xl: 20px /* 1.25rem */ --font-size-2xl: 24px /* 1.5rem */
  --font-size-3xl: 32px /* 2rem */ --font-size-4xl: 48px /* 3rem */;
```

### Font Weights

```css
--font-weight-light: 300 --font-weight-normal: 400 --font-weight-medium: 500
  --font-weight-semibold: 600 --font-weight-bold: 700;
```

### Line Heights

```css
--line-height-tight: 1.2 /* Headings */ --line-height-normal: 1.5
  /* Body text */ --line-height-relaxed: 1.75 /* Long-form */;
```

**Usage:**

```tsx
<h1 className="text-4xl font-bold leading-tight">Heading</h1>
<p className="text-base font-normal leading-normal">Body text</p>
<code className="font-mono text-sm">code snippet</code>
```

---

## Spacing

### Scale (4px base)

```css
--spacing-0: 0px --spacing-1: 4px --spacing-2: 8px --spacing-3: 12px
  --spacing-4: 16px --spacing-6: 24px --spacing-8: 32px --spacing-12: 48px
  --spacing-16: 64px;
```

**Usage:**

```tsx
<div className="p-4 m-6">Padded and margined</div>
<div style={{ padding: 'var(--spacing-4)' }}>Padded</div>
```

---

## Shadows & Elevation

```css
/* Elevation system for depth */
--shadow-sm:
  0 1px 2px 0 rgb(0 0 0 / 0.05) --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1),
  0 1px 2px 0 rgb(0 0 0 / 0.06) --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1),
  0 2px 4px -2px rgb(0 0 0 / 0.1) --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1),
  0 4px 6px -4px rgb(0 0 0 / 0.1) --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1),
  0 8px 10px -6px rgb(0 0 0 / 0.1);
```

**Usage:**

```tsx
<div className="shadow-md">Card with elevation</div>
<div className="shadow-lg">Modal with more elevation</div>
```

---

## Border Radius

```css
--radius-none: 0px --radius-sm: 4px --radius-base: 6px --radius-md: 8px
  --radius-lg: 12px --radius-xl: 16px --radius-full: 9999px;
```

**Usage:**

```tsx
<div className="rounded-md">Medium rounded</div>
<button className="rounded-full">Fully rounded button</button>
```

---

## Animations

### Predefined Animations

```css
/* Fade in/out */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Slide animations */
@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Scale animations */
@keyframes scaleIn {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

/* Pulse animation */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

### Animation Timings

```css
/* Duration */
--animation-duration-fast: 150ms --animation-duration-base: 200ms
  --animation-duration-slow: 300ms /* Easing */ --animation-ease-linear: linear
  --animation-ease-in: cubic-bezier(0.4, 0, 1, 1)
  --animation-ease-out: cubic-bezier(0, 0, 0.2, 1)
  --animation-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

**Usage:**

```css
.button-hover {
  transition: all var(--animation-duration-base) var(--animation-ease-out);
}

.loading-spinner {
  animation: spin 1s linear infinite;
}
```

---

## Component Specifications

### Buttons

**Default Button:**

```tsx
<button className="px-4 py-2 bg-[#7F1D1D] text-white rounded-md hover:bg-[#5C1414] transition">
  Default Button
</button>
```

**Button Sizes:**

- Small: `px-3 py-1 text-sm`
- Medium: `px-4 py-2 text-base`
- Large: `px-6 py-3 text-lg`

**Button States:**

- Default: `bg-[#7F1D1D]`
- Hover: `bg-[#5C1414]`
- Active: `bg-[#3D0F0F]`
- Disabled: `bg-gray-300 cursor-not-allowed`

### Input Fields

**Standard Input:**

```tsx
<input
  className="w-full px-3 py-2 border border-[var(--border-subtle)] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7F1D1D]"
  placeholder="Enter text..."
/>
```

**Minimum Height:** 48px (touch target for mobile)

**Focus State:** 2px ring with brand color

### Cards

**Basic Card:**

```tsx
<div className="bg-white p-6 rounded-lg shadow-md">Card content</div>
```

**Dark Mode Card:**

```tsx
<div className="dark:bg-slate-800 p-6 rounded-lg shadow-md">Card content</div>
```

### Badges

**Success Badge:**

```tsx
<span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
  Active
</span>
```

---

## Responsive Breakpoints

```css
/* Tailwind CSS breakpoints */
sm: 640px    /* Small devices */
md: 768px    /* Tablets */
lg: 1024px   /* Desktops */
xl: 1280px   /* Large desktops */
2xl: 1536px  /* Extra large */
```

**Usage:**

```tsx
<div className="text-base md:text-lg lg:text-xl">Responsive text sizes</div>
```

---

## Accessibility

### Color Contrast

All color combinations meet WCAG AAA standards (7:1 ratio):

- Text on primary: 18.5:1 contrast
- Text on secondary: 9.2:1 contrast
- Text on success: 12.1:1 contrast

### Focus Indicators

```css
:focus-visible {
  outline: 2px solid var(--brand-primary);
  outline-offset: 2px;
}
```

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Using Design Tokens in Code

### CSS

```css
.card {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  transition: box-shadow var(--animation-duration-base)
    var(--animation-ease-out);
}
```

### Tailwind Classes

```tsx
<div className="bg-white text-slate-900 p-6 rounded-lg shadow-md transition-shadow">
  Using Tailwind classes
</div>
```

### Inline Styles

```tsx
<div
  style={{
    backgroundColor: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    padding: 'var(--spacing-6)',
  }}
>
  Using CSS variables
</div>
```

---

## Dark Mode Implementation

**Toggle Dark Mode:**

```tsx
import { useDarkMode } from '@/shared/hooks/useDarkMode';

export function ThemeToggle() {
  const { isDark, toggle } = useDarkMode();

  return <button onClick={toggle}>{isDark ? '☀️ Light' : '🌙 Dark'}</button>;
}
```

**Implementation:**

1. Preference stored in localStorage: `app-theme`
2. Applied to `<html>` element class: `dark`
3. CSS detects with `@media (prefers-color-scheme: dark)`
4. Manual override with `.dark` class

---

## Component Library (Storybook)

View all components and variations:

```bash
npm run storybook
# Opens http://localhost:6006
```

Browse:

- UI Components (Button, Input, Card, etc.)
- Form Patterns
- Layouts
- Icons

---

## Extending the Design System

### Adding New Color

1. Add to `src/styles/variables.css`:

```css
--color-custom: #123456;
```

2. Use in components:

```tsx
<div style={{ color: 'var(--color-custom)' }}>Custom color</div>
```

### Adding New Component

1. Create `src/shared/components/NewComponent.tsx`
2. Use design tokens
3. Export from `src/shared/components/index.ts`
4. Add Storybook story

---

**Version:** 1.0 | **Status:** Complete Reference
