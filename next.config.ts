import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  turbopack: {
    root: 'C:\\Users\\cjhum\\Documents\\student-marketplace',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sdvmrfwuxvzypurkumeh.supabase.co',
      },
    ],
  },
}

export default nextConfig
