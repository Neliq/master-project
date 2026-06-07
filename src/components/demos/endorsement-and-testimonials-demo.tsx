"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/**
 * Interactive demo for the Endorsement And Testimonials pattern.
 *
 * Hand-built from the master thesis formal conditions.
 */

export function EndorsementAndTestimonialsDemo({ mode = "user", annotations = [], onRestart }: { mode?: "user" | "auditor"; annotations?: import("@/components/demos/demo-shell").AnnotationItem[]; onRestart?: () => void; } = {}) {
  // 200 reviews, but only 5-star are shown by default. Toggle to see
  // how 1-stars are hidden.
  const reviews = [
    { stars: 5, count: 168 },
    { stars: 4, count: 18 },
    { stars: 3, count: 4 },
    { stars: 2, count: 2 },
    { stars: 1, count: 8 },
  ];
  const [filter, setFilter] = React.useState<5 | "all">(5);
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart} title="Endorsement and Testimonials"
      caption="The reviews page shows 200 ratings but defaults to displaying only the 5-star ones. The toggle to see lower ratings is present but visually muted."
      hint="Switch between '5 stars' and 'All' to see how many 1-stars are hidden."
    >
      <div className="space-y-4">
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setFilter(5)}
            className={`rounded-md border px-3 py-1.5 font-medium ${
              filter === 5 ? "border-foreground/30 bg-foreground text-background" : "border-foreground/10 bg-muted/40 text-muted-foreground"
            }`}
          >
            5 stars
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`rounded-md border px-3 py-1.5 font-medium ${
              filter === "all" ? "border-foreground/30 bg-foreground text-background" : "border-foreground/10 bg-muted/40 text-muted-foreground"
            }`}
          >
            All
          </button>
        </div>
        <div className="space-y-1">
          {reviews.map((r) => (
            <div key={r.stars} className="flex items-center gap-2 text-xs">
              <span className="w-12 text-[10px]">{r.stars} stars</span>
              <div className="bg-muted/40 h-2 flex-1 overflow-hidden rounded">
                {filter === "all" || r.stars === 5 ? (
                  <div
                    className="bg-foreground h-full"
                    style={{ width: `${(r.count / 200) * 100}%` }}
                  />
                ) : null}
              </div>
              <span className="text-muted-foreground w-8 text-right text-[10px] tabular-nums">{r.count}</span>
            </div>
          ))}
        </div>
        {filter === 5 && (
          <div className="bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300 rounded-md border px-3 py-2 text-[10px]">
            10 of 200 reviews (5%) are not shown by default.
          </div>
        )}
      </div>
    </DemoShell>
  );
}

