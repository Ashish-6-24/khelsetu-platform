# Enterprise Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 8 enterprise-grade features to the existing KhelSetu Tournament Management System frontend without modifying existing stable functionality.

**Architecture:** Each feature is a self-contained module under `src/features/<feature>/` with its own components, hooks, types, utils, and optional store. New pages go in `src/pages/<feature>/page.tsx`. New API services go in `src/services/api/`. All features reuse the existing design system (Button, Card, Badge, Modal, Skeleton, etc.), Zustand stores, React Query patterns, i18n system, and responsive layout.

**Tech Stack:** React 19, TypeScript 6 (strict), Zustand 5, TanStack React Query 5, Framer Motion, Tailwind CSS 4, Recharts (already in vendor-charts), Lucide React icons, react-router-dom 7, clsx + tailwind-merge, html2canvas + jspdf (for PDF export), qrcode (for certificate QR).

---

## File Structure Overview

### New Feature Modules
```
src/features/
  bracket-advanced/          # Feature 1: Advanced Bracket
  formation/                 # Feature 2: Formation Builder
  live-events/               # Feature 3: Live Match Event Center
  match-statistics/          # Feature 4: Advanced Match Statistics
  match-reports/             # Feature 5: Automated Match Reports
  news/                      # Feature 6: News & Media Center
  media-gallery/             # Feature 7: Media Gallery
  certificates/              # Feature 8: Certificate Generator
```

### New Pages
```
src/pages/
  news/page.tsx
  news/[id]/page.tsx
  certificates/page.tsx
  formation/[matchId]/page.tsx
  live-events/[matchId]/page.tsx
  match-statistics/[matchId]/page.tsx
  match-reports/[matchId]/page.tsx
  media-gallery/page.tsx
```

### New Services
```
src/services/api/
  news.ts
  certificate.ts
  media.ts
  matchEvents.ts
  matchStatistics.ts
  matchReports.ts
  formation.ts
```

### Modified Files
```
src/utils/constants.ts
src/app/router/index.tsx
src/components/navigation/nav-config.ts
src/features/i18n/translations/index.ts
```

---

## Execution Order

1. **Task 0** - Routes, API Endpoints, Navigation (all features depend on this)
2. **Task 1** - Advanced Bracket (standalone)
3. **Task 2** - Formation Builder (standalone)
4. **Task 3** - Live Event Center (standalone, Task 4/5 depend on types)
5. **Task 4** - Match Statistics (depends on Live Event types)
6. **Task 5** - Match Reports (depends on Live Event + Statistics types)
7. **Task 6** - News Center (standalone)
8. **Task 7** - Media Gallery (standalone)
9. **Task 8** - Certificate Generator (standalone)
10. **Task 9** - i18n Translations (last)

---

## Notes

- All components use existing design system (Button, Card, Badge, Modal, Skeleton)
- All pages use React Query for data, Zustand for local state
- Dark mode via `.dark` class + `dark:` Tailwind prefixes
- Mobile-first responsive using Tailwind breakpoints
- New routes use ProtectedRoute + DashboardLayout
- `clsx` + `twMerge(clsx(...))` pattern for conditional classes
- `framer-motion` for animations, `lucide-react` for icons
- `recharts` for charts (already bundled)
- TypeScript strict - no `any` types
- Loading skeletons for all async data
