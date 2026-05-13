import { setRequestLocale } from "next-intl/server";
import { GalleryPage } from "@/components/gallery/GalleryPage";
import { locales } from "@/i18n/routing";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "tr" ? "Galeri | Odhun Organizasyon" : "Gallery | Odhun Organization",
    description: locale === "tr"
      ? "Gerçekleştirdiğimiz özel etkinliklere göz atın."
      : "Browse the special events we've organized.",
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GalleryPage />;
}
