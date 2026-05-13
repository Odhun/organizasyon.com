"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { mockServices } from "@/lib/mock-data";
import type { DisplayService } from "@/lib/data";

const numbers = ["01", "02", "03", "04"];

const mockFallback: DisplayService[] = mockServices.map((s) => ({
  slug: s.slug, category: s.category, title: s.title,
  shortDescription: s.shortDescription, description: s.description,
  features: s.features, priceRange: s.priceRange, coverImage: s.coverImage,
  gradient: s.gradient, icon: s.icon,
}));

export function ServicesPreview({ services }: { services?: DisplayService[] }) {
  const t = useTranslations("services");
  const params = useParams();
  const locale = (params?.locale as string) ?? "tr";
  const list = services ?? mockFallback;

  return (
    <Section id="hizmetler">
      {/* Section header */}
      <FadeIn className="mb-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[10px] font-sans tracking-[0.35em] uppercase text-[var(--accent)] mb-3">
              {t("sectionBadge")}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[var(--ink)] leading-tight">
              {t("sectionTitle")}
              <br />
              <span className="italic text-[var(--surface-dark)]">{t("sectionTitleAccent")}</span>
            </h2>
          </div>
          <Link
            href={`/${locale}/hizmetler`}
            className="hidden md:inline-flex items-center gap-2 text-sm font-sans text-[var(--accent)] hover:text-[var(--surface-dark)] transition-colors duration-200 border-b border-[var(--accent)]/30 hover:border-[var(--surface-dark)]/40 pb-0.5 shrink-0 mb-1"
          >
            {t("sectionViewAll")} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="mt-7 h-px bg-[var(--border)]" />
      </FadeIn>

      <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {list.map((s, i) => (
          <StaggerItem key={s.slug}>
            <Link
              href={`/${locale}/hizmetler/${s.slug}`}
              className="group flex flex-col rounded overflow-hidden border border-[var(--border)] bg-[var(--white)] hover:border-[var(--accent)]/60 hover:shadow-md transition-all duration-300 h-full cursor-pointer"
            >
              {/* Cover image */}
              {s.coverImage && (
                <div className="w-full h-44 overflow-hidden bg-[var(--bg-alt)] shrink-0">
                  <img
                    src={s.coverImage}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="p-5 flex flex-col flex-1">
                <span className="text-[10px] font-sans font-semibold tracking-[0.25em] text-[var(--accent)] mb-2.5 block">
                  {numbers[i]}
                </span>
                <h3 className="font-serif text-base font-semibold text-[var(--ink)] mb-2 group-hover:text-[var(--surface-dark)] transition-colors duration-200 leading-snug">
                  {s.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-3 line-clamp-2 font-light">
                  {s.shortDescription}
                </p>

                {/* Features (first 3) */}
                {s.features && s.features.length > 0 && (
                  <ul className="space-y-1 mb-4">
                    {s.features.slice(0, 3).map((f, fi) => (
                      <li key={fi} className="flex items-start gap-1.5 text-xs text-[var(--ink-light)]">
                        <Check className="w-3 h-3 mt-0.5 text-[var(--accent)] shrink-0" />
                        <span className="line-clamp-1">{f}</span>
                      </li>
                    ))}
                    {s.features.length > 3 && (
                      <li className="text-xs text-[var(--muted)] pl-4.5">
                        +{s.features.length - 3} daha fazla
                      </li>
                    )}
                  </ul>
                )}

                <div className="mt-auto flex items-center justify-between">
                  {s.priceRange ? (
                    <span className="text-xs font-sans font-semibold text-[var(--accent)]">{s.priceRange}</span>
                  ) : (
                    <span />
                  )}
                  <span className="inline-flex items-center gap-1.5 text-xs text-[var(--accent)] font-sans group-hover:gap-2.5 transition-all duration-200">
                    İncele <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Mobile: view all below grid */}
      <FadeIn delay={0.3} className="text-center mt-9 md:hidden">
        <Link
          href={`/${locale}/hizmetler`}
          className="inline-flex items-center gap-2 text-sm font-sans text-[var(--accent)] hover:text-[var(--surface-dark)] transition-colors duration-200 border-b border-[var(--accent)]/30 hover:border-[var(--surface-dark)]/40 pb-0.5"
        >
          {t("sectionViewAll")} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </FadeIn>
    </Section>
  );
}
