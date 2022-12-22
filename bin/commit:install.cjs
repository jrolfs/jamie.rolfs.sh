const { install } = require('husky');

if (!process.env.CI) install();
