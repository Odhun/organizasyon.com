import { setRequestLocale } from "next-intl/server";
import { GalleryPage } from "@/components/gallery/GalleryPage";
import { fetchGalleryItems } from "@/lib/data";
import { locales } from "@/i18n/routing";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isTr = locale === "tr";
  const title = isTr ? "Galeri | Odhun Organizasyon" : "Gallery | Odhun Organization";
  const description = isTr
    ? "Gerçekleştirdiğimiz özel etkinliklere göz atın. Düğün, nişan, doğum günü ve kurumsal etkinlik fotoğrafları."
    : "Browse the special events we've organized. Wedding, engagement, birthday and corporate event photos.";
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/galeri`,
      languages: { tr: "/tr/galeri", en: "/en/galeri" },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/galeri`,
      locale: isTr ? "tr_TR" : "en_US",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const items = await fetchGalleryItems(locale);
  return <GalleryPage initialItems={items} />;
}
