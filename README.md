# KhelSetu Frontend

Production-grade real-time multi-tenant sports tournament management platform for Nepal.

## Tech Stack

- Runtime: Browser (ES2022+)
- Framework: React 19
- Build Tool: Vite 8
- Language: TypeScript 6
- Styling: Tailwind CSS v4
- Routing: React Router DOM v7
- State Management: Zustand (client), TanStack React Query (server)
- HTTP Client: Axios
- Real-time: Socket.IO Client
- Forms: React Hook Form + Zod
- Animations: Framer Motion
- Icons: Lucide React
- Charts: Recharts
- Testing: Vitest (unit), Playwright (E2E)
- Component Docs: Storybook

## Quick Start

### Prerequisites

- Node.js 18+

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your backend URL
```

### Development

```bash
# Start dev server
npm run dev
```

### Build

```bash
# Type-check and build for production
npm run build

# Preview production build
npm run preview
```


## Features

| Category | Features |
|----------|----------|
| Auth | Login, Register, Protected Routes |
| Dashboard | Overview, Stats, Quick Actions |
| Tournaments | CRUD, Bracket View, Detail, Edit |
| Teams | CRUD, Player Management, Detail |
| Players | CRUD, Profiles, Edit |
| Scoring | Live Scoring, Multi-sport Support (Cricket, Football, Volleyball, Basketball), Undo History |
| Standings | Auto-calculation, Tournament Rankings |
| Schedule | Match Scheduling, Calendar View |
| Venues | Venue Management |
| Live Broadcast | Streaming, Scoreboard Overlays |
| Analytics | Data Visualization, Reports |
| Billing | Subscription Plans, Payment Management |
| Notifications | Real-time Alerts, Notification Center |
| Communication | Messaging System |
| Search | Global Search |
| User Roles | Role/Permission Management |
| Audit Log | Activity Tracking |
| Data Import | Bulk Import Tools |
| Offline Sync | Offline Queue, Web Worker Sync |
| Accessibility | WCAG Compliance |

## Project Structure

```
src/
├── app/
│   ├── layouts/              # AuthLayout, DashboardLayout, LandingLayout
│   ├── providers/            # AppProviders, AuthProvider, QueryProvider
│   └── router/               # Route definitions
├── components/
│   ├── ui/                   # Reusable UI components (Button, Card, Input, etc.)
│   ├── scoring/              # Scoring UI components
│   ├── navigation/           # Header, Sidebar
│   └── ...                   # Feature-specific component groups
├── features/                  # Feature-sliced modules (14 features)
│   ├── auth/
│   ├── scoring/
│   ├── tournaments/
│   ├── billing/
│   ├── live-broadcast/
│   ├── offline-sync/
│   └── ...
├── pages/                     # Route-level page components (27 pages)
├── services/
│   ├── api/                   # REST API services
│   └── websocket/             # WebSocket service
├── store/                     # Zustand stores (auth, tournament, scoring, UI)
├── hooks/                     # Custom hooks
├── lib/                       # Core utilities (axios, env, logger)
├── types-domain/              # Domain type definitions
├── utils/                     # Shared utilities
└── workers/                   # Web Workers (sync)
```

## Architecture

- Pattern: Feature-Sliced Design
- Multi-tenancy: Organization-aware UI
- State: Dual strategy (Zustand for client, React Query for server)
- Real-time: Socket.IO for live scores and notifications
- Offline: Web Worker sync queue with connectivity detection
- Type Safety: Strict TypeScript, Zod runtime validation
- Performance: Code splitting, manual vendor chunks, PWA support

## Environment Variables

```env
VITE_API_URL=http://localhost:8080
VITE_WS_URL=ws://localhost:8080
VITE_APP_NAME=KhelSetu
VITE_APP_ENV=development
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format with Prettier |
| `npm run typecheck` | TypeScript type checking |
| `npm run test` | Run unit tests (watch) |
| `npm run test:run` | Run unit tests once |
| `npm run test:coverage` | Run tests with coverage |
| `npm run test:e2e` | Run E2E tests |
| `npm run storybook` | Start Storybook |
| `npm run validate` | Full validation (lint + format + typecheck + test + build) |
| `npm run analyze` | Bundle size analysis |

## Socket.IO Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `subscribe:match` | Client -> Server | Join match room |
| `match:score_update` | Server -> Client | Live score change |
| `match:status_change` | Server -> Client | Match started/ended |
| `scoring:event_added` | Server -> Client | New scoring event |
| `notification:new` | Server -> Client | Real-time notification |

## Testing

### Unit Tests

```bash
npm run test
```

- Framework: Vitest
- Environment: jsdom
- 24+ test files covering stores, components, utilities

### E2E Tests

```bash
npm run test:e2e
```

- Framework: Playwright
- Browsers: Chromium, Mobile Chrome

## Deployment

### Vercel

```bash
vercel deploy
```

### Manual

```bash
npm run build
# Serve dist/ with any static file server (nginx, Apache, etc.)
```

## License

MIT
