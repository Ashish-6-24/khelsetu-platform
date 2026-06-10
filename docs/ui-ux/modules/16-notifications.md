# 16 — Notifications UX

## Endpoints covered

```
GET    /api/notifications
GET    /api/notifications/unread-count
POST   /api/notifications/read-all
POST   /api/notifications/{id}/read
DELETE /api/notifications/{id}
```

## Mental model

Notifications are the **out-of-band signal channel**: match started, your
team scored, an invitation arrived, a sync conflict needs you, billing is
about to renew, an official confirmed assignment. They live in three
surfaces:

1. **Bell** — global icon in the topbar with unread badge + dropdown.
2. **Center** — full page with filters, search, bulk actions.
3. **Toasts** — ephemeral, system-triggered (real-time, scoring events).

Notifications are typed (`category` + `severity`) so the UI can route /
group / colour them consistently.

## Notification categories (mapped)

| Category | Example | Channel | Default action |
|---|---|---|---|
| `match` | "Live: Team A vs Team B started" | Toast + Bell | Open match |
| `tournament` | "Tournament published" | Bell | Open tournament |
| `org` | "You were added to Org Alpha" | Bell + Email | Switch org |
| `invitation` | "Invitation to join Org X" | Bell | Accept / decline |
| `role` | "You are now a Tournament Admin" | Bell | View role |
| `billing` | "Invoice due in 3 days" | Bell + Email | View invoice |
| `quota` | "Free quota: 1 match left" | Bell + Banner | View plan |
| `sync` | "3 events failed to sync" | Bell + Banner | Open sync queue |
| `var` / `drs` | "VAR review on Match X" | Bell + Toast | Open review |
| `system` | "Maintenance window tonight" | Bell + Banner | Acknowledge |

## Screens

### 16.1 Notification bell (topbar)
- **Icon**: bell + small dot/number for unread.
- **Click**: opens a 384-px dropdown.
- **Realtime**: pulses on `notification:new`; never auto-opens.

### 16.2 Notification dropdown
- **Header**: "Notifications" title, "Mark all as read", "Settings".
- **List** (max 10): grouped by day ("Today", "Yesterday", "Earlier").
  Each row: icon (category), title, body (truncated), relative time,
  unread dot.
- **Empty**: friendly empty state with a small illustration and a hint
  ("You're all caught up.").
- **Footer**: "View all notifications" link.

### 16.3 Notification center page — `/o/:orgSlug/notifications` (or `/notifications` for personal)
- **Filters**: category (chips), severity (info/warn/error), read state,
  date range, search.
- **Bulk actions**: mark read, mark unread, delete.
- **List**: virtualised, one row per notification with action buttons
  (Open, Mark as read, Delete).
- **Detail drawer**: on click, opens right-side drawer with full body,
  metadata (source, actor, organisation), and deep-link.

### 16.4 Read/unread states
- **Unread row**: blue left border + subtle background (`bg-primary-soft`).
- **Read row**: default.
- **Click** opens detail; mark-read fires automatically.
- **Manual toggle**: dot button on the row.

### 16.5 Unread badge
- Bell badge shows count up to **99+**.
- Updates immediately on real-time event and after `read-all`.
- **Endpoint**: `GET /notifications/unread-count` polled every 60s as
  fallback when socket is down.

### 16.6 Bulk mark all as read
- **CTA** in dropdown header and center page.
- **Endpoint**: `POST /notifications/read-all`.
- **Toast**: "All notifications marked as read."
- Optimistically clears badge.

### 16.7 Delete notification
- **Per-row**: trash icon → confirm.
- **Bulk**: select multiple → "Delete selected".
- **Endpoint**: `DELETE /notifications/{id}`.
- **Undo toast**: "Notification deleted — Undo" (5s).

### 16.8 Empty state
- Illustration of a checked envelope.
- "You're all caught up."
- Subtle CTA: "Manage notification settings".

### 16.9 Notification settings (sub-page)
- Per-category toggles for: Bell, Email, Push (future), SMS (future).
- "Quiet hours" time range.
- "Mute organisation X" toggle.
- Saved to profile (separate endpoint, future).

## Components

- `<NotificationBell>`, `<NotificationDropdown>`, `<NotificationRow>`,
  `<NotificationDetailDrawer>`, `<NotificationFilters>`,
  `<NotificationCategoryIcon>`, `<NotificationToast>`,
  `<NotificationEmpty>`, `<NotificationSettings>`.

## Toast strategy

- **Position**: top-right desktop, top-center mobile.
- **Lifetime**: 5s (info), 8s (warn), sticky (error/destructive) until
  dismissed.
- **Stack**: max 4 visible; older collapse to "+N more" expandable group.
- **Action button** optional ("View", "Undo").
- Toasts are **deduplicated** by (category, sourceId) within 10s.

## UX principles

- **Never block**: notifications must never modal-block the user.
- **Always actionable**: each row links to its source (match, invoice,
  invitation).
- **Bulk friendly**: heavy users (admins) need to clear noise.
- **Real-time**: bell, dropdown, toast all update instantly via socket.
- **Quiet by default**: only `match` (own teams) and `invitation` /
  `billing` trigger toasts; everything else is bell-only.

## States

- **Loading**: skeleton rows in dropdown / center.
- **Empty**: friendly empty (see 16.8).
- **Error**: inline banner + retry in dropdown; full-page error fallback
  in center.
- **Offline**: shows cached + "Reconnecting…" footer; new notifications
  queue.
- **High volume**: 100+ unread → badge shows `99+`, dropdown shows oldest
  first warning chip.

## Permissions

- `notification:read` — view own notifications.
- `notification:delete` — delete own notifications.
- Admins cannot view other users' notifications (privacy).

## Mobile

- Bell stays in topbar.
- Dropdown becomes a full-screen sheet.
- Toasts top-center, swipe-to-dismiss.
- Notification center is a tab in the profile drawer.

## Realtime

- `notification:new` event delivered via socket → dropdown + bell + toast
  (if category is toast-eligible).
- `notification:read` event syncs read state across the user's devices.
- `notification:deleted` event syncs deletes across devices.

## Accessibility

- Bell button: `aria-label="Notifications, N unread"`.
- Dropdown is a `role="menu"` with `role="menuitem"` rows.
- Toasts use `role="status"` (info) or `role="alert"` (error).
- Unread state communicated via `aria-current="true"` and not colour
  alone.
