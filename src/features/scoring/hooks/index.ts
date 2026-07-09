export const useScoring = () => {
  return {
    liveScore: null,
    isScoring: false,
    error: null,
  };
};

export { useScoringWebSocket } from './useScoringWebSocket';
