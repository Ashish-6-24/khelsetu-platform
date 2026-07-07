import { describe, expect, it } from 'vitest';

const getStreamStatusColor = (status: string): string => {
  switch (status) {
    case 'live':
      return 'error';
    case 'offline':
      return 'default';
    case 'reconnecting':
      return 'warning';
    default:
      return 'default';
  }
};

const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

describe('Live Broadcast Utilities', () => {
  it('should return correct stream status colors', () => {
    expect(getStreamStatusColor('live')).toBe('error');
    expect(getStreamStatusColor('offline')).toBe('default');
    expect(getStreamStatusColor('reconnecting')).toBe('warning');
  });

  it('should format duration correctly', () => {
    expect(formatDuration(3661)).toBe('01:01:01');
    expect(formatDuration(60)).toBe('00:01:00');
    expect(formatDuration(0)).toBe('00:00:00');
  });
});
