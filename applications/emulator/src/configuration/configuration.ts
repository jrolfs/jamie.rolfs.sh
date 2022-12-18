import { includes } from '@jrolfs/utilities';
import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
import getenv from 'getenv';
import invariant from 'tiny-invariant';

import { environments } from '../environment';

const { parsed } = expand(dotenv.config());

const environment = getenv.string('NODE_ENV', 'development');
const secret = getenv.string('SECRET', 'secret') as 'secret' | (string & {});

invariant(
  includes(environments, environment),
  `configuration: invalid environment specified (${environment})`,
);

invariant(
  environment !== 'production' || secret !== 'secret',
  'configuration: secret is required in production',
);

/**
 * Parsed env file
 */
export { parsed as dotenv };

/**
 * Application configuration
 */
export const configuration = {
  clientOrigin: getenv.string('CLIENT_ORIGIN'),
  environment,
  ipv6: getenv.bool('IPV6', false),
  logLevel: getenv.string('LOG_LEVEL', 'info'),
  port: getenv.int('PORT', 3000),
  secret,
  socketPath: getenv.string('SOCKET_PATH', '/socket'),
} as const;

export type Configuration = typeof configuration;
