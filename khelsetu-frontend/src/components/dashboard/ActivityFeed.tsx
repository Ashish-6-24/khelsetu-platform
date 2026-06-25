import { Card, CardBody, CardHeader } from '@components/ui/Card';
import { RelativeTime } from '@components/ui/RelativeTime';
import { motion } from 'framer-motion';
import {
  Activity,
  CheckCircle2,
  Info,
  Trophy,
  UserPlus,
  Zap,
} from 'lucide-react';

interface ActivityFeedProps {
  activities: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  title: string;
  description?: string;
  time: string | Date;
  type:
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'tournament'
    | 'player'
    | 'live';
}

const typeConfig = {
  info: {
    icon: Info,
    bg: 'bg-blue-500/10',
    color: 'text-blue-600 dark:text-blue-400',
  },
  success: {
    icon: CheckCircle2,
    bg: 'bg-emerald-500/10',
    color: 'text-emerald-600 dark:text-emerald-400',
  },
  warning: {
    icon: Zap,
    bg: 'bg-amber-500/10',
    color: 'text-amber-600 dark:text-amber-400',
  },
  error: {
    icon: Info,
    bg: 'bg-red-500/10',
    color: 'text-red-600 dark:text-red-400',
  },
  tournament: {
    icon: Trophy,
    bg: 'bg-violet-500/10',
    color: 'text-violet-600 dark:text-violet-400',
  },
  player: {
    icon: UserPlus,
    bg: 'bg-cyan-500/10',
    color: 'text-cyan-600 dark:text-cyan-400',
  },
  live: {
    icon: Activity,
    bg: 'bg-rose-500/10',
    color: 'text-rose-600 dark:text-rose-400',
  },
};

export const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  return (
    <Card elevated>
      <CardHeader divided className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            <Activity className="h-4 w-4" size={18} />
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-tight text-[var(--text-primary)]">
              Recent Activity
            </h3>
            <p className="text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
              Latest events across your org
            </p>
          </div>
        </div>
        <button className="text-xs font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          View all
        </button>
      </CardHeader>
      <CardBody padding="none">
        <ul className="divide-y divide-[var(--border-subtle)]">
          {activities.map((activity, idx) => {
            const cfg = typeConfig[activity.type];
            const Icon = cfg.icon;
            return (
              <motion.li
                key={activity.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.3 }}
                className="flex items-start gap-3 px-5 py-3.5"
              >
                <div
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${cfg.bg} ${cfg.color}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {activity.title}
                  </p>
                  {activity.description && (
                    <p className="mt-0.5 text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                      {activity.description}
                    </p>
                  )}
                </div>
                <span className="shrink-0 text-xs tabular-nums text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                  <RelativeTime value={activity.time} />
                </span>
              </motion.li>
            );
          })}
        </ul>
      </CardBody>
    </Card>
  );
};
