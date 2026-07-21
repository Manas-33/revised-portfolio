"use client";

import { useEffect, useState } from "react";

type NavItem = { id: string; label: string };

export function SectionNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-0 z-10 flex overflow-x-auto border-y border-rule bg-page/90 backdrop-blur md:grid md:grid-flow-col md:auto-cols-fr md:overflow-visible"
    >
      {items.map((item, i) => {
        const isActive = active === item.id;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={isActive ? "true" : undefined}
            className={`flex flex-none flex-col gap-3 whitespace-nowrap px-2 py-4 text-[14px] transition-colors ${
              isActive
                ? "bg-fill text-ink"
                : "text-muted hover:bg-fill hover:text-ink"
            }`}
          >
            <span
              aria-hidden
              className="invisible font-mono text-[12px] leading-none text-faint"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
