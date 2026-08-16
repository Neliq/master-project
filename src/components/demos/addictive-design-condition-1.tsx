"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Addictive Design — Condition 1: Infinite Frictionless Continuation
 *
 * Thesis: Y_scroll(t) is the vertical scroll position, Y_max(t) the total
 * renderable height, tau_buffer the distance to the apparent bottom of the
 * page. The feature triggers if the interface executes a background
 * asynchronous event E_append that fetches and injects new content nodes
 * before the natural stopping point is perceived:
 *
 *   Y_max(t) - Y_scroll(t) < tau_buffer  =>  E_append = True
 *   lim_{t->inf} Y_max(t) = inf
 *
 * Variant A (dark): a feed that silently appends new items as you approach
 * the bottom — the document height grows without bound.
 * Variant B (benign): the same content, but continuation requires an
 * explicit "Load more" click and a visible end-of-results marker.
 */

const BUFFER_PX = 60;
const BASE_ITEMS = 6;
const PAGE_SIZE = 4;

const TITLES = [
  "Tiny kitchen, big pancake flip",
  "Cat reacts to cucumber (again)",
  "5-minute full-body stretch",
  "The 10,000-step myth, tested",
  "Instant ramen, 7 upgrades",
  "Watercolor clouds in 60s",
  "How to actually fold a fitted sheet",
  "Night sky timelapse from a tent",
];

const PALETTES = [
  "from-rose-500/40 to-amber-500/40",
  "from-sky-500/40 to-indigo-500/40",
  "from-emerald-500/40 to-teal-500/40",
  "from-violet-500/40 to-fuchsia-500/40",
];

function ReelItem({ index }: { index: number }) {
  const title = TITLES[index % TITLES.length];
  const palette = PALETTES[index % PALETTES.length];
  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-card p-2">
      <div className={`h-9 w-12 shrink-0 rounded bg-gradient-to-br ${palette}`} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[9px] font-medium text-foreground/85">
          #{index + 1} — {title}
        </div>
        <div className="mt-0.5 text-[8px] font-mono text-muted-foreground/60">
          y = {(index + 1) * 44}px &bull; reel {index + 1}
        </div>
      </div>
    </div>
  );
}

export function AddictiveDesignCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [countA, setCountA] = React.useState(BASE_ITEMS);
  const [countB, setCountB] = React.useState(BASE_ITEMS);
  const refA = React.useRef<HTMLDivElement>(null);
  const refB = React.useRef<HTMLDivElement>(null);

  const reset = () => {
    setCountA(BASE_ITEMS);
    setCountB(BASE_ITEMS);
  };

  // Dark panel: E_append fires automatically near the apparent bottom.
  const handleScrollA = () => {
    const el = refA.current;
    if (!el) return;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < BUFFER_PX) {
      setCountA((c) => c + PAGE_SIZE);
    }
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Y_max(t) - Y_scroll(t) &lt; &tau;_buffer</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">E_append = True (auto)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Y_max(t) (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">&rarr; &infin; ({countA} items)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Y_max(t) (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">fixed ({countB} items)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">&tau;_buffer</span>
        <span className="font-mono font-semibold tabular-nums">{BUFFER_PX}px</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Addictive Design: Infinite Frictionless Continuation"
      caption="Infinite Frictionless Continuation — content is appended in the background before the user perceives the bottom, so the document never reaches a terminal state."
      auditorStats={stats}
      deltaNote="Scroll Variant A to the bottom: new reels appear automatically (E_append = True), so the document height keeps growing. Variant B stops at a fixed height, shows an 'End of results' marker, and only continues when you explicitly press 'Load more'."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[11px] font-semibold">Reelz — feed</h3>
              <span className="rounded-full border border-emerald-500/30 px-2 py-0.5 text-[8px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {countB} reels
              </span>
            </div>
            <div ref={refB} className="mt-2 max-h-40 space-y-1.5 overflow-y-auto pr-1">
              {Array.from({ length: countB }).map((_, i) => (
                <ReelItem key={i} index={i} />
              ))}
              <div className="rounded-md border border-emerald-500/40 bg-emerald-500/5 py-1.5 text-center text-[8px] font-mono font-semibold text-emerald-700 dark:text-emerald-300">
                — End of results —
              </div>
            </div>
            <button
              onClick={() => setCountB((c) => c + PAGE_SIZE)}
              className="mt-2 w-full rounded-md border border-emerald-500/50 bg-emerald-500/10 py-1.5 text-[10px] font-medium text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 transition-colors cursor-pointer"
            >
              Load more reels
            </button>
            <p className="mt-1.5 text-[8px] text-muted-foreground">
              Continuation requires an explicit affirmative action — the terminal state stays reachable.
            </p>
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[11px] font-semibold">Reelz — feed</h3>
            <span className="rounded-full border border-rose-500/30 px-2 py-0.5 text-[8px] font-mono font-bold text-rose-600 dark:text-rose-400">
              {countA} reels &hellip; keep going
            </span>
          </div>
          <div
            ref={refA}
            onScroll={handleScrollA}
            className="mt-2 max-h-40 space-y-1.5 overflow-y-auto pr-1"
          >
            {Array.from({ length: countA }).map((_, i) => (
              <ReelItem key={i} index={i} />
            ))}
            <div className="flex items-center justify-center gap-1 py-1 text-[8px] font-mono text-rose-600 dark:text-rose-400">
              <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-rose-500" />
              appending next reels&hellip;
            </div>
          </div>
          <p className="mt-1.5 text-[8px] text-muted-foreground">
            No end marker, no &ldquo;load more&rdquo; — new content is injected before you perceive the bottom.
          </p>
        </div>
      </div>
    </DemoShell>
  );
}
