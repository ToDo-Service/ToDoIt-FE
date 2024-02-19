/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/auth/Login",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
