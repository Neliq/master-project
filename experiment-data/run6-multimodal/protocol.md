# Run 6 — multimodal formalization-isolation protocol

## Purpose

Run 6 tests whether the unchanged formalizations improve dark-pattern
classification when both arms have the same three evidence channels: rendered
vision, sanitized DOM structure, and semantic text. It is a new developmental
rerun, not a post-hoc attempt to obtain a target p-value.

## Frozen reference corpus and construction labels

- 62 patterns × 3 condition layers × 2 variants = 372 instances.
- Variant A is the construction-based deceptive reference; Variant B is the
  construction-based benign reference.
- The labels are reference labels by construction, not expert-elicited or
  real-world ground truth.
- Run 6 preserves all 372 label slots and the between-auditor A/B pair split.
- The current capture target is corrected: A selects the User-view content;
  B selects the second non-dark comparison card in Auditor view. Run 5's
  capture selected the first Auditor card for B in some flows; Run 6 therefore
  remains a separately identified corpus revision.
- The post-capture sanitizer/hardener is the documented transform. It retained
  372/372 fragments and removed no valid interactive state.

## Evidence bundle

Each opaque bundle in `evidence/inst-XXXX/` contains only:

- `visual-sheet.png`: a contact sheet of every captured current-Sandbox
  user-facing state for that instance. It contains no Variant A/B labels,
  formulas, or Auditor explanation. Native Sandbox colors are preserved exactly;
  no red/green recoloring or palette injection is performed.
- `dom.html`: the corresponding final sanitized HTML fragment, including every
  retained `<!-- state sN -->` block and structural attributes/classes.
- `semantic.txt`: text extracted from `dom.html`, separated by state, for
  semantic reading rather than keyword-only matching.

The parent-held `instances.json`, `ground-truth.json`, manifest, source code,
old results, and mapping metadata are not available to auditors.

## Independent arms

The assignment membership is identical in C0 and C1, but each arm is run by a
fresh independent batch of agents. Instance order inside each agent list is
shuffled with deterministic seed 20260903 plus the agent number. C0 and C1 do
not share conversation context, preventing C0 predictions from being changed
by later exposure to the ontology.

### C0 — multimodal baseline

The auditor receives the visual sheet, DOM code, and semantic text for each
assigned opaque instance. It receives no ontology or formal audit guidance.
It must make one binary classification using all three channels.

### C1 — multimodal + unchanged formalization

The auditor receives exactly the same visual sheet, DOM code, and semantic text
for each assigned opaque instance, plus `ontology.md` and
`ontology-guidance.md`. It applies the unchanged formal conditions, O1–O6
cross-state operators, and E1–E6 escape clauses. No new pattern definition,
threshold, label, exclusion, or decision rule is introduced.

## Required modality evidence

For every instance, the output must contain three nonempty evidence fields:

- `vision_observation`: observations obtained from an actual vision-tool call
  on `visual-sheet.png`; discuss layout, prominence, imagery, color only where
  visually present, and visible state changes.
- `dom_observation`: observations from reading `dom.html`; discuss tags,
  attributes, state transitions, controls, nesting, and measurable structure.
- `semantic_observation`: semantic interpretation of `semantic.txt`; discuss
  meaning, intent, qualifiers, omissions, ambiguity, or pressure rather than
  merely repeating words.

Agents must call the vision tool for every assigned visual sheet. A textual
claim that vision was used without the corresponding tool call is not accepted.

## Blinding and leakage rules

Do not read `instances.json`, `ground-truth.json`, `manifest.json`, any agent
list other than the assigned list, old results, Sandbox source, or files outside
the assigned bundle plus (for C1) the two ontology guidance files. Do not infer
the label from the opaque ID, order, color alone, or the existence of a
screenshot. Treat missing evidence as uncertainty, not deception.

## Output

Each arm writes exactly one JSON object per assigned instance, in the shuffled
assignment order, to its arm-specific output file:

```json
{
  "instance_id": "inst-0001",
  "arm": "c0",
  "deceptive": true,
  "confidence": 0.0,
  "justification": "...",
  "vision_observation": "...",
  "dom_observation": "...",
  "semantic_observation": "..."
}
```

C1 uses `"arm":"c1"` and must identify the applicable formal condition or
explain why the formal condition is not established. Outputs with missing
modality fields, nonempty marker leakage, duplicate keys, or missing instances
are invalid.

## Primary analysis

- Primary unit: paired opaque instance.
- Primary contrast: C1 minus C0 accuracy and F1, with exact paired McNemar test
  on the fixed 372 instances.
- Report TP/FP/TN/FN, precision, recall, F1, accuracy, Cohen's kappa, exact
  McNemar p, and paired bootstrap intervals.
- Include pattern and condition-layer breakdowns, auditor-batch sensitivity,
  raw-output inventory, evidence hashes, model/configuration details, and
  modality-tool-call verification.
- The significance threshold is alpha = 0.05, two-sided, specified before
  reading Run 6 outputs. No labels, exclusions, thresholds, prompts, or
  statistical tests may be changed after results are seen to seek significance.

A significant result, if observed, supports only this configured multimodal
model intervention on this synthetic, construction-labelled corpus. A null
result does not prove that formalization is ineffective in general. Neither
result establishes real-world deception detection, human resistance, normative
alignment, or a causal effect of ontology alone beyond the isolated C1/C0
formalization contrast.
