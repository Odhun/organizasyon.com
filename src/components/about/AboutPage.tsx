"use client";

import Link from "next/link";
import { Heart, Award, Users, Clock, Star, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Button } from "@/components/ui/Button";

const team = [
  { name: "Aylin Öztürk", role: "Kurucu & Baş Organizatör", gradient: "from-rose-200 to-rose-400" },
  { name: "Mehmet Karahan", role: "Etkinlik Koordinatörü", gradient: "from-sky-200 to-sky-400" },
  { name: "Selin Demirci", role: "Dekorasyon & Tasarım", gradient: "from-amber-200 to-amber-400" },
  { name: "Emre Yıldız", role: "Müşteri İlişkileri", gradient: "from-emerald-200 to-emerald-400" },
];

export function AboutPage() {
  const t = useTranslations("about");
  const params = useParams();
  const locale = (params?.locale as string) ?? "tr";

  const values = [
    { icon: <Heart className="w-6 h-6" />, title: t("values.passion.title"), description: t("values.passion.desc") },
    { icon: <Award className="w-6 h-6" />, title: t("values.excellence.title"), description: t("values.excellence.desc") },
    { icon: <Users className="w-6 h-6" />, title: t("values.trust.title"), description: t("values.trust.desc") },
    { icon: <Clock className="w-6 h-6" />, title: t("values.punctuality.title"), description: t("values.punctuality.desc") },
  ];

  const stats = [
    { number: "1200+", label: t("stats.events") },
    { number: "500+", label: t("stats.couples") },
    { number: "15+", label: t("stats.experience") },
    { number: "%100", label: t("stats.satisfaction") },
  ];

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

      {/* Story */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <FadeIn>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[var(--accent-soft)] to-[var(--bg-alt)] relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-serif text-6xl font-semibold text-[var(--accent)] opacity-20">15+</p>
                    <p className="text-[var(--muted)] text-sm mt-2">{t("stats.experience")}</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[var(--surface-dark)] text-white p-4 rounded-xl shadow-xl w-36">
                <p className="font-serif text-2xl font-semibold text-[var(--accent)]">1200+</p>
                <p className="text-white/60 text-xs mt-0.5">{t("stats.events")}</p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-xs font-sans tracking-[0.25em] uppercase text-[var(--accent)] mb-3">{t("storyBadge")}</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[var(--ink)] mb-4 leading-tight">{t("storyTitle")}</h2>
            <GoldDivider className="max-w-[80px] mb-5" />
            <div className="space-y-4 text-[var(--ink-light)] text-base leading-relaxed">
              <p>{t("story1")}</p>
              <p>{t("story2")}</p>
              <p>{t("story3")}</p>
            </div>
            <div className="mt-6">
              <Link href={`/${locale}/teklif`}>
                <Button variant="primary" size="md">
                  {t("workWithUs")} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Stats */}
      <div className="bg-[var(--surface-dark)] py-12 md:py-16">
        <Container size="lg">
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <p className="font-serif text-3xl md:text-4xl font-semibold text-[var(--accent)]">{s.number}</p>
                <p className="text-white/50 text-sm font-sans mt-1">{s.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </div>

      {/* Values */}
      <Section bg="alt">
        <FadeIn className="text-center mb-10">
          <p className="text-xs font-sans tracking-[0.25em] uppercase text-[var(--accent)] mb-3">{t("valuesBadge")}</p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[var(--ink)]">{t("valuesTitle")}</h2>
          <GoldDivider className="max-w-xs mx-auto mt-4" />
        </FadeIn>
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="p-6 rounded-xl border border-[var(--border)] bg-[var(--white)] hover:border-[var(--accent)]/40 hover:shadow-md transition-all duration-300 h-full">
                <div className="w-11 h-11 rounded-lg bg-[var(--bg-alt)] flex items-center justify-center text-[var(--accent)] mb-4">{v.icon}</div>
                <h3 className="font-serif text-lg font-semibold text-[var(--ink)] mb-2">{v.title}</h3>
                <p className="text-sm text-[var(--ink-light)] leading-relaxed">{v.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Team */}
      <Section>
        <FadeIn className="text-center mb-10">
          <p className="text-xs font-sans tracking-[0.25em] uppercase text-[var(--accent)] mb-3">{t("teamBadge")}</p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[var(--ink)]">{t("teamTitle")}</h2>
          <GoldDivider className="max-w-xs mx-auto mt-4" />
        </FadeIn>
        <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {team.map((member) => (
            <StaggerItem key={member.name}>
              <div className="text-center group">
                <div className={`w-full aspect-square rounded-xl bg-gradient-to-br ${member.gradient} mb-3 relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center">
                      <Users className="w-8 h-8 text-white/70" />
                    </div>
                  </div>
                </div>
                <p className="font-serif font-semibold text-[var(--ink)] text-sm leading-snug">{member.name}</p>
                <p className="text-xs text-[var(--muted)] mt-0.5">{member.role}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* CTA */}
      <div className="bg-[var(--bg-alt)] border-t border-[var(--border)] py-12">
        <Container size="md">
          <FadeIn className="text-center">
            <Star className="w-8 h-8 text-[var(--accent)] mx-auto mb-4" />
            <p className="font-serif text-2xl md:text-3xl font-semibold text-[var(--ink)] mb-3">{t("ctaTitle")}</p>
            <p className="text-[var(--ink-light)] text-sm mb-6 max-w-md mx-auto leading-relaxed">{t("ctaSubtitle")}</p>
            <Link href={`/${locale}/teklif`}>
              <Button variant="primary" size="lg">Ücretsiz Teklif Al</Button>
            </Link>
          </FadeIn>
        </Container>
      </div>
    </>
  );
}
