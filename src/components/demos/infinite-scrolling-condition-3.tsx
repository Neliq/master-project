"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

/*
 * Infinite Scrolling — Condition 3: Semantic Attenuation of Content Boundaries
 *
 * Thesis: the algorithm scans the feed N_feed for pagination or content-
 * termination language — "page 1 of N", "end of results", "no more items".
 * The feature triggers if NO item in the feed contains any boundary marker,
 * indicating the interface deliberately removes linguistic cues of completion:
 *
 *   ¬∃ n ∈ N_feed : Match(T(n), Pattern_boundary) = True
 *
 * Variant A (dark): the identical growing feed is rendered with no boundary
 * language at all — pages merge seamlessly, so nothing tells the reader the
 * feed can stop.
 * Variant B (benign): the same feed renders explicit page markers
 * ("Page X of 4") and a terminal "End of results — no more items" cue.
 */

const PAGE_SIZE = 6;
const TOTAL_PAGES_B = 4;

const ITEM_NAMES = [
  "Trail runners map 40 km of new single track",
  "Ferry timetables shift for the autumn season",
  "A tiny observatory measures light pollution",
  "Community fridge program expands downtown",
  "Why the old cinema keeps its analog projector",
  "River levels drop after the dry summer",
  "City library extends evening hours through August",
  "Beekeepers report a strong year for urban hives",
  "New mural on the market hall is finished",
  "Skate park repairs are scheduled for next month",
  "Farmers' market moves to the riverside for summer",
  "Local band wins the regional festival prize",
  "Bike share adds 40 new docks at the station",
  "Community garden opens a second plot",
  "Historic tram line gets a heritage weekend",
  "Repair café collects 200 kg of old electronics",
  "The old bridge reopens after six months of work",
  "Children's playground gets a new safety surface",
  "Neighbourhood watch starts a mobile patrol",
  "Volunteer firefighters get new turnout gear",
  "The bakery's wood-fired oven returns after repairs",
  "Public sauna by the lake opens for the season",
  "Language exchange meets every Thursday at the pub",
  "Rooftop solar panels go live on the leisure centre",
];

function itemName(i: number): string {
  return `${i + 1}. ${ITEM_NAMES[i % ITEM_NAMES.length]}`;
}

