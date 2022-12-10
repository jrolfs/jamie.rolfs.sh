import { includes } from './guards';

/**
 * Contruct a type by picking the set of
 * properties with values matching `Value`
 */
export type PickByValue<Type, Value> = Pick<
  Type,
  { [Key in keyof Type]: Type[Key] extends Value ? Key : never }[keyof Type]
>;

/**
 * Contruct a type by converting an object's entries into tuples
 */
export type Entries<Type> = {
  [Key in keyof Type]: [keyof PickByValue<Type, Type[Key]>, Type[Key]];
}[keyof Type][];

/**
 * A version of `Object.entries` that preserves
 * narrower types in the resulting tuple entries
 *
 * @example
 * const o = { a: 1, b: 2 };
 *
 * Object.entries(o) // -> [string, number][]
 * entries(o) // -> ['a' | 'b', number][]
 *
 *
 * ⚠️ NOTE: TypeScript cannot guarantee that an object type
 * cannot have additional properties, so this should only
 * be used when you know that won't be the case
 */
export const entries = <O extends {}>(object: O) =>
  Object.entries(object) as Entries<O>;

/**
 * A version of `Object.fromEntries` for immutable sets of entries that
 * preserves a narrower type for the keys of the resulting object
 *
 * @example
 * const e = [['a', 1] as const, ['b', 2] as const];
 *
 * Object.fromEntries(e) // -> { [k: string]: number }
 * fromEntries(e) // -> { [k: 'a' | 'b']: number }
 */
export const fromEntries = <
  E extends (readonly [K, V])[],
  K extends string | number | symbol,
  V extends unknown,
>(
  e: E,
) => Object.fromEntries(e) as { [Key in E[number][0]]: E[number][1] };

/**
 * Return subset of object including specified keys
 *
 */
export const pick = <O extends {}, K extends keyof O>(object: O, keys: K[]) =>
  Object.fromEntries(
    entries(object).filter(([key]) => includes(keys, key)),
  ) as {
    [Key in K]: O[Key];
  };

/**
 * Apply function to all values of an object
 */
export const mapValues = <V, K extends string | number, R>(
  object: Record<K, V>,
  fn: (value: V) => R,
): Record<K, R> =>
  fromEntries(entries(object).map(([key, value]) => [key, fn(value)] as const));

export const keys = <Object extends {}>(object: Object) =>
  Object.keys(object) as (keyof Object)[];

/**
 * Returns a partial copy of an object omitting the keys specified
 */
export const omit = <Object extends {}, Keys extends (keyof Object)[]>(
  object: Object,
  exclude: Keys,
) =>
  Object.fromEntries(
    entries(object).filter(([key]) => !exclude.includes(key)),
  ) as Omit<Object, Keys[number]>;

/**
 * Splits an object into two with the first containing the
 * keys specified and the second containing the remaining keys
 */
export const split = <Object extends {}, Keys extends (keyof Object)[]>(
  object: Object,
  on: Keys,
) => [pick(object, on), omit(object, on)] as const;
