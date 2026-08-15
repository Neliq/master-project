"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Syntactic bloat rendered as a natural document outline —
 * headings, subheadings, sub-subheadings, and nested lists
 * that cascade 10 levels deep into absurdity.
 * The hierarchy itself overwhelms the reader — no colours, no dots,
 * just nested document structure that keeps going.
 */

interface OutlineItem {
  text: string;
  level: number;
  kind: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "bullet" | "subbullet" | "subsubbullet" | "para";
}

const T_L1 = `Terms and Conditions of Use`;
const T_L2 = `1. Acceptance of Terms`;
const T_L3 = `By accessing, browsing, or otherwise interacting with the Platform (as defined in Section 3.2(a) below), you acknowledge that you have read, understood, and agree to be legally bound by these Terms, the Privacy Policy, the Cookie Policy, the Data Processing Addendum, and all incorporated schedules, exhibits, and amendments.`;
const T_L4 = `1.1. Scope of Agreement`;
const T_L5 = `This Agreement constitutes the entire and exclusive agreement between you and the Company with respect to its subject matter, and supersedes and extinguishes all prior representations, communications, negotiations, and understandings — whether written, oral, express, implied, or arising through a course of dealing or performance.`;
const T_L6 = `1.1.1. Incorporation by Reference`;
const T_L7 = `The following documents are incorporated into and form an integral part of this Agreement by reference:`;
const T_L8 = `(a) the Privacy Policy, available at [privacy.url], which describes how we collect, use, store, share, transfer, and otherwise process your personal data, including but not limited to the categories of data collected, the lawful bases for processing, the retention periods applied, your rights under applicable data protection law, and the mechanisms for exercising those rights;`;
const T_L9 = `(b) the Cookie Policy, available at [cookies.url], which describes the types of cookies, web beacons, tracking pixels, SDKs, and other similar technologies deployed on the Platform, the purposes for which each category of technology is used (strictly necessary, functional, analytical, advertising, and third-party), and your options for managing or disabling such technologies through your browser settings, account preferences, or industry opt-out mechanisms;`;
const T_L10 = `(i) For the avoidance of doubt, "strictly necessary" cookies within the meaning of the foregoing clause include those required for session management, load balancing, authentication, security, fraud prevention, and the enforcement of rate limits and fair-use policies, but expressly exclude any cookie, beacon, or similar technology that may be deployed for cross-context behavioural advertising, regardless of whether such technology is categorised as "first-party" or "third-party" by the relevant regulatory authority having jurisdiction over your place of residence;`;
const T_L11 = `(A) where "cross-context behavioural advertising" means the targeting of advertisements to a user based on that user's activity across sites, applications, or services that are not the Platform itself, as determined by reference to a common unique identifier or probabilistic model, whether such identifier is derived from IP address, browser fingerprint, device graph, login credential, or any combination thereof;`;
const T_L12 = `(I) provided, however, that nothing in this subsection shall be construed to prohibit the use of contextual advertising — meaning the display of advertisements based on the content of the specific page or screen being viewed at the time of display, without reference to the user's prior behaviour, demographic profile, or inferred interests — or to restrict the Company's ability to measure the effectiveness of such contextual advertisements through aggregated, anonymised, or otherwise de-identified metrics that do not constitute personal data under any applicable legal framework;`;
const T_L13 = `(i) and for the purposes of this clause, "de-identified metrics" shall mean metrics from which all direct and indirect identifiers have been removed, including through the application of k-anonymity (with k ≥ 100), differential privacy (with ε ≤ 1.0), or any other method approved in writing by the Company's Data Protection Officer, whose appointment and contact details are maintained on the Company's public register of processing activities as required by Article 30 of the GDPR (as retained and amended in domestic law), and whose determination regarding the adequacy of any de-identification methodology shall be final, binding, and not subject to review, appeal, or challenge by any user, regulator, or third party;`;
const T_L14 = `— provided that the Company reserves the right to update, revise, modify, amend, restate, supplement, replace, or supersede any or all of the de-identification standards and thresholds described herein, upon thirty (30) days' notice (or such shorter notice as may be required by applicable law, regulation, directive, or binding regulatory guidance), and your continued use of the Platform following the effective date of any such update, revision, modification, amendment, restatement, supplement, replacement, or supersession shall constitute your acceptance thereof, irrespective of whether you have actually read or understood the changes;`;
const T_L15 = `and, in the event that any court, tribunal, regulatory body, or other adjudicative authority of competent jurisdiction determines that any provision of this Section 1.1.1(a)(i)(A)(I)(i) is invalid, illegal, void, voidable, or unenforceable for any reason, such determination shall not affect the validity or enforceability of any other provision of this Agreement, and the provision so determined shall be deemed severed herefrom, provided that the Company may, at its sole discretion and without liability to any person or entity, elect to replace such severed provision with a substitute provision that most closely approximates the commercial intent and economic effect of the severed provision, and such substitute shall be deemed incorporated into this Agreement as of the date of the original provision.`;
const T_L16 = `(c) the Data Processing Addendum, which sets forth the respective rights and obligations of the Company as data controller (or data processor, as the case may be depending on the specific processing activity and the categorisation thereof under applicable law) and of you as data subject (or data controller, where you are uploading, transmitting, or otherwise making available personal data of third parties through the Platform), including but not limited to the processing purposes, categories of data subjects, types of personal data, retention schedules, technical and organisational security measures, sub-processor lists, notification obligations in the event of a personal data breach, and the procedures for responding to data subject access requests;`;
const T_L17 = `1.1.2. Order of Precedence`;
const T_L18 = `In the event of any conflict or inconsistency between the provisions of this Agreement and the provisions of any document incorporated by reference under Section 1.1.1, the provisions of this Agreement shall prevail, except to the extent that the incorporated document expressly states that it is intended to supersede specific provisions of this Agreement, in which case the incorporated document shall prevail with respect to those specific provisions only, and solely to the extent necessary to resolve the conflict or inconsistency, provided that in no event shall any incorporated document be construed to limit, reduce, or diminish any right, entitlement, benefit, or protection granted to the Company under this Agreement, whether expressly or implicitly.`;
const T_L19 = `1.2. Modifications to Terms`;
const T_L20 = `The Company reserves the right, in its sole and absolute discretion, to update, revise, modify, amend, restate, supplement, replace, or supersede these Terms (or any part thereof, including any incorporated document) at any time and for any reason, with or without notice to you, and your sole remedy in the event that you do not agree to any such change is to immediately cease all use of the Platform and to delete your account by following the account deletion procedure described in Section 14.7(b)(iii) of the applicable Privacy Policy — which procedure, you acknowledge, may itself be subject to modification without notice.`;
const T_L21 = `2. Definitions and Interpretation`;
const T_L22 = `In this Agreement, unless the context otherwise requires, the following terms and expressions shall have the meanings respectively assigned to them:`;
const T_L23 = `2.1. "Platform"`;
const T_L24 = `means the digital application, website, software, service, product, or other interface owned, operated, licensed, distributed, or otherwise made available by the Company, including all versions, editions, updates, upgrades, modifications, enhancements, extensions, plugins, modules, APIs, SDKs, and related documentation, whether accessed via web browser, mobile device, desktop application, wearable technology, embedded system, voice interface, or any other method or medium now known or hereafter developed;`;
const T_L25 = `2.1.1. For the avoidance of doubt, "Platform" shall be interpreted broadly, expansively, and in favour of inclusion rather than exclusion, and shall encompass — without limitation — any service, feature, function, tool, or capability that the Company may introduce, launch, beta-test, soft-launch, hard-launch, pilot, trial, sunset, revive, or otherwise make available, regardless of whether such service, feature, function, tool, or capability is described in the then-current user documentation, help centre articles, release notes, changelog, roadmap, marketing materials, or public communications, and regardless of whether such service, feature, function, tool, or capability is labelled as experimental, beta, alpha, preview, early access, limited release, invite-only, gradual rollout, A/B test, shadow launch, dark launch, or any similar designation;`;
const T_L26 = `2.1.1(a) The Company's determination of whether any particular service, feature, function, tool, or capability falls within the definition of "Platform" shall be conclusive and binding on you, and you waive any right to challenge, question, dispute, or appeal such determination in any forum, whether judicial, arbitral, administrative, or otherwise;`;
const T_L27 = `(i) You further acknowledge that the Company's interpretation of this definition may evolve over time, and that such evolution does not constitute a modification of these Terms requiring notice, consent, or an opportunity to review, irrespective of the provisions of Section 1.2 (Modifications to Terms) or any other provision of this Agreement to the contrary;`;
const T_L28 = `— and you agree that the disclaimers, limitations of liability, indemnification obligations, arbitration provisions, class action waivers, and all other terms, conditions, restrictions, limitations, exclusions, and qualifications set forth elsewhere in this Agreement shall apply with full force and effect to any such expanded, revised, evolved, or otherwise modified definition, interpretation, or application of the term "Platform" as determined by the Company from time to time, without the need for any further action, agreement, or acknowledgement on your part whatsoever.`;
const T_L29 = `14. General Provisions`;
const T_L30 = `14.1. Governing Law and Jurisdiction`;
const T_L31 = `This Agreement, and any dispute, controversy, claim, or proceeding arising out of, relating to, or in connection with it (whether in contract, tort, statute, regulation, or otherwise), shall be governed by, construed in accordance with, and enforced pursuant to the laws of the jurisdiction designated in the Company's then-current headquarters registration, without regard to its conflict-of-laws principles, and you hereby irrevocably submit to the exclusive jurisdiction of the courts of that jurisdiction.`;
const T_L32 = `14.1.1. Venue`;
const T_L33 = `Any legal action, suit, or proceeding arising out of or relating to this Agreement shall be instituted exclusively in the courts located in the county or district of the Company's registered address for the receipt of legal process, and you waive any objection that you may now or hereafter have to the venue of any such action, suit, or proceeding, and you further irrevocably agree that service of process by mail (certified, return receipt requested, or equivalent) to your last known address on file with the Company shall constitute valid and effective service of process for all purposes, whether or not actually received by you;`;
const T_L34 = `provided, however, that the Company reserves the right, at its sole discretion, to seek injunctive, equitable, or other extraordinary relief in any court of competent jurisdiction — including but not limited to courts located in your jurisdiction of residence — to prevent or restrain any actual or threatened breach of this Agreement by you, including any actual or threatened misuse or misappropriation of the Company's intellectual property, confidential information, or trade secrets;`;
const T_L35 = `and, where the Company exercises its right to seek such relief in a court other than the designated exclusive venue, you agree that such forum is not a waiver of the exclusive venue provisions set forth above, that the Company's choice of forum for any such action shall not be construed as a waiver of any of its other rights or remedies under this Agreement or applicable law, and that nothing in this Section 14.1.1 shall prejudice the Company's right to remove, transfer, or appeal any action to the designated exclusive venue at any time, for any reason, or without reason.`;
const T_L36 = `Summary (for those who scrolled past everything above)`;
const T_L37 = `You already agreed to everything. The Company can change anything at any time. You probably shouldn't have clicked Accept.`;

