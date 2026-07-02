# KhelSetu Architecture Guide

**Last Updated:** July 1, 2026 | **Status:** Production Ready

---

## System Overview

KhelSetu is a production-grade, real-time multi-tenant sports tournament management platform. The frontend is a React 19 SPA that communicates with a Node.js backend via REST API and WebSocket.

```
┌─────────────────────────────────────────────────────────┐
│  Browser (React 19 SPA)                                 │
├─────────────────────────────────────────────────────────┤
│  Pages (36 routes)                                      │
│  ↓                                                      │
│  Features (26 modules) → Shared (components, hooks)    │
│  ↓                                                      │
│  State Management (Zustand + React Query)              │
│  ↓                                                      │
│  HTTP Client (Axios) + WebSocket (Socket.IO)           │
└─────────────────────────────────────────────────────────┘
         ↓ REST API                    ↓ WebSocket
┌─────────────────────────────────────────────────────────┐
│  Backend API (Node.js)                                  │
├─────────────────────────────────────────────────────────┤
│  Authentication → Database                             │
│  Tournament Management                                  │
│  Real-time Scoring                                      │
│  User Management                                        │
└─────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Core Framework
- **React 19** - UI framework with latest features
- **Vite 8** - Lightning-fast build tool (100ms rebuilds)
- **TypeScript 6** - Type safety across entire codebase
- **Node.js 18+** - Runtime requirement

### State Management
- **Zustand** - Client-side state (lightweight, no boilerplate)
- **React Query (TanStack)** - Server state (caching, sync)

### Routing & Navigation
- **React Router 7** - Client-side routing
- **Layouts** - AuthLayout, DashboardLayout, LandingLayout

### Styling
- **Tailwind CSS 4** - Utility-first CSS
- **CSS Variables** - Design system tokens
- **Dark Mode** - Via CSS media query + manual toggle

### HTTP & Real-time
- **Axios** - REST API client with interceptors
- **Socket.IO Client** - WebSocket for live updates

### Forms & Validation
- **React Hook Form** - Lightweight form management
- **Zod** - Runtime validation schema

### Animations
- **Framer Motion** - Component animations
- **CSS Animations** - Simple transitions

### Utilities
- **Lucide React** - 500+ consistent icons
- **Recharts** - Data visualization
- **date-fns** - Date manipulation

### Testing & QA
- **Vitest** - Unit tests (Jest-compatible)
- **Playwright** - E2E tests (multi-browser)
- **jsdom** - DOM simulation for tests

### Development
- **ESLint** - Code quality
- **Prettier** - Code formatting
- **Storybook** - Component library

---

## Architectural Patterns

### 1. Feature-Sliced Design (FSD)

Each feature is self-contained with:
- Components (UI)
- Hooks (logic)
- Services (API)
- Store (state)
- Types (TypeScript)
- Utils (helpers)

```
src/features/auth/
├── components/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── PasswordReset.tsx
├── hooks/
│   ├── useLogin.ts
│   ├── useRegister.ts
│   └── useAuth.ts
├── services/
│   └── authService.ts
├── store/
│   └── authStore.ts
├── types/
│   └── auth.types.ts
├── utils/
│   └── validators.ts
└── index.ts
```

**Benefit:** Features are modular, reusable, independently testable.

### 2. Dual State Management

**Zustand** - Client state (UI, user preferences):
```typescript
// Persists to localStorage
const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user) => set({ isAuthenticated: true, user }),
}));
```

**React Query** - Server state (tournaments, matches, scores):
```typescript
// Caches server data, handles sync
const { data: tournaments } = useQuery({
  queryKey: ['tournaments'],
  queryFn: () => api.getTournaments(),
});
```

**Why:** Clear separation - UI state vs. data state.

### 3. Real-time Architecture

**WebSocket Events** for live updates:
```typescript
// Subscribe to match updates
socket.emit('subscribe:match', { matchId: '123' });
socket.on('match:score_update', (data) => {
  updateMatchScore(data);
  // UI updates automatically via React Query
});
```

**Benefits:**
- Instant score updates
- No polling (efficient)
- Bidirectional communication

### 4. Type Safety

**End-to-end TypeScript:**
- Strict mode enabled
- No `any` types allowed
- Zod schemas for runtime validation
- Domain types in `src/types-domain/`

```typescript
// Backend API contract
interface Tournament {
  id: string;
  name: string;
  startDate: Date;
  sport: Sport;
}

// Frontend types
type TournamentForm = Omit<Tournament, 'id'>;
```

---

## Data Flow

### Authentication Flow

```
1. User enters credentials
   ↓
2. LoginForm component validates (Zod)
   ↓
3. useLogin hook calls authService.login()
   ↓
4. Axios sends POST /api/auth/login
   ↓
5. Backend returns { token, user }
   ↓
6. Zustand authStore saves token (localStorage)
   ↓
7. axios instance adds Authorization header
   ↓
8. Protected routes check authStore.isAuthenticated
   ↓
9. User redirected to dashboard
```

### Real-time Scoring Flow

```
1. User updates score in ScoringPanel
   ↓
2. onChange handler validates update
   ↓
3. Sends to backend via API
   ↓
4. Backend broadcasts via WebSocket: match:score_update
   ↓
5. Socket listener updates React Query cache
   ↓
6. Components re-render with new data
   ↓
