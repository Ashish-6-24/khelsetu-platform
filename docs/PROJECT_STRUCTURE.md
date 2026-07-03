# KhelSetu Project Structure Guide

**Last Updated:** July 1, 2026 | **Status:** Complete Reference

---

## Root Directory Overview

```
khelsetu/
├── khelsetu-frontend/          # Main React application
├── design-system/              # Design tokens and system
├── docs/                        # Documentation (this folder)
├── README.md                    # Project entry point
├── .gitignore                   # Git exclusions
├── .github/                     # GitHub workflows
└── [config files]               # .git, .opencode, graphify-out
```

---

## khelsetu-frontend/ (Main Application)

### Entry Points
```
khelsetu-frontend/
├── package.json                # Dependencies, scripts, metadata
├── vite.config.ts              # Build configuration
├── vitest.config.ts            # Test configuration
├── tsconfig.json               # TypeScript configuration
├── .env.example                # Environment template
├── .eslintrc.json              # Linting rules
├── .prettierrc                  # Code formatting
└── .gitignore                   # Local exclusions
```

### Source Code (src/)

#### src/app/ - Application Core
**Purpose:** Global setup, routing, providers

```
src/app/
├── layouts/                     # Page layouts
│   ├── AuthLayout.tsx           # Login/register pages
│   ├── DashboardLayout.tsx      # Main app pages
│   ├── LandingLayout.tsx        # Public pages
│   └── index.ts
├── providers/                   # Context providers
│   ├── AppProviders.tsx         # Root provider wrapper
│   ├── AuthProvider.tsx         # Authentication context
│   ├── QueryProvider.tsx        # React Query setup
│   └── index.ts
└── router/                      # Route definitions
    ├── routes.ts                # Route configuration
    ├── ProtectedRoute.tsx        # Private route wrapper
    └── index.ts
```

**Key Files:**
- `AppProviders.tsx` - Wraps entire app with Zustand, React Query, Router
- `ProtectedRoute.tsx` - Checks auth before rendering private pages
- `routes.ts` - All 36 route definitions in one place

#### src/features/ - Feature Modules (26 modules)

**Architecture Pattern:** Feature-Sliced Design (FSD)

Each feature is self-contained with:
- Components (UI elements)
- Hooks (logic)
- Services (API calls)
- Store (state management)
- Types (TypeScript definitions)
- Utils (helpers)

**Features List:**
```
src/features/
├── auth/                        # Authentication
├── tournaments/                 # Tournament management
├── teams/                        # Team management
├── players/                      # Player profiles
├── scoring/                      # Live scoring
├── bracket-advanced/            # Bracket visualization
├── live-broadcast/              # Streaming
├── live-events/                 # Event tracking
├── billing/                      # Payments/subscriptions
├── notifications/               # Real-time alerts
├── communication/               # Messaging
├── search/                       # Global search
├── i18n/                         # Internationalization
├── offline-sync/                # Sync queue
├── accessibility/               # WCAG compliance
├── certificates/                # Certificate generation
├── formation/                    # Team formations
├── user-roles/                   # Permission system
├── audit-log/                    # Activity tracking
├── data-import/                  # Bulk imports
├── analytics/                    # Reports/dashboards
└── ... (6 more)
```

**Example: auth/ structure**
```
src/features/auth/
├── components/
│   ├── LoginForm.tsx            # Email/password form
│   ├── RegisterForm.tsx         # Signup form
│   ├── PasswordReset.tsx        # Reset flow
│   └── index.ts
├── hooks/
│   ├── useLogin.ts              # Login logic
│   ├── useRegister.ts           # Register logic
│   ├── useAuth.ts               # General auth hook
│   └── index.ts
├── services/
│   ├── authService.ts           # API calls
│   └── index.ts
├── store/
│   ├── authStore.ts             # Zustand store
│   └── index.ts
├── types/
│   ├── auth.types.ts            # TypeScript types
│   └── index.ts
├── utils/
│   ├── validators.ts            # Email, password rules
│   ├── tokenManager.ts          # JWT handling
│   └── index.ts
└── index.ts                     # Public exports
```

**Adding a New Feature:**
1. Create folder in `src/features/`
2. Create subdirectories: components, hooks, services, store, types, utils
3. Add `index.ts` that exports public API
4. Import in pages or other features

#### src/pages/ - Route Components (36 pages)

**Purpose:** Page-level components, one per route

