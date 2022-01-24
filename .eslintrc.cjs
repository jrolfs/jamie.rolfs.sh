module.exports = {
  extends: [
    require.resolve('@hover/javascript/eslint/react'),
    require.resolve('@hover/javascript/eslint/strict'),
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['tsconfig.json', 'tsconfig.eslint.json'],
  },
};
