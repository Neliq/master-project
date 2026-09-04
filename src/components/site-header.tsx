/**
 * Site-wide header. Pure server component — no client interactivity here.
 */

import Link from "next/link";
export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-center gap-16 px-4">
        <Link
          href="/"
          className="text-center text-lg font-extrabold leading-[0.9] tracking-[0.12em] text-white transition-opacity hover:opacity-70"
        >
          DARK PATTERN
          <br />
          LAB
        </Link>

      </div>
    </header>
  );
}
