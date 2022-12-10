/**
 * Simple `typeof` check for 'number' as a guard
 */
export const isNumber = (value: unknown): value is number =>
  typeof value === 'number';

/**
 * Simple `typeof` check for 'string' as a guard
 */
export const isString = (value: unknown): value is number =>
  typeof value === 'string';

/**
 * Type guard helper for filtering lists that may have empty items
 *
 * @example myList.filter(isDefined)
 *
 * @param input potentially undefined value
 * @returns {boolean} whether input is neither undefined or null
 */
export const isDefined = <T>(input: T | undefined | null): input is T =>
  typeof input !== 'undefined' && input !== null;

/**
 * Type guard helper for filtering lists that may have falsey items
 *
 * @example myList.filter(isTruthy)
 *
 * @param input potentially falsey value
 * @returns {boolean} whether input is truthy
 */
export const isTruthy = <T>(
  input: T | undefined | null | boolean,
): input is T =>
  typeof input !== 'undefined' && input !== null && input !== false;
