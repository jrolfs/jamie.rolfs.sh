/** @typedef {import('jest').Config} JestConfig */

const config = require('@hover/javascript/jest');

/** @type JestConfig */
module.exports = {
  ...config,
  coverageThreshold: null,
  transform: { '^.+\\.(t|j|mj)sx?$': ['@swc/jest'] },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  transformIgnorePatterns: ['/node_modules/(?!(react-merge-refs)/)'],
};
