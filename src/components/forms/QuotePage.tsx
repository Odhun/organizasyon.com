"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle, Phone, Clock, Shield, AlertCircle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { Button } from "@/components/ui/Button";
import { reservationSchema, type ReservationFormData } from "@/lib/schemas/reservation";
import { createReservation } from "@/lib/firebase/reservations";

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

const inputClass =
  "w-full h-11 px-4 rounded border border-[var(--border)] bg-[var(--white)] text-[var(--ink)] text-sm font-sans placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors";
const inputErrorClass =
  "w-full h-11 px-4 rounded border border-red-400 bg-[var(--white)] text-[var(--ink)] text-sm font-sans placeholder:text-[var(--muted)] focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-400 transition-colors";
const labelClass =
  "block text-xs font-sans font-semibold text-[var(--ink)] mb-1.5 tracking-wide uppercase";

export function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      customerName: "",
      email: "",
      phone: "",
      eventType: "",
      eventDate: "",
      location: "",
      budget: "",
      message: "",
    },
  });

  const selectedBudget = watch("budget");

  const onSubmit = async (data: ReservationFormData) => {
    setFirebaseError("");
    try {
      await createReservation({
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        eventType: data.eventType,
        eventDate: data.eventDate,
        guestCount: data.guestCount ? parseInt(data.guestCount, 10) : undefined,
        location: data.location,
        budget: data.budget,
        message: data.message,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setFirebaseError("Gönderme sırasında bir hata oluştu. Lütfen tekrar deneyin veya bizi arayın.");
    }
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Row 1: name + phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      Ad Soyad <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Adınız Soyadınız"
                      className={errors.customerName ? inputErrorClass : inputClass}
                      {...register("customerName")}
                    />
                    {errors.customerName && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.customerName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>
                      Telefon <span className="text-[var(--accent)]">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+90 5__ ___ __ __"
                      className={errors.phone ? inputErrorClass : inputClass}
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className={labelClass}>
                    E-posta <span className="text-[var(--accent)]">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="ornek@email.com"
                    className={errors.email ? inputErrorClass : inputClass}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Event type + date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>
                      Etkinlik Türü <span className="text-[var(--accent)]">*</span>
                    </label>
                    <select
                      className={`${errors.eventType ? inputErrorClass : inputClass} appearance-none`}
                      {...register("eventType")}
                    >
                      <option value="">Seçiniz</option>
                      {eventTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    {errors.eventType && (
                      <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.eventType.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className={labelClass}>Etkinlik Tarihi</label>
                    <input
                      type="date"
                      className={inputClass}
                      {...register("eventDate")}
                    />
                  </div>
                </div>

                {/* Guest count + location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Tahmini Kişi Sayısı</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="50"
                      className={inputClass}
                      {...register("guestCount")}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Etkinlik Yeri / Şehir</label>
                    <input
                      type="text"
                      placeholder="İstanbul, Bağcılar..."
                      className={inputClass}
                      {...register("location")}
                    />
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className={labelClass}>Bütçe Aralığı</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {budgetRanges.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setValue("budget", selectedBudget === b ? "" : b)}
                        className={`px-3 py-2.5 rounded border text-xs font-sans text-left transition-all duration-150 ${
                          selectedBudget === b
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
                  <label className={labelClass}>Mesajınız / Notlar</label>
                  <textarea
                    rows={4}
                    placeholder="Etkinliğiniz hakkında bilgi verin, beklentilerinizi paylaşın..."
                    className={`w-full px-4 py-3 rounded border ${
                      errors.message ? "border-red-400" : "border-[var(--border)]"
                    } bg-[var(--white)] text-[var(--ink)] text-sm font-sans placeholder:text-[var(--muted)] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-colors resize-none`}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message.message}
                    </p>
                  )}
                </div>

                {firebaseError && (
                  <div className="flex items-start gap-2 p-3 rounded border border-red-200 bg-red-50 text-sm text-red-700">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    {firebaseError}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isSubmitting}
                  className="w-full sm:w-auto"
                >
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
