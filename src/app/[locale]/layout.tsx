import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";
import { SiteSettingsProvider } from "@/contexts/SiteSettingsContext";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { getSiteSettings } from "@/lib/firebase/siteSettings";
import { locales } from "@/i18n/routing";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as typeof locales[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const [messages, settings] = await Promise.all([
    getMessages(),
    getSiteSettings().catch(() => null),
  ]);

  return (
    <NextIntlClientProvider messages={messages}>
      <SiteSettingsProvider settings={settings}>
        <AnnouncementBanner />
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <CookieConsent />
      </SiteSettingsProvider>
    </NextIntlClientProvider>
  );
}
