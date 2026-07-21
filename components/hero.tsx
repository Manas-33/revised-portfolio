import { Mark } from "./mark";
import type { TaglineSegment } from "@/lib/portfolio";

export function Hero({
  name,
  role,
  tagline,
}: {
  name: string;
  role: string;
  tagline: TaglineSegment[];
}) {
  return (
    <header className="pt-16 md:pt-24">
      <Mark className="mb-10 rise" />
      <h1
        className="anim-name text-[clamp(3rem,9.5vw,7.5rem)] font-normal leading-[0.92] tracking-[-0.055em] text-ink"
        style={{ animationDelay: "90ms" }}
      >
        {name}
      </h1>
      <p
        className="rise mt-6 text-[15px] font-medium uppercase tracking-[0.14em] text-muted"
        style={{ animationDelay: "220ms" }}
      >
        {role}
      </p>
      <p
        className="rise mt-4 max-w-[48ch] text-[20px] leading-[1.6] text-muted"
        style={{ animationDelay: "320ms" }}
      >
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
