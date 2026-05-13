import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { GoldDivider } from "@/components/ui/GoldDivider";

const contactItems = [
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Telefon",
    value: "+90 532 123 45 67",
    href: "tel:+905321234567",
    description: "Pzt–Cmt 09:00–19:00",
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    label: "WhatsApp",
    value: "WhatsApp ile Yaz",
    href: "https://wa.me/905321234567",
    description: "7/24 mesaj atabilirsiniz",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: "E-posta",
    value: "info@odhunorganizasyon.com",
    href: "mailto:info@odhunorganizasyon.com",
    description: "24 saat içinde yanıtlarız",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Adres",
    value: "Bağcılar Cad. No:42",
    href: null,
    description: "Bağcılar, İstanbul",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: "Çalışma Saatleri",
    value: "Pzt–Cmt 09:00–19:00",
    href: null,
    description: "Pazar günleri kapalıyız",
  },
];

export function ContactPage() {
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
              Ulaşın
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-white mb-4 leading-tight">
              İletişim
            </h1>
            <p className="text-white/50 max-w-xl mx-auto text-base font-sans leading-relaxed">
              Sorularınız için bize ulaşın. Aynı gün yanıt garantisi veriyoruz.
            </p>
          </FadeIn>
        </Container>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact info */}
          <div>
            <FadeIn>
              <p className="text-xs font-sans tracking-[0.25em] uppercase text-[var(--accent)] mb-3">
                Bilgilerimiz
              </p>
              <h2 className="font-serif text-3xl font-semibold text-[var(--ink)] mb-3">
                Bize Ulaşın
              </h2>
              <GoldDivider className="max-w-[80px] mb-6" />
              <p className="text-[var(--ink-light)] text-base leading-relaxed mb-8">
                Etkinliğiniz hakkında bilgi almak veya teklif istemek için istediğiniz kanaldan bize ulaşabilirsiniz. Uzman ekibimiz en kısa sürede yanıt verecektir.
              </p>
            </FadeIn>

            <Stagger className="space-y-4">
              {contactItems.map((item) => (
                <StaggerItem key={item.label}>
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--white)] hover:border-[var(--accent)]/40 transition-all duration-200">
                    <div className="w-10 h-10 rounded-lg bg-[var(--bg-alt)] flex items-center justify-center text-[var(--accent)] shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-sans font-semibold tracking-wide uppercase text-[var(--muted)] mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm font-medium text-[var(--ink)] hover:text-[var(--accent)] transition-colors"
                          target={item.href.startsWith("https") ? "_blank" : undefined}
                          rel={item.href.startsWith("https") ? "noopener noreferrer" : undefined}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-[var(--ink)]">{item.value}</p>
                      )}
                      <p className="text-xs text-[var(--muted)] mt-0.5">{item.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Map placeholder */}
          <FadeIn delay={0.15}>
            <div className="space-y-5">
              <div>
                <p className="text-xs font-sans tracking-[0.25em] uppercase text-[var(--accent)] mb-3">
                  Konum
                </p>
                <h2 className="font-serif text-3xl font-semibold text-[var(--ink)] mb-3">
                  Bizi Ziyaret Edin
                </h2>
                <GoldDivider className="max-w-[80px] mb-6" />
              </div>

              <div className="w-full aspect-[4/3] rounded-xl bg-[var(--bg-alt)] border border-[var(--border)] relative overflow-hidden flex items-center justify-center">
                <div className="text-center px-4">
                  <MapPin className="w-10 h-10 text-[var(--accent)] mx-auto mb-3" />
                  <p className="font-serif text-lg font-semibold text-[var(--ink)] mb-1">
                    Bağcılar, İstanbul
                  </p>
                  <p className="text-sm text-[var(--muted)]">Bağcılar Cad. No:42</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-xs font-sans text-[var(--accent)] hover:underline"
                  >
                    Google Maps&apos;te Aç →
                  </a>
                </div>
                {/* Decorative grid */}
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
                  backgroundSize: "40px 40px"
                }} />
              </div>

              <div className="bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-xl p-5">
                <p className="text-sm font-sans font-medium text-[var(--ink)] mb-1">💡 Hızlı Yanıt</p>
                <p className="text-sm text-[var(--ink-light)] leading-relaxed">
                  Acil sorularınız için WhatsApp üzerinden yazın — genellikle 30 dakika içinde yanıt veriyoruz.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
