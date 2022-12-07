const { ls, scopes } = require('@hover/javascript/api/commit');

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

        // General scopes
        'assets',
        ...ls.dirs('./packages'),
        ...ls.dirs('./applications'),
      ],
    ],
  },
};
