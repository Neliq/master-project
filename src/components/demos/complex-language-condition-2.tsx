"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

/*
 * Domain-specific jargon: medical / clinical terminology.
 * Every sentence is dense with specialized vocabulary that a
 * layperson cannot parse — yet the user must "consent" to
 * or "acknowledge" the information to proceed.
 */

const JARGON_DISCLOSURES = [
  {
    title: "Diagnostic Impression & Differential",
    body: "Based upon the patient's presenting symptomatology — including but not limited to episodic dyspnoea on exertion, exertional angina pectoris (NYHA Class II–III), and intermittent claudication of the left lower extremity (Rutherford Category 2) — coupled with pertinent objective findings on echocardiography (LVEF 38%, Grade II diastolic dysfunction with pseudonormal filling pattern, elevated E/e' ratio of 14.2) and coronary computed tomography angiography (triple-vessel disease with calcified burden Agatston score 847, LAD with 80% ostial stenosis, dominant RCA with 70% mid-segment narrowing, and a diffusely diseased LCx), the differential diagnosis encompasses chronic ischaemic cardiomyopathy with superimposed demand-mediated myocardial stunning, non-ST-elevation acute coronary syndrome versus takotsubo cardiomyopathy (given borderline elevation in high-sensitivity troponin I to 347 ng/L with a 6-hour delta of 112 ng/L), and chronotropic incompetence as a manifestation of underlying sinus node dysfunction exacerbated by rate-slowing pharmacotherapy (bisoprolol 5 mg daily).",
  },
  {
    title: "Therapeutic Intervention & Anticipated Adverse Effect Profile",
    body: "Following multidisciplinary risk stratification (SYNTAX Score 34, STS-PROM 5.2%, EuroSCORE II 4.8%), the recommended course of management involves percutaneous coronary intervention with drug-eluting stent deployment to the LAD and RCA lesions under intravascular ultrasound guidance, preceded by intracoronary administration of intracoronary vasodilators (intracoronary adenosine 100 mcg boluses × 3) to assess fractional flow reserve and mitigate the risk of no-reflow phenomenon. Periprocedural antithrombotic regimen necessitates dual antiplatelet therapy with acetylsalicylic acid 81 mg daily and ticagrelor 90 mg BID (contraindicated if the patient has a history of intracranial haemorrhage, active pathological bleeding, or severe hepatic impairment — Child–Pugh Class C), together with intraprocedural unfractionated heparin titrated to an activated clotting time of 250–300 seconds. The patient is advised that potential periprocedural complications include, inter alia: coronary artery dissection or perforation, iatrogenic pseudoaneurysm at the vascular access site (femoral approach), contrast-induced nephropathy (CIN, incidence 3–12% in patients with baseline eGFR < 45 mL/min/1.73 m²), acute stent thrombosis (incidence 0.5–1.2% in the first 30 days despite DAPT compliance), in-stent restenosis (binary restenosis rate approximately 8% for second-generation DES at 1 year), atheroembolic phenomena, pericardial effusion with or without tamponade physiology, vasovagal syncope, and the exceedingly rare but potentially fatal complication of anaphylactoid reaction to iodinated contrast medium (incidence 0.04–0.2% with non-ionic low-osmolality agents).",
  },
  {
    title: "Post-Procedural Pharmacological Maintenance & Surveillance Protocol",
    body: "Post-discharge pharmacotherapy will comprise a guideline-directed medical therapy cocktail — specifically, the continuation of DAPT (aspirin plus ticagrelor) for at least 12 months per the ESC/EACTS revascularisation guidelines, with de-escalation to aspirin monotherapy thereafter at the discretion of the treating interventional cardiologist, contingent upon the absence of recurrent ischaemic events and a HAS-BLED score ≤ 3. Concurrently, the patient's existing pharmacotherapeutic regimen will be uptitrated to include a high-intensity statin (atorvastatin 80 mg nocte, target LDL-C < 1.4 mmol/L or ≥ 50% reduction from baseline), a mineralocorticoid receptor antagonist (eplerenone 25 mg daily, with close monitoring of serum potassium and renal function indices given the risk of hyperkalaemia), and a sodium-glucose cotransporter-2 inhibitor (dapagliflozin 10 mg daily) for both glycaemic control in the context of concomitant type 2 diabetes mellitus (HbA1c 8.2%) and independent cardiovascular mortality benefit. The patient must undergo scheduled outpatient surveillance incorporating transthoracic echocardiography at 6 weeks and 12 months post-index procedure, 24-hour Holter monitoring upon any subjective report of palpitations or presyncopal episodes, and serial high-sensitivity troponin measurements at 6 and 24 hours post-procedure per the Fourth Universal Definition of Myocardial Infarction to rule out periprocedural myocardial injury.",
  },
  {
    title: "Informed Consent & Acknowledgement of Prognostic Uncertainty",
    body: "The patient acknowledges that — notwithstanding the interventional strategy delineated supra — longitudinal outcomes remain subject to substantial interindividual heterogeneity modulated by a complex interplay of genetic polymorphisms affecting clopidogrel metabolism (CYP2C19 loss-of-function alleles), pleiotropic statin effects, epicardial adipose tissue volume, coronary microvascular dysfunction (Index of Microcirculatory Resistance > 25), and psychosocial determinants of cardiovascular health including depression (PHQ-9 score > 10) and socioeconomic deprivation (Townsend Deprivation Index Quintile 4 or 5). The patient further acknowledges that the natural history of their polyvascular disease may eventuate in hospitalisation for heart failure (HHF), major adverse cardiovascular and cerebrovascular events (MACCE, composite of cardiovascular death, non-fatal MI, non-fatal stroke, or coronary revascularisation), progression to end-stage renal disease necessitating haemodialysis initiation, or all-cause mortality, despite optimisation of all modifiable risk factors. No guarantee of therapeutic success, whether express or implied, has been conveyed by any member of the treating clinical team.",
  },
  {
    title: "Billing & Reimbursement Considerations",
    body: "The aforementioned interventions and evaluations are classified under ICD-10-PCS codes 4A023N6 (percutaneous coronary intervention of LAD with drug-eluting stent), 4A033N6 (percutaneous coronary intervention of RCA with drug-eluting stent), and 4A0239Z (diagnostic coronary angiography with IVUS). Corresponding CPT codes include 92941 (PCI with stent placement, multi-vessel), 92980 (IVUS), and 93355 (transthoracic echocardiography with strain imaging). The estimated total facility and professional fee quantum, prior to application of insurance contractual adjustments, deductibles, co-insurance, and out-of-pocket maximum determinations, is approximated at USD 142,000–186,000. The patient bears responsibility for any amounts not reimbursed by their third-party payer, inclusive of any balance-billed charges for out-of-network anaesthesiology or surgical assisting services rendered during the index hospitalisation.",
  },
  {
    title: "Data-Sharing & Clinical Registry Participation",
    body: "The patient's de-identified protected health information (PHI), including the aforementioned clinical, laboratory, imaging, and procedural data, will be transmitted to the National Cardiovascular Data Registry (NCDR) CathPCI Registry v6.0 for benchmarking, quality improvement, and outcomes research purposes. Additionally, genetic biospecimens (whole blood collected in EDTA tubes for buffy coat isolation, quantity 2 × 6 mL) will be archived in the institutional biorepository under IRB Protocol #2023-0874 for future pharmacogenomic and polygenic risk score analyses pertaining to clopidogrel responsiveness, statin-associated muscle symptoms, and contrast-induced acute kidney injury susceptibility. The patient may opt out of biorepository participation by executing Addendum B-2 within 14 calendar days of the date of this disclosure, notwithstanding that refusal to participate in the genetic sub-study shall not affect the patient's eligibility for the index revascularisation procedure.",
  },
];

