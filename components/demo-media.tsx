"use client";

import { useState } from "react";

type DemoMediaProps = {
  src?: string;
  poster?: string;
  alt?: string;
};

export function DemoMedia({ src, poster, alt }: DemoMediaProps) {
  const [errored, setErrored] = useState(false);
  const isVideo = src ? /\.(mp4|webm|mov)$/i.test(src) : false;
  const showPlaceholder = !src || errored;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-rule bg-fill">
      {showPlaceholder ? (
        <Placeholder />
      ) : isVideo ? (
        <video
          className="h-full w-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setErrored(true)}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="h-full w-full object-cover"
          src={src}
          alt={alt ?? "Project demo"}
          onError={() => setErrored(true)}
        />
      )}
    </div>
  );
}

function Placeholder() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_srgb,var(--accent)_14%,transparent),transparent_60%)]">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-rule bg-page">
        <svg
          className="h-5 w-5 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      </div>
      <p className="font-mono text-xs text-faint">Demo coming soon</p>
    </div>
  );
}
