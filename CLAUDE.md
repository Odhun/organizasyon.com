# Odhun Organizasyon — Proje Haritası

Yerel bir etkinlik organizasyonu mağazası için tasarım odaklı, animasyonlu web sitesi.

> Ayrıca [AGENTS.md](AGENTS.md) okunmalı — Next.js'in bu sürümü eğitim verisinden farklı olabilir; API ve konvansiyon değişiklikleri için `node_modules/next/dist/docs/` kaynağına bakılmalı.

## Teknoloji Yığını

| Paket | Sürüm | Durum |
|---|---|---|
| Next.js | 16.2.6 (App Router) | ✓ |
| React | 19.2.4 | ✓ |
| TypeScript | ^5 | ✓ |
| Tailwind CSS | ^4 | ✓ |
| Framer Motion | ^12.38.0 | ✓ |
| UI/UX Pro Max (uipro-cli) | 2.2.3 | ✓ proje `.claude/skills/ui-ux-pro-max/`'a kuruldu |
| 21st.dev Magic | — | ⏸ API anahtarı bekleniyor |
| Graphify | — | ⏸ Python 3.10+ kurulduğunda |

## Klasör Yapısı

- `src/app/` — App Router sayfaları
- `src/components/` — yeniden kullanılan bileşenler (henüz yok, oluşturulacak)
- `public/` — statik varlıklar
- `.claude/skills/ui-ux-pro-max/` — proje-yerel UI/UX Pro Max skill'i

## Yol Haritası

### Faz 0 — Kurulum  ✅
- [x] Next.js + TS + Tailwind iskeleti
- [x] Framer Motion
- [x] UI/UX Pro Max
- [x] `website-builder-setup` skill (`~/.claude/skills/`)
- [ ] 21st.dev Magic MCP — API key alınınca `~/.claude.json`'a şu eklenecek:
  ```json
  "21st-dev-magic": {
    "command": "npx",
    "args": ["-y", "@21st-dev/magic@latest"],
    "env": { "API_KEY": "BURAYA_KEY" }
  }
  ```
- [ ] Graphify — `brew install python@3.12 pipx && pipx install graphifyy && graphify install`

### Faz 1 — Tasarım kararları  ✅
- [x] **Etkinlik türleri:** Düğün/Nişan/Kına, Doğum Günü/Baby Shower, Kurumsal/Açılış, Mezuniyet/Sünnet — yani tüm kategoriler
- [x] **Ton:** Lüks & zarif — altın, krem, koyu yeşil, serif fontlar; yumuşak/yavaş animasyonlar
- [x] **Sayfalar:** Anasayfa, Hizmetler, Galeri, Hakkımızda, Müşteri Yorumları, İletişim, Online Teklif/Rezervasyon Formu, **kapsamlı Admin Panel**
- [ ] Renk paleti tam tonları + font çiftleri (UI/UX Pro Max ile birlikte seçilecek)
- [ ] Hizmet kategorileri listesi (organizasyon, dekorasyon, ekipman, catering, foto/video, müzik …)
- [ ] Admin panel kapsamı netleşecek (Faz 1.5)
- [ ] Çoklu dil (TR/EN) gerekli mi?

### Faz 2 — Geliştirme
- [ ] Tasarım sistemi (renkler, tipografi, spacing) Tailwind config'e işlensin
- [ ] Ortak layout (Header + Footer) — animasyonlu nav
- [ ] Anasayfa: hero + animasyonlu vitrin + hizmet kartları + galeri preview + CTA
- [ ] Hizmetler sayfası
- [ ] Galeri (yapılan etkinlikler — lightbox?)
- [ ] İletişim formu (server action veya 3. parti — Resend/Formspree)
- [ ] Responsive testleri (mobile-first)
- [ ] SEO meta'ları + Open Graph görselleri
- [ ] Lighthouse skoru ≥ 90

### Faz 3 — Yayın
- [ ] Production build (`npm run build`)
- [ ] Hosting (Vercel önerilen — Next.js'in kendi şirketi)
- [ ] Domain bağlantısı
- [ ] Analytics (Vercel Analytics veya Plausible)

## Çalışma Notları

- **Framer Motion** kullanan tüm bileşenler dosyanın başına `'use client'` koymalı (RSC uyumluluğu).
- **Tailwind v4** yeni — `@import "tailwindcss";` syntax'ı kullanılıyor, eski `@tailwind base/components/utilities` değil.
- **Next.js 16** App Router'da `params` ve `searchParams` artık async — `await` gerekiyor.
- UI/UX Pro Max'in 50+ tasarım stilini görmek için Claude'a şöyle sorulabilir: *"hangi tasarım stillerini biliyorsun?"* veya *"şu hizmet için UI/UX Pro Max'ten 3 farklı stil öner"*.
