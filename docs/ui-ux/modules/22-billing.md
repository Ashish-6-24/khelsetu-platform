# 22 — Billing UX

## Endpoints touched (frontend-facing)

Public:
```
GET  /api/public/plans
GET  /api/public/user/quota
POST /api/public/matches/create   (quota-enforced)
```

Dashboard (treat as required even if some are not yet documented):
```
GET    /api/billing/subscription
POST   /api/billing/subscription                  (create / change plan)
DELETE /api/billing/subscription                  (cancel)
GET    /api/billing/usage
GET    /api/billing/invoices
GET    /api/billing/invoices/{id}
GET    /api/billing/payment-methods
POST   /api/billing/payment-methods
DELETE /api/billing/payment-methods/{id}
POST   /api/billing/checkout/session              (Stripe-style checkout)
POST   /api/billing/portal/session                (Stripe-style customer portal)
```

> **Note for backend team:** the public surface today only exposes `plans`
> and `quota`. The dashboard pages below require subscription, usage,
> invoice, and payment-method endpoints. These are flagged in §18 of the
> deliverables (Missing frontend-facing backend needs).

## Mental model

Billing is a **first-class module** with three personas in mind:

- **Public visitor / free user** — sees pricing, can subscribe.
- **Org owner** — manages subscription, invoices, payment methods, quota.
- **Org admin** — read-only view, may be granted `billing:write` by owner.

The product runs on **per-org subscriptions**. Plans are fetched live
(`/api/public/plans`); the UI never hard-codes prices. Quota
(`/api/public/user/quota`) gates free-tier match creation; the dashboard
quota gates organisation-level limits.

## Screens

### 22.1 Pricing page — `/plans` (public)
- **Hero**: "Choose the plan that fits your league."
- **Tier toggle**: monthly / annual (annual shows savings %).
- **Plan cards** (3–4): name, price/period, blurb, feature list, CTA
  ("Get started" / "Contact us"), most-popular ribbon.
- **Comparison table** (collapsible): all features × all plans with
  checks.
- **FAQ accordion**.
- **Social proof** logos.
- **Footer CTA**: "Need a custom plan? Contact sales."

### 22.2 Plan comparison page — `/plans/compare`
- Full-width comparison matrix.
- Sticky tier headers on horizontal scroll.
- Tooltip on each feature explaining the limit/behaviour.

### 22.3 Subscription dashboard — `/o/:orgSlug/billing`
- **Header**: current plan name, status (Active / Trialing / Past due /
  Canceled), renewal date.
- **KPIs**: matches this period, scorers active, overlays in use,
  analytics queries, storage.
- **Quota usage** cards (see 22.5).
- **Quick actions**: Upgrade, Downgrade, Cancel, Manage payment.
- **Next invoice preview**: amount, due date, line items.

### 22.4 Billing history — `/o/:orgSlug/billing/invoices`
- **Table**: invoice #, date, period, amount, status (Paid / Open /
  Past due / Void), download PDF, view detail.
- **Filters**: status, date range, year.
- **Bulk export** (CSV).
- **Empty**: "No invoices yet."

### 22.5 Usage dashboard — `/o/:orgSlug/billing/usage`
- **Per-metric cards** with progress bar and remaining:
  - Matches (current / limit).
  - Scorers (active in period).
  - Overlays active.
  - Analytics queries.
  - Storage GB.
