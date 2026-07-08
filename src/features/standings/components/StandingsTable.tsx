import { type Standing } from '@features/standings/types';
import { isQualified, sortStandings } from '@features/standings/utils';
import { Badge } from '@shared/ui/Badge';
import { Card, CardBody } from '@shared/ui/Card';
import { Skeleton } from '@shared/ui/Skeleton';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowDownAZ,
  ArrowUp,
  ArrowUpDown,
  Minus,
} from 'lucide-react';

import { memo, useMemo, useState } from 'react';

type SortKey = 'points' | 'nrr' | 'played' | 'won' | 'lost' | 'drawn';
type SortDirection = 'asc' | 'desc';

interface SortableHeaderProps {
  label: string;
  title: string;
  sortKey: SortKey;
  currentSortKey: SortKey;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
}

const SortableHeader = ({
  label,
  title,
  sortKey: key,
  currentSortKey,
  sortDirection,
  onSort,
}: SortableHeaderProps) => {
  const isActive = currentSortKey === key;
  const sortIcon = !isActive ? (
    <Minus className="w-4 h-4 text-[var(--text-tertiary)]" />
  ) : sortDirection === 'asc' ? (
    <ArrowUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
  ) : (
    <ArrowDown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
  );

  return (
    <th
      className="text-center px-4 py-3 text-xs font-semibold text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] uppercase tracking-wider cursor-pointer hover:text-[var(--text-primary)] dark:hover:text-[var(--text-secondary)]"
      onClick={() => onSort(key)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSort(key);
        }
      }}
      role="columnheader"
      aria-sort={
        isActive
          ? sortDirection === 'asc'
            ? 'ascending'
            : 'descending'
          : 'none'
      }
      tabIndex={0}
    >
      <div className="flex items-center justify-center gap-1">
        <abbr title={title}>{label}</abbr> {sortIcon}
      </div>
    </th>
  );
};

interface StandingsTableProps {
  standings: Standing[];
  isLoading?: boolean;
  playoffSpots?: number;
  sport?: 'cricket' | 'football' | 'volleyball' | 'basketball';
}

export const StandingsTable = memo(
  ({
    standings,
    isLoading = false,
    playoffSpots = 4,
    sport = 'cricket',
  }: StandingsTableProps) => {
    const [sortKey, setSortKey] = useState<SortKey>('points');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [sortMode, setSortMode] = useState<'points' | 'alphabetical'>(
      'points',
    );

    const handleSort = (key: SortKey) => {
      if (sortKey === key) {
        setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortKey(key);
        setSortDirection('desc');
      }
    };

    const sortedStandings = useMemo(() => {
      if (sortMode === 'alphabetical') {
        return [...standings].sort((a, b) =>
          a.teamName.localeCompare(b.teamName),
        );
      }
      const sorted = [...standings].sort((a, b) => {
        const multiplier = sortDirection === 'asc' ? 1 : -1;
        const aVal = a[sortKey] ?? 0;
        const bVal = b[sortKey] ?? 0;
        return (aVal - bVal) * multiplier;
      });
      return sortKey === 'points' ? sortStandings(sorted) : sorted;
    }, [standings, sortKey, sortDirection, sortMode]);

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
              <p className="text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
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
          <div className="flex items-center justify-end px-4 pt-4">
            <button
              onClick={() =>
                setSortMode(sortMode === 'points' ? 'alphabetical' : 'points')
              }
              className="flex items-center gap-1 px-3 py-1 rounded-lg text-sm bg-[var(--bg-surface)] border border-[var(--border-subtle)]"
            >
              {sortMode === 'points' ? (
                <>
                  <ArrowUpDown className="w-4 h-4" />
                  By Points
                </>
              ) : (
                <>
                  <ArrowDownAZ className="w-4 h-4" />
                  A-Z
                </>
              )}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] dark:border-[var(--border-subtle)] bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface)]">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] uppercase tracking-wider">
                    #
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)] uppercase tracking-wider">
                    Team
                  </th>
                  <SortableHeader
                    label="P"
                    title="Played"
                    sortKey="played"
                    currentSortKey={sortKey}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                  <SortableHeader
                    label="W"
                    title="Won"
                    sortKey="won"
                    currentSortKey={sortKey}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                  <SortableHeader
                    label="L"
                    title="Lost"
                    sortKey="lost"
                    currentSortKey={sortKey}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                  <SortableHeader
                    label="D"
                    title="Drawn"
                    sortKey="drawn"
                    currentSortKey={sortKey}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                  {sport === 'cricket' && (
                    <SortableHeader
                      label="NRR"
                      title="Net Run Rate"
                      sortKey="nrr"
                      currentSortKey={sortKey}
                      sortDirection={sortDirection}
                      onSort={handleSort}
                    />
                  )}
                  <SortableHeader
                    label="PTS"
                    title="Points"
                    sortKey="points"
                    currentSortKey={sortKey}
                    sortDirection={sortDirection}
                    onSort={handleSort}
                  />
                </tr>
              </thead>
              <tbody>
                {sortedStandings.map((standing, index) => (
                  <motion.tr
                    key={standing.teamId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={clsx(
                      'border-b border-[var(--border-subtle)] last:border-0 hover:bg-[var(--bg-surface-sunken)] dark:hover:bg-[var(--bg-surface-raised)]/50 transition-colors',
                      isQualified(index, playoffSpots) &&
                        'bg-green-50/50 dark:bg-green-900/10',
                    )}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={clsx(
                            'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                            isQualified(index, playoffSpots)
                              ? 'bg-[var(--brand-primary)] text-white'
                              : 'bg-[var(--bg-surface-sunken)] dark:bg-[var(--bg-surface-raised)] text-[var(--text-primary)] dark:text-[var(--text-secondary)]',
                          )}
                        >
                          {index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium text-[var(--text-primary)] dark:text-white">
                        {standing.teamName}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
                      {standing.played}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-[var(--color-success,#16a34a)] dark:text-[var(--color-success,#4ade80)] font-medium">
                      {standing.won}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-[var(--color-error,#dc2626)] dark:text-[var(--color-error,#f87171)] font-medium">
                      {standing.lost}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                      {standing.drawn}
                    </td>
                    {sport === 'cricket' && (
                      <td className="px-4 py-3 text-center text-sm font-medium">
                        <span
                          className={clsx(
                            (standing.nrr ?? 0) >= 0
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400',
                          )}
                        >
                          {(standing.nrr ?? 0) > 0 ? '+' : ''}
                          {(standing.nrr ?? 0).toFixed(3)}
                        </span>
                      </td>
                    )}
                    <td className="px-4 py-3 text-center">
                      <Badge
                        variant={
                          isQualified(index, playoffSpots)
                            ? 'success'
                            : 'default'
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
  },
);
