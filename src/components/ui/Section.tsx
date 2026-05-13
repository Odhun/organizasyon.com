import { cn } from "@/lib/utils/cn";
import { Container } from "./Container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  bg?: "default" | "alt" | "dark" | "dark2";
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  id?: string;
}

export function Section({
  children,
  className,
  bg = "default",
  containerSize = "lg",
  id,
}: SectionProps) {
  const bgs = {
    default: "bg-[var(--bg)]",
    alt:     "bg-[var(--bg-alt)]",
    dark:    "bg-[var(--surface-dark)] text-[var(--white)]",
    dark2:   "bg-[var(--surface-dark2)] text-[var(--white)]",
  };

  return (
    <section id={id} className={cn("py-16 md:py-24", bgs[bg], className)}>
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
