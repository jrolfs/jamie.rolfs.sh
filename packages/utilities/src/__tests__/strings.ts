import { camelize, capitalize, pascalize, uncapitalize } from '../strings';

describe('capitalize', () => {
  test('capitalizes first character', () => {
    expect(capitalize('foo')).toEqual('Foo');
  });

  test.each([
    ['FOO', 'FOO'],
    ['fOO', 'FOO'],
  ])('leaves existing capitalization alone in "%s"', (provided, expected) => {
    expect(capitalize(provided)).toEqual(expected);
  });
});

describe('uncapitalize', () => {
  test('uncapitalizes first character', () => {
    expect(uncapitalize('Foo')).toEqual('foo');
  });

  test.each([
    ['foo', 'foo'],
    ['Foo', 'foo'],
  ])('leaves existing capitalization alone in "%s"', (provided, expected) => {
    expect(uncapitalize(provided)).toEqual(expected);
  });
});

describe('pascalize', () => {
  test.each([
    ['-kebab-case', 'KebabCase'],
    ['kebab-case-', 'KebabCase'],
    ['spaced words', 'SpacedWords'],
    [' spaced words ', 'SpacedWords'],
    [' Mixed-spaced and kebab ', 'MixedSpacedAndKebab'],
    ['PascalCase', 'PascalCase'],
    ['snake_case', 'SnakeCase'],
    ['-mixed_snake and spaced-and-kebab', 'MixedSnakeAndSpacedAndKebab'],
  ])('formats "%s" as "%s"`', (provided, expected) => {
    expect(pascalize(provided)).toEqual(expected);
  });
});

describe('camelize', () => {
  test.each([
    ['-kebab-case', 'kebabCase'],
    ['kebab-case-', 'kebabCase'],
    ['spaced words', 'spacedWords'],
    [' spaced words ', 'spacedWords'],
    [' Mixed-spaced and kebab ', 'mixedSpacedAndKebab'],
    ['PascalCase', 'pascalCase'],
    ['snake_case', 'snakeCase'],
    ['-mixed_snake and spaced-and-kebab', 'mixedSnakeAndSpacedAndKebab'],
  ])('formats "%s" as "%s"`', (provided, expected) => {
    expect(camelize(provided)).toEqual(expected);
  });
});
