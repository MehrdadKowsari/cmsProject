/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  trailingSlash: true,
  i18n,
  transpilePackages: ['@mui/material'],
  distDir: 'dist'
}

module.exports = nextConfig
