"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function StatsSection() {
  const t = useTranslations("stats");

  const stats = [
    { number: "500+", label: t("couples") },
    { number: "15+", label: t("experience") },
    { number: "1200+", label: t("events") },
    { number: "%100", label: t("satisfaction") },
  ];

  return (
    <Section bg="alt" className="py-12 md:py-14">
      <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <StaggerItem key={s.label}>
            <p className="font-serif text-4xl md:text-5xl font-semibold text-[var(--accent)]">
              {s.number}
            </p>
            <p className="text-sm text-[var(--muted)] mt-1 font-sans tracking-wide">
              {s.label}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
