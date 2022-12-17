import './configuration/register';

import { configuration } from './configuration';
import { boot } from './server';

const start = async () => {
  try {
    const server = await boot();

    try {
      await server.listen({
        port: configuration.port,
        host: configuration.ipv6 ? '::' : '0.0.0.0',
      });
    } catch (error) {
      server.log.error(error);

      process.exit(1);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('server: boot error', error);
  }
};

void start();
