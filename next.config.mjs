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
};

export default nextConfig;
