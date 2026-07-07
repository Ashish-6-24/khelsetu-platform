export const billingUtils = {
  formatCurrency: (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount),
  isSubscriptionActive: (subscription: { status: string; endDate: string }) =>
    subscription.status === 'active' &&
    new Date(subscription.endDate) > new Date(),
};
