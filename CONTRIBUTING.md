# Contributing to KhelSetu

Thank you for your interest in contributing to KhelSetu!

## Development Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies: `npm install`
4. Start dev server: `npm run dev`

## Code Style

- TypeScript strict mode enforced
- ESLint + Prettier for formatting
- Follow existing patterns in the codebase

## Commit Convention

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: code style changes
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Run `npm run validate` to ensure all checks pass
4. Submit a pull request with a clear description

## Architecture

- **Features** are self-contained modules in `src/features/`
- **Shared** code lives in `src/shared/` (no business logic)
- **Imports** use path aliases (`@/features/...`, `@/shared/...`)
- **Barrel exports** through `index.ts` files

## Questions?

Open an issue for discussion before submitting large changes.
