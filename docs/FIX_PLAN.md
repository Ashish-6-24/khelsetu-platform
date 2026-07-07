# KhelSetu Production-Readiness Fix Plan

**Generated:** 2026-07-01 | **Audit scope:** 6 parallel audits (a11y, perf, visual/UX, code quality, security, PWA) | **Total issues:** 102

---

## Bucket 1 — CRITICAL (fix now, 24 issues)

### P1.1 [Security] XSS — innerHTML in bracket print window

- **File:** `src/features/bracket-advanced/utils/bracketExport.ts:63-78`
- **Fix:** Sanitize with DOMPurify.sanitize(el.innerHTML) before document.write()

### P1.2 [Security] JWT tokens in localStorage (XSS-exposed)

- **Files:** `src/store/authStore.ts:29,52-59`, `src/lib/axios.ts:33`
- **Fix:** Remove tokens from localStorage + Zustand persist. Keep only user/isAuthenticated persisted. Tokens should come from httpOnly cookies set by backend.

### P1.3 [Security] Unauthenticated WebSocket connection

- **File:** `src/lib/websocket-client.ts:20-26`
- **Fix:** Pass access token in socket auth: `io(url, { auth: { token } })`. Remove `onAny` re-emit or scope to known event types.

### P1.4 [PWA] oklch() colors — breaks on Android WebView <111 (Nepal budget phones)

- **File:** Tailwind v4 theme.css (286 references) + `src/index.css:1`
- **Fix:** Add PostCSS plugin to downcompile oklch to sRGB, OR add browserslist with targets and use Tailwind v3 color utilities override.

### P1.5 [PWA] Build target `esnext` — no transpilation for old browsers

- **File:** `vite.config.ts:75`
- **Fix:** Change to `target: ['es2020', 'chrome80', 'firefox78', 'safari14']`

### P1.6 [PWA] PWA manifest missing installability fields

- **File:** `public/manifest.json:1-22`
- **Fix:** Add PNG icons (192/512/maskable), `scope`, `orientation`, `lang`, `dir`, apple-touch-icon PNG.

### P1.7 [PWA] Service Worker precache too small — SPA breaks offline

- **File:** `public/sw.js:2`
- **Fix:** Replace hand-written sw.js with vite-plugin-pwa Workbox config. Glob patterns for `dist/assets/**`. CacheFirst for static, StaleWhileRevalidate for API GET.

### P1.8 [Perf] vendor-charts (413kB) modulepreload on initial load

- **File:** `dist/index.html:89`, `src/features/live-scoring/components/ScoreTicker.tsx` (barrel import chain)
- **Fix:** Remove modulepreload. Ensure recharts is only reachable via lazy route chunks. Break barrel import chain in scoring features.

### P1.9 [Perf] features-scoring (172kB) modulepreload on initial load

- **File:** `features/scoring/index.ts` barrel export
- **Fix:** Eliminate barrel import from main entry. Import directly from subpaths.

### P1.10 [Perf] features-billing (139kB) modulepreload on initial load

- **File:** `features/billing/index.ts` barrel export
- **Fix:** Same — break barrel import from main bundle entry.

### P1.11 [Perf] LandingPage + NotFoundPage NOT lazy-loaded

- **File:** `src/app/router/index.tsx:4-5`
- **Fix:** Wrap both in `lazyPage()`.

### P1.12 [Perf] Nav preload triggers 26 dynamic imports on hover

- **File:** `src/shared/components/navigation/nav-config.ts:41-47`
- **Fix:** Remove preload from nav items. Use requestIdleCallback for critical pages only (Dashboard, Tournaments, Scoring).

### P1.13 [A11y] NewsArticle lightbox — no focus trap, no focus restoration

- **File:** `src/features/news/components/NewsArticle.tsx:214-229`
- **Fix:** Refactor to use Modal component or add useFocusTrap + focus restoration + aria-modal="true"

### P1.14 [A11y] CertificateForm — labels not programmatically associated

- **File:** `src/features/certificates/components/CertificateForm.tsx:43-126`
- **Fix:** Add matching id/htmlFor attributes, or use shared Input component.

### P1.15 [A11y] Contact page textarea — label not associated

- **File:** `src/pages/contact/page.tsx:232-251`
- **Fix:** Add htmlFor="contact-message" to label, id="contact-message" to textarea.

### P1.16 [A11y] Password show/hide button — removed from keyboard tab order

- **File:** `src/shared/components/ui/Input.tsx:147`
- **Fix:** Remove tabIndex={-1} from password toggle button.

### P1.17 [A11y] LandingLayout main — missing tabIndex for skip link target

- **File:** `src/app/layouts/LandingLayout.tsx:23`
- **Fix:** Add tabIndex={-1} to main element.

### P1.18 [UX] Green primary in football scoring score display

- **File:** `src/features/scoring/components/football/FootballScoringPanel.tsx:49,55,66`
- **Fix:** Replace green with brand maroon or brand tokens.

### P1.19 [UX] Green qualification badges in standings

- **File:** `src/features/standings/components/StandingsTable.tsx:170`
- **Fix:** Replace bg-green-500 with brand color or success token.

### P1.20 [UX] Green "Live Now" analytics card

- **File:** `src/pages/analytics/page.tsx:156,160-161`
- **Fix:** Use red-600 for live semantics, or brand color.

### P1.21 [UX] Billing page uses window.confirm for destructive action

- **File:** `src/pages/billing/page.tsx:36`
- **Fix:** Replace with Modal component.

### P1.22 [UX] Venues page: hardcoded gray, no loading/error states

- **File:** `src/pages/venues/page.tsx`
- **Fix:** Replace hardcoded colors with CSS vars. Add useQuery loading skeleton + error boundary.

