import createFastify, { FastifyServerOptions } from 'fastify';

import { configuration } from '../configuration';
import { Environment } from '../environment';

type Logger = FastifyServerOptions['logger'];

const loggers: Record<Environment, Logger> = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
};

const fastify = createFastify({ logger: loggers[configuration.environment] });

export { fastify };
