import { Avatar } from '@components/ui/Avatar';
import { Badge } from '@components/ui/Badge';
import type { Player, Team } from '@types-domain/tournament';
import { motion } from 'framer-motion';

interface PlayerCardProps {
  player: Player;
  team?: Team;
  onClick?: () => void;
}

export const PlayerCard = ({ player, team, onClick }: PlayerCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Avatar name={player.name} size="lg" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {player.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              {player.jerseyNumber && (
                <Badge variant="default">#{player.jerseyNumber}</Badge>
              )}
              {player.position && (
                <Badge variant="info">{player.position}</Badge>
              )}
              {team && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {team.name}
                </span>
              )}
            </div>
          </div>
        </div>
        {player.stats && (
          <div className="mt-3 grid grid-cols-3 gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {player.stats.matches}
              </p>
              <p className="text-xs text-gray-500">Matches</p>
            </div>
            {'runs' in player.stats && (
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {player.stats.runs ?? 0}
                </p>
                <p className="text-xs text-gray-500">Runs</p>
              </div>
            )}
            {'wickets' in player.stats && (
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {player.stats.wickets ?? 0}
                </p>
                <p className="text-xs text-gray-500">Wickets</p>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
