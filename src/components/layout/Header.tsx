"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Container } from "@/components/ui/Container";

const navLinks = [
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/galeri", label: "Galeri" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/yorumlar", label: "Yorumlar" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[var(--surface-dark)]/95 backdrop-blur-sm shadow-lg"
          : "bg-[var(--surface-dark)]"
      )}
    >
      <Container size="xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-xl md:text-2xl font-semibold text-[var(--accent)] tracking-wide group-hover:text-[var(--accent-soft)] transition-colors">
              Odhun
            </span>
            <span className="text-xs md:text-sm text-white/60 tracking-widest uppercase font-sans pt-0.5 hidden sm:block">
              Organizasyon
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-[var(--accent)] text-sm font-sans tracking-wide transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* CTA + Burger */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+905321234567"
              className="hidden md:flex items-center gap-1.5 text-[var(--accent)] text-sm font-sans hover:text-[var(--accent-soft)] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+90 532 123 45 67</span>
            </a>
            <Link
              href="/teklif"
              className="hidden md:inline-flex items-center h-9 px-5 bg-[var(--accent)] text-[var(--surface-dark)] text-sm font-medium rounded hover:bg-[var(--accent-soft)] transition-colors"
            >
              Teklif Al
            </Link>
            <button
              className="md:hidden text-white p-1"
              onClick={() => setOpen(!open)}
              aria-label="Menü"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden bg-[var(--surface-dark)] border-t border-white/10 py-4">
          <Container>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 px-2 text-white/80 hover:text-[var(--accent)] text-sm font-sans transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/teklif"
                onClick={() => setOpen(false)}
                className="mt-3 flex items-center justify-center h-10 bg-[var(--accent)] text-[var(--surface-dark)] text-sm font-medium rounded"
              >
                Teklif Al
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
