import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { RevealObserver } from "@/components/reveal";
import { MdxContent } from "@/components/mdx-content";
import { getAllNotes, getNote, formatDate } from "@/lib/notes";
import { getProject } from "@/lib/projects";

const typeLabels = {
  decision: "Decision log",
  "deep-dive": "Deep dive",
} as const;

export function generateStaticParams() {
  return getAllNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};
  return { title: note.title, description: note.summary };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const project = note.project ? getProject(note.project) : undefined;

  return (
    <div className="w-full max-w-[962px] pt-4 md:pt-6 ml-[max(0px,calc(50vw_-_620px))]">
      <RevealObserver />
      <div className="min-h-dvh px-6 pb-16 md:px-14">
        <PageHeader backHref="/notes" backLabel="All notes" />

        <article>
          <section className="rise" style={{ animationDelay: "80ms" }}>
            <div className="flex flex-wrap items-center gap-2 text-[12px] text-faint">
              <span className="font-mono text-accent">
                {typeLabels[note.type]}
              </span>
              <span>·</span>
              <span>{formatDate(note.date)}</span>
              <span>·</span>
              <span>{note.readingTime} min read</span>
            </div>
            <h1 className="mt-3 text-[32px] font-semibold leading-tight tracking-tight">
              {note.title}
            </h1>
            {project && (
              <p className="mt-3 text-[14px] text-muted">
                Part of the{" "}
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-accent underline underline-offset-2"
                >
                  {project.title}
                </Link>{" "}
                project.
              </p>
            )}
            {note.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                {note.tags.map((t) => (
                  <span key={t} className="font-mono text-[12px] text-faint">
                    #{t}
                  </span>
                ))}
              </div>
            )}
          </section>

          <section className="crossrule mt-12 pt-8" data-reveal>
            <MdxContent source={note.content} />
          </section>
        </article>

        <footer className="mt-20 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-rule pt-6 text-[12.5px] text-faint">
          <span>© {new Date().getFullYear()}, Manas Dalvi</span>
          <Link href="/" className="whitespace-nowrap transition-colors hover:text-ink">
            Home ↑
          </Link>
        </footer>
      </div>
    </div>
  );
}
