import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/organizasyon.com",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
