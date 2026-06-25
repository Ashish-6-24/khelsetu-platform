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
    <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 px-4 py-2.5 shadow-lg backdrop-blur-xl dark:border-[var(--border-subtle)] dark:bg-[var(--bg-surface)]/90">
      <p className="mb-1 text-xs font-semibold text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
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
      <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 p-5 backdrop-blur-xl dark:border-[var(--border-subtle)] dark:bg-[var(--bg-surface)]/80">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
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
                stroke="var(--border-subtle)"
                vertical={false}
              />
              <XAxis
                dataKey="stat"
                tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: 'var(--text-tertiary)' }}
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
              <Bar dataKey="teamA" fill="var(--color-info)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="teamB" fill="var(--color-danger)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  const data = buildRadarData(teamA, teamB);
  return (
    <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/80 p-5 backdrop-blur-xl dark:border-[var(--border-subtle)] dark:bg-[var(--bg-surface)]/80">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-[var(--text-tertiary)] dark:text-[var(--text-tertiary)]">
        {title}
      </h3>
      <div
        role="img"
        aria-label={`${title} radar chart comparing ${teamAName} and ${teamBName}`}
      >
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data} outerRadius="75%">
            <PolarGrid stroke="var(--border-subtle)" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fontSize: 11, fill: 'var(--text-secondary)' }}
            />
            <PolarRadiusAxis tick={{ fontSize: 10, fill: 'var(--text-tertiary)' }} />
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
              stroke="var(--color-info)"
              fill="var(--color-info)"
              fillOpacity={0.15}
              strokeWidth={2}
            />
            <Radar
              name="teamB"
              dataKey="teamB"
              stroke="var(--color-danger)"
              fill="var(--color-danger)"
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
