/**
 * Guard version of `Object.prototype.hasOwnProperty` that makes it
 * possible to access the property being checked (as `unknown`)
 *
 * @param object object to test
 * @param property name of property to test for
 */
export const hasOwnProperty = <X extends {}, Y extends PropertyKey>(
  object: X,
  property: Y,
): object is X & Record<Y, unknown> =>
  Object.prototype.hasOwnProperty.call(object, property);
