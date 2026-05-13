import { setRequestLocale } from "next-intl/server";
import { AboutPage } from "@/components/about/AboutPage";
import { locales } from "@/i18n/routing";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "tr" ? "Hakkımızda | Odhun Organizasyon" : "About Us | Odhun Organization",
    description: locale === "tr"
      ? "15 yılı aşkın deneyimle Anamur'un en güvenilir etkinlik organizasyon firması."
      : "Anamur's most trusted event organization company with over 15 years of experience.",
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutPage />;
}
