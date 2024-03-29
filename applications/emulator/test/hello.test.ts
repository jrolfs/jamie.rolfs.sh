/* eslint-disable no-console */

import { boot } from 'src/server/fastify';

test('saying hi', async () => {
  const server = await boot();

  const response = await server.inject({
    method: 'GET',
    url: '/',
  });

  expect(response.statusCode).toBe(200);
});
