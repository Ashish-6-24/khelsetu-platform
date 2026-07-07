# KhelSetu

A sports league management platform built with React, TypeScript, and Vite.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build:** Vite
- **State:** Zustand
- **Routing:** React Router v6
- **Styling:** Tailwind CSS + CSS variables (design tokens)
- **Testing:** Vitest + React Testing Library
- **API:** Axios + React Query

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── app/              # Layouts, providers, router (was core/)
├── features/         # 26 feature modules (self-contained)
│   ├── auth/         # Authentication, login, register
│   ├── billing/      # Payment, subscriptions
│   ├── dashboard/    # Dashboard, landing, about, contact
│   ├── players/      # Player management
│   ├── scoring/      # Live scoring, match management
│   ├── teams/        # Team management
│   ├── tournaments/  # Tournament CRUD, brackets, schedule
│   └── ...           # One folder per feature
├── shared/           # Generic UI, hooks, utils, types
│   ├── ui/           # Button, Modal, Input, Card, etc.
│   ├── hooks/        # useDebounce, useLocalStorage, etc.
│   ├── utils/        # Date formatting, string helpers
│   ├── lib/          # Axios, env, logger, queryClient
│   └── types/        # Global TypeScript types
├── state/            # Zustand stores
├── tests/            # Unit + integration tests
├── theme/            # CSS files, design tokens
└── workers/          # Web workers
```

## Scripts

| Command                 | Description              |
| ----------------------- | ------------------------ |
| `npm run dev`           | Start dev server         |
| `npm run build`         | Production build         |
| `npm run preview`       | Preview production build |
| `npm run lint`          | Run ESLint               |
| `npm run test`          | Run tests                |
| `npm run test:ui`       | Run tests with UI        |
| `npm run test:coverage` | Run tests with coverage  |

## License

Private
