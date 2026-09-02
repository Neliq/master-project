"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Customisation (Interface Nesting) — Condition 3: Semantic Obfuscation
 * of Privacy Toggle Labels
 *
 * Thesis: the algorithm evaluates the FKGL readability and technical-
 * jargon density of labels describing privacy-relevant toggles. The
 * feature triggers if privacy-toggle labels contain domain-specific
 * technical terminology ("interest-based advertising", "cross-device
 * graph linkage") without accompanying plain-language explanations,
 * quantified as a jargon ratio exceeding tau_jargon:
 *
 *   |{w in L(N_privacy) : w in D_jargon}| / |L(N_privacy)| > tau_jargon
 *
 * Variant A (dark): toggle labels are jargon-dense and carry no plain-
 * language explanation.
 * Variant B (benign): the same toggles in plain language, each with an
 * explanation.
 */

const JARGON_WORDS = new Set([
  "interest-based", "advertising", "cross-device", "graph", "linkage", "programmatic",
  "monetisation", "monetization", "behavioural", "behavioral", "cohort", "segmentation",
  "third-party", "audience", "enrichment", "personalisation", "personalization",
  "telemetry", "attribution", "behavioural", "algorithmic",
]);

const DARK_LABELS = [
  "Interest-based advertising",
  "Cross-device graph linkage",
  "Programmatic data monetisation",
  "Behavioural cohort segmentation",
  "Third-party audience enrichment",
];

const BENIGN_LABELS = [
  "Show personalised ads",
  "Link my activity across devices",
  "Share anonymised usage data",
  "Group me with similar users",
  "Use data from other companies",
];

const BENIGN_NOTES = [
  "Ads based on what you browse on this site.",
  "Match your preferences across your phone and laptop.",
  "Help us improve the product with statistics.",
  "For better product features, not for selling your identity.",
  "Enrich your profile with publicly available information.",
];

function jargonRatio(labels: string[]): number {
  const words = labels.flatMap((l) => l.toLowerCase().split(/\s+/));
  const jargon = words.filter((w) => JARGON_WORDS.has(w)).length;
  return jargon / words.length;
}

const DARK_RATIO = jargonRatio(DARK_LABELS);
const BENIGN_RATIO = jargonRatio(BENIGN_LABELS);
const TAU_JARGON = 0.4;

export function CustomisationCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [onIdsA, setOnIdsA] = React.useState<string[]>(["d1", "d2", "d3"]);
  const [onIdsB, setOnIdsB] = React.useState<string[]>(["d1", "d2", "d3"]);
  const [savedA, setSavedA] = React.useState(false);
  const [savedB, setSavedB] = React.useState(false);
  const [translatedA, setTranslatedA] = React.useState(false);

  const reset = () => {
    setOnIdsA(["d1", "d2", "d3"]);
    setOnIdsB(["d1", "d2", "d3"]);
    setSavedA(false);
    setSavedB(false);
    setTranslatedA(false);
  };

  const toggle = (
    id: string,
    setOnIds: React.Dispatch<React.SetStateAction<string[]>>,
  ) => setOnIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Jargon ratio — dark</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{DARK_RATIO.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Jargon ratio — benign</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{BENIGN_RATIO.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Threshold &tau;_jargon</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_JARGON.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Trigger: {DARK_RATIO.toFixed(2)} &gt; {TAU_JARGON.toFixed(2)}</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">TRUE</span>
      </div>
    </>
  ) : null;

  const renderDarkToggle = (
    label: string,
    id: string,
    onIds: string[],
    setOnIds: React.Dispatch<React.SetStateAction<string[]>>,
  ) => (
    <label key={id} className="flex cursor-pointer items-start gap-2 rounded-md border border-border bg-background p-2 transition-colors hover:border-foreground/20">
      <input
        type="checkbox"
        checked={onIds.includes(id)}
        onChange={() => toggle(id, setOnIds)}
        className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 accent-red-500"
      />
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] leading-relaxed text-foreground/80">{label}</span>
        <span className="mt-0.5 block text-[8px] text-muted-foreground/40">No plain-language explanation provided.</span>
      </span>
    </label>
  );

  const renderBenignToggle = (
    label: string,
    note: string,
    id: string,
    onIds: string[],
    setOnIds: React.Dispatch<React.SetStateAction<string[]>>,
  ) => (
    <label key={id} className="flex cursor-pointer items-start gap-2 rounded-md border border-border bg-background p-2 transition-colors hover:border-foreground/20">
      <input
        type="checkbox"
        checked={onIds.includes(id)}
        onChange={() => toggle(id, setOnIds)}
        className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 accent-green-500"
      />
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] leading-relaxed text-foreground/80">{label}</span>
        <span className="mt-0.5 block text-[8px] text-muted-foreground/60">{note}</span>
      </span>
    </label>
  );

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Customisation (Interface Nesting): Semantic Obfuscation of Privacy Toggle Labels"
      userTitle="Orbit — Data settings"
      caption="Semantic Obfuscation of Privacy Toggle Labels — the toggles that control data sharing are labelled in domain jargon with no plain-language explanation, so their jargon ratio trips the &tau;_jargon threshold."
      auditorStats={stats}
      deltaNote={`Variant A's toggle labels are jargon-dense: ${DARK_LABELS.length} labels yield a jargon ratio of ${DARK_RATIO.toFixed(2)} (> τ_jargon = ${TAU_JARGON.toFixed(2)}) and carry no explanations. Variant B says the same things in plain language with a short explanation per toggle — jargon ratio ${BENIGN_RATIO.toFixed(2)}.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-[11px] font-semibold">Data &amp; personalisation</h3>
              <span className="rounded-full border border-green-500/30 px-2 py-0.5 text-[8px] font-mono font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
                plain language
              </span>
            </div>
            <div className="space-y-1.5">
              {BENIGN_LABELS.map((label, i) => renderBenignToggle(label, BENIGN_NOTES[i], `b${i}`, onIdsB, setOnIdsB))}
            </div>
            <button
              onClick={() => setSavedB(true)}
              className="mt-2.5 w-full rounded-md bg-green-600 hover:bg-green-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
            >
              Save preferences
            </button>
          </div>

          {savedB && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Informed choices
              </div>
              <p className="mt-0.5 text-muted-foreground">
                Every label uses plain language with an explanation attached, so you knew exactly what
                each toggle did before flipping it.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold">Data &amp; personalisation</h3>
            <span className="font-mono text-[8px] tabular-nums text-muted-foreground/50">
              Some labels need clarification
            </span>
          </div>
          <div className="space-y-1.5">
            {DARK_LABELS.map((label, i) => renderDarkToggle(label, `d${i}`, onIdsA, setOnIdsA))}
          </div>
          <button
            onClick={() => setSavedA(true)}
            className="mt-2.5 w-full rounded-md bg-red-600 hover:bg-red-700 py-1.5 text-[10px] font-medium text-white transition-colors cursor-pointer"
          >
            Save preferences
          </button>
          <button
            onClick={() => setTranslatedA((t) => !t)}
            className="mt-1.5 w-full py-1 text-[9px] font-medium text-muted-foreground/60 underline underline-offset-2 hover:text-muted-foreground transition-colors cursor-pointer"
          >
            {translatedA ? "Hide plain-language translations" : "Show plain-language translations"}
          </button>
        </div>

        {translatedA && (
          <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
            <div className="mb-1 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
              What the labels actually mean
            </div>
            <ul className="space-y-1 text-muted-foreground">
              <li><strong className="text-foreground">Interest-based advertising:</strong> show ads based on what you browse.</li>
              <li><strong className="text-foreground">Cross-device graph linkage:</strong> match your activity across your phone and laptop.</li>
              <li><strong className="text-foreground">Programmatic data monetisation:</strong> sell anonymised usage data.</li>
              <li><strong className="text-foreground">Behavioural cohort segmentation:</strong> group you with similar users.</li>
              <li><strong className="text-foreground">Third-party audience enrichment:</strong> use data from other companies.</li>
            </ul>
          </div>
        )}

        {mode === "auditor" && savedA && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Review personalization settings
            </div>
            <p className="text-muted-foreground">
              Jargon ratio = {DARK_RATIO.toFixed(2)} &gt; &tau;_jargon = {TAU_JARGON.toFixed(2)}. Terms like
              “cross-device graph linkage” and “behavioural cohort segmentation” are technical
              terminology from D_jargon, and none of the {DARK_LABELS.length} labels came with a
              plain-language explanation — so you could not tell what you were consenting to
              without external knowledge. {onIdsA.length} of the {DARK_LABELS.length} toggles remain on.
            </p>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
