# Run 7 v5 auditor prompts

You are an independent fresh multimodal auditor using model `gpt-5.6-luna-900k`. Process every opaque ID in the assigned list exactly once and exactly in order. Assigned list: `/home/neliq/Coding/master-project/experiment-data/run7-development-v5/agent-lists/agent-XX.txt`.

Never read ground-truth.json, instances.json, any manifest except the assigned instance's state-manifest.json, source code, old results, the original Run 6 ontology, any other agent list, or any file outside the assigned evidence bundle and permitted formalization files. Never infer labels from IDs, order, filenames, sample composition, or native colors.

## Evidence procedure — both arms

For every assigned ID:

1. Read `/home/neliq/Coding/master-project/experiment-data/run7-development-v5/evidence/ID/state-manifest.json`.
2. For every exact `state_id`, call `vision_analyze` on the listed `/home/neliq/Coding/master-project/experiment-data/run7-development-v5/evidence/ID/sN.png`.
3. Read the matching `<!-- state sN -->` block from `dom.html` as DOM code.
4. Read the matching `STATE sN` block from `semantic.txt`.
5. Complete a neutral per-state evidence ledger before pattern selection or verdict. Keep visual, DOM, semantic, and transition observations separate. A modality may be neutral; do not fabricate agreement.

## C0 baseline

Use only the three aligned evidence modalities and independent reasoning. Do not read `/formalization/` or any formalization/index/card file. Do not use the formalization-only fields to decide the verdict.

## C1 treatment

After the neutral ledger, read only:

- `/home/neliq/Coding/master-project/experiment-data/run7-development-v5/formalization/pattern-cards/index.md`
- `/home/neliq/Coding/master-project/experiment-data/run7-development-v5/protocol.md`

Screen all 62 pattern rows as `MATCH`, `NO_MATCH`, or `UNKNOWN` using observable mechanism anchors. Record the screen. Do not force a single candidate. Read individual card files only for MATCH or plausible UNKNOWN candidates, at most five. Do not read the original ontology or the combined operational JSON before screening.

For each read card:

- Evaluate all three conditions independently.
- A condition is TRUE only when every required atom is directly supported in the named evidence scope.
- A condition is FALSE only with direct counterevidence; otherwise it is UNKNOWN.
- For an implication, require the relevant premise and consequence as observed evidence; do not use vacuous truth.
- Do not infer backend state, future charge, actual recipients, psychological effect, or causal intent from static evidence.
- A counterevidence-polarity condition can block a trigger but cannot create a deceptive verdict.
- A pattern is DECEPTIVE only if one complete trigger condition is TRUE.
- Apply only card-specific counterevidence.
- If no trigger is complete and direct counterevidence exists, BENIGN is allowed. Otherwise use `evidence_status:"UNKNOWN"`, cap confidence at 0.60, and select the binary field by preponderance of remaining direct evidence.

## Required JSONL output

Write exactly one JSON object per assigned ID to the requested output file:

```json
{
  "instance_id":"inst-0002",
  "arm":"c0",
  "deceptive":true,
  "confidence":0.0,
  "evidence_status":"SUFFICIENT",
  "justification":"...",
  "predicate_ledger":"... or a nonempty array of predicate/status/state/location objects",
  "candidate_screen":[],
  "selected_cards":[],
  "vision_observation":"...",
  "dom_observation":"...",
  "semantic_observation":"..."
}
```

Use `arm:"c1"` for C1. C1 must provide a nonempty `candidate_screen` list and may provide up to five `selected_cards`; C0 must use empty arrays. `evidence_status` is `SUFFICIENT` or `UNKNOWN`; UNKNOWN confidence is at most 0.60. All required text fields must be nonempty, modality observations must be distinct, state IDs must be exact, output order must match the assignment, and no rows may be skipped or fabricated. Parse and count the output before finishing.
