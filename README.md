# KhelSetu

![CI](https://github.com/Ashish-6-24/khelsetu-platform/actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6.svg)

A production-grade sports tournament management platform built with React, TypeScript, and Vite.

## Features

- **Live Scoring** — Real-time match updates for Cricket, Football, Volleyball, Basketball
- **Tournament Management** — Create, schedule, and manage tournaments with bracket generation
- **Team & Player Management** — Complete rosters, player profiles, and team analytics
- **Live Broadcast** — WebSocket-powered live match streaming with overlays
- **Standings & Statistics** — Dynamic league tables and detailed match analytics
- **Offline Support** — Service worker caching for offline-first experience
- **Dark Mode** — System-aware theme switching with smooth transitions
- **Mobile-First** — Responsive design optimized for touch devices

## Tech Stack

| Category  | Technology            |
| --------- | --------------------- |
| Framework | React 19 + TypeScript |
| Build     | Vite 8                |
| State     | Zustand               |
| Routing   | React Router v7       |
| Styling   | Tailwind CSS v4       |
| Testing   | Vitest + Playwright   |
| API       | Axios + React Query   |
| Real-time | Socket.IO             |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## Project Structure

```
src/
├── app/                  # Layouts, providers, router
├── assets/               # Static images, icons, illustrations, videos
├── features/             # 26 feature modules (self-contained)
│   ├── auth/             # Authentication, login, register
│   ├── billing/          # Payment, subscriptions
│   ├── brackets/         # Tournament bracket generation
│   ├── broadcast/        # Live match broadcasting
│   ├── certificates/     # Certificate generation
│   ├── dashboard/        # Dashboard, landing page
│   ├── events/           # Match events and timeline
│   ├── formation/        # Team formation builder
│   ├── i18n/             # Internationalization
│   ├── media-gallery/    # Match photos and videos
│   ├── news/             # Sports news feed
│   ├── notifications/    # Push notifications
│   ├── offline-sync/     # Offline data sync
│   ├── overlays/         # Broadcast overlays
│   ├── players/          # Player management
│   ├── reports/          # Match reports
│   ├── scoring/          # Live scoring engine
│   ├── search/           # Global search
│   ├── standings/        # League tables
│   ├── statistics/       # Match analytics
│   ├── teams/            # Team management
│   ├── tournaments/      # Tournament CRUD
│   ├── venues/           # Venue management
│   └── websocket/        # Real-time connection
├── mocks/                # MSW handlers, factories, browser/server setup
├── shared/               # Generic UI, hooks, utils, types
│   ├── ui/               # Button, Modal, Input, Card, etc.
│   ├── hooks/            # useDebounce, useMediaQuery, etc.
│   ├── utils/            # Date formatting, calculations
│   ├── lib/              # Axios, logger, queryClient
│   └── types/            # Global TypeScript types
├── state/                # Zustand stores
├── tests/                # Unit + integration tests
├── theme/                # CSS files, design tokens
└── workers/              # Web workers
```

## Scripts

| Command                 | Description                                               |
| ----------------------- | --------------------------------------------------------- |
| `npm run dev`           | Start dev server with MSW mocks                           |
| `npm run build`         | Production build                                          |
| `npm run preview`       | Preview production build                                  |
| `npm run lint`          | Run ESLint                                                |
| `npm run format`        | Format with Prettier                                      |
| `npm run typecheck`     | TypeScript type checking                                  |
| `npm run test`          | Run unit tests                                            |
| `npm run test:run`      | Run tests once                                            |
| `npm run test:coverage` | Run tests with coverage                                   |
| `npm run test:e2e`      | Run Playwright E2E tests                                  |
| `npm run validate`      | Run all checks (lint + format + typecheck + test + build) |

## Architecture

- **Feature-Based Structure** — Each feature is self-contained with its own components, hooks, services, and types
- **Barrel Exports** — Features expose public API through `index.ts` files
- **Shared Layer** — Zero business logic, reusable across all features
- **Path Aliases** — Clean imports via `@/` prefix

## License

MIT
