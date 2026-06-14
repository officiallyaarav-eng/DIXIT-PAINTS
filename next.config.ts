import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Three.js / R3F ship ESM that benefits from being transpiled by Next.
  transpilePackages: ["three"],
};

export default nextConfig;
