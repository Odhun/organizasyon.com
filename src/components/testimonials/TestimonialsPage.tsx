import Link from "next/link";
import { Star, Quote } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Button } from "@/components/ui/Button";
import { mockTestimonials } from "@/lib/mock-data";

export function TestimonialsPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-[var(--surface-dark)] py-16 md:py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `radial-gradient(var(--accent) 1px, transparent 1px)`, backgroundSize: "32px 32px" }}
        />
        <Container size="lg">
          <FadeIn className="text-center">
            <p className="text-xs font-sans tracking-[0.25em] uppercase text-[var(--accent)] mb-3">
              Deneyimler
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-4 leading-tight">
              Müşteri Yorumları
            </h1>
            <p className="text-white/50 max-w-xl mx-auto text-base font-sans leading-relaxed">
              Bizi en iyi müşterilerimiz anlatır. 500'den fazla mutlu çift ve ailenin deneyimi.
            </p>
          </FadeIn>
        </Container>
      </div>

      {/* Stats banner */}
      <div className="bg-[var(--accent)] py-6">
        <Container size="lg">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { number: "500+", label: "Mutlu Müşteri" },
              { number: "5.0", label: "Ortalama Puan" },
              { number: "%98", label: "Tavsiye Oranı" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-serif text-2xl md:text-3xl font-semibold text-[var(--surface-dark)]">{s.number}</p>
                <p className="text-[var(--surface-dark)]/70 text-xs font-sans mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Testimonials grid */}
      <Section>
        <FadeIn className="text-center mb-4">
          <GoldDivider className="max-w-xs mx-auto mb-8" />
        </FadeIn>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTestimonials.map((t) => (
            <StaggerItem key={t.name}>
              <div className="p-6 sm:p-7 rounded-xl border border-[var(--border)] bg-[var(--white)] hover:border-[var(--accent)]/40 hover:shadow-md transition-all duration-300 h-full flex flex-col relative">
                {/* Quote icon */}
                <Quote className="absolute top-5 right-5 w-8 h-8 text-[var(--accent)]/10" />

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-[var(--ink-light)] text-sm leading-relaxed flex-1 mb-5 italic">
                  &ldquo;{t.comment}&rdquo;
                </p>

                {/* Author */}
                <div className="border-t border-[var(--border)] pt-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--accent-soft)] to-[var(--bg-alt)] flex items-center justify-center shrink-0">
                    <span className="text-xs font-serif font-semibold text-[var(--accent)]">
                      {t.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-[var(--ink)] text-sm">{t.name}</p>
                    <p className="text-xs text-[var(--muted)] mt-0.5">{t.event} · {t.date}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* CTA */}
      <div className="bg-[var(--bg-alt)] border-t border-[var(--border)] py-12">
        <Container size="md">
          <FadeIn className="text-center">
            <p className="font-serif text-2xl md:text-3xl font-semibold text-[var(--ink)] mb-3">
              Siz de Bu Listede Yerinizi Alın
            </p>
            <p className="text-[var(--ink-light)] text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Hayalinizdeki etkinliği birlikte planlayalım ve mutlu müşterilerimiz arasına katılın.
            </p>
            <Link href="/teklif">
              <Button variant="primary" size="lg">Ücretsiz Teklif Al</Button>
            </Link>
          </FadeIn>
        </Container>
      </div>
    </>
  );
}
