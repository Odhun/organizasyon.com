"use client";

import dynamic from "next/dynamic";

const QuotePage = dynamic(
  () => import("./QuotePage").then((m) => ({ default: m.QuotePage })),
  { ssr: false }
);

export function QuotePageClient() {
  return <QuotePage />;
}
