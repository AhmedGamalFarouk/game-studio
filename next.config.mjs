/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.freetogame.com'],
  },
  env: {
    IGDB_CLIENT_ID: process.env.IGDB_CLIENT_ID,
    IGDB_ACCESS_TOKEN: process.env.IGDB_ACCESS_TOKEN,
  },
};

export default nextConfig;
