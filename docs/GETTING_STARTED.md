# Getting Started with KhelSetu Frontend

**Last Updated:** July 1, 2026 | **Status:** Ready for Development

---

## Prerequisites

- **Node.js:** 18.0.0 or higher
- **npm:** 9.0.0 or higher
- **Git:** 2.40.0 or higher
- **Backend API:** Running at `http://localhost:8080` (configurable)

Check your versions:

```bash
node --version    # Should be v18+
npm --version     # Should be v9+
git --version     # Should be v2.40+
```

---

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/khelsetu/khelsetu.git
cd khelsetu/khelsetu-frontend
```

### 2. Install Dependencies

```bash
npm install
```

This installs all packages specified in `package.json`:

- React 19, Vite 8, TypeScript 6
- Tailwind CSS, React Router, Zustand
- Testing: Vitest, Playwright

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your local settings:

```env
# Backend API
VITE_API_URL=http://localhost:8080
VITE_WS_URL=ws://localhost:8080

# App Settings
VITE_APP_NAME=KhelSetu
VITE_APP_ENV=development
```

**⚠️ Important:** Never commit `.env` with secrets. Use `.env.local` for local-only overrides.

---

## Running Locally

### Development Server

```bash
npm run dev
```

This starts Vite dev server at `http://localhost:5173` with:

- Hot Module Replacement (HMR)
- Real-time validation
- Console error reporting

### Production Build

```bash
npm run build
```

Creates optimized production build in `dist/` folder:

- TypeScript type checking
- Minification and code splitting
- Performance optimizations

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

---

## Common Commands

| Command                 | Purpose            | Usage                |
| ----------------------- | ------------------ | -------------------- |
| `npm run dev`           | Start dev server   | Daily development    |
| `npm run build`         | Production build   | Before deployment    |
| `npm run preview`       | Test prod build    | Verify before deploy |
| `npm run lint`          | ESLint check       | Check code quality   |
| `npm run lint:fix`      | Fix lint issues    | Auto-fix problems    |
| `npm run format`        | Prettier format    | Code formatting      |
| `npm run typecheck`     | TypeScript check   | Verify types         |
| `npm run test`          | Unit tests (watch) | Run tests during dev |
| `npm run test:run`      | Unit tests once    | CI/CD pipelines      |
| `npm run test:coverage` | Tests + coverage   | Check test coverage  |
| `npm run test:e2e`      | E2E tests          | Browser automation   |
| `npm run storybook`     | Component library  | Design system        |
| `npm run validate`      | Full validation    | Pre-commit check     |

---

## Project Structure Quick Reference

```
khelsetu-frontend/
├── src/
│   ├── app/              # Providers, layouts, router
│   ├── features/         # Feature modules (auth, scoring, etc)
│   ├── pages/            # Page-level components (routes)
│   ├── shared/           # Reusable components, hooks, types
│   ├── store/            # Zustand state management
│   ├── lib/              # Core utilities (axios, logger, env)
│   ├── assets/           # Images, icons, videos
│   ├── styles/           # CSS, animations, Tailwind
│   ├── tests/            # Unit and integration tests
│   └── workers/          # Web Workers
├── .storybook/           # Component documentation
├── public/               # Static files
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Build configuration
└── vitest.config.ts      # Test configuration
```

See `PROJECT_STRUCTURE.md` for detailed breakdown.

---

## Troubleshooting

### Issue: Port 5173 Already in Use

```bash
# Kill existing process and restart
npm run dev -- --port 5174
```

### Issue: TypeScript Errors After npm install

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run typecheck
```

### Issue: Dependencies Conflict

```bash
# Check for peer dependency issues
npm audit

# Fix security vulnerabilities
npm audit fix
```

### Issue: Build Fails with "Module not found"

```bash
# Ensure all dependencies installed
npm install

# Clear build cache
rm -rf dist node_modules/.vite

# Rebuild
npm run build
```

### Issue: Tests Failing After Changes

```bash
# Run tests in watch mode
npm run test

# Run specific test file
npm run test -- src/tests/unit/auth.test.ts

# Generate coverage report
npm run test:coverage
```

---

## Working with Features

Each feature module in `src/features/` is self-contained:

```
src/features/auth/
├── components/         # Auth-specific components
├── hooks/              # Auth-specific hooks
├── services/           # API calls for auth
├── store/              # Auth state (Zustand)
├── types/              # TypeScript types
└── utils/              # Helper functions
```

To add a feature:

1. Create new folder in `src/features/`
2. Follow same structure as existing features
3. Export components/hooks from `index.ts`
4. Import in pages or other features

---

## Testing

### Unit Tests

```bash
npm run test              # Watch mode
npm run test:run          # Single run
npm run test:coverage     # With coverage
```

Tests are in `src/tests/unit/` and `src/tests/integration/`.

### E2E Tests

```bash
npm run test:e2e
```

Tests are in `e2e/` folder using Playwright.

### Manual Testing Checklist

- [ ] Forms validate correctly
- [ ] Authentication works
- [ ] Real-time updates work
- [ ] Dark mode toggle works
- [ ] Mobile layout responsive (375px, 768px, 1440px)
- [ ] Accessibility (tab navigation, screen readers)

---

## Code Quality

### Linting

```bash
npm run lint          # Check issues
npm run lint:fix      # Auto-fix issues
```

### Type Checking

```bash
npm run typecheck
```

Always fix type errors before committing.

### Formatting

```bash
npm run format
```

Uses Prettier for consistent code style.

### Full Validation (Pre-commit)

```bash
npm run validate
```

Runs: lint + format + typecheck + test + build

---

## Git Workflow

### Before Committing

```bash
npm run validate    # Ensure everything passes
git status          # Check changes
git diff            # Review changes
git add .
git commit -m "feat: description of changes"
```

### Pushing Changes

```bash
git push origin your-branch-name
```

Then create a Pull Request on GitHub.

---

## Environment-Specific Configuration

### Development (.env)

```env
VITE_API_URL=http://localhost:8080
VITE_APP_ENV=development
VITE_ENABLE_DEBUGGING=true
```

### Staging (.env.staging)

```env
VITE_API_URL=https://api-staging.khelsetu.com
VITE_APP_ENV=staging
VITE_ENABLE_DEBUGGING=false
```

### Production (.env.production)

```env
VITE_API_URL=https://api.khelsetu.com
VITE_APP_ENV=production
VITE_ENABLE_DEBUGGING=false
```

---

## Performance Tips

- Use `npm run analyze` to check bundle size
- Enable browser DevTools profiler for component analysis
- Check Network tab for slow API requests
- Use React DevTools to inspect component hierarchy

---

## Need Help?

1. Check `docs/ARCHITECTURE.md` for system design
2. Check `docs/API_INTEGRATION_GUIDE.md` for backend contracts
3. Check `docs/DESIGN_SYSTEM.md` for design tokens
4. Read error messages carefully - they often point to exact issue
5. Search GitHub issues for similar problems
6. Ask on team Slack channel

---

**Next:** Ready to develop? Start with `npm run dev` and open `http://localhost:5173`!
