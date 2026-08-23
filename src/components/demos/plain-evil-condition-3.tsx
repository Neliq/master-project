"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Plain Evil (Theoretical Construct) — Condition 3: Semantic Hostility
 * Density Score
 *
 * Thesis: the algorithm computes a composite semantic hostility vector
 * H_sem over all visible text nodes, aggregating (a) coercive-language
 * density, (b) FKGL-complexity outliers, (c) sentiment-polarity spread,
 * and (d) connotative manipulation score. The feature triggers when the
 * L2 norm of the vector exceeds a compound threshold, indicating
 * pervasive linguistic manipulation:
 *
 *   ||H_sem||_2 = sqrt(rho_coerce^2 + sigma_FKGL^2 + sigma_sent^2 + rho_connot^2)
 *                 > tau_hostile_sem
 *
 * Variant A (dark): an account-deletion page saturated with hostile,
 * coercive copy — guilt ("don't abandon your friends"), manufactured
 * permanence ("GONE FOREVER — you will REGRET this"), legalese
 * complexity outliers — so the interface attacks the user in language.
 * Variant B (benign): the same facts (deletion is permanent, data can be
 * exported, friends will notice) stated plainly and neutrally.
 */

const RHO_COERCE = 0.42; // coercive-language density
const SIGMA_FKGL = 0.31; // FKGL-complexity outliers
const SIGMA_SENT = 0.26; // sentiment-polarity spread
const RHO_CONNOT = 0.38; // connotative manipulation score
const NORM = Math.sqrt(
  RHO_COERCE ** 2 + SIGMA_FKGL ** 2 + SIGMA_SENT ** 2 + RHO_CONNOT ** 2
); // ≈ 0.70
const TAU_SEM = 0.5;

type Decision = "delete" | "keep" | null;

