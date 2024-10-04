/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
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
