import { cn } from "@/lib/utils/cn";

export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3 my-4", className)}>
      <div className="h-px flex-1 bg-[var(--border)]" />
      <div className="w-1.5 h-1.5 rotate-45 bg-[var(--accent)]" />
      <div className="h-px flex-1 bg-[var(--border)]" />
    </div>
  );
}
