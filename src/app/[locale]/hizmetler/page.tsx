import { setRequestLocale } from "next-intl/server";
import { ServicesPage } from "@/components/services/ServicesPage";
import { fetchServices } from "@/lib/data";
import { locales } from "@/i18n/routing";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isTr = locale === "tr";
  const title = isTr ? "Hizmetlerimiz | Odhun Organizasyon" : "Our Services | Odhun Organization";
  const description = isTr
    ? "Düğün, nişan, doğum günü, kurumsal etkinlik ve daha fazlası. Profesyonel organizasyon hizmetlerimizi keşfedin."
    : "Wedding, engagement, birthday, corporate events and more. Discover our professional organization services.";
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/hizmetler`,
      languages: { tr: "/tr/hizmetler", en: "/en/hizmetler" },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/hizmetler`,
      locale: isTr ? "tr_TR" : "en_US",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const services = await fetchServices(locale);
  return <ServicesPage initialServices={services} />;
}
