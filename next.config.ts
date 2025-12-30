import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  cacheComponents:true,
  images: {
    remotePatterns: [
      {
      hostname: 'plus.unsplash.com',
      protocol: 'https',
      port: '',
      },
      {
        hostname: 'friendly-gnat-516.convex.cloud',
        protocol: 'https',
        port: '', 
      }
    ]
  }
};

export default nextConfig;