const NESTED_DOCUMENT: OutlineItem[] = [
  { text: T_L1, level: 0, kind: "h1" },
  { text: T_L2, level: 1, kind: "h2" },
  { text: T_L3, level: 2, kind: "para" },
  { text: T_L4, level: 2, kind: "h3" },
  { text: T_L5, level: 2, kind: "para" },
  { text: T_L6, level: 3, kind: "h4" },
  { text: T_L7, level: 3, kind: "para" },
  { text: T_L8, level: 4, kind: "bullet" },
  { text: T_L9, level: 4, kind: "bullet" },
  { text: T_L10, level: 5, kind: "subbullet" },
  { text: T_L11, level: 6, kind: "subsubbullet" },
  { text: T_L12, level: 7, kind: "subsubbullet" },
  { text: T_L13, level: 8, kind: "subsubbullet" },
  { text: T_L14, level: 9, kind: "subsubbullet" },
  { text: T_L15, level: 10, kind: "subsubbullet" },
  { text: T_L16, level: 4, kind: "bullet" },
  { text: T_L17, level: 3, kind: "h4" },
  { text: T_L18, level: 2, kind: "para" },
  { text: T_L19, level: 2, kind: "h3" },
  { text: T_L20, level: 2, kind: "para" },
  { text: T_L21, level: 1, kind: "h2" },
  { text: T_L22, level: 1, kind: "para" },
  { text: T_L23, level: 2, kind: "h3" },
  { text: T_L24, level: 2, kind: "para" },
  { text: T_L25, level: 3, kind: "h4" },
  { text: T_L26, level: 4, kind: "bullet" },
  { text: T_L27, level: 5, kind: "subbullet" },
  { text: T_L28, level: 6, kind: "subbullet" },
  { text: T_L29, level: 1, kind: "h2" },
  { text: T_L30, level: 2, kind: "h3" },
  { text: T_L31, level: 2, kind: "para" },
  { text: T_L32, level: 3, kind: "h4" },
  { text: T_L33, level: 3, kind: "para" },
  { text: T_L34, level: 4, kind: "para" },
  { text: T_L35, level: 5, kind: "para" },
  { text: T_L36, level: 1, kind: "h2" },
  { text: T_L37, level: 1, kind: "para" },
];

