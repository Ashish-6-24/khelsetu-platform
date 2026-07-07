# 29 — Forms Inventory

Every form spec includes: **fields, types, required/optional, validation,
error messages, default values, helper text, submit behaviour, loading
state, success state, reset behaviour**.

All forms use **React Hook Form + Zod**. Errors display inline + form-
level summary on submit. Submit is disabled when invalid or in flight.
On success: toast + redirect or reset depending on context.

---

## 29.1 Auth

### Login

- **Fields**: email (email, required), password (password, required),
  remember (toggle, optional).
- **Validation**: email format; password ≥ 8.
- **Errors**: "Email is required", "Invalid email", "Password is
  required", "Incorrect credentials".
- **Submit**: `POST /api/auth/login` → set tokens → redirect to `?next`
  or `/`.
- **Loading**: button "Signing in…" with spinner.
- **Success**: toast "Welcome back".

### Register (dashboard)

- **Fields**: full name (text, required), email, password (password,
  meter), confirm password, accept terms (checkbox, required).
- **Validation**: password strength, match, terms accepted.
- **Errors**: granular per field + "Please accept terms".
- **Submit**: `POST /api/auth/register` → auto-login.

### Public register

- Same as register, minus org context.

### Profile edit

- **Fields**: name, avatar (upload), phone (optional), locale (select).
- **Submit**: `PUT /api/auth/profile`.

### Change password

- **Fields**: current password, new password (meter), confirm.
- **Validation**: new ≠ current; meets policy.
- **Submit**: `POST /api/auth/change-password`.

### Accept invitation

- **Fields**: name (prefill), password (if new), accept (button).
- **Submit**: `POST /api/organizations/invitations/{token}/accept`.

---

## 29.2 Organizations

### Create / edit org

- **Fields**: name (required), slug (auto, editable, unique), logo
  (upload), description, website (URL), country (select), default
  language (select), timezone (select).
- **Validation**: slug pattern, URL format.

### Invite member

- **Fields**: email (required), role (select, required), message
  (optional).
- **Submit**: `POST /api/organizations/:id/invitations`.

### Remove member confirm

- Typed confirm: "remove" to enable button.

---

## 29.3 Sports

### Create / edit sport

- **Fields**: name, code (e.g., FOOT), description, default rules JSON
  (advanced), icon.
- **Validation**: unique code per org (server-validated).

---

## 29.4 Tournaments

### Create wizard

- **Step 1**: name, sport (select), format (League / Knockout / Group +
  Knockout), competition type (single / double round-robin / group),
  season, gender, division, logo.
- **Step 2**: schedule (start/end), venues (multi-select), max teams.
- **Step 3**: rules (points for W/D/L, tie-break order, substitutions
  config, period config) — sport-specific defaults.
- **Step 4**: review.
- **Validation**: end ≥ start; max teams > 1; format-specific (e.g.,
  knockout requires 2/4/8/16/32...).

### Edit tournament

- Same fields, status-gated (some fields lock once "Open Registration").

### Status update

- **Fields**: target status (select), reason (text).
- **Submit**: `POST /api/tournaments/:id/status`.

### Team registration

- **Fields**: team (select from org teams or create new), seed (optional
  for knockouts), group (if grouped).

### Fixture generator

- **Fields**: method (round-robin, single-elim, double-elim, swiss,
  custom), start date, slot duration, venue rotation toggle.

---

## 29.5 Teams

### Create / edit team

- **Fields**: name, short name, sport, crest (upload), founded (year),
  home venue, primary colour, secondary colour, captain (player select).
- **Validation**: unique name per tournament series.

---

## 29.6 Players

### Create / edit player

- **Fields**: full name, dob (date), nationality, position (sport-aware
  select), preferred foot/hand (select), height (cm), weight (kg), jersey
  number (default), photo (upload), team (multi-select with primary
  flag).
- **Validation**: age ≥ tournament minimum.

### Assign to team

- **Fields**: team (select), since (date), until (optional), is
  captain (toggle).
- **Submit**: `POST /api/players/:id/teams`.

---

## 29.7 Matches

### Create / edit match

- **Fields**: tournament (select, prefilled if from context), team A
  (select), team B (select), sport (auto from tournament), venue,
  scheduled date/time, duration estimate, officials (multi-select with
  role), match type (group / knockout / friendly / free), notes.
- **Validation**: A ≠ B, no conflict at venue/time, both teams
  registered in tournament.

### Update match

- Same fields, with audit on changes.

### Officials assignment

- **Fields**: user (search), role (select), notes.
- **Submit**: `POST /api/matches/:id/officials`.

### Lifecycle reasons (per action)

- **Suspend**: reason chips (rain, power, injury, dispute, other +
  text).
- **Postpone**: new datetime, reason.
- **Abandon**: reason (required text).

---

## 29.8 Scoring — Generic event entry

- **Fields**: event type (select), team (radio A/B), player (combobox),
  value (number where applicable), minute/over/quarter,
  metadata (per type), notes (optional).
- **Validation**: server-side validate endpoint pre-flight.

---

## 29.9 Scoring — Cricket

### Innings start

- **Fields**: batting team (radio), bowling team (auto), opening
  batsmen × 2 (combobox), opening bowler (combobox), powerplay overs
  (if T20).
- **Validation**: 2 distinct batsmen, bowler from opposing team.

### Delivery / ball

- **Fields**: batsman (default striker), bowler (auto), runs off bat
  (0–6, free input for boundary plus), extras (wide/no-ball/bye/leg-
  bye with values), wicket (toggle → wicket type, fielder, new batsman
  fields).
