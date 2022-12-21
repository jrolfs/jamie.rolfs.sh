import { expect, jest, test } from '@jest/globals';
import getenv from 'getenv';

import { configure } from 'src/configuration/configuration';

import { environment, mockGetenv } from './fixtures/environment';

// jest.mock('getenv');

afterEach(() => {
  const m = jest.mocked(getenv);

  m.string.mockReset();
  m.int.mockReset();
  m.bool.mockReset();
  m.array.mockReset();
});

test('configuration', () => {
  const defaults = configure({});

  expect(defaults).toEqual(
    expect.objectContaining({
      clientOrigin: environment.CLIENT_ORIGIN,
      environment: environment.NODE_ENV,
      ipv6: environment.IPV6,
      logLevel: environment.LOG_LEVEL,
      port: environment.PORT,
      secret: environment.SECRET,
    }),
  );
});

test('throws with invalid environment', () => {
  jest
    .mocked(getenv)
    .string.mockImplementation(name =>
      name === 'NODE_ENV' ? 'notproduction' : mockGetenv('string')(name),
    );

  expect(() => configure({})).toThrowError(
    /configuration: invalid environment/,
  );
});

test('throws when secret is not set in production', () => {
  jest.mocked(getenv).string.mockImplementation(name => {
    if (name === 'NODE_ENV') return 'production';

    return name === 'SECRET' ? 'secret' : mockGetenv('string')(name);
  });

  expect(() => configure({})).toThrowError(/configuration: secret is required/);
});

test('supports arrays for `clientOrigin`', () => {
  jest
    .mocked(getenv)
    .string.mockImplementation(name =>
      name === 'CLIENT_ORIGIN'
        ? 'https://foo.bar,https://bar.baz'
        : mockGetenv('string')(name),
    );

  const a = [] as string[];

  jest
    .mocked(getenv)
    // @ts-ignore
    .array.mockImplementation(name => (name === 'CLIENT_ORIGIN' ? a : []));

  expect(configure({}).clientOrigin).toBe(a);
});
