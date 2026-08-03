import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://gear-up-backend-one.vercel.app/api/:path*",
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/dashboard/customer/rentals",
        destination: "/dashboard/rentals",
        permanent: true,
      },
      {
        source: "/dashboard/customer/payments",
        destination: "/dashboard/payments",
        permanent: true,
      },
      {
        source: "/dashboard/customer/profile",
        destination: "/dashboard/profile",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;