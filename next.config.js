/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'], // For Sanity.io image hosting
  },
}

module.exports = nextConfig 