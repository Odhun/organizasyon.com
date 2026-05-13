import { setRequestLocale } from "next-intl/server";
import { TestimonialsPage } from "@/components/testimonials/TestimonialsPage";
import { fetchTestimonials } from "@/lib/data";
import { locales } from "@/i18n/routing";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: locale === "tr" ? "Müşteri Yorumları | Odhun Organizasyon" : "Client Reviews | Odhun Organization",
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const testimonials = await fetchTestimonials(locale);
  return <TestimonialsPage testimonials={testimonials} />;
}
