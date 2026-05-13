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
    <section className="bg-[var(--surface-dark)] py-20 md:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `radial-gradient(var(--accent) 1px, transparent 1px)`, backgroundSize: "32px 32px" }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <FadeIn>
          <p className="text-xs font-sans tracking-[0.25em] uppercase text-[var(--accent)] mb-4">
            {t("badge")}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-4 leading-tight">
            {t("title1")}
            <br />
            {t("title2")}
          </h2>
          <p className="text-white/50 text-base font-sans mb-10 leading-relaxed max-w-xl mx-auto">
            {t("subtitle")}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href={`/${locale}/teklif`}>
              <Button variant="primary" size="lg">{t("quoteForm")}</Button>
            </Link>
            <a href="tel:+905321234567">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
              >
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
