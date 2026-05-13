import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/organizasyon.com",
  // trailingSlash kaldırıldı — basePath'teki nokta (.com) redirect döngüsü oluşturur
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
