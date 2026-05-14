import type { MetadataRoute } from "next";

const BASE_URL = "https://odhun-organizasyon.vercel.app";
const LOCALES = ["tr", "en"] as const;

const STATIC_PATHS = [
  "",
  "/hizmetler",
  "/galeri",
  "/hakkimizda",
  "/yorumlar",
  "/iletisim",
  "/teklif",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const path of STATIC_PATHS) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`])
          ),
        },
      });
    }
  }

  return entries;
}
