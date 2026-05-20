export const calculateRunRate = (runs: number, overs: number): number => {
  if (overs === 0) return 0;
  return parseFloat((runs / overs).toFixed(2));
};

export const calculateStrikeRate = (runs: number, balls: number): number => {
  if (balls === 0) return 0;
  return parseFloat(((runs / balls) * 100).toFixed(2));
};

export const calculateEconomy = (runs: number, overs: number): number => {
  if (overs === 0) return 0;
  return parseFloat((runs / overs).toFixed(2));
};

export const calculateNRR = (
  runsFor: number,
  oversFor: number,
  runsAgainst: number,
  oversAgainst: number,
): number => {
  if (oversFor === 0 || oversAgainst === 0) return 0;
  const rrFor = runsFor / oversFor;
  const rrAgainst = runsAgainst / oversAgainst;
  return parseFloat((rrFor - rrAgainst).toFixed(3));
};

export const calculateWinProbability = (
  currentScore: number,
  target: number,
  ballsRemaining: number,
  wicketsInHand: number,
): number => {
  if (currentScore >= target) return 100;
  if (ballsRemaining === 0 || wicketsInHand === 0) return 0;

  const requiredRunRate = (target - currentScore) / (ballsRemaining / 6);
  const baseProbability = 50;
  const runRateFactor = (6 - requiredRunRate) * 5;
  const wicketFactor = (wicketsInHand - 5) * 3;

  return Math.max(
    0,
    Math.min(100, baseProbability + runRateFactor + wicketFactor),
  );
};

export const calculatePoints = (
  won: number,
  lost: number,
  drawn: number,
  pointsConfig = { win: 2, loss: 0, draw: 1 },
): number => {
  return (
    won * pointsConfig.win +
    lost * pointsConfig.loss +
    drawn * pointsConfig.draw
  );
};
