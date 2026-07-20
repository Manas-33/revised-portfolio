import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Metric = { value: string; label: string };

export type ProjectMeta = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  stat: string;
  overview: string;
  highlights: string[];
  year: string;
  stack: string[];
  metrics: Metric[];
  repo?: string;
  demo?: string;
  demoPoster?: string;
  featured: boolean;
  order: number;
};

export type Project = ProjectMeta & { content: string };

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

function readProjectFile(fileName: string): Project {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    tagline: data.tagline ?? "",
    category: data.category ?? "",
    stat: data.stat ?? "",
    overview: data.overview ?? "",
    highlights: data.highlights ?? [],
    year: String(data.year ?? ""),
    stack: data.stack ?? [],
    metrics: data.metrics ?? [],
    repo: data.repo,
    demo: data.demo,
    demoPoster: data.demoPoster,
    featured: Boolean(data.featured),
    order: Number(data.order ?? 999),
    content,
  };
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readProjectFile)
    .sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}
