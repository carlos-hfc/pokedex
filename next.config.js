/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "raw.githubusercontent.com",
        protocol: "https"
      }
    ]
  },
  env: {
    VERCEL_URL: process.env.VERCEL_URL
  }
};

module.exports = nextConfig;
