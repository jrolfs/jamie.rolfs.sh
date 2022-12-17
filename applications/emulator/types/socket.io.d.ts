import { Server } from '../src/socket';

declare module 'fastify' {
  interface FastifyInstance {
    io: Server;
  }
}
