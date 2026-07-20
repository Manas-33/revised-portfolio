import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { RevealObserver } from "@/components/reveal";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected AI and distributed-systems projects.",
};

const moreProjects = [
  { name: "Memex", desc: "Obsidian LLM plugin: MCP server, RAG with reranking, swappable providers." },
  { name: "MomentAI", desc: "Automated short-form content: GPT-4 highlight detection + FFmpeg pipeline." },
  { name: "Intent Drift", desc: "Cross-attention injection to preserve creative intent across diffusion edits." },
  { name: "FlowGuard AI", desc: "Zapier-orchestrated AI ops: Slack triage + GitHub submission auditing." },
  { name: "Quizzy", desc: "Spring Boot CS quiz platform with analytics and nightly rollups." },
];

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="w-full max-w-[962px] pt-4 md:pt-6 ml-[clamp(0px,7vw,128px)]">
      <RevealObserver />
      <div className="min-h-dvh px-6 pb-16 md:px-14">
        <PageHeader backHref="/" backLabel="Home" />

        <section className="rise" style={{ animationDelay: "80ms" }}>
          <h1 className="text-[32px] font-semibold leading-tight tracking-tight">
            Projects
          </h1>
          <p className="mt-3 max-w-[52ch] text-[16px] leading-7 text-muted">
            Flagship work, each with architecture, a demo slot, and real outcomes.
          </p>
        </section>

        <section className="mt-12" data-reveal>
          <ul className="flex flex-col border-t border-rule">
            {projects.map((p) => (
              <li key={p.slug} className="border-b border-rule">
                <Link
                  href={`/projects/${p.slug}`}
                  className="group flex flex-col gap-1.5 py-5 transition-colors sm:flex-row sm:items-baseline sm:gap-5"
                >
                  <div className="flex w-full items-baseline sm:w-auto sm:flex-1">
                    <span className="text-[17px] text-ink transition-colors group-hover:text-accent">
                      {p.title}
                    </span>
                    <span className="leader hidden sm:block" aria-hidden="true" />
                    <span className="shrink-0 font-mono text-[12px] text-faint">
                      {p.category}
                    </span>
                  </div>
                </Link>
                <p className="-mt-2 pb-5 max-w-[58ch] text-[14px] leading-6 text-muted">
                  {p.tagline}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="crossrule mt-14 pt-8" data-reveal>
          <h2 className="text-[15px] font-medium">More work</h2>
          <ul className="mt-5 flex flex-col gap-4">
            {moreProjects.map((p) => (
              <li
                key={p.name}
                className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-5"
              >
                <span className="w-32 shrink-0 text-[15px] text-ink">
                  {p.name}
                </span>
                <span className="text-[14px] leading-6 text-muted">{p.desc}</span>
              </li>
            ))}
          </ul>
        </section>

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
