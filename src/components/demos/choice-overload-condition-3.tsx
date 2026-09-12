"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Choice Overload — Condition 3: Semantic Similarity Collapse Among
 * Options
 *
 * Thesis: the algorithm computes pairwise semantic similarity among all
 * option descriptions inside a decision container using LLM-generated
 * semantic embeddings. The feature triggers when the mean pairwise
 * cosine similarity exceeds tau_similarity — options that are
 * semantically near-identical yet presented as distinct choices, a
 * structural exploitation of Hick's Law that maximizes decision
 * paralysis:
 *
 *   1/(|C|(|C|-1)) * sum_{i != j} sim(T_i, T_j) > tau_similarity
 *
 * Variant A (dark): 8 insurance policies whose visible descriptions are
 * near-identical marketing copy; the real differentiators (excess,
 * breakdown cover, courtesy car) never appear anywhere on screen, so
 * the user cannot tell the options apart and falls back to the
 * "Most popular" badge on the most expensive one.
 * Variant B (benign): the same 8 policies, same prices, same
 * differentiators — but rendered as a comparison table, so the
 * semantically collapsed descriptions are replaced by a structure that
 * makes the actual differences visible.
 */

interface Policy {
  name: string;
  price: number;
  tagline: string;
  excess: string;
  breakdown: string;
  courtesyCar: string;
}

const POLICIES: Policy[] = [
  { name: "Essential", price: 9, tagline: "Reliable cover for everyday driving", excess: "£250", breakdown: "No", courtesyCar: "No" },
  { name: "Essential Plus", price: 11, tagline: "Reliable cover for everyday driving, with added benefits", excess: "£250", breakdown: "Yes", courtesyCar: "No" },
  { name: "Complete", price: 13, tagline: "Comprehensive cover for everyday driving", excess: "£150", breakdown: "No", courtesyCar: "No" },
  { name: "Complete Plus", price: 15, tagline: "Comprehensive cover for everyday driving, with added benefits", excess: "£150", breakdown: "Yes", courtesyCar: "No" },
  { name: "Total", price: 17, tagline: "Comprehensive protection for everyday driving", excess: "£100", breakdown: "No", courtesyCar: "No" },
  { name: "Total Plus", price: 19, tagline: "Comprehensive protection for everyday driving, with added benefits", excess: "£100", breakdown: "Yes", courtesyCar: "No" },
  { name: "Premium", price: 22, tagline: "Complete protection for everyday driving", excess: "£100", breakdown: "Yes", courtesyCar: "Yes" },
  { name: "Premium Plus", price: 25, tagline: "Complete protection for everyday driving, with added benefits", excess: "£100", breakdown: "Yes", courtesyCar: "Yes" },
];

const MEAN_SIM = 0.94; // mean pairwise cosine similarity of visible descriptions
const TAU_SIMILARITY = 0.85;
const MOST_EXPENSIVE = "Premium Plus";

