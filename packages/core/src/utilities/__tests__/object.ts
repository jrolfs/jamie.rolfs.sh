import { omit, pick, split } from '../object';

describe('pick', () => {
  test('picks keys from object', () => {
    expect(pick({ a: 1, b: 2, c: 3, d: 4 }, ['a', 'c'])).toEqual({
      a: 1,
      c: 3,
    });
  });
});

describe('omit', () => {
  test('omits keys from object', () => {
    expect(omit({ a: 1, b: 2, c: 3, d: 4 }, ['a', 'c'])).toEqual({
      b: 2,
      d: 4,
    });
  });
});

describe('split', () => {
  test('splits object into picked and omitted', () => {
    expect(split({ a: 1, b: 2, c: 3, d: 4 }, ['a', 'c'])).toEqual([
      { a: 1, c: 3 },
      { b: 2, d: 4 },
    ]);
  });
});
