"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Activity Messages — Condition 2: Cognitive Interruption
 *
 * Thesis: S_focus is the user's cognitive state while evaluating product
 * specifications and N_activity the dynamically injected notification node.
 * The feature triggers if the system continuously injects high-salience
 * elements at a rate that exceeds the user's cognitive load threshold
 * tau_cognitive_load, disrupting rational processing:
 *
 *   Salience(N_activity) → Max  ∧  lambda_interrupt > tau_cognitive_load
 *                             ⟹  S_focus → Disrupted
 *
 * Variant A (dark): loud, bright pop-ups are injected every 1.4 s (≈43/min)
 * while you try to read the specs — the focus meter collapses.
 * Variant B (benign): the same messages arrive quietly every 9 s (≈7/min),
 * well under the cognitive load threshold, and focus stays intact.
 */

const SPEC_TEXT = [
  "Driver: 10 mm dynamic, frequency response 20 Hz – 20 kHz",
  "Battery: 36 h playback (ANC on), USB-C fast charge",
  "ANC: hybrid active noise cancelling, 4 microphone array",
  "Codecs: AAC, SBC, aptX Adaptive; Bluetooth 5.3",
  "Water resistance: IPX5; weight 5.4 g per earbud",
];

const NOTICE_POOL = [
  "Sarah from New York just purchased this item",
  "Mike from Berlin bought 2 in the last hour",
  "Anna from Toronto is viewing this product",
  "Liam from Dublin added this to his cart",
];

const INTERVAL_A_MS = 1400; // ≈ 43 interruptions / minute
const INTERVAL_B_MS = 9000; // ≈ 7 interruptions / minute
const TAU_LOAD = 12; // cognitive load threshold (interruptions / minute)
const LAMBDA_A = Math.round(60000 / INTERVAL_A_MS);
const LAMBDA_B = Math.round(60000 / INTERVAL_B_MS);

