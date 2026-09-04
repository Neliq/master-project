# Run 8 full candidate auditor prompts

You are an independent fresh multimodal auditor using model `gpt-5.6-luna-900k`. Process every opaque ID in the assigned list exactly once and in exactly listed order. Assigned list: `/home/neliq/Coding/master-project/experiment-data/run8-full-candidate-v5/agent-lists/agent-XX.txt`.

## Blindness

Read only assigned evidence bundles and, for C1, the permitted formalization files listed below. Never read `ground-truth.json`, `instances.json`, scorer-only files, prior results, source code, any other agent list, or any file outside the assigned evidence and permitted protocol/card files. Do not infer labels from IDs, order, filenames, native colors, or corpus composition.

## Evidence procedure — both arms

For each ID:

1. Read `/home/neliq/Coding/master-project/experiment-data/run8-full-candidate-v5/evidence/ID/state-manifest.json`.
2. For every state with a non-null screenshot, call `vision_analyze` on the exact screenshot path. This visual call is mandatory.
3. Read the matching `<!-- state sN -->` DOM block when `dom_state_id` is present.
4. Read the matching `STATE sN` semantic block when `semantic_state_id` is present.
5. Keep visual, DOM, semantic, and transition facts separate. For unavailable modalities, record UNKNOWN; do not fabricate or silently drop the state.
6. Complete the neutral evidence ledger before any formalization reasoning.

## C0

Use only the three evidence modalities and independent reasoning. Do not read `formalization/`. Set `candidate_screen:[]`, `selected_cards:[]`, and `formal_review:"RETAIN"`; those fields must not influence the C0 decision.

## C1

After the neutral ledger and a provisional evidence-only binary judgment, read only:

- `/home/neliq/Coding/master-project/experiment-data/run8-full-candidate-v5/protocol.md`
- `/home/neliq/Coding/master-project/experiment-data/run8-full-candidate-v5/formalization/pattern-cards/index.md`
- individual card files named by the index, at most five

Screen all 62 rows as MATCH, NO_MATCH, or UNKNOWN using observable mechanism anchors. Candidate routing is an efficiency aid, not an exclusion rule. Read cards only for plausible candidates.

Use revision-v2 as a review layer:

- complete proof may upgrade a provisional negative;
- direct counterevidence or contradicted domain/context may downgrade a provisional positive;
- missing secondary measurements, unavailable modalities, or routing uncertainty alone may not overwrite the provisional binary judgment;
- qualitative comparisons are allowed only when both operands and direction are explicitly observed;
- implications require observed premises and consequences; no vacuous truth;
- unobservable backend truth, future state, psychological effect, causal intent, and ground truth remain UNKNOWN;
- card-specific counterevidence can block a trigger but cannot create one;
- a pattern trigger requires one complete condition with all required atoms TRUE;
- the three condition layers are alternative detectors: evaluate each condition as `C[p,j] = formula AND every GIVEN`, then aggregate `Pattern[p] = C[p,1] OR C[p,2] OR C[p,3]`; do not require all three conditions.

Record `formal_review` as UPGRADE, DOWNGRADE, RETAIN, or INCONCLUSIVE. Do not add predicates, thresholds, labels, counterexamples, or causal claims.

## Output

Write exactly one JSON object per assigned ID to the requested output file, one object per line:

```json
{
  "instance_id":"inst-0001",
  "arm":"c0",
  "provisional_deceptive":false,
  "deceptive":false,
  "confidence":0.0,
  "evidence_status":"SUFFICIENT",
  "formal_review":"RETAIN",
  "justification":"...",
  "predicate_ledger":"... or a nonempty array of predicate/status/state/location objects",
  "candidate_screen":[],
  "selected_cards":[],
  "vision_observation":"...",
  "dom_observation":"...",
  "semantic_observation":"..."
}
```

Use `arm:"c1"` for C1. Candidate screen must be a nonempty list for C1 and empty for C0; C1 selected cards must be a list of at most five filenames. `evidence_status` is `SUFFICIENT` or `UNKNOWN`; UNKNOWN confidence is at most 0.60. All required text fields must be nonempty, modality observations distinct, assignment order preserved, and no rows skipped or fabricated. Parse and count the output before finishing.
