"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { mockTestimonials } from "@/lib/mock-data";
import type { DisplayTestimonial } from "@/lib/data";

const mockFallback: DisplayTestimonial[] = mockTestimonials.map((t) => ({
  name: t.name, event: t.event, comment: t.comment, rating: t.rating, date: t.date,
}));

export function TestimonialsSection({ testimonials }: { testimonials?: DisplayTestimonial[] }) {
  const t = useTranslations("testimonials");
  const visible = (testimonials ?? mockFallback).slice(0, 3);

  return (
    <Section id="yorumlar">
      {/* Section header */}
      <FadeIn className="mb-10">
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
        <div className="mt-7 h-px bg-[var(--border)]" />
      </FadeIn>

      <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {visible.map((testimonial, i) => {
          const isDark = i === 1;
          return (
            <StaggerItem key={testimonial.name ?? i}>
              <div
                className={`relative p-7 rounded overflow-hidden h-full flex flex-col border transition-all duration-300 ${
                  isDark
                    ? "bg-[var(--surface-dark)] border-[var(--surface-dark)]"
                    : "bg-[var(--white)] border-[var(--border)] hover:border-[var(--accent)]/40 hover:shadow-sm"
                }`}
              >
                {/* Decorative large quotation mark */}
                <span
                  className={`absolute top-3 right-5 font-serif text-8xl leading-none select-none pointer-events-none ${
                    isDark ? "text-white/[0.04]" : "text-[var(--accent)]/[0.08]"
                  }`}
                  aria-hidden
                >
                  &ldquo;
                </span>

                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <svg
                      key={j}
                      className={`w-3.5 h-3.5 ${isDark ? "text-[var(--accent)]" : "text-[var(--accent)]"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p
                  className={`text-sm leading-relaxed flex-1 mb-6 font-light ${
                    isDark ? "text-white/70" : "text-[var(--ink-light)]"
                  }`}
                >
                  &ldquo;{testimonial.comment}&rdquo;
                </p>

                {/* Author */}
                <div
                  className={`border-t pt-4 ${
                    isDark ? "border-white/10" : "border-[var(--border)]"
                  }`}
                >
                  <p
                    className={`font-serif font-semibold text-sm ${
                      isDark ? "text-white" : "text-[var(--ink)]"
                    }`}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    className={`text-xs mt-0.5 ${
                      isDark ? "text-white/40" : "text-[var(--muted)]"
                    }`}
                  >
                    {testimonial.event}
                  </p>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
