import { setRequestLocale } from "next-intl/server";
import { QuotePageClient } from "@/components/forms/QuotePageClient";
import { locales } from "@/i18n/routing";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isTr = locale === "tr";
  const title = isTr ? "Teklif Al | Odhun Organizasyon" : "Get a Quote | Odhun Organization";
  const description = isTr
    ? "Etkinliğiniz için ücretsiz teklif alın. Formu doldurun, uzmanlarımız aynı gün bütçenize özel teklif hazırlasın."
    : "Get a free quote for your event. Fill in the form and our experts will prepare a custom offer the same day.";
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/teklif`,
      languages: { tr: "/tr/teklif", en: "/en/teklif" },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/teklif`,
      locale: isTr ? "tr_TR" : "en_US",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <QuotePageClient />;
}
