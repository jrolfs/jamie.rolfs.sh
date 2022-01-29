/* eslint-disable no-console */

import { hello } from 'src/index';

beforeEach(() => jest.spyOn(console, 'info'));

afterEach(jest.restoreAllMocks);

test('saying hi', () => {
  expect(console.info).not.toHaveBeenCalled();

  hello();

  expect(console.info).toHaveBeenCalledWith('hello world');
});
