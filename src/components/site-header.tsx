/**
 * Site-wide header. Pure server component — no client interactivity here.
 */

import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-center gap-4 px-4 sm:gap-16">
        <Link
          href="/"
          className="text-center text-sm font-extrabold leading-[0.9] tracking-[0.12em] text-white transition-opacity hover:opacity-70 sm:text-lg"
        >
          DARK PATTERN
          <br />
          LAB
        </Link>
        <Link
          href="/customization"
          className="shrink-0 border border-white/35 px-2.5 py-2 text-[10px] font-semibold tracking-[0.08em] text-white uppercase transition-colors hover:border-white hover:bg-white/10 sm:px-3 sm:text-xs"
        >
          Customization
        </Link>
      </div>
    </header>
  );
}
