const isProd = import.meta.env.PROD;
const pfx = (lvl: string) =>
  `[${new Date().toISOString()}] [KhelSetu] [${lvl}]`;

export const logger = {
  debug: (msg: string, ...a: unknown[]) => {
    if (!isProd)
      // eslint-disable-next-line no-console
      console.debug(`${pfx('DEBUG')} ${msg}`, ...a);
  },
  info: (msg: string, ...a: unknown[]) => {
    if (!isProd)
      // eslint-disable-next-line no-console
      console.info(`${pfx('INFO')} ${msg}`, ...a);
  },
  warn: (msg: string, ...a: unknown[]) =>
    console.warn(`${pfx('WARN')} ${msg}`, ...a),
  error: (msg: string, err?: unknown, ...a: unknown[]) =>
    console.error(`${pfx('ERROR')} ${msg}`, err, ...a),
};
