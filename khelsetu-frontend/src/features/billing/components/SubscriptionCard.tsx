import { Badge } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import { Card, CardBody } from '@components/ui/Card';
import type { Subscription } from '@features/billing/types';
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
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {planName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ${subscription.amount}/{subscription.currency}
              </p>
            </div>
            <Badge variant={getStatusColor(subscription.status)}>
              {subscription.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-gray-500 dark:text-gray-400">Start Date</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(subscription.startDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-gray-500 dark:text-gray-400">End Date</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {new Date(subscription.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <CreditCard className="w-4 h-4 text-gray-400" />
            <p className="text-gray-500 dark:text-gray-400">
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
