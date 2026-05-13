"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function TwitterXIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const MAPS_FALLBACK = "https://maps.google.com/maps?q=Devlet+Bah%C3%A7eli+Park%C4%B1,+Anamur,+Mersin&output=embed&z=16";

export function Footer() {
  const t = useTranslations("footer");
  const params = useParams();
  const locale = (params?.locale as string) ?? "tr";
  const settings = useSiteSettings();

  const phone = settings?.contact?.phone ?? "+90 532 123 45 67";
  const email = settings?.contact?.email ?? "info@odhunorganizasyon.com";
  const address = (locale === "en" ? settings?.contact?.address?.en : settings?.contact?.address?.tr) ?? "Anamur, Mersin";
  const mapsEmbedUrl = settings?.contact?.mapsEmbedUrl || MAPS_FALLBACK;
  const instagram = settings?.social?.instagram;
  const facebook = settings?.social?.facebook;
  const youtube = settings?.social?.youtube;
  const twitter = settings?.social?.twitter;

  const hasSocial = instagram || facebook || youtube || twitter;
  const showFallback = !hasSocial;

  const socialLinkClass = "w-9 h-9 rounded flex items-center justify-center bg-white/5 hover:bg-[var(--accent)] hover:text-[var(--surface-dark)] transition-all text-white/60";

  const services = [
    { label: t("serviceLinks.wedding"), href: `/${locale}/hizmetler/dugun-nisan-kina` },
    { label: t("serviceLinks.birthday"), href: `/${locale}/hizmetler/dogum-gunu-baby-shower` },
    { label: t("serviceLinks.corporate"), href: `/${locale}/hizmetler/kurumsal-etkinlikler` },
    { label: t("serviceLinks.graduation"), href: `/${locale}/hizmetler/mezuniyet-sunnet` },
  ];

  const quickLinks = [
    { label: t("quickLinkItems.about"), href: `/${locale}/hakkimizda` },
    { label: t("quickLinkItems.gallery"), href: `/${locale}/galeri` },
    { label: t("quickLinkItems.testimonials"), href: `/${locale}/yorumlar` },
    { label: t("quickLinkItems.contact"), href: `/${locale}/iletisim` },
    { label: t("quickLinkItems.quote"), href: `/${locale}/teklif` },
  ];

  return (
    <footer className="bg-[var(--surface-dark)] text-white">
      <Container size="xl">
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Marka */}
          <div className="lg:col-span-1">
            <p className="font-serif text-2xl font-semibold text-[var(--accent)]">Odhun</p>
            <p className="text-sm text-white/50 tracking-widest uppercase mt-0.5 mb-4">{t("tagline")}</p>
            <p className="text-sm text-white/60 leading-relaxed">{t("description")}</p>

            {/* Social icons */}
            <div className="mt-4 mb-1">
              <p className="text-[10px] font-sans font-semibold tracking-widest uppercase text-[var(--accent)] mb-2">{t("socialTitle")}</p>
              <div className="flex gap-2 flex-wrap">
                {showFallback ? (
                  <>
                    <a href="#" aria-label="Instagram" className={socialLinkClass}><InstagramIcon className="w-4 h-4" /></a>
                    <a href="#" aria-label="Facebook" className={socialLinkClass}><FacebookIcon className="w-4 h-4" /></a>
                    <a href="#" aria-label="YouTube" className={socialLinkClass}><YoutubeIcon className="w-4 h-4" /></a>
                  </>
                ) : (
                  <>
                    {instagram && <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={socialLinkClass}><InstagramIcon className="w-4 h-4" /></a>}
                    {facebook && <a href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={socialLinkClass}><FacebookIcon className="w-4 h-4" /></a>}
                    {youtube && <a href={youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={socialLinkClass}><YoutubeIcon className="w-4 h-4" /></a>}
                    {twitter && <a href={twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className={socialLinkClass}><TwitterXIcon className="w-3.5 h-3.5" /></a>}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Hizmetler */}
          <div>
            <h3 className="text-xs font-sans font-semibold tracking-widest uppercase text-[var(--accent)] mb-4">
              {t("services")}
            </h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm text-white/60 hover:text-[var(--accent)] transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-xs font-sans font-semibold tracking-widest uppercase text-[var(--accent)] mb-4">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-[var(--accent)] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim + mini harita */}
          <div>
            <h3 className="text-xs font-sans font-semibold tracking-widest uppercase text-[var(--accent)] mb-4">
              {t("contact")}
            </h3>
            <ul className="space-y-3 mb-4">
              <li>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-start gap-2.5 text-sm text-white/60 hover:text-[var(--accent)] transition-colors">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="flex items-start gap-2.5 text-sm text-white/60 hover:text-[var(--accent)] transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-sm text-white/60">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{address}</span>
                </div>
              </li>
            </ul>

            {/* Mini harita */}
            <div className="rounded-lg overflow-hidden border border-white/10 aspect-[4/3] w-full relative">
              <iframe
                src={mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Konum haritası"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <GoldDivider />

        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30 font-sans">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Odhun Organizasyon — {t("rights")}</p>
            <span className="hidden sm:inline text-white/10">·</span>
            <p>
              {t("madeBy")}{" "}
              <a
                href="https://odhun.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)]/60 hover:text-[var(--accent)] transition-colors"
              >
                OdhunSoft
              </a>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/${locale}/kvkk`} className="hover:text-[var(--accent)] transition-colors">{t("kvkk")}</Link>
            <span className="text-white/10">·</span>
            <Link href={`/${locale}/cerez-politikasi`} className="hover:text-[var(--accent)] transition-colors">{t("cookiePolicy")}</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
