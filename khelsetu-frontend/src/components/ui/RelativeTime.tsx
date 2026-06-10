import { useEffect, useState } from 'react';

interface RelativeTimeProps {
  /** ISO date string or Date object. */
  value: string | Date;
  /** Update interval in ms. Default 60s. Pass 0 to disable refresh. */
  refreshMs?: number;
  className?: string;
  /** Format for older than 7 days. */
  fallbackFormat?: Intl.DateTimeFormatOptions;
}

const formatRelative = (date: Date): string => {
  const now = Date.now();
  const diffMs = date.getTime() - now; // negative for past
  const abs = Math.abs(diffMs);
  const sec = Math.round(abs / 1000);
  const min = Math.round(sec / 60);
  const hr = Math.round(min / 60);
  const day = Math.round(hr / 24);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  if (sec < 60) return rtf.format(Math.round(diffMs / 1000), 'second');
  if (min < 60) return rtf.format(Math.round(diffMs / (1000 * 60)), 'minute');
  if (hr < 24) return rtf.format(Math.round(diffMs / (1000 * 60 * 60)), 'hour');
  if (day < 7)
    return rtf.format(Math.round(diffMs / (1000 * 60 * 60 * 24)), 'day');
  if (day < 30) return rtf.format(Math.round(day / 7), 'week');
  if (day < 365) return rtf.format(Math.round(day / 30), 'month');
  return rtf.format(Math.round(day / 365), 'year');
};

/**
 * Renders a friendly relative timestamp that auto-refreshes.
 *
 * <time dateTime="..."> holds the machine-readable ISO value for
 * screen readers, parsers, and copy-paste.
 */
export const RelativeTime = ({
  value,
  refreshMs = 60_000,
  className,
  fallbackFormat = { month: 'short', day: 'numeric', year: 'numeric' },
}: RelativeTimeProps) => {
  const date = typeof value === 'string' ? new Date(value) : value;
  const iso = date.toISOString();
  const [text, setText] = useState(() => formatRelative(date));

  useEffect(() => {
    if (!refreshMs) return;
    const id = setInterval(() => setText(formatRelative(date)), refreshMs);
    return () => clearInterval(id);
    // `date` is intentionally captured in the closure; refreshMs is the
    // external trigger. Re-running on every prop change would defeat the
    // interval's purpose.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshMs]);

  const title = new Intl.DateTimeFormat('en', fallbackFormat).format(date);

  return (
    <time dateTime={iso} title={title} className={className}>
      {text}
    </time>
  );
};
