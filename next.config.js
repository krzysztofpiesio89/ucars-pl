/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[
            "cdn.imagin.studio",
            "avatars.githubusercontent.com",
            "images.pexels.com" ,
            "res.cloudinary.com",
            "lh3.googleusercontent.com",
            "via.placeholder.com",
            "vis.iaai.com"
        ]
    },
     experimental: { // <-- Dodaj ten blok
    serverActions: true,
  },
}

module.exports = nextConfig
