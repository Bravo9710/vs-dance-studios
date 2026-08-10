import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export has no Image Optimization server at runtime, so a
    // custom loader maps requested widths to the pre-generated AVIF/WebP
    // files from scripts/optimize-images.mjs instead of resizing on demand.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