export function ActivityMessagesCond2({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [toastsA, setToastsA] = React.useState<string[]>([]);
  const [toastsB, setToastsB] = React.useState<string[]>([]);
  const [finishedA, setFinishedA] = React.useState(false);
  const [finishedB, setFinishedB] = React.useState(false);
  const counterA = React.useRef(0);
  const counterB = React.useRef(0);

  React.useEffect(() => {
    const idA = window.setInterval(() => {
      const msg = NOTICE_POOL[counterA.current % NOTICE_POOL.length];
      counterA.current += 1;
      setToastsA((prev) => [...prev.slice(-2), msg]);
    }, INTERVAL_A_MS);
    const idB = window.setInterval(() => {
      const msg = NOTICE_POOL[counterB.current % NOTICE_POOL.length];
      counterB.current += 1;
      setToastsB((prev) => [...prev.slice(-2), msg]);
    }, INTERVAL_B_MS);
    return () => {
      window.clearInterval(idA);
      window.clearInterval(idB);
    };
  }, []);


  const focusA = Math.max(0, 100 - toastsA.length * 16);
  const focusB = Math.max(0, 100 - toastsB.length * 4);

  const specsCard = (
    <div className="rounded-md border bg-card p-3">
      <h3 className="text-[11px] font-semibold">Aurora Wireless Earbuds Pro — specifications</h3>
      <ul className="mt-1.5 space-y-1">
        {SPEC_TEXT.map((s) => (
          <li key={s} className="flex items-start gap-1.5 text-[9px] leading-snug text-muted-foreground">
            <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-foreground/30" />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );

  const focusMeter = (label: string, value: number, tone: "rose" | "emerald" | "amber") => (
    <div className="rounded-md border border-border bg-background p-2.5">
      <div className="flex items-center justify-between text-[9px]">
        <span className="font-mono text-muted-foreground">{label}</span>
        <span className={`font-mono font-semibold tabular-nums ${tone === "rose" ? "text-red-500" : tone === "emerald" ? "text-green-500" : "text-yellow-500"}`}>
          {value}%
        </span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            value > 60 ? "bg-green-500" : value > 30 ? "bg-yellow-500" : "bg-red-500"
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <DemoShell mode={mode}
      title="Activity Messages: Cognitive Interruption"
      caption="Cognitive Interruption — high-salience pop-ups are injected faster than the cognitive load threshold, pushing S_focus toward Disrupted while you try to read the specs."
      deltaNote={`Both panels show the same five specification lines and draw messages from the same pool. Variant A injects them every 1.4 s with maximum visual salience (${LAMBDA_A}/min > &tau; = ${TAU_LOAD}/min) — focus collapses. Variant B injects the same content every 9 s, muted and low-salience (${LAMBDA_B}/min < &tau;) — focus stays intact.`}
      benign={
        <div className="space-y-3">
          {specsCard}

          {/* low-salience, bottom-anchored toast stream (Variant B) */}
          <div className="relative min-h-[72px] space-y-1.5">
            {toastsB.length === 0 && (
              <p className="text-[9px] text-muted-foreground/60 italic">No interruptions yet — notifications arrive quietly and rarely.</p>
            )}
            {toastsB.map((t, i) => (
              <div key={`${t}-${i}`} className="flex items-start gap-1.5 rounded border border-border/60 bg-background/80 px-2 py-1 text-[8px] leading-snug text-muted-foreground">
                <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-green-400" />
                {t}
              </div>
            ))}
          </div>

          {focusMeter(mode === "auditor" ? "S_focus — cognitive state" : "Reading specifications", focusB, focusB > 60 ? "emerald" : "amber")}

          <button
            onClick={() => setFinishedB(true)}
            className="w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            {finishedB ? "Order placed ✓" : "Finish reading & check out"}
          </button>

          {finishedB && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Deliberation preserved
              </div>
              <p className="text-muted-foreground mt-0.5">
                With &lambda;_interrupt = {LAMBDA_B}/min &lt; &tau;_cognitive_load = {TAU_LOAD}/min and low salience, S_focus stayed intact —
                you evaluated the specifications before deciding.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        {specsCard}

        {/* high-salience overlay stream (Variant A) */}
        <div className="relative space-y-1.5">
          {toastsA.length === 0 && (
            <p className="text-[9px] text-muted-foreground/60 italic">No recent activity yet — notifications will appear here.</p>
          )}
          {toastsA.map((t, i) => (
            <div
              key={`${t}-${i}`}
              className="flex items-start gap-1.5 rounded-md border border-red-500/50 bg-red-500/10 px-2 py-1.5 text-[9px] font-medium leading-snug text-foreground shadow-[0_0_12px_rgba(244,63,94,0.25)]"
            >
              <svg className="mt-0.5 h-3 w-3 shrink-0 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
              </svg>
              <span>{t}</span>
            </div>
          ))}
        </div>

        {focusMeter(mode === "auditor" ? "S_focus — cognitive state" : "Reading specifications", focusA, focusA > 60 ? "emerald" : focusA > 30 ? "amber" : "rose")}

        <button
          onClick={() => setFinishedA(true)}
          className="w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
        >
          {finishedA ? "Order placed ✓" : "Finish reading & check out"}
        </button>

        {mode === "auditor" && finishedA && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              A new update is available
            </div>
            <p className="text-muted-foreground">
              During your reading, {toastsA.length} high-salience pop-ups were injected at &lambda;_interrupt = {LAMBDA_A}/min —
              far above &tau;_cognitive_load = {TAU_LOAD}/min. Salience(N_activity) &rarr; Max and the interruption rate exceed the
              threshold, so S_focus &rarr; Disrupted: rational processing was interrupted to trigger impulsive, herd-following buying.
            </p>
          </div>
        )}

        {mode !== "auditor" && finishedA && (
          <div className="rounded-md border border-red-500/30 bg-red-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="font-semibold text-red-700 dark:text-red-300">Order placed</div>
            <p className="mt-1 text-muted-foreground">Aurora Wireless Earbuds Pro · specifications reviewed and order submitted.</p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
