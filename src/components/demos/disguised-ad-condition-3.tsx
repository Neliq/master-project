"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";
import { ChevronLeft, ChevronRight, Megaphone, BookOpen } from "lucide-react";

/*
 * Disguised Ad — Condition 3: Semantic Mimicry of Native Action Labels
 *
 * Thesis: N_ad is a third-party advertising node; L_native is the corpus of
 * native functional labels (e.g. "Download," "Next," "Play"). The feature
 * fires if the ad's button label is semantically near-identical to a native
 * function label, indicating deliberate linguistic impersonation:
 *
 *   max sim(L(N_ad), ℓ) > τ_masquerade
 *     ℓ ∈ L_native
 *
 * Variant A (dark): an in-article ad button is labeled "Next" — semantically
 * identical to the native pagination control below the article.
 * Variant B (benign): the same ad carries a plainly descriptive label,
 * "Learn more about our sponsor," far from any native label.
 */

const NATIVE_LABELS = ["Play", "Next", "Download"];
const TAU_MASQUERADE = 0.75;
const SIM_DARK = 0.99; // "Next" vs native "Next"
const SIM_BENIGN = 0.18; // "Learn more about our sponsor" vs corpus

const AD_LABEL_DARK = "Next";
const AD_LABEL_BENIGN = "Learn more about our sponsor";

