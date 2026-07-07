# 30 — Table Inventory

Every table specifies: **columns, sorting, filtering, search, pagination,
row actions, bulk actions, loading / empty / error states**.

All tables use the `<DataTable>` composite with TanStack Table for headless
logic + Shadcn for chrome. Mobile collapses every table to a **card list**
unless explicitly noted otherwise.

---

## 30.1 Organizations table

- **Route**: `/organizations`
- **Columns**: Name (link), slug, role (you), members, plan, created.
- **Sorting**: name, created.
- **Filters**: role (Owner / Admin / Member), plan.
- **Search**: name + slug.
- **Pagination**: 20/50/100.
- **Row actions**: Open, Switch to, Leave (with confirm).
- **Bulk**: none.
- **States**: empty ("Create your first org"), loading skeleton, error
  retry.

## 30.2 Members table

- **Route**: `/o/:orgSlug/settings/members`
- **Columns**: Avatar+name, email, roles (badges), last active, status
  (Active / Pending / Removed).
- **Sorting**: name, last active.
- **Filters**: role, status.
- **Search**: name + email.
- **Pagination**: 20/50/100.
- **Row actions**: View roles, View permissions, Resend invite, Remove.
- **Bulk**: assign role, remove (typed confirm).

## 30.3 Invitations table

- **Route**: tab on Members page.
- **Columns**: email, role, invited by, sent at, expires at, status.
- **Filters**: status (Pending / Accepted / Expired / Revoked).
- **Row actions**: Resend, Revoke, Copy link.
- **Bulk**: revoke, resend.

## 30.4 Sports table

- **Route**: `/o/:orgSlug/sports`
- **Columns**: Name, code, sport-icon, default-format, created.
- **Sorting**: name.
- **Filters**: built-in vs custom.
- **Search**: name + code.
- **Row actions**: Open, Edit, Duplicate, Delete.
- **Bulk**: delete.

## 30.5 Tournaments table

- **Route**: `/o/:orgSlug/tournaments`
- **Columns**: Name (link), sport, format, status (chip), start, end,
  teams, matches, lead admin.
- **Sorting**: start, name, status.
- **Filters**: sport, status, format, season.
- **Search**: name.
- **Pagination**: 20/50/100.
- **Row actions**: Open, Edit, Change status, Generate fixtures,
  Archive, Delete (typed confirm).
- **Bulk**: change status (compatible only), archive.

## 30.6 Teams table

- **Route**: `/o/:orgSlug/teams`
- **Columns**: Crest+name, sport, captain, players, founded.
- **Sorting**: name, founded.
- **Filters**: sport.
- **Search**: name.
- **Row actions**: Open, Edit, Manage roster, Delete.
- **Bulk**: delete.

## 30.7 Players table

- **Route**: `/o/:orgSlug/players`
- **Columns**: Avatar+name, primary team, position, dob, nationality,
  matches.
- **Sorting**: name, dob, matches.
- **Filters**: team, position, nationality, gender.
- **Search**: name.
- **Row actions**: Open, Edit, Assign to team, Delete.
- **Bulk**: assign to team, delete.

## 30.8 Matches table

- **Route**: `/o/:orgSlug/matches`
- **Columns**: Team A vs Team B (with crests), score, status (chip),
  period, scheduled at, venue, officials (avatars).
- **Sorting**: scheduled at, status.
- **Filters**: tournament, status, sport, date range, team.
- **Search**: team names.
- **Pagination**: 25/50/100.
- **Row actions**: Open, Score, Edit, Manage officials, Lifecycle
  (suspend / postpone / abandon), Delete.
- **Bulk**: assign officials, change venue, delete.
- **Note**: live row is sticky with red left border.

## 30.9 Officials table

- **Surface**: tab on Match detail.
- **Columns**: Role, user, status (Pending / Confirmed / Declined),
  assigned at.
- **Row actions**: Remind, Replace, Remove.

## 30.10 Scoring events table (Event log)

- **Surface**: in Scoring console + Match detail Events tab.
- **Columns**: Time, period/minute, type (icon + label), team, player,
  value, scorer, status (pending / synced / corrected).
- **Virtualised**.
- **Filters**: team, type, period, scorer.
- **Search**: player name + free text.
- **Row actions**: Undo (with confirm), Correct (with reason).
- **Bulk**: undo multiple (admin only).

## 30.11 Standings table

- **Route**: `/o/:orgSlug/standings/:tournamentId` and public.
- **Columns**: # (rank), team (crest+name), P, W, D, L, GF, GA, GD, Pts,
  Form (last 5).
- **Sorting**: default by rank; allow by any numeric column with
  persistent reset.
- **Filters**: group, gender, division, season.
- **States**: empty / partial (provisional) / stale / live.
- **Note**: sticky first column on mobile horizontal scroll.

## 30.12 Notifications table

- **Route**: `/o/:orgSlug/notifications`
- **Columns**: Read indicator, icon (category), title, body (truncated),
  time, actions (Open / Mark read / Delete).
