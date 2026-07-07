# 33 — Accessibility & Usability

KhelSetu must be usable by everyone — including operators wearing gloves
in a freezing stadium, fans on screen readers, broadcasters with no
mouse, and admins on a slow rural connection. This section is the
non-negotiable a11y / usability baseline.

## 33.1 Standards & targets

- **WCAG 2.2 AA** is the floor; **AAA** for body text contrast and
  alternatives where reasonable.
- **Section 508**, EN 301 549.
- **Keyboard-only operability** for every interaction.
- **Screen reader compatibility**: NVDA + Firefox, JAWS + Chrome, VoiceOver
  - Safari, TalkBack + Chrome (Android).
- **prefers-reduced-motion**, **prefers-contrast**, **prefers-color-scheme**
  honoured.
- **Touch targets** ≥ 44×44 px (Apple HIG, WCAG 2.5.5).

## 33.2 Colour & contrast

- Body text ≥ 4.5:1; large / display text ≥ 3:1; UI components ≥ 3:1.
- Never convey meaning by colour alone — pair with icon, text, or
  pattern.
- Test in both light and dark modes.
- Chart colours include pattern fills as a secondary channel.
- Status pills always include a textual label (e.g., "Live", "Past
  due").

## 33.3 Keyboard navigation

- Every interactive element is reachable by `Tab` in logical order.
- `Shift+Tab` reverses; `Esc` closes overlays.
- `Enter` / `Space` activates buttons.
- `Arrow` keys navigate composites (Tabs, Menus, Tables, Sliders, Steppers,
  Canvas, Matrix cells).
- `?` opens the keyboard-shortcut overlay (`<KbdShortcutOverlay>`).
- `⌘K` / `Ctrl+K` opens the command palette.
- Modals trap focus (Radix primitives by default).
- Skip-to-content link visible on focus at the top of every page.

### Scorer console (sport-specific)

- See §11–14 for full shortcut maps.
- Universal: `U` undo, `Esc` close modal, `Enter` confirm.

### Tables

- Arrow keys move between cells (optional, behind feature flag).
- `Space` toggles selection; `Shift+Space` range select.
- Sort buttons are real `<button>`s with `aria-sort`.

### Forms

- `Enter` submits, `Esc` cancels (in modal forms).
- `Cmd/Ctrl+S` saves where applicable (e.g., template editor).
- Field-level validation announced via `aria-describedby` to errors.

## 33.4 Screen reader friendliness

- Use semantic HTML first; ARIA is a last resort.
- `<main>`, `<nav>`, `<aside>`, `<header>`, `<footer>` per page.
- One `<h1>` per page; logical heading hierarchy thereafter.
- Live regions for real-time updates:
  - Score updates: `aria-live="polite"`; throttled to ≤ 1 update/s.
  - Errors: `role="alert"`.
  - Toasts: `role="status"` (info/success) / `role="alert"` (error).
- Labels on every form field (`<label for="…">`, never placeholder-only).
- Icon-only buttons: `aria-label` always; tooltip too.
- Tables use `<caption>`, `<th scope>` properly.
- Avatars: `alt` describes the user, never decoratively repeats name
  twice.

## 33.5 Focus states

- All interactive elements have visible focus rings (`:focus-visible`).
- 2px solid `--color-primary` with 2px offset.
- Never `outline: none` without an equivalent.
- Custom widgets (canvas tokens, drawing tools) implement a synthetic
  focus ring.

## 33.6 Motion & animation

- `prefers-reduced-motion: reduce` disables:
  - LIVE pulse animation.
  - Modal scale animation (instead, fade only).
  - Skeleton shimmer.
  - Drawer slide (fade replaces).
  - Bracket layout transitions.
- State transitions and content moves are kept; decorative motion is
  killed.

## 33.7 Internationalisation & language

- en (default), ne (Nepali), hi (Hindi).
- Every string is i18n-keyed (no hard-coded copy).
- RTL not required today but the design system respects logical
  properties (`padding-inline-start` etc.) so an RTL locale could be
  added.
- Numbers, dates, currency use locale formatting.
- Language switcher in the topbar and footer.

## 33.8 Touch & gesture

- ≥ 44×44 hit target everywhere; ≥ 64×64 on scorer buttons.
- Long-press reserved for secondary menus (never primary actions).
- Swipe-to-undo on event rows is **additive** — there is always a
  button equivalent.
- Pinch-zoom on canvas (tactical board) is **additive**.
- Drag-and-drop has a keyboard equivalent.

## 33.9 Forms & validation

- Inline errors below fields with icon + text + `aria-describedby` link.
- Summary at top of form on submit failure with anchors to each error.
- Required fields marked with `*` and `aria-required`.
- Help text below field; do not duplicate placeholder.
- Multi-step wizards expose steps as `<nav>` for screen readers.
- Error messages are plain English, action-oriented ("Email is
  required" rather than "validation_error_002").

## 33.10 Destructive action safety

- All destructive actions confirm.
- High-impact actions (delete tournament, cancel subscription, revoke
  token, remove member with many references) require **typed
  confirmation** ("type ABANDON to continue").
- The confirm button stays disabled until typing matches.
- After action, an **undo toast** appears for 5s where the action is
  reversible.
- Audit log captures every destructive change.

## 33.11 Safe undo patterns

- Undo is **one tap away** in scorer consoles.
- Recent destructive list view actions surface "Undo" toasts for 5s.
- For complex actions (multi-event undo), require confirmation and
  show the events about to be undone.
- Snapshot restore always requires confirmation + summary.

## 33.12 Scoring console — operator usability

- **Glove-friendly**: 64+ px buttons, hover not required.
- **High-contrast**: stadium light can be harsh; default to dark mode in
  scorer + provide brightness boost option.
- **No surprise modals** during peak moments (e.g., do not pop a
  notification toast over the action grid during a live ball).
- **One-handed mode** on phone: actions reachable by thumb.
- **Wake-lock**: keep screen on during a live match (with permission
  prompt the first time).
- **Audio cues** (optional): subtle tick for each event recorded,
  warning chime for shot clock ≤ 5s.

## 33.13 Realtime-friendly

- Live updates throttled so screen readers are not overwhelmed (max 1
  speak / 2s per region).
- Latency badge available in debug mode for operators.
- "Stale" indicators replace silent staleness.

## 33.14 Error resistance

- Save automatically (drafts) where possible.
- Validate on the server and reflect in UI.
- Prevent duplicate submits via idempotency keys + disabled state.
- Provide retries with exponential backoff.
- Show a "Last known good" view when realtime breaks.

## 33.15 Performance & data

- Respect `Save-Data` header → reduce image quality, disable autoplay
  videos, throttle realtime tick rates.
- Lazy-load below-the-fold content.
- Avoid layout shift (CLS) by reserving space for async content.
- Provide TTI budgets per surface (§25.11).

## 33.16 Testing & sign-off

- **Automated**: axe-core in unit tests for each component; Storybook
  a11y addon; ESLint a11y plugin.
- **Manual**:
  - Keyboard-only walkthrough of every primary flow.
  - Screen reader walkthrough (NVDA + VoiceOver minimum).
  - Mobile-screen-reader walkthrough.
  - Colour-blindness simulation review.
  - Stadium-conditions test (high brightness, gloves, hurried clicks).
- **CI gate**: zero serious or critical axe issues; warnings allowed.
- **Per release**: VPAT updated; statement of accessibility published.

## 33.17 Content & copy

- Plain English, sentence case for buttons and links, title case for
  titles.
- Avoid jargon outside the scorer context (where jargon is desired).
- Empty states are warm and helpful, not blaming.
- Error copy explains what the user can do next.
- Avoid idioms that won't translate well.

## 33.18 Operator handoffs

- Multi-scorer presence (§31.6) shows avatars and roles.
- Handoff flow: outgoing scorer signs off; incoming scorer confirms
  state via a 5-question checklist (period, clock, score, fouls, sub
  count). Both signatures audited.

## 33.19 Public portal — fan friendliness

- Score numbers extremely large (display-score) for stadium scoreboards
  rendered on phones.
- Share buttons for matches, tournaments, players.
- Subscribe-to-match (without account) via email/push (future).
- Print-friendly fixtures and standings.
- Embed-friendly widgets (live score, ticker) for blogs / clubs.

## 33.20 Accessibility statement

- A public `/accessibility` page describes our commitment, current
  conformance level, known issues, contact for feedback.
- Updated each release.
