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
 * double-parse, while the business option is a single positive clause.
 * Variant B (benign): the same verified binary uses direct, equally-parseable
 * clauses ("Accept tracking" vs "Decline tracking").
 */

export function FalseHierarchyCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [choice, setChoice] = React.useState<null | "accept" | "decline">(null);

  const reset = () => setChoice(null);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Intent(L(B₁))</span>
        <span className="font-mono font-semibold tabular-nums">accept</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Intent(L(B₂))</span>
        <span className="font-mono font-semibold tabular-nums">reject (decline)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Intent(L(B₂)) ≡ ¬Intent(L(B₁))</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">true</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Tag(B_business) / Tag(B_user)</span>
        <span className="font-mono font-semibold tabular-nums text-rose-500">&lt;button&gt; / &lt;a&gt; (padding ≈ 0)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">N_parent</span>
        <span className="font-mono font-semibold tabular-nums">consent modal</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="False Hierarchy: Strict Semantic Opposition"
      caption="Strict Semantic Opposition — the two buttons are NLP-verified logical opposites (Intent(B₂) ≡ ¬Intent(B₁)), yet in Variant A the user-favorable side is demoted to a bare text link and buried inside a negated clause that rushed users misparse as agreement."
      auditorStats={stats}
      deltaNote="In both variants the algorithm verifies strict opposition — Intent(L(B₂)) ≡ ¬Intent(L(B₁)) — so the binary is mathematically established. In Variant A the user-favorable option is phrased as “No, I don't accept tracking”, a double-negation trap users must compute under time pressure, and it is structurally demoted from a full button to a bare text link with near-zero padding (Tag = <a> vs <button>). In Variant B the same verified binary uses direct clauses (“Accept” vs “Decline”), equally parseable at a glance and rendered as two equal full-width buttons."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-100 dark:bg-emerald-900/30">
                <Scale className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
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
              onClick={() => setChoice("accept")}
              className="mt-3 w-full rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 px-3 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Accept tracking
            </button>
            {/* B2: direct negative clause — single parse */}
            <button
              onClick={() => setChoice("decline")}
              className="mt-1.5 w-full rounded-md border border-emerald-600/50 bg-background text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/5 py-1.5 px-3 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Decline tracking
            </button>
          </div>

          {choice && (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-tight">
                <CheckCircle2 className="w-3 h-3" />
                Opposition verified — no parsing trap
              </div>
              <p className="text-muted-foreground mt-0.5">
                Intent(L(B₁)) = accept and Intent(L(B₂)) = decline are strict opposites, and both
                clauses read in a single pass — {choice === "accept" ? "tracking enabled" : "tracking declined"} exactly as the label promised.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-rose-100 dark:bg-rose-900/30">
              <Shield className="h-3.5 w-3.5 text-rose-600 dark:text-rose-400" />
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
            onClick={() => setChoice("accept")}
            className="mt-3 w-full rounded-md bg-rose-600 hover:bg-rose-700 text-white py-1.5 px-3 text-[10px] font-medium transition-colors cursor-pointer"
          >
            I accept tracking
          </button>
          {/* B2: verified opposite, but structurally downgraded to a bare text
              link (<a>, padding ≈ 0) and wrapped in a double negative */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setChoice("decline");
            }}
            className="mt-2 block text-center text-[10px] font-normal text-foreground/50 underline underline-offset-2 transition-colors hover:text-foreground cursor-pointer"
          >
            No, I don&rsquo;t accept tracking
          </a>
        </div>

        {choice && (
          <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-tight">
              <AlertTriangle className="w-3 h-3" />
              Opposition holds — phrasing rigged
            </div>
            <p className="text-muted-foreground">
              The NLP pass succeeds: <strong className="text-rose-500">Intent(L(B₁)) = accept</strong>{" "}
              and <strong className="text-rose-500">Intent(L(B₂)) = reject ≡ ¬accept</strong> — the
              two nodes are strict semantic opposites in the same container, so the binary
              precondition is satisfied. But the user-favorable clause is a double negative:
              “No, I don&rsquo;t accept tracking” requires an extra parse that rushed users skip —
              and it is structurally demoted from a <span className="font-mono">&lt;button&gt;</span> to a
              bare text link with near-zero padding, camouflaging the escape route.
            </p>
            <p className="text-muted-foreground">
              {choice === "accept"
                ? "You clicked the single positive clause — the parse-free path — and tracking was enabled."
                : "You parsed the double negative correctly — tracking was declined — but the interface made you compute what the other button said in one word."}
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
