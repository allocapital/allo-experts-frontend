/** @type {import('next').NextConfig} */

const nextConfig = {
  // output: 'export',
  // basePath: process.env.NODE_ENV === 'production' ? 'https://allo.expert' : 'http://localhost:3000',
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        
        port: '',
        pathname: '/image/upload/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://www.allo.capital/mechanisms',
        permanent: true, // 301 redirect
      },
    ];
  },
};

export default nextConfig;
