import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Phone, ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { mockServices } from "@/lib/mock-data";

export function generateStaticParams() {
  return mockServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = mockServices.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} | Odhun Organizasyon`,
    description: service.shortDescription,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = mockServices.find((s) => s.slug === slug);
  if (!service) notFound();

  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <div className={`bg-gradient-to-br ${service.gradient} py-16 md:py-24 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-[var(--surface-dark)]/60" />
          <Container size="lg">
            <div className="relative z-10">
              <Link
                href="/hizmetler"
                className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-sans mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Tüm Hizmetler
              </Link>
              <p className="text-xs font-sans tracking-[0.25em] uppercase text-[var(--accent-soft)] mb-3">
                Hizmet Detayı
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-white mb-3 leading-tight">
                {service.title}
              </h1>
              {service.priceRange && (
                <p className="text-white/60 font-sans text-base">
                  Fiyat Aralığı: <span className="text-[var(--accent-soft)] font-medium">{service.priceRange}</span>
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
                  <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] mb-3">
                    Hizmet Hakkında
                  </h2>
                  <GoldDivider className="max-w-[80px] mb-5" />
                  {service.description.split("\n\n").map((para, i) => (
                    <p key={i} className="text-[var(--ink-light)] leading-relaxed mb-3 text-base">
                      {para}
                    </p>
                  ))}
                </div>

                <div>
                  <h2 className="font-serif text-2xl font-semibold text-[var(--ink)] mb-3">
                    Neler Dahil?
                  </h2>
                  <GoldDivider className="max-w-[80px] mb-5" />
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[var(--ink-light)]">
                        <CheckCircle2 className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                {/* CTA card */}
                <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--white)] p-6 sticky top-24">
                  <p className="font-serif text-lg font-semibold text-[var(--ink)] mb-1">
                    Bu hizmet için teklif alın
                  </p>
                  <p className="text-sm text-[var(--muted)] mb-5 leading-relaxed">
                    Aynı gün yanıt garantisiyle bütçenize özel fiyat öneriyoruz.
                  </p>
                  <div className="space-y-3">
                    <Link href="/teklif" className="block">
                      <Button variant="primary" size="md" className="w-full">
                        Ücretsiz Teklif Al <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <a href="tel:+905321234567" className="block">
                      <Button variant="outline" size="md" className="w-full">
                        <Phone className="w-4 h-4" /> Hemen Ara
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Other services */}
                <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-alt)] p-5">
                  <p className="text-xs font-sans font-semibold tracking-widest uppercase text-[var(--accent)] mb-4">
                    Diğer Hizmetler
                  </p>
                  <ul className="space-y-2">
                    {mockServices
                      .filter((s) => s.slug !== service.slug)
                      .map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`/hizmetler/${s.slug}`}
                            className="flex items-center gap-2 text-sm text-[var(--ink-light)] hover:text-[var(--accent)] transition-colors py-0.5"
                          >
                            <ArrowRight className="w-3.5 h-3.5 text-[var(--accent)]" />
                            {s.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
