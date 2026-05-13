import Link from "next/link";
import { Heart, Gift, Briefcase, GraduationCap, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { GoldDivider } from "@/components/ui/GoldDivider";

const services = [
  {
    icon: Heart,
    title: "Düğün & Nişan",
    description: "Kına, nişan ve düğün törenlerinizi en özel anınıza yakışır şekilde planlıyoruz.",
    slug: "dugun-nisan",
    color: "from-rose-100/50 to-transparent",
  },
  {
    icon: Gift,
    title: "Doğum Günü & Baby Shower",
    description: "Çocuk ve bebek partilerinden yetişkin doğum günlerine kadar unutulmaz kutlamalar.",
    slug: "dogum-gunu",
    color: "from-[var(--accent-light)] to-transparent",
  },
  {
    icon: Briefcase,
    title: "Kurumsal Etkinlikler",
    description: "Lansman, açılış, toplantı ve gala akşam yemekleri için kurumsal organizasyon.",
    slug: "kurumsal",
    color: "from-sky-100/50 to-transparent",
  },
  {
    icon: GraduationCap,
    title: "Mezuniyet & Sünnet",
    description: "Sünnet töreni ve mezuniyet partileri için eksiksiz organizasyon paketi.",
    slug: "mezuniyet-sunnet",
    color: "from-emerald-100/50 to-transparent",
  },
];

export function ServicesPreview() {
  return (
    <Section id="hizmetler">
      <FadeIn className="text-center mb-4">
        <p className="text-xs font-sans tracking-[0.25em] uppercase text-[var(--accent)] mb-3">
          Hizmetlerimiz
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[var(--ink)]">
          Her Etkinlik İçin
          <br />
          <span className="text-[var(--surface-dark)]">Özel Çözüm</span>
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <GoldDivider className="max-w-xs mx-auto mb-12" />
      </FadeIn>

      <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <StaggerItem key={s.slug}>
              <Link
                href={`/hizmetler`}
                className="group block p-6 rounded-lg border border-[var(--border)] bg-[var(--white)] hover:border-[var(--accent)] hover:shadow-lg transition-all duration-300 h-full"
              >
                <div className={`w-12 h-12 rounded flex items-center justify-center bg-gradient-to-br ${s.color} mb-5`}>
                  <Icon className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-[var(--ink)] mb-2 group-hover:text-[var(--surface-dark)] transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
                  {s.description}
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-[var(--accent)] font-sans group-hover:gap-2 transition-all">
                  Detaylı Bilgi <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            </StaggerItem>
          );
        })}
      </Stagger>

      <FadeIn delay={0.3} className="text-center mt-10">
        <Link
          href="/hizmetler"
          className="inline-flex items-center gap-2 text-sm font-sans text-[var(--accent)] hover:text-[var(--surface-dark)] transition-colors border-b border-[var(--accent)]/40 hover:border-[var(--surface-dark)]/40 pb-0.5"
        >
          Tüm hizmetleri görüntüle <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </FadeIn>
    </Section>
  );
}
