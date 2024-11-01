import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./locales/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: process.env.NEXT_OUTPUT as NextConfig['output'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.**.**',
      },
      {
        protocol: 'https',
        hostname: '**.**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
