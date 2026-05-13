"use client";

import { cn } from "@/lib/utils/cn";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  asChild?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-[var(--accent)] text-[var(--surface-dark)] hover:bg-[var(--accent-soft)] shadow-sm hover:shadow",
    outline:
      "border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-light)]",
    ghost:
      "text-[var(--ink)] hover:bg-[var(--bg-alt)]",
    dark:
      "bg-[var(--surface-dark)] text-[var(--accent)] hover:bg-[var(--surface-dark2)]",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm rounded",
    md: "h-11 px-6 text-base rounded",
    lg: "h-13 px-8 text-lg rounded",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
