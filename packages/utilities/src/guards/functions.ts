/**
 * Simple `typeof` check for 'function' as a guard
 */
export const isFunction = <T extends Function>(input: unknown): input is T =>
  typeof input === 'function';
