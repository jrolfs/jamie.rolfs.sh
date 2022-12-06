import { includes } from '@jrolfs/utilities';
import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
import getenv from 'getenv';
import invariant from 'tiny-invariant';

import { environments } from './environment';

expand(dotenv.config());

const environment = getenv.string('NODE_ENV', 'development');

invariant(
  includes(environments, environment),
  `configuration: invalid environment specified (${environment})`,
);

/**
 * Application configuration
 */
export const configuration = {
  environment,
  port: getenv.int('PORT', 3000),
};
