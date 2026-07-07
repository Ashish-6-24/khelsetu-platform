import { format, formatDistanceToNow, isValid, parseISO } from 'date-fns';

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

export const formatRelativeTime = (date: string | Date): string => {
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsed)) return '';
  return formatDistanceToNow(parsed, { addSuffix: true });
};

export const isDatePassed = (date: string | Date): boolean => {
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  return isValid(parsed) && parsed < new Date();
};

export const isDateToday = (date: string | Date): boolean => {
  const parsed = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsed)) return false;
  const today = new Date();
  return (
    parsed.getDate() === today.getDate() &&
    parsed.getMonth() === today.getMonth() &&
    parsed.getFullYear() === today.getFullYear()
  );
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};
