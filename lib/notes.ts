import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type NoteType = "decision" | "deep-dive";

export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  type: NoteType;
  tags: string[];
  project?: string;
  summary: string;
  readingTime: number;
};

export type Note = NoteMeta & { content: string };

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function readNoteFile(fileName: string): Note {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(NOTES_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: String(data.date ?? ""),
    type: (data.type as NoteType) ?? "decision",
    tags: data.tags ?? [],
    project: data.project,
    summary: data.summary ?? "",
    readingTime: estimateReadingTime(content),
    content,
  };
}

export function getAllNotes(): Note[] {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return fs
    .readdirSync(NOTES_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readNoteFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNote(slug: string): Note | undefined {
  return getAllNotes().find((n) => n.slug === slug);
}

export function getNotesForProject(projectSlug: string): Note[] {
  return getAllNotes().filter((n) => n.project === projectSlug);
}

export function formatDate(date: string): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
