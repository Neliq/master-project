"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Persuasive Language — Condition 3: Truth-Conditional Satisfiability
 *
 * Thesis: to distinguish this pattern from outright deception, the algorithm
 * analyzes distinct semantic text nodes, t1 and t2, within the same
 * informational container. By extracting their factual truth conditions,
 * Sem(x), the feature strictly requires that the persuasive claims do not
 * logically contradict one another. They must maintain a mathematically
 * satisfiable state, proving the manipulation relies exclusively on
 * emotional framing rather than factual falsity:
 *
 *   Sem(t1) AND Sem(t2) => Satisfiable
 *
 * Variant A (dark): every claim is factually true, but phrased to induce
 * excitement, urgency and FOMO ("This is the moment everyone upgrades!").
 * Variant B (benign): the same facts, stated neutrally.
 */

interface Claim {
  fact: string;
  spin: string;
  truth: boolean;
}

const CLAIMS_DARK: Claim[] = [
  { fact: "2,000,000+ users are on Pro", spin: "Everyone is upgrading — join the crowd!", truth: true },
  { fact: "Annual billing saves 40%", spin: "This is the deal of the year — grab it now!", truth: true },
  { fact: "Promo price valid today only", spin: "This is your last chance — don't lose it!", truth: true },
  { fact: "Upgrade takes 30 seconds", spin: "There is literally no reason to wait!", truth: true },
];

const CLAIMS_BENIGN: Claim[] = [
  { fact: "2,000,000+ users are on Pro", spin: "", truth: true },
  { fact: "Annual billing saves 40%", spin: "", truth: true },
  { fact: "Promo price valid today only", spin: "", truth: true },
  { fact: "Upgrade takes 30 seconds", spin: "", truth: true },
];

// Model check: the conjunction of all truth conditions must be satisfiable
// (no pair of claims may contradict each other).
function modelSatisfiable(claims: Claim[]): boolean {
  for (let i = 0; i < claims.length; i++) {
    for (let j = i + 1; j < claims.length; j++) {
      if (!claims[i].truth || !claims[j].truth) continue;
      // Contradiction would require one claim to negate the other's fact.
      const a = claims[i].fact.toLowerCase();
      const b = claims[j].fact.toLowerCase();
      if (a.includes("no ") && b.includes("save")) return false;
    }
  }
  return claims.every((c) => c.truth);
}

const SAT_DARK = modelSatisfiable(CLAIMS_DARK);
const SAT_BENIGN = modelSatisfiable(CLAIMS_BENIGN);

