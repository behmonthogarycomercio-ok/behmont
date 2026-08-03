/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: 'http2.mlstatic.com' },
      { protocol: 'https', hostname: '**.mlstatic.com' },
      { protocol: 'https', hostname: '**.cdninstagram.com' },
      { protocol: 'https', hostname: '**.fbcdn.net' },
    ],
  },
  // CATEGORIAS/ y "LOGOS MARCAS/" son material de referencia (fotos que
  // provee el dueno), no assets del sitio -- no hace falta que el dev
  // server los vigile para recompilar, y verlos sobrecarga el watcher.
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/node_modules/**', '**/CATEGORIAS/**', '**/LOGOS MARCAS/**'],
    };
    return config;
  },
};

module.exports = nextConfig;
