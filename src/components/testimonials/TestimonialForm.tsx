"use client";

import { useState } from "react";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { createTestimonial } from "@/lib/firebase/testimonials";
import { Button } from "@/components/ui/Button";

const EVENT_TYPES = [
  "Düğün Organizasyonu",
  "Nişan Töreni",
  "Kına Gecesi",
  "Doğum Günü",
  "Baby Shower",
  "Kurumsal Etkinlik",
  "Mezuniyet Töreni",
  "Sünnet Organizasyonu",
  "Diğer",
];

export function TestimonialForm() {
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState("");
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5 | 0>(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !eventType || rating === 0 || !comment.trim()) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await createTestimonial({
        customerName: name.trim(),
        eventType,
        rating: rating as 1 | 2 | 3 | 4 | 5,
        comment: { tr: comment.trim() },
        approved: false,
      });
      setSuccess(true);
    } catch {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="text-center py-10">
        <CheckCircle2 className="w-12 h-12 text-[var(--accent)] mx-auto mb-4" />
        <p className="font-serif text-xl font-semibold text-[var(--ink)] mb-2">
          Yorumunuz Alındı!
        </p>
        <p className="text-sm text-[var(--muted)] max-w-sm mx-auto">
          İnceleme sürecinden sonra yorum sayfasında yayınlanacak. Teşekkürler!
        </p>
      </div>
    );
  }

  const displayRating = hovered || rating;

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg mx-auto">
      {/* Ad Soyad */}
      <div>
        <label className="block text-xs font-sans font-semibold tracking-wide text-[var(--ink-light)] mb-1.5">
          Ad Soyad <span className="text-[var(--accent)]">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Adınız Soyadınız"
          className="w-full px-4 py-2.5 rounded border border-[var(--border)] bg-[var(--white)] text-[var(--ink)] text-sm font-sans placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]/60 transition-all"
        />
      </div>

      {/* Etkinlik Türü */}
      <div>
        <label className="block text-xs font-sans font-semibold tracking-wide text-[var(--ink-light)] mb-1.5">
          Etkinlik Türü <span className="text-[var(--accent)]">*</span>
        </label>
        <select
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          className="w-full px-4 py-2.5 rounded border border-[var(--border)] bg-[var(--white)] text-[var(--ink)] text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]/60 transition-all"
        >
          <option value="">Seçiniz</option>
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Puan */}
      <div>
        <label className="block text-xs font-sans font-semibold tracking-wide text-[var(--ink-light)] mb-2">
          Puanınız <span className="text-[var(--accent)]">*</span>
        </label>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n as 1 | 2 | 3 | 4 | 5)}
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(0)}
              className="transition-transform hover:scale-110"
              aria-label={`${n} yıldız`}
            >
              <Star
                className={`w-7 h-7 transition-colors ${
                  n <= displayRating
                    ? "fill-[var(--accent)] text-[var(--accent)]"
                    : "text-[var(--border)]"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Yorum */}
      <div>
        <label className="block text-xs font-sans font-semibold tracking-wide text-[var(--ink-light)] mb-1.5">
          Yorumunuz <span className="text-[var(--accent)]">*</span>
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Deneyiminizi paylaşın..."
          rows={4}
          className="w-full px-4 py-2.5 rounded border border-[var(--border)] bg-[var(--white)] text-[var(--ink)] text-sm font-sans placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:border-[var(--accent)]/60 transition-all resize-none"
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 font-sans">{error}</p>
      )}

      <Button
        type="submit"
        variant="primary"
        size="md"
        className="w-full"
        disabled={loading}
      >
        {loading ? "Gönderiliyor..." : (
          <>
            Yorum Gönder <Send className="w-4 h-4" />
          </>
        )}
      </Button>

      <p className="text-xs text-[var(--muted)] text-center font-sans">
        Yorumunuz inceleme sonrası yayınlanır.
      </p>
    </form>
  );
}
