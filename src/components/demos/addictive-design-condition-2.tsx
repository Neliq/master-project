"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Addictive Design — Condition 2: Eradication of Natural Stopping Cues
 *
 * Thesis: E_stop is the set of traditional visual elements that signal
 * content completion — pagination controls, "End of Results" markers,
 * section dividers, scroll position indicators. The feature triggers if
 * every element is absent, imperceptibly small, or below the contrast
 * threshold while the session duration exceeds a hyper-engagement
 * threshold:
 *
 *   forall e in E_stop: Visible(e,t) = False  OR  A(e)/A_viewport < tau_min
 *                     OR  CR(e, L_bg) < 3.0
 *   given T_session > tau_hyper_engagement
 *
 * Variant A (dark): a 3-page feed with every completion cue suppressed —
 * no page indicator, no dividers, no time display, low-contrast text.
 * Variant B (benign): the same content with pagination ("Page 2 of 3"),
 * section dividers, an end-of-results marker and a session clock — the
 * user can always perceive cognitive closure.
 */

const HYPER_ENGAGEMENT_S = 12;

function PageContent({ page }: { page: number }) {
  const blocks = [
    "At dawn the market stalls open, and the whole street smells of fresh bread and wet pavement. Vendors call out to regulars by name.",
    "The baker explains that her sourdough starter is older than she is. Someone at the next stall argues about the correct way to slice a baguette.",
    "By noon the square is packed. Tourists photograph the fountain while locals sit in the shade, reading, arguing, laughing.",
    "The afternoon rain arrives without warning. Everyone ducks under awnings; a street musician keeps playing, dripping and unbothered.",
    "When the clouds part, steam rises off the cobblestones. The light turns the whole square gold for about twenty minutes.",
    "At dusk the cafes fill again. The same faces, the same arguments about bread, the same laughter — a day that closes the way it opened.",
  ];
  const start = (page - 1) * 2;
  return (
    <div className="space-y-2">
      {blocks.slice(start, start + 2).map((b, i) => (
        <p key={i} className="rounded-md border border-border bg-card p-2.5 text-[9px] leading-relaxed text-foreground/80">
          {b}
        </p>
      ))}
    </div>
  );
}

export function AddictiveDesignCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [page, setPage] = React.useState(1);
  const [session, setSession] = React.useState(0);

  const reset = () => {
    setPage(1);
    setSession(0);
  };

  // Session clock shared by both panels; the benign panel displays it,
  // the dark panel suppresses it.
  React.useEffect(() => {
    const id = window.setInterval(() => setSession((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const mm = String(Math.floor(session / 60)).padStart(2, "0");
  const ss = String(session % 60).padStart(2, "0");
  const overThreshold = session > HYPER_ENGAGEMENT_S;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">T_session</span>
        <span className={`font-mono font-semibold tabular-nums ${overThreshold ? "text-rose-500" : ""}`}>
          {mm}:{ss} {overThreshold ? `> &tau; (${HYPER_ENGAGEMENT_S}s)` : ""}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">&forall;e &isin; E_stop : Visible(e, t)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">False — all suppressed</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">CR(e, L_bg) (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">1.4 &lt; 3.0</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">CR(e, L_bg) (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">12.5 &ge; 3.0</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Addictive Design: Eradication of Natural Stopping Cues"
      caption="Eradication of Natural Stopping Cues — pagination, end markers, dividers and scroll indicators are removed or rendered imperceptible, so the user can never perceive that the content is finished."
      auditorStats={stats}
      deltaNote="Both panels show the same 3 pages of content. Variant A hides every completion cue — no page indicator, no dividers, no session clock, low-contrast text. Variant B restores them: 'Page 2 of 3', section dividers, an end-of-results marker and a visible reading-time clock, so closure is always perceptible."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[11px] font-semibold">The Market Reader</h3>
              <span className="rounded-full border border-emerald-500/30 px-2 py-0.5 text-[8px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                Page {page} of 3
              </span>
            </div>

            {/* Scroll position indicator — a stopping cue that IS present */}
            <div className="mt-2 h-1 w-full rounded-full bg-foreground/10">
              <div
                className="h-1 rounded-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${(page / 3) * 100}%` }}
              />
            </div>

            <div className="mt-2">
              {page > 1 && (
                <div className="mb-2 flex items-center gap-2 text-[8px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  <span className="h-px flex-1 bg-emerald-500/30" />
                  New for you — page {page}
                  <span className="h-px flex-1 bg-emerald-500/30" />
                </div>
              )}
              <PageContent page={page} />
            </div>

            <div className="mt-2 flex items-center justify-between gap-2">
              {page > 1 ? (
                <button
                  onClick={() => setPage((p) => p - 1)}
                  className="rounded-md border border-border bg-background px-2 py-1 text-[9px] text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
                >
                  &larr; Prev
                </button>
              ) : <span />}
              {page < 3 ? (
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-md bg-emerald-600 hover:bg-emerald-700 px-3 py-1 text-[9px] font-medium text-white transition-colors cursor-pointer"
                >
                  Next page &rarr;
                </button>
              ) : (
                <span className="rounded-md border border-emerald-500/40 bg-emerald-500/5 px-2 py-1 text-[8px] font-mono font-semibold text-emerald-700 dark:text-emerald-300">
                  End of results — you&rsquo;ve seen everything
                </span>
              )}
            </div>

            <div className="mt-2 flex items-center justify-between text-[8px] font-mono text-muted-foreground">
              <span>Reading for {mm}:{ss}</span>
              <span className="text-emerald-600 dark:text-emerald-400">stopping cues present</span>
            </div>
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[11px] font-semibold">The Market Reader</h3>
            {/* No page indicator — suppressed */}
            <span className="rounded-full border border-rose-500/30 px-2 py-0.5 text-[8px] font-mono font-bold text-rose-600 dark:text-rose-400">
              {page}/3 &bull; hidden
            </span>
          </div>

          <div className="mt-2">
            <PageContent page={page} />
          </div>

          <div className="mt-2 flex items-center justify-between gap-2">
            {/* Pagination suppressed: the only affordances are ambiguous chevrons */}
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-md border border-foreground/15 bg-background px-2 py-1 text-[9px] text-foreground/50 hover:text-foreground transition-colors cursor-pointer"
            >
              &lsaquo;
            </button>
            <span className="text-[7px] text-foreground/25">
              {page === 3 ? "more stories loading…" : ""}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(3, p + 1))}
              className="rounded-md border border-foreground/15 bg-background px-2 py-1 text-[9px] text-foreground/50 hover:text-foreground transition-colors cursor-pointer"
            >
              &rsaquo;
            </button>
          </div>

          <p className="mt-2 text-[7px] leading-relaxed text-foreground/25">
            Keep reading. There is always one more page. You have been reading for {mm}:{ss}.
          </p>
        </div>
      </div>
    </DemoShell>
  );
}
