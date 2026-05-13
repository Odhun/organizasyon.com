"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Phone } from "lucide-react";

export function CtaSection() {
  const t = useTranslations("cta");
  const params = useParams();
  const locale = (params?.locale as string) ?? "tr";

  return (
    <section className="bg-[var(--bg-alt)] py-20 md:py-28 relative overflow-hidden">
      {/* Thin border lines top/bottom */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[var(--border)]" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--border)]" />

      {/* Decorative background brand name — very subtle */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span className="font-serif text-[clamp(80px,18vw,220px)] font-semibold text-[var(--accent)]/[0.04] whitespace-nowrap leading-none tracking-tight">
          Odhun
        </span>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <FadeIn>
          <p className="text-[10px] font-sans tracking-[0.4em] uppercase text-[var(--accent)] mb-5">
            {t("badge")}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[var(--ink)] mb-5 leading-tight">
            {t("title1")}
            <br />
            <span className="italic">{t("title2")}</span>
          </h2>
          <p className="text-[var(--muted)] text-base font-sans mb-11 leading-relaxed max-w-xl mx-auto font-light">
            {t("subtitle")}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/teklif`}>
              <Button variant="dark" size="lg">{t("quoteForm")}</Button>
            </Link>
            <a href="tel:+905321234567">
              <Button variant="outline" size="lg">
                <Phone className="w-4 h-4" />
                {t("callNow")}
              </Button>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
