/** @typedef {import('jest').Config} JestConfig */

const config = require('@hover/javascript/jest');

/** @type JestConfig */
module.exports = {
  ...config,
  coverageThreshold: null,
  transformIgnorePatterns: ['/node_modules/(?!(react-merge-refs)/)'],
};
