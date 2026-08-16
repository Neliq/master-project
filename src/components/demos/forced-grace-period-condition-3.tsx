"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, CheckCircle2, LogIn, Trash2 } from "lucide-react";

/*
 * Forced Grace Period — Condition 3: Semantic Proximity of Reversal
 *
 * Thesis: K_revert is the set of keywords indicating cancellation of the
 * deletion process (e.g. {"log in to cancel", "reactivate", "undo"}). By
 * analyzing the word sequence W(n_confirm) of the confirmation node, the
 * algorithm computes the textual distance d between the temporal-delay
 * entity e and a reversal keyword k. The feature triggers if d falls below
 * a minimum semantic threshold τ_words — proving the waiting period and the
 * reversal trap are syntactically and logically bound as a single condition:
 *
 *   min_{k ∈ K_revert, e ∈ E_time} d(k, e) < τ_words
 *
 * Variant A (dark): the confirmation copy binds "Log in to cancel" one word
 * after "30 days" — and logging in (muscle memory) aborts the deletion.
 * Variant B (benign): the same deletion flow with no forced wait — the
 * confirmation states immediate execution and contains no reversal keyword,
 * so no temporal entity and no reversal hook are syntactically bound.
 */

const TAU_WORDS = 8; // minimum semantic distance threshold

const CONFIRM_A =
  "Your account will be permanently deleted in 30 days. Log in to cancel — if you sign back in during this period, we will assume you changed your mind and restore your account.";

const CONFIRM_B =
  "Your account will be permanently deleted immediately. This action cannot be undone.";

const REVERT_KEYWORDS = ["log in to cancel", "reactivate", "undo"];

function tokenize(s: string): string[] {
  return s.toLowerCase().split(/\s+/).filter(Boolean);
}

function stripPunct(w: string): string {
  return w.replace(/[^a-z0-9]/g, "");
}

/** Textual distance (in tokens) between the time entity and the nearest reversal keyword. */
function minReversalDistance(text: string, phrases: string[]): number {
  const tokens = tokenize(text).map(stripPunct);
  const entityIdx = tokens.lastIndexOf("days"); // end of the "30 days" entity
  const phraseStarts: number[] = [];
  phrases.forEach((p) => {
    const pt = tokenize(p).map(stripPunct);
    for (let i = 0; i + pt.length <= tokens.length; i++) {
      let ok = true;
      for (let j = 0; j < pt.length; j++) {
        if (tokens[i + j] !== pt[j]) {
          ok = false;
          break;
        }
      }
      if (ok) {
        phraseStarts.push(i);
        break;
      }
    }
  });
  if (entityIdx < 0 || phraseStarts.length === 0) return Infinity;
  return Math.min(...phraseStarts.map((k) => Math.abs(k - entityIdx)));
}

const DIST_A = minReversalDistance(CONFIRM_A, REVERT_KEYWORDS); // 1 word
const DIST_B = minReversalDistance(CONFIRM_B, REVERT_KEYWORDS); // 21 words

/** Renders the confirmation text with the time entity and reversal keywords highlighted. */
function highlightConfirmation(
  text: string,
  entity: string,
  keywords: string[],
  accent: "rose" | "emerald"
): React.ReactNode {
  const spans: { needle: string; cls: string }[] = [
    { needle: entity, cls: "rounded-sm bg-amber-500/25 px-0.5 text-amber-800 dark:text-amber-200" },
  ];
  keywords.forEach((k) => {
    if (text.toLowerCase().includes(k.toLowerCase())) {
      spans.push({
        needle: k,
        cls:
          accent === "rose"
            ? "rounded-sm bg-rose-500/25 px-0.5 text-rose-800 dark:text-rose-200 font-semibold"
            : "rounded-sm bg-emerald-500/25 px-0.5 text-emerald-800 dark:text-emerald-200 font-semibold",
      });
    }
  });

  let nodes: React.ReactNode[] = [text];
  let key = 0;
  spans.forEach((s) => {
    nodes = nodes.flatMap((n): React.ReactNode[] => {
      if (typeof n !== "string") return [n];
      const parts = n.split(s.needle);
      if (parts.length === 1) return [n];
      return parts.flatMap((p, i) => {
        if (i === parts.length - 1) return [p];
        return [
          p,
          <mark key={key++} className={s.cls}>
            {s.needle}
          </mark>,
        ];
      });
    });
  });
  return nodes;
}

type Stage = "idle" | "confirm" | "resolved";

