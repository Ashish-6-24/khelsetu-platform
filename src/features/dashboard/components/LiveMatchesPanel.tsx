import type { Match } from '@shared/types/tournament';
import { Badge, BadgeDot } from '@shared/ui/Badge';
import { Button } from '@shared/ui/Button';
import { Card, CardBody, CardHeader } from '@shared/ui/Card';
import { EmptyState } from '@shared/ui/EmptyState';
import { ROUTES } from '@shared/utils/constants';
import { ChevronRight, Radio } from 'lucide-react';

import { memo } from 'react';

import { Link } from 'react-router-dom';

interface LiveMatchesPanelProps {
  matches: Match[];
  onMatchClick?: (match: Match) => void;
}

export const LiveMatchesPanel = memo(
  ({ matches, onMatchClick }: LiveMatchesPanelProps) => {
    const liveMatches = matches.filter((m) => m.status === 'live');

    return (
      <Card elevated>
        <CardHeader divided className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-danger)]/10 text-[var(--color-danger)] dark:bg-[var(--color-danger)]/15 dark:text-[var(--color-danger)]">
              <Radio className="h-4 w-4" size={18} />
            </div>
            <div>
              <h3 className="text-base font-semibold tracking-tight text-[var(--text-primary)]">
                Live Matches
              </h3>
              <p className="text-xs text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                Real-time scoring updates
              </p>
            </div>
          </div>
          {liveMatches.length > 0 && (
            <Badge variant="live" pulse>
              {liveMatches.length}{' '}
              {liveMatches.length === 1 ? 'match' : 'matches'}
            </Badge>
          )}
        </CardHeader>

        <CardBody padding="none">
          {liveMatches.length === 0 ? (
            <EmptyState
              icon={Radio}
              title="Quiet at the moment"
              description="No matches live right now. Start a scoring session to bring the game to your fans."
              action={
                <Link to={ROUTES.SCORING}>
                  <Button
                    size="sm"
                    variant="live"
                    leftIcon={<Radio className="h-4 w-4" />}
                  >
                    Start scoring
                  </Button>
                </Link>
              }
              compact
              className="py-10"
            />
          ) : (
            <ul className="divide-y divide-[var(--border-subtle)]">
              {liveMatches.map((match, idx) => (
                <li
                  key={match.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <button
                    onClick={() => onMatchClick?.(match)}
                    className="live-card group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-[var(--bg-surface-sunken)]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-inset dark:hover:bg-[var(--bg-surface)]/40"
                  >
                    <div className="flex flex-1 items-center gap-3.5">
                      <BadgeDot variant="error" pulse />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                          {match.teamA.name}
                        </p>
                        <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                          {match.teamB.name}
                        </p>
                      </div>
                      <div className="text-right font-mono text-lg font-semibold tabular-nums leading-tight text-[var(--text-primary)]">
                        <div>{match.score?.teamAScore ?? 0}</div>
                        <div>{match.score?.teamBScore ?? 0}</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-[var(--text-tertiary)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--text-secondary)] dark:group-hover:text-[var(--text-primary)]" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    );
  },
);
