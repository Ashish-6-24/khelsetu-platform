import { Badge } from '@components/ui/Badge';
import { Card, CardBody } from '@components/ui/Card';
import type { Match } from '@types-domain/tournament';
import { formatDate, formatTime } from '@utils/date';
import { motion } from 'framer-motion';

interface FixtureCardProps {
  match: Match;
  onClick?: () => void;
}

export const FixtureCard = ({ match, onClick }: FixtureCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card>
        <CardBody className="p-4">
          <div className="flex items-center justify-between mb-3">
            <Badge
              variant={match.status === 'live' ? 'live' : 'info'}
              pulse={match.status === 'live'}
            >
              {match.status}
            </Badge>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(match.scheduledAt)} • {formatTime(match.scheduledAt)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1 text-center">
              <p className="font-medium text-gray-900 dark:text-white">
                {match.teamA.name}
              </p>
            </div>
            <div className="px-4 text-sm text-gray-500 dark:text-gray-400">
              vs
            </div>
            <div className="flex-1 text-center">
              <p className="font-medium text-gray-900 dark:text-white">
                {match.teamB.name}
              </p>
            </div>
          </div>
          {match.venue && (
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
              {match.venue}
            </p>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
};
