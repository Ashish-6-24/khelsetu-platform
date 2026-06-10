# 17 — Overlays UX

## Endpoints covered

```
POST /api/overlays/templates
GET  /api/overlays/templates
POST /api/overlays
GET  /api/overlays
POST /api/overlays/{id}/activate
POST /api/overlays/{id}/deactivate
GET  /api/overlays/public/{token}
```

## Mental model

Overlays are the **broadcast-grade visual layer** the broadcaster drops into
OBS, vMix, or any browser-source-capable production tool via a public token
URL. The platform exposes:

- **Templates** — reusable visual layouts (scoreboard, lower-third, formation
  card, sponsor strip, BUG, ticker).
- **Active overlays** — a template bound to a match + tournament context
  with theme, position, and visibility rules.
- **Public URL** — a tokenised, no-chrome, transparent-background render
  consumed by OBS as a browser source.

The UI separates **authoring** (template / overlay manager in the dashboard)
from **rendering** (the `/overlay/:token` route in `OverlayShell` with no
nav, no auth, no chrome).

## Screens

### 17.1 Overlay template manager — `/o/:orgSlug/overlays/templates`
- **Header**: "Overlay Templates", "+ New template" CTA.
- **Grid** of template cards: thumbnail, name, sport(s), category
  (scoreboard / lower-third / formation / sponsor / ticker / BUG),
  modified date, in-use count.
- **Card actions**: Preview, Edit, Duplicate, Delete, Use.
- **Filters**: category, sport, theme.
- **Empty**: "Start from a starter template" with 6 starter cards.

### 17.2 Template editor — `/o/:orgSlug/overlays/templates/:id`
- **Left**: layer tree (header, score, team A, team B, time, sponsor).
- **Canvas** (16:9 preview with safe-area guides):
  - Drag-to-reposition layers.
  - Snap-to-grid (8 / 16 / 32).
  - Resize handles.
  - Multi-select with align/distribute toolbar.
- **Right inspector**:
  - Selected layer properties (font, weight, colour, padding, background,
    opacity, shadow).
  - Data binding ("Team A name" → `{{match.teamA.name}}`).
  - Animation (fade, slide, none).
- **Top toolbar**: theme, undo/redo, preview, save, publish.
- **Preview mode**: full-bleed preview with simulated match data.

### 17.3 Live overlay manager — `/o/:orgSlug/overlays`
- **List/grid** of active overlays: name, template, match, status (active /
  inactive), public URL.
- **Card actions**: Activate / Deactivate, Copy URL, Open Preview, Edit
  Binding, Delete.
- **Filters**: match, template, active.
- **Bulk**: activate all for a match, deactivate all.

### 17.4 Create overlay (modal/wizard)
- **Step 1**: choose match (live or upcoming).
- **Step 2**: choose template (filter by sport/category).
- **Step 3**: configure (position preset: top-left / top-right / lower-third
  / fullscreen, theme override, visibility rules per period).
- **Step 4**: review → "Create & copy URL".

### 17.5 Overlay preview
- **Modal**: live preview with simulated data + real data toggle.
- **Resolutions**: 1920×1080 (default), 1280×720, 720×1280 (vertical),
  custom.
- **Background**: checkered (transparent) / black / green / custom — to
  simulate OBS.
- **Refresh** button to pull latest.

### 17.6 Overlay activation controls
- **Activate**: green button → `POST /overlays/{id}/activate`. Real-time
  event pushed to all consumers of the public URL.
- **Deactivate**: red button → `POST /overlays/{id}/deactivate`. Overlay
  fades out gracefully.
- **Schedule**: optional auto-activate at a time.
- **Status chip**: Active (green pulse), Inactive (grey), Error (red).

### 17.7 Broadcast-ready public overlay view — `/overlay/:token`
- **Layout**: `OverlayLayout` (no chrome, transparent background by
  default).
- **Behaviour**:
  - Loads template + match data; opens persistent socket to receive
    updates.
  - Renders only layers marked "visible" for the current period/state.
  - Animations respect `prefers-reduced-motion`.
  - Disconnect → caches last frame; reconnect banner only if in admin
    preview mode.
- **No interactivity**: pointer events disabled.
- **Performance**: minimal CSS, no fonts loaded that are not used,
  transform-based animations.

### 17.8 Public token access view
- **Token model**: each overlay generates a unique unguessable token; the
  URL is shareable but should be treated as a secret.
- **Token management UI**: copy, regenerate (invalidates old), revoke.
- **Audit**: each `GET /overlays/public/{token}` access is counted (rate &
  geo) for the manager view.

## Components

- `<TemplateCard>`, `<TemplateEditor>`, `<LayerTree>`, `<OverlayCanvas>`,
  `<LayerInspector>`, `<DataBindingPicker>`, `<OverlayList>`,
  `<OverlayCard>`, `<OverlayActivateButton>`, `<OverlayPreviewModal>`,
  `<OverlayShell>`, `<OverlayScoreboard>`, `<OverlayLowerThird>`,
  `<OverlayBug>`, `<OverlayTicker>`, `<OverlaySponsorStrip>`.

## UX principles

- **Two-mode separation**: authoring is dense and feature-rich; rendering
  is minimal and bullet-proof.
- **Broadcast-safe**: never render auth chrome, never log to console in
  production, never use fonts not embedded.
- **Theme tokens**: editor consumes the same design tokens as the
  dashboard, so a tournament theme cascades automatically.
- **Data binding > hardcoding**: layers bind to match data; static text is
  the exception.
- **Activation is the source of truth**: deactivating an overlay hides it
  on all consumer URLs in real time.
- **Public token = secret**: warn user when copying / regenerating;
  invalidate old tokens on regen.

## States (overlay manager)

- **Loading**: skeleton cards.
- **Empty**: "Create your first overlay" CTA with starter templates.
- **Active overlay**: green pulse, "Open URL" CTA.
- **Inactive**: greyed card with "Activate" CTA.
- **Error**: red border, retry, view logs.
- **Match not live**: warning "Match is not live yet; overlay will not
  render until the match starts."

## States (public overlay)

- **Idle (no match yet)**: empty transparent frame (broadcaster sees
  nothing — by design).
- **Live**: full overlay rendering.
- **Disconnected**: caches last frame; never shows error to public
  unless `?debug=1` is passed.
- **Deactivated**: fades out (300ms) then renders nothing.
- **Revoked token**: 404 silently (no leak).

## Permissions

- `overlay:read` to view.
- `overlay:write` to create / edit overlays.
- `overlay.template:write` to create / edit templates.
- `overlay.activate` to activate / deactivate.

## Mobile

- The authoring editor is **tablet-and-up** only; mobile shows a
  read-only list with a clear message ("Open on tablet to edit").
- The list and activation controls work on mobile so a producer can
  toggle on/off from a phone.
- Public overlay never targets mobile but degrades gracefully.

## Realtime

- `overlay:activated` / `overlay:deactivated` events update the manager
  and force public consumers to re-render.
- `match:score_update` and friends stream directly into overlay layers
  via the shared realtime store.

## Accessibility (authoring only — public overlay is non-interactive)

- Canvas supports keyboard nudging (arrows / Shift+arrows for 8px).
- Inspector inputs have labels.
- Layer tree is a `role="tree"` with arrow-key navigation.
- Colour pickers expose contrast ratio against the chosen background.
