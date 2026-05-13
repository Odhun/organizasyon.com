"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export function StatsSection() {
  const t = useTranslations("stats");

  const stats = [
    { number: "500+", label: t("couples") },
    { number: "15+",  label: t("experience") },
    { number: "1200+", label: t("events") },
    { number: "%100", label: t("satisfaction") },
  ];

  return (
    <Section bg="alt" className="py-0">
      <div className="h-px bg-[var(--border)]" />
      <Stagger className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <StaggerItem key={s.label}>
            <div
              className={`py-10 px-6 text-center md:text-left ${
                i < stats.length - 1 ? "border-r border-[var(--border)]" : ""
              } ${i >= 2 ? "border-t border-[var(--border)] md:border-t-0" : ""}`}
            >
              <p className="font-serif text-4xl md:text-5xl font-semibold text-[var(--accent)] leading-none mb-2">
                {s.number}
              </p>
              <p className="text-xs font-sans text-[var(--muted)] tracking-wider uppercase leading-relaxed">
                {s.label}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      <div className="h-px bg-[var(--border)]" />
    </Section>
  );
}
