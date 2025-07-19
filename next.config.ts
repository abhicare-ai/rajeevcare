import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "8bt950rc7s.ufs.sh",
        pathname: "**",
      },
    ],
  },
  serverExternalPackages: ["@node-rs/argon2"],
};

export default nextConfig;
