import { setRequestLocale } from "next-intl/server";
import { ServicesPage } from "@/components/services/ServicesPage";
import { locales } from "@/i18n/routing";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "tr" ? "Hizmetlerimiz | Odhun Organizasyon" : "Our Services | Odhun Organization",
    description: locale === "tr"
      ? "Düğün, nişan, doğum günü, kurumsal etkinlik ve daha fazlası. Profesyonel organizasyon hizmetlerimizi keşfedin."
      : "Wedding, engagement, birthday, corporate events and more. Discover our professional organization services.",
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ServicesPage />;
}
