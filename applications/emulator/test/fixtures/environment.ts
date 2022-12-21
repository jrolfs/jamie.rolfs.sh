import { includes, keys } from '@jrolfs/utilities';
import invariant from 'tiny-invariant';

/**
 * Mock environment used in tests via `getenv` mock
 */
export const environment = {
  CLIENT_ORIGIN: 'https://jamie.lol',
  IPV6: true,
  LOG_LEVEL: 'debug',
  NODE_ENV: 'test',
  PORT: 4000,
  SECRET: 'super-secret',
  SOCKET_PATH: '/foo',
} as const;

interface Map {
  string: string;
  boolean: boolean;
  number: number;
  array: Array<string>;
}

export const mockGetenv =
  <T extends keyof Map>(type: T) =>
  (key: string) => {
    invariant(
      includes(keys(environment), key) &&
        (typeof environment[key] === type ||
          (type === 'array' && Array.isArray(environment[key]))),
      `getenv: mock failure ${JSON.stringify({ key, type })}`,
    );

    return environment[key] as Map[T];
  };
