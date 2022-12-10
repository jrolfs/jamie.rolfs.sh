/**
 * Get a random integer within a range
 *
 * @param maximum maximum value
 * @param minimum minimum value
 * @returns random integer
 */
export const random = (maximum: number, minimum: number) =>
  Math.floor(Math.random() * (maximum - minimum) + minimum);