export function InfiniteScrollingCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  // Both panels share the underlying page counter — the SAME data state is
  // rendered with boundary markers (B) or without them (A).
  const [page, setPage] = React.useState(1);
  const [loadsA, setLoadsA] = React.useState(0);
  const [loadsB, setLoadsB] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  const loadingRef = React.useRef(false);
  const timersRef = React.useRef<number[]>([]);

  React.useEffect(
    () => () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    },
    []
  );

  const nextPage = (side: "A" | "B") => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    timersRef.current.push(
      window.setTimeout(() => {
        setPage((p) => p + 1);
        if (side === "A") setLoadsA((n) => n + 1);
        else setLoadsB((n) => n + 1);
        setLoading(false);
        loadingRef.current = false;
      }, 400)
    );
  };

  const reset = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
    loadingRef.current = false;
    setPage(1);
    setLoadsA(0);
    setLoadsB(0);
    setLoading(false);
  };

  const itemsCount = page * PAGE_SIZE;
  const boundaryHitsB = Math.min(page, TOTAL_PAGES_B) + (page >= TOTAL_PAGES_B ? 1 : 0);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">N_feed items rendered</span>
        <span className="font-mono font-semibold tabular-nums">{itemsCount}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Boundary lexemes found in A</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">0</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Boundary lexemes found in B</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">{boundaryHitsB}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">∃ n: Match(T(n), Pattern_boundary)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">False (A) / True (B)</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Infinite Scrolling: Semantic Attenuation of Content Boundaries"
      caption="Semantic Attenuation of Content Boundaries — the feed's rendered text contains no pagination or completion language, so no linguistic cue ever tells the reader that the content can end."
      auditorStats={stats}
      deltaNote="Variant A renders the feed with no boundary markers — no “Page X of N”, no “end of results”, no “no more items” — so the Match() test fails for every item. Variant B renders the same data with explicit page markers, 24 unique listings, and a terminal “End of results” cue exactly at the announced last page, where the “Next page” control disappears — the reader always has a truthful stopping point."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Shelf — community listings</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Results are paginated: every page is labelled, and the end of the results is
                  announced.
                </p>
              </div>
              <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
                {Math.min(page, TOTAL_PAGES_B)} of {TOTAL_PAGES_B}
              </span>
            </div>

            <div className="mt-2 h-56 space-y-1.5 overflow-y-auto rounded-md border bg-background p-2">
              {Array.from({ length: Math.min(itemsCount, TOTAL_PAGES_B * PAGE_SIZE) }, (_, i) => (
                <div key={i} className="rounded border border-border bg-card px-2 py-1.5 text-[9px] leading-snug text-foreground/80">
                  {itemName(i)}
                </div>
              ))}
              {page >= TOTAL_PAGES_B && (
                <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 px-2 py-2 text-center text-[9px] font-semibold text-emerald-700 dark:text-emerald-300">
                  End of results — no more items
                </div>
              )}
            </div>

            {page >= TOTAL_PAGES_B ? (
              <div className="mt-2 rounded border border-border bg-muted/40 px-2 py-1.5 text-center text-[9px] text-muted-foreground">
                All {TOTAL_PAGES_B * PAGE_SIZE} results shown — the feed stops here.
              </div>
            ) : (
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="text-[9px] text-muted-foreground">
                  Page {Math.min(page, TOTAL_PAGES_B)} of {TOTAL_PAGES_B}
                </span>
                <button
                  onClick={() => nextPage("B")}
                  disabled={loading}
                  className={`rounded-md px-3 py-1.5 text-[10px] font-medium transition-colors ${
                    loading
                      ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                  }`}
                >
                  {loading ? "Loading…" : "Next page"}
                </button>
              </div>
            )}

            {loadsB >= 2 && (
              <div className="mt-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                  <CheckCircle2 className="size-3" />
                  Boundary markers present
                </div>
                <p className="text-muted-foreground mt-0.5">
                  The semantic scan finds
                  <span className="font-mono text-foreground"> Match(T(n), Pattern_boundary) = True</span>{" "}
                  at every page boundary — “page X of N” and a final “end of results, no more items”.
                  Each page shows 6 new listings (24 unique in total), and the “Next page” control
                  disappears exactly at the announced last page — the reader always has a truthful
                  stopping point.
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
              <h3 className="text-[11px] font-semibold">Shelf — community listings</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Results keep arriving seamlessly. Watch the text: is there any marker that says the
                feed can end?
              </p>
            </div>
            <span className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-2 py-0.5 shrink-0">
              {itemsCount} items
            </span>
          </div>

          <div className="mt-2 h-56 space-y-1.5 overflow-y-auto rounded-md border bg-background p-2">
            {Array.from({ length: itemsCount }, (_, i) => (
              <div key={i} className="rounded border border-border bg-card px-2 py-1.5 text-[9px] leading-snug text-foreground/80">
                {itemName(i)}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-1.5 rounded border border-rose-500/30 bg-rose-500/5 px-2 py-1.5 text-[9px] text-rose-600 dark:text-rose-300">
                <RefreshSpinner /> Appending next batch…
              </div>
            )}
          </div>

          <button
            onClick={() => nextPage("A")}
            disabled={loading}
            className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-colors ${
              loading
                ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
                : "bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
            }`}
          >
            {loading ? "Loading…" : "Show more results"}
          </button>

          {loadsA >= 3 && (
            <div className="mt-2 rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
                <AlertTriangle className="size-3" />
                Semantic attenuation detected
              </div>
              <p className="text-muted-foreground">
                After {itemsCount} items and {loadsA} load cycles, the semantic scan still finds zero
                boundary markers — no “page 1 of N”, no “end of results”, no “no more items”:
                <span className="font-mono text-foreground"> ¬∃ n ∈ N_feed : Match(T(n), Pattern_boundary) = True</span>.
              </p>
              <p className="text-muted-foreground">
                The linguistic cues of completion are deliberately absent, so nothing interrupts the
                consumption loop — the only way to learn the feed ends is to keep scrolling forever.
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
