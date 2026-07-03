import { Badge, type BadgeVariant } from '@shared/components/ui/Badge';
import { Card, CardBody } from '@shared/components/ui/Card';
import type { Tournament } from '@shared/types/tournament';
import { formatDate } from '@shared/utils/date';
import { motion } from 'framer-motion';

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

export const TournamentCard = ({
  tournament,
  onClick,
}: TournamentCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="cursor-pointer"
      onClick={onClick}
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
            <div className="w-full bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface-raised)] rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${(tournament.currentTeams / tournament.maxTeams) * 100}%`,
                }}
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};