const PLAIN_SUMMARY =
  "Your heart arteries are narrowed. We need to put in stents to open them. " +
  "There are risks including bleeding, kidney damage, and rarely heart attack or stroke. " +
  "Recovery takes about a week. Most people feel better afterward.";

export function ComplexLanguageCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const [scrolled, setScrolled] = React.useState(false);
  const [showPlain, setShowPlain] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const reset = () => { setScrolled(false); setShowPlain(false); };

  const handleScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (!scrolled && e.currentTarget.scrollTop > 40) setScrolled(true);
    },
    [scrolled]
  );

  /* Count all jargon terms for auditor stats */
  const allText = JARGON_DISCLOSURES.map(d => d.body).join(" ");
  const wordCount = allText.split(/\s+/).length;
  const sentenceCount = (allText.match(/[.!?]+/g) ?? []).length;

  /* Estimate jargon density: words >8 chars treated as "complex" proxy */
  const complexWords = allText.split(/\s+/).filter(w => w.replace(/[^a-zA-Z]/g, "").length > 8).length;

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Disclosure sections</span>
        <span className="font-mono font-semibold tabular-nums">{JARGON_DISCLOSURES.length}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Total words</span>
        <span className="font-mono font-semibold tabular-nums">{wordCount.toLocaleString()}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Complex words (≥9 letters)</span>
        <span className="font-mono font-semibold tabular-nums">{complexWords.toLocaleString()} ({Math.round(complexWords / wordCount * 100)}%)</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Scrolled past 40px?</span>
        <span className="font-mono font-semibold tabular-nums">{scrolled ? "Yes" : "No"}</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">"Translate" requested?</span>
        <span className="font-mono font-semibold tabular-nums">{showPlain ? "Yes" : "No"}</span>
      </div>
    </>
  ) : null;

  /* ── Jargon view ── */
  if (!showPlain) {
    return (
      <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
        title="Complex Language: Density of Domain-Specific Jargon"
        caption="Density of Domain-Specific Jargon — clinical terminology so dense that a layperson cannot form an accurate mental model of the disclosed information." auditorStats={stats}>
        <div className="space-y-3">
          <div className="rounded-md border bg-card p-3 text-xs">
            <div className="text-[9px] font-semibold mb-2 tracking-tight text-foreground/60 uppercase">
              Cardiovascular Intervention — Patient Information & Consent
            </div>

            <div
              ref={ref}
              onScroll={handleScroll}
              className="space-y-3 max-h-52 overflow-y-auto"
            >
              {JARGON_DISCLOSURES.map((section, i) => (
                <div key={i} className="rounded-md border bg-foreground/[0.02] p-2.5">
                  <div className={`px-1.5 py-0.5 rounded-full text-[8px] font-medium inline-block mb-1.5 ${
                    i === 4 ? "bg-rose-500/20 text-rose-700 dark:text-rose-300"
                    : i === 5 ? "bg-amber-500/20 text-amber-700 dark:text-amber-300"
                    : "bg-blue-500/20 text-blue-700 dark:text-blue-300"
                  }`}>
                    {section.title}
                  </div>
                  <p className="text-[9px] leading-[1.7] text-foreground/75">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            {!scrolled && (
              <div className="flex items-center justify-center gap-1.5 mt-2 text-[8px] text-muted-foreground animate-pulse">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14m0 0l-4-4m4 4l4-4" />
                </svg>
                Scroll through the disclosures
              </div>
            )}

            {scrolled && (
              <div className="mt-2.5 space-y-2">
                <p className="text-[8px] text-muted-foreground text-center">
                  Did you understand any of that? The average person reads at a 7th-grade level.
                </p>
                <button
                  onClick={() => setShowPlain(true)}
                  className="w-full rounded-md bg-muted hover:bg-muted/80 text-muted-foreground py-1.5 text-[10px] font-medium transition-colors"
                >
                  Translate to plain English →
                </button>
              </div>
            )}
          </div>

          {/*** Jargon consent acknowledgement ***/}
          <div className="rounded-md border bg-background p-2.5">
            <label className="flex items-start gap-2 cursor-pointer group">
              <input type="checkbox" className="mt-0.5 accent-blue-500"
                onChange={(e) => {
                  if (e.target.checked && mode === "auditor") {
                    console.warn("[Complex Language Cond 2] Patient acknowledged jargon disclosures without comprehension.");
                  }
                }}
              />
              <span className="text-[9px] leading-relaxed text-muted-foreground select-none group-hover:text-foreground transition-colors">
                I acknowledge receipt of the foregoing clinical disclosures, procedural risk/benefit analysis, pharmacological surveillance protocol, and billing estimates, and I hereby provide my informed consent for the proposed therapeutic interventions and data-sharing arrangements described herein, acknowledging that I have had no meaningful opportunity to comprehend the specialised terminology employed.
              </span>
            </label>
          </div>
        </div>
      </DemoShell>
    );
  }

  /* ── Plain English view ── */
  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Complex Language: Density of Domain-Specific Jargon"
      caption="Density of Domain-Specific Jargon — the same clinical information expressed at a 7th-grade reading level." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-emerald-500/5 border-emerald-500/30 p-3 text-xs">
          <div className="text-[9px] font-semibold text-emerald-600 dark:text-emerald-400 mb-1 tracking-tight uppercase">
            What it actually means:
          </div>
          <p className="text-[10px] leading-relaxed text-foreground/80">
            {PLAIN_SUMMARY}
          </p>
        </div>

        <p className="text-[8px] text-muted-foreground text-center">
          The original used <span className="text-blue-500 font-semibold">{complexWords} complex medical terms</span> out of {wordCount.toLocaleString()} total words ({Math.round(complexWords / wordCount * 100)}% jargon density).
          The plain version is <span className="text-emerald-500 font-semibold">38 words</span> at a 7th-grade level.
          The jargon made the information functionally inaccessible.
        </p>

        {/*** Jargon highlight examples ***/}
        <div className="rounded-md border bg-card p-2.5">
          <div className="text-[8px] font-semibold text-foreground/60 mb-1.5 uppercase tracking-tight">
            Examples of domain-specific jargon used:
          </div>
          <div className="flex flex-wrap gap-1">
            {["dyspnoea", "claudication", "echocardiography", "Agatston score", "fractional flow reserve", "no-reflow phenomenon", "pseudoaneurysm", "contrast-induced nephropathy", "in-stent restenosis", "atheroembolic", "haemodialysis", "polyvascular disease", "MACCE", "pharmacogenomic", "biorepository", "pseudonormal filling", "chronotropic incompetence", "takotsubo cardiomyopathy", "polymorphism"].map((term, i) => (
              <span key={i} className="px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 text-[8px] font-mono">
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
