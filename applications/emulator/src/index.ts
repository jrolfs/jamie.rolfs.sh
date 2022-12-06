import { configuration } from './configuration';
import { fastify } from './server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
fastify.get('/', async (_request, _reply) => ({ hello: 'mom' }));

const start = async () => {
  try {
    await fastify.listen({ port: configuration.port, host: '0.0.0.0' });
  } catch (error) {
    fastify.log.error(error);

    process.exit(1);
  }
};

void start();
