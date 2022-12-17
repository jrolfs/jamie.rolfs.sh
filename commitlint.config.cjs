const { ls, scopes } = require('@hover/javascript/api/commit');

/**
 * Apply build scopes to a directory
 *
 * @param {string} dir
 */
const nested = dir => scopes.build().flatMap(s => ls.dirs(dir, { prefix: s }));

module.exports = {
  extends: ['@hover/javascript/commitlint'],
  rules: {
    'scope-enum': [
      1,
      'always',
      [
        // Build scopes, e.g: `build(scope)`
        'turbo',
        'typescript',
        ...scopes.build(),
        ...nested('./packages'),
        ...nested('./applications'),

        // General scopes
        'assets',
        ...ls.dirs('./packages'),
        ...ls.dirs('./applications'),
      ],
    ],
  },
};
