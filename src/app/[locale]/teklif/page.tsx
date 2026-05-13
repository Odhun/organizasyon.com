import { setRequestLocale } from "next-intl/server";
import { QuotePage } from "@/components/forms/QuotePage";
import { locales } from "@/i18n/routing";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "tr" ? "Teklif Al | Odhun Organizasyon" : "Get a Quote | Odhun Organization",
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <QuotePage />;
}
