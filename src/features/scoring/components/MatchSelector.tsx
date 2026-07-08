import type { Match } from '@shared/types/tournament';
import { Button } from '@shared/ui/Button';
import { Card, CardBody } from '@shared/ui/Card';
import { motion } from 'framer-motion';
import { Calendar, Clock, Play, Zap } from 'lucide-react';

interface MatchSelectorProps {
  readonly matches: Match[];
  readonly onSelect: (matchId: string) => void;
}

export function MatchSelector({ matches, onSelect }: MatchSelectorProps) {
  const isLive = (match: Match) => match.status === 'live';

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.05 } },
      }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {matches.map((match) => (
        <motion.div
          key={match.id}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <button
            type="button"
            className="w-full text-left cursor-pointer group"
            onClick={() => onSelect(match.id)}
            aria-label={`Open scoring for ${match.teamA?.name ?? 'TBD'} vs ${match.teamB?.name ?? 'TBD'}`}
          >
            <Card hover>
              <CardBody className="p-4">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[var(--text-primary)] truncate">
                        {match.teamA?.name ?? 'TBD'}
                      </span>
                      <span className="text-[var(--text-tertiary)] shrink-0">
                        vs
                      </span>
                      <span className="font-semibold text-[var(--text-primary)] truncate">
                        {match.teamB?.name ?? 'TBD'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-sm text-[var(--text-tertiary)]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" aria-hidden="true" />
                        {new Date(match.scheduledAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        {new Date(match.scheduledAt).toLocaleTimeString(
                          'en-US',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                          },
                        )}
                      </span>
                    </div>
                  </div>
                  {isLive(match) ? (
                    <Button
                      size="sm"
                      variant="live"
                      leftIcon={<Zap className="h-4 w-4" />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(match.id);
                      }}
                      className="shrink-0"
                    >
                      Live
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="primary"
                      leftIcon={<Play className="h-4 w-4" />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(match.id);
                      }}
                      className="shrink-0"
                    >
                      Score
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
}
