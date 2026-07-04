import type {
  BasketballEvent,
  BasketballScore,
  CricketBall,
  CricketScore,
  FootballEvent,
  FootballScore,
  SportType,
  VolleyballEvent,
  VolleyballScore,
} from '@shared/types/scoring';
import { create } from 'zustand';

interface CricketScoringState {
  score: CricketScore | null;
}

interface FootballScoringState {
  score: FootballScore | null;
}

interface VolleyballScoringState {
  score: VolleyballScore | null;
}

interface BasketballScoringState {
  score: BasketballScore | null;
}

const MAX_HISTORY = 50;

interface ScoringState {
  activeMatchId: string | null;
  activeSport: SportType | null;
  isScoring: boolean;
  lastUpdate: string | null;
  history: Array<{ type: string; data?: CricketBall | FootballEvent | VolleyballEvent | BasketballEvent; snapshot: Partial<ScoringState> }>;
  cricket: CricketScoringState;
  football: FootballScoringState;
  volleyball: VolleyballScoringState;
  basketball: BasketballScoringState;
}

interface ScoringActions {
  setActiveMatch: (matchId: string, sport: SportType) => void;
  setScoring: (isScoring: boolean) => void;
  resetScoring: () => void;
  undoLastAction: () => void;
  setCricketScore: (score: CricketScore) => void;
  addCricketBall: (ball: CricketBall) => void;
  setFootballScore: (score: FootballScore) => void;
  addFootballEvent: (event: FootballEvent) => void;
  updateFootballMinute: (minute: number) => void;
  toggleFootballTimer: () => void;
  setVolleyballScore: (score: VolleyballScore) => void;
  addVolleyballPoint: (
    team: 'teamA' | 'teamB',
    event?: VolleyballEvent,
  ) => void;
  endVolleyballSet: () => void;
  switchVolleyballServe: () => void;
  setBasketballScore: (score: BasketballScore) => void;
  addBasketballEvent: (event: BasketballEvent) => void;
  nextBasketballQuarter: () => void;
  updateBasketballShotClock: (seconds: number) => void;
  toggleBasketballTimer: () => void;
}

