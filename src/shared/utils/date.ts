import { format, isValid, parseISO } from 'date-fns';

export const formatDate = (
  date: string | Date,
  formatStr = 'MMM dd, yyyy',
): string => {
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsed)) return 'Invalid Date';
  return format(parsed, formatStr);
};

export const formatDateTime = (date: string | Date): string => {
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsed)) return 'Invalid Date';
  return format(parsed, 'MMM dd, yyyy HH:mm');
};

export const formatTime = (date: string | Date): string => {
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsed)) return 'Invalid Time';
  return format(parsed, 'HH:mm');
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};
