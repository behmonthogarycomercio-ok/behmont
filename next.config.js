/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'http2.mlstatic.com' },
      { protocol: 'https', hostname: '**.mlstatic.com' },
    ],
  },
};

module.exports = nextConfig;
