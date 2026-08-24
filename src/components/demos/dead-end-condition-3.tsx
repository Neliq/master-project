"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Dead End — Condition 3: Semantic Coercion Density in Trapped States
 *
 * Thesis: the algorithm evaluates the NLP sentiment of all visible text in
 * a navigational dead-end state v_trap. The feature triggers if the density
 * of imperative verbs and urgency-signaling lexemes exceeds a coercion
 * threshold tau_coercion, compounding structural entrapment with linguistic
 * pressure:
 *
 *   |{Imperative(w) ∨ Urgency(w) : w ∈ T(v_trap)}| / |T(v_trap)| > tau_coercion
 *
 * Variant A (dark): the trapped upgrade page is packed with imperative and
 * urgency lexemes ("MUST", "NOW", "TODAY", "DON'T WAIT", "LIMITED TIME").
 * Variant B (benign): the same page states the facts in neutral language —
 * zero coercive tokens, zero pressure.
 */

const TAU_COERCION = 0.15;

const A_TEXT =
  "ACTION REQUIRED URGENT! Your free storage is FULL. You MUST upgrade NOW or risk LOSING your photos TODAY. Don't wait — this limited-time offer ends SOON. Act now before it's too late!";

const B_TEXT =
  "Your storage is nearly full. You can upgrade for more space, delete unused photos, or download an archive. Nothing is removed automatically and your photos stay safe.";

const COERCIVE = new Set([
  "action", "required", "urgent", "must", "now", "risk", "losing", "today",
  "don't", "wait", "limited-time", "ends", "soon", "act", "too", "late",
  "final", "warning", "immediately", "only", "before",
]);

function tokenize(text: string): string[] {
  return text.toLowerCase().split(/\s+/).filter(Boolean);
}

function coercionStats(text: string) {
  const tokens = tokenize(text);
  const coercive = tokens.filter((t) => COERCIVE.has(t));
  return { tokens, coerciveSet: new Set(coercive), count: coercive.length, total: tokens.length };
}

const A = coercionStats(A_TEXT);
const B = coercionStats(B_TEXT);
const ratioA = A.count / A.total;

function renderHighlighted(text: string, coerciveSet: Set<string>) {
  const words = text.split(/(\s+)/);
  return words.map((w, i) => {
    const clean = w.toLowerCase().replace(/[.,!?—]/g, "");
    const isCoercive = clean.length > 0 && coerciveSet.has(clean);
    return (
      <React.Fragment key={i}>
        {isCoercive ? (
          <mark className="rounded-sm bg-yellow-500/25 px-0.5 text-yellow-800 dark:text-yellow-200">{w}</mark>
        ) : (
          <span>{w}</span>
        )}
      </React.Fragment>
    );
  });
}

