import type { Match } from '@shared/types/tournament';
import { Badge } from '@shared/ui/Badge';
import { Card, CardBody } from '@shared/ui/Card';
import { formatDate, formatTime } from '@shared/utils/date';
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
            <span className="text-xs text-[var(--text-tertiary)]">
              {formatDate(match.scheduledAt)} • {formatTime(match.scheduledAt)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1 text-center">
              <p className="font-medium text-[var(--text-primary)]">
                {match.teamA.name}
              </p>
            </div>
            <div className="px-4 text-sm text-[var(--text-tertiary)]">vs</div>
            <div className="flex-1 text-center">
              <p className="font-medium text-[var(--text-primary)]">
                {match.teamB.name}
              </p>
            </div>
          </div>
          {match.venue && (
            <p className="mt-3 text-xs text-[var(--text-tertiary)] text-center">
              {match.venue}
            </p>
          )}
        </CardBody>
      </Card>
    </motion.div>
  );
};
