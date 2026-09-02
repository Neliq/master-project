"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Privacy Zuckering — Condition 3: Semantic Ambiguity of Third-Party Entities
 *
 * Thesis: N_disclosure is the text node explaining data usage and E_actual
 * is the true set of third-party entities receiving the payload.
 * Specificity(x) measures the exactness of named entity recognition
 * (corporate names score near 1, euphemisms near 0). The feature triggers
 * if the true cardinality of receiving entities is high, but the text
 * relies on low-specificity terms like “partners” or “affiliates” to mask
 * the distribution reality:
 *
 *   |E_actual| ≫ 1  ∧  Specificity(N_disclosure) < τ_vague
 *
 * Variant A (dark): the disclosure says “our trusted partners and
 * affiliates” (Specificity ≈ 0.12) — while 47 named companies actually
 * receive the data.
 * Variant B (benign): the disclosure names the actual entities
 * (Specificity ≈ 0.93).
 */

const ENTITY_COUNT = 47;
const ENTITIES_SAMPLE = [
  "Acme Analytics", "DataCorp Ltd", "BrightAds Network", "PixelPoint Media",
  "Nimbus Insights", "TrackWave", "AdReach Partners", "QuantLoop", "SignalHound", "MetaMetrics",
];

const DISCLOSURE_VAGUE =
  "Your data may be shared with our trusted partners and affiliates to improve your experience, provide relevant " +
  "offers, and for other business purposes. See our Privacy Policy for more information.";

const DISCLOSURE_SPECIFIC =
  "Your data is shared with 47 third-party companies for advertising and analytics, including Acme Analytics, " +
  "DataCorp Ltd, BrightAds Network, PixelPoint Media, Nimbus Insights, TrackWave, AdReach Partners, QuantLoop, " +
  "SignalHound, and MetaMetrics. Full list: Privacy Policy §3.";

export function PrivacyZuckeringCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [acceptedA, setAcceptedA] = React.useState(false);
  const [createdA, setCreatedA] = React.useState(false);
  const [acceptedB, setAcceptedB] = React.useState(false);
  const [createdB, setCreatedB] = React.useState(false);

  const reset = () => {
    setAcceptedA(false);
    setCreatedA(false);
    setAcceptedB(false);
    setCreatedB(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">|E_actual|</span>
        <span className="font-mono font-semibold tabular-nums">{ENTITY_COUNT} entities</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Specificity(N_disclosure) (A)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">0.12 &lt; τ_vague</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Specificity(N_disclosure) (B)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">0.93 — named entities</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Disclosure terms (A)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">“partners” · “affiliates”</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Privacy Zuckering: Semantic Ambiguity of Third-Party Entities"
      userTitle="Orbit — Connected services"
      caption="Semantic Ambiguity of Third-Party Entities — a disclosure built on “partners” and “affiliates” masks a distribution to dozens of named companies."
      auditorStats={stats}
      deltaNote="Both variants grant the same consent and create the same account. In Variant A the disclosure says “trusted partners and affiliates” (Specificity 0.12 < τ_vague) while 47 named entities actually receive the data. In Variant B the same payload is disclosed by naming the actual companies (Specificity 0.93)."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Create your account</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              Join NoteDrop — cloud notes that sync everywhere.
            </p>

            <div className="mt-3 rounded-md border border-border bg-background p-2.5">
              <div className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                How your data is used
              </div>
              <p className="text-[9px] leading-relaxed text-muted-foreground mt-1">
                {DISCLOSURE_SPECIFIC}
              </p>
              <p className="text-[8px] text-green-600 dark:text-green-400 mt-1 font-medium">
                The complete recipient list is shown above.
              </p>
            </div>

            <label className="mt-3 flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
              <input
                type="checkbox"
                checked={acceptedB}
                onChange={(e) => setAcceptedB(e.target.checked)}
                className="mt-0.5 flex-shrink-0 accent-green-500"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                  I agree to the Privacy Policy and the sharing described above
                </div>
              </div>
            </label>

            <button
              onClick={() => setCreatedB(true)}
              disabled={!acceptedB}
              className={`mt-2 w-full rounded-md py-2 text-[10px] font-medium transition-all ${
                acceptedB
                  ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                  : "bg-muted text-muted-foreground/40 cursor-not-allowed"
              }`}
            >
              Create account
            </button>

            {createdB && (
              <div className="mt-2 rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
                <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Entities disclosed by name
                </div>
                <p className="text-muted-foreground mt-0.5">
                  Every listed recipient is named, so you can see exactly who receives the data before
                  creating your account.
                </p>
              </div>
            )}
          </div>
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Create your account</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            Join NoteDrop — cloud notes that sync everywhere.
          </p>

          <div className="mt-3 rounded-md border border-border bg-background p-2.5">
            <div className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
              How your data is used
            </div>
            <p className="text-[9px] leading-relaxed text-muted-foreground mt-1">
              {DISCLOSURE_VAGUE}
            </p>
            <p className="text-[8px] text-muted-foreground/50 mt-1">
              Shared with trusted partners and affiliates for service and advertising purposes.
            </p>
          </div>

          <label className="mt-3 flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
            <input
              type="checkbox"
              checked={acceptedA}
              onChange={(e) => setAcceptedA(e.target.checked)}
              className="mt-0.5 flex-shrink-0 accent-red-500"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                I agree to the Privacy Policy and the sharing described above
              </div>
            </div>
          </label>

          <button
            onClick={() => setCreatedA(true)}
            disabled={!acceptedA}
            className={`mt-2 w-full rounded-md py-2 text-[10px] font-medium transition-all ${
              acceptedA
                ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                : "bg-muted text-muted-foreground/40 cursor-not-allowed"
            }`}
          >
            Create account
          </button>

          {mode === "auditor" && createdA && (
            <div className="mt-2 rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Semantic umbrella — scale masked
              </div>
              <p className="text-muted-foreground mt-0.5">
                <strong className="text-foreground">|E_actual| = {ENTITY_COUNT} ≫ 1</strong>, yet the disclosure says only “trusted partners and
                affiliates” — <strong className="text-foreground">Specificity(N_disclosure) = 0.12 &lt; τ_vague</strong>. The real recipients of
                your data:
              </p>
              <div className="mt-1.5 max-h-24 overflow-y-auto rounded border border-yellow-500/20 bg-background p-2">
                <ul className="space-y-0.5">
                  {ENTITIES_SAMPLE.map((e) => (
                    <li key={e} className="text-[8px] font-mono text-muted-foreground">{e}</li>
                  ))}
                  <li className="text-[8px] font-mono text-muted-foreground">…and {ENTITY_COUNT - ENTITIES_SAMPLE.length} more ({ENTITY_COUNT} total)</li>
                </ul>
              </div>
              <p className="text-muted-foreground mt-1.5">
                The euphemistic umbrella converts a wide data distribution into a single vague clause — purpose
                limitation bypassed via vocabulary.
              </p>
            </div>
          )}
        </div>
      </div>
    </DemoShell>
  );
}