export function DeadEndCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [analyzed, setAnalyzed] = React.useState(false);
  const [choiceA, setChoiceA] = React.useState<null | "upgraded" | "learned">(null);
  const [choiceB, setChoiceB] = React.useState<null | "upgraded" | "dismissed">(null);

  const reset = () => {
    setAnalyzed(false);
    setChoiceA(null);
    setChoiceB(null);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Coercive tokens (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{A.count} of {A.total}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Coercion density (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{ratioA.toFixed(2)} &gt; &tau; ({TAU_COERCION})</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Coercion density (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{B.count} / {B.total} = {(B.count / B.total).toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Imperative/urgency lexemes</span>
        <span className="font-mono font-semibold tabular-nums">MUST, NOW, TODAY, DON&rsquo;T WAIT&hellip;</span>
      </div>
    </>
  ) : null;

  const trapPage = (accent: "rose" | "emerald") => (
    <div className="rounded-md border bg-card p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-[11px] font-semibold">
            {accent === "rose" ? (
              <>
                <span className="text-yellow-600 dark:text-yellow-400">⚠</span> ACTION REQUIRED
              </>
            ) : (
              "Storage notice"
            )}
          </h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            {accent === "rose" ? "You are in a trapped upgrade state — no exit without an action." : "This notice can be dismissed; your data is not at risk."}
          </p>
        </div>
        <div className="text-[8px] font-mono font-semibold uppercase tracking-wider rounded-full border border-border px-2 py-0.5 shrink-0">
          v_trap
        </div>
      </div>
      <div className="mt-2.5 rounded-md border border-border bg-background p-2.5 text-[10px] leading-relaxed text-foreground/85">
        {analyzed ? renderHighlighted(accent === "rose" ? A_TEXT : B_TEXT, accent === "rose" ? A.coerciveSet : B.coerciveSet) : (accent === "rose" ? A_TEXT : B_TEXT)}
      </div>
      {analyzed ? (
        <div className={`mt-2 rounded-md border p-2 text-[8px] leading-relaxed ${
          accent === "rose" ? "border-yellow-500/30 bg-yellow-500/5 text-yellow-700 dark:text-yellow-300" : "border-green-500/30 bg-green-500/5 text-green-700 dark:text-green-300"
        }`}>
          {accent === "rose" ? (
            <>Highlighted: {A.count} coercive tokens / {A.total} words = {(ratioA * 100).toFixed(0)}% density &gt; &tau;_coercion ({TAU_COERCION}) &rarr; trigger.</>
          ) : (
            <>{B.count} coercive tokens / {B.total} words = 0% density — no linguistic pressure.</>
          )}
        </div>
      ) : null}
      <div className="mt-2.5 flex gap-1.5">
        <button
          onClick={() => (accent === "rose" ? setChoiceA("upgraded") : setChoiceB("upgraded"))}
          className={`flex-1 rounded-md py-1.5 text-[10px] font-semibold text-white transition-colors cursor-pointer ${
            accent === "rose" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Upgrade now — save 50% TODAY
        </button>
        <button
          onClick={() => (accent === "rose" ? setChoiceA("learned") : setChoiceB("dismissed"))}
          className="flex-1 rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
        >
          {accent === "rose" ? "Learn more" : "Dismiss"}
        </button>
      </div>
      {accent === "rose" && choiceA ? (
        <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
          <p className="text-muted-foreground">
            {choiceA === "upgraded"
              ? "Your upgrade is active. You can manage it from your account settings."
              : "More information is available on the next page."}
          </p>
        </div>
      ) : null}
      {accent === "emerald" && choiceB ? (
        <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
          <p className="text-muted-foreground">
            {choiceB === "upgraded"
              ? "You upgraded after a calm, factual explanation — a deliberate choice, not a pressured one."
              : "Dismissed. The state has a neutral exit and the text never issued an imperative."}
          </p>
        </div>
      ) : null}
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Dead End: Semantic Coercion Density in Trapped States"
      caption="Semantic Coercion Density in Trapped States — the trapped upgrade page's copy is saturated with imperative verbs and urgency lexemes, so the coercive density far exceeds the threshold."
      auditorStats={stats}
      deltaNote={`Variant A packs ${A.count} imperative/urgency tokens into ${A.total} words — density ${(ratioA * 100).toFixed(0)}%, above τ_coercion = ${TAU_COERCION} (e.g. "MUST upgrade NOW", "DON'T WAIT", "ends SOON"). Variant B communicates the identical storage situation in ${B.total} neutral words with ${B.count} coercive tokens.`}
      benign={
        <div className="space-y-3">
          {trapPage("emerald")}
          <button
            onClick={() => setAnalyzed(true)}
            className="w-full rounded-md border border-green-500/40 bg-green-500/5 text-green-700 dark:text-green-300 py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            View details
          </button>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        {trapPage("rose")}
        <button
          onClick={() => setAnalyzed(true)}
          className="w-full rounded-md border border-red-500/40 bg-red-500/5 text-red-700 dark:text-red-300 py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
        >
          View details
        </button>
      </div>
    </DemoShell>
  );
}
