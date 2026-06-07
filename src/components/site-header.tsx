/**
 * Site-wide header. Pure server component — no client interactivity here.
 */

import Link from "next/link";
import { Eye } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="group/logo flex items-center gap-2 font-heading text-base font-semibold tracking-tight"
        >
          <span className="grid size-7 place-items-center rounded-md bg-foreground text-background transition-transform group-hover/logo:rotate-3">
            <Eye className="size-4" aria-hidden />
          </span>
          <span className="flex items-baseline gap-1">
            Darkpattern<span className="text-muted-foreground">.lab</span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="text-muted-foreground flex items-center gap-1 text-sm"
        >
          <Link
            href="/"
            className="hover:text-foreground rounded-md px-2.5 py-1.5 transition-colors"
          >
            Catalog
          </Link>
          <a
            href="https://www.deceptive.design"
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-foreground rounded-md px-2.5 py-1.5 transition-colors"
          >
            Source taxonomy
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