- **Filters**: category, severity, read state, date range.
- **Search**: free text.
- **Bulk**: mark read, delete.

## 30.13 Overlay templates table

- **Route**: `/o/:orgSlug/overlays/templates`
- **Display**: card grid by default; list view toggle.
- **Columns (list view)**: Name, category, sport, modified, used in N
  overlays.
- **Row actions**: Preview, Edit, Duplicate, Delete, Use.

## 30.14 Live overlays table

- **Route**: `/o/:orgSlug/overlays`
- **Columns**: Name, template, match, position, status (chip), public
  URL.
- **Filters**: match, template, active.
- **Row actions**: Activate / Deactivate, Copy URL, Preview, Edit
  binding, Regenerate token, Delete.
- **Bulk**: activate, deactivate.

## 30.15 Analytics tables

- **Top scorers / assists / etc.**: rank, avatar+name, team, value,
  trend, matches.
- **Custom report results**: dynamic columns from the builder, export
  CSV/PDF.

## 30.16 Audit logs table

- **Route**: `/o/:orgSlug/audit`
- **Columns**: Time (relative), actor (avatar+name+role), action (icon +
  label), entity (type+name link), diff badge, IP, UA.
- **Cursor pagination**.
- **Filters**: date range, actor, action, entity type, entity id, IP/UA,
  severity.
- **Search**: free text across actor and entity name.
- **Row action**: Open detail drawer.
- **Bulk**: export selected (CSV / NDJSON).

## 30.17 Roles table

- **Route**: `/o/:orgSlug/settings/roles`
- **Columns**: Name, description, type (System / Custom), members,
  permissions count.
- **Search**: name.
- **Row actions**: Open, Duplicate, Edit, Delete (typed confirm,
  impact preview).

## 30.18 Permissions table (catalogue)

- **Route**: `/o/:orgSlug/settings/permissions`
- **Columns**: Key, description, module, used in N roles.
- **Filters**: module, scope.
- **Search**: key + description.

## 30.19 Billing plans table (admin)

- **Route**: `/admin/plans`
- **Columns**: Name, tier, price (monthly / annual), quota summary,
  active customers.
- **Row actions**: Edit, Archive.

## 30.20 Subscriptions table (admin)

- **Route**: `/admin/tenants/:id` (Billing tab)
- **Columns**: Plan, status, started, current period end, MRR.

## 30.21 Invoices table

- **Route**: `/o/:orgSlug/billing/invoices`
- **Columns**: Invoice #, date, period, amount, status (chip),
  download PDF.
- **Filters**: status, year, date range.
- **Row actions**: Open, Download PDF, Email.
- **Bulk**: export CSV.

## 30.22 Payment methods table

- **Route**: `/o/:orgSlug/billing/payment-methods`
- **Columns**: Brand+last4, expiry, default badge, added by, added at.
- **Row actions**: Set default, Remove (cannot remove last default).

## 30.23 Sync queue table

- **Route**: `/o/:orgSlug/sync`
- **Tabs**: Pending / In-progress / Failed / Conflicts / Synced.
- **Columns**: Created at, entity, op, payload summary, retries, last
  error, status, actions.
- **Filters**: status, entity, match.
- **Row actions**: Retry, Discard (confirm), Open conflict.
- **Bulk**: retry, discard.

## 30.24 Devices table

- **Route**: `/o/:orgSlug/sync/devices`
- **Columns**: Device name, OS, browser, last seen, pending depth,
  conflicts (this month), actions.
- **Row actions**: Rename, Revoke, View activity.

## 30.25 Admin tenants table

- **Route**: `/admin/tenants`
- **Columns**: Org name, owner, plan, status, members, matches, last
  active, region.
- **Filters**: plan, status, region.
- **Search**: name, owner email.
- **Row actions**: Open, Suspend, Restore, Impersonate (audited), Delete
  (typed).

## 30.26 Platform audit table (admin)

- **Route**: `/admin/audit`
- **Columns**: Time, actor, tenant, action, entity, IP.
- **Filters**: tenant, actor type, action, severity.
- **Bulk**: export.

---

## Table behaviour standards

- **Loading**: row skeletons; never a blank table for ≥150ms.
- **Empty**: friendly empty state with a primary action when sensible.
- **Error**: inline banner with retry; cells render `—` on partial
  failure.
- **Selection state** persists across pagination by id.
- **Filters / sorting / pagination / search** all sync to URL params for
  share/bookmark.
- **Column visibility** is user-toggleable and persisted per user.
- **CSV / PDF / PNG export** menu available on every table where
  permitted.
- **Density** toggle: compact / default / comfortable.
- **Sticky header** on tables with > 10 rows visible.
- **Mobile**: collapse to cards with the most relevant 2–3 fields and a
  "View" link.
- **Accessibility**: semantic `<table>` with `<th scope>`, keyboard nav
  between cells optional, sort buttons have `aria-sort`.
