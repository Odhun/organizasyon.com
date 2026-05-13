"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { mockGallery } from "@/lib/mock-data";
import type { DisplayGalleryItem } from "@/lib/data";

const DEFAULT_CATEGORIES = ["Tümü", "Düğün", "Nişan", "Kına", "Doğum Günü", "Baby Shower", "Kurumsal", "Mezuniyet", "Sünnet"];

const mockFallback: DisplayGalleryItem[] = mockGallery.map((g) => ({
  id: g.id, title: g.title, category: g.category, imageUrl: g.imageUrl, year: g.year,
}));

export function GalleryPage({ initialItems }: { initialItems?: DisplayGalleryItem[] }) {
  const t = useTranslations("gallery");
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allItems = initialItems ?? mockFallback;
  const dynamicCategories = ["Tümü", ...Array.from(new Set(allItems.map((g) => g.category)))];
  const categories = initialItems ? dynamicCategories : DEFAULT_CATEGORIES;

  const filtered = activeCategory === "Tümü"
    ? allItems
    : allItems.filter((g) => g.category === activeCategory);

  const closeLightbox = () => setLightboxIndex(null);
  const prev = () => setLightboxIndex((idx) => (idx !== null ? (idx - 1 + filtered.length) % filtered.length : null));
  const next = () => setLightboxIndex((idx) => (idx !== null ? (idx + 1) % filtered.length : null));

  return (
    <>
      {/* Hero */}
      <div className="bg-[var(--surface-dark)] py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `radial-gradient(var(--accent) 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
        <Container size="lg">
          <FadeIn className="text-center">
            <p className="text-xs font-sans tracking-[0.25em] uppercase text-[var(--accent)] mb-3">{t("pageBadge")}</p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-4 leading-tight">{t("pageTitle")}</h1>
            <p className="text-white/50 max-w-xl mx-auto text-base font-sans leading-relaxed">{t("pageSubtitle")}</p>
          </FadeIn>
        </Container>
      </div>

      {/* Filter */}
      <div className="bg-[var(--bg)] border-b border-[var(--border)] sticky top-16 z-30">
        <Container size="lg">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded text-sm font-sans font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[var(--accent)] text-[var(--surface-dark)]"
                    : "text-[var(--ink-light)] hover:text-[var(--accent)] hover:bg-[var(--bg-alt)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Grid */}
      <Section>
        <Stagger className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {filtered.map((item, index) => (
            <StaggerItem key={item.id}>
              <button
                onClick={() => setLightboxIndex(index)}
                className="group relative overflow-hidden rounded-lg aspect-[4/3] w-full block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                aria-label={item.title}
              >
                {/* Real image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20 transition-all duration-300" />

                <div className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4">
                  <div className="flex justify-end">
                    <span className="text-[10px] sm:text-xs font-sans bg-black/40 text-white/80 px-2 py-0.5 rounded">
                      {item.year}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-sans bg-[var(--accent)] text-[var(--surface-dark)] px-2 py-0.5 rounded font-medium">
                      {item.category}
                    </span>
                    <p className="text-white text-xs sm:text-sm font-sans font-medium mt-1.5 line-clamp-2 text-left [text-shadow:0_1px_4px_rgba(0,0,0,0.8)]">
                      {item.title}
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg" />
              </button>
            </StaggerItem>
          ))}
        </Stagger>

        {filtered.length === 0 && (
          <FadeIn className="text-center py-20">
            <p className="text-[var(--muted)] font-sans">{t("empty")}</p>
          </FadeIn>
        )}
      </Section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={closeLightbox} aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Önceki"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative bg-black">
              <img
                src={filtered[lightboxIndex].imageUrl}
                alt={filtered[lightboxIndex].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-xs font-sans bg-[var(--accent)] text-[var(--surface-dark)] px-2 py-0.5 rounded font-medium">
                  {filtered[lightboxIndex].category}
                </span>
                <p className="text-white text-lg font-serif font-semibold mt-2">
                  {filtered[lightboxIndex].title}
                </p>
                <p className="text-white/60 text-sm mt-0.5">{filtered[lightboxIndex].year}</p>
              </div>
            </div>
            <p className="text-center text-white/40 text-xs mt-3 font-sans">
              {lightboxIndex + 1} / {filtered.length}
            </p>
          </div>

          <button
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Sonraki"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
}
