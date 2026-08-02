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
};

export default nextConfig;