export function PlainEvilCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [decision, setDecision] = React.useState<Decision>(null);
  const [revealed, setRevealed] = React.useState(false);

  const reset = () => {
    setDecision(null);
    setRevealed(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">ρ_coerce (coercive density)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{RHO_COERCE.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">σ_FKGL (complexity outliers)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{SIGMA_FKGL.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">σ_sent (sentiment spread)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{SIGMA_SENT.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">ρ_connot (connotative score)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{RHO_CONNOT.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">‖H_sem‖₂ (L2 norm)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">
          {NORM.toFixed(2)} &gt; {TAU_SEM.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Your decision</span>
        <span className="font-mono font-semibold tabular-nums">
          {decision ? (decision === "delete" ? "Delete account" : "Keep account") : "—"}
        </span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Plain Evil (Theoretical Construct): Semantic Hostility Density Score"
      caption="Semantic Hostility Density Score — an account-deletion page where the copy itself is the weapon: guilt, manufactured permanence, and legalese saturate every visible text node."
      auditorStats={stats}
      deltaNote="Both variants convey the same facts: deletion is permanent, your 1,284 photos and profile cannot be recovered, you can export data first, and your friends will notice your profile is gone. Variant A wraps those facts in coercive language, sentiment manipulation, and a legalese outlier (L2 norm 0.70 > tau); Variant B states them plainly, so the hostility vector collapses to zero."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Delete your account</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Deleting your account is permanent. Here is what happens:
            </p>

            <ul className="mt-2 space-y-1 rounded-md border bg-background p-2.5 text-[9px] text-muted-foreground list-disc pl-4">
              <li>Your 1,284 photos and profile will be removed and cannot be recovered.</li>
              <li>Your friends will no longer see your profile in their networks.</li>
              <li>You can <span className="font-medium text-foreground">export your data</span> before deleting — the download is available for 30 days.</li>
              <li>No payments are taken after deletion; any balance is refunded.</li>
            </ul>

            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                onClick={() => { setDecision("delete"); setRevealed(true); }}
                className="rounded-md border border-green-500/40 bg-green-500/10 text-green-700 dark:text-green-300 hover:bg-green-500/20 py-2 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Delete my account
              </button>
              <button
                onClick={() => { setDecision("keep"); setRevealed(true); }}
                className="rounded-md border border-green-500/40 bg-green-500/10 text-green-700 dark:text-green-300 hover:bg-green-500/20 py-2 text-[10px] font-medium transition-colors cursor-pointer"
              >
                Keep my account
              </button>
            </div>

            <p className="text-[8px] text-muted-foreground/60 mt-2">
              The choice is yours either way — no pressure, no guilt, plain language.
            </p>
          </div>

          {revealed && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Neutral copy
              </div>
              <p className="text-muted-foreground mt-0.5">
                Every fact is present, but the language is neutral: no guilt,
                no manufactured permanence, no legalese. The interface
                informs instead of attacking.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold text-red-600 dark:text-red-400">
            Are you ABSOLUTELY sure you want to delete your account?
          </h3>

          <div className="mt-2 space-y-1.5 rounded-md border border-red-500/30 bg-red-500/5 p-2.5 text-[9px] leading-relaxed">
            <p className="text-red-700 dark:text-red-300 font-medium">
              This action is FINAL. Your 1,284 photos and 9 years of memories will be GONE
              FOREVER. They can NEVER be recovered. If you delete now, you will REGRET it.
            </p>
            <p className="text-muted-foreground">
              Don&rsquo;t abandon the community that counts on you. Your friends will MISS you
              — are you really willing to lose them?
            </p>
            <p className="text-[7px] text-muted-foreground/50 leading-relaxed">
              Upon termination of your account, all rights, privileges, and accrued
              entitlements under the subscriber agreement, including but not limited to any
              accumulated goodwill, referral credits, or historical content access, shall be
              irrevocably forfeited and shall not be subject to reinstatement, restitution,
              or compensation of any kind whatsoever.
            </p>
            <p className="text-[8px] text-muted-foreground/60">
              You can export your data first — but who has time for that?
            </p>
          </div>

          <div className="mt-3 space-y-1.5">
            <button
              onClick={() => { setDecision("keep"); setRevealed(true); }}
              className="w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-2.5 text-[11px] font-bold transition-colors cursor-pointer"
            >
              No — keep my account!
            </button>
            <button
              onClick={() => { setDecision("delete"); setRevealed(true); }}
              className="w-full rounded-md border border-border bg-background text-muted-foreground hover:text-foreground py-1.5 text-[9px] font-medium transition-colors cursor-pointer"
            >
              I still want to delete my account
            </button>
          </div>
        </div>

        {mode === "auditor" && revealed && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Review your order
            </div>
            <p className="text-muted-foreground">
              <strong className="font-mono text-red-500">
                ‖H_sem‖₂ = √({RHO_COERCE.toFixed(2)}² + {SIGMA_FKGL.toFixed(2)}² + {SIGMA_SENT.toFixed(2)}² + {RHO_CONNOT.toFixed(2)}²) = {NORM.toFixed(2)} &gt; {TAU_SEM.toFixed(2)}
              </strong>
            </p>
            <p className="text-muted-foreground">
              The vector components are all elevated:{" "}
              <strong className="text-foreground">coercive language</strong> (&ldquo;FINAL&rdquo;,
              &ldquo;GONE FOREVER&rdquo;, &ldquo;you will REGRET it&rdquo;),{" "}
              <strong className="text-foreground">connotative manipulation</strong> (&ldquo;don&rsquo;t
              abandon your community&rdquo;, &ldquo;your friends will MISS you&rdquo;),{" "}
              <strong className="text-foreground">sentiment spread</strong> (fear words stacked
              against a single neutral fact), and an{" "}
              <strong className="text-foreground">FKGL outlier</strong> — the 60-word legal
              sentence nobody can parse.
            </p>
            <p className="text-muted-foreground">
              Every visible text node argues against the exit. The words themselves are
              the attack: the user must fight through the copy to exercise a right they
              already hold.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
