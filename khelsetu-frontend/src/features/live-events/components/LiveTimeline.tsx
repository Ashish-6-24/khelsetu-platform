import { Card, CardBody, CardHeader } from '@components/ui/Card';
import { AnimatePresence, motion } from 'framer-motion';

import type { LiveMatchEvent, SportType } from '../types';
import { getEventConfig } from '../utils/eventCreators';

interface LiveTimelineProps {
  events: LiveMatchEvent[];
  sport: SportType;
}

export const LiveTimeline = ({ events, sport }: LiveTimelineProps) => {
  const sorted = [...events].sort((a, b) => {
    if (a.minute !== b.minute) return b.minute - a.minute;
    return (b.extraMinute ?? 0) - (a.extraMinute ?? 0);
  });

  return (
    <Card glass>
      <CardHeader>
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
            Live Timeline
          </h3>
          {events.length > 0 && (
            <span className="inline-flex items-center justify-center h-5 px-2 text-xs font-bold rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
              {events.length}
            </span>
          )}
        </div>
      </CardHeader>
      <CardBody padding="sm">
        {sorted.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No events yet
            </p>
          </div>
        ) : (
          <div
            className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1"
            aria-live="polite"
            aria-label="Live match events"
          >
            <AnimatePresence initial={false}>
              {sorted.map((event) => {
                const config = getEventConfig(sport, event.type);
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -16, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, x: 16, height: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white/60 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50"
                  >
                    <span
                      className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm ${config.color}/15`}
                    >
                      {config.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {event.playerName ?? config.label}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {event.teamName}
                        {event.description && ` · ${event.description}`}
                      </p>
                    </div>
                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 tabular-nums whitespace-nowrap">
                      {event.minute}
                      {event.extraMinute && event.extraMinute > 0
                        ? `+${event.extraMinute}`
                        : ''}
                      &apos;
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
