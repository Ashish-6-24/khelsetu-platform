import { LivePulse } from '@components/animations';
import { Badge } from '@components/ui/Badge';
import { Card, CardBody } from '@components/ui/Card';
import type { Match } from '@types-domain/tournament';

interface LiveMatchesPanelProps {
  matches: Match[];
  onMatchClick?: (match: Match) => void;
}

export const LiveMatchesPanel = ({
  matches,
  onMatchClick,
}: LiveMatchesPanelProps) => {
  const liveMatches = matches.filter((m) => m.status === 'live');

  if (liveMatches.length === 0) {
    return (
      <Card>
        <CardBody className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No live matches</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody>
        <div className="flex items-center gap-2 mb-4">
          <LivePulse color="red" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Live Matches
          </h3>
          <Badge variant="live" pulse>
            {liveMatches.length}
          </Badge>
        </div>
        <div className="space-y-3">
          {liveMatches.map((match) => (
            <div
              key={match.id}
              onClick={() => onMatchClick?.(match)}
              className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900 dark:text-white">
                  {match.teamA.name}
                </span>
                <span className="text-lg font-bold">
                  {match.score?.teamAScore ?? 0}/0
                </span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="font-medium text-gray-900 dark:text-white">
                  {match.teamB.name}
                </span>
                <span className="text-lg font-bold">
                  {match.score?.teamBScore ?? 0}/0
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
