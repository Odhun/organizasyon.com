"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { heroImageUrl } from "@/lib/mock-data";

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const t = useTranslations("hero");
  const params = useParams();
  const locale = (params?.locale as string) ?? "tr";

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[var(--surface-dark)]">
      {/* Background image */}
      <img
        src={heroImageUrl}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-dark)]/60 via-[var(--surface-dark)]/40 to-[var(--surface-dark)]" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(var(--accent) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="text-xs font-sans tracking-[0.2em] uppercase text-[var(--accent)]">
            {t("badge")}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white leading-[1.1] mb-5"
        >
          {t("titleLine1")}{" "}
          <br className="hidden sm:block" />
          {t("titleLine2")}{" "}
          <span className="text-[var(--accent)] italic">{t("titleAccent")}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="text-white/50 text-base sm:text-lg font-sans max-w-2xl mx-auto leading-relaxed mb-10"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href={`/${locale}/teklif`}>
            <Button variant="primary" size="lg">{t("cta1")}</Button>
          </Link>
          <Link href={`/${locale}/galeri`}>
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
            >
              {t("cta2")}
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-white/30">
          {t("scrollHint")}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
