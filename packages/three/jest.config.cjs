/** @typedef {import('ts-jest/dist/types').InitialOptionsTsJest} JestConfig */

const config = require('@hover/javascript/jest');

/** @type JestConfig */
module.exports = {
  ...config,
  coverageThreshold: null,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
};
