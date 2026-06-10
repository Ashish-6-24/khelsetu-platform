# 21 — RBAC UX

## Endpoints covered

```
GET    /api/rbac/permissions
GET    /api/rbac/permissions/{id}
GET    /api/rbac/roles
POST   /api/rbac/roles
GET    /api/rbac/roles/{id}
PUT    /api/rbac/roles/{id}
DELETE /api/rbac/roles/{id}
POST   /api/rbac/roles/{id}/permissions
DELETE /api/rbac/roles/{id}/permissions/{permId}
GET    /api/rbac/users/{userId}/permissions
GET    /api/rbac/users/{userId}/roles
POST   /api/rbac/users/{userId}/roles
DELETE /api/rbac/users/{userId}/roles/{roleId}
```

## Mental model

RBAC (Role-Based Access Control) is the **gatekeeper** of every screen,
button, and API call. It is composed of three primitives:

- **Permissions** — atomic, scoped capability strings (`tournament:write`,
  `match.score:undo`). Defined server-side, read-only in the UI.
- **Roles** — bundles of permissions, scoped to an organisation. A few
  defaults are seeded (Owner, Admin, Tournament Admin, Scorer, Coach,
  Viewer); customs are allowed.
- **User-role assignments** — many-to-many; a user may have several roles
  in one org, and different roles per org.

The UI exposes a **role matrix**, a **permission catalogue**, a **user
roles editor**, and the corresponding effective-permission viewer.

## Screens

### 21.1 Roles page — `/o/:orgSlug/settings/roles`
- **Header**: "Roles", "+ New role" CTA, search.
- **Table** of roles: name, description, member count, system /
  custom badge, edit, duplicate, delete.
- **Empty**: only the seeded roles, with "Create a custom role" hint.
- **Row click**: opens role detail.

### 21.2 Permissions page — `/o/:orgSlug/settings/permissions`
- **Read-only** catalogue grouped by module (Org, Tournament, Team,
  Player, Match, Scoring, Standings, Notification, Overlay, Visualization,
  Analytics, Audit, RBAC, Billing, Sync, Public).
- **Each row**: key (`match.score:write`), description, "Used in N
  roles" link.
- **Search** by key or description.
- **Filter** by module / scope.

### 21.3 Create role — `/o/:orgSlug/settings/roles/new`
- **Step 1 — Basics**: name, slug (auto), description, copy from
  existing role.
- **Step 2 — Permissions**: matrix of all permissions grouped by module
  with toggles. Bulk toggles per module. "Select all read", "Select all
  write" presets.
- **Step 3 — Review**: counts, conflicts (none for read-only deps),
  warnings (e.g., "Has `*:delete` but no `*:read` — confirm?").
- **Save** → toast "Role created".

### 21.4 Edit role — `/o/:orgSlug/settings/roles/:id`
- Same UI as create with current values pre-filled.
- **Cannot edit** seeded system roles' permissions (Owner is `*`); UI
  shows them as read-only with a "Duplicate to customise" CTA.
- **Member list** sidebar: users currently holding this role; quick
  unassign.

### 21.5 Delete role
- Confirmation modal listing affected users (count + first 5 names) and
  the resulting permission gaps.
- "I understand X users will lose Y permissions" checkbox required.
- Endpoint: `DELETE /api/rbac/roles/{id}`.

### 21.6 Role permissions editor
- **Matrix layout**: permissions on Y axis, single role on X (within
  role detail) or multiple roles (in compare view).
- **Cell**: check / cross / inherit (if hierarchy).
- **Bulk toggle**: per-module column header toggle.
- **Diff banner**: shows unsaved changes count; "Save / Discard".
- **Endpoints**: `POST /roles/{id}/permissions`,
  `DELETE /roles/{id}/permissions/{permId}`.

### 21.7 User roles view — `/o/:orgSlug/members/:userId/roles`
- **Header**: user card.
- **Roles list**: assigned roles with assigner, assigned at, "Remove"
  button.
- **"Assign role"** modal: role picker + scope (org only for now).
- **Effective permissions** panel: all permissions the user holds
  (union of all their roles + direct grants).
- **Endpoints**: `GET /users/{userId}/roles`,
  `POST /users/{userId}/roles`,
  `DELETE /users/{userId}/roles/{roleId}`.

### 21.8 User permissions view — `/o/:orgSlug/members/:userId/permissions`
- **Search & filter** of all permission keys.
- **Each row**: permission key, granted (Yes/No), source (role names),
  conflict indicator.
- **Endpoint**: `GET /users/{userId}/permissions`.

### 21.9 Staff assignment flow (cross-references match officials)
- From any user card: "Assign as ..." quick-link to:
  - Tournament admin role.
  - Scorer role.
  - Coach role (with team picker).
  - Custom role.

### 21.10 Role matrix (compare view)
- **Page**: `/o/:orgSlug/settings/roles/matrix`.
- **Grid**: rows = permissions, columns = roles.
- **Cells**: filled / empty.
- **Hover**: tooltip with permission description.
- **Use case**: visualise duplication and gaps across all roles.

