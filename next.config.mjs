/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Lumi',
  assetPrefix: '/Lumi/',
  trailingSlash: true,
};

export default nextConfig;