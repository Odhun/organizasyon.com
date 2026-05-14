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
| Firebase | ^12 | ✓ Auth + Firestore + Storage |
| next-intl | ^4 | ✓ TR/EN routing |
| react-hook-form + Zod | ✓ | Form validation |
| UI/UX Pro Max (uipro-cli) | 2.2.3 | ✓ proje `.claude/skills/ui-ux-pro-max/`'a kuruldu |

## Klasör Yapısı

- `src/app/` — App Router sayfaları
- `src/app/[locale]/` — TR/EN locale routing (generateStaticParams ile)
- `src/app/admin/` — Admin panel (Firebase Auth korumalı)
- `src/components/` — yeniden kullanılan bileşenler
- `src/lib/firebase/` — Firebase CRUD servisleri
- `src/i18n/` — next-intl config
- `public/` — statik varlıklar
- `.claude/skills/ui-ux-pro-max/` — proje-yerel UI/UX Pro Max skill'i

## Önemli Mimari Notlar

### Static Export + next-intl
`output: "export"` kullanılıyor → **middleware ÇALIŞMAZ**. Locale routing şöyle çalışır:
- Root `app/page.tsx` → client-side redirect `/tr`'ye
- `[locale]/layout.tsx` → `generateStaticParams()` ile TR/EN HTML build-time üretilir
- `src/proxy.ts` → dead code. Next.js 16'da `proxy.ts` yoktur, doğru isim `middleware.ts`'tir. Ama static export'da middleware irrelevant olduğu için site çalışır. SSR'a geçilirse `middleware.ts` olarak yeniden adlandırılmalı ve `export function middleware()` olarak export edilmeli.

### Form Gönderimi
Server action YOK. QuotePage → Firebase Firestore'a doğrudan yazar (client-side). ContactPage → sadece iletişim bilgileri + harita, form yok.

### `html lang` Sınırlaması
Root `app/layout.tsx` `lang="tr"` hardcoded. Static export'da root layout locale params'a erişemez. `/en/` sayfaları da `lang="tr"` olarak render edilir. Hreflang `alternates.languages` metadata ile kompanse edilmiştir.

## Yol Haritası

### Faz 0 — Kurulum  ✅
- [x] Next.js + TS + Tailwind iskeleti
- [x] Framer Motion
- [x] UI/UX Pro Max
- ~~21st.dev Magic MCP~~ — iptal
- ~~Graphify~~ — iptal

### Faz 1 — Tasarım kararları  ✅
- [x] **Etkinlik türleri:** Düğün/Nişan/Kına, Doğum Günü/Baby Shower, Kurumsal/Açılış, Mezuniyet/Sünnet
- [x] **Ton:** Lüks & zarif — altın, krem, koyu yeşil (Playfair Display + Inter)
- [x] **Sayfalar:** Anasayfa, Hizmetler, Galeri, Hakkımızda, Yorumlar, İletişim, Teklif, Admin Panel
- [x] Renk paleti — 4 tema: gold-classic, rose-elegant, emerald-luxe, midnight-gold (globals.css CSS vars)
- [x] Font çiftleri — Playfair Display (serif) + Inter (sans)
- [x] Çoklu dil TR/EN — next-intl ile implemente edildi

### Faz 2 — Geliştirme  ✅ (büyük ölçüde tamamlandı)
- [x] Tasarım sistemi (CSS vars, 4 tema, Tailwind v4)
- [x] Header + Footer — animasyonlu nav
- [x] Anasayfa: Hero + Stats + ServicesPreview + GalleryStrip + Testimonials + CTA
- [x] Hizmetler sayfası + `[slug]` detay
- [x] Galeri sayfası
- [x] Teklif/Rezervasyon formu (Firebase'e kaydeder)
- [x] Admin panel (dashboard, rezervasyonlar, yorumlar, galeri, hizmetler, ayarlar)
- [x] SEO meta + hreflang alternates — tüm sayfalara eklendi
- [x] sitemap.xml — `src/app/sitemap.ts`
- [x] robots.txt — `src/app/robots.ts`
- [ ] **OG image** — `public/og-image.png` eklenmeli (1200×630 px)
- [ ] Responsive testleri (mobile-first)
- [ ] Lighthouse skoru ≥ 90

### Faz 3 — Yayın  🔄
- [x] Production build + Vercel deploy — https://odhun-organizasyon.vercel.app
- [ ] Custom domain bağlantısı — `metadataBase` ve sitemap URL'leri güncellenmeli
- [ ] Analytics (Vercel Analytics veya Plausible)
- [ ] **Gerçek iletişim bilgileri** — placeholder telefon `+90 532 123 45 67` değiştirilmeli

## Çalışma Notları

- **Framer Motion** kullanan tüm bileşenler dosyanın başına `'use client'` koymalı.
- **Tailwind v4** — `@import "tailwindcss";` syntax'ı, eski `@tailwind` direktifleri değil.
- **Next.js 16** App Router'da `params` ve `searchParams` artık async — `await` gerekiyor.
- **Custom domain alındığında:** `src/app/layout.tsx` içindeki `metadataBase`, `src/app/sitemap.ts` ve `src/app/robots.ts` içindeki URL'ler güncellenecek.
- UI/UX Pro Max stilleri için: *"hangi tasarım stillerini biliyorsun?"*
