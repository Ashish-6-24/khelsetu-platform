import type { FootballEvent } from '@types-domain/scoring';
import { getEventIcon, formatMinute } from '@features/scoring/utils/football';
import { motion } from 'framer-motion';

interface EventTimelineProps {
  events: FootballEvent[];
}

export const EventTimeline = ({ events }: EventTimelineProps) => {
  const sortedEvents = [...events].sort((a, b) => {
    if (a.minute !== b.minute) return a.minute - b.minute;
    return (a.extraMinute ?? 0) - (b.extraMinute ?? 0);
  });

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Match Events
      </h4>
      {sortedEvents.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
          No events yet
        </p>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {sortedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800 rounded"
            >
              <span className="text-lg">{getEventIcon(event.type)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {event.playerName}
                  {event.assistPlayerName && ` (Assist: ${event.assistPlayerName})`}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {event.teamName}
                </p>
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {formatMinute(event.minute, event.extraMinute)}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
