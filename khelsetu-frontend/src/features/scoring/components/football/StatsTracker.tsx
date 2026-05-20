import type { FootballTeamStats } from '@types-domain/scoring';

interface StatsTrackerProps {
  teamA: FootballTeamStats;
  teamB: FootballTeamStats;
}

export const StatsTracker = ({ teamA, teamB }: StatsTrackerProps) => {
  const stats: { label: string; key: keyof FootballTeamStats }[] = [
    { label: 'Goals', key: 'goals' },
    { label: 'Shots', key: 'shots' },
    { label: 'Shots on Target', key: 'shotsOnTarget' },
    { label: 'Corners', key: 'corners' },
    { label: 'Fouls', key: 'fouls' },
    { label: 'Yellow Cards', key: 'yellowCards' },
    { label: 'Red Cards', key: 'redCards' },
    { label: 'Offsides', key: 'offsides' },
    { label: 'Saves', key: 'saves' },
  ];

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
        Match Stats
      </h4>
      <div className="space-y-1">
        {stats.map(({ label, key }) => (
          <div key={key} className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-900 dark:text-white w-8 text-right">
              {teamA[key]}
            </span>
            <span className="flex-1 text-center text-gray-500 dark:text-gray-400">
              {label}
            </span>
            <span className="font-medium text-gray-900 dark:text-white w-8">
              {teamB[key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
