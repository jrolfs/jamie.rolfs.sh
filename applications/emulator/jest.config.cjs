/** @typedef {import('ts-jest/dist/types').InitialOptionsTsJest} JestConfig */

const path = require('path');

const config = require('../../jest/base.config.cjs');

/** @type {JestConfig} */
module.exports = {
  ...config,
  setupFilesAfterEnv: [path.join(__dirname, 'jest.setup.cjs')],
};
