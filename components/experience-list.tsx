"use client";

import { useState } from "react";
import type { Experience } from "@/lib/portfolio";

export function ExperienceList({ items }: { items: Experience[] }) {
  return (
    <ol className="flex flex-col">
      {items.map((e) => (
        <ExperienceItem
          key={`${e.company}-${e.dates}`}
          item={e}
          defaultOpen={!!e.current}
        />
      ))}
    </ol>
  );
}

function ExperienceItem({
  item,
  defaultOpen,
}: {
  item: Experience;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <li className="relative border-l border-rule pb-5 pl-6 last:pb-0">
      <span
        aria-hidden
        className="absolute left-0 top-[13px] h-[7px] w-[7px] -translate-x-1/2 rounded-full border border-muted bg-page"
      />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group -mx-2.5 flex w-full flex-col gap-0.5 rounded-md px-2.5 py-1.5 text-left transition-colors hover:bg-fill sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
      >
        <span className="text-[18px] leading-snug text-ink">
          {item.role}
          <span className="text-muted"> · {item.company}</span>
        </span>
        <span className="flex shrink-0 items-baseline gap-2.5">
          <span className="text-[14px] tabular-nums text-faint">
            {item.dates}
          </span>
          <span
            aria-hidden
            className="w-3 text-center text-[17px] leading-none text-faint transition-colors group-hover:text-ink"
          >
            {open ? "−" : "+"}
          </span>
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-2">
            <div className="text-[15px] text-faint">{item.location}</div>
            <ul className="mt-2 flex flex-col gap-1.5">
              {item.highlights.map((h) => (
                <li
                  key={h}
                  className="relative pl-4 text-[16px] leading-relaxed text-muted before:absolute before:left-0 before:top-[0.72em] before:h-[3px] before:w-[3px] before:-translate-y-1/2 before:rounded-full before:bg-faint before:content-['']"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </li>
  );
}