### P1.23 [Quality] `any` in scoringStore

- **File:** `src/store/scoringStore.ts:36`
- **Fix:** Replace `data?: any` with union of event types.

### P1.24 [Quality] `as never` type erasure in tournament create

- **File:** `src/pages/tournaments/create/page.tsx:41`
- **Fix:** Define TournamentFormData interface, use Zod + RHF pattern.

---

## Bucket 2 — IMPORTANT (fix soon, 41 issues)

### A11y (7)

- MobileDrawer: no focus trap (`MobileDrawer.tsx:37-80`)
- NotificationDropdown: no focus trap (`NotificationDropdown.tsx:72-145`)
- Contact language toggle: missing aria-pressed (`contact/page.tsx:265-278`)
- TournamentFormWizard step indicator: not semantic (`TournamentFormWizard.tsx:60-111`)
- ScoreTicker marquee: not fully disabled for reduced motion (`animations.css:194-209`)
- LightboxViewer: Tab prevention overbroad (`LightboxViewer.tsx:40-44`)
- LoginForm: missing autoComplete (`LoginForm.tsx:28-41`)

### Perf (5)

- VirtualList component exists but never used (`VirtualList.tsx`)
- AuthProvider subscribes to entire auth store (`AuthProvider.tsx:14`)
- DOMPurify eagerly imported 28kB (`NewsArticle.tsx:3`)
- 5 Google Fonts no display=swap (`index.html:82`)
- vendor-motion 1kB — framer-motion leaking (`vite.config.ts:48`)

### UX (9)

- EmptyState hardcoded slate colors (`EmptyState.tsx:58,65,77,81`)
- Billing page: animate-pulse skeleton (`billing/page.tsx:61`)
- Reports page: animate-pulse skeleton (`reports/page.tsx:44-46`)
- Communication page: raw input (`communication/page.tsx:87-91`)
- Standings table: green won/lost colors (`StandingsTable.tsx:186`)
- Player detail: hardcoded gray (`players/[id]/page.tsx:103-144`)
- Tournament detail: hardcoded gray (`tournaments/[id]/page.tsx:123-132`)
- Offline sync: hardcoded gray+green (`offline-sync/page.tsx:42-91`)
- Settings page: custom button instead of Button component (`settings/page.tsx:79`)

### Quality (10)

- 8 mutations without onError (teams, tournaments, notifications, billing, match-reports)
- 3 duplicated useEffect syncing TanStack Query → Zustand (billing, reports, offline-sync)
- Record<string, unknown> form state with manual validation (tournament create/edit)
- `as Partial<Tournament>` cast (tournament edit)
- `as unknown as HTMLElement` type hacks (DraggablePlayer, ScoreTicker)
- SettingsButton setState in useEffect pattern
- MobileDrawer exhaustive-deps disable

### Security (5)

- CSP allows unsafe-inline scripts (`index.html:23`)
- Scoreboard overlay route unauthenticated (`router/index.tsx:551-556`)
- Password change is a no-op (`settings/page.tsx:156-166`)
- No file upload client-side validation (`media-gallery/services/media.ts:18-34`)
- ErrorBoundary localStorage.clear() destroys auth (`ErrorBoundary.tsx:184`)

### PWA (5)

- vite-plugin-pwa installed but unused (`package.json:147`, `vite.config.ts`)
- SW API caching is fire-and-forget (`sw.js:29-38`)
- No beforeinstallprompt handler (no install UI)
- Offline sync uses localStorage 5MB limit instead of IndexedDB
- No idempotency keys on offline sync mutations

---

## Bucket 3 — MINOR (backlog, 37 issues)

### A11y (5)

- Contact page topic select missing aria-required
- CertificateForm inputs missing autoComplete
- Footer placeholder links point to `#`
- ScoreTicker non-standard role="marquee"
- LightboxViewer video missing accessible name

### Perf (4)

- NotFoundPage imports framer-motion directly
- Socket.IO reconnects without exponential backoff
- 95 inline style={{} } objects
- LHCI skips unsized-images audit

### UX (10)

- Communication page: hardcoded gray in sidebar
- Venues page: facility tags bypass theme
- Football scoring panel: hardcoded gray in score header
- EmptyState: slate gradient doesn't adapt to brand
- No error state on analytics/players/search/notifications pages
- Green stat colors in player detail / team detail

### Quality (12)

- AnimatedNumber useEffect closure
- RelativeTime stale date closure
- @ts-expect-error for valid HTML element
- NewsSearch debounce useEffect sync
- DashboardLayout/LandingLayout useEffect for theme (unnecessary)
- useMatchReport 3 mutations no error handling
- useNotifications no error rollback
- Query key factory inconsistency (57 occurrences)
- useOfflineSync mutation in useEffect deps
- useReports/useBilling dual-source Zustand+Query pattern
- TODO without ticket number

### Security (3)

- Missing security headers (X-Frame-Options, Referrer-Policy)
- SearchResultCard renders API URL as href without validation
- AnchorLink passes arbitrary href to window.location

### PWA (3)

- text-wrap: balance without @supports fallback
- crypto.randomUUID() without fallback
- navigator.onLine stale on page load

---

## Execution Plan

**Wave 1 (Critical):** 24 fixes, ~2-3 hours
**Wave 2 (Important):** 41 fixes, ~4-5 hours  
**Wave 3 (Minor):** 37 fixes, ~2-3 hours

**Dependencies:** P1.4 (oklch) and P1.5 (build target) affect ALL rendering — fix first. P1.8-P1.12 (bundle) are independent. P1.13-P1.20 (a11y/ux) are independent per-component.

**After fixes:** Run `npm run validate` (lint + format + typecheck + test + build + circular deps).
