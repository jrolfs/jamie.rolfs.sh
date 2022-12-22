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

  const CLIENT_ORIGIN_ARRAY = ['https://foo.bar', 'https://bar.baz'];

  (getenv.array as jest.Mock).mockImplementation(name =>
    name === 'CLIENT_ORIGIN' ? CLIENT_ORIGIN_ARRAY : [],
  );

  expect(configure({}).clientOrigin).toEqual(CLIENT_ORIGIN_ARRAY);
});

test.each<{
  string: string;
  array: string[];
  expected: RegExp | (string | RegExp)[];
}>`
  case        | string                            | array                                  | expected
  ${'single'} | ${'/\\.bar.baz/'}                 | ${[]}                                  | ${/\.bar.baz/}
  ${'array'}  | ${'/\\.foo.bar/,/\\.bar.baz/'}    | ${['/\\.foo.bar/', '/\\.bar.baz/']}    | ${[/\.foo.bar/, /\.bar.baz/]}
  ${'mixed'}  | ${'https://foo.bar,/\\.bar.baz/'} | ${['https://foo.bar', '/\\.bar.baz/']} | ${['https://foo.bar', /\.bar.baz/]}
`(
  'supports regular expressions for `clientOrigin` ($case)',
  ({ string, array, expected }) => {
    jest
      .mocked(getenv)
      .string.mockImplementation(name =>
        name === 'CLIENT_ORIGIN' ? string : mockGetenv('string')(name),
      );

    (getenv.array as jest.Mock).mockImplementation(name =>
      name === 'CLIENT_ORIGIN' ? array : [],
    );

    expect(configure({}).clientOrigin).toEqual(expected);
  },
);
