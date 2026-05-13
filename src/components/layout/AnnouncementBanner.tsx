"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useParams } from "next/navigation";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

const styleMap: Record<string, string> = {
  gold: "bg-[var(--accent)] text-[var(--surface-dark)]",
  forest: "bg-emerald-800 text-white",
  ink: "bg-[var(--surface-dark)] text-white border-b border-white/10",
};

export function AnnouncementBanner() {
  const settings = useSiteSettings();
  const params = useParams();
  const locale = (params?.locale as string) ?? "tr";
  const [dismissed, setDismissed] = useState(false);

  const ann = settings?.announcement;
  if (!ann?.enabled || dismissed) return null;

  const text = locale === "en" ? ann.text.en : ann.text.tr;
  const colorClass = styleMap[ann.style] ?? styleMap.gold;

  return (
    <div className={`relative z-50 py-2 px-10 text-center text-sm font-sans ${colorClass}`}>
      {ann.link ? (
        <a href={ann.link} className="hover:underline font-medium">
          {text}
        </a>
      ) : (
        <span>{text}</span>
      )}
      {ann.dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Kapat"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
