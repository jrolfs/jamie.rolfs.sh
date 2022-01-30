const config = require('@hover/javascript/lint-staged');

const formatAndLint = ['hover-scripts format', 'hover-scripts lint'];

module.exports = {
  './README.md': config['README.md'],
  '.github/**/*.yml': 'hover-scripts format',
  '.yarnrc.yml': 'hover-scripts format',
  './*.config.(cjs|js|ts)': formatAndLint,
};
