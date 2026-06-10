# 04 — Authentication & Session UX

## Endpoints covered

```
POST /api/auth/register
POST /api/public/users/register
POST /api/auth/login
POST /api/auth/refresh
POST /api/auth/logout
GET  /api/auth/navigation
GET  /api/auth/me
PUT  /api/auth/profile
POST /api/auth/change-password
```

## Public vs. dashboard user

The API has two distinct registration surfaces:

- `/api/public/users/register` — light registration for fans / free-match
  creators. No organisation required.
- `/api/auth/register` — dashboard registration. Same shape, but the resulting
  session is bound for the dashboard shell.

Both produce a `JWT + refresh` pair. The UI must keep these two flows visually
distinct but technically unified (single `authStore`).

## Screens

### 4.1 Login — `/login`
- **Layout:** AuthLayout. Centered card, max-w-md.
- **Fields:** email, password (with show/hide toggle), remember-me (default on).
- **Affordances:** "Forgot password?", "Create account" (links to
  `/register`).
- **Submit:** loading → success → redirect to `?next=` or `/o` (org picker).
- **Errors:** Inline below fields; "Invalid email or password" is the only
  generic message; rate-limit shows a banner with cooldown timer.
- **A11y:** Email and password inputs use `autocomplete="email"` and
  `current-password`. The "show password" toggle announces the new state.
- **Mobile:** Same layout, just centered.

### 4.2 Register (dashboard) — `/register`
- **Fields:** full name, email, password, confirm password, organisation
  intent radio (create / join via invite / skip for now).
- **Validation:** Zod schema — password min 10 chars, mixed case + number;
  email RFC-compliant.
- **Strength meter:** visible on password field (3-bar minimum).
- **Submit:** creates user → if "create org", routes to org-create wizard
  passing `?from=register`; if "join", routes to `/invitations/accept`; if
  "skip", routes to `/onboarding/free-match` (public flow).
- **ToS + privacy** checkbox required, with inline links.

### 4.3 Register (public) — `/signup`
- **Fields:** full name, email, password, confirm password.
- **Visual:** marketing-friendly — uses PublicLayout, hero panel on the left
  ("Watch and run sports, free").
- **Submit:** routes to `/me` profile with welcome modal.

### 4.4 Forgot password — `/forgot-password`
- Email-only form. "If an account exists, you'll get a reset link." (No
  account enumeration).
- Success state is identical regardless of whether the email exists.

### 4.5 Reset password — `/reset-password?token=...`
- New password + confirm. Shows password strength and rules.
- Auto-logs-in on success, redirects to `/me`.

### 4.6 Profile — `/me`
- **Header:** avatar, name, role, "Member of N organisations" chip.
- **Sections:** Profile, Security, Sessions, Notifications, Connected devices.
- **Profile:** full name, display name, phone, bio, avatar, locale,
  timezone, default sport.
- **Security:** change password, 2FA (future), recent activity.
- **Sessions:** list active sessions (device, IP, last used, "Sign out" /
  "Sign out all").

### 4.7 Edit profile — `/me/edit`
- Form pre-filled, save button at sticky bottom on mobile.
- Avatar cropper with circular preview.

### 4.8 Change password — `/me/security/password`
- Old + new + confirm. Show strength meter. Re-auth required for some
  privileged changes (billing).

### 4.9 Logout
- **Trigger:** User menu → "Sign out".
- **Behaviour:** Clears auth store, revokes refresh, redirects to `/login`.
- **Confirmation:** No modal — but a toast confirms "Signed out" and any
  in-flight queries are cancelled.

## Token lifecycle

| Trigger | Behaviour |
|---|---|
| Access token expiry (401) | Silent refresh via `/api/auth/refresh`; retry original request once. |
| Refresh fails | Force logout with modal: "Session expired. Please sign in again." |
| 403 (forbidden) | Show "You don't have permission" with a "Request access" link where relevant. |
| 401 on first load | Redirect to `/login?next=` preserving the URL. |

## Session context (authStore)

```ts
interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  navigation: NavigationNode[]; // from /api/auth/navigation
  isHydrated: boolean;
  signIn(creds): Promise<void>;
  signOut(): Promise<void>;
  refresh(): Promise<void>;
  loadNavigation(): Promise<void>;
}
```

## Route guards

```
<RootRouter>
  <PublicRouter />             // landing, public portal, public overlay, auth
  <RequireAuth>
    <DashboardRouter>          // /o/:orgSlug/*
  </RequireAuth>
</RootRouter>
```

Inside the dashboard:

- `<RequireOrgMember orgSlug>` — 403 if not a member.
- `<RequireRole roles={['owner', 'admin']}>` — UI-only.
- `<Can permission="overlay:write">` — button-level guard.

## Loading and error handling

- Initial auth hydration: a `<AuthBoot>` component renders a centred logo
  spinner for ≤ 500 ms; never a long blocking screen.
- All auth pages share a consistent error region (`<AuthError>`) with icon,
  message, and optional retry.
- Network errors show a "Connection problem" banner with a "Retry" button.

## Public session vs. dashboard session

- Both share the same `authStore`.
- `navigation` returned by `/api/auth/navigation` differs based on user type:
  public users get a small set (Tournaments, Plans, Help) — but the dashboard
  shell is hidden for them.
- The router checks `user.type === 'public'` and routes public users to a
  lightweight `/me` instead of the dashboard.

## A11y specifics

- All form errors announced via `aria-live="polite"` summary at the top of
  the form.
- Password managers honoured (no `autocomplete="off"` overrides).
- `prefers-reduced-motion` respected on the auth-card entrance animation.
- Focus is moved to the first invalid field after a failed submit.
