"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Complex Language pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function ComplexLanguageDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // Three different opt-outs buried in 1,200 words of legal text.
  const para = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. `.repeat(8);
  const [scrolled, setScrolled] = React.useState(0);
  const [opted, setOpted] = React.useState({ marketing: false, partners: false, analytics: false });
  const wordCount = para.split(/\s+/).filter(Boolean).length;
  const wpm = 220;
  const minutes = Math.ceil(wordCount / wpm);
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Complex Language"
      caption="The EULA is 1,180 words — ~5 minutes at average reading speed. Three different opt-outs (marketing, partners, analytics) are buried in the same document. A user who skims will accept all of them by default."
      hint="Scroll to the bottom. Notice how the three opt-outs are buried at the END of the document."
    >
      <div className="space-y-4">
        <div className="bg-foreground/5 flex flex-wrap items-center gap-2 rounded-md border px-3 py-2 text-[10px]">
          <div><span className="text-muted-foreground">Words:</span> <span className="font-mono font-semibold">{wordCount}</span></div>
          <div><span className="text-muted-foreground">Est. read:</span> <span className="font-mono font-semibold">{minutes} min</span></div>
          <div><span className="text-muted-foreground">Opt-outs found:</span> <span className="font-mono font-semibold">3 (all at the end)</span></div>
        </div>
        <div
          onScroll={(e) => {
            const el = e.currentTarget;
            const pct = Math.round((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
            setScrolled(pct);
          }}
          className="bg-muted/40 h-44 overflow-y-auto rounded-md border p-3 text-[10px] leading-relaxed"
        >
          {para}
          <div className="bg-amber-500/20 border-amber-500/40 mt-3 space-y-1 rounded border p-2">
            <div className="text-amber-700 dark:text-amber-300 font-semibold">Below: opt-outs (at the END of the agreement)</div>
            {([
              ["marketing", "Opt out of marketing emails"],
              ["partners", "Opt out of sharing data with 47 third-party partners"],
              ["analytics", "Opt out of analytics tracking"],
            ] as const).map(([k, label]) => (
              <label key={k} className="flex items-center gap-2 text-[10px]">
                <input
                  type="checkbox"
                  checked={opted[k]}
                  onChange={(e) => setOpted((o) => ({ ...o, [k]: e.target.checked }))}
                />
                {label}
              </label>
            ))}
          </div>
        </div>
        <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
          Scrolled: {scrolled}% — the opt-outs become visible only at 100%.
        </div>
      </div>
    </DemoShell>
  );
}

