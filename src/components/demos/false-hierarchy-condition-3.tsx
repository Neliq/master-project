"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, CheckCircle2, Scale, Shield } from "lucide-react";

/*
 * False Hierarchy — Condition 3: Strict Semantic Opposition
 *
 * Thesis: the pattern requires a binary relational structure — two proximally
 * close interactive nodes B1, B2 in the same container N_parent whose
 * NLP-extracted intents are mutually exclusive. The feature cannot trigger
 * unless opposition is first mathematically established:
 *
 *   ∃ Intent(L(B1)) ≡ ¬Intent(L(B2))
 *
 * Variant A (dark): the verified binary is phrased as a negation trap — the
 * user-favorable option is "No, I don't accept tracking", a clause users must
 * double-parse, while the business option is a single positive clause. Both
 * options remain real buttons so this condition measures wording only.
 * Variant B (benign): the same verified binary uses direct, equally-parseable
 * clauses ("Accept tracking" vs "Decline tracking").
 */

export function FalseHierarchyCond3({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [darkChoice, setDarkChoice] = React.useState<null | "accept" | "decline">(null);
  const [benignChoice, setBenignChoice] = React.useState<null | "accept" | "decline">(null);


  return (
    <DemoShell mode={mode}
      title="False Hierarchy: Strict Semantic Opposition"
      caption="Strict Semantic Opposition — the two buttons are NLP-verified logical opposites (Intent(B₂) ≡ ¬Intent(B₁)); Variant A uses a harder-to-parse negative clause while Variant B states the same choice directly."
      deltaNote="In both variants the algorithm verifies strict opposition — Intent(L(B₂)) ≡ ¬Intent(L(B₁)) — so the binary is mathematically established. Variant A uses the harder-to-parse wording “No, I don't accept tracking”, while Variant B uses direct clauses (“Accept” vs “Decline”). Both variants retain equal button affordances; only the wording changes."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                <Scale className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-[11px] font-semibold">Personalisation &amp; tracking</h3>
                <p className="text-[9px] text-muted-foreground">A binary choice, clearly posed</p>
              </div>
            </div>

            <p className="mt-3 text-[10px] leading-relaxed text-foreground/80">
              We track your activity to personalise content. Choose how to proceed:
            </p>

            {/* B1: direct positive clause */}
            <button
              onClick={() => setBenignChoice("accept")}
              className="mt-3 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 px-3 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Accept tracking
            </button>
            {/* B2: direct negative clause — single parse */}
            <button
              onClick={() => setBenignChoice("decline")}
              className="mt-1.5 w-full rounded-md border border-green-600/50 bg-background text-green-700 dark:text-green-300 hover:bg-green-500/5 py-1.5 px-3 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Decline tracking
            </button>
          </div>

          {benignChoice && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <CheckCircle2 className="w-3 h-3" />
                Opposition verified — no parsing trap
              </div>
              <p className="text-muted-foreground mt-0.5">
                Intent(L(B₁)) = accept and Intent(L(B₂)) = decline are strict opposites, and both
                clauses read in a single pass — {benignChoice === "accept" ? "tracking enabled" : "tracking declined"} exactly as the label promised.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-red-100 dark:bg-red-900/30">
              <Shield className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-[11px] font-semibold">Personalisation &amp; tracking</h3>
              <p className="text-[9px] text-muted-foreground">A binary choice, carefully posed</p>
            </div>
          </div>

          <p className="mt-3 text-[10px] leading-relaxed text-foreground/80">
            We track your activity to personalise content. Choose how to proceed:
          </p>

          {/* B1: single positive clause — business-favorable */}
          <button
            onClick={() => setDarkChoice("accept")}
            className="mt-3 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 px-3 text-[10px] font-medium transition-colors cursor-pointer"
          >
            I accept tracking
          </button>
          {/* B2: verified opposite, expressed with a double negative. */}
          <button
            type="button"
            onClick={() => setDarkChoice("decline")}
            className="mt-2 w-full rounded-md border border-border bg-background py-1.5 px-3 text-[10px] font-medium text-foreground transition-colors hover:bg-muted cursor-pointer"
          >
            No, I don&rsquo;t accept tracking
          </button>
        </div>

        {mode === "auditor" && darkChoice && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <AlertTriangle className="w-3 h-3" />
              Opposition holds — phrasing rigged
            </div>
            <p className="text-muted-foreground">
              The NLP pass succeeds: <strong className="text-red-500">Intent(L(B₁)) = accept</strong>{" "}
              and <strong className="text-red-500">Intent(L(B₂)) = reject ≡ ¬accept</strong> — the
              two nodes are strict semantic opposites in the same container, so the binary
              precondition is satisfied. But the user-favorable clause is a double negative:
              “No, I don&rsquo;t accept tracking” requires an extra parse that rushed users skip —
              and it is structurally demoted from a <span className="font-mono">&lt;button&gt;</span> to a
              bare text link with near-zero padding, camouflaging the escape route.
            </p>
            <p className="text-muted-foreground">
              {darkChoice === "accept"
                ? "You clicked the single positive clause — the parse-free path — and tracking was enabled."
                : "You parsed the double negative correctly — tracking was declined — but the interface made you compute what the other button said in one word."}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
