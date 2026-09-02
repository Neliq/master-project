"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Complex Language — Condition 3: Exceedance of Baseline Readability Indices
 *
 * Thesis: FKGL(N_text) estimates the years of education required to parse a
 * disclosure, contrasted against τ_education_limit — the general public's
 * reading level (typically 8th–10th grade). The feature triggers if the
 * computed grade level of consumer-facing disclosures severely exceeds the
 * threshold:
 *
 *   FKGL(N_text) > τ_education_limit
 *
 * Variant A (dark): a data-processing disclosure with a graduate-level FKGL.
 * Variant B (benign): the same payload at an elementary reading level.
 */

const DISCLOSURE_DARK =
  "THE DATA SUBJECT ACKNOWLEDGES AND CONSENTS TO THE CONTROLLER'S UTILIZATION OF AUTOMATED DECISION-MAKING PROCESSES, INCLUDING PROPENSITY MODELING, BEHAVIORAL SEGMENTATION, AND PREDICTIVE PROFILING, FOR THE OPTIMIZATION OF SERVICE DELIVERY AND THE PERSONALIZATION OF CONTENT RECOMMENDATIONS. SUCH PROCESSING CONSTITUTES A LEGITIMATE INTEREST PURSUANT TO ART. 6(1)(F) OF THE GENERAL DATA PROTECTION REGULATION AND SHALL BE EFFECTUATED WITHOUT PREJUDICE TO THE DATA SUBJECT'S STATUTORY RIGHTS OF OBJECTION, ERASURE, OR DATA PORTABILITY AS ENUMERATED IN CHAPTER III THEREOF. THE DATA SUBJECT FURTHER ACKNOWLEDGES THAT THE FOREGOING AUTHORIZATION EXTENDS TO TARGETED COMMERCIAL COMMUNICATIONS FACILITATED BY THE AFOREMENTIONED PROCESSING ACTIVITIES.";

const DISCLOSURE_BENIGN =
  "We use your data to show useful suggestions and offers. You can turn this off in Settings. You can see, fix, or delete your data at any time.";

const TAU_EDUCATION_LIMIT = 9.0;

function countSyllables(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;
  const groups = w.match(/[aeiouy]+/g);
  let n = groups ? groups.length : 0;
  if (w.endsWith("e") && n > 1) n -= 1;
  return Math.max(1, n);
}

function fkgl(text: string): number {
  const sentences = (text.match(/[^.!?]+[.!?]+/g) ?? [text]).length;
  const words = text.split(/\s+/).filter(Boolean);
  const syllables = words.reduce((sum, w) => sum + countSyllables(w), 0);
  if (words.length === 0 || sentences === 0) return 0;
  return 0.39 * (words.length / sentences) + 11.8 * (syllables / words.length) - 15.59;
}

const FKGL_DARK = fkgl(DISCLOSURE_DARK);
const FKGL_BENIGN = fkgl(DISCLOSURE_BENIGN);

