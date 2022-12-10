import { expectTypeOf } from 'expect-type';

import { entries, fromEntries, mapValues, omit, pick, split } from '../objects';

describe('entries', () => {
  const a = { a: 1, b: 1 };
  const b = { a: 'a', b: 'b' };

  const primitives = { a: 1, b: '2', c: true };
  const objects = { a, b };

  test.each([primitives, objects])('uses `Object.entries` %s', o => {
    expect(entries(o)).toEqual(Object.entries(o));
  });

  {
    const [[key, value]] = entries(primitives);

    expectTypeOf(key).toEqualTypeOf<'a' | 'b' | 'c'>();
    expectTypeOf(value).toEqualTypeOf<number | string | boolean>();
  }

  {
    const [[key, value]] = entries(objects);

    expectTypeOf(key).toEqualTypeOf<'a' | 'b'>();
    expectTypeOf(value).toEqualTypeOf<typeof a | typeof b>();
  }
});

describe('fromEntries', () => {
  const a = { a: 1, b: 1 };
  const b = { a: 'a', b: 'b' };

  const primitives = [['a', 1] as const, ['b', 1] as const];
  const mixed = [['a', 1] as const, ['b', '2'] as const, ['c', true] as const];
  const objects = [['a', a] as const, ['b', b] as const];

  // Can't use `test.each` here as it doesn't seem to be down with a 3-dimensional array 😬
  test('uses `Object.fromEntries` (primitives)', () =>
    expect(fromEntries(primitives)).toEqual(Object.fromEntries(primitives)));
  test('uses `Object.fromEntries` (mixed)', () =>
    expect(fromEntries(mixed)).toEqual(Object.fromEntries(mixed)));
  test('uses `Object.fromEntries` (objects)', () =>
    expect(fromEntries(objects)).toEqual(Object.fromEntries(objects)));

  {
    const o = fromEntries(primitives);

    expectTypeOf(o).toEqualTypeOf<{ a: 1; b: 1 }>();
  }

  {
    const o = fromEntries(mixed);
    type Value = 1 | true | '2';

    expectTypeOf(o).toEqualTypeOf<{ a: Value; b: Value; c: Value }>();
  }

  {
    const o = fromEntries(objects);
    type Value = { a: string; b: string } | { a: number; b: number };

    expectTypeOf(o).toEqualTypeOf<{ a: Value; b: Value }>();
  }
});

describe('pick', () => {
  const o = { a: 1, b: 2, c: 3 };

  test.each([
    [o, ['a', 'b'], { a: 1, b: 2 }],
    [o, [], {}],
    [o, ['a', 'b', 'c'], { a: 1, b: 2, c: 3 }],
  ])('pick(%p, %p) → %p', (object, keys, expected) => {
    const picked = pick(object, keys as unknown as (keyof typeof object)[]);

    expect(picked).toEqual(expected);
    expect(picked).not.toBe(object);
  });

  {
    const picked = pick(o, ['a', 'b']);

    expectTypeOf(picked).toEqualTypeOf<{ a: number; b: number }>();
  }
});

describe('mapValues', () => {
  const o = { a: 1, b: 2, c: 3 };

  test('applies supplied function to object values', () => {
    expect(mapValues(o, v => v + 1)).toEqual({ a: 2, b: 3, c: 4 });
  });

  {
    const mapped = mapValues(o, v => `${v}`);

    expectTypeOf(mapped).toEqualTypeOf<Record<'a' | 'b' | 'c', string>>();
  }
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
