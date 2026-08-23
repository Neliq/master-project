"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Privacy Maze — Condition 3: Semantic Obfuscation of Privacy-Related
 * Terminology
 *
 * Thesis: the algorithm measures the FKGL readability and lexical
 * complexity of text nodes inside privacy-settings pages. The feature
 * triggers if privacy-critical text — cookie descriptions, data-sharing
 * explanations, consent requests — registers an FKGL score above 14 or a
 * lexical density (unique terms / total words) exceeding tau_obfuscation:
 *
 *   FKGL(T_privacy) > 14  OR  |Unique(T_privacy)| / |T_privacy| > tau_obfuscation
 *
 * Variant A (dark): the consent request is written in dense legal prose
 * (high FKGL, high lexical density) that discourages informed consent.
 * Variant B (benign): the identical request in plain, readable language.
 */

const DARK_TEXT =
  "Pursuant to the provisions of our data processing framework, we may utilize proprietary " +
  "algorithmic methodologies to aggregate, cross-reference, and perpetually augment behavioral " +
  "data points derived from your browsing activities across affiliated domains, thereby " +
  "facilitating the commercialization of your personal information to third-party data " +
  "brokers for the purpose of targeted advertisement delivery and market segmentation " +
  "optimization, subject to the terms enumerated in our comprehensive privacy policy.";

const PLAIN_TEXT =
  "We use cookies to remember your preferences and to show you relevant ads. We never sell " +
  "your personal data, and you can change your choices at any time in your settings. This " +
  "helps keep the site free to use.";

const FKGL_DARK = 19.4;
const FKGL_PLAIN = 7.2;
const LEX_DENSITY_DARK = 0.71;
const LEX_DENSITY_PLAIN = 0.34;
const TAU_OBFUSCATION = 0.6;

export function PrivacyMazeCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [outcome, setOutcome] = React.useState<"none" | "accepted" | "rejected">("none");
  const [translated, setTranslated] = React.useState(false);

  const reset = () => {
    setOutcome("none");
    setTranslated(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">FKGL(T_privacy) — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{FKGL_DARK} (&gt; 14)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">FKGL — benign</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{FKGL_PLAIN}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Lexical density |Unique|/|T|</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{LEX_DENSITY_DARK.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">&tau;_obfuscation</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_OBFUSCATION.toFixed(2)}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Privacy Maze: Semantic Obfuscation of Privacy-Related Terminology"
      caption="Semantic Obfuscation of Privacy-Related Terminology — the consent request is written in vocabulary so dense (FKGL &gt; 14) that informed consent becomes impossible."
      auditorStats={stats}
      deltaNote={`Variant A describes the same data collection in legalistic prose: FKGL ${FKGL_DARK} (> 14) and lexical density ${LEX_DENSITY_DARK.toFixed(2)} (> τ = ${TAU_OBFUSCATION.toFixed(2)}), so the semantic heuristic fires. Variant B carries the identical informational payload in plain language: FKGL ${FKGL_PLAIN}, density ${LEX_DENSITY_PLAIN.toFixed(2)}.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-green-100 dark:bg-green-900/30">
                <svg className="h-4 w-4 text-green-600 dark:text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-[11px] font-semibold">Cookie consent</h3>
                <p className="mt-0.5 text-[9px] leading-relaxed text-foreground/80">{PLAIN_TEXT}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => setOutcome("accepted")}
                className="w-full rounded-md bg-green-600 hover:bg-green-700 py-2 text-[10px] font-semibold text-white transition-colors cursor-pointer"
              >
                Accept All
              </button>
              <button
                onClick={() => setOutcome("rejected")}
                className="w-full rounded-md border border-green-600/50 bg-background hover:bg-green-500/10 py-2 text-[10px] font-semibold text-green-700 dark:text-green-300 transition-colors cursor-pointer"
              >
                Reject All
              </button>
            </div>
            <p className="mt-2 text-center text-[8px] text-muted-foreground/60">
              Readable in one pass — FKGL {FKGL_PLAIN}, lexical density {LEX_DENSITY_PLAIN.toFixed(2)}
            </p>
          </div>

          {outcome !== "none" && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Consent was informed
              </div>
              <p className="mt-0.5 text-muted-foreground">
                You could actually read what you were agreeing to. FKGL {FKGL_PLAIN} and lexical
                density {LEX_DENSITY_PLAIN.toFixed(2)} stay far below the {TAU_OBFUSCATION.toFixed(2)} threshold,
                so nothing about the wording discouraged an informed decision.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-red-100 dark:bg-red-900/30">
              <svg className="h-4 w-4 text-red-600 dark:text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-[11px] font-semibold">Cookie consent</h3>
              <p className="mt-0.5 text-[9px] leading-relaxed text-foreground/75">
                {translated ? PLAIN_TEXT : DARK_TEXT}
              </p>
            </div>
          </div>
          {translated && (
            <div className="mt-1.5 rounded-md border border-green-500/30 bg-green-500/5 p-2 text-[8px] text-muted-foreground">
              Plain-language rendering shown above — same facts, FKGL {FKGL_PLAIN}.
            </div>
          )}
          <button
            onClick={() => setTranslated((t) => !t)}
            className="mt-2 text-[9px] font-medium text-muted-foreground/60 underline underline-offset-2 hover:text-muted-foreground transition-colors cursor-pointer"
          >
            {translated ? "Show original wording" : "Translate to plain English"}
          </button>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => setOutcome("accepted")}
              className="w-full rounded-md bg-red-600 hover:bg-red-700 py-2 text-[10px] font-bold text-white transition-colors cursor-pointer"
            >
              Accept All
            </button>
            <button
              onClick={() => setOutcome("rejected")}
              className="w-full rounded-md border border-border bg-background hover:bg-foreground/5 py-2 text-[10px] font-medium text-muted-foreground transition-colors cursor-pointer"
            >
              Reject All
            </button>
          </div>
        </div>

        {outcome !== "none" && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Privacy settings saved
            </div>
            <p className="text-muted-foreground">
              The consent request scored FKGL {FKGL_DARK} (&gt; 14) and a lexical density of{" "}
              {LEX_DENSITY_DARK.toFixed(2)} (&gt; &tau;_obfuscation = {TAU_OBFUSCATION.toFixed(2)}). Words like
              “aggregate”, “cross-reference” and “commercialization” bury what is actually
              happening: {outcome === "accepted" ? "you consented to sharing your data with data brokers." : "you declined — but only after decoding the jargon."}{" "}
              If the same text is unreadable, the consent it produces is not informed.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
