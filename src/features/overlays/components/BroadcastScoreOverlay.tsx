import { Badge } from '@shared/ui/Badge';
import { LivePulse } from '@shared/ui/animations';
import { motion } from 'framer-motion';

interface BroadcastScoreOverlayProps {
  teamA: { name: string; score: number; wickets: number; overs: string };
  teamB: { name: string; score: number; wickets: number; overs: string };
  status: 'live' | 'completed';
  runRate?: number;
}

export const BroadcastScoreOverlay = ({
  teamA,
  teamB,
  status,
  runRate,
}: BroadcastScoreOverlayProps) => {
  return (
    <motion.div className="bg-gradient-to-r from-[var(--bg-inverse)] via-[var(--bg-surface-raised)] to-indigo-900 text-white p-6 rounded-2xl shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {status === 'live' && <LivePulse color="red" size="lg" />}
          <Badge
            variant={status === 'live' ? 'live' : 'success'}
            pulse={status === 'live'}
          >
            {status === 'live' ? 'LIVE' : 'FINAL'}
          </Badge>
        </div>
        {runRate && (
          <span className="text-sm font-medium text-[var(--text-muted)]">
            RR: {runRate.toFixed(2)}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-left">
          <p className="text-2xl font-bold">{teamA.name}</p>
          <p className="text-5xl font-bold mt-2">
            {teamA.score}/{teamA.wickets}
          </p>
          <p className="text-lg font-medium text-[var(--text-muted)] mt-1">
            ({teamA.overs} overs)
          </p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">vs</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{teamB.name}</p>
          <p className="text-5xl font-bold mt-2">
            {teamB.score}/{teamB.wickets}
          </p>
          <p className="text-lg font-medium text-[var(--text-muted)] mt-1">
            ({teamB.overs} overs)
          </p>
        </div>
      </div>
    </motion.div>
  );
};
