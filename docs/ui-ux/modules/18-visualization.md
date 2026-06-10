# 18 — Visualization UX

## Endpoints covered

```
POST   /api/visualization/formations
GET    /api/visualization/formations/match/{matchId}/team/{teamId}
PUT    /api/visualization/formations/{id}
POST   /api/visualization/annotations
GET    /api/visualization/annotations/match/{matchId}
DELETE /api/visualization/annotations/{id}
```

## Mental model

Visualization is the **tactical canvas** — formations, player positions,
arrows, zones, and free-form annotations laid over a sport-specific
field/court. It is consumed by:

- **Coaches & analysts** (authoring) — building formations, drawing chalk
  talk.
- **Broadcasters** (read-only) — embedding into overlays.
- **Public viewers** (read-only) — viewing tactical info on the match
  page.

The canvas is **sport-aware** (football pitch, basketball court, cricket
oval) and uses an absolute coordinate system normalised to 0..1 in each
axis, so the same data renders on any resolution.

## Screens

### 18.1 Formation builder — `/o/:orgSlug/visualization/formations/:matchId/:teamId`
- **Header**: team, match, formation (4-4-2 etc.), save status.
- **Canvas**: sport-specific field with safe areas:
  - **Football**: 16:9 pitch with goal areas, centre circle.
  - **Basketball**: half-court / full-court toggle.
  - **Cricket**: oval with creases, fielding rings (30-yard).
- **Players**: jersey-numbered tokens, drag-to-position.
- **Roles**: optional role chip on each token (GK, CB, LB, RB, DM, CM,
  CAM, LW, RW, ST...).
- **Templates**: starter formations (4-4-2, 4-3-3, 3-5-2, 4-2-3-1, etc.)
  pre-position tokens; user nudges.
- **Validation**: warn if fewer/more than allowed on-pitch players.
- **Save**: `POST /visualization/formations` (create) or `PUT /{id}`.

### 18.2 Tactical board — `/o/:orgSlug/visualization/board/:matchId`
- **Canvas** shared between teams (toggle A / B / Both).
- **Drawing tools**: arrow, line, freehand, zone (rectangle / circle),
  text label, eraser.
- **Stroke options**: colour, weight, style (solid / dashed), opacity.
- **Layers**: per-tool layers, reorderable, toggleable visibility.
- **Undo / redo** stack (Ctrl+Z / Ctrl+Y).
- **Snap to grid** toggle (8 / 16 / 32 grid).
- **Export**: PNG, SVG, JSON (for backups / sharing).

### 18.3 Match visualization page — `/o/:orgSlug/matches/:id/visualization`
- **Tabs**: Formation (read-only), Tactical board, Heatmap (future), Pass
  network (future).
- **Read-only** for non-permissioned users — pan/zoom only.
- **Print-friendly** layout for coach handouts.

### 18.4 Annotation editor
- **Mode**: when the tactical board is open, annotations are the layered
  content.
- **Per-annotation metadata**: title, description, related event id
  (optional), authored by, timestamp.
- **Linked events**: clicking an annotation in the event log opens the
  board with that annotation focused.

### 18.5 Drawing tools
- **Arrow**: click-drag; head/tail style; curve handle.
- **Line**: click-drag straight; dashed / solid.
- **Freehand**: pressure-sensitive on tablet; smoothing slider.
- **Zone**: rectangle or ellipse; fill with low-opacity colour.
- **Text**: click to place; inline edit with font/size/colour.
- **Eraser**: click annotation to delete, or use lasso to bulk-delete.

### 18.6 Player positioning editor
- Drag-and-drop player tokens with snap-to-formation-slot.
- **Heatmap underlay** (future) when match data exists.
- **Role chips** on each token; right-click for role picker.
- **Bench bar** at bottom for substitutes.

## Components

- `<TacticalCanvas>`, `<FieldRenderer>`, `<PlayerToken>`,
  `<FormationTemplatePicker>`, `<DrawingToolbar>`,
  `<DrawingLayerPanel>`, `<AnnotationList>`, `<AnnotationEditor>`,
  `<ExportFormationModal>`, `<HeatmapLayer>` (future).

## UI requirements

- **Drag and drop** with momentum + snap.
- **Sport field/court canvas** rendered as SVG (sharp at any size).
- **Player markers** with jersey, role, status (injured icon if applicable).
- **Annotation layer** with z-index control.
- **Undo/redo** for all visual edits (50-step buffer).
- **Clear broadcast-friendly styling**: solid colours, high-contrast,
  legible at distance.

## States

- **Loading**: skeleton canvas + spinner.
- **Empty**: "Start with a formation template" CTA.
- **Saving**: top-right "Saving…" pill; auto-saves every 5s while
  drawing.
- **Saved**: green check pill (2s fade).
- **Conflict**: another user edited concurrently → diff modal with
  "Keep mine / Keep theirs / Merge".
- **Read-only**: tools hidden, "Read-only" chip in header.

## Permissions

- `visualization:read` to view.
- `visualization:write` to create / edit formations & annotations.

## Mobile

- Tablet is the **primary device**; phone is read-only viewing.
- Tools collapse into a bottom toolbar on tablet.
- Pinch-zoom and two-finger pan on canvas.
- Long-press a token for context menu.

## Realtime

- Concurrent editing is supported with OT-style merging server-side; the
  UI shows the other editor's cursor (presence).
- `formation:updated` and `annotation:added/deleted` events refresh
  read-only consumers.

## Export & sharing

- **Export PNG**: rasterised current canvas with optional background.
- **Export SVG**: vector for design tools.
- **Share link**: read-only URL (token-gated).
- **Embed in overlay**: a "Send to overlay" CTA pushes the current
  formation into a formation overlay template binding.

## Accessibility

- Canvas has a keyboard navigation mode: Tab cycles tokens, arrows nudge.
- Each token has `aria-label="Number 10, midfielder, on pitch"`.
- Colour pickers expose contrast ratio.
- Drawing tools have keyboard shortcuts (V select, A arrow, L line, F
  freehand, R rectangle, T text, E eraser).
