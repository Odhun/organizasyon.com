"use client";

import Link from "next/link";
import { Heart, Gift, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { mockServices } from "@/lib/mock-data";

const icons = [Heart, Gift, Briefcase, GraduationCap];
const colors = [
  "from-rose-100/50 to-transparent",
  "from-[var(--accent-light)] to-transparent",
  "from-sky-100/50 to-transparent",
  "from-emerald-100/50 to-transparent",
];

export function ServicesPreview() {
  const t = useTranslations("services");
  const params = useParams();
  const locale = (params?.locale as string) ?? "tr";

  return (
    <Section id="hizmetler">
      <FadeIn className="text-center mb-4">
        <p className="text-xs font-sans tracking-[0.25em] uppercase text-[var(--accent)] mb-3">
          {t("sectionBadge")}
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[var(--ink)]">
          {t("sectionTitle")}
          <br />
          <span className="text-[var(--surface-dark)]">{t("sectionTitleAccent")}</span>
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <GoldDivider className="max-w-xs mx-auto mb-12" />
      </FadeIn>

      <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockServices.map((s, i) => {
          const Icon = icons[i];
          return (
            <StaggerItem key={s.slug}>
              <Link
                href={`/${locale}/hizmetler/${s.slug}`}
                className="group block rounded-lg border border-[var(--border)] bg-[var(--white)] hover:border-[var(--accent)] hover:shadow-lg transition-all duration-300 h-full overflow-hidden"
              >
                {/* Cover image */}
                {s.coverImage && (
                  <div className="w-full h-36 overflow-hidden">
                    <img
                      src={s.coverImage}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className={`w-11 h-11 rounded flex items-center justify-center bg-gradient-to-br ${colors[i]} mb-4 -mt-7 relative z-10 border border-white shadow-sm`}>
                    <Icon className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[var(--ink)] mb-2 group-hover:text-[var(--surface-dark)] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-3 line-clamp-2">
                    {s.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs text-[var(--accent)] font-sans group-hover:gap-2 transition-all">
                    {t("sectionViewAll").split(" ")[0]} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>

      <FadeIn delay={0.3} className="text-center mt-10">
        <Link
          href={`/${locale}/hizmetler`}
          className="inline-flex items-center gap-2 text-sm font-sans text-[var(--accent)] hover:text-[var(--surface-dark)] transition-colors border-b border-[var(--accent)]/40 hover:border-[var(--surface-dark)]/40 pb-0.5"
        >
          {t("sectionViewAll")} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </FadeIn>
    </Section>
  );
}
