import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/organizasyon.com",
  // trailingSlash: true yaparsa basePath'teki nokta (.com) redirect döngüsü oluşturur
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
