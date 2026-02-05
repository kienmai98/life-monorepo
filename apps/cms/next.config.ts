import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath: process.env.NODE_ENV === 'production' ? '/life-monorepo' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
