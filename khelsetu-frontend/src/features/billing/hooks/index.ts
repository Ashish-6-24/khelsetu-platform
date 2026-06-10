import { billingService } from '@features/billing/services';
import { useBillingStore } from '@features/billing/store';
import type { Invoice, Plan, Subscription } from '@features/billing/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useEffect } from 'react';

export const useBilling = () => {
  const queryClient = useQueryClient();
  const {
    subscription,
    invoices,
    availablePlans,
    paymentMethods,
    setSubscription,
    setInvoices,
    setPlans,
  } = useBillingStore();

  const { data: plansData, isLoading: loadingPlans } = useQuery<Plan[]>({
    queryKey: ['billing-plans'],
    queryFn: () => billingService.getPlans(),
  });

  const { data: subscriptionData, isLoading: loadingSubscription } =
    useQuery<Subscription | null>({
      queryKey: ['billing-subscription'],
      queryFn: () => billingService.getSubscription(),
    });

  const { data: invoicesData, isLoading: loadingInvoices } = useQuery<
    Invoice[]
  >({
    queryKey: ['billing-invoices'],
    queryFn: () => billingService.getInvoices(),
  });

  useEffect(() => {
    if (plansData) setPlans(plansData);
  }, [plansData, setPlans]);

  useEffect(() => {
    if (subscriptionData) setSubscription(subscriptionData);
  }, [subscriptionData, setSubscription]);

  useEffect(() => {
    if (invoicesData) setInvoices(invoicesData);
  }, [invoicesData, setInvoices]);

  const updatePlanMutation = useMutation({
    mutationFn: (planId: string) => billingService.updatePlan(planId),
    onSuccess: (data) => {
      setSubscription(data);
      queryClient.invalidateQueries({ queryKey: ['billing-subscription'] });
    },
  });

  const cancelSubscriptionMutation = useMutation({
    mutationFn: () => billingService.cancelSubscription(),
    onSuccess: () => {
      setSubscription(null);
      queryClient.invalidateQueries({ queryKey: ['billing-subscription'] });
    },
  });

  return {
    subscription,
    invoices,
    availablePlans,
    paymentMethods,
    isLoading: loadingPlans || loadingSubscription || loadingInvoices,
    updatePlan: updatePlanMutation.mutate,
    cancelSubscription: cancelSubscriptionMutation.mutate,
    isUpdatingPlan: updatePlanMutation.isPending,
    isCancelling: cancelSubscriptionMutation.isPending,
  };
};
