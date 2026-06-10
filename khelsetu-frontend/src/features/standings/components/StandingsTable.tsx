import { Badge } from '@components/ui/Badge';
import { Card, CardBody } from '@components/ui/Card';
import { Skeleton } from '@components/ui/Skeleton';
import type { Standing } from '@features/standings/types';
import { isQualified, sortStandings } from '@features/standings/utils';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';

import { useState } from 'react';

type SortKey = 'points' | 'nrr' | 'played' | 'won' | 'lost' | 'drawn';
type SortDirection = 'asc' | 'desc';

interface StandingsTableProps {
  standings: Standing[];
  isLoading?: boolean;
  playoffSpots?: number;
  sport?: 'cricket' | 'football' | 'volleyball' | 'basketball';
}

export const StandingsTable = ({
  standings,
  isLoading = false,
  playoffSpots = 4,
  sport = 'cricket',
}: StandingsTableProps) => {
  const [sortKey, setSortKey] = useState<SortKey>('points');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const sortedStandings = [...standings].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    const aVal = a[sortKey] ?? 0;
    const bVal = b[sortKey] ?? 0;
    return (aVal - bVal) * multiplier;
  });

  const finalStandings =
    sortKey === 'points' ? sortStandings(sortedStandings) : sortedStandings;

  const getSortIcon = (key: SortKey) => {
    if (sortKey !== key) return <Minus className="w-4 h-4 text-gray-400" />;
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-4 h-4 text-blue-600" />
    ) : (
      <ArrowDown className="w-4 h-4 text-blue-600" />
    );
  };

  if (isLoading) {
    return (
      <Card>
        <CardBody className="p-0">
          <div className="space-y-2 p-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-12" />
            ))}
          </div>
        </CardBody>
      </Card>
    );
  }

  if (standings.length === 0) {
    return (
      <Card>
        <CardBody>
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              Standings will be available once matches begin.
            </p>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  #
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Team
                </th>
                <th
                  className="text-center px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSort('played')}
                >
                  <div className="flex items-center justify-center gap-1">
                    P {getSortIcon('played')}
                  </div>
                </th>
                <th
                  className="text-center px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSort('won')}
                >
                  <div className="flex items-center justify-center gap-1">
                    W {getSortIcon('won')}
                  </div>
                </th>
                <th
                  className="text-center px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSort('lost')}
                >
                  <div className="flex items-center justify-center gap-1">
                    L {getSortIcon('lost')}
                  </div>
                </th>
                <th
                  className="text-center px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSort('drawn')}
                >
                  <div className="flex items-center justify-center gap-1">
                    D {getSortIcon('drawn')}
                  </div>
                </th>
                {sport === 'cricket' && (
                  <th
                    className="text-center px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                    onClick={() => handleSort('nrr')}
                  >
                    <div className="flex items-center justify-center gap-1">
                      NRR {getSortIcon('nrr')}
                    </div>
                  </th>
                )}
                <th
                  className="text-center px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => handleSort('points')}
                >
                  <div className="flex items-center justify-center gap-1">
                    PTS {getSortIcon('points')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {finalStandings.map((standing, index) => (
                <motion.tr
                  key={standing.teamId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                    isQualified(index, playoffSpots)
                      ? 'bg-green-50/50 dark:bg-green-900/10'
                      : ''
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isQualified(index, playoffSpots)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {standing.teamName}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-700 dark:text-gray-300">
                    {standing.played}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-green-600 dark:text-green-400 font-medium">
                    {standing.won}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-red-600 dark:text-red-400 font-medium">
                    {standing.lost}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-500 dark:text-gray-400">
                    {standing.drawn}
                  </td>
                  {sport === 'cricket' && (
                    <td className="px-4 py-3 text-center text-sm font-medium">
                      <span
                        className={`${
                          (standing.nrr ?? 0) >= 0
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {(standing.nrr ?? 0) > 0 ? '+' : ''}
                        {(standing.nrr ?? 0).toFixed(3)}
                      </span>
                    </td>
                  )}
                  <td className="px-4 py-3 text-center">
                    <Badge
                      variant={
                        isQualified(index, playoffSpots) ? 'success' : 'default'
                      }
                      className="font-bold"
                    >
                      {standing.points}
                    </Badge>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  );
};
