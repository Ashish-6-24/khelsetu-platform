type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private level: LogLevel;
  private prefix: string;

  constructor(prefix = 'KhelSetu', level: LogLevel = 'debug') {
    this.prefix = prefix;
    this.level = level;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['debug', 'info', 'warn', 'error'];
    return levels.indexOf(level) >= levels.indexOf(this.level);
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${this.prefix}] [${level.toUpperCase()}] ${message}`;
  }

  debug(_message: string, ..._args: unknown[]): void {
    if (!this.shouldLog('debug')) return;
  }

  info(_message: string, ..._args: unknown[]): void {
    if (!this.shouldLog('info')) return;
  }

  warn(message: string, ...args: unknown[]): void {
    if (!this.shouldLog('warn')) return;
    console.warn(this.formatMessage('warn', message), ...args);
  }

  error(message: string, error?: Error | unknown, ...args: unknown[]): void {
    if (!this.shouldLog('error')) return;
    console.error(this.formatMessage('error', message), error, ...args);
  }
}

export const logger = new Logger();
export { Logger };
