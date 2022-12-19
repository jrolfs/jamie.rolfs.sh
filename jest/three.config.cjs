/** @typedef {import('jest').Config} JestConfig */

const path = require('path');

const config = require('./base.config.cjs');

/** @type JestConfig */
module.exports = {
  ...config,
  setupFilesAfterEnv: [path.join(__dirname, 'three.setup.cjs')],
};