```
src/pages/
├── auth/
│   ├── login/
│   │   ├── page.tsx             # Login page
│   │   └── index.ts
│   ├── register/
│   │   ├── page.tsx             # Register page
│   │   └── index.ts
│   └── reset-password/
├── dashboard/
│   ├── page.tsx                 # Dashboard
│   └── index.ts
├── tournaments/
│   ├── page.tsx                 # List view
│   ├── [id]/
│   │   ├── page.tsx             # Detail view
│   │   ├── edit/page.tsx        # Edit view
│   │   └── index.ts
│   └── index.ts
├── teams/
├── players/
├── settings/
├── profile/
├── notifications/
├── communication/
├── search/
├── analytics/
├── billing/
├── audit-log/
├── about/
├── contact/
├── accessibility/
└── ... (19 more pages)
```

**Page Responsibilities:**
- Route-level component (matches URL path)
- Compose features and shared components
- Handle route parameters
- Load initial data
- Layout selection (AuthLayout, DashboardLayout, etc.)

#### src/shared/ - Reusable Assets

**Purpose:** Components, hooks, types, utilities used across features

```
src/shared/
├── components/
│   ├── ui/
│   │   ├── Button.tsx           # Reusable button
│   │   ├── Card.tsx             # Card container
│   │   ├── Input.tsx            # Form input
│   │   ├── Select.tsx           # Dropdown
│   │   ├── Modal.tsx            # Modal dialog
│   │   ├── Table.tsx            # Data table
│   │   ├── Badge.tsx            # Label badge
│   │   ├── Skeleton.tsx         # Loading placeholder
│   │   ├── Tooltip.tsx          # Tooltip
│   │   ├── Tabs.tsx             # Tab navigation
│   │   └── index.ts
│   ├── navigation/
│   │   ├── Header.tsx           # Top bar
│   │   ├── Sidebar.tsx          # Side navigation
│   │   ├── Breadcrumb.tsx       # Breadcrumb trail
│   │   └── index.ts
│   └── index.ts
├── hooks/
│   ├── useAuth.ts               # Auth state
│   ├── useForm.ts               # Form state
│   ├── useWindowSize.ts         # Window size tracking
│   ├── usePagination.ts         # Pagination logic
│   ├── useLocalStorage.ts       # Local storage
│   ├── useDarkMode.ts           # Dark mode toggle
│   └── index.ts
├── types/
│   ├── common.types.ts          # Shared types
│   ├── api.types.ts             # API response types
│   └── index.ts
├── constants/
│   ├── app.constants.ts         # App-wide constants
│   ├── routes.constants.ts      # Route paths
│   ├── errors.constants.ts      # Error messages
│   └── index.ts
└── utils/
    ├── formatters.ts            # Format data
    ├── validators.ts            # Validation rules
    ├── helpers.ts               # General helpers
    └── index.ts
```

#### src/store/ - State Management

**Purpose:** Zustand stores for client-side state

```
src/store/
├── authStore.ts                 # User, token, isAuthenticated
├── tournamentStore.ts           # Current tournament, filters
├── scoringStore.ts              # Active match, score state
├── uiStore.ts                   # Theme, sidebar, notifications
└── index.ts
```

**Each Store Pattern:**
```typescript
// authStore.ts
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));
```

#### src/lib/ - Core Utilities

**Purpose:** Centralized setup for HTTP, logging, env

```
src/lib/
├── axios.ts                     # HTTP client + interceptors
├── env.ts                        # Environment validation
├── logger.ts                     # Centralized logging
├── socket.ts                     # WebSocket setup
└── index.ts
```

**Key Responsibilities:**
- `axios.ts` - Auth header injection, error handling
- `socket.ts` - Connection management, event handlers
- `env.ts` - Ensure required env vars exist
- `logger.ts` - Console/file logging

#### src/styles/ - CSS & Animations

```
src/styles/
├── globals.css                  # Global styles
├── animations.css               # Reusable animations
├── variables.css                # CSS custom properties
├── tailwind.css                 # Tailwind imports
└── index.css                    # Barrel export
```

**Design Tokens in CSS Variables:**
```css
/* Colors */
--brand-primary: #7F1D1D        /* Maroon */
--brand-secondary: #1F2937      /* Gray */
--color-success: #16A34A        /* Green */
--color-error: #DC2626          /* Red */
--color-warning: #EA8C00        /* Orange */

/* Spacing */
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px

/* Typography */
--font-family-sans: system-ui, -apple-system, sans-serif
--font-size-sm: 14px
--font-size-base: 16px
--font-size-lg: 18px
```

#### src/tests/ - Test Files

