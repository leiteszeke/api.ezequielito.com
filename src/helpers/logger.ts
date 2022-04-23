import pino, { LogFn } from 'pino';

let pinoConfig = {};

if (process.env.NODE_ENV === 'local') {
  pinoConfig = {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        levelFirst: true,
        translateTime: 'yyyy-dd-mm, h:MM:ss TT',
      },
    },
  };
}

const pinoLogger = pino(pinoConfig);

const parseLog = (...args: Parameters<LogFn>): Parameters<LogFn> => {
  if (args.length <= 1) {
    return args;
  }

  const [message, object, ...rest] = args;

  if (typeof message === 'string') {
    return [object, message, ...rest];
  }

  return [message, object, ...rest];
};

const logger = {
  info: (...args: Parameters<LogFn>) => pinoLogger.info(...parseLog(...args)),
  debug: (...args: Parameters<LogFn>) => pinoLogger.debug(...parseLog(...args)),
  warn: (...args: Parameters<LogFn>) => pinoLogger.warn(...parseLog(...args)),
  error: (...args: Parameters<LogFn>) => pinoLogger.error(...parseLog(...args)),
};

export default logger;
