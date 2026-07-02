# Login Design Specifications

**Last Updated:** July 1, 2026 | **Status:** Production Ready

---

## Overview

This document specifies the UX/UI design for the KhelSetu login interface. Implementation should follow these specifications exactly.

---

## Current Implementation Status

✅ **Completed:**
- Real-time email validation with visual feedback
- Password strength indicator (4-level visual scale)
- Success checkmark for valid email
- Submit button disabled until form valid
- Dark mode support
- Micro-animations with prefers-reduced-motion support
- ARIA labels for accessibility

⏳ **Recommended (Phase 2):**
- Multi-stage loading states during authentication
- Mobile touch target optimization (48px minimum)
- Advanced error recovery flows

---

## Visual Design

### Layout

**Desktop (1440px+):**
- Center card on page
- Card width: 400px max
- Padding: 32px (var(--spacing-8))
- Background: White (light) / Slate-800 (dark)
- Rounded corners: 12px (var(--radius-lg))

**Mobile (375px):**
- Full screen with safe margins
- Padding: 16px (var(--spacing-4))
- Rounded corners: 8px (var(--radius-md))
- Touch targets: minimum 48px height

### Color Scheme

**Light Mode:**
- Background: #FFFFFF (var(--bg-primary))
- Text: #0F172A (var(--text-primary))
- Border: #E2E8F0 (var(--border-subtle))
- Primary button: #7F1D1D (var(--brand-primary))
- Success: #16A34A (var(--color-success))
- Error: #DC2626 (var(--color-error))

**Dark Mode:**
- Background: #1E293B (var(--bg-secondary))
- Text: #F8FAFC (var(--text-primary))
- Border: #334155 (var(--border-subtle))
- Primary button: #A82121 (lighter maroon)
- Success/Error: Same as light mode

---

## Form Structure

### Email Field

**State: Idle (default)**
- Border: 1px solid var(--border-subtle)
- Background: var(--bg-primary)
- Text color: var(--text-primary)
- Placeholder: "Email address"

**State: Focused**
- Border: 2px solid var(--brand-primary)
- Outline: 2px solid var(--brand-primary)
- Outline-offset: 2px
- Background: unchanged

**State: Validating (after blur)**
- Border: 2px solid var(--border-subtle)
- Right icon: spinner (rotating 360° over 1s)
- Opacity: 0.6

**State: Valid**
- Border: 2px solid var(--color-success)
- Right icon: checkmark (✓)
- Animation: scaleIn 200ms ease-out

**State: Invalid (touched + error)**
- Border: 2px solid var(--color-error)
- Right icon: X mark
- Error message below field: red text (var(--color-error))
- Animation: shake 200ms ease-out

### Password Field

**Base Styling:**
- Same as email field
- Icon: eye toggle (show/hide password)

**Password Strength Indicator:**

Below password field, show progress bar:

```
Weak (Red):
████░░░░░░ 20% | Weak - Add uppercase, numbers, symbols

Fair (Orange):
████████░░ 50% | Fair - Add more characters

Good (Amber):
██████████ 75% | Good - Consider special characters

Strong (Green):
██████████ 100% | Strong - Excellent password
```

**Criteria Checklist:**
```
□ At least 8 characters
□ Contains uppercase letter (A-Z)
□ Contains lowercase letter (a-z)
□ Contains number (0-9)
□ Contains special character (!@#$%^&*)
```

Updates as user types (real-time).

### Remember Me Checkbox

- Size: 48px × 48px (mobile touch target)
- Label: "Remember me"
- Font size: 14px (var(--font-size-sm))
- Color: var(--text-secondary)
- Checked: maroon background with white checkmark

### Submit Button

**State: Disabled (form invalid)**
- Background: #D1D5DB (gray-300)
- Text: #6B7280 (gray-500)
- Cursor: not-allowed
- No hover effect

