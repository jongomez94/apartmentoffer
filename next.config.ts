import type { NextConfig } from "next";

/** Keep framer-motion on 11.12.x in package.json; avoid transpilePackages for it (can break vendor-chunks on Windows). If you see missing chunk errors, delete `.next` and rebuild. */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
