/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  devIndicators: {
    buildActivity: false,
  },
  compiler: {
    styledComponents: true,
  },
};
module.exports = nextConfig;
