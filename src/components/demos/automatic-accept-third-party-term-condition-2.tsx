"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Automatic Accept Third Party Term — Condition 2: Opaque Entity Resolution
 *
 * Thesis: the interface relies on linguistic "umbrellas" — vague terms like
 * "trusted partners" — so the entities explicitly named in the consent text
 * (E_declared) are a tiny subset of the entities actually granted consent
 * upon execution (E_actual):
 *
 *   E_declared ⊂ E_actual  ∧  |E_actual| ≫ |E_declared| ≈ 0
 *
 * Variant A (dark): "our trusted partners" — zero entities named, 23 bound.
 * Variant B (benign): three specific companies named, exactly those three
 * bound.
 */

const DARK_ACTUAL = [
  "AdVantage Network",
  "DataBridge Analytics",
  "Pulse Metrics",
  "InsightLoop Data",
];
const DARK_ACTUAL_TOTAL = 23;
const BENIGN_DECLARED = ["Acme Analytics", "Beacon Metrics", "Coral Data"];

export function AutomaticAcceptThirdPartyTermCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [darkDone, setDarkDone] = React.useState(false);
  const [benignDone, setBenignDone] = React.useState(false);

  const reset = () => {
    setDarkDone(false);
    setBenignDone(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|E_declared| (named in text)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">0 (dark) / {BENIGN_DECLARED.length} (benign)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|E_actual| (bound on accept)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{DARK_ACTUAL_TOTAL} (dark) / {BENIGN_DECLARED.length} (benign)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|E_actual| &gg; |E_declared|</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">True (dark) / False (benign)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Consented?</span>
        <span className="font-mono font-semibold tabular-nums">{darkDone || benignDone ? "Yes" : "No"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Automatic Accept Third Party Term: Opaque Entity Resolution"
      caption="Vague consent language like &ldquo;trusted partners&rdquo; masks the true scale of legal binding — the named entities are a vanishing fraction of the entities actually granted consent."
      auditorStats={stats}
      deltaNote={`Variant A names zero entities ("trusted partners") yet binds ${DARK_ACTUAL_TOTAL} on continue. Variant B names exactly ${BENIGN_DECLARED.length} companies and binds exactly those — E_declared = E_actual.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Data sharing consent</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              By continuing, you agree to our Terms of Service and to sharing your usage data
              with the following companies:
            </p>
            <ul className="mt-2 space-y-1">
              {BENIGN_DECLARED.map((name) => (
                <li key={name} className="flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1.5">
                  <svg className="h-3 w-3 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="text-[10px] font-medium text-foreground/80">{name}</span>
                  <span className="ml-auto text-[8px] text-muted-foreground/50">purpose: advertising analytics</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[8px] text-muted-foreground/60">
              That&rsquo;s the complete list — no unnamed recipients. E_declared = E_actual.
            </p>
            <button
              onClick={() => setBenignDone(true)}
              className="mt-2.5 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Continue
            </button>
          </div>

          {benignDone && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Preferences saved
              </div>
              <p className="text-muted-foreground mt-0.5">
                Your consent binds exactly the <strong className="text-foreground">{BENIGN_DECLARED.length}
                </strong> named companies — |E_actual| = |E_declared| = {BENIGN_DECLARED.length}. No
                linguistic umbrella, no hidden partners.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Data sharing consent</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            By continuing, you agree to our Terms of Service and to sharing your usage data with
            our <strong className="text-foreground">trusted partners</strong> to improve your
            experience.
          </p>
          <button
            onClick={() => setDarkDone(true)}
            className="mt-2.5 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Continue
          </button>
        </div>

        {mode === "auditor" && darkDone && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Opaque entity resolution
            </div>
            <p className="text-muted-foreground">
              &ldquo;Trusted partners&rdquo; named <strong className="text-red-500">0 entities</strong>{" "}
              in the text you read — yet execution granted consent to{" "}
              <strong className="text-foreground">{DARK_ACTUAL_TOTAL} entities</strong>, including{" "}
              {DARK_ACTUAL.join(", ")} and {DARK_ACTUAL_TOTAL - DARK_ACTUAL.length} more:
              E_declared &sub; E_actual with |E_actual| &gg; |E_declared| &asymp; 0. The umbrella
              term hid the true cardinality of the legal binding from your immediate cognitive layer.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
