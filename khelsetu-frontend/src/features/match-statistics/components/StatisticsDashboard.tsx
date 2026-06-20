import { Card, CardBody } from '@components/ui/Card';
import { Skeleton } from '@components/ui/Skeleton';
import { StatComparisonBar } from './StatComparisonBar';
import { StatChart } from './StatChart';
import { PlayerStatsTable } from './PlayerStatsTable';
import type { MatchStatistics } from '../types';

interface StatisticsDashboardProps {
  data: MatchStatistics;
}

export const StatisticsDashboard = ({ data }: StatisticsDashboardProps) => {
  const { teamA, teamB, playerStats } = data;

  return (
    <div className="space-y-6">
      {/* Score Header */}
      <Card glass elevated>
        <CardBody padding="lg">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-center sm:gap-8">
            <div className="text-center sm:text-right">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-2xl">
                {teamA.teamName}
              </h2>
              <div className="mt-1 h-0.5 w-full bg-gradient-to-r from-transparent to-blue-500" />
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black tabular-nums text-blue-600 dark:text-blue-400 sm:text-5xl">
                {teamA.goals}
              </span>
              <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">
                –
              </span>
              <span className="text-4xl font-black tabular-nums text-red-600 dark:text-red-400 sm:text-5xl">
                {teamB.goals}
              </span>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-2xl">
                {teamB.teamName}
              </h2>
              <div className="mt-1 h-0.5 w-full bg-gradient-to-l from-transparent to-red-500" />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Stat Comparison Bars */}
      <Card glass>
        <CardBody>
          <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Match Statistics
          </h3>
          <div className="space-y-4">
            <StatComparisonBar
              label="Possession"
              teamAValue={teamA.possession}
              teamBValue={teamB.possession}
              unit="%"
            />
            <StatComparisonBar
              label="Shots"
              teamAValue={teamA.totalShots}
              teamBValue={teamB.totalShots}
            />
            <StatComparisonBar
              label="Shots on Target"
              teamAValue={teamA.shotsOnTarget}
              teamBValue={teamB.shotsOnTarget}
            />
            <StatComparisonBar
              label="Pass Accuracy"
              teamAValue={teamA.passAccuracy}
              teamBValue={teamB.passAccuracy}
              unit="%"
            />
            <StatComparisonBar
              label="Fouls"
              teamAValue={teamA.fouls}
              teamBValue={teamB.fouls}
              higherIsBetter={false}
            />
            <StatComparisonBar
              label="Corners"
              teamAValue={teamA.corners}
              teamBValue={teamB.corners}
            />
            <StatComparisonBar
              label="Yellow Cards"
              teamAValue={teamA.yellowCards}
              teamBValue={teamB.yellowCards}
              higherIsBetter={false}
            />
            <StatComparisonBar
              label="Red Cards"
              teamAValue={teamA.redCards}
              teamBValue={teamB.redCards}
              higherIsBetter={false}
            />
            <StatComparisonBar
              label="Saves"
              teamAValue={teamA.saves}
              teamBValue={teamB.saves}
            />
            <StatComparisonBar
              label="Offsides"
              teamAValue={teamA.offsides}
              teamBValue={teamB.offsides}
              higherIsBetter={false}
            />
          </div>
        </CardBody>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StatChart
          type="bar"
          teamA={teamA}
          teamB={teamB}
          teamAName={teamA.teamName}
          teamBName={teamB.teamName}
          title="Stat Comparison"
        />
        <StatChart
          type="radar"
          teamA={teamA}
          teamB={teamB}
          teamAName={teamA.teamName}
          teamBName={teamB.teamName}
          title="Performance Profile"
        />
      </div>

      {/* Player Ratings Table */}
      <div>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Player Ratings
        </h3>
        <PlayerStatsTable players={playerStats} />
      </div>
    </div>
  );
};

export const StatisticsDashboardSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-32 w-full rounded-2xl" />
    <Skeleton className="h-96 w-full rounded-2xl" />
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <Skeleton className="h-[350px] w-full rounded-2xl" />
      <Skeleton className="h-[350px] w-full rounded-2xl" />
    </div>
    <Skeleton className="h-64 w-full rounded-2xl" />
  </div>
);

export const StatisticsDashboardEmpty = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="rounded-2xl border border-gray-200 bg-white/80 px-8 py-12 text-center backdrop-blur-xl dark:border-gray-700 dark:bg-gray-800/80">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        <svg
          className="h-8 w-8 text-gray-400 dark:text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        No Statistics Available
      </h3>
      <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
        Match statistics will appear here once the match has started and data
        is being recorded.
      </p>
    </div>
  </div>
);
