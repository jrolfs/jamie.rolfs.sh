import { isFunction } from './guards';

/**
 * Conditionally invoke a function if provided value
 * is a function, otherwise simply return the value
 *
 * @param maybeFunction function or value
 */
export const invoke = <T, U>(
  maybeFunction: T | ((...args: U[]) => T),
  ...args: U[]
): T => (isFunction(maybeFunction) ? maybeFunction(...args) : maybeFunction);

/**
 * Promise-based function debounce
 *
 * @param callback function to be invoked
 * @param delay delay in milliseconds
 *
 * @returns tuple containing debounced function, and teardown function
 */
export const debounce = <A = unknown, R = void>(
  callback: (args: A) => R,
  delay: number,
): [(args: A) => Promise<R>, () => void] => {
  let timer: ReturnType<typeof globalThis['setTimeout']>;

  const debounced = (args: A): Promise<R> =>
    new Promise(resolve => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        resolve(callback(args));
      }, delay);
    });

  const teardown = () => clearTimeout(timer);

  return [debounced, teardown];
};