### 21.11 Permission matrix (read-only catalogue, see 21.2)

### 21.12 Screen-level permission behaviour
- Every route declares its required permission(s); the router blocks
  navigation with a friendly "You don't have access" page that offers
  "Request access" (sends an internal notification to org admins).

### 21.13 Navigation-level access control
- Sidebar items hide when the user lacks the relevant permission (avoid
  showing dead ends).
- Topbar org switcher only lists orgs where the user is a member.

### 21.14 Button-level access control
- Buttons / action menus are wrapped in `<Can>` and either hide or
  render disabled with a tooltip ("You need `match.score:write`").
- Destructive actions always tooltip the permission name to make the
  cause obvious.

## Components

- `<RoleTable>`, `<RoleCard>`, `<RoleForm>`, `<PermissionsMatrix>`,
  `<PermissionsCatalogue>`, `<UserRolesPanel>`, `<UserPermissionsPanel>`,
  `<EffectivePermissionsList>`, `<RolePicker>`, `<AssignRoleModal>`,
  `<DeleteRoleConfirm>`, `<RequestAccessButton>`, `<Can>` (gate),
  `<RequirePermission>` (route guard).

## Role matrix (default seeds, mirrors §2.13)

| Role | `org:*` | `tournament:*` | `team:*` | `player:*` | `match:*` | `match.score:*` | `analytics:read` | `audit:read` | `billing:*` | `rbac:*` |
|---|---|---|---|---|---|---|---|---|---|---|
| Owner | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Admin | rw | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | — | — |
| Tournament Admin | r | ✓ | ✓ | ✓ | ✓ | r | r | r | — | — |
| Scorer | r | r | r | r | r | ✓ | — | — | — | — |
| Coach | r | r | r | r | r | — | r | — | — | — |
| Viewer | r | r | r | r | r | — | r | — | — | — |

(Public User and Super Admin live outside the org-scoped table; see §2.13.)

## Permission matrix (subset; full list in §2.12)

| Module | Read | Write | Delete | Special |
|---|---|---|---|---|
| Organisations | `org:read` | `org:write` | `org:delete` | `org.member:write`, `org.invitation:send` |
| Tournaments | `tournament:read` | `tournament:write` | `tournament:delete` | `tournament.status:write`, `tournament.fixture:generate` |
| Teams | `team:read` | `team:write` | `team:delete` | — |
| Players | `player:read` | `player:write` | `player:delete` | — |
| Matches | `match:read` | `match:write` | `match:delete` | `match.lifecycle:write`, `match.officials:write` |
| Scoring | `match.score:read` | `match.score:write` | — | `match.score:undo`, `scoring.replay:read/write` |
| Standings | `standings:read` | `standings.snapshot:write` | — | `standings:recalculate` |
| Notifications | `notification:read` | — | `notification:delete` | — |
| Overlays | `overlay:read` | `overlay:write` | — | `overlay.activate`, `overlay.template:write` |
| Visualization | `visualization:read` | `visualization:write` | — | — |
| Analytics | `analytics:read` | `analytics.report:create` | — | `analytics.report:export` |
| Audit | `audit:read` | — | — | `audit.export` |
| RBAC | `rbac:read` | `rbac.role:write` | — | `rbac.permission:assign` |
| Billing | `billing:read` | `billing:write` | — | `billing.invoice:read` |
| Sync | `sync:read` | `sync:write` | — | `sync.device:manage` |
| Public | — | `public.match:create` | — | — |

## UX requirements

- **Search & filter** in every list.
- **Bulk operations** (assign / revoke for users; toggle for permissions).
- **Diff awareness** before save (avoid accidental wide grants).
- **Audit-friendly**: every RBAC mutation creates an audit event with
  before/after.
- **Forgiving destructive actions** (typed confirmations, member-impact
  preview).

## States

- **Loading / empty / error** for each list.
- **System role** (Owner) is locked from edits; UI explains why.
- **Conflict**: showing a role with permissions that depend on others
  (e.g., `*:delete` without `*:read`) raises a warning.
- **Permission denied**: friendly page with "Request access" CTA.

## Permissions

- `rbac:read` — view roles, permissions, user assignments.
- `rbac.role:write` — create / edit / delete roles.
- `rbac.permission:assign` — grant / revoke permissions on roles.
- Owners alone can edit Owner role (and cannot remove themselves).

## Mobile

- Roles list: card view.
- Matrix views are desktop / tablet only; mobile shows a "Open on
  desktop to edit" message + read-only summary.
- User roles drawer accessible from any member card.

## Realtime

- `rbac:role_updated`, `rbac:user_roles_updated` events propagate to the
  affected user's `<RBACProvider>` so their nav / buttons / routes
  re-evaluate immediately (no logout needed).

## Accessibility

- Matrix cells are buttons with `aria-pressed`.
- Each cell announces the change ("Granted `match.score:write` to
  Scorer").
- Required keyboard navigation in matrix (arrows).
- Confirm dialogs trap focus.
