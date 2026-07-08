import type { Plan } from '@features/billing/types';
import { Button } from '@shared/ui/Button';
import { Card, CardBody } from '@shared/ui/Card';
import { Check } from 'lucide-react';

interface PlanCardProps {
  plan: Plan;
  isCurrentPlan: boolean;
  onSelect: (planId: string) => void;
  isLoading?: boolean;
}

export const PlanCard = ({
  plan,
  isCurrentPlan,
  onSelect,
  isLoading,
}: PlanCardProps) => {
  return (
    <Card className={isCurrentPlan ? 'ring-2 ring-blue-500' : ''}>
      <CardBody>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
              {plan.name}
            </h3>
            <div className="mt-2">
              <span className="text-3xl font-bold text-[var(--text-primary)] dark:text-white">
                ${plan.price}
              </span>
              <span className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                /{plan.interval}
              </span>
            </div>
          </div>

          <ul className="space-y-2">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          {plan.maxTournaments && (
            <div className="text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
              Up to {plan.maxTournaments} tournaments
            </div>
          )}

          <Button
            variant={isCurrentPlan ? 'outline' : 'primary'}
            className="w-full"
            onClick={() => onSelect(plan.id)}
            disabled={isCurrentPlan || isLoading}
          >
            {isCurrentPlan ? 'Current Plan' : 'Upgrade'}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
