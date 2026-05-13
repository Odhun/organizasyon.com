"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Camera, Users, Video } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { GoldDivider } from "@/components/ui/GoldDivider";

export function Footer() {
  const t = useTranslations("footer");
  const params = useParams();
  const locale = (params?.locale as string) ?? "tr";

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
            <div className="flex gap-3 mt-5">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded flex items-center justify-center bg-white/5 hover:bg-[var(--accent)] hover:text-[var(--surface-dark)] transition-all text-white/60">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded flex items-center justify-center bg-white/5 hover:bg-[var(--accent)] hover:text-[var(--surface-dark)] transition-all text-white/60">
                <Users className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Youtube" className="w-9 h-9 rounded flex items-center justify-center bg-white/5 hover:bg-[var(--accent)] hover:text-[var(--surface-dark)] transition-all text-white/60">
                <Video className="w-4 h-4" />
              </a>
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

          {/* İletişim */}
          <div>
            <h3 className="text-xs font-sans font-semibold tracking-widest uppercase text-[var(--accent)] mb-4">
              {t("contact")}
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+905321234567" className="flex items-start gap-2.5 text-sm text-white/60 hover:text-[var(--accent)] transition-colors">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>+90 532 123 45 67</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@odhunorganizasyon.com" className="flex items-start gap-2.5 text-sm text-white/60 hover:text-[var(--accent)] transition-colors">
                  <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>info@odhunorganizasyon.com</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-sm text-white/60">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>Bağcılar Cad. No:42, İstanbul</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <GoldDivider />

        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30 font-sans">
          <p>© {new Date().getFullYear()} Odhun Organizasyon. {t("rights")}</p>
          <p>{t("taglineBottom")}</p>
        </div>
      </Container>
    </footer>
  );
}
