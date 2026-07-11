export const calculateRunRate = (runs: number, overs: number): number => {
  if (overs === 0) return 0;
  return Number.parseFloat((runs / overs).toFixed(2));
};

export const calculateStrikeRate = (runs: number, balls: number): number => {
  if (balls === 0) return 0;
  return Number.parseFloat(((runs / balls) * 100).toFixed(2));
};

export const calculateEconomy = (runs: number, overs: number): number => {
  if (overs === 0) return 0;
  return Number.parseFloat((runs / overs).toFixed(2));
};
