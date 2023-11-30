/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    APP_URL: process.env.APP_URL,
    VERCEL_URL: process.env.VERCEL_URL,
  },
};

module.exports = nextConfig;