export const useScoringStore = create<ScoringState & ScoringActions>((set) => ({
  activeMatchId: null,
  activeSport: null,
  isScoring: false,
  lastUpdate: null,
  history: [],
  cricket: { score: null },
  football: { score: null },
  volleyball: { score: null },
  basketball: { score: null },

  setActiveMatch: (matchId, sport) =>
    set({
      activeMatchId: matchId,
      activeSport: sport,
      isScoring: false,
      lastUpdate: new Date().toISOString(),
      history: [],
      cricket: { score: null },
      football: { score: null },
      volleyball: { score: null },
      basketball: { score: null },
    }),

  setScoring: (isScoring) =>
    set({ isScoring, lastUpdate: new Date().toISOString() }),

  resetScoring: () =>
    set({
      activeMatchId: null,
      activeSport: null,
      isScoring: false,
      lastUpdate: null,
      history: [],
      cricket: { score: null },
      football: { score: null },
      volleyball: { score: null },
      basketball: { score: null },
    }),

  undoLastAction: () => {
    set((state) => {
      if (state.history.length === 0) return state;
      const lastEntry = state.history[state.history.length - 1];
      if (!lastEntry) return state;
      const newHistory = state.history.slice(0, -1);
      return {
        ...lastEntry.snapshot,
        history: newHistory,
        lastUpdate: new Date().toISOString(),
      };
    });
  },

  setCricketScore: (score) =>
    set({ cricket: { score }, lastUpdate: new Date().toISOString() }),

  addCricketBall: (ball) =>
    set((state) => {
      if (!state.cricket.score) return state;
      const currentInnings =
        state.cricket.score.innings[state.cricket.score.currentInningsIndex];
      if (!currentInnings) return state;
      const updatedInnings = {
        ...currentInnings,
        runs: currentInnings.runs + ball.runs,
        wickets: currentInnings.wickets + (ball.isWicket ? 1 : 0),
        overs:
          ball.ball === 5 ? currentInnings.overs + 1 : currentInnings.overs,
        balls: [...currentInnings.balls, ball],
        lastBalls: [...state.cricket.score.lastBalls.slice(-11), ball],
      };
      const updatedInningsList = [...state.cricket.score.innings];
      updatedInningsList[state.cricket.score.currentInningsIndex] =
        updatedInnings;
      return {
        cricket: {
          score: {
            ...state.cricket.score,
            innings: updatedInningsList,
            lastBalls: updatedInnings.lastBalls,
          },
        },
        history: [
          ...state.history.slice(-(MAX_HISTORY - 1)),
          {
            type: 'cricket_ball',
            data: ball,
            snapshot: { cricket: { score: state.cricket.score } },
          },
        ],
        lastUpdate: new Date().toISOString(),
      };
    }),

  setFootballScore: (score) =>
    set({ football: { score }, lastUpdate: new Date().toISOString() }),

  addFootballEvent: (event) =>
    set((state) => {
      if (!state.football.score) return state;
      const updatedEvents = [...state.football.score.events, event];
      return {
        football: {
          score: {
            ...state.football.score,
            events: updatedEvents,
          },
        },
        history: [
          ...state.history.slice(-(MAX_HISTORY - 1)),
          {
            type: 'football_event',
            data: event,
            snapshot: { football: { score: state.football.score } },
          },
        ],
        lastUpdate: new Date().toISOString(),
      };
    }),

  updateFootballMinute: (minute) =>
    set((state) => {
      if (!state.football.score) return state;
      return {
        football: { score: { ...state.football.score, currentMinute: minute } },
        lastUpdate: new Date().toISOString(),
      };
    }),

  toggleFootballTimer: () =>
    set((state) => {
      if (!state.football.score) return state;
      return {
        football: {
          score: {
            ...state.football.score,
            isRunning: !state.football.score.isRunning,
          },
        },
        lastUpdate: new Date().toISOString(),
      };
    }),

  setVolleyballScore: (score) =>
    set({ volleyball: { score }, lastUpdate: new Date().toISOString() }),

  addVolleyballPoint: (team) =>
    set((state) => {
      if (!state.volleyball.score) return state;
      const newPoint = {
        ...state.volleyball.score.currentPoint,
        [team]: state.volleyball.score.currentPoint[team] + 1,
      };
      return {
        volleyball: {
          score: { ...state.volleyball.score, currentPoint: newPoint },
        },
        history: [
          ...state.history.slice(-(MAX_HISTORY - 1)),
          {
            type: 'volleyball_point',
            team,
            snapshot: { volleyball: { score: state.volleyball.score } },
          },
        ],
        lastUpdate: new Date().toISOString(),
      };
    }),

  endVolleyballSet: () =>
    set((state) => {
      if (!state.volleyball.score) return state;
      const currentSet =
        state.volleyball.score.sets[state.volleyball.score.currentSet - 1];
      if (!currentSet) return state;
      const winner: 'teamA' | 'teamB' | null =
        currentSet.teamAPoints > currentSet.teamBPoints ? 'teamA' : 'teamB';
      const updatedSet = { ...currentSet, winner };
      const updatedSets = [...state.volleyball.score.sets];
      updatedSets[state.volleyball.score.currentSet - 1] = updatedSet;
      const newSetsWon = {
        teamA:
          state.volleyball.score.teamASetsWon + (winner === 'teamA' ? 1 : 0),
        teamB:
          state.volleyball.score.teamBSetsWon + (winner === 'teamB' ? 1 : 0),
      };
      return {
        volleyball: {
          score: {
            ...state.volleyball.score,
            sets: updatedSets,
            teamASetsWon: newSetsWon.teamA,
            teamBSetsWon: newSetsWon.teamB,
            currentSet: state.volleyball.score.currentSet + 1,
            currentPoint: { teamA: 0, teamB: 0 },
            servingTeam: winner === 'teamA' ? 'teamB' : 'teamA',
          },
        },
        history: [
          ...state.history.slice(-(MAX_HISTORY - 1)),
          {
            type: 'volleyball_set_end',
            winner,
            snapshot: { volleyball: { score: state.volleyball.score } },
          },
        ],
        lastUpdate: new Date().toISOString(),
      };
    }),

  switchVolleyballServe: () =>
    set((state) => {
      if (!state.volleyball.score) return state;
      return {
        volleyball: {
          score: {
            ...state.volleyball.score,
            servingTeam:
              state.volleyball.score.servingTeam === 'teamA'
                ? 'teamB'
                : 'teamA',
          },
        },
        lastUpdate: new Date().toISOString(),
      };
    }),

  setBasketballScore: (score) =>
    set({ basketball: { score }, lastUpdate: new Date().toISOString() }),

  addBasketballEvent: (event) =>
    set((state) => {
      if (!state.basketball.score) return state;
      const updatedEvents = [...state.basketball.score.events, event];
      return {
        basketball: {
          score: {
            ...state.basketball.score,
            events: updatedEvents,
          },
        },
        history: [
          ...state.history.slice(-(MAX_HISTORY - 1)),
          {
            type: 'basketball_event',
            data: event,
            snapshot: { basketball: { score: state.basketball.score } },
          },
        ],
        lastUpdate: new Date().toISOString(),
      };
    }),

  nextBasketballQuarter: () =>
    set((state) => {
      if (!state.basketball.score) return state;
      const currentQ =
        state.basketball.score.quarters[
          state.basketball.score.currentQuarter - 1
        ];
      if (!currentQ) return state;
      const updatedQ = {
        ...currentQ,
        teamAPoints: state.basketball.score.teamA.points,
        teamBPoints: state.basketball.score.teamB.points,
      };
      const updatedQuarters = [...state.basketball.score.quarters];
      updatedQuarters[state.basketball.score.currentQuarter - 1] = updatedQ;
      return {
        basketball: {
          score: {
            ...state.basketball.score,
            quarters: updatedQuarters,
            currentQuarter: state.basketball.score.currentQuarter + 1,
            shotClock: 24,
          },
        },
        history: [
          ...state.history.slice(-(MAX_HISTORY - 1)),
          {
            type: 'basketball_quarter_end',
            snapshot: { basketball: { score: state.basketball.score } },
          },
        ],
        lastUpdate: new Date().toISOString(),
      };
    }),

  updateBasketballShotClock: (seconds) =>
    set((state) => {
      if (!state.basketball.score) return state;
      return {
        basketball: {
          score: { ...state.basketball.score, shotClock: seconds },
        },
        lastUpdate: new Date().toISOString(),
      };
    }),

  toggleBasketballTimer: () =>
    set((state) => {
      if (!state.basketball.score) return state;
      return {
        basketball: {
          score: {
            ...state.basketball.score,
            isRunning: !state.basketball.score.isRunning,
          },
        },
        lastUpdate: new Date().toISOString(),
      };
    }),
}));
