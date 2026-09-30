import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `next build` writes plain HTML/CSS/JS to `out/`, which is
  // uploaded to S3 (see deployment/). Legacy /legals/* URLs are redirected by
  // the bucket's website routing rules, not by Next.
  output: "export",
  // `/help` -> `help/index.html`, so S3 website hosting serves it with no
  // rewrite layer.
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    // The built-in optimizer needs a server.
    unoptimized: true,
  },
};

export default nextConfig;
