import { FastifyServerOptions } from 'fastify';

import { configuration } from '../configuration';
import { Environment } from '../environment';

type Logger = FastifyServerOptions['logger'];

// TODO: apply `logLevel` to production logger
export const loggers: Record<Environment, Logger> = {
  development: {
    level: configuration.logLevel,
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
};
