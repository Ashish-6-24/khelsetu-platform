import type { LiveMatchEvent } from '@features/events/types';
import { StatComparisonBar } from '@features/statistics/components/StatComparisonBar';

import type { MatchReport } from '../types';

interface MatchReportProps {
  readonly report: MatchReport;
  readonly teamAName: string;
  readonly teamBName: string;
}

function formatMinute(event: LiveMatchEvent): string {
  return event.extraMinute
    ? `${event.minute}+${event.extraMinute}'`
    : `${event.minute}'`;
}

function getRatingColor(rating: number): string {
  if (rating >= 8) return 'bg-emerald-500';
  if (rating >= 6) return 'bg-blue-500';
  if (rating >= 4) return 'bg-yellow-500';
  return 'bg-red-500';
}

export function MatchReport({
  report,
  teamAName,
  teamBName,
}: MatchReportProps) {
  return (
    <div className="space-y-4 print:space-y-4 sm:space-y-6">
      {/* Report Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--brand-primary-bg)] to-[var(--brand-primary-bg-hover)] p-4 text-white shadow-xl print:bg-gray-900 sm:p-8">
        <div className="absolute inset-0 bg-[url('/patterns/football.svg')] opacity-10" />
        <div className="relative">
          <h1 className="text-xl font-bold tracking-tight print:text-2xl sm:text-3xl">
            {report.title}
          </h1>
          <div className="mt-4 flex items-center justify-center gap-4 sm:mt-6 sm:gap-8">
            <div className="text-center">
              <p className="text-sm font-semibold sm:text-lg">{teamAName}</p>
              <p className="mt-1 text-4xl font-bold tabular-nums sm:mt-2 sm:text-6xl">
                {report.finalScore.teamA}
              </p>
            </div>
            <div className="text-xl font-light text-white/60 sm:text-2xl">
              vs
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold sm:text-lg">{teamBName}</p>
              <p className="mt-1 text-4xl font-bold tabular-nums sm:mt-2 sm:text-6xl">
                {report.finalScore.teamB}
              </p>
            </div>
          </div>
          {report.publishedAt && (
            <p className="mt-4 text-center text-sm text-white/70">
              Published{' '}
              {new Date(report.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          )}
        </div>
      </div>

      {/* Match Summary */}
      <section className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 p-4 shadow-[var(--shadow-sm)] backdrop-blur-xl dark:border-[var(--border-subtle)] dark:bg-[var(--bg-surface)]/80 print:border-[var(--border-strong)] print:bg-[var(--bg-surface)] sm:p-6">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-[var(--text-primary)] dark:text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-[var(--brand-accent)] to-[var(--brand-accent-hover)] text-xs font-bold text-white">
            1
          </span>
          Match Summary
        </h2>
        <p className="leading-relaxed text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">
          {report.summary}
        </p>
      </section>

      {/* Goals Section */}
      {report.goals.length > 0 && (
        <section className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 p-4 shadow-[var(--shadow-sm)] backdrop-blur-xl dark:border-[var(--border-subtle)] dark:bg-[var(--bg-surface)]/80 print:border-[var(--border-strong)] print:bg-[var(--bg-surface)] sm:p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[var(--text-primary)] dark:text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-[var(--brand-accent)] to-[var(--brand-accent-hover)] text-xs font-bold text-white">
              2
            </span>
            Goals
          </h2>
          <div className="relative ml-4 border-l-2 border-[var(--border-subtle)] pl-6 dark:border-[var(--border-subtle)]">
            {report.goals.map((goal) => (
              <div key={goal.id} className="relative mb-6 last:mb-0">
                <div className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gradient-to-r from-[var(--brand-primary-bg)] to-[var(--brand-primary-bg-hover)] text-xs font-bold text-white shadow-sm dark:border-[var(--border-subtle)]">
                  ⚽
                </div>
                <div className="rounded-lg bg-[var(--bg-surface-sunken)] p-3 dark:bg-[var(--bg-surface-raised)]/50">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[var(--text-primary)] dark:text-white">
                      {goal.playerName ?? 'Unknown'}
                    </span>
                    <span className="text-sm font-medium text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                      {formatMinute(goal)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-secondary)] dark:text-[var(--text-secondary)]">
                    {goal.teamName}
                    {goal.type === 'penalty_goal' && ' (Penalty)'}
                    {goal.type === 'own_goal' && ' (Own Goal)'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cards Section */}
      {report.cards.length > 0 && (
        <section className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 p-4 shadow-[var(--shadow-sm)] backdrop-blur-xl dark:border-[var(--border-subtle)] dark:bg-[var(--bg-surface)]/80 print:border-[var(--border-strong)] print:bg-[var(--bg-surface)] sm:p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[var(--text-primary)] dark:text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-[var(--brand-accent)] to-[var(--brand-accent-hover)] text-xs font-bold text-white">
              3
            </span>
            Cards
          </h2>
          <div className="space-y-3">
            {report.cards.map((card) => (
              <div
                key={card.id}
                className="flex items-center justify-between rounded-lg bg-[var(--bg-surface-sunken)] p-3 dark:bg-[var(--bg-surface-raised)]/50"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-5 w-4 rounded-sm ${
                      card.type === 'red_card' ? 'bg-red-500' : 'bg-yellow-400'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="sr-only">
                    {card.type === 'red_card' ? 'Red card' : 'Yellow card'}
                  </span>
                  <span className="font-medium text-[var(--text-primary)] dark:text-white">
                    {card.playerName ?? 'Unknown'}
                  </span>
                  <span className="text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                    {card.teamName}
                  </span>
                </div>
                <span className="text-sm font-medium text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                  {formatMinute(card)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Substitutions Section */}
      {report.substitutions.length > 0 && (
        <section className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 p-4 shadow-[var(--shadow-sm)] backdrop-blur-xl dark:border-[var(--border-subtle)] dark:bg-[var(--bg-surface)]/80 print:border-[var(--border-strong)] print:bg-[var(--bg-surface)] sm:p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[var(--text-primary)] dark:text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-[var(--brand-accent)] to-[var(--brand-accent-hover)] text-xs font-bold text-white">
              4
            </span>
            Substitutions
          </h2>
          <div className="space-y-3">
            {report.substitutions.map((sub) => (
              <div
                key={sub.id}
                className="flex items-center justify-between rounded-lg bg-[var(--bg-surface-sunken)] p-3 dark:bg-[var(--bg-surface-raised)]/50"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                    ↕
                  </span>
                  <span className="font-medium text-[var(--text-primary)] dark:text-white">
                    {sub.description ?? sub.playerName ?? 'Substitution'}
                  </span>
                </div>
                <span className="text-sm font-medium text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
                  {formatMinute(sub)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Statistics Section */}
      <section className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 p-4 shadow-[var(--shadow-sm)] backdrop-blur-xl dark:border-[var(--border-subtle)] dark:bg-[var(--bg-surface)]/80 print:border-[var(--border-strong)] print:bg-[var(--bg-surface)] sm:p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[var(--text-primary)] dark:text-white">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-[var(--brand-accent)] to-[var(--brand-accent-hover)] text-xs font-bold text-white">
            5
          </span>
          Statistics
        </h2>
        <div className="space-y-4">
          <StatComparisonBar
            label="Possession"
            teamAValue={report.statistics.possession.teamA}
            teamBValue={report.statistics.possession.teamB}
            unit="%"
          />
          <StatComparisonBar
            label="Shots"
            teamAValue={report.statistics.shots.teamA}
            teamBValue={report.statistics.shots.teamB}
          />
          <StatComparisonBar
            label="Corners"
            teamAValue={report.statistics.corners.teamA}
            teamBValue={report.statistics.corners.teamB}
          />
          <StatComparisonBar
            label="Fouls"
            teamAValue={report.statistics.fouls.teamA}
            teamBValue={report.statistics.fouls.teamB}
            higherIsBetter={false}
          />
        </div>
      </section>

      {/* Highlights Section */}
      {report.highlights.length > 0 && (
        <section className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 p-4 shadow-[var(--shadow-sm)] backdrop-blur-xl dark:border-[var(--border-subtle)] dark:bg-[var(--bg-surface)]/80 print:border-[var(--border-strong)] print:bg-[var(--bg-surface)] sm:p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[var(--text-primary)] dark:text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-[var(--brand-accent)] to-[var(--brand-accent-hover)] text-xs font-bold text-white">
              6
            </span>
            Highlights
          </h2>
          <ul className="space-y-2">
            {report.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 text-[var(--text-primary)] dark:text-[var(--text-secondary)]"
              >
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-[var(--brand-accent)] to-[var(--brand-accent-hover)]" />
                {highlight}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Player Performance Table */}
      {report.playerPerformance.length > 0 && (
        <section className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 p-4 shadow-[var(--shadow-sm)] backdrop-blur-xl dark:border-[var(--border-subtle)] dark:bg-[var(--bg-surface)]/80 print:border-[var(--border-strong)] print:bg-[var(--bg-surface)] sm:p-6">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-[var(--text-primary)] dark:text-white">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-[var(--brand-accent)] to-[var(--brand-accent-hover)] text-xs font-bold text-white">
              7
            </span>
            Player Performance
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-subtle)] dark:border-[var(--border-subtle)]">
                  <th
                    scope="col"
                    className="pb-3 font-semibold text-[var(--text-primary)] dark:text-white"
                  >
                    Player
                  </th>
                  <th
                    scope="col"
                    className="pb-3 font-semibold text-[var(--text-primary)] dark:text-white"
                  >
                    Team
                  </th>
                  <th
                    scope="col"
                    className="pb-3 text-center font-semibold text-[var(--text-primary)] dark:text-white"
                  >
                    Rating
                  </th>
                  <th
                    scope="col"
                    className="pb-3 font-semibold text-[var(--text-primary)] dark:text-white"
                  >
                    Highlights
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {report.playerPerformance.map((player) => (
                  <tr key={player.playerId}>
                    <td className="py-3 font-medium text-[var(--text-primary)] dark:text-white">
                      {player.playerName}
                    </td>
                    <td className="py-3 text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
                      {player.teamName}
                    </td>
                    <td className="py-3 text-center">
                      <span
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${getRatingColor(player.rating)}`}
                      >
                        {player.rating}
                      </span>
                    </td>
                    <td className="py-3 text-[var(--text-secondary)] dark:text-[var(--text-tertiary)]">
                      {player.highlights.join(', ') || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

export function MatchReportSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-48 rounded-2xl bg-[var(--bg-surface-sunken)]" />
      <div className="h-32 rounded-xl bg-[var(--bg-surface-sunken)]" />
      <div className="h-48 rounded-xl bg-[var(--bg-surface-sunken)]" />
      <div className="h-48 rounded-xl bg-[var(--bg-surface-sunken)]" />
    </div>
  );
}

export function MatchReportEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border-strong)] bg-[var(--bg-surface-sunken)]/50 p-12 text-center dark:border-[var(--border-strong)] dark:bg-[var(--bg-surface)]/50">
      <div className="mb-4 text-4xl">📋</div>
      <h3 className="text-lg font-semibold text-[var(--text-primary)] dark:text-white">
        No Report Available
      </h3>
      <p className="mt-1 text-sm text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
        Generate a match report to see the summary here.
      </p>
    </div>
  );
}
