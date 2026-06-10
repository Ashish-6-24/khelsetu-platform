# 06 — Sports Master Data UX

## Endpoints covered

```
GET    /api/sports
POST   /api/sports
GET    /api/sports/{id}
PUT    /api/sports/{id}
DELETE /api/sports/{id}
```

## Mental model

`Sport` is a **master record** that controls:

- The default scoring template (cricket, football, basketball, custom).
- Default periods / overs / quarters.
- Default ruleset (substitution limits, free-hit rules, etc.).
- Iconography in the UI (sport icon + accent color).

Org admins can create custom sports, but the system ships with the canonical
three (Football, Cricket, Basketball). **Sport selection in tournament
creation drives the entire downstream experience** — fixture generator,
scoring console, analytics, overlays, and standings all branch on sport.

## Screens

### 6.1 Sports list — `/o/:orgSlug/sports`
- **Cards:** icon, name, type (team / individual — future), # of tournaments
  using it, status (active / archived), default config preview, "Edit" /
  "Delete".
- **Filter:** active / archived, search.
- **Empty:** "No sports yet — add Football, Cricket, or a custom sport to get
  started."
- **Loading:** skeleton cards.

### 6.2 Create sport — `/o/:orgSlug/sports/new`
- **Fields:**
  - name (required, unique within org)
  - icon (Lucide picker, 50+ icons, live preview)
  - accent color (palette + custom)
  - type: team / individual / hybrid
  - default config: tabs for Cricket / Football / Basketball / Custom
  - status: active / archived
- **Validation:** name unique, icon required.
- **Submit:** creates and returns to list with toast.

### 6.3 Edit sport — `/o/:orgSlug/sports/:id`
- Same form, pre-filled.
- A warning panel if the sport is in use: "Editing this will not affect
  existing tournaments, only new ones."

### 6.4 Delete sport — confirmation
- **Type:** destructive dialog.
- **Body:** "Delete {sport}? Tournaments using this sport will keep working
  with their original config."
- **Input:** type sport name to confirm.

### 6.5 Sport detail — `/o/:orgSlug/sports/:id`
- Read-only view of the sport config.
- Tabs: Overview, Tournaments using this sport, Rules reference.

### 6.6 Sport selector in tournament creation
- **UI:** Card grid of sport icons. Click selects. The selected card lifts
  and gets a primary border.
- **Below:** shows the default config preview.
- **In step 2 of tournament wizard.**

### 6.7 Sport-based experience branching
- After sport is selected, the tournament wizard collapses irrelevant
  fields (e.g. "overs" hidden for football).
- A persistent breadcrumb chip shows the current sport throughout the
  wizard ("Football — League").
- Scoring console loads the sport-specific layout (see scoring specs).

## Permissions

- `sport:read` to view list and use in tournament creation.
- `sport:write` to create / edit.
- `sport:delete` to delete.

## States

- **Loading:** skeleton.
- **Empty:** friendly empty state with primary CTA.
- **Error:** inline error with retry; non-blocking.
- **Deleting:** optimistic removal with undo toast (5s).
- **Used-by-warning:** when editing, show "Used by 12 tournaments" with a
  link to the list.

## Mobile

- Cards collapse to single column.
- Form moves to a full-screen sheet.
- Icon picker is a grid of large tap targets.

## Realtime

- `sport:created`, `sport:updated`, `sport:deleted` events refresh the list
  and clear the local cache.

## A11y

- Icon picker uses a `radiogroup` with `aria-label` on each option.
- Color contrast of the selected sport's accent checked against the
  background.
- All destructive confirmations use the type-to-confirm pattern.
