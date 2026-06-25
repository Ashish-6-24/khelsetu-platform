import { Avatar } from '@components/ui/Avatar';
import { Badge } from '@components/ui/Badge';
import type { Team } from '@types-domain/tournament';
import { motion } from 'framer-motion';

interface TeamCardProps {
  team: Team;
  onClick?: () => void;
}

export const TeamCard = ({ team, onClick }: TeamCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4 bg-[var(--bg-surface)] dark:bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] dark:border-[var(--border-subtle)]">
        <div className="flex items-center gap-3">
          <Avatar name={team.name} size="lg" />
          <div className="flex-1">
            <h3 className="font-semibold text-[var(--text-primary)] dark:text-white">
              {team.name}
            </h3>
            <p className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
              {team.shortName}
            </p>
          </div>
          <Badge variant="info">{team.players.length} players</Badge>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2 pt-3 border-t border-[var(--border-subtle)] dark:border-[var(--border-subtle)]">
          <div className="text-center">
            <p className="text-lg font-bold text-[var(--text-primary)] dark:text-white">
              {team.stats.played}
            </p>
            <p className="text-xs text-[var(--text-tertiary)]">Played</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-600 dark:text-green-400">{team.stats.won}</p>
            <p className="text-xs text-[var(--text-tertiary)]">Won</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-red-600 dark:text-red-400">{team.stats.lost}</p>
            <p className="text-xs text-[var(--text-tertiary)]">Lost</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {team.stats.points}
            </p>
            <p className="text-xs text-[var(--text-tertiary)]">Points</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
