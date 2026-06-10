import { Badge, BadgeDot } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import { Card, CardBody, CardHeader } from '@components/ui/Card';
import { EmptyState } from '@components/ui/EmptyState';
import type { Match } from '@types-domain/tournament';
import { ROUTES } from '@utils/constants';
import { motion } from 'framer-motion';
import { ChevronRight, Radio } from 'lucide-react';

import { Link } from 'react-router-dom';

interface LiveMatchesPanelProps {
  matches: Match[];
  onMatchClick?: (match: Match) => void;
}

export const LiveMatchesPanel = ({
  matches,
  onMatchClick,
}: LiveMatchesPanelProps) => {
  const liveMatches = matches.filter((m) => m.status === 'live');

  return (
    <Card elevated>
      <CardHeader divided className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 text-red-600 dark:bg-red-500/15 dark:text-red-400">
            <Radio className="h-4 w-4" size={18} />
          </div>
          <div>
            <h3 className="text-base font-semibold tracking-tight text-slate-900 dark:text-white">
              Live Matches
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
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
            title="No live matches right now"
            description="Start a scoring session to broadcast live updates to your fans and organizers."
            action={
              <Link to={ROUTES.SCORING}>
                <Button size="sm" leftIcon={<Radio className="h-4 w-4" />}>
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
              <motion.li
                key={match.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <button
                  onClick={() => onMatchClick?.(match)}
                  className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset dark:hover:bg-slate-800/40"
                >
                  <div className="flex flex-1 items-center gap-3.5">
                    <BadgeDot variant="error" pulse />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {match.teamA.name}
                      </p>
                      <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {match.teamB.name}
                      </p>
                    </div>
                    <div className="text-right font-mono text-lg font-bold tabular-nums leading-tight text-slate-900 dark:text-white">
                      <div>{match.score?.teamAScore ?? 0}</div>
                      <div>{match.score?.teamBScore ?? 0}</div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-600 dark:group-hover:text-slate-200" />
                </button>
              </motion.li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
};
