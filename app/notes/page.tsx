import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { RevealObserver } from "@/components/reveal";
import { getAllNotes, formatDate } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes",
  description:
    "Short build logs and deep dives drawn from my own projects — decisions, tradeoffs, and the ideas behind them.",
};

const typeLabels = {
  decision: "Decision log",
  "deep-dive": "Deep dive",
} as const;

export default function NotesPage() {
  const notes = getAllNotes();

  return (
    <div className="w-full max-w-[962px] pt-4 md:pt-6 ml-[max(0px,calc(50vw_-_620px))]">
      <RevealObserver />
      <div className="min-h-dvh px-6 pb-16 md:px-14">
        <PageHeader backHref="/" backLabel="Home" />

        <section className="rise" style={{ animationDelay: "80ms" }}>
          <h1 className="text-[36px] font-semibold leading-tight tracking-tight">
            Notes
          </h1>
          <p className="mt-3 max-w-[54ch] text-[18px] leading-7 text-muted">
            Short build logs and deep dives from my own projects — the decisions
            I made, the tradeoffs, and the ideas behind them.
          </p>
        </section>

        <section className="mt-12" data-reveal>
          <ul className="flex flex-col border-t border-rule">
            {notes.map((n) => (
              <li key={n.slug} className="border-b border-rule">
                <Link
                  href={`/notes/${n.slug}`}
                  className="row-hover group flex flex-col gap-1.5 py-5"
                >
                  <div className="flex items-baseline">
                    <span className="text-[19px] text-ink transition-colors group-hover:text-accent">
                      {n.title}
                    </span>
                    <span className="leader" aria-hidden="true" />
                    <span className="shrink-0 text-[14px] tabular-nums text-faint">
                      {formatDate(n.date)}
                    </span>
                  </div>
                  <p className="max-w-[58ch] text-[16px] leading-6 text-muted">
                    {n.summary}
                  </p>
                  <div className="flex items-center gap-2 text-[14px] text-faint">
                    <span className="font-mono text-accent">
                      {typeLabels[n.type]}
                    </span>
                    <span>·</span>
                    <span>{n.readingTime} min read</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-20 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-rule pt-6 text-[14.5px] text-faint">
          <span>© {new Date().getFullYear()}, Manas Dalvi</span>
          <Link href="/" className="whitespace-nowrap transition-colors hover:text-ink">
            Home ↑
          </Link>
        </footer>
      </div>
    </div>
  );
}
