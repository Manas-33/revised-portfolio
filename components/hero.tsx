import { Mark } from "./mark";
import type { TaglineSegment } from "@/lib/portfolio";

export function Hero({
  name,
  tagline,
}: {
  name: string;
  tagline: TaglineSegment[];
}) {
  return (
    <header className="pt-16 md:pt-24">
      <Mark className="mb-10" />
      <h1 className="text-[clamp(3rem,8vw,6rem)] font-light leading-[0.92] tracking-[-0.055em] text-ink">
        {name}
      </h1>
      <p className="mt-8 max-w-[48ch] text-[19px] leading-[1.6] text-muted">
        {tagline.map((seg, i) =>
          seg.href ? (
            <a
              key={i}
              href={seg.href}
              className="text-ink underline decoration-rule underline-offset-4 transition-colors hover:decoration-muted"
            >
              {seg.t}
            </a>
          ) : seg.strong ? (
            <span key={i} className="text-ink">
              {seg.t}
            </span>
          ) : (
            <span key={i}>{seg.t}</span>
          ),
        )}
      </p>
    </header>
  );
}
