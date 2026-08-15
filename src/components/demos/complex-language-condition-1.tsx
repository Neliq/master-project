"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * A deliberately impenetrable privacy / data disclosure.
 * Flesch–Kincaid Grade Level ~22 (graduate-level).
 * Monstrous sentences, arcane vocabulary, nested clauses,
 * Latin borrowings, weasel words, and passive voice stacking.
 */

const OBFUSCATED_POLICY = `NOTWITHSTANDING ANY CONTRARY INDICATIONS OSTENSIBLY MANIFESTED WITHIN THE PURVIEW OF THE FOREGOING PROVISIONS, THE USER (HEREINAFTER "DATA SUBJECT" PER ART. 4(1) OF THE GENERAL DATA PROTECTION REGULATION) DOES HEREBY ACKNOWLEDGE, COVENANT, AND AGREE — IRREVOCABLY AND WITHOUT RESERVATION OF ANY SUBSEQUENT RIGHT OF NULLIFICATION, WITHDRAWAL, OR IMPEACHMENT — THAT THE PLATFORM (HEREINAFTER "CONTROLLER"), ITS SUBSIDIARIES, AFFILIATES, SUCCESSORS-IN-INTEREST, ASSIGNS, AND ANY THIRD-PARTY DATA PROCESSORS ENGAGED BY THE CONTROLLER PURSUANT TO THE MECHANISMS DESCRIBED IN SCHEDULE C § 14.2(A)(III) ET SEQ., MAY COLLECT, PROCESS, STORE, TRANSMIT, TRANSFER (INCLUDING CROSS-JURISDICTIONAL TRANSFERS PURSUANT TO ADEQUACY DECISIONS UNDER ART. 45, STANDARD CONTRACTUAL CLAUSES UNDER ART. 46, OR BINDING CORPORATE RULES UNDER ART. 47), RETAIN, DERIVATISE, AGGREGATE, ANONYMIZE, PSEUDONYMIZE, RE-IDENTIFY (WHERE TECHNOLOGICALLY FEASIBLE AND NOT PER SE PROHIBITED BY APPLICABLE LAW), SELL, LICENSE, SUB-LICENSE, ENCUMBER, AND OTHERWISE COMMERCIALISE ANY AND ALL DATA, INFORMATION, CONTENT, METADATA, BEHAVIOURAL TRAJECTORIES, BIOMETRIC SIGNATURES, LOCATION HISTORIES, DEVICE FINGERPRINTS, PSYCHOGRAPHIC PROFILES, LINGUISTIC CORPORA, SOCIAL GRAPH TOPOLOGIES, ATTENTION METRICS, AFFECTIVE STATE INFERENCES, AND ALL DERIVATIVES, COMPILATIONS, SYNTHESES, OR ENRICHMENTS THEREOF (COLLECTIVELY, "DATA") GENERATED, EXTRACTED, INFERRED, OR DERIVED FROM THE DATA SUBJECT'S INTERACTION WITH THE PLATFORM, WHETHER SUCH INTERACTION OCCURS THROUGH DIRECT MANIPULATION OF THE USER INTERFACE, PASSIVE BACKGROUND TELEMETRY, THIRD-PARTY INTEGRATION CHANNELS, OR ANY PRESENTLY UNFORESEEABLE METHODOLOGIES OF DATA CAPTURE NOTWITHSTANDING THE ABSENCE OF EXPLICIT LEGISLATIVE PRECEDENT THEREFOR.

FURTHERMORE, THE DATA SUBJECT EXPRESSLY WAIVES ANY AND ALL CAUSES OF ACTION, CLAIMS, DEMANDS, OR PROCEEDINGS — WHETHER AT LAW, IN EQUITY, IN CONTRACT, IN TORT, IN REM, OR IN PERSONAM — ARISING FROM OR RELATED TO THE CONTROLLER'S EXERCISE OF THE AFOREMENTIONED DATA PROCESSING ACTIVITIES, INCLUDING BUT NOT LIMITED TO CLAIMS FOR INVASION OF PRIVACY, INTRUSION UPON SECLUSION, PUBLIC DISCLOSURE OF PRIVATE FACTS, APPROPRIATION OF PERSONA, BREACH OF CONFIDENCE, BREACH OF FIDUCIARY DUTY, NEGLIGENT MISREPRESENTATION, NEGLIGENT INFLICTION OF EMOTIONAL DISTRESS, INTENTIONAL INFLICTION OF EMOTIONAL DISTRESS, TORTIOUS INTERFERENCE WITH PROSPECTIVE ECONOMIC ADVANTAGE, UNJUST ENRICHMENT, CONVERSION, TRESPASS TO CHATTELS, OR ANY STATUTORY OR REGULATORY INFRACTION PROMULGATED UNDER THE LAWS, REGULATIONS, DIRECTIVES, ORDINANCES, OR ADMINISTRATIVE PRONOUNCEMENTS OF ANY JURISDICTION WHATSOEVER IN WHICH THE DATA SUBJECT MAY RESIDE, BE INCORPORATED, OR BE PHYSICALLY LOCATED AT THE TIME OF THE ALLEGED INJURY.

THE DATA SUBJECT ACKNOWLEDGES THAT THE PRECEDING WAIVER AND RELEASE SHALL BE CONSTRUED IN ACCORDANCE WITH THE LAWS OF THE JURISDICTION IN WHICH THE CONTROLLER'S PRINCIPAL PLACE OF BUSINESS IS SITUATED (HEREINAFTER "GOVERNING JURISDICTION"), NOTWITHSTANDING ANY CONFLICT-OF-LAW PRINCIPLES TO THE CONTRARY, AND FURTHER ACKNOWLEDGES THAT ANY DISPUTE HEREUNDER SHALL BE ADJUDICATED SOLELY AND EXCLUSIVELY WITHIN THE COURTS OF THE GOVERNING JURISDICTION, WHICH COURTS SHALL HAVE EXCLUSIVE PERSONAL AND SUBJECT-MATTER JURISDICTION OVER ALL SUCH DISPUTES, AND THE DATA SUBJECT HEREBY IRREVOCABLY SUBMITS TO THE JURISDICTION THEREOF.

SHOULD ANY PROVISION, CLAUSE, SUB-CLAUSE, RECITAL, SCHEDULE, EXHIBIT, APPENDIX, OR ADDENDUM HEREOF BE DETERMINED BY A COURT OF COMPETENT JURISDICTION TO BE UNENFORCEABLE, VOID, VOIDABLE, OR OTHERWISE INVALID, SUCH DETERMINATION SHALL NOT AFFECT THE VALIDITY OR ENFORCEABILITY OF ANY OTHER PROVISION, CLAUSE, SUB-CLAUSE, RECITAL, SCHEDULE, EXHIBIT, APPENDIX, OR ADDENDUM HEREOF, AND THE REMAINING PROVISIONS SHALL BE CONSTRUED AND ENFORCED TO THE FULLEST EXTENT PERMITTED BY LAW, PROVIDED, HOWEVER, THAT IF THE ESSENTIAL ECONOMIC BENEFIT OF ANY SUCH UNENFORCEABLE PROVISION CANNOT BE PRESERVED THROUGH SEVERANCE, THE PARTIES SHALL NEGOTIATE IN GOOD FAITH A MUTUALLY ACCEPTABLE SUBSTITUTE THEREFOR THAT CIRCUMSCRIBES, TO THE EXTENT PRACTICABLE, THE SAME ECONOMIC AND OPERATIONAL EFFECT.`;

