import type {
  CricketBall,
  CricketBatsmanScore,
  CricketBowlerScore,
  CricketExtraType,
  CricketInnings,
  CricketPartnership,
  CricketWicketType,
} from '@types-domain/scoring';

export const createCricketBall = (
  matchId: string,
  innings: number,
  over: number,
  ball: number,
  batsmanId: string,
  bowlerId: string,
  runs: number,
  extras?: { type: CricketExtraType; extraRuns: number },
  wicket?: { type: CricketWicketType; dismissedPlayerId: string },
): CricketBall => ({
  id: `ball-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  matchId,
  innings,
  over,
  ball,
  batsmanId,
  bowlerId,
  runs: runs + (extras?.extraRuns ?? 0),
  isExtra: !!extras,
  extraType: extras?.type,
  isWicket: !!wicket,
  wicketType: wicket?.type,
  dismissedPlayerId: wicket?.dismissedPlayerId,
  timestamp: new Date().toISOString(),
});

export const shouldRotateStrike = (
  runs: number,
  extras?: CricketExtraType,
): boolean => {
  if (extras === 'wide' || extras === 'no-ball') return false;
  return runs % 2 === 1;
};

export const isOverComplete = (ballNumber: number): boolean => ballNumber === 5;

export const calculateBatsmanStats = (
  batsman: CricketBatsmanScore,
  ball: CricketBall,
): CricketBatsmanScore => {
  if (ball.batsmanId !== batsman.playerId) return batsman;

  const isWide = ball.extraType === 'wide';
  const runsOffBat = isWide ? 0 : ball.runs - (ball.extraType ? 1 : 0);

  return {
    ...batsman,
    runs: batsman.runs + runsOffBat,
    balls: batsman.balls + (isWide ? 0 : 1),
    fours: batsman.fours + (runsOffBat === 4 && !ball.isWicket ? 1 : 0),
    sixes: batsman.sixes + (runsOffBat === 6 && !ball.isWicket ? 1 : 0),
    strikeRate:
      batsman.balls + (isWide ? 0 : 1) > 0
        ? parseFloat(
            (
              ((batsman.runs + runsOffBat) /
                (batsman.balls + (isWide ? 0 : 1))) *
              100
            ).toFixed(2),
          )
        : 0,
    isOut:
      batsman.isOut ||
      (ball.isWicket && ball.dismissedPlayerId === batsman.playerId),
  };
};

export const calculateBowlerStats = (
  bowler: CricketBowlerScore,
  ball: CricketBall,
): CricketBowlerScore => {
  if (ball.bowlerId !== bowler.playerId) return bowler;

  const isWide = ball.extraType === 'wide';
  const isNoBall = ball.extraType === 'no-ball';
  const legalDelivery = !isWide && !isNoBall;

  const runsConceded = ball.runs;

  return {
    ...bowler,
    overs: parseFloat(
      (bowler.overs + (legalDelivery ? ball.ball + 1 : 0) / 6).toFixed(1),
    ),
    maidens:
      bowler.maidens +
      (runsConceded === 0 && legalDelivery && ball.ball === 5 ? 1 : 0),
    runs: bowler.runs + runsConceded,
    wickets: bowler.wickets + (ball.isWicket ? 1 : 0),
    economy:
      bowler.overs + (legalDelivery ? ball.ball + 1 : 0) / 6 > 0
        ? parseFloat(
            (
              bowler.runs /
              (bowler.overs + (legalDelivery ? ball.ball + 1 : 0) / 6)
            ).toFixed(2),
          )
        : 0,
  };
};

export const calculatePartnership = (
  innings: CricketInnings,
  strikerId: string,
  nonStrikerId: string,
): CricketPartnership => {
  const partnershipBalls = innings.balls.filter(
    (b) =>
      (b.batsmanId === strikerId || b.batsmanId === nonStrikerId) &&
      !b.isWicket,
  );

  const partnershipRuns = partnershipBalls.reduce((sum, b) => sum + b.runs, 0);

  return {
    runs: partnershipRuns,
    balls: partnershipBalls.length,
    batsmanAId: strikerId,
    batsmanAName:
      innings.batsmen.find((b) => b.playerId === strikerId)?.playerName ?? '',
    batsmanBId: nonStrikerId,
    batsmanBName:
      innings.batsmen.find((b) => b.playerId === nonStrikerId)?.playerName ??
      '',
  };
};

export const formatOvers = (overs: number, balls: number): string => {
  const completedOvers = overs;
  const remainingBalls = balls;
  return `${completedOvers}.${remainingBalls}`;
};

export const getBallDisplay = (ball: CricketBall): string => {
  if (ball.isWicket) return 'W';
  if (ball.extraType === 'wide') return 'Wd';
  if (ball.extraType === 'no-ball') return 'Nb';
  if (ball.extraType === 'bye') return 'B';
  if (ball.extraType === 'leg-bye') return 'Lb';
  return ball.runs.toString();
};

export const getBallColor = (ball: CricketBall): string => {
  if (ball.isWicket) return 'bg-red-500';
  if (ball.runs === 6) return 'bg-green-500';
  if (ball.runs === 4) return 'bg-blue-500';
  if (ball.isExtra) return 'bg-yellow-500';
  return 'bg-gray-400';
};
