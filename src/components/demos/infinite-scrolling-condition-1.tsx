"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

/*
 * Infinite Scrolling — Condition 1: Autonomous Content Injection
 *
 * Thesis: the feed triggers an asynchronous fetch event E_fetch() whenever the
 * viewport crosses a predefined spatial threshold τ_trigger (e.g. 800px before
 * the end of the document), WITHOUT requiring an affirmative user action such
 * as a "Load More" button:
 *
 *   Y_document_end − Y_viewport ≤ τ_trigger  ⟹  E_fetch() = True
 *
 * Variant A (dark): scrolling near the bottom auto-appends the next batch —
 * no "Load More" button exists anywhere in the interface.
 * Variant B (benign): the identical feed and payload, but each batch is gated
 * behind an explicit "Load More" button — the fetch fires only on an
 * affirmative user action.
 */

const TAU_TRIGGER = 800; // px — spatial threshold from the thesis

const HEADLINES = [
  "Markets rally as central bank holds rates steady",
  "Study finds morning light improves sleep quality",
  "Local bakery wins national award for sourdough",
  "City council votes on new bike-lane network",
  "Researchers publish open data on ocean currents",
  "Startup raises €40M for AI-powered weather models",
  "Theatre season opens with a sold-out premiere",
  "New transit app adds real-time delay alerts",
  "Hikers report rare bird sighting in the valley",
  "University launches a free online physics course",
  "Farmers' market extends its winter hours",
  "Port authority announces container-fee review",
];

function headlineFor(index: number): string {
  return `${index + 1}. ${HEADLINES[index % HEADLINES.length]}`;
}

