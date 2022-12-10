//
// ---------- Internal --------------------
//

/**
 * Remove non-word characters from a string
 */
const removeNonWord = (string: string) =>
  string.replace(/[^0-9a-zA-Z\xC0-\xFF -]/g, '');

/**
 * Format all but the first word of a string with `camelCase`
 *
 * @example
 * ```ts
 * toCamel('some-string');
 * // someString
 *
 * toCamel('Some-string');
 * // SomeString
 */
const toCamel = (string: string) =>
  // hyphens and underscores to spaces, then strip non-word characters
  removeNonWord(string.replace(/[-_]/g, ' '))
    .replace(/\s[a-z]/g, s => s.toUpperCase()) // capitalize words
    .replace(/\s+/g, ''); // remove spaces

//
// ---------- Public --------------------
//

/**
 * Capitalize the first character in a string
 *
 * @param string string to capitalize
 * @returns new string with first character capitalized
 */
export const capitalize = <S extends string>([first, ...rest]: S) =>
  (first.toUpperCase() + rest.join('')) as Capitalize<S>;

/**
 * Un-capitalize the first character in a string
 *
 * @param string string to capitalize
 * @returns new string with first character capitalized
 */
export const uncapitalize = <S extends string>([first, ...rest]: S) =>
  (first.toLowerCase() + rest.join('')) as Uncapitalize<S>;

/**
 * Format a string with `PascalCase`
 *
 * @param string string to format
 * @returns new string in `PascalCase`
 */
export const pascalize = (string: string) =>
  toCamel(string).replace(/^[a-z]/g, s => s.toLocaleUpperCase());

/**
 * Format a string with `camelCase`
 *
 * @param string string to format
 * @returns new string in `camelCase`
 */
export const camelize = (string: string) =>
  toCamel(string).replace(/^[A-Z]/g, s => s.toLocaleLowerCase());

export type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ''
  ? []
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S];

export const split = <S extends string, D extends string>(
  string: S,
  delimiter: D,
) => string.split(delimiter) as Split<S, D>;
