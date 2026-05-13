"use client";

import { useState } from "react";
import { Send, CheckCircle, Phone, Clock, Shield } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Button } from "@/components/ui/Button";

type FormData = {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  location: string;
  budget: string;
  message: string;
};

const eventTypes = [
  "Düğün",
  "Nişan",
  "Kına Gecesi",
  "Doğum Günü",
  "Baby Shower",
  "Kurumsal Etkinlik / Lansman",
  "Mezuniyet",
  "Sünnet",
  "Diğer",
];

const budgetRanges = [
  "₺5.000 – ₺15.000",
  "₺15.000 – ₺30.000",
  "₺30.000 – ₺60.000",
  "₺60.000 – ₺100.000",
  "₺100.000+",
  "Belirtmek istemiyorum",
];

const perks = [
  { icon: <Clock className="w-4 h-4" />, text: "Aynı gün yanıt garantisi" },
  { icon: <Shield className="w-4 h-4" />, text: "Bilgileriniz güvende" },
  { icon: <Phone className="w-4 h-4" />, text: "Ücretsiz danışmanlık" },
];

export function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "", eventType: "",
    eventDate: "", guestCount: "", location: "", budget: "", message: "",
  });

  const update = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Faz D'de Firestore'a yazılacak — şimdilik simüle ediyoruz
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] bg-[var(--bg)] flex items-center justify-center px-4">
        <FadeIn className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-[var(--accent)]" />
          </div>
          <h2 className="font-serif text-3xl font-semibold text-[var(--ink)] mb-3">
            Talebiniz Alındı!
          </h2>
          <GoldDivider className="max-w-xs mx-auto mb-5" />
          <p className="text-[var(--ink-light)] text-base leading-relaxed mb-6">
            Ekibimiz en kısa sürede, genellikle aynı gün içinde sizinle iletişime geçecektir.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Beklemek istemiyor musunuz?{" "}
            <a href="tel:+905321234567" className="text-[var(--accent)] hover:underline">
              Hemen arayın
            </a>
          </p>
        </FadeIn>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <div className="bg-[var(--surface-dark)] py-14 md:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `radial-gradient(var(--accent) 1px, transparent 1px)`, backgroundSize: "32px 32px" }}
        />
        <Container size="lg">
          <FadeIn className="text-center">
            <p className="text-xs font-sans tracking-[0.25em] uppercase text-[var(--accent)] mb-3">
              Ücretsiz
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-white mb-3 leading-tight">
              Teklif Alın
            </h1>
            <p className="text-white/50 max-w-lg mx-auto text-base font-sans leading-relaxed">
              Formu doldurun, uzmanlarımız aynı gün bütçenize özel teklif hazırlasın.
            </p>
          </FadeIn>
        </Container>
      </div>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <FadeIn>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1: name + phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans font-semibold text-[var(--ink)] mb-1.5 tracking-wide uppercase">
                      Ad Soyad <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Adınız Soyadınız"
                      className="w-full h-11 px-4 rounded border border-[var(--border)] bg-[var(--white)] text-[var(--ink)] text-sm font-sans placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans font-semibold text-[var(--ink)] mb-1.5 tracking-wide uppercase">
                      Telefon <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+90 5__ ___ __ __"
                      className="w-full h-11 px-4 rounded border border-[var(--border)] bg-[var(--white)] text-[var(--ink)] text-sm font-sans placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-sans font-semibold text-[var(--ink)] mb-1.5 tracking-wide uppercase">
                    E-posta <span className="text-[var(--accent)]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="ornek@email.com"
                    className="w-full h-11 px-4 rounded border border-[var(--border)] bg-[var(--white)] text-[var(--ink)] text-sm font-sans placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                  />
                </div>

                {/* Event type + date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans font-semibold text-[var(--ink)] mb-1.5 tracking-wide uppercase">
                      Etkinlik Türü <span className="text-[var(--accent)]">*</span>
                    </label>
                    <select
                      required
                      value={form.eventType}
                      onChange={(e) => update("eventType", e.target.value)}
                      className="w-full h-11 px-4 rounded border border-[var(--border)] bg-[var(--white)] text-[var(--ink)] text-sm font-sans focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors appearance-none"
                    >
                      <option value="">Seçiniz</option>
                      {eventTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-sans font-semibold text-[var(--ink)] mb-1.5 tracking-wide uppercase">
                      Etkinlik Tarihi
                    </label>
                    <input
                      type="date"
                      value={form.eventDate}
                      onChange={(e) => update("eventDate", e.target.value)}
                      className="w-full h-11 px-4 rounded border border-[var(--border)] bg-[var(--white)] text-[var(--ink)] text-sm font-sans focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                    />
                  </div>
                </div>

                {/* Guest count + location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-sans font-semibold text-[var(--ink)] mb-1.5 tracking-wide uppercase">
                      Tahmini Kişi Sayısı
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={form.guestCount}
                      onChange={(e) => update("guestCount", e.target.value)}
                      placeholder="50"
                      className="w-full h-11 px-4 rounded border border-[var(--border)] bg-[var(--white)] text-[var(--ink)] text-sm font-sans placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-sans font-semibold text-[var(--ink)] mb-1.5 tracking-wide uppercase">
                      Etkinlik Yeri / Şehir
                    </label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => update("location", e.target.value)}
                      placeholder="İstanbul, Bağcılar..."
                      className="w-full h-11 px-4 rounded border border-[var(--border)] bg-[var(--white)] text-[var(--ink)] text-sm font-sans placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-xs font-sans font-semibold text-[var(--ink)] mb-1.5 tracking-wide uppercase">
                    Bütçe Aralığı
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {budgetRanges.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => update("budget", form.budget === b ? "" : b)}
                        className={`px-3 py-2.5 rounded border text-xs font-sans text-left transition-all duration-150 ${
                          form.budget === b
                            ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] font-medium"
                            : "border-[var(--border)] text-[var(--ink-light)] hover:border-[var(--accent)]/40"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-sans font-semibold text-[var(--ink)] mb-1.5 tracking-wide uppercase">
                    Mesajınız / Notlar
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Etkinliğiniz hakkında bilgi verin, beklentilerinizi paylaşın..."
                    className="w-full px-4 py-3 rounded border border-[var(--border)] bg-[var(--white)] text-[var(--ink)] text-sm font-sans placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors resize-none"
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full sm:w-auto">
                  <Send className="w-4 h-4" />
                  Teklif Talep Et
                </Button>
              </form>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <FadeIn delay={0.1}>
              <div className="rounded-xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 p-5">
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-[var(--accent)] mb-3">
                  Neden Biz?
                </p>
                <ul className="space-y-3">
                  {perks.map((p) => (
                    <li key={p.text} className="flex items-center gap-2.5 text-sm text-[var(--ink-light)]">
                      <span className="text-[var(--accent)]">{p.icon}</span>
                      {p.text}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--white)] p-5">
                <p className="text-xs font-sans font-semibold tracking-widest uppercase text-[var(--accent)] mb-3">
                  Hemen Konuşun
                </p>
                <p className="text-sm text-[var(--ink-light)] leading-relaxed mb-4">
                  Formu beklemek istemiyor musunuz?
                </p>
                <a href="tel:+905321234567" className="block">
                  <Button variant="outline" size="sm" className="w-full">
                    <Phone className="w-4 h-4" /> +90 532 123 45 67
                  </Button>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>
    </>
  );
}
