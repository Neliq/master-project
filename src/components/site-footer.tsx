/**
 * Site-wide footer.
 */

import { PATTERNS } from "@/lib/patterns";

export function SiteFooter() {
  return (
    <footer className="site-footer border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-xs font-medium text-white sm:flex-row sm:items-center sm:justify-between">
        <p>
          An educational reference for designers and developers. Not legal
          advice.
        </p>
        <p>
          {PATTERNS.length} patterns · each with an A/B demo pair · Categorised
          by Brignull, Mathur, Gray
        </p>
      </div>
    </footer>
  );
}
