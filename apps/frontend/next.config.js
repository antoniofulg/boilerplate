/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@shared/contracts', '@shared/config', '@shared/ui'],
  output: 'standalone',
};

module.exports = nextConfig;

