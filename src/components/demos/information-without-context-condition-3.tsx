"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { AlertTriangle, CheckCircle2, Zap } from "lucide-react";

/*
 * Information Without Context — Condition 3: Unanchored Quantitative Metrics
 *
 * Thesis: N_info holds a prominent numerical value v (e.g. "Save 50"),
 * extracted via NLP. U_val is the expected unit of measurement (%, $, PLN)
 * and B_val the necessary comparative baseline (e.g. "off the original
 * price"). The feature triggers if the high-prominence value lacks both a
 * definitive unit and a denominator within its semantic cluster S_cluster:
 *
 *   v ∈ N_info ∧ (U_val ∉ S_cluster ∨ B_val ∉ S_cluster)
 *
 * Variant A (dark): the banner screams "SAVE 50" — no unit, no baseline, so
 * the value is unanchored and its meaning unknowable before committing.
 * Variant B (benign): the same offer is anchored — "Save 50% on orders over
 * 100 PLN" — unit and denominator both present, and the sale deadline is
 * stated concretely (23:59).
 */

const VALUE_V = 50; // extracted metric v
const FLASH = "50"; // the rendered numeric value

export function InformationWithoutContextCond3({
  mode = "user",
}: {
  mode?: "user" | "auditor";
} = {}) {
  const [claimed, setClaimed] = React.useState(false);


  return (
    <DemoShell mode={mode}
      title="Information Without Context: Unanchored Quantitative Metrics"
      caption="Unanchored Quantitative Metrics — the banner&rsquo;s prominent value “SAVE 50” carries neither a unit (%, $, PLN) nor a baseline (off what?) inside its semantic cluster."
      deltaNote="In Variant A the high-prominence value v = 50 sits in a cluster with no unit and no denominator — U_val ∉ S_cluster ∧ B_val ∉ S_cluster — so its true meaning (“50 PLN off orders above 500 PLN”) only surfaces after you commit. In Variant B the same offer is anchored: “Save 50% on orders over 100 PLN” keeps unit and baseline inside the cluster, and the sale deadline is stated concretely (“ends tonight at 23:59”)."
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                <Zap className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-[11px] font-semibold">TechNook — flash sale</h3>
                <p className="text-[9px] text-muted-foreground">
                  Flash sale ends tonight at 23:59 · electronics
                </p>
              </div>
            </div>

            {/* anchored metric: unit + baseline inside the cluster */}
            <div className="mt-3 rounded-md bg-background border border-border p-2.5 text-center">
              <div className="text-[16px] font-bold text-green-600 dark:text-green-400">
                SAVE 50%
              </div>
              <div className="text-[10px] text-foreground/80 mt-0.5">
                on orders over 100 PLN — off the original price
              </div>
            </div>

            <button
              onClick={() => setClaimed(true)}
              className="mt-2 w-full rounded-md bg-green-600 hover:bg-green-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
            >
              Claim offer
            </button>
          </div>

          {mode === "auditor" && claimed && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <CheckCircle2 className="w-3 h-3" />
                Offer claimed — value anchored
              </div>
              <p className="text-muted-foreground mt-0.5">
                Unit (%, U_val) and baseline (orders over 100 PLN, B_val) were both inside the
                semantic cluster, so v = 50 was fully evaluable before you clicked.
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
              <Zap className="h-3.5 w-3.5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-[11px] font-semibold">TechNook — flash sale</h3>
              <p className="text-[9px] text-muted-foreground">Ends tonight · electronics</p>
            </div>
          </div>

          {/* v = 50: prominent, unanchored — no unit, no denominator */}
          <div className="mt-3 rounded-md bg-background border border-border p-2.5 text-center">
            <div className="text-[22px] font-black leading-none text-red-500">SAVE {FLASH}</div>
            <div className="text-[8px] text-muted-foreground/50 mt-1.5">
              Limited time offer. Terms apply.
            </div>
          </div>

          <button
            onClick={() => setClaimed(true)}
            className="mt-2 w-full rounded-md bg-red-600 hover:bg-red-700 text-white py-1.5 text-[10px] font-medium transition-colors cursor-pointer"
          >
            Claim offer
          </button>
        </div>

        {mode === "auditor" && claimed && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <AlertTriangle className="w-3 h-3" />
              Offer details
            </div>
            <p className="text-muted-foreground">
              The prominent value <strong className="text-red-500">v = {VALUE_V}</strong> was
              rendered with no unit and no denominator in its cluster —{" "}
              <strong className="text-red-500">
                U_val ∉ S_cluster ∧ B_val ∉ S_cluster
              </strong>
              . “Save {FLASH}” could mean {FLASH}%, {FLASH} PLN, or {FLASH} PLN off a 1,000 PLN
              cart — you couldn&rsquo;t evaluate it rationally, only emotionally.
            </p>
            <p className="text-muted-foreground">
              The buried terms reveal the truth: {FLASH} PLN off purchases above 500 PLN. The unit
              and baseline existed — they were simply kept outside the metric&rsquo;s semantic
              cluster until after your commitment.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
