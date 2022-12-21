import { parseRegExp } from '../parse';

describe('parseRegExp', () => {
  test.each([
    ['/asdf/', /asdf/],
    ['/foo/ig', /foo/gi],
    ['/\\w+/d', /\w+/d],
    ['/(foo|bar)[a-z]+/ig', /(foo|bar)[a-z]+/gi],
  ])(
    'parses valid `RegExp` string (%s) into `RegExp` instance',
    (string, regExp) => expect(parseRegExp(string)).toEqual(regExp),
  );

  test.each([
    'asd/asdf',
    'asdd/foo/asdf',
    'sdfsd/sdf/igsdf',
    'foo',
    '//',
    '//i',
    '/',
  ])(
    'returns unmodified string (%s) that does include valid `RegExp`',
    string => expect(parseRegExp(string)).toEqual(string),
  );
});
