import { Avatar } from '@shared/components/ui/Avatar';
import { Badge } from '@shared/components/ui/Badge';
import { Card, CardBody } from '@shared/components/ui/Card';
import type { Team } from '@shared/types/tournament';
import { motion } from 'framer-motion';

interface TeamCardProps {
  team: Team;
  onClick?: () => void;
  showStats?: boolean;
}

export const TeamCard = ({
  team,
  onClick,
  showStats = true,
}: TeamCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card hover>
        <CardBody className="p-4">
          <div className="flex items-center gap-4">
            <Avatar name={team.name} size="lg" className="flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] truncate">
                  {team.name}
                </h3>
                <Badge variant="info">{team.shortName}</Badge>
              </div>
              {team.captain && (
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  Captain: {team.captain}
                </p>
              )}
            </div>
          </div>

          {showStats && (
            <div className="mt-4 pt-4 border-t border-[var(--border-subtle)]">
              <div className="grid grid-cols-4 gap-3 text-center">
                <div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Played
                  </p>
                  <p className="text-lg font-semibold text-[var(--text-primary)]">
                    {team.stats.played}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Won
                  </p>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                    {team.stats.won}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Lost
                  </p>
                  <p className="text-lg font-semibold text-red-600 dark:text-red-400">
                    {team.stats.lost}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[var(--text-secondary)]">
                    Points
                  </p>
                  <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                    {team.stats.points}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-3 flex items-center justify-between text-sm text-[var(--text-secondary)]">
            <span>{team.players.length} players</span>
            {team.stats.nrr !== undefined && (
              <span>NRR: {team.stats.nrr.toFixed(3)}</span>
            )}
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};
