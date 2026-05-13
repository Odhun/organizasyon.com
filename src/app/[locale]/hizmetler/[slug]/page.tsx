import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Phone, ArrowRight } from "lucide-react";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { mockServices } from "@/lib/mock-data";
import { locales } from "@/i18n/routing";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    mockServices.map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const service = mockServices.find((s) => s.slug === slug);
  if (!service) return {};
  return { title: `${service.title} | Odhun Organizasyon`, description: service.shortDescription };
}

export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = mockServices.find((s) => s.slug === slug);
  if (!service) notFound();

  const t = await getTranslations("services");

  return (
    <>
      {/* Hero */}
      <div className={`bg-gradient-to-br ${service.gradient} py-16 md:py-24 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-[var(--surface-dark)]/60" />
        {service.coverImage && (
          <img src={service.coverImage} alt="" aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-30" />
        )}
        <Container size="lg">
          <div className="relative z-10">
            <Link href={`/${locale}/hizmetler`}
              className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-sans mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> {t("pageTitle")}
            </Link>
            <p className="text-xs font-sans tracking-[0.25em] uppercase text-[var(--accent-soft)] mb-3">{t("detailBadge")}</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-white mb-3 leading-tight">{service.title}</h1>
            {service.priceRange && (
              <p className="text-white/60 font-sans text-base">
                {t("priceRange")}: <span className="text-[var(--accent-soft)] font-medium">{service.priceRange}</span>
              </p>
            )}
          </div>
        </Container>
      </div>

      {/* Content */}
      <div className="bg-[var(--bg)] py-12 md:py-16">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] mb-3">{t("about")}</h2>
                <GoldDivider className="max-w-[80px] mb-5" />
                {service.description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-[var(--ink-light)] leading-relaxed mb-3 text-base">{para}</p>
                ))}
              </div>
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] mb-3">{t("included")}</h2>
                <GoldDivider className="max-w-[80px] mb-5" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--ink-light)]">
                      <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />{f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--white)] p-6 sticky top-24">
                <p className="font-serif text-lg font-semibold text-[var(--ink)] mb-1">{t("sidebarTitle")}</p>
                <p className="text-sm text-[var(--muted)] mb-5 leading-relaxed">{t("sidebarSubtitle")}</p>
                <div className="space-y-3">
                  <Link href={`/${locale}/teklif`} className="block">
                    <Button variant="primary" size="md" className="w-full">
                      Ücretsiz Teklif Al <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <a href="tel:+905321234567" className="block">
                    <Button variant="outline" size="md" className="w-full">
                      <Phone className="w-4 h-4" /> +90 532 123 45 67
                    </Button>
                  </a>
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-alt)] p-5">
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-[var(--accent)] mb-4">{t("otherServices")}</p>
                <ul className="space-y-2">
                  {mockServices.filter((s) => s.slug !== service.slug).map((s) => (
                    <li key={s.slug}>
                      <Link href={`/${locale}/hizmetler/${s.slug}`}
                        className="flex items-center gap-2 text-sm text-[var(--ink-light)] hover:text-[var(--accent)] transition-colors py-0.5">
                        <ArrowRight className="w-3.5 h-3.5 text-[var(--accent)]" />{s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
