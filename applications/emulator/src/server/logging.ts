import { FastifyServerOptions } from 'fastify';

import { configuration } from '../configuration';
import { Environment } from '../environment';

type Logger = FastifyServerOptions['logger'];

const { logLevel: level } = configuration;

export const loggers: Record<Environment, Logger> = {
  development: {
    level,
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: { level },
  test: false,
};
