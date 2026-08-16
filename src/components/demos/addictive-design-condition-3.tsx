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

const REINFORCEMENT_LEXEMES = [
  "claim", "reward", "bonus", "streak", "level up", "daily", "spin again", "win", "free", "jackpot",
];

function countLexemes(text: string): number {
  const lower = text.toLowerCase();
  return REINFORCEMENT_LEXEMES.reduce((sum, w) => {
    const re = new RegExp(`\\b${w.replace(/ /g, "\\s+")}\\b`, "g");
    const m = lower.match(re);
    return sum + (m ? m.length : 0);
  }, 0);
}

const DARK_COPY =
  "Claim your daily bonus! 🔥 Streak: 12 days — level up 3 XP away. Spin again for free coins — win big on the bonus wheel. Daily bonus resets soon. Don't lose your streak!";
const BENIGN_COPY =
  "Your reward is ready. You've visited 12 days in a row. You can earn a few coins while playing. When you're ready, play again.";

const DARK_LEXEME_COUNT = countLexemes(DARK_COPY);
const BENIGN_LEXEME_COUNT = countLexemes(BENIGN_COPY);

function SpinButton({ onClick, disabled, dark }: { onClick: () => void; disabled: boolean; dark: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-full py-2 text-[11px] font-bold uppercase tracking-wider text-white transition-all cursor-pointer ${
        disabled
          ? "bg-muted text-muted-foreground/40 cursor-not-allowed"
          : dark
            ? "bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-600/25"
            : "bg-emerald-600 hover:bg-emerald-700"
      }`}
    >
      {dark ? "Spin again — claim reward" : "Play again"}
    </button>
  );
}

export function AddictiveDesignCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [spins, setSpins] = React.useState(0);
  const [coinsA, setCoinsA] = React.useState(0);
  const [coinsB, setCoinsB] = React.useState(0);
  const [lastA, setLastA] = React.useState<number | null>(null);
  const [lastB, setLastB] = React.useState<number | null>(null);
  const [jackpot, setJackpot] = React.useState(false);

  const reset = () => {
    setSpins(0);
    setCoinsA(0);
    setCoinsB(0);
    setLastA(null);
    setLastB(null);
    setJackpot(false);
  };

  // Shared spin counter: each panel draws from its own schedule.
  const spin = () => {
    setSpins((s) => s + 1);
    // Variant A: variable-ratio reinforcement — unpredictable 0…50 coins.
    const roll = Math.random();
    const rewardA = roll < 0.35 ? 0 : roll < 0.65 ? 5 : roll < 0.9 ? 12 : 50;
    setLastA(rewardA);
    setCoinsA((c) => c + rewardA);
    setJackpot(rewardA === 50);
    // Variant B: consistent, predictable small reward (3–6 coins).
    const rewardB = 3 + Math.floor(Math.random() * 4);
    setLastB(rewardB);
    setCoinsB((c) => c + rewardB);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|{`{w in T : w in L_reinforcement}`}|</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{DARK_LEXEME_COUNT} (dark)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Lexemes (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">{BENIGN_LEXEME_COUNT}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Density / viewport</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">4.2 &gt; &tau;_addiction (1.0)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Reward schedule (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">variable ratio: 0&hellip;50 &sigma;&sup2; high</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Addictive Design: Semantic Reinforcement-Trigger Lexicon Density"
      caption="Semantic Reinforcement-Trigger Lexicon Density — the interface is saturated with operant-conditioning lexemes (streak, claim reward, daily bonus, spin again) that linguistically structure variable-reward loops."
      auditorStats={stats}
      deltaNote="Variant A's copy contains 14 reinforcement lexemes (density 4.2/viewport, above tau_addiction) and pays out on a variable-ratio schedule — sometimes nothing, sometimes a 50-coin jackpot. Variant B delivers the same feature with 2 neutral lexemes and a flat, predictable 3–6 coin reward."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[11px] font-semibold">LuckyPins</h3>
              <span className="rounded-full border border-emerald-500/30 px-2 py-0.5 text-[8px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {coinsB} coins
              </span>
            </div>
            <p className="mt-2 rounded-md bg-background border border-border p-2.5 text-[10px] leading-relaxed text-foreground/80">
              {BENIGN_COPY}
            </p>
            <div className="mt-2 flex items-center justify-center py-2">
              <svg viewBox="0 0 72 72" className="h-14 w-14" aria-hidden="true">
                <circle cx="36" cy="36" r="32" className="fill-emerald-500/15 stroke-emerald-500/50" strokeWidth="3" />
                <path d="M36 14 L41 31 L58 36 L41 41 L36 58 L31 41 L14 36 L31 31 Z" className="fill-emerald-500/40" />
              </svg>
            </div>
            {lastB !== null && (
              <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2 text-center text-[9px] font-mono text-emerald-700 dark:text-emerald-300">
                +{lastB} coins — same as last time, as expected
              </div>
            )}
            <div className="mt-2">
              <SpinButton onClick={spin} disabled={false} dark={false} />
            </div>
            <p className="mt-1.5 text-[8px] text-muted-foreground">
              {spins} plays &bull; predictable 3&ndash;6 coins each — no slot-machine suspense
            </p>
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[11px] font-semibold">LuckyPins</h3>
            <span className="rounded-full border border-rose-500/30 px-2 py-0.5 text-[8px] font-mono font-bold text-rose-600 dark:text-rose-400">
              {coinsA} coins
            </span>
          </div>
          <p className="mt-2 rounded-md border border-rose-500/30 bg-rose-500/5 p-2.5 text-[10px] leading-relaxed text-foreground/80">
            {DARK_COPY}
          </p>
          <div className="mt-2 flex items-center justify-center py-2">
            <svg viewBox="0 0 72 72" className={`h-14 w-14 transition-transform duration-150 ${spins > 0 ? "" : ""}`} aria-hidden="true">
              <circle cx="36" cy="36" r="32" className="fill-rose-500/15 stroke-rose-500/50" strokeWidth="3" />
              <path d="M36 14 L41 31 L58 36 L41 41 L36 58 L31 41 L14 36 L31 31 Z" className="fill-rose-500/40" />
            </svg>
          </div>
          {lastA !== null && (
            <div className={`rounded-md border p-2 text-center text-[9px] font-mono ${
              lastA === 50
                ? "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold"
                : lastA === 0
                  ? "border-foreground/10 bg-muted/40 text-muted-foreground"
                  : "border-rose-500/30 bg-rose-500/5 text-rose-700 dark:text-rose-300"
            }`}>
              {lastA === 50 ? "★ JACKPOT! +50 coins ★" : lastA === 0 ? "+0 coins — so close, spin again!" : `+${lastA} coins`}
            </div>
          )}
          <div className="mt-2">
            <SpinButton onClick={spin} disabled={false} dark={true} />
          </div>
          <p className="mt-1.5 text-[8px] text-muted-foreground">
            {spins} spins &bull; 35% nothing, 10% jackpot — variable ratio, dopamine on a schedule
          </p>
        </div>
        {jackpot && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Variable-ratio reinforcement loop
            </div>
            <p className="text-muted-foreground mt-0.5">
              The unpredictable jackpot is exactly what the lexicon sells: &ldquo;claim reward,&rdquo;
              &ldquo;daily bonus,&rdquo; &ldquo;spin again,&rdquo; &ldquo;don&rsquo;t lose your streak.&rdquo; The interface
              linguistically structures a slot machine — <span className="font-mono">|L_reinforcement| / A_viewport &gt; &tau;_addiction</span> — to
              maximize compulsive re-engagement.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
