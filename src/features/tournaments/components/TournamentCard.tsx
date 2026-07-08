import type { Tournament } from '@shared/types/tournament';
import { Badge, type BadgeVariant } from '@shared/ui/Badge';
import { Card, CardBody } from '@shared/ui/Card';
import { formatDate } from '@shared/utils/date';
import { motion } from 'framer-motion';

import { memo } from 'react';

const statusVariantMap: Record<Tournament['status'], BadgeVariant> = {
  draft: 'default',
  upcoming: 'info',
  live: 'live',
  completed: 'success',
  cancelled: 'error',
};

interface TournamentCardProps {
  tournament: Tournament;
  onClick?: () => void;
}

export const TournamentCard = memo(
  ({ tournament, onClick }: TournamentCardProps) => {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        aria-label={`Open ${tournament.name}`}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
      >
        <Card hover className="overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)]" />
          <CardBody>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white">
                  {tournament.name}
                </h3>
                <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] mt-1">
                  {tournament.sport} • {tournament.format}
                </p>
              </div>
              <Badge
                variant={statusVariantMap[tournament.status]}
                pulse={tournament.status === 'live'}
              >
                {tournament.status}
              </Badge>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                {formatDate(tournament.startDate)}
              </span>
              <span className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                {tournament.currentTeams}/{tournament.maxTeams} teams
              </span>
            </div>
            <div className="mt-3">
              <progress
                className="w-full h-2 rounded-full [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-[var(--bg-surface-sunken)] dark:[&::-webkit-progress-bar]:bg-[var(--bg-surface-raised)] [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-blue-600 [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-blue-600"
                value={tournament.currentTeams}
                max={tournament.maxTeams}
                aria-label={`${tournament.currentTeams} of ${tournament.maxTeams} teams registered`}
              />
            </div>
          </CardBody>
        </Card>
      </motion.div>
    );
  },
);
