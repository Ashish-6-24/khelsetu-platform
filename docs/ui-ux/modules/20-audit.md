# 20 — Audit UX

## Endpoints covered

```
GET /api/audit/logs
GET /api/audit/entity/{type}/{id}/history
GET /api/audit/user/{userId}/activity
```

## Mental model

Audit is the **forensic record** of who did what, to which entity, when,
from where, and with what before/after diff. It is consumed by:

- **Org admins** for compliance / dispute resolution.
- **Tournament admins** to investigate a contested result.
- **Super admins** for cross-tenant abuse response.

Audit is **read-only** in the UI; writes happen automatically from every
mutating action across the platform.

Records are typed: `actor`, `actorType` (user / system / api-key),
`action` (`create`, `update`, `delete`, `transition`, `restore`, `login`,
`logout`, `permission_grant`, `score_event`, `score_undo`, etc.), `entityType`,
`entityId`, `before`, `after`, `metadata`, `timestamp`, `ip`, `userAgent`,
`organizationId`.

## Screens

### 20.1 Audit logs page — `/o/:orgSlug/audit`
- **Header**: "Audit Logs", export CTA (CSV / NDJSON, permission-gated).
- **Filters bar**:
  - Date range (default last 7 days).
  - Actor (user picker, system, api-key).
  - Action (multi-select chips).
  - Entity type (multi-select).
  - Entity id (paste / search).
  - IP / user agent search.
  - Severity (info / warn / critical) — derived field.
- **Table**:
  - Time (relative + ISO on hover).
  - Actor (avatar + name + role chip).
  - Action (icon + label).
  - Entity (type chip + name + open link).
  - Diff badge ("N fields changed") — opens diff modal.
  - Metadata icon (IP, UA) → popover.
- **Row action**: "Open detail" drawer.
- **Pagination**: cursor-based; URL-syncable.
- **Live tail toggle**: streams new events as they happen (read-only,
  pauses on scroll up).

### 20.2 Audit detail drawer
- **Header**: action, actor, entity link, timestamp.
- **Metadata**: IP, UA, geo, organisation, request id.
- **Diff viewer**: side-by-side JSON with added (green) / removed (red) /
  changed (amber) lines. Collapsible nested objects.
- **Related events**: timeline of audit entries within ±5 min around this
  event, scoped to the same entity.
- **Open entity**: deep-link to the entity's current state and history.

### 20.3 Entity history page — `/o/:orgSlug/audit/entity/:type/:id`
- **Header**: entity card (current name, status, primary fields).
- **Timeline** (vertical) of all audit events for this entity, newest
  first:
  - Group by day with sticky headers.
  - Each event: time, actor, action, summary line.
  - Click → diff drawer.
- **Toggle**: show only critical / show all.
- **Restore CTA** (if action was a delete or destructive update; admin
  only).

### 20.4 User activity timeline — `/o/:orgSlug/audit/user/:userId`
- **Header**: user card (avatar, role, joined, last active).
- **Timeline** of all actions by this user across the org.
- **Filters**: action type, entity type, date range.
- **Heatmap** (small): activity per hour-of-day × day-of-week.
- **Devices**: distinct IPs / UAs grouped with last-seen.

### 20.5 Change log viewer
- A re-usable component used on entity detail pages to show "last 5
  changes" inline.
- Each row links to the audit detail drawer.

### 20.6 Event history explorer (advanced)
- A power-user search page for super-admins (`/admin/audit`):
  - Tenant filter.
  - Free-text JSONPath into `metadata`.
  - Saved queries.
  - CSV / NDJSON export.

## Components

- `<AuditFiltersBar>`, `<AuditTable>`, `<AuditRow>`, `<AuditDiffViewer>`,
  `<AuditDetailDrawer>`, `<EntityHistoryTimeline>`,
  `<UserActivityTimeline>`, `<ActivityHeatmap>`, `<ChangeLogInline>`,
  `<AuditExportModal>`, `<LiveTailToggle>`.

## UI requirements

- **Timeline** with sticky date headers.
- **Search** (free text across actor name, entity name).
- **Filters** persist via URL params.
- **Actor / action labels** are chips with icons and consistent colour.
- **Timestamp** shown relative + absolute (on hover).
- **Before/after comparison** via JSON diff viewer with collapse +
  syntax highlight.
- **Deep drilldown**: each cell that references an entity is a link to
  that entity's history page.

## States

- **Loading**: skeleton rows.
- **Empty**: "No audit events match your filters."
- **Filtered empty**: "Try clearing some filters" with a "Reset filters"
  CTA.
- **Error**: inline banner + retry.
- **Permission denied**: friendly forbidden screen.
- **Live tail active**: green pulse chip "Streaming live" with pause
  button.
- **Live tail paused** (auto on scroll up): amber chip "Paused — click to
  resume".

## Permissions

- `audit:read` to view.
- `audit.export` to export CSV / NDJSON.
- Super admin can view cross-tenant audit; org admins see only their org.

## Mobile

- Table collapses into cards: each card shows time, actor, action,
  entity, "View diff" link.
- Drawer becomes a full-screen sheet.
- Heatmap on user-activity page becomes a compact bar by hour.

## Realtime

- Live tail uses `audit:event_added` socket events.
- Bell notification is **not** raised for audit events (too noisy);
  exceptions: `critical` severity items (deletes, permission changes,
  super-admin actions).

## Performance

- Table is virtualised (TanStack Virtual).
- Cursor pagination with prefetch on hover near the end.
- Filters debounced 250 ms.
- Diff viewer lazy-loads `before` / `after` only when expanded.

## Accessibility

- Table uses semantic `<table>` with proper headers.
- Each row has an accessible name describing the event ("On 2026-06-05 at
  14:33, Ashish updated tournament Spring Cup, 3 fields changed").
- Diff viewer announces additions/removals to screen readers.
- Filter chips are buttons with `aria-pressed`.
