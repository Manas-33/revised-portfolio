// Two-column label/content grid — label col 128px, content 1fr.
export function Section({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-reveal
      className="mt-16 grid scroll-mt-24 grid-cols-1 gap-y-4 md:mt-28 md:grid-cols-[128px_1fr] md:gap-x-9"
    >
      <h2 className="pt-1 text-[12px] font-normal uppercase tracking-[0.12em] text-muted">
        {label}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