```
src/tests/
├── unit/
│   ├── auth.test.ts             # Auth logic tests
│   ├── scoring.test.ts          # Scoring tests
│   ├── stores.test.ts           # Zustand store tests
│   ├── hooks.test.ts            # Custom hook tests
│   ├── utils.test.ts            # Utility tests
│   └── components.test.tsx      # Component tests
├── integration/
│   ├── login-flow.test.ts       # End-to-end flows
│   ├── offline-sync.test.ts
│   └── real-time.test.ts
├── mocks/
│   ├── data.ts                  # Mock API data
│   ├── handlers.ts              # MSW handlers
│   └── index.ts
└── setup.ts                     # Test environment
```

#### src/assets/ - Static Files

```
src/assets/
├── icons/                       # SVG icons (Lucide)
├── images/                      # PNG, JPG, WebP
├── illustrations/               # Custom illustrations
└── videos/                       # Demo videos
```

#### src/workers/ - Web Workers

```
src/workers/
├── sync.worker.ts              # Background sync
├── compression.worker.ts       # Data compression
└── index.ts
```

**Purpose:** Offload heavy work from main thread

### Build Output

```
dist/
├── index.html                   # Entry HTML
├── assets/
│   ├── index-xxxxx.js           # Main bundle
│   ├── vendor-react-xxxxx.js    # React chunk
│   ├── vendor-utils-xxxxx.js    # Utils chunk
│   ├── page-dashboard-xxxxx.js  # Lazy page
│   └── style-xxxxx.css          # Styles
└── sw.js                        # Service worker
```

**Characteristics:**
- Minified and gzipped (~150KB total)
- Code split by route
- Vendor chunks separated
- Cache-busted with content hashes

### Testing Directories

```
e2e/                            # Playwright tests
├── auth.spec.ts                # Login flow tests
├── scoring.spec.ts             # Scoring tests
└── fixtures/                   # Test data
```

### Configuration Files

```
.storybook/
├── main.ts                      # Storybook config
├── preview.ts                   # Component preview
└── stories/                     # Component stories

.husky/                          # Git hooks
├── pre-commit                   # Run lint before commit
└── pre-push                     # Run tests before push

.vscode/                         # VS Code settings
├── extensions.json              # Recommended extensions
├── settings.json                # Editor config
└── launch.json                  # Debugger config
```

---

## design-system/ - Design Tokens

```
design-system/
├── khelsetu/
│   ├── colors.ts                # Color palette
│   ├── typography.ts            # Font sizes, weights
│   ├── spacing.ts               # Padding, margin scale
│   ├── shadows.ts               # Elevation system
│   └── components.ts            # Component specs
└── pages/                       # Design documentation
```

---

## docs/ - Documentation

```
docs/
├── README.md                    # Docs index
├── GETTING_STARTED.md           # Setup guide
├── ARCHITECTURE.md              # System design
├── PROJECT_STRUCTURE.md         # This file
├── API_INTEGRATION_GUIDE.md     # Backend contracts
├── DESIGN_SYSTEM.md             # Design tokens
├── DEPLOYMENT.md                # Deploy instructions
└── ui-ux/
    ├── LOGIN_DESIGN.md          # Login UX specs
    ├── IMPLEMENTATION_STATUS.md  # Progress tracking
    └── ACCESSIBILITY.md         # WCAG compliance
```

---

## Key Statistics

| Metric | Count |
|--------|-------|
| React Components | 150+ |
| Custom Hooks | 30+ |
| Feature Modules | 26 |
| Pages/Routes | 36 |
| Zustand Stores | 4 |
| TypeScript Files | 427 |
| Test Files | 24+ |
| CSS Variables | 50+ |
| API Endpoints | 30+ |
| WebSocket Events | 15+ |

---

## Quick Navigation

### For Frontend Developers
- Start: `docs/GETTING_STARTED.md`
- Architecture: `docs/ARCHITECTURE.md`
- Components: `src/shared/components/`
- Styling: `src/styles/`

### For Backend Developers
- Integration: `docs/API_INTEGRATION_GUIDE.md`
- Types: `src/shared/types/`
- API Usage: See feature `services/` folders

### For Designers
- System: `docs/DESIGN_SYSTEM.md`
- Components: `npm run storybook`
- Tokens: `src/styles/variables.css`

### For DevOps
- Build: `npm run build`
- Deploy: `docs/DEPLOYMENT.md`
- Env: `.env.example`

---

**Next:** See individual docs for deep dives on specific areas.
