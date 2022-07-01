/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['media.graphcms.com'],
  },
    loader: 'custom',
    domains: ['media.graphcms.com'],
  // exportPathMap: async function (
  //   defaultPathMap,
  //   { dev, dir, outDir, distDir, buildId }
  // ) {
  //   return {
  //     '/': { page: '/' },
  //     '/post': { page: '/post' },
  //     '/category': { page: '/category' }
  //   }
  // }
}
