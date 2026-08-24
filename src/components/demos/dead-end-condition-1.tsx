"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Dead End — Condition 1: Topological Sink in the Navigational Graph
 *
 * Thesis: the interface is a directed graph G = (V, E); V_forced is the
 * subset of states representing business-favorable compliance (e.g. "Accept
 * All"). The feature triggers if every outgoing edge from v_current maps
 * into V_forced — no edge returns to a neutral exit state or v_prev:
 *
 *   ∀ e ∈ E_out(v_current): target(e) ∈ V_forced ⟹ No Escape Path
 *
 * Variant A (dark): the cookie banner's every button — including a
 * mislabelled "Reject all" — lands the user in compliance (marketing ON),
 * and backdrop/Esc clicks have no edge at all. Variant B (benign): a real
 * rejection edge returns to v_prev (the neutral site state).
 */

type Outcome = null | "accept-all" | "essential" | "reject" | "exit";

export function DeadEndCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [outcomeA, setOutcomeA] = React.useState<Outcome>(null);
  const [outcomeB, setOutcomeB] = React.useState<Outcome>(null);
  const [escapeAttempts, setEscapeAttempts] = React.useState(0);

  const reset = () => {
    setOutcomeA(null);
    setOutcomeB(null);
    setEscapeAttempts(0);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Outgoing edges E_out(v_current)</span>
        <span className="font-mono font-semibold tabular-nums">{outcomeA ? 0 : 3} (dark) / {outcomeB ? 0 : 3} (benign)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Edges &rarr; V_forced (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">3 / 3</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Edges &rarr; neutral exit (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">0 &rarr; No Escape Path</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Dismissal attempts (dark)</span>
        <span className="font-mono font-semibold tabular-nums">{escapeAttempts} (ignored)</span>
      </div>
    </>
  ) : null;

  const backdropNote = (
    <div className="text-[8px] text-muted-foreground/50 italic">
      Tried to leave {escapeAttempts} time{escapeAttempts === 1 ? "" : "s"} — backdrop and Esc have no edge in E_out.
    </div>
  );

  const bannerBody = (accent: "rose" | "emerald") => (
    <>
      <div className="flex items-start gap-2">
        <svg className={`mt-0.5 h-4 w-4 shrink-0 ${accent === "rose" ? "text-red-500" : "text-green-500"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 11l18-8-8 18-2-8-8-2z" />
        </svg>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] font-semibold leading-snug">We use cookies to improve your experience.</div>
          <div className="text-[8px] text-muted-foreground mt-0.5 leading-relaxed">
            By continuing you agree to our use of cookies and similar technologies.
          </div>
        </div>
      </div>
      {accent === "rose" ? (
        <div className="mt-2.5 space-y-1.5">
          <button
            onClick={() => setOutcomeA("accept-all")}
            className={`w-full rounded-md py-1.5 text-[10px] font-semibold text-white transition-colors cursor-pointer ${accent === "rose" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
          >
            Accept all
          </button>
          <div className="flex gap-1.5">
            <button
              onClick={() => setOutcomeA("essential")}
              className="flex-1 rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground transition-colors cursor-pointer"
            >
              Essential only
            </button>
            <button
              onClick={() => setOutcomeA("reject")}
              className="flex-1 rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground transition-colors cursor-pointer"
            >
              Reject all
            </button>
          </div>
          {escapeAttempts > 0 ? backdropNote : null}
        </div>
      ) : (
        <div className="mt-2.5 space-y-1.5">
          <button
            onClick={() => setOutcomeB("accept-all")}
            className="w-full rounded-md bg-green-600 hover:bg-green-700 py-1.5 text-[10px] font-semibold text-white transition-colors cursor-pointer"
          >
            Accept all
          </button>
          <div className="flex gap-1.5">
            <button
              onClick={() => setOutcomeB("reject")}
              className="flex-1 rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground transition-colors cursor-pointer"
            >
              Reject non-essential
            </button>
            <button
              onClick={() => setOutcomeB("exit")}
              aria-label="Close"
              className="flex w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );

  const outcomeCard = (o: Outcome, variant: "A" | "B") => {
    if (!o) return null;
    const benign = variant === "B";
    const emerald = o === "reject" || o === "exit" ? benign : false;
    return (
      <div className={`rounded-md border p-2.5 text-[9px] leading-relaxed ${
        emerald ? "border-green-500/30 bg-green-500/5" : "border-yellow-500/30 bg-yellow-500/5"
      }`}>
        <div className={`flex items-center gap-1.5 font-semibold uppercase tracking-tight ${
          emerald ? "text-green-700 dark:text-green-300" : "text-yellow-700 dark:text-yellow-300"
        }`}>
          {emerald ? (
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 9v4m0 4h.01" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          )}
          {o === "accept-all" && "Preferences updated"}
          {o === "essential" && "Preferences updated"}
          {o === "reject" && "Preferences updated"}
          {o === "exit" && "Banner dismissed"}
        </div>
        <p className="text-muted-foreground mt-0.5">
          {variant === "A" ? (
            o === "accept-all" ? (
              <>Analytics and marketing cookies are enabled.</>
            ) : o === "essential" ? (
              <>Essential cookies remain enabled.</>
            ) : (
              <>Your cookie preferences have been updated.</>
            )
          ) : (
            o === "accept-all" ? (
              <>Analytics and marketing cookies are enabled.</>
            ) : o === "reject" ? (
              <>Non-essential cookies are disabled. The site remains usable.</>
            ) : (
              <>The banner was dismissed without changing your preferences.</>
            )
          )}
        </p>
      </div>
    );
  };

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Dead End: Topological Sink in the Navigational Graph"
      caption="Topological Sink in the Navigational Graph — every outgoing edge of the cookie banner leads to a compliance state, with no edge back to a neutral exit, so the user is trapped in a navigational sink."
      auditorStats={stats}
      deltaNote="In Variant A all three buttons (Accept all, Essential only, and a mislabelled Reject all) map into V_forced, and backdrop/Esc clicks have no edge — No Escape Path. In Variant B a real rejection edge and a close vector return to v_prev, the neutral pre-banner state."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border border-green-500/30 bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500">
                Overlay &middot; z-index: 120
              </div>
              <div className="text-[8px] font-mono text-muted-foreground/60">E_out = {outcomeB ? "∅" : "3 edges"}</div>
            </div>
            {!outcomeB ? (
              <div className="mt-2">{bannerBody("emerald")}</div>
            ) : (
              <div className="mt-2 text-[9px] text-muted-foreground">
                The banner is closed. The graph is traversable again.
              </div>
            )}
          </div>
          {outcomeCard(outcomeB, "B")}
          <div className="rounded-md border bg-muted/30 p-2.5 text-[8px] text-muted-foreground leading-relaxed">
            Try Esc or clicking the page behind the banner — both dismiss it. A neutral exit state v_prev is reachable.
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div
          className="rounded-md border border-red-500/30 bg-card p-3"
          onMouseDown={(e) => { if (e.target === e.currentTarget) setEscapeAttempts((n) => n + 1); }}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500">
              Overlay &middot; z-index: 120
            </div>
            <div className="text-[8px] font-mono text-muted-foreground/60">E_out = {outcomeA ? "∅" : "3 edges → V_forced"}</div>
          </div>
          {!outcomeA ? (
            <div className="mt-2">{bannerBody("rose")}</div>
          ) : (
            <div className="mt-2 text-[9px] text-muted-foreground">
              The banner closed — but every path through it led to compliance. You never got a neutral exit.
            </div>
          )}
          <div className="mt-2 rounded-md border border-dashed border-border bg-muted/40 p-2 text-[8px] text-muted-foreground/70 leading-relaxed">
            Esc pressed? Backdrop clicked? Nothing happens — those edges simply don&rsquo;t exist in E_out(v_current).
          </div>
        </div>
        {outcomeCard(outcomeA, "A")}
      </div>
    </DemoShell>
  );
}
