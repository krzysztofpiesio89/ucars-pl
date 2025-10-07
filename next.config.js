/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Twoja istniejąca lista domen pozostaje bez zmian
    domains: [
      "cdn.imagin.studio",
      "avatars.githubusercontent.com",
      "images.pexels.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "via.placeholder.com",
      "vis.iaai.com",
      "cdn.prod.website-files.com"
    ],
    // Dodajemy nową, bardziej elastyczną konfigurację dla Wikimedia
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/wikipedia/commons/**',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig