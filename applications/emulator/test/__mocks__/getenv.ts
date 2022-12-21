import { mockGetenv } from '../fixtures/environment';

// eslint-disable-next-line import/no-default-export
export default {
  string: jest.fn(mockGetenv('string')),
  bool: jest.fn(mockGetenv('boolean')),
  int: jest.fn(mockGetenv('number')),
  array: jest.fn(mockGetenv('array')),
};
