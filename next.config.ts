import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // allow images from Supabase storage
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mhcejhgocislneaiztxv.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig
