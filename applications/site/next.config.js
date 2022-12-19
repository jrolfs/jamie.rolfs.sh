const withPreconstruct = require('@preconstruct/next');
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
};

module.exports = withVanillaExtract(withPreconstruct(nextConfig));
