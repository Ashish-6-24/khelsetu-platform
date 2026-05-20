import { Badge, type BadgeVariant } from '@components/ui/Badge';
import { motion } from 'framer-motion';

type MatchStatus =
  | 'scheduled'
  | 'live'
  | 'completed'
  | 'cancelled'
  | 'postponed';

interface MatchStatusIndicatorProps {
  status: MatchStatus;
  startedAt?: string;
  endedAt?: string;
}

const config: Record<
  MatchStatus,
  { color: BadgeVariant; label: string; icon: string }
> = {
  scheduled: { color: 'info', label: 'Scheduled', icon: '🕐' },
  live: { color: 'live', label: 'Live', icon: '🔴' },
  completed: { color: 'success', label: 'Completed', icon: '✅' },
  cancelled: { color: 'error', label: 'Cancelled', icon: '❌' },
  postponed: { color: 'warning', label: 'Postponed', icon: '⏸️' },
};

export const MatchStatusIndicator = ({
  status,
  startedAt,
  endedAt,
}: MatchStatusIndicatorProps) => {
  const { color, label, icon } = config[status];

  return (
    <motion.div className="flex items-center gap-2">
      <span className="text-lg">{icon}</span>
      <Badge variant={color} pulse={status === 'live'}>
        {label}
      </Badge>
      {startedAt && status === 'live' && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Started {new Date(startedAt).toLocaleTimeString()}
        </span>
      )}
      {endedAt && status === 'completed' && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Ended {new Date(endedAt).toLocaleTimeString()}
        </span>
      )}
    </motion.div>
  );
};
