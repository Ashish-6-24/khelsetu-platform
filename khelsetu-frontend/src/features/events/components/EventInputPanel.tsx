import { Card, CardBody, CardHeader } from '@shared/ui/Card';
import { clsx } from 'clsx';

import type { LiveEventType, SportType } from '../types';
import { getEventConfig, getSportEvents } from '../utils/eventCreators';

interface EventInputPanelProps {
  sport: SportType;
  onEventSelect: (type: LiveEventType) => void;
  disabled?: boolean;
}

export const EventInputPanel = ({
  sport,
  onEventSelect,
  disabled = false,
}: EventInputPanelProps) => {
  const eventTypes = getSportEvents(sport);

  return (
    <Card glass>
      <CardHeader>
        <h3 className="text-sm font-semibold text-[var(--text-primary)] dark:text-white">
          Add Event
        </h3>
      </CardHeader>
      <CardBody padding="sm">
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {eventTypes.map((type) => {
            const config = getEventConfig(sport, type);
            return (
              <button
                key={type}
                onClick={() => onEventSelect(type)}
                disabled={disabled}
                className={clsx(
                  'flex flex-col items-center gap-1.5 p-3 min-h-[44px] rounded-xl text-center',
                  'transition-all duration-200',
                  'border border-[var(--border-subtle)] dark:border-[var(--border-subtle)]/50',
                  'bg-[var(--bg-surface)]/60 dark:bg-[var(--bg-surface)]/60',
                  'hover:bg-[var(--bg-surface)] dark:hover:bg-[var(--bg-surface-raised)]/60',
                  'hover:border-[var(--border-subtle)] dark:hover:border-gray-600',
                  'hover:-translate-y-0.5 hover:shadow-md',
                  'active:translate-y-0',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]',
                  disabled &&
                    'opacity-40 cursor-not-allowed hover:translate-y-0 hover:shadow-none',
                )}
              >
                <span className="text-xl leading-none">{config.icon}</span>
                <span className="text-xs font-medium text-[var(--text-primary)] dark:text-[var(--text-secondary)] leading-tight">
                  {config.label}
                </span>
              </button>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
};
