/**
 * Site-wide footer.
 */

import { PATTERNS } from "@/lib/patterns";

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/10">
      <div className="text-muted-foreground mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-xs sm:flex-row sm:items-center sm:justify-between">
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
