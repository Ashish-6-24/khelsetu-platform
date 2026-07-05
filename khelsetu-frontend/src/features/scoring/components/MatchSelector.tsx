import { Button } from '@shared/components/ui/Button';
import { Card, CardBody } from '@shared/components/ui/Card';
import type { Match } from '@shared/types/tournament';
import { Calendar, Clock, Play } from 'lucide-react';

interface MatchSelectorProps {
  matches: Match[];
  onSelect: (matchId: string) => void;
}

export function MatchSelector({ matches, onSelect }: MatchSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {matches.map((match) => (
        <div
          key={match.id}
          className="cursor-pointer"
          onClick={() => onSelect(match.id)}
        >
          <Card hover>
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[var(--text-primary)]">
                      {match.teamA?.name ?? 'TBD'}
                    </span>
                    <span className="text-[var(--text-tertiary)]">vs</span>
                    <span className="font-semibold text-[var(--text-primary)]">
                      {match.teamB?.name ?? 'TBD'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-sm text-[var(--text-tertiary)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(match.scheduledAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(match.scheduledAt).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
                <Button size="sm" onClick={(e) => { e.stopPropagation(); onSelect(match.id); }}>
                  <Play className="w-4 h-4 mr-1" />
                  Score
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
}
