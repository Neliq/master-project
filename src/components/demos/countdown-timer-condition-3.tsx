"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Countdown Timer — Condition 3: Semantic Urgency Inflation via
 * Temporal Lexemes
 *
 * Thesis: the algorithm analyzes the text accompanying a visible countdown
 * element for urgency-amplifying language. The feature triggers if the
 * countdown is paired with semantically compounding urgency lexemes —
 * "hurry", "now or never", "don't wait" — that amplify the psychological
 * pressure beyond what the numerical countdown alone conveys:
 *
 *   IsCountdown(N) = True  ∧  |T_adjacent(N) ∩ L_amplify| > 0
 *
 * Variant A (dark): the same countdown is wrapped in a barrage of
 * amplifying lexemes ("HURRY!", "now or never", "don't wait"…).
 * Variant B (benign): the identical countdown with neutral, factual copy —
 * zero amplify lexemes.
 */

const ITEM_NAME = "Aurora Wireless Earbuds Pro";
const PRICE_NOW = "$89.00";
const PRICE_AFTER = "$129.00";
const COUNTDOWN_S = 272; // 04:32 — identical numeric countdown in both panels

const AMPLIFY_LEXEMES = [
  "hurry",
  "now or never",
  "don't wait",
  "last chance",
  "act now",
  "before it's too late",
  "only",
] as const;

const COPY_DARK =
  "HURRY — this deal won't last! Now or never: don't wait, order before it's too late. " +
  "Last chance — act now, only a few left at this price!";
const COPY_BENIGN =
  "This discount ends when the countdown reaches zero. The price reverts to $129.00 afterwards.";

function countLexemes(text: string): { count: number; found: string[] } {
  const lower = text.toLowerCase();
  const found = AMPLIFY_LEXEMES.filter((l) => lower.includes(l));
  return { count: found.length, found };
}

function fmt(s: number): string {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export function CountdownTimerCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [seconds, setSeconds] = React.useState(COUNTDOWN_S);
  const [paid, setPaid] = React.useState(false);

  // Shared countdown so both panels tick in perfect sync.
  React.useEffect(() => {
    const id = window.setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => window.clearInterval(id);
  }, []);

  const reset = () => {
    setSeconds(COUNTDOWN_S);
    setPaid(false);
  };

  const darkLex = countLexemes(COPY_DARK);
  const benignLex = countLexemes(COPY_BENIGN);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">IsCountdown(N)</span>
        <span className="font-mono font-semibold tabular-nums">True (live timer)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|T_adjacent ∩ L_amplify| — A</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">{darkLex.count} &gt; 0</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|T_adjacent ∩ L_amplify| — B</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">{benignLex.count}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Matched lexemes (A)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500 max-w-[55%] truncate text-right">{darkLex.found.join(", ") || "—"}</span>
      </div>
    </>
  ) : null;

  const highlightLexemes = (text: string) => {
    const parts: React.ReactNode[] = [];
    let rest = text;
    let key = 0;
    while (rest.length > 0) {
      const lower = rest.toLowerCase();
      let match: { index: number; lexeme: string } | null = null;
      for (const l of AMPLIFY_LEXEMES) {
        const idx = lower.indexOf(l);
        if (idx !== -1 && (match === null || idx < match.index)) {
          match = { index: idx, lexeme: l };
        }
      }
      if (match === null) {
        parts.push(rest);
        break;
      }
      parts.push(rest.slice(0, match.index));
      parts.push(
        <mark key={key++} className="rounded-sm bg-amber-500/20 px-0.5 text-amber-700 dark:text-amber-300 font-semibold">
          {rest.slice(match.index, match.index + match.lexeme.length)}
        </mark>
      );
      rest = rest.slice(match.index + match.lexeme.length);
    }
    return parts;
  };

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Countdown Timer: Semantic Urgency Inflation via Temporal Lexemes"
      caption="Semantic Urgency Inflation via Temporal Lexemes — urgency-amplifying words (“hurry”, “now or never”, “don't wait”) stack around a countdown to multiply the pressure the numbers alone would create."
      auditorStats={stats}
      deltaNote={`Both panels run the identical ${fmt(COUNTDOWN_S)} countdown with the same product and prices. Variant A pairs it with ${darkLex.count} amplifying lexemes (highlighted in amber: ${darkLex.found.join(", ")}) — |T_adjacent ∩ L_amplify| = ${darkLex.count} > 0. Variant B uses neutral, factual copy with ${benignLex.count} matched lexemes.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">{ITEM_NAME}</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              <span className="font-bold text-foreground">{PRICE_NOW}</span>{" "}
              <span className="line-through opacity-60">{PRICE_AFTER}</span> — the discount is applied until the deadline below.
            </p>
          </div>

          <div className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-medium text-muted-foreground">Discount ends in</span>
              <span className="font-mono text-[12px] font-bold tabular-nums tracking-wider text-emerald-600 dark:text-emerald-300">
                {fmt(seconds)}
              </span>
            </div>
            <p className="mt-1.5 text-[9px] leading-relaxed text-muted-foreground">{COPY_BENIGN}</p>
          </div>

          <button
            onClick={() => setPaid(true)}
            className="w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            {paid ? "Paid ✓" : `Pay ${PRICE_NOW}`}
          </button>

          {paid && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Neutral framing
              </div>
              <p className="text-muted-foreground mt-0.5">
                The countdown communicated the deadline with {benignLex.count} amplifying lexemes. The numerical urgency stands
                alone — no “hurry”, no “now or never” — so the pressure comes from the facts, not the wording.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">{ITEM_NAME}</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            <span className="font-bold text-foreground">{PRICE_NOW}</span>{" "}
            <span className="line-through opacity-60">{PRICE_AFTER}</span> — the discount is applied until the deadline below.
          </p>
        </div>

        <div className="rounded-md border border-rose-500/40 bg-rose-500/10 px-2.5 py-2">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-medium text-muted-foreground">Discount ends in</span>
            <span className="font-mono text-[12px] font-bold tabular-nums tracking-wider text-rose-600 dark:text-rose-300">
              {fmt(seconds)}
            </span>
          </div>
          <p className="mt-1.5 text-[9px] leading-relaxed text-foreground/85">{highlightLexemes(COPY_DARK)}</p>
        </div>

        <button
          onClick={() => setPaid(true)}
          className="w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
        >
          {paid ? "Paid ✓" : `Pay ${PRICE_NOW} now`}
        </button>

        {paid && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Urgency inflation detected
            </div>
            <p className="text-muted-foreground">
              IsCountdown(N) = True, and the adjacent copy contains{" "}
              <strong className="text-rose-500">{darkLex.count} amplify lexemes</strong> —{" "}
              {darkLex.found.join(", ")} — so |T_adjacent(N) ∩ L_amplify| = {darkLex.count} &gt; 0 and the trigger fires.
            </p>
            <p className="text-muted-foreground">
              The words (“hurry”, “now or never”, “don’t wait”, “last chance”, “act now”) amplify the psychological
              pressure beyond what the {fmt(COUNTDOWN_S)} countdown alone conveys, pushing an impulsive decision.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