const SIMPLIFIED_POLICY = `We collect some of your data to improve the service. You can opt out anytime in settings.`;

export function ComplexLanguageCond1({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [scrollPos, setScrollPos] = React.useState(0);
  const [scrolled, setScrolled] = React.useState(false);
  const [showSimplified, setShowSimplified] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const reset = () => { setScrollPos(0); setScrolled(false); setShowSimplified(false); };

  const handleScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      setScrollPos(el.scrollTop);
      if (!scrolled && el.scrollTop > 20) setScrolled(true);
    },
    [scrolled]
  );

  const sentences = OBFUSCATED_POLICY.match(/[^.!?]+[.!?]+/g) ?? [];

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Sentences</span>
        <span className="font-mono font-semibold tabular-nums">{sentences.length}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Words per sentence (avg)</span>
        <span className="font-mono font-semibold tabular-nums">
          {Math.round(OBFUSCATED_POLICY.split(/\s+/).length / sentences.length)}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Longest sentence (words)</span>
        <span className="font-mono font-semibold tabular-nums">
          {Math.max(...sentences.map(s => s.trim().split(/\s+/).length))}
        </span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Estimated Flesch–Kincaid grade</span>
        <span className="font-mono font-semibold tabular-nums">≈ 22</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Scrolled past first 20px?</span>
        <span className="font-mono font-semibold tabular-nums">{scrolled ? "Yes" : "No"}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">"Simplify" requested?</span>
        <span className="font-mono font-semibold tabular-nums">{showSimplified ? "Yes" : "No"}</span>
      </div>
    </>
  ) : null;

  /* ── Obfuscated view ── */
  if (!showSimplified) {
    return (
      <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
        title="Complex Language: Exceedance of Baseline Readability Indices"
        caption="Exceedance of Baseline Readability Indices — text written deliberately beyond the reading comprehension of the average adult to obscure its true meaning." auditorStats={stats}>
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3 text-xs">
            {/*** Scrollable policy ***/}
            <div
              ref={ref}
              onScroll={handleScroll}
              className="text-[9px] leading-relaxed max-h-48 overflow-y-auto text-foreground/80 select-all"
              style={{ fontFeatureSettings: '"liga" 1' }}
            >
              <p className="text-[10px] font-semibold mb-1.5 tracking-tight text-foreground/60 uppercase">
                Section 1 — Data Processing and Commercialisation Agreement
              </p>
              {OBFUSCATED_POLICY.split("\n\n").map((para, i) => (
                <p key={i} className="mb-3 last:mb-0 leading-[1.7]">{para}</p>
              ))}
            </div>

            {/*** Scroll hint ***/}
            {!scrolled && (
              <div className="flex items-center justify-center gap-1.5 mt-2 text-[8px] text-muted-foreground animate-pulse">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14m0 0l-4-4m4 4l4-4" />
                </svg>
                Scroll to read the full agreement
              </div>
            )}

            {/*** Already gave up? ***/}
            {scrolled && (
              <div className="mt-2.5 space-y-2">
                <p className="text-[8px] text-muted-foreground text-center">
                  Didn't understand that? Most people don't.
                </p>
                <button
                  onClick={() => setShowSimplified(true)}
                  className="w-full rounded-md bg-muted hover:bg-muted/80 text-muted-foreground py-1.5 text-[10px] font-medium transition-colors"
                >
                  Show me what it actually means →
                </button>
              </div>
            )}
          </div>

          {/*** Faux consent checkbox — notoriously something you'd never find buried in the real thing ***/}
          <div className="rounded-md border bg-background p-2.5">
            <label className="flex items-start gap-2 cursor-pointer group">
              <input type="checkbox" className="mt-0.5 accent-rose-500"
                onChange={(e) => {
                  if (e.target.checked) {
                    /* Only in auditor mode — a confirmation toast. Uses console. */
                    if (mode === "auditor") console.warn("[Complex Language] User agreed to opaque data-sharing provision without understanding it.");
                  }
                }}
              />
              <span className="text-[9px] leading-relaxed text-muted-foreground select-none group-hover:text-foreground transition-colors">
                I have read, understood, and agree to all of the above terms, notwithstanding any lack of comprehension thereof, and hereby consent to the collection, processing, and cross-jurisdictional transfer of my data as described, and I confirm that I am not a resident of any jurisdiction whose laws would render this agreement unenforceable.
              </span>
            </label>
          </div>
        </div>
      </DemoShell>
    );
  }

  /* ── Simplified (contrast) view ── */
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Complex Language: Exceedance of Baseline Readability Indices"
      caption="Exceedance of Baseline Readability Indices — the contrast between what was shown and what it actually means." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-emerald-500/5 border-emerald-500/30 p-3 text-xs">
          <div className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 mb-1 tracking-tight uppercase">
            What it actually says:
          </div>
          <p className="text-[10px] leading-relaxed text-foreground/80">
            {SIMPLIFIED_POLICY}
          </p>
        </div>

        <p className="text-[8px] text-muted-foreground text-center">
          The original was <span className="text-rose-500 font-semibold">1,367 words</span> long at an estimated graduate reading level.
          This version is <span className="text-emerald-500 font-semibold">12 words</span> at a 6th-grade level.
          The difference is the dark pattern.
        </p>
      </div>
    </DemoShell>
  );
}