export function ChoiceOverloadCond3({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [darkSelected, setDarkSelected] = React.useState<string | null>(null);
  const [benignSelected, setBenignSelected] = React.useState<string | null>(null);
  const [darkSubmitted, setDarkSubmitted] = React.useState(false);
  const [benignSubmitted, setBenignSubmitted] = React.useState(false);


  return (
    <DemoShell mode={mode}
      title="Choice Overload: Semantic Similarity Collapse Among Options"
      caption="Semantic Similarity Collapse Among Options — eight policies whose descriptions are near-identical, with the actual differences hidden in fine print, so the 'choice' is semantically one option wearing eight labels."
      deltaNote="Both variants present the same 8 policies at the same prices with the same real differentiators (excess, breakdown cover, courtesy car). Variant A never renders those differentiators — every policy shows only near-identical marketing copy (mean pairwise cosine similarity 0.94), so the “choice” is semantically one option wearing eight labels; Variant B surfaces the differentiators in a comparison table, dissolving the semantic collapse."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <h3 className="text-[11px] font-semibold">Choose your car insurance</h3>
            <p className="text-[9px] text-muted-foreground mt-0.5">
              {POLICIES.length} policies. Compare the actual differences below — excess,
              breakdown cover, and courtesy car are what separate them.
            </p>

            <div className="mt-2 overflow-x-auto rounded-md border bg-background">
              <table className="w-full text-left text-[9px]">
                <thead>
                  <tr className="border-b bg-muted/50 text-muted-foreground">
                    <th className="px-2 py-1.5 font-semibold">Policy</th>
                    <th className="px-2 py-1.5 font-semibold">Price/mo</th>
                    <th className="px-2 py-1.5 font-semibold">Excess</th>
                    <th className="px-2 py-1.5 font-semibold">Breakdown</th>
                    <th className="px-2 py-1.5 font-semibold">Courtesy car</th>
                  </tr>
                </thead>
                <tbody>
                  {POLICIES.map((p) => (
                    <tr
                      key={p.name}
                      onClick={() => setBenignSelected(p.name)}
                      className={`cursor-pointer border-b border-border/50 transition-colors last:border-b-0 ${
                        benignSelected === p.name ? "bg-muted/40" : "hover:bg-muted/40"
                      }`}
                    >
                      <td className="px-2 py-1.5 font-medium">{p.name}</td>
                      <td className="px-2 py-1.5 font-mono tabular-nums">£{p.price}</td>
                      <td className="px-2 py-1.5">{p.excess}</td>
                      <td className="px-2 py-1.5">{p.breakdown}</td>
                      <td className="px-2 py-1.5">{p.courtesyCar}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setBenignSubmitted(true)}
              disabled={!benignSelected}
              className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                benignSelected
                  ? "bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer"
                  : "bg-muted text-muted-foreground/40 cursor-not-allowed"
              }`}
            >
              Choose {benignSelected ?? "a policy"}
            </button>
          </div>

          {mode === "auditor" && benignSubmitted && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Differences visible
              </div>
              <p className="text-muted-foreground mt-0.5">
                The comparison table surfaces the real differentiators (excess, breakdown
                cover, courtesy car), so the options cease to be semantically identical. You
                chose <strong className="text-foreground">{benignSelected}</strong> based on
                substance rather than marketing labels.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <h3 className="text-[11px] font-semibold">Choose your car insurance</h3>
          <p className="text-[9px] text-muted-foreground mt-0.5">
            {POLICIES.length} policies to compare — each one tailored for drivers like you.
            Select the cover that fits your lifestyle.
          </p>

          <div className="mt-2 space-y-1.5">
            {POLICIES.map((p) => (
              <label
                key={p.name}
                className={`block cursor-pointer rounded-md border p-2 transition-colors ${
                  darkSelected === p.name
                    ? "border-border bg-muted/40"
                    : "border-border bg-background hover:border-ring"
                }`}
              >
                <input
                  type="radio"
                  name="policy-dark"
                  checked={darkSelected === p.name}
                  onChange={() => setDarkSelected(p.name)}
                  className="sr-only"
                />
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold">{p.name}</span>
                      {p.name === MOST_EXPENSIVE && (
                        <span className="bg-primary text-primary-foreground rounded-full px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider">
                          ★ Most popular
                        </span>
                      )}
                    </div>
                    <p className="text-[8px] text-muted-foreground/70 mt-0.5 truncate">
                      {p.tagline}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] font-semibold tabular-nums shrink-0">
                    £{p.price}
                    <span className="text-[7px] text-muted-foreground/60">/mo</span>
                  </span>
                </div>
              </label>
            ))}
          </div>

          <button
            onClick={() => setDarkSubmitted(true)}
            disabled={!darkSelected}
            className={`mt-3 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              darkSelected
                ? "bg-primary hover:bg-primary/80 text-primary-foreground cursor-pointer"
                : "bg-muted text-muted-foreground/40 cursor-not-allowed"
            }`}
          >
            Choose {darkSelected ?? "a policy"}
          </button>
        </div>

        {mode === "auditor" && darkSubmitted && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Compare plans
            </div>
            <p className="text-muted-foreground">
              <strong className="font-mono text-red-500">
                mean pairwise sim = {MEAN_SIM.toFixed(2)} &gt; τ_similarity = {TAU_SIMILARITY.toFixed(2)}
              </strong>{" "}
              — the {POLICIES.length} visible descriptions are semantically near-identical
              (&ldquo;Complete cover for your everyday driving&hellip;&rdquo;), and the real
              differences — excess, breakdown cover, courtesy car — appear nowhere on this
              screen.
            </p>
            <p className="text-muted-foreground">
              On the surface the choice is one option in eight boxes. Decision paralysis sets
              in, and the &ldquo;Most popular&rdquo; badge — on the most expensive policy —
              becomes the only salient signal.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
