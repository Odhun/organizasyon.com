import { setRequestLocale } from "next-intl/server";
import { TestimonialsPage } from "@/components/testimonials/TestimonialsPage";
import { fetchTestimonials } from "@/lib/data";
import { locales } from "@/i18n/routing";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isTr = locale === "tr";
  const title = isTr ? "Müşteri Yorumları | Odhun Organizasyon" : "Client Reviews | Odhun Organization";
  const description = isTr
    ? "Mutlu müşterilerimizin deneyimlerini okuyun. Düğün, nişan ve özel etkinlik organizasyonlarımız hakkında gerçek yorumlar."
    : "Read our happy clients' experiences. Real reviews about our wedding, engagement and special event organization services.";
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/yorumlar`,
      languages: { tr: "/tr/yorumlar", en: "/en/yorumlar" },
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/yorumlar`,
      locale: isTr ? "tr_TR" : "en_US",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const testimonials = await fetchTestimonials(locale);
  return <TestimonialsPage testimonials={testimonials} />;
}