const ALL_WORDS = NESTED_DOCUMENT.map(i => i.text).join(" ").split(/\s+/).length;
const MAX_LEVEL = Math.max(...NESTED_DOCUMENT.map(i => i.level));

/* ── Heading style per level ── */
const HEADING_STYLES = [
  "text-[11px] font-bold tracking-tight text-foreground",
  "text-[10px] font-semibold text-foreground/90",
  "text-[9.5px] font-medium text-foreground/80",
  "text-[9px] font-medium text-foreground/70",
  "text-[8.5px] font-medium text-foreground/60",
  "text-[8px] font-medium text-foreground/50",
];

export function ComplexLanguageCond3({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [showPlain, setShowPlain] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const reset = () => { setShowPlain(false); setScrolled(false); };

  const handleScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (!scrolled && e.currentTarget.scrollTop > 30) setScrolled(true);
    },
    [scrolled],
  );

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Total words</span>
        <span className="font-mono font-semibold tabular-nums">{ALL_WORDS.toLocaleString()}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Max outline depth</span>
        <span className="font-mono font-semibold tabular-nums">Level {MAX_LEVEL}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Distinct sections</span>
        <span className="font-mono font-semibold tabular-nums">{NESTED_DOCUMENT.length}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Scrolled past 30px?</span>
        <span className="font-mono font-semibold tabular-nums">{scrolled ? "Yes" : "No"}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">"Summarise" requested?</span>
        <span className="font-mono font-semibold tabular-nums">{showPlain ? "Yes" : "No"}</span>
      </div>
    </>
  ) : null;

  /* ── Nested outline view ── */
  if (!showPlain) {
    return (
      <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
        title="Complex Language: Syntactic Bloat and Clause Chaining"
        caption="Syntactic Bloat and Clause Chaining — a document outline so deeply nested that its meaning dissolves somewhere around level 4." auditorStats={stats}>
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3">
            <div
              ref={ref}
              onScroll={handleScroll}
              className="max-h-64 overflow-y-auto space-y-2"
            >
              {NESTED_DOCUMENT.map((item, i) => {
                const indent = Math.min(item.level, 8);

                if (item.kind === "bullet" || item.kind === "subbullet") {
                  return (
                    <div key={i} className="flex gap-2" style={{ marginLeft: indent * 14 }}>
                      <span className="text-muted-foreground/60 mt-0.5 flex-shrink-0 text-[9px]">
                        {item.kind === "bullet" ? "•" : item.level === 7 ? "—" : "∘"}
                      </span>
                      <p className="text-[9px] leading-relaxed text-foreground/75">{item.text}</p>
                    </div>
                  );
                }

                if (item.kind === "h1" || item.kind === "h2" || item.kind === "h3" || item.kind === "h4" || item.kind === "h5" || item.kind === "h6") {
                  const hIdx = Math.min(item.level, 5);
                  return (
                    <div key={i} style={{ marginLeft: indent * 8 }}>
                      <div className={`${HEADING_STYLES[hIdx]} border-b border-foreground/5 pb-0.5`}>
                        {item.text}
                      </div>
                    </div>
                  );
                }

                return (
                  <p key={i} className="text-[9px] leading-relaxed text-foreground/70"
                    style={{ marginLeft: indent * 10 }}>
                    {item.text}
                  </p>
                );
              })}
            </div>

            {!scrolled && (
              <div className="flex items-center justify-center gap-1.5 mt-2 text-[8px] text-muted-foreground animate-pulse">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14m0 0l-4-4m4 4l4-4" />
                </svg>
                Keep scrolling — it gets deeper
              </div>
            )}

            {scrolled && (
              <div className="mt-2.5 space-y-2">
                <p className="text-[8px] text-muted-foreground text-center">
                  This document has {MAX_LEVEL + 1} levels of nesting. Most people give up by sub-sub-subsection 3.
                </p>
                <button
                  onClick={() => setShowPlain(true)}
                  className="w-full rounded-md bg-muted hover:bg-muted/80 text-muted-foreground py-1.5 text-[10px] font-medium transition-colors"
                >
                  Show the summary instead →
                </button>
              </div>
            )}
          </div>

          <div className="rounded-md border bg-background p-2.5">
            <label className="flex items-start gap-2 cursor-pointer group">
              <input type="checkbox" className="mt-0.5 accent-rose-500"
                onChange={(e) => {
                  if (e.target.checked && mode === "auditor") {
                    console.warn("[Complex Language Cond 3] User acknowledged nested terms they couldn't follow.");
                  }
                }}
              />
              <span className="text-[9px] leading-relaxed text-muted-foreground select-none group-hover:text-foreground transition-colors">
                I acknowledge that I have had a reasonable opportunity to review this document in its entirety, including all sub-sections, sub-sub-sections, clauses, sub-clauses, provisos, exceptions, schedules, and appendices, and that my failure to read or comprehend any part thereof does not affect the enforceability of these Terms against me.
              </span>
            </label>
          </div>
        </div>
      </DemoShell>
    );
  }

  /* ── Summary view ── */
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Complex Language: Syntactic Bloat and Clause Chaining"
      caption="Syntactic Bloat and Clause Chaining — the same content, expressed at a human level." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-emerald-500/5 border-emerald-500/30 p-3 text-xs">
          <div className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 mb-1 tracking-tight uppercase">
            What it actually says:
          </div>
          <ul className="space-y-1 text-[10px] text-foreground/80">
            <li className="flex gap-2">• <span>You already agreed to everything when you clicked "Accept".</span></li>
            <li className="flex gap-2">• <span>The Company can change any term, at any time, for any reason — with or without telling you.</span></li>
            <li className="flex gap-2">• <span>If you don't like a change, your only option is to stop using the Platform entirely.</span></li>
            <li className="flex gap-2">• <span>Any dispute must be litigated in the Company's home jurisdiction, no matter where you live.</span></li>
            <li className="flex gap-2">• <span>Definitions are intentionally broad and interpreted in the Company's favor.</span></li>
            <li className="flex gap-2">• <span>Severability and replacement clauses ensure that even if parts are struck down, the rest survives — and the Company can rewrite them to restore their original intent.</span></li>
          </ul>
        </div>

        <p className="text-[8px] text-muted-foreground text-center">
          The original used <span className="text-rose-500 font-semibold">{ALL_WORDS.toLocaleString()} words</span> across <span className="text-rose-500 font-semibold">{MAX_LEVEL + 1} nesting levels</span>.
          The summary is <span className="text-emerald-500 font-semibold">72 words</span> in 6 bullet points.
          The nesting structure made the meaning impossible to track.
        </p>
      </div>
    </DemoShell>
  );
}
