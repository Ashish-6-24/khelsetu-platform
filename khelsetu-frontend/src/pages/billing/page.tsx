import {
  InvoiceList,
  PlanCard,
  SubscriptionCard,
} from '@features/billing/components';
import { useBilling } from '@features/billing/hooks';
import { Card, CardBody } from '@shared/components/ui/Card';
import { Tabs } from '@shared/components/ui/Tabs';

import { useState } from 'react';

const TABS = [
  { id: 'plans', label: 'Plans' },
  { id: 'subscription', label: 'Subscription' },
  { id: 'invoices', label: 'Invoices' },
];

export const BillingPage = () => {
  const [activeTab, setActiveTab] = useState('plans');
  const {
    subscription,
    invoices,
    availablePlans,
    isLoading,
    updatePlan,
    cancelSubscription,
    isUpdatingPlan,
    isCancelling,
  } = useBilling();

  const handleSelectPlan = (planId: string) => {
    updatePlan(planId);
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      cancelSubscription();
    }
  };

  const currentPlan = availablePlans.find((p) => p.id === subscription?.planId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] dark:text-white">
          Billing & Subscription
        </h1>
        <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] mt-1">
          Manage your plan, view invoices, and update payment methods
        </p>
      </div>

      <Tabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardBody>
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-gray-200 dark:bg-[var(--bg-surface-raised)] rounded w-24" />
                  <div className="h-8 bg-gray-200 dark:bg-[var(--bg-surface-raised)] rounded w-32" />
                  <div className="space-y-2">
                    {[1, 2, 3].map((j) => (
                      <div
                        key={j}
                        className="h-3 bg-gray-200 dark:bg-[var(--bg-surface-raised)] rounded"
                      />
                    ))}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {activeTab === 'plans' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availablePlans
                .sort((a, b) => a.priority - b.priority)
                .map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    isCurrentPlan={subscription?.planId === plan.id}
                    onSelect={handleSelectPlan}
                    isLoading={isUpdatingPlan}
                  />
                ))}
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="max-w-2xl">
              {subscription && currentPlan ? (
                <SubscriptionCard
                  subscription={subscription}
                  planName={currentPlan.name}
                  onCancel={handleCancel}
                  isCancelling={isCancelling}
                />
              ) : (
                <Card>
                  <CardBody>
                    <div className="text-center py-12">
                      <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                        No active subscription
                      </p>
                      <button
                        className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
                        onClick={() => setActiveTab('plans')}
                      >
                        Browse Plans
                      </button>
                    </div>
                  </CardBody>
                </Card>
              )}
            </div>
          )}

          {activeTab === 'invoices' && <InvoiceList invoices={invoices} />}
        </>
      )}
    </div>
  );
};
