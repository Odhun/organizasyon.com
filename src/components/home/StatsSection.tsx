import { Section } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const stats = [
  { number: "500+", label: "Başarılı Etkinlik" },
  { number: "15+", label: "Yıl Deneyim" },
  { number: "4", label: "Etkinlik Kategorisi" },
  { number: "98%", label: "Müşteri Memnuniyeti" },
];

export function StatsSection() {
  return (
    <Section bg="alt" className="py-12 md:py-14">
      <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <StaggerItem key={s.label}>
            <p className="font-serif text-4xl md:text-5xl font-semibold text-[var(--accent)]">
              {s.number}
            </p>
            <p className="text-sm text-[var(--muted)] mt-1 font-sans tracking-wide">
              {s.label}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
