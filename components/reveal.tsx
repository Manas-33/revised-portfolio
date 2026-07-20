"use client";

import { useEffect } from "react";

/**
 * Observes all [data-reveal] elements and adds .in as they enter the viewport.
 * Mount once per page. Elements above the fold get a small stagger.
 */
export function RevealObserver() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    let initial = 0;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const delay = initial < 6 ? initial * 70 : 0;
            initial++;
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add("in");
            io.unobserve(el);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
