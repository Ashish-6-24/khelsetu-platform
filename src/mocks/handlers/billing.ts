import { http, HttpResponse } from 'msw';

const plans = [
  { id: 'free', name: 'Free', price: 0, interval: 'month', features: ['3 tournaments', 'Basic scoring', '10 teams'] },
  { id: 'pro', name: 'Pro', price: 999, interval: 'month', features: ['Unlimited tournaments', 'Advanced scoring', '100 teams', 'Analytics'] },
  { id: 'enterprise', name: 'Enterprise', price: 4999, interval: 'month', features: ['Everything in Pro', 'Custom branding', 'API access', 'Priority support'] },
];

const subscription = { id: 'sub-1', planId: 'free', status: 'active', currentPeriodStart: '2026-07-01T00:00:00Z', currentPeriodEnd: '2026-08-01T00:00:00Z' };

const invoices = [
  { id: 'inv-1', amount: 0, status: 'paid', date: '2026-07-01T00:00:00Z', description: 'Free Plan' },
];

export const billingHandlers = [
  http.get('*/billing/plans', () => HttpResponse.json({ data: plans })),
  http.get('*/billing/subscription', () => HttpResponse.json({ data: subscription })),
  http.get('*/billing/invoices', () => HttpResponse.json({ data: invoices })),
  http.post('*/billing/subscription/update', () => HttpResponse.json({ success: true, data: subscription })),
  http.post('*/billing/subscription/cancel', () => HttpResponse.json({ success: true })),
];