- **Validation**: free-hit logic if previous no-ball; wicket type
  required if wicket.

### DRS request

- **Fields**: reviewing team, batsman / bowler, reason (chips:
  caught-behind, LBW, run-out, stumping, other + text), third umpire
  (select).

### DRS decision

- **Fields**: decision (upheld / overturned / pending), reason (text),
  impact (score change preview, computed).

### Super over start / delivery / complete

- Same patterns as innings.

---

## 29.10 Scoring — Football

### Lineup

- **Fields**: formation, starting XI (drag-drop tokens), bench (multi-
  select), captain (select), GK (auto), squad numbers.

### Substitution

- **Fields**: out (select from on-field), in (select from bench),
  minute, reason (chip: tactical / injury / red-card replacement).

### Goal entry

- **Fields**: scorer, assister (optional), shot type (chip), body part,
  position chip, penalty / own-goal flags.

### Card

- **Fields**: player, type (yellow / red / second-yellow), reason
  (chip).

### Event correction

- **Fields**: editable subset of original event + reason (required).

### Period end

- **Fields**: confirm score, injury time added.

### VAR initiate / decision

- **Fields**: incident type, related event id, on-field decision,
  location chip; decision: confirm / overturn / no review, final
  decision text, clip URL.

### Penalty initialize / start / kick / abandon

- **Initialize**: team order, taker lists.
- **Kick**: kicker (auto), result (scored/saved/missed/post/bar), GK,
  save position.
- **Abandon**: reason.

### Eligibility lineup

- **Fields**: lineup payload sent to eligibility check;
  no manual fields — invokes from lineup save.

---

## 29.11 Scoring — Basketball

### Initialize

- **Fields**: starting fives (both teams), tip-off team, period length,
  shot clock length, foul-out threshold.

### Field goal / 3PT

- **Fields**: shooter, points (2/3), shot type (jumper / layup /
  dunk), assister (optional), contested flag, location chip.

### Free throw

- **Fields**: shooter, attempt # (e.g., 1 of 2), make/miss.

### Rebound

- **Fields**: rebounder, type (O/D).

### Foul

- **Fields**: fouled player, fouler, type (personal / technical /
  flagrant), shooting flag, FTs resulting.

### Timeout

- **Fields**: team, type (full / short / official), reason (optional).

### Period start / end

- Confirmation only.

### Overtime start

- Confirm period length.

### End game

- Confirm final score; MVP optional.

### Clock — game / shot

- **Fields**: action (start/stop/set), seconds (when set), reason
  (optional, for set).

---

## 29.12 Standings

### Recalculate

- Confirmation only (lists pending changes).

### Snapshot

- **Fields**: name, note (optional).

### Snapshot restore

- Typed confirm.

---

## 29.13 Notifications

### Settings

- Per-category toggles, quiet hours range, mute org toggle.

---

## 29.14 Overlays

### Create / edit template

- **Fields**: name, category (chip), sport(s), layers JSON (via
  editor), theme tokens.

### Create overlay

- Wizard: match → template → position preset → theme override →
  visibility rules → review.

### Activate / deactivate

- Confirmation only; activation may include "schedule for".

---

## 29.15 Formation & annotation

### Formation save

- **Fields**: formation name, players × positions JSON.

### Annotation create / edit

- **Fields**: title, description, related event id (optional), layer
  data JSON.

---

## 29.16 RBAC

### Create / edit role

- **Fields**: name, slug (auto), description, permissions (matrix).
- **Validation**: at least 1 permission; warn on dangerous combos.

### Assign role to user

- **Fields**: role (select), scope (org), expires (optional).

---

## 29.17 Billing

### Add payment method

- **Fields**: collected by Stripe Elements; our form only collects
  cardholder name + set-as-default toggle.

### Upgrade / downgrade

- **Fields**: target plan (select), period (radio), payment method
  (select).

### Cancel

- **Fields**: reason (chips + text), cancel date (radio: now / end of
  period), typed confirm.

---

## 29.18 Sync

### Conflict resolution

- **Fields**: strategy (keep-mine / keep-theirs / merge / insert-as-
  new), per-field choices (when merge).

### Device naming

- **Fields**: device name (default suggestion).

---

## 29.19 Admin

### Create / edit tenant

- **Fields**: org name, owner email, plan, region, notes.

### Edit plan

- **Fields**: name, prices, quotas, features.

---

## Form patterns (cross-cutting)

- **Required fields** marked with `*` next to label and
  `aria-required="true"`.
- **Errors** rendered below the field in `--color-danger`, with icon, and
  announced via `aria-live="polite"` on the form.
- **Helper text** below the input in `--text-secondary`.
- **Default values** match the most common case; placeholders are not
  used in lieu of labels.
- **Submit behaviour**: optimistic where safe; spinner in button; disable
  to prevent double-submit.
- **Loading state**: button shows spinner + "Saving…"; the form body
  remains editable (so the user can correct on error).
- **Success state**: toast + redirect or close + reset; for inline
  edits, swap to read mode with a "Saved" pill.
- **Reset behaviour**: explicit "Reset" only on multi-step wizards;
  otherwise navigation away prompts "Discard changes?" if dirty.
- **Autosave** for tactical board + lineup + report builder (every 5s
  while editing).
- **Keyboard**: `Enter` submits, `Esc` cancels modals, `Cmd/Ctrl+S`
  saves where applicable.