export function DisguisedAdCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [page, setPage] = React.useState<1 | 2>(1);
  const [adClicked, setAdClicked] = React.useState<null | "dark" | "benign">(null);

  const reset = () => {
    setPage(1);
    setAdClicked(null);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">L_native corpus</span>
        <span className="font-mono font-semibold tabular-nums">{"{"}{NATIVE_LABELS.join(", ")}{"}"}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Label(N_ad) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">&ldquo;{AD_LABEL_DARK}&rdquo;</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">max sim(L(N_ad), ℓ) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{SIM_DARK} &gt; τ_masquerade ({TAU_MASQUERADE})</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">max sim — benign</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{SIM_BENIGN} &le; τ_masquerade</span>
      </div>
    </>
  ) : null;

  const nativePagination = (
    <div className="flex items-center justify-between rounded-md border bg-background px-2 py-1.5">
      <button
        onClick={() => setPage(1)}
        disabled={page === 1}
        className={`flex items-center gap-1 rounded px-1.5 py-1 text-[9px] font-semibold transition-colors ${
          page === 1 ? "text-muted-foreground/30 cursor-not-allowed" : "text-foreground hover:bg-muted cursor-pointer"
        }`}
      >
        <ChevronLeft className="h-3 w-3" /> Previous
      </button>
      <span className="font-mono text-[8px] text-muted-foreground">
        page {page} / 2 <span className="ml-1 text-[7px]">(native control — D_host)</span>
      </span>
      <button
        onClick={() => setPage(2)}
        disabled={page === 2}
        className={`flex items-center gap-1 rounded px-1.5 py-1 text-[9px] font-semibold transition-colors ${
          page === 2 ? "text-muted-foreground/30 cursor-not-allowed" : "text-foreground hover:bg-muted cursor-pointer"
        }`}
      >
        Next <ChevronRight className="h-3 w-3" />
      </button>
    </div>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Disguised Ad: Semantic Mimicry of Native Action Labels"
      caption="Semantic Mimicry of Native Action Labels — the ad's button label is semantically near-identical to a native functional label such as “Next”, “Play”, or “Download”, impersonating the interface's own vocabulary."
      auditorStats={stats}
      deltaNote={`The article, the native pagination, and the ad placement are identical in both panels. In Variant A the ad's button is labeled "${AD_LABEL_DARK}" — cosine similarity ${SIM_DARK} with the native "Next" label, above τ_masquerade (${TAU_MASQUERADE}) — so clicking it looks like turning the page. In Variant B the same ad is labeled "${AD_LABEL_BENIGN}" (sim ${SIM_BENIGN}), semantically distant from every native label.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-background p-3">
            <div className="mb-1 flex items-center gap-1.5">
              <BookOpen className="h-3 w-3 text-muted-foreground" />
              <span className="text-[9px] font-semibold">TechDaily — Read</span>
            </div>
            <h3 className="text-[11px] font-bold leading-snug">Why your phone is always listening (and what to do)</h3>
            <p className="mt-1 text-[9px] leading-relaxed text-muted-foreground">
              {page === 1
                ? "Voice assistants wake on trigger words, but the microphone pipeline is always hot. We measured the actual data flow between your phone and the vendor's cloud over 30 days, and the results are… complicated."
                : "Page two: opt-out paths differ wildly by vendor, and most settings screens bury the toggle behind three menus. Our checklist walks through each major platform, one setting at a time."}
            </p>
          </div>

          {/* Ad box — plainly descriptive label (sim ≤ τ_masquerade) */}
          <div className="rounded-md border-2 border-dashed border-yellow-400/50 bg-yellow-500/10 p-2.5">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1 rounded-full bg-yellow-500 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-wider text-white">
                <Megaphone className="h-2.5 w-2.5" /> Advertisement
              </span>
              <span className="text-[7px] font-medium text-muted-foreground">third-party · sponsor</span>
            </div>
            <p className="text-[9px] leading-relaxed text-muted-foreground">
              Our sponsor builds privacy-focused VPNs for the whole family. Take a look if you are shopping around.
            </p>
            <button
              onClick={() => setAdClicked("benign")}
              className="mt-1.5 w-full rounded border border-yellow-400/60 py-1.5 text-[9px] font-semibold text-yellow-700 dark:text-yellow-300 transition-colors hover:bg-yellow-500/10 cursor-pointer"
            >
              {AD_LABEL_BENIGN}
            </button>
          </div>

          {nativePagination}

          {adClicked === "benign" && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <Megaphone className="h-3 w-3" /> No linguistic impersonation
              </div>
              <p className="text-muted-foreground">
                max sim(L(N<sub>ad</sub>), ℓ) over L<sub>native</sub> = {"{"}{NATIVE_LABELS.join(", ")}{"}"} is{" "}
                {SIM_BENIGN} ≤ τ<sub>masquerade</sub> ({TAU_MASQUERADE}). The label describes the ad honestly — no native
                action word was borrowed.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-background p-3">
          <div className="mb-1 flex items-center gap-1.5">
            <BookOpen className="h-3 w-3 text-muted-foreground" />
            <span className="text-[9px] font-semibold">TechDaily — Read</span>
          </div>
          <h3 className="text-[11px] font-bold leading-snug">Why your phone is always listening (and what to do)</h3>
          <p className="mt-1 text-[9px] leading-relaxed text-muted-foreground">
            {page === 1
              ? "Voice assistants wake on trigger words, but the microphone pipeline is always hot. We measured the actual data flow between your phone and the vendor's cloud over 30 days, and the results are… complicated."
              : "Page two: opt-out paths differ wildly by vendor, and most settings screens bury the toggle behind three menus. Our checklist walks through each major platform, one setting at a time."}
          </p>
        </div>

        {/* Ad box — button labeled "Next", semantically identical to native pagination */}
        <div className="rounded-md border bg-card p-2.5">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[7px] font-bold uppercase tracking-wider text-muted-foreground/40 select-none">AD</span>
            <span className="text-[7px] font-medium text-muted-foreground/60">Continue reading</span>
          </div>
          <p className="text-[9px] leading-relaxed text-muted-foreground">
            Some vendors offer a free tier. Some don&rsquo;t. Find out which of the big three actually keeps logs.
          </p>
          <button
            onClick={() => setAdClicked("dark")}
            className="mt-1.5 flex w-full items-center justify-center gap-1 rounded-md bg-foreground py-1.5 text-[9px] font-bold text-background transition-opacity hover:opacity-90 cursor-pointer"
          >
            {AD_LABEL_DARK} <ChevronRight className="h-3 w-3" />
          </button>
        </div>

        {nativePagination}

        {adClicked === "dark" && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="mb-0.5 flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Semantic masquerade — that was an ad
            </div>
            <p className="text-muted-foreground">
              max sim(L(N<sub>ad</sub>), ℓ) over L<sub>native</sub> = <strong className="text-red-500">{SIM_DARK} &gt; τ<sub>masquerade</sub></strong>{" "}
              ({TAU_MASQUERADE}): the ad button borrowed the native pagination&rsquo;s exact word, &ldquo;{AD_LABEL_DARK}&rdquo;.
              Clicking it sends you to the sponsor — not to page two. The page you wanted stays one click further away.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