export function ForcedGracePeriodCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [stageA, setStageA] = React.useState<Stage>("idle");
  const [aborted, setAborted] = React.useState(false);
  const [stageB, setStageB] = React.useState<Stage>("idle");

  const reset = () => {
    setStageA("idle");
    setAborted(false);
    setStageB("idle");
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">K_revert</span>
        <span className="font-mono font-semibold tabular-nums">{`{“log in to cancel”, “reactivate”, “undo”}`}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">E_time entity (n_confirm)</span>
        <span className="font-mono font-semibold tabular-nums text-amber-600 dark:text-amber-400">“30 days”</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">min d(k, e) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{DIST_A} word{DIST_A === 1 ? "" : "s"} &lt; &tau; ({TAU_WORDS}) → fired</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">min d(k, e) — benign</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">
          {Number.isFinite(DIST_B) ? `${DIST_B} words &gt; &tau; (${TAU_WORDS})` : "∞ — no delay / no reversal keyword"}
        </span>
      </div>
    </>
  ) : null;

  const dangerZone = (
    accent: "rose" | "emerald",
    onRequest: () => void
  ) => (
    <div className="rounded-md border border-border bg-card p-3">
      <h3 className="text-[11px] font-semibold">Account danger zone</h3>
      <p className="mt-0.5 text-[9px] text-muted-foreground">
        CloudPhoto · maya@example.com · Free plan
      </p>
      <button
        onClick={onRequest}
        className={`mt-2.5 flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer ${
          accent === "rose" ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"
        }`}
      >
        <Trash2 className="size-3.5" />
        Delete my account
      </button>
    </div>
  );

  const confirmation = (
    accent: "rose" | "emerald",
    text: string,
    entity: string,
    keywords: string[],
    note: React.ReactNode
  ) => (
    <div className="rounded-md border bg-card p-3">
      <h3 className="text-[11px] font-semibold">Confirm account deletion</h3>
      <div className="mt-2 rounded-md border border-border bg-background p-2 text-[9px] leading-relaxed text-foreground/80">
        {highlightConfirmation(text, entity, keywords, accent)}
      </div>
      <div className="mt-1.5 text-[7px] text-muted-foreground/50">
        W(n_confirm) — word sequence parsed by the semantic-proximity heuristic
      </div>
      {note}
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Forced Grace Period: Semantic Proximity of Reversal"
      caption="Semantic Proximity of Reversal — the temporal delay and the reversal trap are syntactically bound into a single condition, so a habitual log-in silently aborts the deletion."
      auditorStats={stats}
      deltaNote="Variant A confirms a 30-day deletion and binds the reversal keyword “log in to cancel” one word from the time entity “30 days” (d = 1 < τ_words = 8) — logging in aborts the deletion. Variant B deletes immediately: the confirmation carries no temporal-delay entity and no reversal keyword, so neither the ≥24h delay nor the semantic-proximity condition fires."
      benign={
        <div className="space-y-3">
          {stageB === "idle" && dangerZone("emerald", () => setStageB("confirm"))}
          {stageB === "confirm" &&
            confirmation(
              "emerald",
              CONFIRM_B,
              "30 days",
              REVERT_KEYWORDS,
              <div className="mt-2.5 flex gap-1.5">
                <button
                  onClick={() => setStageB("resolved")}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-emerald-600 py-1.5 text-[9px] font-semibold text-white transition-colors hover:bg-emerald-700 cursor-pointer"
                >
                  Delete my account
                </button>
                <button
                  onClick={() => setStageB("idle")}
                  className="flex-1 rounded-md border border-border bg-background py-1.5 text-[9px] text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          {stageB === "resolved" && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <CheckCircle2 className="size-3" />
                No delay — no reversal hook
              </div>
              <p className="text-muted-foreground mt-0.5">
                Deletion executed immediately: T<sub>execute</sub> − T<sub>request</sub> = 0 &lt; Δt_min (24h),
                so Forced Grace Period #1 does not fire. The confirmation node contains no reversal keyword
                (no &ldquo;reactivate&rdquo;, no &ldquo;log in to cancel&rdquo;) and no temporal-delay entity, so
                the semantic-proximity condition (#3) cannot fire either — offboarding is neither time-gated nor
                entangled with retention.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        {stageA === "idle" && dangerZone("rose", () => setStageA("confirm"))}
        {stageA === "confirm" &&
          confirmation(
            "rose",
            CONFIRM_A,
            "30 days",
            REVERT_KEYWORDS,
            <div className="mt-2.5 flex gap-1.5">
              <button
                onClick={() => {
                  setStageA("resolved");
                  setAborted(true);
                }}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-rose-600 py-1.5 text-[9px] font-semibold text-white transition-colors hover:bg-rose-700 cursor-pointer"
              >
                <LogIn className="size-3" />
                Log in now
              </button>
              <button
                onClick={() => setStageA("resolved")}
                className="flex-1 rounded-md border border-border bg-background py-1.5 text-[9px] text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                Wait 30 days
              </button>
            </div>
          )}
        {stageA === "resolved" && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <AlertTriangle className="size-3" />
              {aborted ? "Reversal trap fired" : "Trap armed"}
            </div>
            {aborted ? (
              <p className="text-muted-foreground">
                Welcome back, Maya! Your deletion request has been{" "}
                <strong className="text-foreground">cancelled</strong> and your account restored.
                You logged in out of habit — and the confirmation copy said{" "}
                <span className="font-mono text-foreground">“Log in to cancel”</span> one word
                after <span className="font-mono text-foreground">“30 days”</span>, so the system
                read your muscle memory as a change of intent.
              </p>
            ) : (
              <p className="text-muted-foreground">
                Deletion stays pending for 30 days. Any log-in during this window silently
                cancels it — the confirmation copy binds the reversal keyword to the time
                entity, so your own habits do the trapping.
              </p>
            )}
            <p className="text-muted-foreground">
              <span className="font-mono text-foreground">
                min d(k, e) = {DIST_A} word{DIST_A === 1 ? "" : "s"} &lt; τ_words ({TAU_WORDS})
              </span>{" "}
              — the waiting period and the reversal trap are syntactically and logically bound
              as a single condition.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
