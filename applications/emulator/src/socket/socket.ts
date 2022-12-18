import { FastifyInstance } from 'fastify';

import { Server } from './types';

export const boot = (io: Server, { log }: FastifyInstance) => {
  io.on('connection', socket => log.debug(socket.id, 'io: connection'));
};
