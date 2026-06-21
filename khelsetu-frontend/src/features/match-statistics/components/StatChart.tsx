import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import type { TeamStatistics } from '../types';

interface StatChartProps {
  type: 'bar' | 'radar';
  teamA: TeamStatistics;
  teamB: TeamStatistics;
  teamAName: string;
  teamBName: string;
  title: string;
}

function buildBarData(teamA: TeamStatistics, teamB: TeamStatistics) {
  return [
    { stat: 'Goals', teamA: teamA.goals, teamB: teamB.goals },
    { stat: 'Shots', teamA: teamA.totalShots, teamB: teamB.totalShots },
    {
      stat: 'On Target',
      teamA: teamA.shotsOnTarget,
      teamB: teamB.shotsOnTarget,
    },
    {
      stat: 'Passes',
      teamA: teamA.successfulPasses,
      teamB: teamB.successfulPasses,
    },
    { stat: 'Corners', teamA: teamA.corners, teamB: teamB.corners },
    { stat: 'Fouls', teamA: teamA.fouls, teamB: teamB.fouls },
    { stat: 'Saves', teamA: teamA.saves, teamB: teamB.saves },
  ];
}

function buildRadarData(teamA: TeamStatistics, teamB: TeamStatistics) {
  return [
    {
      subject: 'Attacking',
      teamA: teamA.shotsOnTarget,
      teamB: teamB.shotsOnTarget,
    },
    { subject: 'Possession', teamA: teamA.possession, teamB: teamB.possession },
    {
      subject: 'Passing',
      teamA: teamA.passAccuracy,
      teamB: teamB.passAccuracy,
    },
    { subject: 'Defense', teamA: teamA.saves, teamB: teamB.saves },
    {
      subject: 'Discipline',
      teamA: 10 - teamA.yellowCards - teamA.redCards,
      teamB: 10 - teamB.yellowCards - teamB.redCards,
    },
    { subject: 'Set Pieces', teamA: teamA.corners, teamB: teamB.corners },
  ];
}

const CustomTooltip = ({
  active,
  payload,
  label,
  teamAName,
  teamBName,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string;
  teamAName: string;
  teamBName: string;
}) => {
  if (!active || !payload) return null;
  return (
    <div className="rounded-xl border border-gray-200 bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur-xl dark:border-gray-700 dark:bg-gray-800/90">
      <p className="mb-1 text-xs font-semibold text-gray-500 dark:text-gray-400">
        {label}
      </p>
      {payload.map((entry) => (
        <p
          key={entry.dataKey}
          className="text-sm font-medium"
          style={{ color: entry.color }}
        >
          {entry.dataKey === 'teamA' ? teamAName : teamBName}: {entry.value}
        </p>
      ))}
    </div>
  );
};

export const StatChart = ({
  type,
  teamA,
  teamB,
  teamAName,
  teamBName,
  title,
}: StatChartProps) => {
  if (type === 'bar') {
    const data = buildBarData(teamA, teamB);
    return (
      <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 backdrop-blur-xl dark:border-gray-700 dark:bg-gray-800/80">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {title}
        </h3>
        <div
          role="img"
          aria-label={`${title} chart comparing ${teamAName} and ${teamBName}`}
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} barGap={4}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={false}
              />
              <XAxis
                dataKey="stat"
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#9ca3af' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={
                  <CustomTooltip teamAName={teamAName} teamBName={teamBName} />
                }
              />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                formatter={(value: string) =>
                  value === 'teamA' ? teamAName : teamBName
                }
              />
              <Bar dataKey="teamA" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="teamB" fill="#ef4444" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  const data = buildRadarData(teamA, teamB);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 backdrop-blur-xl dark:border-gray-700 dark:bg-gray-800/80">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <div
        role="img"
        aria-label={`${title} radar chart comparing ${teamAName} and ${teamBName}`}
      >
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data} outerRadius="75%">
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fontSize: 11, fill: '#6b7280' }}
            />
            <PolarRadiusAxis tick={{ fontSize: 10, fill: '#9ca3af' }} />
            <Tooltip
              content={
                <CustomTooltip teamAName={teamAName} teamBName={teamBName} />
              }
            />
            <Legend
              wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
              formatter={(value: string) =>
                value === 'teamA' ? teamAName : teamBName
              }
            />
            <Radar
              name="teamA"
              dataKey="teamA"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.15}
              strokeWidth={2}
            />
            <Radar
              name="teamB"
              dataKey="teamB"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
