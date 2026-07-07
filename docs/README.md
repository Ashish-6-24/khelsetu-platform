# KhelSetu Documentation Index

**Last Updated:** July 1, 2026 | **Status:** Complete

---

## Quick Navigation

### For First-Time Setup

1. Start here: **GETTING_STARTED.md** (15 min read)
2. Understand system: **ARCHITECTURE.md** (20 min read)
3. Explore code: **PROJECT_STRUCTURE.md** (15 min read)

### For Frontend Developers

- **ARCHITECTURE.md** - System design, patterns, data flow
- **PROJECT_STRUCTURE.md** - Folder organization, what goes where
- **DESIGN_SYSTEM.md** - Colors, typography, components
- **ui-ux/LOGIN_DESIGN.md** - UX specifications

### For Backend Developers

- **API_INTEGRATION_GUIDE.md** - All endpoints, WebSocket events
- **ARCHITECTURE.md** - Frontend expectations, data contracts
- Read `src/features/*/services/` for API usage examples

### For DevOps/Deployment

- **DEPLOYMENT.md** - Deploy to Vercel, Netlify, AWS, Docker
- **GETTING_STARTED.md** - Build commands, environment setup

### For Designers

- **DESIGN_SYSTEM.md** - Design tokens, colors, typography
- Run `npm run storybook` - Interactive component library
- `src/styles/` - CSS variables and animations

---

## Documentation Files

| File                               | Purpose                                    | Audience           | Read Time |
| ---------------------------------- | ------------------------------------------ | ------------------ | --------- |
| **GETTING_STARTED.md**             | Local setup, npm commands, troubleshooting | Everyone           | 15 min    |
| **ARCHITECTURE.md**                | Tech stack, patterns, real-time flow       | Devs               | 20 min    |
| **PROJECT_STRUCTURE.md**           | Folder organization, file purposes         | Devs               | 15 min    |
| **API_INTEGRATION_GUIDE.md**       | Backend endpoints, WebSocket events        | Backend/Full-stack | 20 min    |
| **DESIGN_SYSTEM.md**               | Design tokens, colors, components          | Designers/Frontend | 20 min    |
| **DEPLOYMENT.md**                  | Production deployment options              | DevOps/Full-stack  | 15 min    |
| **ui-ux/LOGIN_DESIGN.md**          | Login UX specifications                    | Frontend/Product   | 10 min    |
| **ui-ux/IMPLEMENTATION_STATUS.md** | What's done, what's pending                | Product/Lead       | 5 min     |
| **ui-ux/ACCESSIBILITY.md**         | WCAG compliance checklist                  | QA/Frontend        | 10 min    |

---

## Common Questions

### "How do I run the project locally?"

→ See **GETTING_STARTED.md** → Installation Steps

### "How does real-time scoring work?"

→ See **ARCHITECTURE.md** → Real-time Architecture section

### "Where do I add a new feature?"

→ See **PROJECT_STRUCTURE.md** → src/features/ section

### "What API endpoints do I need to build?"

→ See **API_INTEGRATION_GUIDE.md** → All endpoints listed

### "How do I deploy to production?"

→ See **DEPLOYMENT.md** → Deployment Options section

### "What are the design colors?"

→ See **DESIGN_SYSTEM.md** → Color Palette section

---

## Project Statistics

- **427 TypeScript/React files** in source
- **26 feature modules** in feature-sliced design
- **36 routes/pages** in application
- **150+ reusable components** in shared
- **4 Zustand stores** for state management
- **30+ custom hooks** for logic reuse
- **2,815 lines** of documentation (this folder)

---

## Key Technologies

**Frontend:** React 19, Vite 8, TypeScript 6, Tailwind CSS 4  
**State:** Zustand (client), React Query (server)  
**Real-time:** Socket.IO  
**Testing:** Vitest (unit), Playwright (E2E)  
**Routing:** React Router 7  
**Forms:** React Hook Form + Zod  
**Animations:** Framer Motion

See **ARCHITECTURE.md** for full tech stack.

---

## Important Patterns

### Feature-Sliced Design

Each feature in `src/features/` is self-contained:

- Components (UI)
- Hooks (logic)
- Services (API)
- Store (state)
- Types (definitions)
- Utils (helpers)

See **PROJECT_STRUCTURE.md** → src/features/ for examples.

### Dual State Management

- **Zustand** for UI state (auth, preferences)
- **React Query** for server state (data, caching)

See **ARCHITECTURE.md** → Dual State Management section.

### Real-time Architecture

WebSocket events for live score updates, no polling.

See **ARCHITECTURE.md** → Real-time Architecture section.

---

## Deployment Targets

- ✅ Vercel (recommended, zero-config)
- ✅ Netlify (git integration)
- ✅ AWS S3 + CloudFront (full control)
- ✅ Docker (containerization)
- ✅ Self-hosted (nginx, Apache)

See **DEPLOYMENT.md** for step-by-step guides.

---

## Support & Questions

**Team Slack:** #khelsetu-development  
**GitHub Issues:** github.com/khelsetu/khelsetu/issues  
**Code Examples:** See `src/features/auth/` for auth patterns

---

## Version History

| Version | Date       | Changes                        |
| ------- | ---------- | ------------------------------ |
| 1.0     | 2026-07-01 | Initial documentation complete |

---

**Last Updated:** July 1, 2026 | **Maintained By:** KhelSetu Team
