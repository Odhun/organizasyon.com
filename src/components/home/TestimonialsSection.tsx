"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Star } from "lucide-react";
import { mockTestimonials } from "@/lib/mock-data";

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const visible = mockTestimonials.slice(0, 3);

  return (
    <Section id="yorumlar">
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

      <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visible.map((t_) => (
          <StaggerItem key={t_.name}>
            <div className="p-7 rounded-lg border border-[var(--border)] bg-[var(--white)] hover:border-[var(--accent)]/40 hover:shadow-md transition-all duration-300 h-full flex flex-col">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t_.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]" />
                ))}
              </div>
              <p className="text-[var(--ink-light)] text-sm leading-relaxed flex-1 mb-5 italic">
                &ldquo;{t_.comment}&rdquo;
              </p>
              <div className="border-t border-[var(--border)] pt-4">
                <p className="font-serif font-semibold text-[var(--ink)] text-sm">{t_.name}</p>
                <p className="text-xs text-[var(--muted)] mt-0.5">{t_.event}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
