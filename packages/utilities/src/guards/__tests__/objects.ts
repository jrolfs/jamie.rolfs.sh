import { expectTypeOf } from 'expect-type';

import { hasOwnProperty } from '../objects';

describe('hasOwnProperty', () => {
  const o = { a: 1, b: 1 } as {};

  test('returns `true` when property exists', () => {
    expect(hasOwnProperty(o, 'a')).toEqual(true);
  });

  test('returns `false` when property does not exist', () => {
    expect(hasOwnProperty(o, 'c')).toEqual(false);
  });

  {
    if (hasOwnProperty(o, 'a')) {
      expectTypeOf(o.a).toEqualTypeOf<unknown>();
    }
  }
});
