"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

const HERO_VIDEO_1 = "/hero-video.mp4";
const HERO_VIDEO_2 = "/hero-video2.mp4";

export function HeroSection() {
  const t = useTranslations("hero");
  const params = useParams();
  const locale = (params?.locale as string) ?? "tr";
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState<1 | 2>(1);

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;
    v1.playbackRate = 0.9;
    v2.playbackRate = 0.9;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) v1.pause();
  }, []);

  const handleVideo1End = () => {
    const v2 = video2Ref.current;
    if (!v2) return;
    v2.currentTime = 0;
    v2.play();
    setActiveVideo(2);
  };

  const handleVideo2End = () => {
    const v1 = video1Ref.current;
    if (!v1) return;
    v1.currentTime = 0;
    v1.play();
    setActiveVideo(1);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[var(--surface-dark)]">
      {/* Background videos — sequential loop */}
      <video
        ref={video1Ref}
        src={HERO_VIDEO_1}
        autoPlay
        muted
        playsInline
        aria-hidden
        onEnded={handleVideo1End}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${activeVideo === 1 ? "opacity-[0.88]" : "opacity-0"}`}
      />
      <video
        ref={video2Ref}
        src={HERO_VIDEO_2}
        muted
        playsInline
        aria-hidden
        onEnded={handleVideo2End}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${activeVideo === 2 ? "opacity-[0.88]" : "opacity-0"}`}
      />

      {/* Gradient — sadece alt kenar koyulaşıyor */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-dark)]/70 via-[var(--surface-dark)]/5 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface-dark)]/10 via-transparent to-[var(--surface-dark)]/10" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent" />

      {/* Vertical editorial label — desktop only */}
      <div className="absolute right-8 xl:right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-10">
        <div className="w-px h-20 bg-gradient-to-b from-transparent to-[var(--accent)]/30" />
        <span
          className="text-[9px] font-sans tracking-[0.3em] text-[var(--accent)]/40 uppercase select-none"
          style={{ writingMode: "vertical-rl" }}
        >
          Est. 2009 · Anamur
        </span>
        <div className="w-px h-20 bg-gradient-to-t from-transparent to-[var(--accent)]/30" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-24">
        {/* Editorial badge — no pill, no pulsing dot */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-7"
        >
          <span className="text-[11px] font-sans tracking-[0.4em] uppercase text-white/90 [text-shadow:0_1px_16px_rgba(0,0,0,1)]">
            {t("badge")}
          </span>
          <div className="mt-3 h-px w-10 bg-[var(--accent)]/40 mx-auto" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease, delay: 0.1 }}
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-semibold text-white leading-[1.06] mb-6 tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.85)]"
        >
          {t("titleLine1")}
          <br />
          <span className="text-[var(--accent)] italic">{t("titleAccent")}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease, delay: 0.2 }}
          className="text-white/85 text-lg sm:text-xl font-sans max-w-xl mx-auto leading-relaxed mb-11 font-light [text-shadow:0_1px_16px_rgba(0,0,0,0.9)]"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link href={`/${locale}/teklif`}>
            <Button variant="primary" size="lg">{t("cta1")}</Button>
          </Link>
          <Link href={`/${locale}/galeri`}>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white/80 hover:bg-white/8 hover:border-white/35 hover:text-white"
            >
              {t("cta2")}
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator — line + chevron, no text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <div className="w-px h-7 bg-gradient-to-b from-transparent to-[var(--accent)]/30" />
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[var(--accent)]/35" />
        </motion.div>
      </motion.div>
    </section>
  );
}
