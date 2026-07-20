import Link from "next/link";
import { site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";

export function PageHeader({
  backHref = "/",
  backLabel = "Home",
}: {
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <header className="rise flex items-start justify-between pt-10 pb-16">
      <div>
        <Link
          href="/"
          className="text-[15px] font-medium transition-colors hover:text-accent"
        >
          {site.name}
        </Link>
        <p className="text-[14px] text-muted">
          <Link
            href={backHref}
            className="arrow-link transition-colors hover:text-ink"
          >
            <span className="arr">←</span> {backLabel}
          </Link>
        </p>
      </div>
      <ThemeToggle />
    </header>
  );
}
