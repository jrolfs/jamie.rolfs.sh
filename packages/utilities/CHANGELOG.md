# Change Log

## 0.16.0

### Minor Changes

- 0a039c9: Add `parseRegExp` for parsing `RegExp` from strings

## 0.15.0

### Minor Changes

- [#2204](https://github.com/hoverinc/blueprint/pull/2204)
  [`ea06df2e`](https://github.com/hoverinc/blueprint/commit/ea06df2e9fd6706e7839ced00720cee54754ae79)
  Thanks [@jrolfs](https://github.com/jrolfs)! - Add `mapValues` for mapping
  over object values

- [#2204](https://github.com/hoverinc/blueprint/pull/2204)
  [`a344535a`](https://github.com/hoverinc/blueprint/commit/a344535ae2f89e93ba3de0dd65c09a3ca474c19b)
  Thanks [@jrolfs](https://github.com/jrolfs)! - Add `uncapitalize` string
  function

## 0.14.0

### Minor Changes

- [`e74fcd2d`](https://github.com/hoverinc/blueprint/commit/e74fcd2d0f7d11a7670c237f35a1eaa70211bc49)
  Thanks [@jrolfs](https://github.com/jrolfs)! - Add `pick` function for picking
  properties from objects

## 0.13.0

### Minor Changes

- [#2095](https://github.com/hoverinc/blueprint/pull/2095)
  [`a5f1c3ad`](https://github.com/hoverinc/blueprint/commit/a5f1c3ad193c7ed2352d14e0b2b3fac66062571e)
  Thanks [@jrolfs](https://github.com/jrolfs)! - Add version of
  `String.prototype.split` that use template literal type

- [#2095](https://github.com/hoverinc/blueprint/pull/2095)
  [`6f157b00`](https://github.com/hoverinc/blueprint/commit/6f157b0016f1e09fc1f88eff396d75ca156ea7fc)
  Thanks [@jrolfs](https://github.com/jrolfs)! - Add a `Promise`-based
  `debounce`

## 0.12.0

### Minor Changes

- [#1947](https://github.com/hoverinc/blueprint/pull/1947)
  [`9924631c`](https://github.com/hoverinc/blueprint/commit/9924631c30d4bb42dc80f5cd81dbdfea643c6bc2)
  Thanks [@jrolfs](https://github.com/jrolfs)! - Add `isFunction` guard and
  `invoke` helper for conditionally invoking functions

## 0.11.0

### Minor Changes

- [#1925](https://github.com/hoverinc/blueprint/pull/1925)
  [`d2e1adc7`](https://github.com/hoverinc/blueprint/commit/d2e1adc750524adaf3057c25a9dcae46538c568a)
  Thanks [@jrolfs](https://github.com/jrolfs)! - Add `assertUnreachable` helper
  for exhaustive case handling

### Patch Changes

- [#1925](https://github.com/hoverinc/blueprint/pull/1925)
  [`ed69a883`](https://github.com/hoverinc/blueprint/commit/ed69a883369fc8658a1aa9dfede4665bccdfdc08)
  Thanks [@jrolfs](https://github.com/jrolfs)! - Update types for `capitalize`
  to leverage TypeScript literal types

## 0.10.0

### Minor Changes

- [#1796](https://github.com/hoverinc/blueprint/pull/1796)
  [`686feed1`](https://github.com/hoverinc/blueprint/commit/686feed11fa00e620878b00c9ce13e4dd3476b8c)
  Thanks [@jrolfs](https://github.com/jrolfs)! - Add version of
  `Object.fromEntries` for preserving narrower types when constructing an object
  of `as const` tuples (more or less the complement to the version of
  `Object.entries` already in **@jrolfs/utilities**)

## 0.9.0

### Minor Changes

- [#1700](https://github.com/hoverinc/blueprint/pull/1700)
  [`95ae6d8f`](https://github.com/hoverinc/blueprint/commit/95ae6d8f55a0b11e711b4619e8996e770fead548)
  Thanks [@jrolfs](https://github.com/jrolfs)! - Add guarded version of
  `hasOwnProperty`

## 0.8.0

### Minor Changes

- [#1665](https://github.com/hoverinc/blueprint/pull/1665)
  [`026ad6bb`](https://github.com/hoverinc/blueprint/commit/026ad6bb859dc66853ea99461ee1c82df8e2e6b9)
  Thanks [@jrolfs](https://github.com/jrolfs)! - Add a version of
  `Object.entries` that preserves narrower types in the resulting tuple entries

  ```ts
  import { entries } from '@jrolfs/utilities';

  const o = { a: 1, b: 2 };

  Object.entries(o); // -> [string, number][]

  // vs.

  entries(
    o,
  ) // -> ['a' | 'b', number][]
  ``;
  ```

## 0.7.0

### Minor Changes

- [#1487](https://github.com/hoverinc/blueprint/pull/1487)
  [`99f233c9`](https://github.com/hoverinc/blueprint/commit/99f233c906c3e775aec50fff8dc533ed1c8ffd69)
  Thanks [@jrolfs](https://github.com/jrolfs)! - Add `isDefined` and `isTruthy`
  guards

## 0.6.0

### Minor Changes

- [#1390](https://github.com/hoverinc/blueprint/pull/1390)
  [`ed1e1c57`](https://github.com/hoverinc/blueprint/commit/ed1e1c57ec3a98c456a343f76190963e49249d9c)
  Thanks [@jrolfs](https://github.com/jrolfs)! - Add `camelize` function for
  converting string to "camelCase"

- [#1390](https://github.com/hoverinc/blueprint/pull/1390)
  [`5624b4a1`](https://github.com/hoverinc/blueprint/commit/5624b4a18d28015ef331e5eb36c5dcec30809cc1)
  Thanks [@jrolfs](https://github.com/jrolfs)! - Add `pascalize` function for
  formatting strings in "PascalCase"

## 0.5.0

### Minor Changes

- [#1404](https://github.com/hoverinc/blueprint/pull/1404)
  [`6a016aa2`](https://github.com/hoverinc/blueprint/commit/6a016aa2f067dbbcea789f9d1ff784d2065dc7db)
  Thanks [@jrolfs](https://github.com/jrolfs)! - Add simple `isNumber` and
  `isString` guards

## 0.4.0

### Minor Changes

- [#1391](https://github.com/hoverinc/blueprint/pull/1391)
  [`2d966af6`](https://github.com/hoverinc/blueprint/commit/2d966af6350652a108271ce2f1d6f54993fcf38c)
  Thanks [@jrolfs](https://github.com/jrolfs)! - Add `camelize` function for
  converting string to "camelCase"

## 0.3.0

### Minor Changes

- [#1374](https://github.com/hoverinc/blueprint/pull/1374)
  [`ef3a26f5`](https://github.com/hoverinc/blueprint/commit/ef3a26f571a4db4e98e2b03c0fe470f1f9902c31)
  Thanks [@jrolfs](https://github.com/jrolfs)! - Add `random` function for
  generating a random integer within a range

## 0.2.0

### Minor Changes

- [#1301](https://github.com/hoverinc/blueprint/pull/1301)
  [`392c9ed7`](https://github.com/hoverinc/blueprint/commit/392c9ed7ca3c32e81037dffb9e79ba2e385f23b4)
  Thanks [@jrolfs](https://github.com/jrolfs)! - Add `capitalize` method
