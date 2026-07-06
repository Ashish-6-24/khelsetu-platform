import { Avatar } from '@shared/components/ui/Avatar';
import { Badge } from '@shared/components/ui/Badge';
import type { Player } from '@shared/types/tournament';
import { motion } from 'framer-motion';

interface PlayerCardProps {
  player: Player;
  onClick?: () => void;
  compact?: boolean;
}

export const PlayerCard = ({
  player,
  onClick,
  compact = false,
}: PlayerCardProps) => {
  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="cursor-pointer flex items-center gap-3 p-3 bg-[var(--bg-surface)] rounded-xl border border-[var(--border-subtle)]"
        onClick={onClick}
      >
        <Avatar name={player.name} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="font-medium text-[var(--text-primary)] truncate">
            {player.name}
          </p>
          {player.position && (
            <p className="text-xs text-[var(--text-secondary)]">
              {player.position}
            </p>
          )}
        </div>
        {player.jerseyNumber && (
          <Badge variant="default">#{player.jerseyNumber}</Badge>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4 bg-[var(--bg-surface)] rounded-2xl border border-[var(--border-subtle)] shadow-sm">
        <div className="flex items-center gap-4">
          <Avatar name={player.name} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-[var(--text-primary)]">
                {player.name}
              </h4>
              {player.jerseyNumber && (
                <Badge variant="default">#{player.jerseyNumber}</Badge>
              )}
            </div>
            {player.position && (
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                {player.position}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[var(--border-subtle)]">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-xs text-[var(--text-secondary)]">Matches</p>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                {player.stats.matches}
              </p>
            </div>
            {player.stats.runs !== undefined && (
              <div>
                <p className="text-xs text-[var(--text-secondary)]">Runs</p>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {player.stats.runs}
                </p>
              </div>
            )}
            {player.stats.wickets !== undefined && (
              <div>
                <p className="text-xs text-[var(--text-secondary)]">Wickets</p>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  {player.stats.wickets}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
