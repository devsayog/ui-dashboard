/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ['fakestoreapi.com', 'randomuser.me'],
  },
}

module.exports = nextConfig
