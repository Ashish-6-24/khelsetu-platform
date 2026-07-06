import type { Standing } from '@features/standings/types';
import {
  calculateNRR,
  getQualificationZone,
  getTeamForm,
  isQualified,
  sortStandings,
} from '@features/standings/utils';
import { describe, expect, it } from 'vitest';

const mockStandings: Standing[] = [
  {
    tournamentId: 'tour1',
    teamId: 't1',
    teamName: 'Team A',
    played: 10,
    won: 7,
    lost: 2,
    drawn: 1,
    points: 15,
    nrr: 1.25,
    position: 1,
  },
  {
    tournamentId: 'tour1',
    teamId: 't2',
    teamName: 'Team B',
    played: 10,
    won: 6,
    lost: 3,
    drawn: 1,
    points: 13,
    nrr: 0.75,
    position: 2,
  },
  {
    tournamentId: 'tour1',
    teamId: 't3',
    teamName: 'Team C',
    played: 10,
    won: 5,
    lost: 4,
    drawn: 1,
    points: 11,
    nrr: -0.5,
    position: 3,
  },
  {
    tournamentId: 'tour1',
    teamId: 't4',
    teamName: 'Team D',
    played: 10,
    won: 4,
    lost: 5,
    drawn: 1,
    points: 9,
    nrr: -1.0,
    position: 4,
  },
  {
    tournamentId: 'tour1',
    teamId: 't5',
    teamName: 'Team E',
    played: 10,
    won: 3,
    lost: 6,
    drawn: 1,
    points: 7,
    nrr: -1.5,
    position: 5,
  },
];

describe('sortStandings', () => {
  it('should sort by points descending', () => {
    const sorted = sortStandings(mockStandings);
    expect(sorted[0]!.points).toBe(15);
    expect(sorted[4]!.points).toBe(7);
  });

  it('should use NRR as tiebreaker when points are equal', () => {
    const tiedStandings: Standing[] = [
      {
        tournamentId: 'tour1',
        teamId: 't1',
        teamName: 'Team A',
        played: 10,
        won: 5,
        lost: 5,
        drawn: 0,
        points: 10,
        nrr: 0.5,
        position: 1,
      },
      {
        tournamentId: 'tour1',
        teamId: 't2',
        teamName: 'Team B',
        played: 10,
        won: 5,
        lost: 5,
        drawn: 0,
        points: 10,
        nrr: 1.0,
        position: 2,
      },
      {
        tournamentId: 'tour1',
        teamId: 't3',
        teamName: 'Team C',
        played: 10,
        won: 5,
        lost: 5,
        drawn: 0,
        points: 10,
        nrr: -0.5,
        position: 3,
      },
    ];
    const sorted = sortStandings(tiedStandings);
    expect(sorted[0]!.teamId).toBe('t2');
    expect(sorted[1]!.teamId).toBe('t1');
    expect(sorted[2]!.teamId).toBe('t3');
  });

  it('should handle missing NRR as 0', () => {
    const standingsWithoutNRR: Standing[] = [
      {
        tournamentId: 'tour1',
        teamId: 't1',
        teamName: 'Team A',
        played: 5,
        won: 3,
        lost: 2,
        drawn: 0,
        points: 6,
        position: 1,
      },
      {
        tournamentId: 'tour1',
        teamId: 't2',
        teamName: 'Team B',
        played: 5,
        won: 3,
        lost: 2,
        drawn: 0,
        points: 6,
        nrr: 0.5,
        position: 2,
      },
    ];
    const sorted = sortStandings(standingsWithoutNRR);
    expect(sorted[0]!.teamId).toBe('t2');
  });

  it('should not mutate the original array', () => {
    const original = [...mockStandings];
    sortStandings(mockStandings);
    expect(mockStandings).toEqual(original);
  });
});

describe('calculateNRR', () => {
  it('should calculate positive NRR correctly', () => {
    const nrr = calculateNRR(250, 50, 200, 50);
    expect(nrr).toBe(1.0);
  });

  it('should calculate negative NRR correctly', () => {
    const nrr = calculateNRR(200, 50, 250, 50);
    expect(nrr).toBe(-1.0);
  });

  it('should return 0 when overs are 0', () => {
    expect(calculateNRR(100, 0, 100, 50)).toBe(0);
    expect(calculateNRR(100, 50, 100, 0)).toBe(0);
  });

  it('should handle different over counts', () => {
    const nrr = calculateNRR(150, 30, 120, 25);
    expect(nrr).toBeCloseTo(0.2, 1);
  });
});

describe('getQualificationZone', () => {
  it('should return indices for default 4 playoff spots', () => {
    const zone = getQualificationZone(8);
    expect(zone).toEqual([0, 1, 2, 3]);
  });

  it('should return indices for custom playoff spots', () => {
    const zone = getQualificationZone(10, 2);
    expect(zone).toEqual([0, 1]);
  });
});

describe('isQualified', () => {
  it('should return true for ranks within playoff spots', () => {
    expect(isQualified(0)).toBe(true);
    expect(isQualified(3)).toBe(true);
  });

  it('should return false for ranks outside playoff spots', () => {
    expect(isQualified(4)).toBe(false);
    expect(isQualified(7)).toBe(false);
  });

  it('should respect custom playoff spots', () => {
    expect(isQualified(1, 2)).toBe(true);
    expect(isQualified(2, 2)).toBe(false);
  });
});

describe('getTeamForm', () => {
  it('should return empty array for team with no matches', () => {
    const standing: Standing = {
      tournamentId: 'tour1',
      teamId: 't1',
      teamName: 'Team A',
      played: 0,
      won: 0,
      lost: 0,
      drawn: 0,
      points: 0,
      position: 1,
    };
    expect(getTeamForm(standing)).toEqual([]);
  });

  it('should return form string based on wins/losses/draws', () => {
    const standing: Standing = {
      tournamentId: 'tour1',
      teamId: 't1',
      teamName: 'Team A',
      played: 5,
      won: 3,
      lost: 1,
      drawn: 1,
      points: 7,
      position: 1,
    };
    const form = getTeamForm(standing, 5);
    expect(form.length).toBeLessThanOrEqual(5);
    expect(form.filter((f) => f === 'W').length).toBe(3);
    expect(form.filter((f) => f === 'L').length).toBe(1);
    expect(form.filter((f) => f === 'D').length).toBe(1);
  });

  it('should limit form to last N matches', () => {
    const standing: Standing = {
      tournamentId: 'tour1',
      teamId: 't1',
      teamName: 'Team A',
      played: 10,
      won: 8,
      lost: 2,
      drawn: 0,
      points: 16,
      position: 1,
    };
    const form = getTeamForm(standing, 3);
    expect(form.length).toBe(3);
  });
});
