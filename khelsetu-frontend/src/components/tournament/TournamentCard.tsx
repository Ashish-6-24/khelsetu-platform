import { Badge, type BadgeVariant } from '@components/ui/Badge';
import { Card, CardBody } from '@components/ui/Card';
import type { Tournament } from '@types-domain/tournament';
import { formatDate } from '@utils/date';
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
        <div className="h-2 bg-gradient-to-r from-[#7F1D1D] to-[#B8860B]" />
        <CardBody>
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {tournament.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
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
            <span className="text-gray-500 dark:text-gray-400">
              {formatDate(tournament.startDate)}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              {tournament.currentTeams}/{tournament.maxTeams} teams
            </span>
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
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
