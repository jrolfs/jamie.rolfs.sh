import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
} from '@jrolfs/core';
import { FastifyPluginAsync } from 'fastify';
import { Server } from 'socket.io';

export const register: FastifyPluginAsync = async fastify => {
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents
  >(fastify.server);

  fastify.decorate('io', io);
  fastify.addHook('onClose', (_, done) => {
    io.close();
    done();
  });
};