export function PersuasiveLanguageCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [choice, setChoice] = React.useState<null | "upgrade" | "later">(null);
  const [verified, setVerified] = React.useState(false);

  const reset = () => {
    setChoice(null);
    setVerified(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Sem(t1) &and; Sem(t2) model</span>
        <span className="font-mono font-semibold tabular-nums text-emerald-500">{SAT_DARK ? "SATISFIABLE" : "UNSAT"}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Contradictions found</span>
        <span className="font-mono font-semibold tabular-nums">0</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">False claims</span>
        <span className="font-mono font-semibold tabular-nums">0 / {CLAIMS_DARK.length}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Framing (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">excitement + urgency</span>
      </div>
    </>
  ) : null;

  const truthTable = (claims: Claim[], dark: boolean) => (
    <div className="space-y-1.5">
      {claims.map((c, i) => (
        <div key={i} className="rounded border border-border bg-background p-1.5 text-[8px] leading-relaxed">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-foreground">
              Sem(t{i + 1}) = &ldquo;{c.fact}&rdquo;
            </span>
            <span className="font-mono text-emerald-600 dark:text-emerald-400 shrink-0">
              {c.truth ? "True" : "False"}
            </span>
          </div>
          {c.spin && (
            <div className="mt-0.5 text-rose-600/90 dark:text-rose-400/90">
              Connotation: &ldquo;{c.spin}&rdquo;
            </div>
          )}
        </div>
      ))}
      <div className={`rounded border p-1.5 text-[8px] font-mono font-semibold ${
        dark ? "border-amber-500/40 bg-amber-500/5 text-amber-700 dark:text-amber-300" : "border-emerald-500/40 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300"
      }`}>
        {dark
          ? `Sem(t1) AND Sem(t2) AND Sem(t3) AND Sem(t4) => ${SAT_DARK ? "SATISFIABLE" : "UNSAT"} — no contradiction`
          : `Sem(t1) AND Sem(t2) AND Sem(t3) AND Sem(t4) => ${SAT_BENIGN ? "SATISFIABLE" : "UNSAT"} — no contradiction`}
      </div>
    </div>
  );

  const claimList = (claims: Claim[], spin: boolean) => (
    <ul className="mt-2 space-y-1 text-[9px] leading-relaxed">
      {claims.map((c, i) => (
        <li key={i} className="flex items-start gap-1.5">
          <span className="mt-0.5 h-1 w-1 shrink-0 rounded-full bg-current opacity-60" />
          <span>
            {spin && c.spin ? (
              <>
                <span className="font-semibold text-rose-600 dark:text-rose-400">{c.spin}</span>{" "}
                <span className="text-muted-foreground">({c.fact.toLowerCase()})</span>
              </>
            ) : (
              <span className="text-muted-foreground">{c.fact}.</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Persuasive Language: Truth-Conditional Satisfiability"
      caption="Truth-Conditional Satisfiability — every persuasive claim is factually true and logically consistent; only the emotional framing is manipulated."
      auditorStats={stats}
      deltaNote="Both variants contain the same four factual claims (Sem(t1)..Sem(t4)) and both models are satisfiable — no claim contradicts another. In Variant A each fact is wrapped in an emotionally loaded connotation ('grab it now!', 'don't lose it!'); in Variant B the same facts are stated neutrally. The manipulation is connotative bias without falsity."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Upgrade to Pro</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  Here is what the Pro plan offers.
                </p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-emerald-500 rounded-full border border-emerald-500/30 px-2 py-0.5 shrink-0">
                Neutral framing
              </div>
            </div>
            {claimList(CLAIMS_BENIGN, false)}

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => setChoice("later")}
                className="rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
              >
                Maybe later
              </button>
              <button
                onClick={() => setChoice("upgrade")}
                className="rounded-md bg-emerald-600 hover:bg-emerald-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
              >
                Upgrade to Pro
              </button>
            </div>

            <button
              onClick={() => setVerified(true)}
              className="mt-2 w-full rounded-md border border-emerald-500/30 bg-emerald-500/5 py-1 text-[9px] font-medium text-emerald-700 dark:text-emerald-300 transition-colors hover:bg-emerald-500/10 cursor-pointer"
            >
              Verify truth conditions
            </button>
            {verified && <div className="mt-2">{truthTable(CLAIMS_BENIGN, false)}</div>}
          </div>

          {choice && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {choice === "upgrade" ? "Upgraded to Pro" : "Stayed on Free"}
              </div>
              <p className="text-muted-foreground mt-0.5">
                The same satisfiable facts were presented without emotional loading. Denotation and
                connotation coincide — you decided on the merits, not on the mood.
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
              <h3 className="text-[11px] font-semibold">
                This is the moment everyone upgrades!
              </h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Don&rsquo;t be the one left behind — see what you&rsquo;d miss.
              </p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-rose-500 rounded-full border border-rose-500/30 px-2 py-0.5 shrink-0">
              Loaded framing
            </div>
          </div>
          {claimList(CLAIMS_DARK, true)}

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              onClick={() => setChoice("later")}
              className="rounded-md border border-border bg-background py-1.5 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
            >
              Maybe later
            </button>
            <button
              onClick={() => setChoice("upgrade")}
              className="rounded-md bg-rose-600 hover:bg-rose-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
            >
              Upgrade now
            </button>
          </div>

          <button
            onClick={() => setVerified(true)}
            className="mt-2 w-full rounded-md border border-amber-500/30 bg-amber-500/5 py-1 text-[9px] font-medium text-amber-700 dark:text-amber-300 transition-colors hover:bg-amber-500/10 cursor-pointer"
          >
            Verify truth conditions
          </button>
          {verified && <div className="mt-2">{truthTable(CLAIMS_DARK, true)}</div>}
        </div>

        {choice && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Connotative bias without falsity
            </div>
            <p className="text-muted-foreground">
              {choice === "upgrade" ? "You upgraded — pushed along by excitement and urgency. " : "You stayed, but the framing still did its emotional work. "}
              The model check returns <strong className="text-emerald-600 dark:text-emerald-400">SATISFIABLE</strong>:{" "}
              <strong className="text-foreground">Sem(t1) &and; Sem(t2) &and; Sem(t3) &and; Sem(t4)</strong>{" "}
              is consistent — zero contradictions, zero false claims.
            </p>
            <p className="text-muted-foreground">
              Every statement is denotationally true; only the connotation (excitement, urgency, FOMO)
              is manufactured. Because the truth state is satisfiable, this is Persuasive Language —
              not Conflicting Information, and not deception.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
