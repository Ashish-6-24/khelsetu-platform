# 03 — Multi-tenant & Organisation UX

## Endpoints covered

```
POST   /api/organizations
GET    /api/organizations
GET    /api/organizations/{id}
PUT    /api/organizations/{id}
DELETE /api/organizations/{id}
GET    /api/organizations/{id}/members
POST   /api/organizations/{id}/invitations
DELETE /api/organizations/{id}/members/{userId}
POST   /api/organizations/invitations/{token}/accept
```

## Mental model

- Every authenticated user can belong to **zero or more** organisations.
- Each org has a **slug** (URL-friendly id) and a **role per user**.
- The active org is encoded in the URL (`/o/:orgSlug/...`) so links are
  shareable and refresh-safe.
- The org **switcher** is a top-bar component; switching changes the
  `OrganisationContext` and triggers a query invalidation.

## Screens

### 3.1 Organisation list — `/organizations`

- **Role:** Any authenticated user.
- **Purpose:** See orgs I belong to + create / join.
- **Components:** `<OrgCard>` grid, `<OrgSwitcher>`, `<EmptyOrgsState>`,
  `<CreateOrgButton>`.
- **States:** loading (skeletons), empty ("You're not in any organisation yet —
  create one or accept an invitation"), error.
- **Mobile:** Card list collapses to a single column; sticky bottom "Create" CTA.

### 3.2 Create organisation — `/organizations/new`

- **Stepper (3 steps):** Basics → Branding → Invite teammates.
- **Fields:** name, slug (auto + editable, with availability check), sport
  focus (multi-select), timezone, logo (upload), color (palette + custom).
- **Submit behaviour:** Validates → creates → creates default roles →
  redirects to `/o/:slug/dashboard` with a success toast.

### 3.3 Organisation detail / settings — `/o/:orgSlug/settings`

- **Tabs:** General, Branding, Members, Roles, Integrations, Danger zone.
- **General:** name, slug, timezone, default sport, locale defaults.
- **Branding:** logo, primary color, accent color, scoreboard background, OBS
  overlay watermark.
- **Danger zone:** Transfer ownership, delete organisation (typed
  confirmation: type the org name to confirm).

### 3.4 Members page — `/o/:orgSlug/settings/members`

- **Table columns:** avatar, name, email, role (badge), status, last active,
  actions.
- **Filters:** role, status (active, invited, suspended), search by name/email.
- **Bulk actions:** resend invitations, change role, remove.
- **Empty state:** "No members yet — invite your team" with primary CTA.
- **Forbidden state:** "You don't have permission to view members."

### 3.5 Invite member modal

- **Fields:** email(s) (chip input), role (select), welcome message (textarea,
  optional), expiry (default 7 days).
- **Behaviour:** Sends invitation, appends to invitations table, shows
  "Invitation sent" toast with the email and an undo.
- **Validation:** Valid email, role exists, not already a member, not already
  invited (warn).

### 3.6 Accept invitation page — `/invitations/:token`

- **Pre-auth:** if not logged in, show "Accept invitation to {org}" with
  "Sign in" and "Create account" buttons (deep-link return).
- **Post-auth:** Organisation preview (logo, name, role, inviter), "Accept" +
  "Decline" buttons.
- **Errors:** Expired token, already accepted, already a member.

### 3.7 Remove member confirmation

- **Type:** destructive dialog.
- **Body:** "Remove {name} from {org}? They will lose access immediately."
- **Inputs:** optional reason (textarea, sent to backend for audit).
- **Buttons:** Cancel / Remove (danger).

### 3.8 Role badges

- Visual style: pill, sport-aware accent, icon + label.
- Variants: Owner (amber/premium), Admin (primary), Tournament Admin
  (secondary), Scorer (info), Coach (success), Viewer (neutral), Custom (muted).
- Tooltip lists top 3 permissions of the role.

### 3.9 Organisation switcher

- **Location:** Top bar, between logo and search.
- **Behaviour:** Click → dropdown with orgs + "Create or join organisation" +
  "Manage organisations".
- **Search:** fuzzy match on org name.
- **Active state:** shows org logo, name, role badge.

### 3.10 Access denied state

- Shown when a user hits `/o/:slug/...` without membership.
- **Copy:** "You don't have access to {org name}."
- **CTAs:** "Request access" (sends notification to owners/admins) + "Back to
  your organisations".

### 3.11 Empty organisation state

- Shown when a user is the sole member of a new org.
- **Copy:** "Welcome to {org}! Let's set up your first tournament."
- **CTAs:** "Create tournament", "Add a team", "Invite staff".

## Org context provider contract

```ts
interface OrganisationContextValue {
  org: Organisation | null; // current org
  role: RoleKey | null; // current user's role in this org
  permissions: Set<PermissionKey>; // pre-resolved
  switchOrg(orgSlug: string): void; // navigates to /o/:slug/...
  isLoading: boolean;
  error: ApiError | null;
}
```

## Permission enforcement

- All org-scoped pages wrap in `<RequireOrgMember>`.
- All write actions check `permissions.has('org:write')` etc.
- Service methods also enforce (defence in depth).
- Audit log records every membership change (`/api/audit/entity/user/{id}/history`).

## Mobile considerations

- Org switcher becomes a full-screen sheet on mobile.
- Members table → card list.
- Invite modal → bottom sheet.
- All destructive confirmations remain dialogs (never inline).

## Realtime

- `org.member:joined`, `org.member:removed`, `org.member:role_changed` events
  refresh the members table in place.
- Toast on every membership change affecting the current user.
