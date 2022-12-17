import { FastifyPluginAsync } from 'fastify';

export const register: FastifyPluginAsync = async fastify => {
  fastify.get('/', async (_request, _reply) => ({ hello: 'mom' }));
};
