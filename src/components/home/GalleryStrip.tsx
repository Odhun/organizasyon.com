import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { GoldDivider } from "@/components/ui/GoldDivider";

const mockGallery = [
  { id: "1", category: "Düğün", gradient: "from-rose-200 to-rose-400" },
  { id: "2", category: "Kurumsal", gradient: "from-sky-200 to-sky-400" },
  { id: "3", category: "Doğum Günü", gradient: "from-amber-200 to-amber-400" },
  { id: "4", category: "Nişan", gradient: "from-pink-200 to-pink-400" },
  { id: "5", category: "Sünnet", gradient: "from-emerald-200 to-emerald-400" },
  { id: "6", category: "Mezuniyet", gradient: "from-violet-200 to-violet-400" },
];

export function GalleryStrip() {
  return (
    <Section bg="alt" id="galeri">
      <FadeIn className="text-center mb-4">
        <p className="text-xs font-sans tracking-[0.25em] uppercase text-[var(--accent)] mb-3">
          Galeri
        </p>
        <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[var(--ink)]">
          Gerçekleştirdiğimiz
          <br />
          <span className="text-[var(--surface-dark)]">Özel Anlar</span>
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <GoldDivider className="max-w-xs mx-auto mb-12" />
      </FadeIn>

      <Stagger className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {mockGallery.map((item) => (
          <StaggerItem key={item.id}>
            <Link href="/galeri" className="group block relative overflow-hidden rounded-lg aspect-[4/3]">
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60`} />
              <div className="absolute inset-0 bg-[var(--surface-dark)]/30 group-hover:bg-[var(--surface-dark)]/50 transition-all duration-300" />
              <div className="absolute inset-0 flex items-end p-4">
                <span className="text-white text-sm font-sans font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  {item.category}
                </span>
              </div>
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-lg" />
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      <FadeIn delay={0.3} className="text-center mt-10">
        <Link
          href="/galeri"
          className="inline-flex items-center gap-2 text-sm font-sans text-[var(--accent)] hover:text-[var(--surface-dark)] transition-colors border-b border-[var(--accent)]/40 hover:border-[var(--surface-dark)]/40 pb-0.5"
        >
          Tüm galeriyi görüntüle <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </FadeIn>
    </Section>
  );
}
