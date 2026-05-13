"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

export function LocaleSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const locale = (params?.locale as string) ?? "tr";
  const target = locale === "tr" ? "en" : "tr";

  // localePrefix: 'as-needed' — TR has no prefix, EN has /en prefix
  const newPath = locale === "tr"
    ? `/en${pathname}`
    : pathname.replace(/^\/en/, "") || "/";

  return (
    <Link
      href={newPath}
      className="text-xs font-sans font-semibold tracking-widest uppercase border border-[var(--accent)]/40 text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--surface-dark)] px-2.5 py-1 rounded transition-all duration-200"
      aria-label={`Switch to ${target === "tr" ? "Turkish" : "English"}`}
    >
      {target.toUpperCase()}
    </Link>
  );
}
