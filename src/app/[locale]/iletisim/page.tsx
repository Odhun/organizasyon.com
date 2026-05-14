import { setRequestLocale } from "next-intl/server";
import { ContactPage } from "@/components/contact/ContactPage";
import { locales } from "@/i18n/routing";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isTr = locale === "tr";
  const title = isTr ? "İletişim | Odhun Organizasyon" : "Contact | Odhun Organization";
  const description = isTr
    ? "Anamur, Mersin'deki organizasyon ekibimizle iletişime geçin. Aynı gün yanıt garantisi."
    : "Contact our event organization team in Anamur, Mersin. Same-day response guarantee.";
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/iletisim`,
      languages: { tr: "/tr/iletisim", en: "/en/iletisim" },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/iletisim`,
      locale: isTr ? "tr_TR" : "en_US",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactPage />;
}
