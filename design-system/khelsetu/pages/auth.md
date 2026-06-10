# Page Override — Auth (Login / Register)

**Overrides MASTER.md** for `/login` and `/register`.

## Style Adjustments

- **Mode:** Trust-first, minimal distraction, fast completion.
- **Density:** Single-column form, max-w-md.
- **Pattern:** Centered card on a soft gradient background.

## Color & Visual

- **Page background:** Subtle gradient `from-blue-50 to-indigo-50` (light) / `from-gray-900 to-gray-800` (dark)
- **Card:** White (light) / `--bg-tertiary` (dark), `shadow-2xl rounded-2xl`, p-8
- **Logo:** Centered above card, slightly larger than app (size 40)
- **No animations** on the card itself (focus on form)

## Component Specs

### Login Form
- Email field: `Input type="email" autocomplete="email"`
- Password field: `Input type="password" autocomplete="current-password"` + show/hide toggle
- "Forgot password?" link, right-aligned, text-sm
- Submit button: full-width, primary, size="lg"
- Below: "Don't have an account? Sign up" centered, text-sm

### Register Form
- Name field: `Input autocomplete="name"`
- Email field: `Input type="email" autocomplete="email"`
- Password field: with strength indicator (4-segment bar)
- Confirm password field
- Terms checkbox (required)
- Submit: full-width primary, size="lg"
- Below: "Already have an account? Sign in"

## Validation

- On blur (not keystroke)
- Inline error below each field, red-600
- First invalid field auto-focused on submit
- Form-level error summary at top if multiple errors (with anchor links)

## Security UX

- Password strength shown as 4-segment bar (red → amber → blue → green)
- No "confirm password" copy in password value
- Rate-limit messaging: "Too many attempts. Try again in 30s." with countdown

## Accessibility

- Single `<h1>` ("Sign In" / "Create Account")
- All fields have visible labels (no placeholder-only)
- `aria-invalid` on error, `aria-describedby` pointing to error
- Submit button shows loading state with `aria-busy="true"`
- After error, focus first invalid field, `aria-live="assertive"` announces error
- Full keyboard navigation; Enter submits form
