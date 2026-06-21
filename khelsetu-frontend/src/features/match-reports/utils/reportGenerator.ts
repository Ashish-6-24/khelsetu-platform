import type { LiveMatchEvent } from '@features/live-events/types';

import type { MatchReport } from '../types';

export function generateMatchReport(
  matchId: string,
  teamAName: string,
  teamBName: string,
  events: LiveMatchEvent[],
  statistics: MatchReport['statistics'],
): MatchReport {
  const goals = events.filter((e) =>
    ['goal', 'penalty_goal', 'own_goal'].includes(e.type),
  );
  const cards = events.filter((e) =>
    ['yellow_card', 'red_card'].includes(e.type),
  );
  const substitutions = events.filter((e) => e.type === 'substitution');

  const teamAGoals = goals.filter((g) => {
    if (g.type === 'own_goal') {
      return g.teamName !== teamAName;
    }
    return g.teamName === teamAName;
  }).length;

  const teamBGoals = goals.filter((g) => {
    if (g.type === 'own_goal') {
      return g.teamName !== teamBName;
    }
    return g.teamName === teamBName;
  }).length;

  const summary = generateSummary(
    teamAName,
    teamBName,
    teamAGoals,
    teamBGoals,
    goals,
    cards,
  );

  return {
    id: `report-${matchId}`,
    matchId,
    title: `${teamAName} vs ${teamBName}`,
    finalScore: { teamA: teamAGoals, teamB: teamBGoals },
    summary,
    goals,
    cards,
    substitutions,
    statistics,
    highlights: generateHighlights(goals, cards),
    playerPerformance: [],
    isPublished: false,
  };
}

function generateSummary(
  teamAName: string,
  teamBName: string,
  teamAGoals: number,
  teamBGoals: number,
  goals: LiveMatchEvent[],
  cards: LiveMatchEvent[],
): string {
  const winner =
    teamAGoals > teamBGoals
      ? teamAName
      : teamBGoals > teamAGoals
        ? teamBName
        : null;

  let summary = `In an exciting match, ${teamAName} faced off against ${teamBName}. `;

  if (winner) {
    summary += `${winner} emerged victorious with a final score of ${teamAGoals}-${teamBGoals}. `;
  } else {
    summary += `The match ended in a draw at ${teamAGoals}-${teamBGoals}. `;
  }

  if (goals.length > 0) {
    summary += `The match featured ${goals.length} goal(s). `;
  }

  if (cards.length > 0) {
    const yellows = cards.filter((c) => c.type === 'yellow_card').length;
    const reds = cards.filter((c) => c.type === 'red_card').length;
    summary += `The referee showed ${yellows} yellow card(s)`;
    if (reds > 0) {
      summary += ` and ${reds} red card(s)`;
    }
    summary += '. ';
  }

  return summary.trim();
}

function generateHighlights(
  goals: LiveMatchEvent[],
  cards: LiveMatchEvent[],
): string[] {
  const highlights: string[] = [];

  for (const goal of goals) {
    const minute = goal.extraMinute
      ? `${goal.minute}+${goal.extraMinute}`
      : `${goal.minute}`;
    if (goal.type === 'own_goal') {
      highlights.push(
        `${minute}' - Own goal by ${goal.playerName ?? 'Unknown'} (${goal.teamName})`,
      );
    } else if (goal.type === 'penalty_goal') {
      highlights.push(
        `${minute}' - Penalty scored by ${goal.playerName ?? 'Unknown'} (${goal.teamName})`,
      );
    } else {
      highlights.push(
        `${minute}' - Goal by ${goal.playerName ?? 'Unknown'} (${goal.teamName})`,
      );
    }
  }

  for (const card of cards) {
    const minute = card.extraMinute
      ? `${card.minute}+${card.extraMinute}`
      : `${card.minute}`;
    const cardType = card.type === 'red_card' ? 'Red card' : 'Yellow card';
    highlights.push(
      `${minute}' - ${cardType} shown to ${card.playerName ?? 'Unknown'} (${card.teamName})`,
    );
  }

  return highlights.sort((a, b) => {
    const minuteA = parseInt(a.split("'")[0] ?? '0');
    const minuteB = parseInt(b.split("'")[0] ?? '0');
    return minuteA - minuteB;
  });
}
