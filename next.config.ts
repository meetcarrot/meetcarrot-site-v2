import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
  async rewrites() {
    return [
      {
        source: "/legals/terms/index.html",
        destination: "/legals/terms",
      },
    ];
  },
};

export default nextConfig;
