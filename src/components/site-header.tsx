/**
 * Site-wide header. Pure server component — no client interactivity here.
 */

import Link from "next/link";
export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-50 border-b backdrop-blur">
      <div className="mx-auto grid h-20 max-w-7xl grid-cols-3 items-center gap-4 px-4">
        <Link
          href="/"
          className="justify-self-start text-xs font-semibold tracking-[0.16em] text-white transition-opacity hover:opacity-70"
        >
          CATALOG
        </Link>

        <Link
          href="/"
          className="justify-self-center text-center text-lg font-extrabold leading-[0.9] tracking-[0.12em] text-white transition-opacity hover:opacity-70"
        >
          DARK PATTERN
          <br />
          LAB
        </Link>

        <a
          href="https://www.deceptive.design"
          target="_blank"
          rel="noreferrer noopener"
          className="justify-self-end text-xs font-semibold tracking-[0.16em] text-white transition-opacity hover:opacity-70"
        >
          SOURCE
          <span className="sr-only"> taxonomy (opens in a new tab)</span>
        </a>
      </div>
    </header>
  );
}
