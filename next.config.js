/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
      },
    ],
  },
  output: "standalone", // Optimize the build for standalone deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
};


module.exports = nextConfig;
