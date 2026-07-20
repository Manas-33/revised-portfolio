import Link from "next/link";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { SectionNav } from "@/components/section-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";
import {
  tagline,
  now,
  experience,
  skills,
  education,
  socials,
  type Experience,
  type SkillGroup,
  type Education,
  type Social,
} from "@/lib/portfolio";
import { getFeaturedProjects, type Project } from "@/lib/projects";
import { getAllNotes, formatDate, type Note } from "@/lib/notes";

const NAV = [
  { id: "now", label: "Now" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "notes", label: "Notes" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "elsewhere", label: "Elsewhere" },
];

export default function Home() {
  const projects = getFeaturedProjects();
  const notes = getAllNotes().slice(0, 3);

  return (
    <div
      id="top"
      className="w-full max-w-[962px] px-6 pt-4 md:px-14 md:pt-6 ml-[clamp(0px,7vw,128px)]"
    >
      <div className="fixed right-4 top-4 z-20">
        <ThemeToggle />
      </div>

      <a
        href="#now"
        className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-30 focus:bg-fill focus:px-3 focus:py-2 focus:text-[14px] focus:text-ink"
      >
        Skip to content
      </a>

      <Hero name={site.name} tagline={tagline} />

      <div className="mt-14">
        <SectionNav items={NAV} />
      </div>

      <main>
        <Section id="now" label="Now">
          <p className="max-w-[54ch] text-[19px] leading-[1.6] text-muted">
            {now}
          </p>
        </Section>

        <Section id="experience" label="Experience">
          <ExperienceList items={experience} />
        </Section>

        <Section id="projects" label="Projects">
          <ProjectList items={projects} />
          <Link
            href="/projects"
            className="group ml-[14px] mt-6 inline-flex items-center gap-1.5 text-[14px] text-muted transition-colors hover:text-ink"
          >
            All projects
            <span className="text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-muted">
              →
            </span>
          </Link>
        </Section>

        <Section id="notes" label="Notes">
          <NoteList items={notes} />
          <Link
            href="/notes"
            className="group ml-[14px] mt-6 inline-flex items-center gap-1.5 text-[14px] text-muted transition-colors hover:text-ink"
          >
            All notes
            <span className="text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-muted">
              →
            </span>
          </Link>
        </Section>

        <Section id="skills" label="Skills">
          <SkillList items={skills} />
        </Section>

        <Section id="education" label="Education">
          <EducationList items={education} />
        </Section>

        <Section id="elsewhere" label="Elsewhere">
          <ElsewhereList items={socials} />
        </Section>
      </main>

      <footer className="mt-24 flex items-center justify-between border-t border-rule py-8 text-[13px] text-faint">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <a href="#top" className="transition-colors hover:text-muted">
          Back to top ↑
        </a>
      </footer>
    </div>
  );
}

function ExperienceList({ items }: { items: Experience[] }) {
  return (
    <ol className="flex flex-col gap-9">
      {items.map((e) => (
        <li
          key={`${e.company}-${e.dates}`}
          className="grid grid-cols-1 gap-y-1.5 md:grid-cols-[132px_1fr] md:gap-x-6"
        >
          <div className="pt-0.5 text-[12px] leading-5 text-faint tabular-nums">
            {e.dates}
          </div>
          <div>
            <div className="text-[16px] text-ink">
              {e.role}
              <span className="text-muted"> · {e.company}</span>
            </div>
            <div className="text-[13px] text-faint">{e.location}</div>
            <ul className="mt-2.5 flex flex-col gap-1.5">
              {e.highlights.map((h) => (
                <li
                  key={h}
                  className="relative pl-4 text-[14px] leading-relaxed text-muted before:absolute before:left-0 before:text-faint before:content-['—']"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

function ProjectList({ items }: { items: Project[] }) {
  return (
    <ul className="grid grid-cols-1 border-t border-rule md:grid-cols-3">
      {items.map((p, i) => (
        <li
          key={p.slug}
          className={`border-b border-rule ${i % 3 !== 0 ? "md:border-l" : ""}`}
        >
          <Link
            href={`/projects/${p.slug}`}
            className="group relative flex h-full flex-col gap-2.5 px-[14px] pb-[18px] pt-[16px] transition-colors hover:bg-fill"
          >
            <span
              aria-hidden
              className="absolute right-[14px] top-[16px] text-faint transition-transform group-hover:-translate-y-0.5 group-hover:text-muted"
            >
              ↗
            </span>
            <strong className="pr-6 text-[18px] font-normal leading-snug tracking-[-0.012em] text-ink">
              {p.title}
            </strong>
            <span className="text-[14px] leading-[1.55] text-muted">
              {p.tagline}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function NoteList({ items }: { items: Note[] }) {
  return (
    <ul className="flex flex-col">
      {items.map((n) => (
        <li key={n.slug} className="border-b border-rule/70 last:border-0">
          <Link
            href={`/notes/${n.slug}`}
            className="row-hover group flex items-baseline py-3.5"
          >
            <span className="text-[16px] text-ink transition-colors group-hover:text-accent">
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
  );
}

function SkillList({ items }: { items: SkillGroup[] }) {
  return (
    <ol className="flex flex-col gap-3.5">
      {items.map((g, i) => (
        <li
          key={g.category}
          className="grid grid-cols-[28px_1fr] gap-x-3 md:grid-cols-[28px_128px_1fr] md:gap-x-4"
        >
          <span className="pt-0.5 font-mono text-[12px] tabular-nums text-faint">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-[15px] text-ink">{g.category}</span>
          <span className="col-start-2 text-[14px] leading-relaxed text-muted md:col-start-3">
            {g.items.join(", ")}
          </span>
        </li>
      ))}
    </ol>
  );
}

function EducationList({ items }: { items: Education[] }) {
  return (
    <ol className="flex flex-col gap-6">
      {items.map((e) => (
        <li
          key={e.school}
          className="grid grid-cols-1 gap-y-1 md:grid-cols-[132px_1fr] md:gap-x-6"
        >
          <div className="pt-0.5 text-[12px] leading-5 text-faint tabular-nums">
            {e.dates}
          </div>
          <div>
            <div className="text-[16px] text-ink">{e.school}</div>
            <div className="text-[14px] text-muted">{e.degree}</div>
            <div className="text-[13px] text-faint">{e.location}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

function ElsewhereList({ items }: { items: Social[] }) {
  return (
    <ul className="flex flex-col">
      {items.map((s) => {
        const external = s.href.startsWith("http");
        return (
          <li key={s.label} className="border-b border-rule/70 last:border-0">
            <a
              href={s.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between py-3 text-[16px] text-ink"
            >
              <span className="transition-colors group-hover:text-accent">
                {s.label}
              </span>
              <span className="text-faint transition-transform group-hover:-translate-y-0.5 group-hover:text-muted">
                ↗
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
