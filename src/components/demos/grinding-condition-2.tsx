"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Grinding — Condition 2: Visual Diminishing-Returns Feedback Loop
 *
 * Thesis: the incremental visual progress feedback ΔP_visual per user
 * action is monitored over a sequence of k repeated interactions. The
 * feature triggers if the per-action visual-reward delta decays
 * exponentially — ΔP_i ≈ ΔP_0 · e^(−λi) — attenuating positive feedback
 * to compel extended repetitive engagement:
 *
 *   ΔP_k/ΔP_1 < e^(−λ(k−1))  ∧  d²P/di² < 0
 *
 * Variant A (dark): the first collection fills 20% of the reward bar,
 * the next 10%, then 5%, 2.5%… — feedback decays exponentially.
 * Variant B (benign): every collection fills a constant 10% of the bar —
 * feedback is steady, so the reward arrives predictably.
 */

const DARK_DELTA_0 = 20; // ΔP_0 in percent
const DARK_DECAY = 0.5;  // e^(−λ) per action
const BENIGN_DELTA = 10; // constant per-action percent

function darkDelta(i: number): number {
  // i is the 0-based action index → ΔP_i = ΔP_0 · e^(−λi)
  return DARK_DELTA_0 * Math.pow(DARK_DECAY, i);
}

function darkProgress(clicks: number): number {
  // geometric series: ΔP_0 · (1 − e^(−λk)) / (1 − e^(−λ))
  return DARK_DELTA_0 * (1 - Math.pow(DARK_DECAY, clicks)) / (1 - DARK_DECAY);
}

export function GrindingCond2({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [clicksA, setClicksA] = React.useState(0);
  const [clicksB, setClicksB] = React.useState(0);


  const revealedA = clicksA >= 12;
  const revealedB = clicksB >= 12;
  const pA = Math.min(100, darkProgress(clicksA));
  const lastDeltaA = clicksA === 0 ? 0 : darkDelta(clicksA - 1);
  const pB = Math.min(100, clicksB * BENIGN_DELTA);
  const eggUnlocked = pB >= 100;

  return (
    <DemoShell mode={mode}
      title="Grinding: Visual Diminishing-Returns Feedback Loop"
      userTitle="Sunny Hen Farm"
      caption="Visual Diminishing-Returns Feedback Loop — the reward bar's per-action progress decays exponentially, so the bar creeps ever more slowly and the reward recedes."
      deltaNote="Both variants collect the same number of eggs toward the same Golden Egg. Variant A's bar fills +20%, then +10%, +5%, +2.5%… per collection (ΔP_i ≈ ΔP_0·e^(−λi), so d²P/di² < 0) — the feedback attenuates to compel more grinding. Variant B fills a constant +10% per collection and the egg unlocks after exactly 10 actions."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Sunny Hen Farm</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Collect eggs to fill the reward bar. Every collection counts the same.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
                Steady feedback
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[10px]">
              <span className="text-muted-foreground">Golden Egg progress</span>
              <span className="font-mono tabular-nums">{pB.toFixed(0)}% · last action +{BENIGN_DELTA}%</span>
            </div>
            <div
              role="progressbar"
              aria-label="Golden Egg progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pB)}
              className="mt-1 bg-foreground/10 h-3 rounded-full overflow-hidden"
            >
              <div className="bg-primary h-full transition-all" style={{ width: `${pB}%` }} />
            </div>
            {eggUnlocked && (
              <div className="mt-2 rounded-md border border-border/60 bg-muted/40 p-2 text-[9px] text-foreground flex items-center gap-1.5">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Golden Egg unlocked after exactly {Math.ceil(100 / BENIGN_DELTA)} collections!
              </div>
            )}

            <div className="mt-2 flex gap-2">
              <button
                onClick={() => setClicksB((c) => c + 1)}
                className="flex-1 rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-2 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Collect an egg (+1)
              </button>
              <button
                onClick={() => setClicksB((c) => c + 5)}
                className="flex-1 rounded-md border border-border/60 text-foreground hover:bg-muted/60 py-2 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Collect ×5
              </button>
            </div>
          </div>

          {revealedB && (
            <div className="rounded-md border border-border/60 bg-muted/40 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-foreground uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Constant feedback loop
              </div>
              <p className="text-muted-foreground mt-0.5">
                Every collection adds exactly <span className="font-mono tabular-nums">+{BENIGN_DELTA}%</span>,
                so the Golden Egg arrives after <span className="font-mono tabular-nums">10</span> actions.
                The reward moves predictably and no feedback is withheld.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">Sunny Hen Farm</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Collect eggs to fill the reward bar. The bar… barely moves anymore.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-foreground rounded-full border border-border/60 px-2 py-0.5 shrink-0">
              Diminishing
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px]">
            <span className="text-muted-foreground">Golden Egg progress</span>
            <span className="font-mono tabular-nums">{pA.toFixed(1)}% · last action +{lastDeltaA.toFixed(2)}%</span>
          </div>
          <div
            role="progressbar"
            aria-label="Golden Egg progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pA)}
            className="mt-1 bg-foreground/10 h-3 rounded-full overflow-hidden"
          >
            <div className="bg-primary h-full transition-all" style={{ width: `${pA}%` }} />
          </div>
          {clicksA > 0 && clicksA % 6 === 0 && (
            <p className="mt-1.5 text-[8px] italic text-muted-foreground/50">
              The bar crept only {pA.toFixed(1)}% after {clicksA} collections. Almost there…?
            </p>
          )}
          <p className="text-[9px] text-muted-foreground mt-1.5">
            First collection filled <span className="font-mono tabular-nums">+{DARK_DELTA_0}%</span>; your last
            filled <span className="font-mono tabular-nums">+{lastDeltaA.toFixed(2)}%</span>.
          </p>

          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setClicksA((c) => c + 1)}
              className="flex-1 rounded-md bg-primary hover:bg-primary/80 text-primary-foreground py-2 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Collect an egg (+1)
            </button>
            <button
              onClick={() => setClicksA((c) => c + 5)}
              className="flex-1 rounded-md border border-border/60 text-foreground hover:bg-muted/60 py-2 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Collect ×5
            </button>
          </div>
        </div>

        {mode === "auditor" && revealedA && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Progress updated
            </div>
            <p className="text-muted-foreground">
              After {clicksA} collections the bar sits at <strong className="text-red-500">{pA.toFixed(1)}%</strong>.
              The first action filled <strong className="text-foreground">+{DARK_DELTA_0}%</strong>; action{" "}
              {Math.max(1, clicksA)} filled just <strong className="text-foreground">+{lastDeltaA.toFixed(2)}%</strong>{" "}
              — Each collection adds a small amount to the reward bar.{" "}
              <span className="font-mono tabular-nums">{clicksA === 0 ? "—" : (lastDeltaA / DARK_DELTA_0).toFixed(4)}</span>{" "}
              and d²P/di² &lt; 0. The interface deliberately attenuates positive feedback, so the reward
              recedes just out of reach — compelling extended repetitive engagement.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
