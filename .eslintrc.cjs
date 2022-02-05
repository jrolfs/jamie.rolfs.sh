/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    require.resolve('@hover/javascript/eslint/strict'),
    require.resolve('@hover/javascript/eslint/react'),
    require.resolve('@hover/javascript/eslint/react-strict'),
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [
      'applications/**/tsconfig.json',
      'packages/**/tsconfig.json',
      'tsconfig.eslint.json',
    ],
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};
