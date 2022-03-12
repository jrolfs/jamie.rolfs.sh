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
 * const o = { a: 1, b: 2 }
 *
 * Object.entries(o) // -> [string, number][]
 * entries(o) // -> ['a' | 'b', number][]
 *
 *
 * ⚠️ NOTE: TypeScript cannot guarantee that an object type
 * cannot have additional properties, so this should only
 * be used when you know that won't be the case
 */
export const entries = <Object extends {}>(object: Object) =>
  Object.entries(object) as Entries<Object>;

export const keys = <Object extends {}>(object: Object) =>
  Object.keys(object) as (keyof Object)[];

/**
 * Returns a partial copy of an object containing only the keys specified
 */
export const pick = <Object extends {}, Keys extends (keyof Object)[]>(
  object: Object,
  include: Keys,
) =>
  Object.fromEntries(
    entries(object).filter(([key]) => include.includes(key)),
  ) as Pick<Object, Keys[number]>;

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
