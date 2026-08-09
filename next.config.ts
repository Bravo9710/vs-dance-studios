import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export has no Image Optimization server at runtime.
    // Responsive AVIF/WebP variants are pre-generated in the assets phase.
    unoptimized: true,
  },
};

export default nextConfig;
