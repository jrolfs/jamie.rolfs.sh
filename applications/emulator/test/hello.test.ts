/* eslint-disable no-console */

import { boot } from 'root:server/fastify';

beforeEach(() => jest.spyOn(console, 'info'));

afterEach(jest.restoreAllMocks);

test('saying hi', async () => {
  const server = await boot();

  const response = await server.inject({
    method: 'GET',
    url: '/',
  });

  expect(response.statusCode).toBe(200);
});
