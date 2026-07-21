import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { RevealObserver } from "@/components/reveal";
import { DemoMedia } from "@/components/demo-media";
import { MdxContent } from "@/components/mdx-content";
import { getAllProjects, getProject } from "@/lib/projects";
import { getNotesForProject, formatDate } from "@/lib/notes";

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.tagline };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = getAllProjects();
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const relatedNotes = getNotesForProject(slug);

  return (
    <div className="w-full max-w-[962px] pt-4 md:pt-6 ml-[max(0px,calc(50vw_-_620px))]">
      <RevealObserver />
      <div className="min-h-dvh px-6 pb-16 md:px-14">
        <PageHeader backHref="/#projects" backLabel="All projects" />

        {/* Title */}
        <section className="rise" style={{ animationDelay: "80ms" }}>
          <p className="text-[13px] text-faint">
            {String(idx + 1).padStart(2, "0")} — {project.category}
          </p>
          <h1 className="mt-2 text-[32px] font-semibold leading-tight tracking-tight">
            {project.title}
          </h1>
          <p className="mt-3 max-w-[52ch] text-[16px] leading-7 text-muted">
            {project.tagline}
          </p>
          {(project.repo || project.demo) && (
            <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[14px]">
              {project.repo && (
                <a
                  className="arrow-link text-muted transition-colors hover:text-ink"
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  View source on GitHub <span className="arr">↗</span>
                </a>
              )}
              {project.demo && (
                <a
                  className="arrow-link text-muted transition-colors hover:text-ink"
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live demo <span className="arr">↗</span>
                </a>
              )}
            </p>
          )}
        </section>

        {/* Meta */}
        <section className="crossrule mt-12 pt-8" data-reveal>
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            <div>
              <p className="text-[12px] uppercase tracking-widest text-faint">
                Stack
              </p>
              <p className="mt-1.5 max-w-[40ch] text-[14px] leading-6 text-muted">
                {project.stack.join(" · ")}
              </p>
            </div>
            {project.stat && (
              <div>
                <p className="text-[12px] uppercase tracking-widest text-faint">
                  In one line
                </p>
                <p className="mt-1.5 text-[14px] text-muted">{project.stat}</p>
              </div>
            )}
          </div>
        </section>

        {/* Overview */}
        {project.overview && (
          <section className="crossrule mt-12 pt-8" data-reveal>
            <h2 className="text-[15px] font-medium">Overview</h2>
            <p className="mt-4 max-w-[58ch] text-[15px] leading-7 text-muted">
              {project.overview}
            </p>
          </section>
        )}

        {/* Architecture */}
        {project.content.trim() && (
          <section className="crossrule mt-12 pt-8" data-reveal>
            <h2 className="text-[15px] font-medium">Architecture</h2>
            <div className="mt-4">
              <MdxContent source={project.content} />
            </div>
          </section>
        )}

        {/* Demo */}
        <section className="crossrule mt-12 pt-8" data-reveal>
          <h2 className="text-[15px] font-medium">Demo</h2>
          <div className="mt-5">
            <DemoMedia
              src={project.demo}
              poster={project.demoPoster}
              alt={project.title}
            />
          </div>
        </section>

        {/* Highlights */}
        {project.highlights.length > 0 && (
          <section className="crossrule mt-12 pt-8" data-reveal>
            <h2 className="text-[15px] font-medium">
              Highlights
              <sup className="ml-0.5 font-normal text-faint">
                {project.highlights.length}
              </sup>
            </h2>
            <div className="mt-5 space-y-3.5">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex gap-4">
                  <span className="shrink-0 text-[13px] tabular-nums text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[14.5px] leading-6 text-muted">{h}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Metrics */}
        {project.metrics.length > 0 && (
          <section className="crossrule mt-12 pt-8" data-reveal>
            <h2 className="text-[15px] font-medium">Outcomes</h2>
            <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-3">
              {project.metrics.map((m, i) => (
                <div key={i}>
                  <div className="font-mono text-[20px] font-medium tracking-tight text-accent">
                    {m.value}
                  </div>
                  <div className="mt-1 text-[13px] leading-5 text-muted">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related notes */}
        {relatedNotes.length > 0 && (
          <section className="crossrule mt-12 pt-8" data-reveal>
            <h2 className="text-[15px] font-medium">Related notes</h2>
            <ul className="mt-4 flex flex-col">
              {relatedNotes.map((n) => (
                <li key={n.slug} className="border-b border-rule/70 last:border-0">
                  <Link
                    href={`/notes/${n.slug}`}
                    className="row-hover group flex items-baseline py-3"
                  >
                    <span className="text-[15px] text-ink transition-colors group-hover:text-accent">
                      {n.title}
                    </span>
                    <span className="leader" aria-hidden="true" />
                    <span className="shrink-0 text-[12px] tabular-nums text-faint">
                      {formatDate(n.date)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Next project */}
        <section className="crossrule mt-16 pt-8" data-reveal>
          <Link
            href={`/projects/${next.slug}`}
            className="row-hover group flex items-baseline"
          >
            <span className="text-[13px] text-faint">Next</span>
            <span className="leader" aria-hidden="true" />
            <span className="text-[15px] font-medium transition-colors group-hover:text-accent">
              {next.title} →
            </span>
          </Link>
        </section>

        {/* Footer */}
        <footer className="mt-20 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-rule pt-6 text-[12.5px] text-faint">
          <span>© {new Date().getFullYear()}, Manas Dalvi</span>
          <Link
            href="/"
            className="whitespace-nowrap transition-colors hover:text-ink"
          >
            Home ↑
          </Link>
        </footer>
      </div>
    </div>
  );
}
