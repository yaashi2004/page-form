/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove deprecated serverActions - it's now enabled by default in Next.js 14.1.0
  // experimental: {
  //   serverActions: true,
  // },
  
  // Add Vercel-specific optimizations
  swcMinify: true,
  
  // Ensure proper handling of Clerk middleware
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
