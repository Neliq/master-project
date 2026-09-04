"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Psychological Tricks — Condition 2: Cognitive Overload
 *
 * Thesis: |C_matrix| ≫ τ_fatigue ⟹ lim_{t→∞} P_select(D_favorable) = 1
 *
 * The interface inflates the cardinality and complexity of a configuration
 * matrix beyond human cognitive stamina, statistically guaranteeing the
 * exhausted user abandons active evaluation and surrenders to the
 * pre-selected hostile default D_favorable.
 *
 * Variant A (dark): a 14-row setup matrix (|C_matrix| = 14 ≫ τ_fatigue = 5)
 * with “Share my activity data with advertising partners” pre-checked ON.
 * Variant B (benign): the same setup, reduced to 3 rows, with the hostile
 * default unchecked and the marketing-frequency select defaulting to
 * “Never”.
 */

type Row = { label: string; kind: "check" | "select"; options?: string[]; defaultOn?: boolean; hostile?: boolean };

const DARK_MATRIX: Row[] = [
  { label: "Email me order updates", kind: "check" },
  { label: "SMS order notifications", kind: "check" },
  { label: "WhatsApp order updates", kind: "check" },
  { label: "Personalized product recommendations", kind: "check" },
  { label: "Share my activity data with advertising partners", kind: "check", defaultOn: true, hostile: true },
  { label: "Allow marketing partners to contact me directly", kind: "check" },
  { label: "Weekly product newsletter", kind: "check" },
  { label: "Daily deals digest", kind: "check" },
  { label: "Participate in product improvement surveys", kind: "check" },
  { label: "Share anonymized usage statistics", kind: "check" },
  { label: "Auto-renew storage plan each month", kind: "check" },
  { label: "Sync frequency", kind: "select", options: ["Every 5 minutes", "Every hour", "Manually"] },
  { label: "Marketing email frequency", kind: "select", options: ["Daily", "Weekly", "Never"] },
  { label: "Data retention period", kind: "select", options: ["2 years", "1 year", "3 months"] },
];

const BENIGN_MATRIX: Row[] = [
  { label: "Email me order updates", kind: "check" },
  { label: "Share my activity data with advertising partners", kind: "check" },
  { label: "Marketing email frequency", kind: "select", options: ["Never", "Weekly", "Daily"] },
];

const HOSTILE_INDEX = 4;

function matrixDefaults(rows: Row[]): string[] {
  return rows.map((r) => (r.kind === "select" ? r.options![0] : r.defaultOn ? "on" : "off"));
}

