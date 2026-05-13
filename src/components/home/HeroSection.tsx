"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[var(--surface-dark)]">
      {/* Arka plan desen */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            var(--accent) 0px,
            var(--accent) 1px,
            transparent 1px,
            transparent 24px
          )`,
        }}
      />

      {/* Gradient katmanı */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface-dark)] via-[var(--surface-dark)]/90 to-[var(--surface-dark2)]/80" />

      {/* Altın çizgi — sol */}
      <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-[var(--accent)]/30 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          {/* Üst etiket */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-10 bg-[var(--accent)]" />
            <span className="text-[var(--accent)] text-xs font-sans tracking-[0.25em] uppercase">
              Profesyonel Etkinlik Organizasyonu
            </span>
          </motion.div>

          {/* Başlık */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-white leading-tight tracking-tight mb-6"
          >
            Hayalinizdeki
            <br />
            <span className="text-[var(--accent)]">Etkinlik</span>
            <br />
            Bir Adım Uzakta
          </motion.h1>

          {/* Alt başlık */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/60 text-lg font-sans leading-relaxed mb-10 max-w-xl"
          >
            Düğün, nişan, kurumsal etkinlik veya özel gününüz için eksiksiz organizasyon.
            Her detayı özenle planlıyor, unutulmaz anlar yaratıyoruz.
          </motion.p>

          {/* CTA butonları */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/teklif">
              <Button variant="primary" size="lg">
                Ücretsiz Teklif Al
              </Button>
            </Link>
            <Link href="/galeri">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                Galeriyi İncele
              </Button>
            </Link>
          </motion.div>

          {/* Özellikler */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-14 flex flex-wrap gap-6"
          >
            {["500+ Başarılı Etkinlik", "15+ Yıl Deneyim", "Aynı Gün Yanıt"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-[var(--accent)]" />
                <span className="text-sm text-white/50 font-sans">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Aşağı kaydır */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
