/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images:{
    domains: ["upload.wikimedia.org"]
  },
  swcMinify: true,
}

module.exports = nextConfig