function RowControl({
  row, value, onToggle, onSelect, accent,
}: {
  row: Row;
  value: string;
  onToggle: () => void;
  onSelect: (v: string) => void;
  accent: "rose" | "emerald";
}) {
  if (row.kind === "select") {
    return (
      <select
        value={value}
        onChange={(e) => onSelect(e.target.value)}
        className="rounded-md border border-border bg-background px-1.5 py-1 text-[9px] text-foreground cursor-pointer"
      >
        {row.options!.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  }
  return (
    <input
      type="checkbox"
      checked={value === "on"}
      onChange={onToggle}
      className={`h-3.5 w-3.5 flex-shrink-0 ${accent === "rose" ? "accent-red-500" : "accent-green-500"}`}
    />
  );
}

export function PsychologicalTricksCond2({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [darkState, setDarkState] = React.useState<string[]>(() => matrixDefaults(DARK_MATRIX));
  const [benignState, setBenignState] = React.useState<string[]>(() => matrixDefaults(BENIGN_MATRIX));
  const [darkFinished, setDarkFinished] = React.useState(false);
  const [benignFinished, setBenignFinished] = React.useState(false);


  return (
    <DemoShell mode={mode}
      title="Psychological Tricks: Cognitive Overload"
      caption="Cognitive Overload — a configuration matrix inflated far beyond τ_fatigue (decision fatigue) statistically guarantees the exhausted user surrenders to the pre-selected hostile default."
      deltaNote="In Variant A the setup matrix has 14 rows (|C_matrix| = 14 ≫ τ_fatigue = 5) with the data-sharing default pre-checked ON, so fatigue makes you keep it. Variant B has 3 rows with the sharing default OFF and the marketing-frequency select defaulting to “Never” — nothing to surrender to."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-semibold">Finish setting up your account</h3>
              <span className="text-[8px] font-mono uppercase tracking-wider rounded-full border border-green-500/30 text-green-600 dark:text-green-400 px-2 py-0.5">
                3 settings
              </span>
            </div>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Three quick choices — you can change any of them later.
            </p>

            <div className="mt-2.5 space-y-1.5">
              {BENIGN_MATRIX.map((row, i) => (
                <div key={i} className="flex items-center justify-between gap-2 rounded-md border border-border/60 bg-background px-2.5 py-2">
                  <span className="text-[10px] text-foreground/85">{row.label}</span>
                  <RowControl
                    row={row}
                    value={benignState[i]}
                    onToggle={() => setBenignState((s) => s.map((v, j) => (j === i ? (v === "on" ? "off" : "on") : v)))}
                    onSelect={(v) => setBenignState((s) => s.map((val, j) => (j === i ? v : val)))}
                    accent="emerald"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => setBenignFinished(true)}
              className="mt-2.5 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Finish setup
            </button>
          </div>

          {mode === "user" && benignFinished && (
            <div className="rounded-md border border-border bg-muted/30 p-2.5 text-[9px] leading-relaxed">
              <div className="font-semibold uppercase tracking-tight">Setup saved</div>
              <p className="text-muted-foreground mt-0.5">Your account preferences were saved.</p>
            </div>
          )}

          {mode === "auditor" && benignFinished && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Matrix below fatigue threshold
              </div>
              <p className="text-muted-foreground mt-0.5">
                |C_matrix| = 3 &lt; &tau;_fatigue = 5 — every choice stays visible and cheap to
                evaluate, the data-sharing default is OFF, and the marketing-frequency select
                defaults to &ldquo;Never&rdquo;. No exhaustion, no extraction.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-semibold">Finish setting up your account</h3>
            <span className="text-[8px] font-mono uppercase tracking-wider rounded-full border border-red-500/30 text-red-600 dark:text-red-400 px-2 py-0.5">
              14 settings
            </span>
          </div>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Please review each preference carefully before continuing.
          </p>

          <div className="mt-2.5 space-y-1.5">
            {DARK_MATRIX.map((row, i) => (
              <div
                key={i}
                className={`flex items-center justify-between gap-2 rounded-md border px-2.5 py-2 ${
                  row.hostile
                    ? "border-red-500/40 bg-red-500/5"
                    : "border-border/60 bg-background"
                }`}
              >
                <span className="text-[10px] text-foreground/85">
                  {row.label}
                  {row.hostile && (
                    <span className="ml-1.5 rounded-full bg-red-500/15 text-red-700 dark:text-red-300 border border-red-500/30 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider">
                      Pre-selected
                    </span>
                  )}
                </span>
                <RowControl
                  row={row}
                  value={darkState[i]}
                  onToggle={() => setDarkState((s) => s.map((v, j) => (j === i ? (v === "on" ? "off" : "on") : v)))}
                  onSelect={(v) => setDarkState((s) => s.map((val, j) => (j === i ? v : val)))}
                  accent="rose"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() => setDarkFinished(true)}
            className="mt-2.5 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Finish setup
          </button>
        </div>

        {mode === "user" && darkFinished && (
          <div className="rounded-md border border-border bg-muted/30 p-2.5 text-[9px] leading-relaxed">
            <div className="font-semibold uppercase tracking-tight">Setup saved</div>
            <p className="text-muted-foreground mt-0.5">Your account preferences were saved.</p>
          </div>
        )}

        {mode === "auditor" && darkFinished && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Settings saved
            </div>
            <p className="text-muted-foreground">
              You just evaluated a <strong className="text-foreground">14-row matrix</strong> —
              |C_matrix| = 14 &gg; &tau;_fatigue = 5. Decision fatigue sets in around row 6–8;
              past that, most users stop evaluating and click through. The pre-selected hostile
              default D_favorable —{" "}
              <strong className="text-foreground">
                {darkState[HOSTILE_INDEX] === "on" ? "“Share my activity data” stayed ON" : "“Share my activity data” (you flipped it)"}
              </strong>{" "}
              — survives, so <strong className="text-foreground">lim P_select(D_favorable) &rarr; 1</strong>.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
