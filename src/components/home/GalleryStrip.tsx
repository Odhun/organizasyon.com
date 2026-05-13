"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { mockGallery } from "@/lib/mock-data";
import type { DisplayGalleryItem } from "@/lib/data";

const mockFallback: DisplayGalleryItem[] = mockGallery.map((g) => ({
  id: g.id, title: g.title, category: g.category, imageUrl: g.imageUrl, year: g.year,
}));

export function GalleryStrip({ items }: { items?: DisplayGalleryItem[] }) {
  const t = useTranslations("gallery");
  const params = useParams();
  const locale = (params?.locale as string) ?? "tr";
  const list = (items ?? mockFallback).slice(0, 5);

  return (
    <Section bg="alt" id="galeri">
      {/* Section header — editorial */}
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
            href={`/${locale}/galeri`}
            className="hidden md:inline-flex items-center gap-2 text-sm font-sans text-[var(--accent)] hover:text-[var(--surface-dark)] transition-colors duration-200 border-b border-[var(--accent)]/30 hover:border-[var(--surface-dark)]/40 pb-0.5 shrink-0 mb-1"
          >
            {t("sectionViewAll")} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="mt-7 h-px bg-[var(--border)]" />
      </FadeIn>

      {/* Asymmetric grid: first image wider */}
      <Stagger className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        {list.map((item, i) => (
          <StaggerItem key={item.id} className={i === 0 ? "col-span-2 md:col-span-2" : ""}>
            <Link
              href={`/${locale}/galeri`}
              className={`group block relative overflow-hidden rounded ${
                i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
              } cursor-pointer`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay — subtle, more visible on hover */}
              <div className="absolute inset-0 bg-[var(--surface-dark)]/20 group-hover:bg-[var(--surface-dark)]/45 transition-all duration-400" />
              {/* Category — always visible on large item, hover-only on small */}
              <div className="absolute inset-0 flex items-end p-3 sm:p-4">
                <span className={`text-white text-xs font-sans font-medium bg-[var(--accent)] text-[var(--surface-dark)] px-2.5 py-1 rounded-sm transition-all duration-300 ${
                  i === 0
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
                }`}>
                  {item.category}
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Mobile: view all below */}
      <FadeIn delay={0.3} className="text-center mt-9 md:hidden">
        <Link
          href={`/${locale}/galeri`}
          className="inline-flex items-center gap-2 text-sm font-sans text-[var(--accent)] hover:text-[var(--surface-dark)] transition-colors duration-200 border-b border-[var(--accent)]/30 hover:border-[var(--surface-dark)]/40 pb-0.5"
        >
          {t("sectionViewAll")} <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </FadeIn>
    </Section>
  );
}
