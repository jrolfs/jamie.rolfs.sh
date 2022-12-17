import { entries, fromEntries, includes } from '@jrolfs/utilities';
import { FastifyPluginAsync } from 'fastify';

import { Configuration, configuration, dotenv } from './configuration';

const scrub = ['secret'] as const satisfies readonly [keyof Configuration];

export const register: FastifyPluginAsync = async fastify => {
  const { log } = fastify;

  fastify.ready(() => {
    log.info(dotenv, 'dotenv');
    log.info(
      fromEntries(
        entries(configuration).map(([name, value]) =>
          includes(scrub, name) && configuration.environment === 'production'
            ? [name, '[redacted]']
            : [name, value],
        ),
      ),
      'configuration',
    );
  });
};
