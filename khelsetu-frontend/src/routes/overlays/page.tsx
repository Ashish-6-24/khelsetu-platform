import { BroadcastScoreOverlay } from '@features/overlays/components';
import { LowerThirdOverlay } from '@features/overlays/components/LowerThirdOverlay';
import { MatchStatsOverlay } from '@features/overlays/components/MatchStatsOverlay';
import type { Match } from '@shared/types/tournament';
import { Button } from '@shared/ui/Button';
import { Card, CardBody } from '@shared/ui/Card';
import { ArrowLeft, Check, Copy } from 'lucide-react';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const DEMO_TEAM_A = {
  id: 'ta',
  name: 'Tigers',
  shortName: 'TIG',
  tournamentId: 't-1',
  players: [],
  stats: { played: 5, won: 3, lost: 1, drawn: 1, points: 7 },
  createdAt: new Date().toISOString(),
};
const DEMO_TEAM_B = {
  id: 'tb',
  name: 'Lions',
  shortName: 'LIO',
  tournamentId: 't-1',
  players: [],
  stats: { played: 5, won: 2, lost: 2, drawn: 1, points: 5 },
  createdAt: new Date().toISOString(),
};
const DEMO_MATCH: Match = {
  id: 'demo-1',
  tournamentId: 't-1',
  teamA: DEMO_TEAM_A,
  teamB: DEMO_TEAM_B,
  score: {
    teamAScore: 187,
    teamAInnings: [
      { teamId: 'ta', runs: 187, wickets: 4, overs: 18.4, extras: 12 },
    ],
    teamBScore: 165,
    teamBInnings: [
      { teamId: 'tb', runs: 165, wickets: 6, overs: 20, extras: 8 },
    ],
  },
  status: 'live',
  scheduledAt: new Date().toISOString(),
  venue: 'Dasharath Stadium',
  sport: 'cricket',
};

export const OverlaysPage = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/overlays/scoreboard`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="h-4 w-4" />}
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              Broadcast Overlays
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              OBS-ready overlays for live streaming
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          leftIcon={
            copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )
          }
          onClick={handleCopyUrl}
          className="self-start sm:self-auto"
        >
          {copied ? 'Copied!' : 'Copy OBS URL'}
        </Button>
      </div>

      <Card>
        <CardBody className="p-4">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
            Score Overlay
          </h2>
          <div className="rounded-xl bg-gradient-to-r from-gray-900 via-gray-800 to-indigo-900 p-4">
            <BroadcastScoreOverlay
              teamA={{ name: 'Team A', score: 150, wickets: 3, overs: '18.4' }}
              teamB={{ name: 'Team B', score: 145, wickets: 5, overs: '20' }}
              status="live"
              runRate={8.03}
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="p-4">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
            Lower Third
          </h2>
          <div className="rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 p-4">
            <LowerThirdOverlay
              title="Player of the Match"
              subtitle="Virat Kohli - 87 (52)"
              accent="from-red-600 to-red-800"
            />
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="p-4">
          <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
            Match Stats
          </h2>
          <div className="rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
            <MatchStatsOverlay match={DEMO_MATCH} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
