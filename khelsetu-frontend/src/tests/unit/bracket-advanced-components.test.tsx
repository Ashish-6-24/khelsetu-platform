import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AdvancedBracketView } from '@features/bracket-advanced/components/AdvancedBracketView';

vi.mock('@features/bracket-advanced/hooks/useBracketData', () => ({
  useBracketData: () => ({
    bracket: {
      format: 'single-elimination',
      rounds: [
        {
          number: 1,
          name: 'Final',
          matches: [
            {
              id: 'match-1',
              round: 1,
              position: 0,
              teamA: { id: '1', name: 'Team A', shortName: 'TMA' },
              teamB: { id: '2', name: 'Team B', shortName: 'TMB' },
              scoreA: null,
              scoreB: null,
              winner: null,
              status: 'pending',
            },
          ],
        },
      ],
      champion: null,
      totalMatches: 1,
      completedMatches: 0,
    },
    advanceWinner: vi.fn(),
    stats: {
      totalMatches: 1,
      completedMatches: 0,
      completionPercent: 0,
      totalRounds: 1,
    },
  }),
}));

describe('AdvancedBracketView', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <AdvancedBracketView
        format="single-elimination"
        teams={[]}
        tournamentName="Test Tournament"
      />
    );
    expect(container).toBeDefined();
  });
});