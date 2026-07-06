import type { Subscription } from '@features/billing/types';
import { Badge } from '@shared/ui/Badge';
import { Button } from '@shared/ui/Button';
import { Card, CardBody } from '@shared/ui/Card';
import { Calendar, CreditCard, X } from 'lucide-react';

interface SubscriptionCardProps {
  subscription: Subscription;
  planName: string;
  onCancel: () => void;
  isCancelling?: boolean;
}

export const SubscriptionCard = ({
  subscription,
  planName,
  onCancel,
  isCancelling,
}: SubscriptionCardProps) => {
  const getStatusColor = (status: Subscription['status']) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'trialing':
        return 'info';
      case 'cancelled':
        return 'warning';
      case 'expired':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardBody>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
                {planName}
              </h3>
              <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                ${subscription.amount}/{subscription.currency}
              </p>
            </div>
            <Badge variant={getStatusColor(subscription.status)}>
              {subscription.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--text-tertiary)]" />
              <div>
                <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                  Start Date
                </p>
                <p className="font-medium text-[var(--text-primary)] dark:text-white">
                  {new Date(subscription.startDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--text-tertiary)]" />
              <div>
                <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                  End Date
                </p>
                <p className="font-medium text-[var(--text-primary)] dark:text-white">
                  {new Date(subscription.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="w-4 h-4 text-[var(--text-tertiary)]" />
            <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
              Auto-renewal: {subscription.autoRenew ? 'Enabled' : 'Disabled'}
            </p>
          </div>

          {subscription.status === 'active' && (
            <Button
              variant="outline"
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              onClick={onCancel}
              isLoading={isCancelling}
            >
              <X className="w-4 h-4 mr-1" />
              Cancel Subscription
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
