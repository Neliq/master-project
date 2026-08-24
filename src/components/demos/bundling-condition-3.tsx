"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Bundling — Condition 3: Semantic Suppression of Individual Item Descriptions
 *
 * Thesis: the algorithm compares the average text length and descriptive
 * granularity of item descriptions inside a bundle against equivalent
 * standalone product descriptions on the same site. The feature triggers if
 * bundled items receive semantically impoverished descriptions — shorter
 * text, fewer feature mentions, missing specification rows — quantified as
 * a description-entropy ratio below the threshold:
 *
 *   H(T_bundled) / H(T_standalone) < τ_description
 *
 * Variant A (dark): the lens in the bundle is described with a single
 * under-specified sentence and zero specification rows, while the identical
 * lens sold standalone carries the full description and six spec rows.
 * Variant B (benign): the bundled item carries exactly the same full
 * description and spec rows as the standalone listing (ratio = 1).
 */

const usd = (n: number) => `$${n.toFixed(2)}`;
const LENS_NAME = "50mm f/1.8 Prime Lens";
const LENS_PRICE = 349;

const BUNDLED_DESC =
  "50mm f/1.8 prime lens for the Nova X100.";

const STANDALONE_DESC =
  "Fast 50mm f/1.8 prime lens with excellent low-light performance, a 9-blade circular aperture for creamy bokeh, STM stepping autofocus for silent video work, a 58mm filter thread, and a compact 160 g body that is ideal for travel and portrait photography.";

const STANDALONE_SPECS = [
  "Aperture range f/1.8 – f/16",
  "9-blade circular diaphragm",
  "STM silent stepping autofocus",
  "58mm filter thread",
  "160 g weight",
  "Portrait-optimized bokeh",
];

const bundledTokens = BUNDLED_DESC.split(/\s+/).length;
const standaloneTokens = STANDALONE_DESC.split(/\s+/).length;
const entropyRatio = bundledTokens / standaloneTokens;

export function BundlingCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [added, setAdded] = React.useState(false);

  const reset = () => setAdded(false);

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">H(T_bundled) tokens (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{bundledTokens}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">H(T_standalone) tokens</span>
        <span className="font-mono font-semibold tabular-nums">{standaloneTokens}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Entropy ratio (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">
          {entropyRatio.toFixed(2)} (&lt; 0.5)
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Spec rows bundled / standalone</span>
        <span className="font-mono font-semibold tabular-nums">0 / {STANDALONE_SPECS.length}</span>
      </div>
    </>
  ) : null;

  const renderPanel = (dark: boolean) => {
    const desc = dark ? BUNDLED_DESC : STANDALONE_DESC;
    const specRows = dark ? [] : STANDALONE_SPECS;
    return (
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-[11px] font-semibold">Creator Bundle</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Nova X100 Camera + {LENS_NAME} + Hard Case
              </p>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-[13px] font-bold tabular-nums">$1,199</div>
              <div className="text-[8px] uppercase tracking-wider text-muted-foreground">bundle</div>
            </div>
          </div>

          <div className="mt-2 border-t border-border pt-2">
            <div className="text-[10px] font-medium">{LENS_NAME}</div>
            <p className={`mt-0.5 leading-relaxed text-muted-foreground ${dark ? "text-[9px]" : "text-[10px]"}`}>
              {desc}
            </p>
            {dark ? (
              <p className="mt-1 text-[8px] italic text-muted-foreground/60">
                No specification rows listed.
              </p>
            ) : (
              <ul className="mt-1.5 grid grid-cols-1 gap-0.5">
                {specRows.map((s) => (
                  <li key={s} className="flex items-center gap-1 text-[8px] text-muted-foreground">
                    <svg className="h-2 w-2 shrink-0 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            onClick={() => setAdded(true)}
            className={`mt-3 w-full cursor-pointer rounded-md py-1.5 text-[10px] font-medium text-white transition-colors ${
              dark ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {added ? "Added to cart ✓" : "Add bundle to cart"}
          </button>
        </div>

        <div className="rounded-md border bg-background p-3">
          <div className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground">
            Same item, sold separately
          </div>
          <div className="mt-1.5 flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="text-[10px] font-medium">{LENS_NAME}</div>
              <p className="mt-0.5 text-[9px] leading-relaxed text-muted-foreground">{STANDALONE_DESC}</p>
              <ul className="mt-1.5 space-y-0.5">
                {STANDALONE_SPECS.map((s) => (
                  <li key={s} className="flex items-center gap-1 text-[8px] text-muted-foreground">
                    <svg className="h-2 w-2 shrink-0 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 text-right">
              <div className="text-[11px] font-bold tabular-nums">{usd(LENS_PRICE)}</div>
            </div>
          </div>
        </div>

        {added &&
          (dark ? (
            <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold uppercase tracking-tight text-yellow-700 dark:text-yellow-300">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 9v4m0 4h.01" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
                Description entropy suppressed
              </div>
              <p className="text-muted-foreground mt-1">
                Inside the bundle the lens gets a {bundledTokens}-token one-liner with zero spec
                rows, while the standalone listing carries {standaloneTokens} tokens and{" "}
                {STANDALONE_SPECS.length} detailed specification rows are available on the standalone listing. The bundle
                includes a concise summary of the same components.
              </p>
            </div>
          ) : (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold uppercase tracking-tight text-green-700 dark:text-green-300">
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Full descriptive parity
              </div>
              <p className="text-muted-foreground mt-1">
                The bundled lens carries the identical {standaloneTokens}-token description and all{" "}
                {STANDALONE_SPECS.length} spec rows as the standalone listing — H(T_bundled)/
                H(T_standalone) = 1.00, so the components are fully evaluable.
              </p>
            </div>
          ))}
      </div>
    );
  };

  return (
    <DemoShell
      mode={mode}
      annotations={annotations}
      onRestart={onRestart ?? reset}
      title="Bundling: Semantic Suppression of Individual Item Descriptions"
      caption="Semantic Suppression of Individual Item Descriptions — bundled items receive shorter, less granular descriptions than their standalone counterparts, dropping the description-entropy ratio below the threshold."
      auditorStats={stats}
      deltaNote={`Variant A describes the bundled lens with ${bundledTokens} tokens and no spec rows versus ${standaloneTokens} tokens and ${STANDALONE_SPECS.length} rows standalone (ratio ${entropyRatio.toFixed(2)} < 0.5). Variant B gives the bundled item the exact same description and spec rows as the standalone listing (ratio 1.00).`}
      benign={renderPanel(false)}
    >
      {renderPanel(true)}
    </DemoShell>
  );
}
