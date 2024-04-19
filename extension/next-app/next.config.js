/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {
    // set experiments
    config.experiments = { ...config.experiments, asyncWebAssembly: true };
    return config;
  },
};

module.exports = nextConfig;