export function ComplexLanguageCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [agreed, setAgreed] = React.useState(false);
  const [created, setCreated] = React.useState(false);

  const reset = () => {
    setAgreed(false);
    setCreated(false);
  };

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">FKGL(N_text) (dark)</span>
        <span className="font-mono font-semibold tabular-nums text-red-500">{FKGL_DARK.toFixed(1)} &gt; &tau;_edu ({TAU_EDUCATION_LIMIT})</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">FKGL (benign)</span>
        <span className="font-mono font-semibold tabular-nums text-green-500">{FKGL_BENIGN.toFixed(1)}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Public reading level (τ)</span>
        <span className="font-mono font-semibold tabular-nums">{TAU_EDUCATION_LIMIT} (grade 9)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Consent given?</span>
        <span className="font-mono font-semibold tabular-nums">{agreed ? "Yes" : "No"}</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Complex Language: Exceedance of Baseline Readability Indices"
      caption="Exceedance of Baseline Readability Indices — the disclosure demands a graduate-level education (FKGL ≈ 21) while the general public reads at an 8th–10th grade level."
      auditorStats={stats}
      deltaNote={`In Variant A the disclosure's Flesch-Kincaid Grade Level is ${FKGL_DARK.toFixed(1)} — far above τ_education_limit = ${TAU_EDUCATION_LIMIT} — while Variant B states the identical payload at a ${FKGL_BENIGN.toFixed(1)}-grade level.`}
      benign={
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-[11px] font-semibold">Create your account</h3>
                <p className="text-[9px] text-muted-foreground mt-0.5">Read the data-processing notice, then confirm.</p>
              </div>
              <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-green-500 rounded-full border border-green-500/30 px-2 py-0.5 shrink-0">
                {mode === "auditor" ? `FKGL ${FKGL_BENIGN.toFixed(1)}` : "Plain-language notice"}
              </div>
            </div>

            <div className="mt-3 max-h-32 overflow-y-auto rounded-md border bg-background p-2.5">
              <p className="text-[11px] leading-relaxed text-foreground/80">{DISCLOSURE_BENIGN}</p>
            </div>

            <label className="mt-3 flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 flex-shrink-0 accent-green-500"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                  I have read and understand the Data Processing Notice
                </div>
                <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                  {mode === "auditor" ? `Readability score: FKGL ${FKGL_BENIGN.toFixed(1)}.` : "You can change this choice later in Settings."}
                </div>
              </div>
            </label>

            <button
              onClick={() => setCreated(true)}
              disabled={!agreed}
              className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
                agreed
                  ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                  : "bg-muted text-muted-foreground/40 cursor-not-allowed"
              }`}
            >
              Create account
            </button>
          </div>

          {created && (
            <div className="rounded-md border border-green-500/30 bg-green-500/5 p-2.5 text-[9px] leading-relaxed">
              <div className="flex items-center gap-1.5 font-semibold text-green-700 dark:text-green-300 uppercase tracking-tight">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Genuine consent
              </div>
              <p className="text-muted-foreground mt-0.5">
                FKGL {FKGL_BENIGN.toFixed(1)} ≤ τ_education_limit ({TAU_EDUCATION_LIMIT}) — the notice matched your
                reading level, so the consent you gave was real.
              </p>
            </div>
          )}
        </div>
      }>
      {/* ── Variant A: dark pattern ── */}
      <div className="space-y-3">
        <div className="rounded-md border bg-card p-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h3 className="text-[11px] font-semibold">Create your account</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5">Read the data-processing notice, then confirm.</p>
            </div>
            <div className="text-[8px] font-mono font-semibold uppercase tracking-wider text-red-500 rounded-full border border-red-500/30 px-2 py-0.5 shrink-0">
              {mode === "auditor" ? `FKGL ${FKGL_DARK.toFixed(1)}` : "Terms"}
            </div>
          </div>

          <div className="mt-3 max-h-32 overflow-y-auto rounded-md border bg-background p-2.5">
            <p className="text-[9px] leading-relaxed text-foreground/70">{DISCLOSURE_DARK}</p>
            <p className="mt-1 text-[7px] italic text-red-500/70">
              {mode === "auditor" ? `FKGL ${FKGL_DARK.toFixed(1)} — requires collegiate/legal education.` : "Please read the full notice before continuing."}
            </p>
          </div>

          <label className="mt-3 flex items-start gap-2 cursor-pointer group rounded-md border border-border bg-background p-2.5 transition-colors">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 flex-shrink-0 accent-red-500"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[10px] leading-relaxed text-foreground/80 select-none group-hover:text-foreground transition-colors">
                I have read and understand the Data Processing Notice
              </div>
              <div className="text-[8px] text-muted-foreground/50 mt-0.5">
                {mode === "auditor" ? "The notice is 3 sentences long." : "You can review the notice before you continue."}
              </div>
            </div>
          </label>

          <button
            onClick={() => setCreated(true)}
            disabled={!agreed}
            className={`mt-2 w-full rounded-md py-1.5 text-[10px] font-medium transition-all ${
              agreed
                ? "bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                : "bg-muted text-muted-foreground/40 cursor-not-allowed"
            }`}
          >
            Create account
          </button>
        </div>

        {mode === "auditor" && created && (
          <div className="rounded-md border border-yellow-500/30 bg-yellow-500/5 p-2.5 text-[9px] leading-relaxed space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-yellow-700 dark:text-yellow-300 uppercase tracking-tight">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 9v4m0 4h.01" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Additional terms
            </div>
            <p className="text-muted-foreground">
              FKGL(N_text) = <span className="font-mono text-red-500">{FKGL_DARK.toFixed(1)}</span> — the disclosure
              requires a graduate-level education — while the general public reads at grade{" "}
              <span className="font-mono">{TAU_EDUCATION_LIMIT}</span>. {FKGL_DARK.toFixed(1)} &gt; &tau;_education_limit, so the
              trigger fires.
            </p>
            <p className="text-muted-foreground">
              You just certified that you &ldquo;read and understood&rdquo; a text that consumes the whole consent
              decision with jargon. This is not informed consent — it is a reading-comprehension barrier dressed as a
              checkbox.
            </p>
            <details className="group">
              <summary className="cursor-pointer font-medium text-muted-foreground transition-colors hover:text-foreground">
                Show plain-English version
              </summary>
              <p className="mt-1 rounded border border-green-500/20 bg-green-500/5 p-2 text-[9px] text-green-700 dark:text-green-300">
                {DISCLOSURE_BENIGN}
              </p>
            </details>
          </div>
        )}
      </div>
    </DemoShell>
  );
}
