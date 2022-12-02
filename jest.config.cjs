/** @typedef {import('jest').Config} JestConfig */

const path = require('path');

const config = require('@hover/javascript/jest');

/** @type JestConfig */
module.exports = {
  ...config,
  coverageThreshold: null,
  transform: { '^.+\\.(t|j|mj)sx?$': ['@swc-node/jest'] },
  setupFilesAfterEnv: [path.join(__dirname, 'jest.setup.cjs')],
  transformIgnorePatterns: ['/node_modules/(?!(react-merge-refs)/)'],
};