7. All subscribed clients see update instantly
```

---

## Key Modules

### 1. Authentication (src/features/auth/)
- Email/password login
- Registration with email verification
- Password reset flow
- OAuth integration ready
- Session management

### 2. Tournaments (src/features/tournaments/)
- CRUD operations
- Bracket generation
- Team/player assignment
- Match scheduling
- Status tracking

### 3. Scoring (src/features/scoring/)
- Live score updates
- Multi-sport support (Cricket, Football, Volleyball, Basketball)
- Undo/redo history
- Event logging

### 4. Real-time (Socket.IO)
- Match updates
- Score broadcasts
- Notifications
- Presence tracking

### 5. Offline Sync (src/features/offline-sync/)
- Web Worker sync queue
- Connectivity detection
- Automatic retry
- Conflict resolution

### 6. Billing (src/features/billing/)
- Subscription plans
- Payment processing
- Invoice management
- Usage tracking

---

## Performance Optimizations

### 1. Code Splitting
```typescript
// Routes are lazy-loaded
const Dashboard = lazy(() => import('../pages/dashboard'));
const Tournaments = lazy(() => import('../pages/tournaments'));
```

**Result:** Initial bundle ~80KB, pages load on demand.

### 2. Vendor Chunking
```javascript
// vite.config.ts
rollupOptions: {
  output: {
    manualChunks: {
      'vendor-react': ['react', 'react-dom'],
      'vendor-utils': ['axios', 'zustand'],
    },
  },
}
```

**Result:** React updates don't invalidate utils cache.

### 3. React Query Caching
```typescript
// 5-minute stale time
queryClient.setDefaultOptions({
  queries: {
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  },
});
```

**Result:** No unnecessary API calls.

### 4. Component Memoization
```typescript
export const TournamentCard = memo(({ tournament }) => (
  <div>{tournament.name}</div>
));
```

**Result:** Re-renders only when props change.

### 5. Image Optimization
- SVG icons (no HTTP requests)
- WebP format for images
- Lazy loading for below-fold images

---

## Directory Structure Deep Dive

### src/app/
- **layouts/** - AuthLayout, DashboardLayout, LandingLayout
- **providers/** - AppProviders, AuthProvider, QueryProvider
- **router/** - Route definitions, ProtectedRoute wrapper

### src/features/
26 self-contained feature modules:
- auth, tournaments, teams, players, scoring
- live-broadcast, offline-sync, billing
- notifications, communication, search, etc.

Each follows FSD pattern.

### src/pages/
36 route-level components:
- /auth/login, /auth/register
- /dashboard, /tournaments, /teams
- /settings, /profile, etc.

### src/shared/
- **components/** - Reusable UI (Button, Card, Input, Table)
- **hooks/** - useAuth, useForm, useWindowSize, etc.
- **types/** - Domain types, interfaces, enums
- **utils/** - formatDate, validateEmail, etc.
- **constants/** - App-wide constants

### src/store/
Zustand stores:
- authStore (user, token, isAuthenticated)
- tournamentStore (current tournament, filters)
- scoringStore (active match, score state)
- uiStore (theme, sidebar open, etc.)

### src/lib/
- **axios.ts** - HTTP client setup + interceptors
- **env.ts** - Environment variable validation
- **logger.ts** - Centralized logging
- **socket.ts** - WebSocket connection

### src/tests/
- unit/ - Component and utility tests
- integration/ - Feature workflow tests
- mocks/ - Mock data and API responses
- setup.ts - Test environment config

---

## API Integration Points

### REST Endpoints Used

```
GET    /api/auth/user           # Current user
POST   /api/auth/login          # Login
POST   /api/auth/logout         # Logout
POST   /api/auth/refresh        # Refresh token

GET    /api/tournaments         # List tournaments
GET    /api/tournaments/:id     # Tournament details
POST   /api/tournaments         # Create tournament
PUT    /api/tournaments/:id     # Update tournament
DELETE /api/tournaments/:id     # Delete tournament

GET    /api/matches/:id/scores  # Live scores
PUT    /api/matches/:id/scores  # Update scores

GET    /api/notifications       # User notifications
POST   /api/notifications/read  # Mark as read
```

See `docs/API_INTEGRATION_GUIDE.md` for complete contract.

---

## Deployment Strategy

### Development
- `npm run dev` - Vite dev server with HMR
- API: http://localhost:8080

### Production Build
- `npm run build` - Type-check + minify + split
- Output: dist/ folder (static files)
- Size: ~150KB gzipped (optimized)

### Hosting Options
1. **Vercel** - Built-in SPA support
2. **Netlify** - Auto-deploy on git push
3. **AWS S3 + CloudFront** - CDN distribution
4. **Docker** - Container deployment

---

## Security Considerations

- ✅ HTTPS only in production
- ✅ Authorization headers in API calls
- ✅ Token refresh before expiry
- ✅ CORS configured on backend
- ✅ Input validation (Zod runtime)
- ✅ XSS protection (React escapes by default)
- ✅ CSRF token if needed (check backend)
- ✅ Secrets in environment variables (never hardcoded)

---

## Next Steps

- See `docs/GETTING_STARTED.md` for local setup
- See `docs/API_INTEGRATION_GUIDE.md` for backend contracts
- See `docs/DESIGN_SYSTEM.md` for design tokens
- Read source code - it's well commented!

---

**Questions?** Ask on team Slack or check GitHub issues.
