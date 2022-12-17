import fastify, { FastifyServerOptions } from 'fastify';

import { configuration, register as logConfiguration } from '../configuration';
import { register as routes } from '../routes';
import { register as attachSocket } from '../socket';

import { loggers } from './logging';

const boot = async (options?: FastifyServerOptions) => {
  const server = fastify({
    logger: loggers[configuration.environment],
    ...options,
  });

  await server.register(logConfiguration);
  await server.register(routes);
  await server.register(attachSocket);

  return server;
};

export { boot };
