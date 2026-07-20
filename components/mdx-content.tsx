import { MDXRemote } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";
import { mdxOptions } from "@/lib/mdx-options";
import { Mermaid } from "./mermaid";

function Callout({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <div className="my-5 rounded-xl border border-accent/30 bg-accent/5 p-4">
      {title && (
        <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-wide text-accent">
          {title}
        </p>
      )}
      <div className="text-sm text-foreground/90 [&>p]:mb-0">{children}</div>
    </div>
  );
}

const components = {
  Mermaid,
  Callout,
};

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="prose-content">
      <MDXRemote source={source} components={components} options={mdxOptions} />
    </div>
  );
}