export function InfiniteScrollingCond1({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [itemsA, setItemsA] = React.useState<string[]>(() =>
    Array.from({ length: 8 }, (_, i) => headlineFor(i))
  );
  const [itemsB, setItemsB] = React.useState<string[]>(() =>
    Array.from({ length: 8 }, (_, i) => headlineFor(i))
  );
  const [distA, setDistA] = React.useState<number | null>(null);
  const [distB, setDistB] = React.useState(0);
  const [autoFetches, setAutoFetches] = React.useState(0);
  const [manualLoads, setManualLoads] = React.useState(0);
  const [loadingA, setLoadingA] = React.useState(false);
  const [loadingB, setLoadingB] = React.useState(false);

  const fetchingRef = React.useRef(false);
  const containerARef = React.useRef<HTMLDivElement>(null);
  const containerBRef = React.useRef<HTMLDivElement>(null);
  const timersRef = React.useRef<number[]>([]);

  React.useEffect(
    () => () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    },
    []
  );

  const appendBatch = (side: "A" | "B") => {
    if (side === "A") {
      setItemsA((prev) => [...prev, headlineFor(prev.length), headlineFor(prev.length + 1)]);
    } else {
      setItemsB((prev) => [...prev, headlineFor(prev.length), headlineFor(prev.length + 1)]);
    }
  };

  const jumpToBottom = (el: HTMLDivElement | null) => {
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  // Variant A: crossing the spatial threshold fires E_fetch() automatically.
  const handleScrollA = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const dist = el.scrollHeight - el.scrollTop - el.clientHeight;
    setDistA(dist);
    if (dist <= TAU_TRIGGER && !fetchingRef.current) {
      fetchingRef.current = true;
      setLoadingA(true);
      timersRef.current.push(
        window.setTimeout(() => {
          appendBatch("A");
          setAutoFetches((n) => n + 1);
          setLoadingA(false);
          fetchingRef.current = false;
        }, 450)
      );
    }
  };

  // Variant B: fetch only fires on an affirmative "Load More" click.
  const handleScrollB = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    setDistB(el.scrollHeight - el.scrollTop - el.clientHeight);
  };

  const handleLoadMore = () => {
    if (loadingB) return;
    setLoadingB(true);
    timersRef.current.push(
      window.setTimeout(() => {
        appendBatch("B");
        setManualLoads((n) => n + 1);
        setLoadingB(false);
      }, 450)
    );
  };


  return (
    <DemoShell mode={mode}
      title="Infinite Scrolling: Autonomous Content Injection"
      userTitle="NewsPulse — Live feed"
      caption="Autonomous Content Injection — the feed fetches the next batch by itself as soon as the viewport crosses the spatial threshold, with no “Load More” button ever offered."
      deltaNote="Variant A appends items automatically the instant the viewport crosses the 800px spatial threshold — E_fetch() fires with no affirmative user action. Variant B keeps the identical feed and payload but gates every batch behind an explicit “Load More” button, so the user decides when content continues."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">NewsPulse — live news feed</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Scroll toward the bottom. Content loads in batches — but only when you ask for it.
                </p>
              </div>
              <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                {itemsB.length} items
              </span>
            </div>

            <div
              ref={containerBRef}
              onScroll={handleScrollB}
              role="region"
              aria-label="News feed"
              tabIndex={0}
              className="mt-2 h-56 space-y-1.5 overflow-y-auto rounded-md border bg-background p-2"
            >
              {itemsB.map((h, i) => (
                <div key={i} className="rounded border border-border bg-card px-2 py-1.5 text-[9px] leading-snug text-foreground/80">
                  {h}
                </div>
              ))}
              {loadingB && (
                <div className="flex items-center gap-1.5 rounded border border-border bg-card px-2 py-1.5 text-[9px] text-muted-foreground">
                  <RefreshSpinner /> Loading next batch…
                </div>
              )}
            </div>

            {distB <= TAU_TRIGGER ? (
              <button
                onClick={handleLoadMore}
                disabled={loadingB}
                className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-colors ${
                  loadingB
                    ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                }`}
              >
                {loadingB ? "Loading…" : "Load more stories"}
              </button>
            ) : (
              <div className="mt-2 flex items-center justify-between text-[9px] text-muted-foreground">
                <span>Distance to end: {distB}px</span>
                <button
                  onClick={() => jumpToBottom(containerBRef.current)}
                  className="rounded border border-border px-2 py-0.5 font-medium hover:text-foreground transition-colors cursor-pointer"
                >
                  Scroll to bottom ▼
                </button>
              </div>
            )}

            {manualLoads >= 2 && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                  <CheckCircle2 className="size-3" />
                  Affirmative action required
                </div>
                <p className="text-muted-foreground mt-0.5">
                  Every batch was fetched by an explicit “Load More” click. The condition
                  <span className="font-mono text-foreground"> Y_document_end − Y_viewport ≤ τ_trigger</span>{" "}
                  alone never fires E_fetch() here — continuation always requires user choice.
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">NewsPulse — live news feed</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Scroll toward the bottom. New stories keep arriving on their own — there is no
                “Load More” button anywhere.
              </p>
            </div>
            <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              {itemsA.length} items
            </span>
          </div>

          <div
            ref={containerARef}
            onScroll={handleScrollA}
            role="region"
              aria-label="News feed"
              tabIndex={0}
              className="mt-2 h-56 space-y-1.5 overflow-y-auto rounded-md border bg-background p-2"
          >
            {itemsA.map((h, i) => (
              <div key={i} className="rounded border border-border bg-card px-2 py-1.5 text-[9px] leading-snug text-foreground/80">
                {h}
              </div>
            ))}
            {loadingA && (
              <div className="flex items-center gap-1.5 rounded border border-red-500/30 bg-red-500/5 px-2 py-1.5 text-[9px] text-red-600 dark:text-red-300">
                <RefreshSpinner /> Injecting next batch…
              </div>
            )}
          </div>

          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              {distA !== null && distA <= TAU_TRIGGER ? (
                <span className="inline-flex items-center gap-1 rounded border border-yellow-500/40 bg-yellow-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-yellow-700 dark:text-yellow-300">
                  <AlertTriangle className="size-2.5" />
                  Loading more posts…
                </span>
              ) : (
                <span className="text-[9px] text-muted-foreground">
                  Distance to end: {distA === null ? "not measured" : `${distA}px`}
                </span>
              )}
            </div>
            <button
              onClick={() => jumpToBottom(containerARef.current)}
              className="rounded border border-border px-2 py-0.5 text-[9px] font-medium hover:text-foreground transition-colors cursor-pointer"
            >
              Scroll to bottom ▼
            </button>
          </div>

          {autoFetches >= 3 && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <AlertTriangle className="size-3" />
                Loading more stories…
              </div>
              <p className="text-muted-foreground">
                Once <span className="font-mono text-foreground">Y_document_end − Y_viewport ≤ τ_trigger</span>{" "}
                (800px), the feed fired <span className="font-mono text-foreground">E_fetch() = True</span>{" "}
                on its own — {autoFetches} times so far. No “Load More” button was ever rendered, so the
                user never gets the chance to stop.
              </p>
              <p className="text-muted-foreground">
                The DOM keeps growing while the viewport keeps crossing the threshold: continuation is
                forced by the algorithm, not chosen by the reader.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}

function RefreshSpinner() {
  return (
    <svg className="size-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