**State: Enabled (form valid)**
- Background: var(--brand-primary) (#7F1D1D)
- Text: #FFFFFF
- Cursor: pointer
- Hover: background #5C1414 (darker)
- Active: background #3D0F0F (even darker)

**State: Loading**
- Background: var(--brand-primary)
- Show: animated spinner inside button
- Text: "Signing in..."
- Disabled: true (prevent double-click)
- Duration: 200ms fade in/out of spinner

---

## Animations

### Field Validation

**Fade In (error message):**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
Duration: 200ms
Timing: ease-out
```

**Scale In (success checkmark):**
```css
@keyframes scaleIn {
  from { transform: scale(0.5); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
Duration: 200ms
Timing: ease-out
```

**Shake (error state):**
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}
Duration: 200ms
Timing: ease-in-out
```

**Spinner (validating):**
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
Duration: 1s
Timing: linear
Repeat: infinite
```

### Respect Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Validation Rules

### Email Validation

1. **Format:** Must be valid email format
   - Pattern: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
   - Example: `user@example.com` ✓
   - Example: `invalid.email` ✗

2. **Timing:** Validate on blur (not on keystroke)

3. **Debounce:** 500ms wait after user stops typing

4. **Backend Check:** Verify email exists in system (if needed)

### Password Validation

1. **Format:** Must be at least 8 characters
   - Length: `password.length >= 8`

2. **Strength:** Calculate from character diversity
   - Uppercase: at least one A-Z
   - Lowercase: at least one a-z
   - Number: at least one 0-9
   - Special: at least one !@#$%^&*

3. **Timing:** Real-time as user types (no debounce)

---

## Error Messages

### Email Errors

```
Missing email:
"Email address is required"

Invalid format:
"Enter a valid email address"

Email not found:
"Email address not registered"

Duplicate email (on register):
"This email is already registered"
```

### Password Errors

```
Missing password:
"Password is required"

Too short:
"Password must be at least 8 characters"

Weak password (on register):
"Password must include uppercase, lowercase, number, and symbol"

Incorrect password (on login):
"Email or password is incorrect"
```

### General Errors

```
Server error:
"Something went wrong. Please try again."

Network error:
"Check your internet connection"

Rate limit:
"Too many attempts. Try again in 5 minutes."
```

---

## Accessibility (WCAG AA)

### Labels & Descriptions

```tsx
<label htmlFor="email" className="block text-sm font-medium">
  Email Address
</label>
<input
  id="email"
  type="email"
  aria-describedby="email-error"
  aria-invalid={hasError}
/>
<span id="email-error" role="alert" className="text-red-600">
  {error}
</span>
```

### Keyboard Navigation

- Tab: Focus email → password → remember me → submit button
- Shift+Tab: Focus in reverse order
- Enter: Submit form when focused on button
- Space: Toggle checkbox

### Screen Reader Support

- Labels read as field name
- Error messages read as alerts
- Required fields marked with aria-required
- Form state announced (valid/invalid)

### Focus Indicators

```css
input:focus-visible {
  outline: 2px solid var(--brand-primary);
  outline-offset: 2px;
}
```

### Color Contrast

- Text on white: 18.5:1 contrast (WCAG AAA)
- Text on button: 12:1 contrast (WCAG AAA)
- Error text: 9:1 contrast (WCAG AA)

---

## Mobile Optimization

### Touch Targets

Minimum 48px × 48px for all interactive elements:

```tsx
// Email input
<input className="h-12 px-3 py-2" />  /* 48px height */

// Password input
<input className="h-12 px-3 py-2" />  /* 48px height */

// Checkbox
<input type="checkbox" className="w-12 h-12" />  /* 48×48px */

// Submit button
<button className="h-12 px-6" />  /* 48px height */
```

### Keyboard Optimization

```tsx
<input
  type="email"
  inputMode="email"
  autoComplete="email"
/>

<input
  type="password"
  autoComplete="current-password"
/>
```

### Responsive Typography

```css
/* Mobile: 14px base */
@media (max-width: 640px) {
  body { font-size: 14px; }
  h1 { font-size: 24px; }
  label { font-size: 13px; }
}

/* Desktop: 16px base */
@media (min-width: 641px) {
  body { font-size: 16px; }
  h1 { font-size: 32px; }
  label { font-size: 14px; }
}
```

---

## Dark Mode

### Toggle Implementation

```tsx
export function ThemeToggle() {
  const { isDark, toggle } = useDarkMode();
  
  return (
    <button onClick={toggle} aria-label="Toggle dark mode">
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
```

### CSS Variables (Auto-applied)

```css
/* Light mode (default) */
--text-primary: #0F172A;
--bg-primary: #FFFFFF;
--border-subtle: #E2E8F0;

/* Dark mode (when .dark class active) */
@media (prefers-color-scheme: dark) {
  --text-primary: #F8FAFC;
  --bg-primary: #1E293B;
  --border-subtle: #334155;
}
```

---

## Testing Checklist

### Visual Testing
- [ ] Form renders at 375px (mobile)
- [ ] Form renders at 768px (tablet)
- [ ] Form renders at 1440px (desktop)
- [ ] Hover states visible on desktop
- [ ] Dark mode colors verified
- [ ] Icons render correctly

### Functionality
- [ ] Email validation on blur
- [ ] Password strength updates real-time
- [ ] Success checkmark shows when valid
- [ ] Submit button disabled until valid
- [ ] Error messages appear with animation
- [ ] Remember me checkbox toggles
- [ ] Form submission works

### Accessibility
- [ ] Tab through form in correct order
- [ ] Focus visible on all elements
- [ ] Screen reader announces errors
- [ ] Keyboard-only navigation works
- [ ] Color contrast verified (WCAG AA)
- [ ] Error messages have role="alert"

### Performance
- [ ] Form interaction < 100ms latency
- [ ] Animations 60fps (no jank)
- [ ] No layout shifts (CLS < 0.1)
- [ ] Bundle size increase < 10KB

---

**Version:** 1.0 | **Status:** Complete Specification
