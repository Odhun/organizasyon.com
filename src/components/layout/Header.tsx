"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { cn } from "@/lib/utils/cn";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const params = useParams();
  const locale = (params?.locale as string) ?? "tr";

  const settings = useSiteSettings();
  const phone = settings?.contact?.phone ?? "+90 532 123 45 67";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: t("services"), href: `/${locale}/hizmetler` },
    { label: t("gallery"), href: `/${locale}/galeri` },
    { label: t("about"), href: `/${locale}/hakkimizda` },
    { label: t("testimonials"), href: `/${locale}/yorumlar` },
    { label: t("contact"), href: `/${locale}/iletisim` },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        scrolled
          ? "bg-[var(--surface-dark)]/96 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.2)]"
          : "bg-[var(--surface-dark)]"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex flex-col leading-none group">
            <span className="font-serif text-xl font-semibold text-[var(--accent)] group-hover:text-[var(--accent-soft)] transition-colors">
              Odhun
            </span>
            <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-white/40 mt-[-2px]">
              Organizasyon
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3.5 py-2 text-[13px] font-sans font-light tracking-wide text-white/60 hover:text-[var(--accent)] transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-1 left-3.5 right-3.5 h-px bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 text-xs font-sans text-white/50 hover:text-[var(--accent)] transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>{phone}</span>
            </a>
            <LocaleSwitcher />
            <Link href={`/${locale}/teklif`}>
              <Button variant="primary" size="sm">{tc("getQuote")}</Button>
            </Link>
          </div>

          {/* Mobile right */}
          <div className="flex md:hidden items-center gap-2">
            <LocaleSwitcher />
            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 flex items-center justify-center rounded text-white/70 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Menü"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[var(--surface-dark)] border-t border-white/10">
          <nav className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 rounded text-sm font-sans text-white/70 hover:text-[var(--accent)] hover:bg-white/5 transition-all"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 pb-1 border-t border-white/10 flex flex-col gap-2">
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2 px-3 py-2 text-sm text-white/50">
                <Phone className="w-4 h-4" /> {phone}
              </a>
              <Link href={`/${locale}/teklif`} onClick={() => setOpen(false)}>
                <Button variant="primary" size="sm" className="w-full">{tc("getQuote")}</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
