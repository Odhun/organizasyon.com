"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { mockGallery } from "@/lib/mock-data";

export function GalleryStrip() {
  const t = useTranslations("gallery");
  const params = useParams();
  const locale = (params?.locale as string) ?? "tr";
  const items = mockGallery.slice(0, 6);

  return (
    <Section bg="alt" id="galeri">
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

      <Stagger className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {items.map((item) => (
          <StaggerItem key={item.id}>
            <Link href={`/${locale}/galeri`} className="group block relative overflow-hidden rounded-lg aspect-[4/3]">
              {/* Real image */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-[var(--surface-dark)]/30 group-hover:bg-[var(--surface-dark)]/55 transition-all duration-300" />
              {/* Category label */}
              <div className="absolute inset-0 flex items-end p-3 sm:p-4">
                <span className="text-white text-xs sm:text-sm font-sans font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0 bg-[var(--accent)] text-[var(--surface-dark)] px-2 py-0.5 rounded">
                  {item.category}
                </span>
              </div>
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg" />
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      <FadeIn delay={0.3} className="text-center mt-10">
        <Link
          href={`/${locale}/galeri`}
          className="inline-flex items-center gap-2 text-sm font-sans text-[var(--accent)] hover:text-[var(--surface-dark)] transition-colors border-b border-[var(--accent)]/40 hover:border-[var(--surface-dark)]/40 pb-0.5"
        >
          {t("sectionViewAll")} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </FadeIn>
    </Section>
  );
}
