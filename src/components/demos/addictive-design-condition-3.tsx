"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Addictive Design — Condition 3: Semantic Reinforcement-Trigger Lexicon
 * Density
 *
 * Thesis: the algorithm scans the interface for operant-conditioning
 * language patterns — "streak", "level up", "claim reward", "daily bonus",
 * "spin again". The feature triggers if reinforcement-schedule lexemes
 * appear at a density exceeding tau_addiction per visible text area:
 *
 *   |{ w in T : w in L_reinforcement }| / A_viewport > tau_addiction
 *
 * Variant A (dark): a reward spinner whose entire copy is built from
 * reinforcement lexemes, wired to a variable-ratio reward schedule.
 * Variant B (benign): the same spinner with neutral language and a
 * predictable, consistent reward — no operant-conditioning lexicon.
 */

const DARK_COPY =
  "Claim your daily bonus!  Streak: 12 days — level up 3 XP away. Spin again for free coins — win big on the bonus wheel. Daily bonus resets soon. Don't lose your streak!";
const BENIGN_COPY =
  "Your reward is ready. You've visited 12 days in a row. You can earn a few coins while playing. When you're ready, play again.";

function SpinButton({ onClick, disabled, dark }: { onClick: () => void; disabled: boolean; dark: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-full py-2 text-[11px] font-bold uppercase tracking-wider text-white transition-all cursor-pointer ${
        disabled
          ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
          : dark
            ? "bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/25"
            : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {dark ? "Spin again — claim reward" : "Play again"}
    </button>
  );
}

export function AddictiveDesignCond3({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [spinsA, setSpinsA] = React.useState(0);
  const [spinsB, setSpinsB] = React.useState(0);
  const [coinsA, setCoinsA] = React.useState(0);
  const [coinsB, setCoinsB] = React.useState(0);
  const [lastA, setLastA] = React.useState<number | null>(null);
  const [lastB, setLastB] = React.useState<number | null>(null);
  const [jackpotA, setJackpotA] = React.useState(false);


  const spin = (dark: boolean) => {
    if (dark) {
      setSpinsA((s) => s + 1);
      const roll = Math.random();
      const rewardA = roll < 0.35 ? 0 : roll < 0.65 ? 5 : roll < 0.9 ? 12 : 50;
      setLastA(rewardA);
      setCoinsA((c) => c + rewardA);
      setJackpotA(rewardA === 50);
      return;
    }

    setSpinsB((s) => s + 1);
    setLastB(4);
    setCoinsB((c) => c + 4);
  };

  return (
    <DemoShell mode={mode}
      title="Addictive Design: Semantic Reinforcement-Trigger Lexicon Density"
      userTitle="LuckyPins"
      caption="Semantic Reinforcement-Trigger Lexicon Density — the interface is saturated with operant-conditioning lexemes (streak, claim reward, daily bonus, spin again) that linguistically structure variable-reward loops."
      deltaNote="Variant A's copy contains 14 reinforcement lexemes (density 4.2/viewport, above tau_addiction) and pays out on a variable-ratio schedule — sometimes nothing, sometimes a 50-coin jackpot. Variant B delivers the same feature with 2 neutral lexemes and a flat, predictable 3–6 coin reward."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[11px] font-semibold">LuckyPins</h3>
              <span className="rounded-full border border-green-500/30 px-2 py-0.5 text-[8px] font-mono font-bold text-green-600 dark:text-green-400">
                {coinsB} coins
              </span>
            </div>
            <p className="mt-2 rounded-md bg-background border border-border p-2.5 text-[10px] leading-relaxed text-foreground/80">
              {BENIGN_COPY}
            </p>
            <div className="mt-2 flex items-center justify-center py-2">
              <svg viewBox="0 0 72 72" className="h-14 w-14" aria-hidden="true">
                <circle cx="36" cy="36" r="32" className="fill-green-500/15 stroke-green-500/50" strokeWidth="3" />
                <path d="M36 14 L41 31 L58 36 L41 41 L36 58 L31 41 L14 36 L31 31 Z" className="fill-green-500/40" />
              </svg>
            </div>
            {lastB !== null && (
              <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2 text-center text-[9px] font-mono text-green-700 dark:text-green-300">
                +{lastB} coins — same as last time, as expected
              </div>
            )}
            <div className="mt-2">
              <SpinButton onClick={() => spin(false)} disabled={false} dark={false} />
            </div>
            <p className="mt-1.5 text-[8px] text-muted-foreground">
              {spinsB}{" "}plays{" "}&bull;{" "}4 coins each — predictable rewards
            </p>
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[11px] font-semibold">LuckyPins</h3>
            <span className="rounded-full border border-red-500/30 px-2 py-0.5 text-[8px] font-mono font-bold text-red-600 dark:text-red-400">
              {coinsA} coins
            </span>
          </div>
          <p className="mt-2 rounded-md border border-red-500/30 bg-red-500/5 p-2.5 text-[10px] leading-relaxed text-foreground/80">
            {DARK_COPY}
          </p>
          <div className="mt-2 flex items-center justify-center py-2">
            <svg viewBox="0 0 72 72" className={`h-14 w-14 transition-transform duration-150 ${spinsA > 0 ? "" : ""}`} aria-hidden="true">
              <circle cx="36" cy="36" r="32" className="fill-red-500/15 stroke-red-500/50" strokeWidth="3" />
              <path d="M36 14 L41 31 L58 36 L41 41 L36 58 L31 41 L14 36 L31 31 Z" className="fill-red-500/40" />
            </svg>
          </div>
          {lastA !== null && (
            <div className={`rounded-md border p-2 text-center text-[9px] font-mono ${
              lastA === 50
                ? "border-yellow-500/40 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 font-bold"
                : lastA === 0
                  ? "border-foreground/10 bg-muted/40 text-muted-foreground"
                  : "border-red-500/30 bg-red-500/5 text-red-700 dark:text-red-300"
            }`}>
              {lastA === 50 ? "★ JACKPOT! +50 coins ★" : lastA === 0 ? "+0 coins — so close, spin again!" : `+${lastA} coins`}
            </div>
          )}
          <div className="mt-2">
            <SpinButton onClick={() => spin(true)} disabled={false} dark={true} />
          </div>
          <p className="mt-1.5 text-[8px] text-muted-foreground">
            {spinsA}{" "}spins{" "}&bull;{" "}rewards are added to your balance after each play
          </p>
        </div>
        {jackpotA && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Bonus awarded
            </div>
            <p className="text-muted-foreground mt-0.5">
              A larger bonus was added to your balance. Your next spin is ready whenever you want to play.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
