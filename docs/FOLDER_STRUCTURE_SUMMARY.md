# KhelSetu Folder Structure - Executive Summary

**Date:** 2026-07-01
**Status:** Complete Audit & Recommendations Provided
**Document:** BACKEND_FOLDER_STRUCTURE_GUIDE.md (770 lines)

## What Was Delivered

A comprehensive 770-line backend developer guide covering:

1. **Complete folder structure documentation** - All directories mapped with purposes
2. **28 feature modules cataloged** - With organization patterns identified
3. **Duplication analysis** - 6 critical issues identified
4. **Recommended fixes** - Prioritized roadmap with implementation steps
5. **Integration checklist** - Backend readiness criteria

## Key Findings

### Folder Organization
- **Root level:** khelsetu-frontend, design-system, docs, graphify-out, .opencode, .superpowers
- **Frontend structure:** src/ with app/, features/, pages/, shared/, lib/, store/, styles/, assets/, tests/
- **28 Feature modules** - Domain-driven architecture with components, hooks, services, types, utils

### Critical Issues Identified

| Issue | Severity | Impact |
|-------|----------|--------|
| 6 features missing standard subdirectories | HIGH | Backend integration confusion |
| Documentation scattered in 3+ locations | HIGH | No single source of truth |
| Store architecture unclear (global vs feature) | HIGH | State conflict risk |
| Asset organization ambiguous | MEDIUM | File duplication risk |
| Test placement strategy undocumented | MEDIUM | Inconsistent testing |
| Root config file sprawl | LOW | Maintenance burden |

### Recommended Priority Fixes

**Priority 1 (This Week):**
1. Standardize all 28 feature modules to consistent structure
2. Create docs/STATE_MANAGEMENT.md documenting store architecture
3. Create docs/CONFIGURATION.md explaining all root configs

**Priority 2 (This Sprint):**
1. Consolidate documentation to docs/design/, docs/api/, docs/features/
2. Clarify asset organization: public/icons/ vs src/assets/icons/
3. Create docs/TESTING.md documenting centralized test strategy

**Priority 3 (Optional):**
1. Reorganize root config files to ./config/ (for better UX)
2. Archive outdated documentation

## Implementation Checklist

Before backend developers integrate:

```
Folder Structure:
✓ All 28 features follow: components/, hooks/, services/, types/, utils/
✓ All features have index.ts barrel exports
✓ No incomplete feature modules

Documentation:
✓ docs/STATE_MANAGEMENT.md created & reviewed
✓ docs/design/ is single source for design tokens
✓ docs/api/ is single source for API specs
✓ docs/CONFIGURATION.md explains all root configs

Assets:
✓ public/icons/ = PWA icons only
✓ src/assets/icons/ = component SVG icons
✓ No duplication across icon directories

Testing:
✓ All tests in src/tests/ (centralized)
✓ No co-located .test.ts files outside src/tests/
✓ docs/TESTING.md documents strategy

State Management:
✓ Global store = authStore, uiStore, tournamentStore, scoringStore
✓ Feature stores = billing, notifications, standings, tournaments, websocket
✓ No state duplication between layers
✓ Clear documentation on which store to use
```

## Quick Reference

**Finding Code:**
- API calls → src/features/[feature]/services/
- Component props → src/features/[feature]/types/
- Hooks → src/features/[feature]/hooks/
- Utilities → src/features/[feature]/utils/
- Shared UI → src/shared/components/
- Global state → src/store/
- Feature state → src/features/[feature]/store/

**Finding Docs:**
- Design tokens → docs/design/TOKENS.md
- API endpoints → docs/api/endpoints.md
- State management → docs/STATE_MANAGEMENT.md
- Testing strategy → docs/TESTING.md
- Configuration → docs/CONFIGURATION.md

## Next Steps

1. **Review** BACKEND_FOLDER_STRUCTURE_GUIDE.md (770 lines)
2. **Prioritize** fixes based on implementation roadmap
3. **Execute** Priority 1 fixes this week
4. **Complete** full checklist before backend integration
5. **Update** guide as changes are made

---

**Location:** /home/ashish-subedi/khelsetu/BACKEND_FOLDER_STRUCTURE_GUIDE.md
**Size:** 770 lines
**Audience:** Backend developers, project leads, DevOps engineers
