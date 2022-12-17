import { FastifyServerOptions } from 'fastify';

import { Environment } from '../environment';

type Logger = FastifyServerOptions['logger'];

export const loggers: Record<Environment, Logger> = {
  development: {
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
