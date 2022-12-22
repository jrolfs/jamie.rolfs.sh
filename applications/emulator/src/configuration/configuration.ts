import { includes, parseRegExp } from '@jrolfs/utilities';
import dotenv from 'dotenv';
import { DotenvExpandOutput, expand } from 'dotenv-expand';
import getenv from 'getenv';
import invariant from 'tiny-invariant';

import { environments } from '../environment';

// eslint-disable-next-line import/no-mutable-exports
let parsed: Record<string, string> | undefined;

const configure = (output: DotenvExpandOutput) => {
  parsed = output.parsed;

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

  const clientOrigin = getenv.string('CLIENT_ORIGIN');

  return {
    clientOrigin: clientOrigin.includes(',')
      ? getenv.array('CLIENT_ORIGIN', 'string', [clientOrigin]).map(parseRegExp)
      : parseRegExp(clientOrigin),
    environment,
    ipv6: getenv.bool('IPV6', false),
    logLevel: getenv.string('LOG_LEVEL', 'info'),
    port: getenv.int('PORT', 3000),
    secret,
    socketPath: getenv.string('SOCKET_PATH', '/socket'),
  } as const;
};

export type Configuration = typeof configuration;

export {
  /**
   * Parse configuration from environment. This is only
   * intended to be run once when the application boots.
   *
   * @internal
   */
  configure,
  /**
   * Parsed env file
   */
  parsed as dotenv,
};

/**
 * Application configuration
 */
export const configuration = configure(expand(dotenv.config()));
