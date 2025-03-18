import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV == "production",
  }
};

export default nextConfig;
