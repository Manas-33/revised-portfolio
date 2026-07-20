"use client";

import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";

export function Mermaid({ chart }: { chart?: string }) {
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState(false);
  const id = useId().replace(/:/g, "");
  const code = (chart ?? "").trim();

  useEffect(() => {
    if (!code) return;
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: resolvedTheme === "dark" ? "dark" : "neutral",
          fontFamily: "var(--font-plex-sans), sans-serif",
        });
        const { svg } = await mermaid.render(`mermaid-${id}`, code);
        if (!cancelled) {
          setSvg(svg);
          setError(false);
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    render();
    return () => {
      cancelled = true;
    };
  }, [code, resolvedTheme, id]);

  if (!code) return null;

  if (error) {
    return (
      <pre className="prose-content overflow-x-auto rounded-xl border border-border bg-surface p-4 text-xs">
        {code}
      </pre>
    );
  }

  return (
    <div
      className="my-6 flex justify-center overflow-x-auto rounded-2xl border border-border bg-surface p-4 [&_svg]:h-auto [&_svg]:max-w-full"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
