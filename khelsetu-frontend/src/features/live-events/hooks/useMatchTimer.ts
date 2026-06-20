import { useCallback, useEffect, useRef, useState } from 'react';

import type { MatchPhase, MatchTimerState } from '../types';

const PHASE_ORDER: MatchPhase[] = [
  'not_started',
  'first_half',
  'halftime',
  'second_half',
  'extra_time_first',
  'extra_time_second',
  'penalties',
  'completed',
];

const getNextPhase = (current: MatchPhase): MatchPhase => {
  const idx = PHASE_ORDER.indexOf(current);
  if (idx === -1 || idx >= PHASE_ORDER.length - 1) return 'completed';
  return PHASE_ORDER[idx + 1]!;
};

const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const useMatchTimer = () => {
  const [state, setState] = useState<MatchTimerState>({
    phase: 'not_started',
    currentMinute: 0,
    currentSecond: 0,
    isRunning: false,
    startedAt: null,
    pausedAt: null,
    totalElapsedSeconds: 0,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(() => {
        setState((prev) => {
          const newTotal = prev.totalElapsedSeconds + 1;
          const newMinute = Math.floor(newTotal / 60);
          const newSecond = newTotal % 60;
          return {
            ...prev,
            currentMinute: newMinute,
            currentSecond: newSecond,
            totalElapsedSeconds: newTotal,
          };
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.isRunning]);

  const startMatch = useCallback(() => {
    setState({
      phase: 'first_half',
      currentMinute: 0,
      currentSecond: 0,
      isRunning: true,
      startedAt: new Date().toISOString(),
      pausedAt: null,
      totalElapsedSeconds: 0,
    });
  }, []);

  const pauseMatch = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isRunning: false,
      pausedAt: new Date().toISOString(),
    }));
  }, []);

  const resumeMatch = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isRunning: true,
      pausedAt: null,
    }));
  }, []);

  const endMatch = useCallback(() => {
    setState((prev) => ({
      ...prev,
      phase: 'completed',
      isRunning: false,
    }));
  }, []);

  const advancePhase = useCallback(() => {
    setState((prev) => ({
      ...prev,
      phase: getNextPhase(prev.phase),
      currentMinute: 0,
      currentSecond: 0,
      totalElapsedSeconds: 0,
    }));
  }, []);

  const startSecondHalf = useCallback(() => {
    setState((prev) => ({
      ...prev,
      phase: 'second_half',
      currentMinute: 0,
      currentSecond: 0,
      totalElapsedSeconds: 0,
      isRunning: true,
    }));
  }, []);

  const startExtraTime = useCallback(() => {
    setState((prev) => ({
      ...prev,
      phase: 'extra_time_first',
      currentMinute: 0,
      currentSecond: 0,
      totalElapsedSeconds: 0,
      isRunning: true,
    }));
  }, []);

  const startPenalties = useCallback(() => {
    setState((prev) => ({
      ...prev,
      phase: 'penalties',
      currentMinute: 0,
      currentSecond: 0,
      totalElapsedSeconds: 0,
      isRunning: false,
    }));
  }, []);

  const goToHalftime = useCallback(() => {
    setState((prev) => ({
      ...prev,
      phase: 'halftime',
      isRunning: false,
      pausedAt: new Date().toISOString(),
    }));
  }, []);

  const displayTime = formatTime(state.totalElapsedSeconds);

  const canStart = state.phase === 'not_started';
  const canPause = state.isRunning && state.phase !== 'completed';
  const canResume = !state.isRunning && state.pausedAt !== null && state.phase !== 'completed';
  const canEnd = state.phase !== 'not_started' && state.phase !== 'completed';
  const canAdvance =
    !state.isRunning &&
    state.phase !== 'not_started' &&
    state.phase !== 'completed';

  return {
    ...state,
    displayTime,
    canStart,
    canPause,
    canResume,
    canEnd,
    canAdvance,
    startMatch,
    pauseMatch,
    resumeMatch,
    endMatch,
    advancePhase,
    startSecondHalf,
    startExtraTime,
    startPenalties,
    goToHalftime,
  };
};
