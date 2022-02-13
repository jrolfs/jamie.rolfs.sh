/** @typedef {import('ts-jest/dist/types').InitialOptionsTsJest} JestConfig */

const { pathsToModuleNameMapper } = require('@hover/javascript/api/test');
const config = require('@hover/javascript/jest');

const { compilerOptions } = require('./tsconfig.json');

/** @type JestConfig */
module.exports = {
  ...config,
  coverageThreshold: null,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
  }),
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
};
