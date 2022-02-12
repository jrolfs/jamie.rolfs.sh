const { ls, scopes } = require('@hover/javascript/api/commit');

module.exports = {
  extends: ['@hover/javascript/commitlint'],
  rules: {
    'scope-enum': [
      1,
      'always',
      [
        'assets',
        ...ls.dirs('./packages'),
        ...ls.dirs('./applications'),
        ...scopes.build(),
      ],
    ],
  },
};
