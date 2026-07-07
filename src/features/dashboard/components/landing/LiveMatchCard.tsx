import { GlowPulse } from '@shared/ui/GlowPulse';
import { incrementScore } from '@shared/utils/score-helpers';
import { clsx } from 'clsx';

import { useEffect, useRef, useState } from 'react';

interface TeamScore {
  name: string;
  score: string;
  overs: string;
  pct: number;
}

const incrementOvers = (s: string): string => {
  const match = s.match(/(\d+)\.(\d+)/);
  if (!match || !match[1] || !match[2]) return s;
  let overs = parseInt(match[1]);
  let balls = parseInt(match[2]);
  balls += 1;
  if (balls >= 6) {
    overs += 1;
    balls = 0;
  }
  return `${overs}.${balls} ov`;
};

export const LiveMatchCard = () => {
  const [teams, setTeams] = useState<TeamScore[]>([
    { name: 'Tigers', score: '142/3', overs: '15.2 ov', pct: 80 },
    { name: 'Eagles', score: '128/5', overs: '14.4 ov', pct: 65 },
  ]);
  const [flash, setFlash] = useState<number | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const tick = () => {
      const idx = Math.random() < 0.5 ? 0 : 1;
      setTeams((prev) => {
        const t = prev[idx]!;
        const newScore = incrementScore(t.score);
        if (newScore === t.score) return prev;
        setFlash(idx);
        clearTimeout(flashTimer.current);
        flashTimer.current = setTimeout(() => setFlash(null), 600);
        return prev.map((it, i) =>
          i === idx
            ? {
                ...it,
                score: newScore,
                overs: incrementOvers(it.overs),
                pct: Math.min(95, it.pct + (idx === 0 ? 0.5 : 0.3)),
              }
            : it,
        );
      });
    };

    const interval = setInterval(tick, 4000 + Math.random() * 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(flashTimer.current);
    };
  }, []);

  return (
    <div className="live-card relative rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 dark:border-[var(--border-strong)] dark:bg-[var(--bg-canvas)] overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl live-card-border" />
      <div className="mb-3 flex items-center justify-between">
        <p className="text-sm font-semibold text-[var(--text-primary)] dark:text-white">
          Live: Pokhara Tigers vs Kathmandu Eagles
        </p>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-live)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--color-live)]">
          <GlowPulse color="red" size="sm" />
          LIVE
        </span>
      </div>
      <div className="space-y-3">
        {teams.map((t, i) => (
          <div key={t.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-[var(--text-secondary)] dark:text-[var(--text-muted)]">
                {t.name}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span
                  className={clsx(
                    'font-mono text-sm font-bold tabular-nums text-[var(--text-primary)] dark:text-white transition-all duration-300',
                    flash === i &&
                      'scale-110 text-green-600 dark:text-green-400',
                  )}
                >
                  {t.score}
                </span>
                <span className="text-[10px] text-[var(--text-tertiary)] dark:text-[var(--text-secondary)] tabular-nums">
                  {t.overs}
                </span>
              </div>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[var(--border-subtle)] dark:bg-[var(--border-strong)]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--brand-primary-bg)] to-[var(--brand-accent)] transition-all duration-700 ease-out"
                style={{ width: `${t.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
