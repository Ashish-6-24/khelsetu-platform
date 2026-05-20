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
      <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <Avatar name={team.name} size="lg" />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {team.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {team.shortName}
            </p>
          </div>
          <Badge variant="info">{team.players.length} players</Badge>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {team.stats.played}
            </p>
            <p className="text-xs text-gray-500">Played</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-600">{team.stats.won}</p>
            <p className="text-xs text-gray-500">Won</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-red-600">{team.stats.lost}</p>
            <p className="text-xs text-gray-500">Lost</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-blue-600">
              {team.stats.points}
            </p>
            <p className="text-xs text-gray-500">Points</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
