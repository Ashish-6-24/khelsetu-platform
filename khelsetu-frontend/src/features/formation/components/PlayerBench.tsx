import { Badge } from '@components/ui/Badge';
import { Card, CardBody } from '@components/ui/Card';
import { clsx } from 'clsx';

import type { BenchPlayer } from '../types/index';
import { POSITION_COLORS } from '../utils/formations';

interface PlayerBenchProps {
  players: BenchPlayer[];
  onSelectPlayer?: (playerId: string) => void;
}

const STATUS_CONFIG = {
  substitute: {
    label: 'Substitutes',
    icon: '⚽',
    badgeVariant: 'success' as const,
  },
  reserve: {
    label: 'Reserves',
    icon: '📋',
    badgeVariant: 'default' as const,
  },
  injured: {
    label: 'Injured',
    icon: '🏥',
    badgeVariant: 'error' as const,
  },
  suspended: {
    label: 'Suspended',
    icon: '🚫',
    badgeVariant: 'warning' as const,
  },
};

const groupByStatus = (players: BenchPlayer[]) => {
  const groups: Record<string, BenchPlayer[]> = {
    substitute: [],
    reserve: [],
    injured: [],
    suspended: [],
  };
  for (const player of players) {
    groups[player.status]?.push(player);
  }
  return groups;
};

export const PlayerBench = ({ players, onSelectPlayer }: PlayerBenchProps) => {
  const grouped = groupByStatus(players);

  return (
    <Card className="h-full">
      <CardBody padding="sm">
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
            Bench ({players.length})
          </h3>

          {Object.entries(STATUS_CONFIG).map(([status, config]) => {
            const statusPlayers = grouped[status];
            if (!statusPlayers || statusPlayers.length === 0) return null;

            return (
              <div key={status} className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm" aria-hidden="true">
                    {config.icon}
                  </span>
                  <span className="text-xs font-semibold text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
                    {config.label}
                  </span>
                  <Badge variant={config.badgeVariant} size="sm">
                    {statusPlayers.length}
                  </Badge>
                </div>

                <div className="space-y-1">
                  {statusPlayers.map((player) => (
                    <button
                      key={player.playerId}
                      onClick={() =>
                        player.status === 'substitute' &&
                        onSelectPlayer?.(player.playerId)
                      }
                      disabled={player.status !== 'substitute'}
                      aria-label={`${player.playerName}, ${player.position}, ${player.status}${player.status === 'substitute' ? ', click to substitute' : ''}`}
                      className={clsx(
                        'flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left transition-all duration-200',
                        player.status === 'substitute'
                          ? 'cursor-pointer hover:bg-[var(--bg-surface-2)] hover:shadow-[var(--shadow-sm)]'
                          : 'cursor-default opacity-50',
                      )}
                    >
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{
                          backgroundColor:
                            POSITION_COLORS[player.position] ?? '#6b7280',
                        }}
                      >
                        {player.jerseyNumber}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-[var(--text-primary)] dark:text-white">
                          {player.playerName}
                        </p>
                        <p className="text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                          {player.position}
                        </p>
                      </div>
                      {player.status !== 'substitute' && (
                        <Badge variant={config.badgeVariant} size="sm">
                          {player.status}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {players.length === 0 && (
            <div className="py-6 text-center text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
              No bench players
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
