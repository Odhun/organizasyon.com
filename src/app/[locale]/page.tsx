import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { GalleryStrip } from "@/components/home/GalleryStrip";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaSection } from "@/components/home/CtaSection";
import { fetchServices, fetchGalleryItems, fetchTestimonials } from "@/lib/data";
import { locales } from "@/i18n/routing";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "tr" ? "Odhun Organizasyon | Profesyonel Etkinlik Yönetimi" : "Odhun Organization | Professional Event Management",
    description: locale === "tr"
      ? "Anamur'da düğün, nişan, doğum günü, kurumsal ve tüm özel etkinlikler için profesyonel organizasyon hizmeti."
      : "Professional event organization for weddings, engagements, birthdays, corporate events and all special occasions in Anamur.",
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [services, galleryItems, testimonials] = await Promise.all([
    fetchServices(locale),
    fetchGalleryItems(locale),
    fetchTestimonials(locale),
  ]);

  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesPreview services={services} />
      <GalleryStrip items={galleryItems} />
      <TestimonialsSection testimonials={testimonials} />
      <CtaSection />
    </>
  );
}
