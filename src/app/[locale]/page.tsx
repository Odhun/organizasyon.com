import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { GalleryStrip } from "@/components/home/GalleryStrip";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaSection } from "@/components/home/CtaSection";
import { locales } from "@/i18n/routing";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "tr" ? "Odhun Organizasyon | Profesyonel Etkinlik Yönetimi" : "Odhun Organization | Professional Event Management",
    description: locale === "tr"
      ? "İstanbul'da düğün, nişan, doğum günü, kurumsal ve tüm özel etkinlikler için profesyonel organizasyon hizmeti."
      : "Professional event organization for weddings, engagements, birthdays, corporate events and all special occasions in Istanbul.",
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesPreview />
      <GalleryStrip />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}
