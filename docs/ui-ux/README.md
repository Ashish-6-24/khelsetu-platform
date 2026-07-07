# KhelSetu — Complete UI/UX Blueprint

> **Source of truth for the frontend team.**
> This document translates the entire KhelSetu backend API surface into a complete
> UI/UX specification. It is organised by the 35 deliverable sections in the
> product prompt and references the design system in `design-system/khelsetu/`.

## How to use this blueprint

1. **Design system** — Always read `design-system/khelsetu/MASTER.md` first. Then
   check `design-system/khelsetu/pages/<page>.md` for any per-page override.
2. **Architecture** — Section 02 (information architecture) defines the product
   topology. Section 03 (multi-tenant) defines how the UI scopes state.
3. **Screens & routes** — Section 26 defines the route map; `inventory/screens.md`
   lists every screen with purpose, role, endpoint, components, and states.
4. **Components & forms** — `inventory/components.md`, `inventory/forms.md`,
   `inventory/tables.md` are the buildable contract.
5. **Deep dives** — Per-module specs live in `modules/` and `scoring/`.

## Table of contents

| #   | Section                   | File                               |
| --- | ------------------------- | ---------------------------------- |
| 01  | Product overview          | `01-product-overview.md`           |
| 02  | Information architecture  | `02-information-architecture.md`   |
| 03  | Multi-tenant & org UX     | `modules/03-organizations.md`      |
| 04  | Auth & session UX         | `modules/04-auth.md`               |
| 05  | Public portal UX          | `modules/05-public-portal.md`      |
| 06  | Sports master data        | `modules/06-sports.md`             |
| 07  | Tournament management     | `modules/07-tournaments.md`        |
| 08  | Teams UX                  | `modules/08-teams.md`              |
| 09  | Players UX                | `modules/09-players.md`            |
| 10  | Match management          | `modules/10-matches.md`            |
| 11  | Generic scoring UX        | `scoring/11-generic-scoring.md`    |
| 12  | Cricket scoring UX        | `scoring/12-cricket-scoring.md`    |
| 13  | Football scoring UX       | `scoring/13-football-scoring.md`   |
| 14  | Basketball scoring UX     | `scoring/14-basketball-scoring.md` |
| 15  | Standings UX              | `modules/15-standings.md`          |
| 16  | Notifications UX          | `modules/16-notifications.md`      |
| 17  | Overlays UX               | `modules/17-overlays.md`           |
| 18  | Visualization UX          | `modules/18-visualization.md`      |
| 19  | Analytics UX              | `modules/19-analytics.md`          |
| 20  | Audit UX                  | `modules/20-audit.md`              |
| 21  | RBAC UX                   | `modules/21-rbac.md`               |
| 22  | Billing UX                | `modules/22-billing.md`            |
| 23  | Sync / offline UX         | `modules/23-sync.md`               |
| 24  | Design system extensions  | `24-design-system.md`              |
| 25  | Responsive experience     | `25-responsive.md`                 |
| 26  | Routes & layouts          | `26-routes-layouts.md`             |
| 27  | Screen inventory          | `inventory/screens.md`             |
| 28  | Component inventory       | `inventory/components.md`          |
| 29  | Forms inventory           | `inventory/forms.md`               |
| 30  | Table inventory           | `inventory/tables.md`              |
| 31  | Real-time behaviour       | `31-realtime.md`                   |
| 32  | UX states                 | `32-ux-states.md`                  |
| 33  | Accessibility & usability | `33-accessibility.md`              |
| 34  | Final output summary      | `34-summary.md`                    |
| 35  | Hard rules checklist      | `35-checklist.md`                  |

All modules share a common contract: **every endpoint is rendered somewhere, every
screen is reachable from the navigation, every state has a visual, every role has
a permission, every action has a confirmation, and every operator can recover
from a mistake.**
