import { setRequestLocale } from "next-intl/server";
import { AboutPage } from "@/components/about/AboutPage";
import { locales } from "@/i18n/routing";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isTr = locale === "tr";
  const title = isTr ? "Hakkımızda | Odhun Organizasyon" : "About Us | Odhun Organization";
  const description = isTr
    ? "15 yılı aşkın deneyimle Anamur'un en güvenilir etkinlik organizasyon firması. Ekibimiz ve hikayemiz hakkında bilgi alın."
    : "Anamur's most trusted event organization company with over 15 years of experience. Learn about our team and story.";
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/hakkimizda`,
      languages: { tr: "/tr/hakkimizda", en: "/en/hakkimizda" },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/hakkimizda`,
      locale: isTr ? "tr_TR" : "en_US",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutPage />;
}
