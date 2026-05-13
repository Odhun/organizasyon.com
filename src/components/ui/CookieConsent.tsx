"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const STORAGE_KEY = "odhun_cookie_consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const params = useParams();
  const locale = (params?.locale as string) ?? "tr";

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(t);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-[var(--surface-dark)] border border-white/10 rounded-xl shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-sans font-medium text-white mb-1">
            {locale === "en" ? "Cookie Notice" : "Çerez Bildirimi"}
          </p>
          <p className="text-xs text-white/50 leading-relaxed">
            {locale === "en"
              ? "We use cookies to improve your experience. By continuing, you accept our "
              : "Deneyiminizi iyileştirmek için çerez kullanıyoruz. Devam ederek "}
            <Link
              href={`/${locale}/cerez-politikasi`}
              className="text-[var(--accent)] hover:underline"
            >
              {locale === "en" ? "cookie policy" : "çerez politikamızı"}
            </Link>
            {locale === "en" ? " and " : " ve "}
            <Link href={`/${locale}/kvkk`} className="text-[var(--accent)] hover:underline">
              {locale === "en" ? "privacy notice" : "KVKK aydınlatma metnini"}
            </Link>
            {locale === "en" ? " accepted." : " kabul etmiş olursunuz."}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="text-xs font-sans text-white/40 hover:text-white/70 transition-colors px-3 py-2"
          >
            {locale === "en" ? "Decline" : "Reddet"}
          </button>
          <button
            onClick={accept}
            className="text-xs font-sans font-semibold bg-[var(--accent)] hover:bg-[var(--accent-soft)] text-[var(--surface-dark)] px-4 py-2 rounded-lg transition-colors"
          >
            {locale === "en" ? "Accept" : "Kabul Et"}
          </button>
        </div>
      </div>
    </div>
  );
}
