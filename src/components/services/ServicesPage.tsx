"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, Gift, Briefcase, GraduationCap, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Button } from "@/components/ui/Button";
import { mockServices } from "@/lib/mock-data";

const icons: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-7 h-7" />,
  Gift: <Gift className="w-7 h-7" />,
  Briefcase: <Briefcase className="w-7 h-7" />,
  GraduationCap: <GraduationCap className="w-7 h-7" />,
};

export function ServicesPage() {
  const t = useTranslations("services");
  const params = useParams();
  const locale = (params?.locale as string) ?? "tr";
  const [active, setActive] = useState("all");

  const categoryLabels: Record<string, string> = {
    all: t("categories.all"),
    dugun: t("categories.dugun"),
    dogum_gunu: t("categories.dogum_gunu"),
    kurumsal: t("categories.kurumsal"),
    mezuniyet: t("categories.mezuniyet"),
  };

  const filtered = active === "all"
    ? mockServices
    : mockServices.filter((s) => s.category === active);

  return (
    <>
      {/* Hero */}
      <div className="bg-[var(--surface-dark)] py-16 md:py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `radial-gradient(var(--accent) 1px, transparent 1px)`, backgroundSize: "32px 32px" }}
        />
        <Container size="lg">
          <FadeIn className="text-center">
            <p className="text-xs font-sans tracking-[0.25em] uppercase text-[var(--accent)] mb-3">
              {t("pageBadge")}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-4 leading-tight">
              {t("pageTitle")}
            </h1>
            <p className="text-white/50 max-w-xl mx-auto text-base font-sans leading-relaxed">
              {t("pageSubtitle")}
            </p>
          </FadeIn>
        </Container>
      </div>

      {/* Filter */}
      <div className="bg-[var(--bg)] border-b border-[var(--border)] sticky top-16 z-30">
        <Container size="lg">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`shrink-0 px-4 py-2 rounded text-sm font-sans font-medium transition-all duration-200 ${
                  active === key
                    ? "bg-[var(--accent)] text-[var(--surface-dark)]"
                    : "text-[var(--ink-light)] hover:text-[var(--accent)] hover:bg-[var(--bg-alt)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Cards */}
      <Section>
        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filtered.map((service) => (
            <StaggerItem key={service.slug}>
              <div className="group rounded-xl border border-[var(--border)] bg-[var(--white)] hover:border-[var(--accent)]/50 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full">
                {/* Color bar */}
                <div className={`h-2 bg-gradient-to-r ${service.gradient}`} />

                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 w-12 h-12 rounded-lg bg-[var(--bg-alt)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-[var(--surface-dark)] transition-all duration-300">
                      {icons[service.icon]}
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-semibold text-[var(--ink)] leading-snug">
                        {service.title}
                      </h2>
                      {service.priceRange && (
                        <p className="text-xs font-sans text-[var(--muted)] mt-0.5">{service.priceRange}</p>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-[var(--ink-light)] leading-relaxed mb-5">
                    {service.shortDescription}
                  </p>

                  <ul className="space-y-2 mb-6 flex-1">
                    {service.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[var(--ink-light)]">
                        <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0" />
                        {f}
                      </li>
                    ))}
                    {service.features.length > 4 && (
                      <li className="text-xs text-[var(--muted)] pl-6">
                        +{service.features.length - 4} daha fazla hizmet
                      </li>
                    )}
                  </ul>

                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <Link href={`/${locale}/hizmetler/${service.slug}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Detayları Gör <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                    <Link href={`/${locale}/teklif`} className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">
                        Teklif Al
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* CTA Band */}
      <div className="bg-[var(--bg-alt)] border-t border-[var(--border)] py-12">
        <Container size="md">
          <FadeIn className="text-center">
            <GoldDivider className="max-w-xs mx-auto mb-6" />
            <p className="font-serif text-2xl md:text-3xl font-semibold text-[var(--ink)] mb-3">
              Hangi Hizmeti Arıyorsunuz?
            </p>
            <p className="text-[var(--ink-light)] text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Aradığınızı bulamadıysanız bizi arayın. Her etkinliğe özel çözüm üretiriz.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={`/${locale}/teklif`}>
                <Button variant="primary" size="lg">Ücretsiz Teklif Al</Button>
              </Link>
              <a href="tel:+905321234567">
                <Button variant="outline" size="lg">Hemen Ara</Button>
              </a>
            </div>
          </FadeIn>
        </Container>
      </div>
    </>
  );
}
