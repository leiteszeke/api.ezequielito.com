import pino, { LogFn, TransportTargetOptions } from 'pino';
import Config from '../config/env';
import { Request, Response } from 'express';
import path from 'path';
import { parseQuery } from '../middlewares/graphQlParser';
import { format } from 'date-fns';
import { isEmptyOrNull } from './strings';

const rootFolder = process.cwd();

const ONLY_ERRORS = false;

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
  info: (...args: Parameters<LogFn>) => {
    if (!ONLY_ERRORS) {
      pinoLogger.info(...parseLog(...args));
    }
  },
  debug: (...args: Parameters<LogFn>) => {
    if (!ONLY_ERRORS) {
      pinoLogger.debug(...parseLog(...args));
    }
  },
  warn: (...args: Parameters<LogFn>) => {
    if (!ONLY_ERRORS) {
      pinoLogger.warn(...parseLog(...args));
    }
  },
  error: (...args: Parameters<LogFn>) => {
    pinoLogger.error(...parseLog(...args));
  },

  loki: {
    info: (...args: Parameters<LogFn>) => {
      lokiLogger.info(...parseLog(...args));
    },
    debug: (...args: Parameters<LogFn>) => {
      lokiLogger.debug(...parseLog(...args));
    },
    warn: (...args: Parameters<LogFn>) => {
      lokiLogger.warn(...parseLog(...args));
    },
    error: (...args: Parameters<LogFn>) => {
      lokiLogger.error(...parseLog(...args));
    },
  },
};

const lokiTransport: TransportTargetOptions = {
  target: 'pino-loki',
  options: {
    format: 'json',
    batching: true,
    interval: 5,
    host: Config.lokiEndpoint,
    labels: {
      app: `daruma-${Config.env}`,
      env: Config.env,
    },
    convertArrays: true,
    replaceTimestamp: true,
  },
};

const config = {
  timestamp: () => `,"time":"${format(Date.now(), 'yyyy-MM-dd HH:mm:ss')}"`,
};

const lokiTarget = !isEmptyOrNull(Config.lokiEndpoint)
  ? lokiTransport
  : ({} as TransportTargetOptions);

const pinoLogger = Config.isTest
  ? { info: () => {}, debug: () => {}, warn: () => {}, error: () => {} }
  : Config.isLocal || !Config.logtailToken || Config.isLoggingDisabled
    ? pino(
        config,
        pino.transport({
          targets: [
            lokiTarget,
            {
              level: 'trace',
              target: 'pino/file',
              options: {
                destination: path.join(rootFolder, './logs/file.log'),
              },
            },
            {
              level: 'trace',
              target: 'pino-pretty',
              options: {
                destination: 1,
              },
            },
          ],
        })
      )
    : pino(
        config,
        pino.transport({
          targets: [
            {
              target: '@logtail/pino',
              options: {
                sourceToken: Config.logtailToken,
                options: {
                  endpoint: `https://${Config.logtailHost}`,
                },
              },
            },
            lokiTarget,
          ],
        })
      );

const lokiLogger = Config.isTest
  ? { info: () => {}, debug: () => {}, warn: () => {}, error: () => {} }
  : Config.isLocal || Config.isLoggingDisabled
    ? pino(
        config,
        pino.transport({
          targets: [
            lokiTarget,
            {
              level: 'trace',
              target: 'pino/file',
              options: {
                destination: path.join(rootFolder, './logs/file.log'),
              },
            },
            {
              level: 'trace',
              target: 'pino-pretty',
              options: {
                destination: 1,
              },
            },
          ],
        })
      )
    : pino(
        config,
        pino.transport({
          targets: [lokiTarget],
        })
      );

export const logResponseTime = (req: Request, res: Response, time: number) => {
  let rest = {};

  if (req.url === '/') {
    rest = {
      query: parseQuery(req.body.query),
    };
  }

  if (!Config.isLocal) {
    logger.loki.info(`Request completed`, {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: time,
      ...rest,
    });
  }
};

export default logger;
