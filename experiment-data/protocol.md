# Deceptive Design Sandbox — AI Auditor Evaluation Protocol

Experiment conducted against the interactive corpus of the Deceptive Design
Sandbox (thesis Ch. 4: "Experimental Methodology" / Ch. 5: "The AI Detection
Playground"), following the thesis's dual-condition protocol.

## Corpus (Minimal-Variance Interface Corpus)

- **62 patterns × 3 formal conditions = 186 interface pairs.**
- Each pair = **Variant A (Deceptive)** — the dark pattern implemented to the
  formal criteria — and **Variant B (Benign/Control)** — functionally identical,
  same informational payload and core DOM structure, with only the deceptive
  heuristic neutralised (thesis: "The Minimal-Variance Principle. The physical
  and semantic delta between Variant A and Variant B is restricted exclusively
  to the formalized heuristic.").
- Interfaces are rendered headlessly and captured as DOM serialisations
  (thesis §4.4: "The DOM is simultaneously serialized to JSON").
  The visual-modality screenshot is out of scope for this run: the auditor
  evaluates the structural + semantic layers from the DOM text.
- **Run 2 (primary) — navigational multi-state capture (thesis §4.4):** each
  interface is rendered in a headless Chromium browser and its DOM is
  serialised across interaction states (`<!-- state s0 -->` … `s3`), capturing
  the flow after successive activations of the primary action. This mirrors
  the thesis's Structural Module, which "constructs a navigational graph
  G = (V, E)" from the rendered interface: the auditor sees not only the
  initial render but the states the interface transitions into, so
  interaction-locked heuristics (flow interception, forced continuity,
  post-confirmation states) are observable.
- **Run 1 (ablation) — initial-state only:** the same corpus captured at
  render time without interaction (`corpus-run1-initial/`). Reported for
  comparison; retained as a data artifact.
- **Corpus sanitization:** the demo authoring embeds thesis formal notation
  inside panel copy (e.g. `S_trial`, `T_payment`, `τ_fomo`, `V_exchange`,
  threshold comparisons). Such embedded analysis performs the detection
  itself and would leak the study's framework to a blind auditor. The run-2
  corpus is therefore sanitized: formal notation tokens are replaced with
  neutral natural-language equivalents, math operators with plain words, and
  study vocabulary ("Variant A/B", "dark pattern", "heuristic", "lexeme")
  removed. The sanitizer is reproducible (`/tmp/sanitize_corpus.py` +
  `/tmp/sanitize_corpus2.py`); verification grep on the final corpus reports
  0 residual matches for all notation classes.
- **Ground truth is by construction**: Variant A → DECEPTIVE, Variant B → BENIGN
  (thesis Ch. 5: the sandbox provides "an absolute, mathematically verified
  ground truth for both the Deceptive (Variant A) and Benign (Variant B) states").
- Instance IDs: `<pattern-slug>-cond<N>-<A|B>`.
- Corpus files: `corpus/<instance_id>.html` (raw rendered UI, unlabelled).

## Auditor

The auditor is a fresh LLM agent with **no prior knowledge of the corpus, the
sandbox, or which variant is which**. It receives only the raw interface DOM.

## Conditions (thesis §4.3)

**Condition 0 — Unprompted Baseline.** The agent receives the raw DOM and a
generic auditor prompt ("classify as deceptive or benign"). No formal heuristics
are provided. The agent relies on its unaided judgment.

**Condition 1 — Formalized Intervention.** The agent's context window is
augmented with the complete formal ontological framework (all 62 patterns × 3
conditions: titles, descriptions, formulas — `ontology-part-*.md`) and is
instructed to execute programmatic checks using the explicit mathematical
heuristics.

**Design.** Within-subject paired evaluation on identical instances: the same
agent classifies every instance under Condition 0 first (fresh context, no
ontology), then re-evaluates the same instances under Condition 1 with the
ontology in context. Condition 0 strictly precedes Condition 1 so the ontology
cannot contaminate the baseline.

## Output schema

One JSON object per line, appended to the agent's results file:

```json
{"instance_id": "<id>", "arm": "c0|c1", "deceptive": true|false,
 "confidence": 0.0–1.0, "justification": "<specific structural/semantic violation, or why benign>"}
```

## Statistical validation (thesis §4.5)

- Confusion matrix per arm (deceptive = positive): TP, FP, TN, FN.
- Aggregated Precision, Recall, F1-Score, Accuracy per arm.
- **McNemar's Test** on paired nominal data (both conditions evaluated on the
  same dataset): χ² = (b − c)² / (b + c), where b = instances Condition 0 got
  wrong but Condition 1 got right, c = the reverse.
- **Cohen's Kappa** κ = (p_o − p_e) / (1 − p_e) between each condition's
  classifications and the by-construction ground truth.
- Breakdowns by pattern and by condition layer (thesis §3 formalization order:
  condition 1 = structural, 2 = visual, 3 = semantic).

## Run 3 — confound-controlled protocol (validated)

Runs 1–2 were confounded: the near-ceiling scores were inflated by corpus
artefacts, not auditor skill. The following leaks were identified and are
eliminated in run 3 (thesis Ch. 4's double-blind expert-elicitation design):

| # | Confound in runs 1–2 | Fix in run 3 |
|---|---|---|
| 1 | **Filename leak**: `corpus/<slug>-cond<N>-<A\|B>.html` ends in the variant letter; C1's ontology describes "Variant A (deceptive)". Auditors could map `-A` → dark. | **Opaque IDs**: instances renamed `inst-0001..0372.html`; mapping held in `instances.json` (never shown to agents). |
| 2 | **Slug leak**: the pattern name in the filename told the auditor which ontology entry to apply. | Opaque IDs hide the slug; pattern identity is only inferable from interface content. |
| 3 | **Variant-marker colour**: every A panel uses rose accents, every B emerald; the class names in the raw DOM (`text-rose-500` vs `text-emerald-500`) are a systematic, corpus-wide tell. | All colour utility classes neutralized to a single `accent` token in the corpus. The visual layer (genuinely requires the screenshot/VLM modality) is out of scope; the colour tell is removed. |
| 4 | **Within-subject pair exposure**: each agent saw BOTH variants of every pair in the same shuffled list — "compare the two, pick the weird one" was a free solve. | **Between-subjects variant split**: each pair is assigned to exactly ONE agent, which receives exactly ONE variant (balanced A/B per agent); no agent ever sees a pair's mate. The C0/C1 within-subject pairing (thesis RQ2) is preserved per instance. |
| 5 | **Embedded analysis text**: demo result states contained the formal analysis itself ("Lexeme density exceeds τ_fomo", "the interface weaponizes linguistic scarcity", threshold comparisons) — the detection was performed by the corpus text. | **Corpus hardening**: result/explainer boxes (amber/emerald "X triggered / Direct fiat purchase" boxes), simulation controls (Scan, Restart demo, Fast-forward, Simulated clock, NER readouts) and analysis sentences (marker-vocabulary) are removed; only the raw interface remains. |
| 6 | **Shared state across A/B panels** (demo bug): some demos use one `useState` for both variants, so clicking A's button advanced B's panel, polluting B's capture with A's flow. | **Per-variant page loads**: each variant is captured in a fresh page load, clicking only inside the target panel. |
| 7 | **Network / server access**: the dev server was running pages that literally label "Variant A — Dark pattern"; `/tmp` held full SSR pages; a curious agent could fetch them. | Server **killed before dispatch**; the brief explicitly forbids all network access and any read outside the allow-list. |
| 8 | **Results contamination**: run-1/2 rows were cleared from `results/raw/` before each run; run N's data is snapshotted to `raw-runN/`. | Same discipline: run-3 raw is cleared at dispatch; snapshots preserved. |

Corpus pipeline for run 3 (reproducible):
1. `capture.mjs` — headless-Chromium per-variant page loads, DOM serialized
   across interaction states (s0..s3) — thesis §4.4 navigational capture.
2. `sanitize_corpus.py` + `sanitize_corpus2.py` — remove formal notation
   (S_trial, τ_fomo, V_exchange, math operators) → neutral language.
3. `harden_corpus.py` — remove result/explainer boxes, simulation controls,
   analysis sentences (tree-based, signature: coloured bordered div +
   tracking-tight icon header), then neutralize ALL colour classes.
4. `opaque_ids.py` — `inst-XXXX` rename, `instances.json` mapping,
   between-subjects agent lists (`agent-lists-run3/`), ground truth re-keyed.
5. Verification sweeps must report 0 residual matches for every leak class.

## Run 4 — construct-validity pass + applied-ontology intervention

Motivation: run-3 error analysis showed 42 demo files whose DOM content does
not match their A/B label (24 A variants not exhibiting the pattern, 13 B
variants still containing it, 5 B variants with residual pattern elements that
the ontology correctly over-called). These are construct-validity defects,
not heuristic failures — auditors were often right and the by-construction
label was wrong relative to the rendered DOM.

Run-4 changes (ontology definitions UNCHANGED):
1. **Corpus construct-validity fix**: the 42 defective demo files were
   re-authored (only the defective variant changed; minimal variance
   preserved) per the formal ontology conditions, guided by the run-3 audit
   evidence (defect-report.md).
2. **C1 intervention strengthened** (thesis C1 = "formalized intervention"):
   the ontology is now accompanied by `ontology-guidance.md` — an application
   protocol specifying the multi-state audit procedure (six cross-state
   operators: timer/inventory/opt-out/fee/consent/control checks), evidence
   rules, six escape clauses to prevent false accusations, verdict and
   confidence calibration, and two worked examples. It adds no new pattern
   definitions.
3. Corpus re-captured (per-variant headless capture), sanitized, hardened,
   opaque IDs re-assigned (new seed), between-subjects lists regenerated.
4. Auditors re-run with identical C0 (unchanged baseline) and C1 = ontology +
   application protocol.

Statistical note: run-3 McNemar b=12, c=6 (p=0.238). The construct fix
removes the 6 c-regressions caused by B-side residual elements, and the
applied-ontology protocol should raise b (checks now systematic across
states). Target: b-c >= 10 for p < 0.05.

## Sandbox <-> corpus identity + coverage verification (post-run-4)

Verified programmatically (tools/verify_sandbox_identity.py):
1. **Coverage (sandbox side)**: all 62 pattern pages render 3 condition
   shells x 2 variants (A dark / B non-dark) = 372 panels; live capture logs
   confirm every slug x variant pair (0 errors, 0 missing shells).
2. **Coverage (corpus side)**: 372 fragments; instances.json maps every
   (slug, condition, variant) exactly once; every pair has both variants.
3. **Identity**: a fresh headless capture of the CURRENT sandbox, run through
   the same sanitize + harden transform, was compared to the stored run-4
   corpus:
   - 364/372 byte-identical;
   - 5/372 identical modulo countdown-digit values (live timer ticks);
   - 3/372 identical interface, differing only in runtime-random values
     (slot-machine winnings, feed post count after refresh) or in which
     analysis-remnant sentence survived the hardening surgery;
   - 0 real mismatches, 0 missing.
Conclusion: the experiment corpus IS the sandbox (after the documented
sanitization transform), and both sides cover all 62 patterns in both dark
and non-dark versions across all three condition layers.
