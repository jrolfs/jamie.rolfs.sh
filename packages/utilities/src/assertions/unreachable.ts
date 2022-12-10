/**
 * Assertion for ensuring exhaustive handling (i.e: `switch` statements that handle every possible type)
 *
 * @example
 * ```ts
 * export const handleType = (type: 'foo' | 'bar' | 'baz') => {
 *   switch (type) {
 *     case 'foo':
 *       // ...
 *       return  //...
 *     case 'bar':
 *       // ...
 *       return  //...
 *     case 'baz':
 *       // ...
 *       return  //...
 *     default:
 *       return assertUnreachable(type);
 *   }
 * };
 * ```
 *
 * @param _
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function assertUnreachable(_: never): never {
  throw new Error("Didn't expect to get here");
}
