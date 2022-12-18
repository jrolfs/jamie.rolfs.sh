import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
} from '@jrolfs/core';
import { FastifyPluginAsync } from 'fastify';
import { Server } from 'socket.io';

import { configuration } from '../configuration';

import { boot } from './socket';

export const register: FastifyPluginAsync = async fastify => {
  const { socketPath: path, clientOrigin: origin } = configuration;

  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents
  >(fastify.server, { cors: { origin }, path, transports: ['websocket'] });

  fastify.log.debug({ path, origin }, 'register: socket.io');

  boot(io, fastify);

  fastify.decorate('io', io);
  fastify.addHook('onClose', (_, done) => {
    io.close();
    done();
  });
};