- **Trend chart**: matches per day with limit line.
- **Period selector**: current period / previous.
- **Alerts panel**: any soft / hard warnings (e.g., "90% of matches
  used").

### 22.6 Payment methods manager — `/o/:orgSlug/billing/payment-methods`
- **List**: card brand + last4, expiry, default badge, remove,
  set-default.
- **"Add payment method"** opens hosted Stripe Elements (preferred) or a
  PCI-safe iframe; never collect card numbers directly in our DOM.
- **Failure state**: declined card with retry CTA.

### 22.7 Upgrade flow — `/o/:orgSlug/billing/upgrade`
- **Step 1**: compare current vs target plan.
- **Step 2**: choose period (monthly / annual).
- **Step 3**: payment method (use existing default or add new).
- **Step 4**: proration summary (line items, prorated credit, due now).
- **Step 5**: Confirm → calls `POST /billing/subscription` → success
  screen with new plan badge and "What's new" cards.

### 22.8 Downgrade flow
- Same as upgrade with an extra warning step listing features that will
  be removed at the next renewal.
- "Schedule downgrade for renewal" or "Downgrade now" with proration.

### 22.9 Cancellation flow — `/o/:orgSlug/billing/cancel`
- **Step 1**: reason picker (chips + free text).
- **Step 2**: retention offer (one-time discount or pause).
- **Step 3**: confirm date (now / end of period) and consequences
  (read-only mode after end date, data retention 90 days, export).
- **Step 4**: typed confirm "I want to cancel".
- **Success**: confirmation page with "Restart" CTA, export-my-data link.

### 22.10 Invoices list (see 22.4)

### 22.11 Invoice detail — `/o/:orgSlug/billing/invoices/:id`
- **Header**: invoice number, status badge, total, due date.
- **Bill-to**: org name, address, VAT id.
- **Line items**: description, qty, unit price, total, discounts, tax.
- **Payments**: method, date, amount.
- **Actions**: Download PDF, Pay now (if open), Email to accountant.

### 22.12 Free-tier limit indicators
- **Public user**: small banner in the dashboard or on `/matches/create`
  showing "X of Y free matches remaining" with upgrade CTA.
- **Quota near-limit** (≥80%): amber banner.
- **Quota exceeded**: red banner blocking creation with "Upgrade" CTA.

### 22.13 Plan selection during org creation
- After creating an org, an inline wizard offers free / paid plan
  selection; "Start free" defaults to the free plan.

## Components

- `<PricingCard>`, `<PricingTable>`, `<TierToggle>`,
  `<PlanComparisonMatrix>`, `<SubscriptionHeader>`,
  `<QuotaUsageCard>`, `<UsageTrendChart>`, `<InvoiceTable>`,
  `<InvoiceDetail>`, `<PaymentMethodCard>`, `<AddPaymentMethodModal>`,
  `<UpgradeWizard>`, `<DowngradeWizard>`, `<CancelWizard>`,
  `<QuotaBanner>`, `<RenewalChip>`, `<BillingStatusChip>`,
  `<PlanFeatureList>`.

## UI requirements

- **Pricing cards** with tier name, monthly / annual price, feature
  list, "Most popular" ribbon, primary CTA.
- **Tier badges** (Starter / Pro / Enterprise) consumed across the
  dashboard.
- **Usage bars** with thresholds (50 / 80 / 100 %).
- **Subscription status badges**: Active (green), Trial (blue),
  Past-due (amber), Canceled (grey).
- **Renewal / expiry display**: "Renews on 12 Jul 2026" / "Ends in 5
  days".
- **Upgrade CTAs** placed contextually (near limits) and globally (top
  banner during trial).
- **Limit warnings** at 50 / 80 / 100% (info / warn / error).
- **Billing alerts** sticky banner for past-due invoices.

## States

- **Loading**: skeleton cards / table.
- **Empty (no invoices)**: friendly empty state.
- **Trialing**: blue ribbon "Trial — N days remaining" with upgrade
  banner.
- **Past due**: red banner across the dashboard with "Update payment".
- **Canceled — read-only**: amber banner "Read-only mode — Reactivate".
- **Payment failed**: modal with retry / contact support.

## Permissions

- `billing:read` — view subscription, invoices, usage.
- `billing:write` — change plan, add/remove payment methods, cancel.
- `billing.invoice:read` — view invoice details (separate, for
  accountants).
- Owners can always access; admins only if granted.

## Mobile

- Pricing page is single-column with sticky CTA.
- Tables collapse to cards; invoice detail becomes a full screen.
- Add-payment modal occupies full screen.
- Quota cards are 1-up grid.

## Realtime

- Subscription changes (after Stripe webhook) push `billing:updated` →
  refresh subscription header.
- Usage updates rarely; rely on 60s polling on the usage page.
- Past-due banner appears immediately on Stripe `invoice.payment_failed`
  webhook → push.

## Security / compliance

- **Never** store card numbers in our DOM/storage; use the payment
  provider's hosted fields.
- All billing endpoints require `https`.
- Audit every billing mutation (`audit:read` shows under `entity_type =
  billing`).
- VAT / tax computed server-side; UI displays the result.
- Cancellation includes data export reminder to comply with GDPR/CCPA.

## Accessibility

- Pricing cards: each tier announced as "Plan: Starter, $X per month,
  best for...".
- Progress bars: `role="progressbar"` with min/max/value.
- All money values use proper currency formatting + screen-reader text.
- Wizard steps form a labelled `<nav>` for keyboard navigation.
