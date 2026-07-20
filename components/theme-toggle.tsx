"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-muted transition-colors hover:text-ink"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-300"
        style={{ transform: isDark ? "rotate(180deg)" : "rotate(0deg)" }}
      >
        <circle cx="7.5" cy="7.5" r="6.75" stroke="currentColor" strokeWidth="1.2" />
        <path d="M7.5 0.75 A6.75 6.75 0 0 1 7.5 14.25 Z" fill="currentColor" />
      </svg>
    </button>
  );
}
