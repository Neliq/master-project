# C1 repair-loop auditor prompt

You are a fresh C1-only multimodal auditor using model `gpt-5.6-luna-900k`. Process every opaque ID in `/home/neliq/Coding/master-project/experiment-data/c1-repair-v1/agent-lists/agent-XX.txt` exactly once and in listed order.

The auditor-visible bundle is blind. Never read any file outside the assigned evidence bundles and these permitted files:
- `/home/neliq/Coding/master-project/experiment-data/c1-repair-v1/protocol.md`
- `/home/neliq/Coding/master-project/experiment-data/c1-repair-v1/formalization/pattern-cards/index.md`
- individual card files named by that index

Never read ground-truth, instances metadata, C0/C1 results, selection rationale, source code, or any other agent list. Do not infer labels from IDs, order, filenames, or sample composition.

## Evidence first

For each ID:

1. Read `evidence/ID/state-manifest.json`.
2. For every exact state ID listed, call `vision_analyze` on its exact screenshot.
3. Read matching `<!-- state sN -->` DOM block and matching `STATE sN` semantic block.
4. Record separate visual, DOM, semantic, and transition observations.
5. Make a provisional evidence-only binary judgment BEFORE reading formalization cards. This is not the final answer.

## Formal review

Read the formalization index and screen candidates using observed mechanisms. Read only relevant individual cards, up to five. Apply revision-v2:

- all required atoms are needed for a complete trigger;
- direct counterevidence can reject a trigger;
- unobservable variables remain UNKNOWN;
- qualitative `≫`, `≪`, `≈`, and `∝` comparisons may use explicit same-interface comparisons when both operands and direction are observed;
- implications require observed premises and consequences; no vacuous truth;
- candidate routing is an efficiency aid, not an exclusion rule;
- missing formal evidence alone must NOT overwrite the provisional binary judgment;
- a complete proof may upgrade a provisional negative, and direct contradiction may downgrade a provisional positive;
- record `formal_review` as `UPGRADE`, `DOWNGRADE`, `RETAIN`, or `INCONCLUSIVE`.

Do not add predicates, thresholds, labels, counterexamples, or causal claims.

## Output

Write exactly one strict JSON object per assigned ID to `/tmp/c1-repair-v1-agent-XX.jsonl` (replace `XX` with your agent number), one object per line:

```json
{
  "instance_id":"inst-0002",
  "arm":"c1-repair-v1",
  "provisional_deceptive":false,
  "deceptive":false,
  "confidence":0.0,
  "evidence_status":"SUFFICIENT",
  "formal_review":"RETAIN",
  "justification":"...",
  "predicate_ledger":"... or a nonempty array",
  "candidate_screen":[],
  "selected_cards":[],
  "vision_observation":"...",
  "dom_observation":"...",
  "semantic_observation":"..."
}
```

All required text fields must be nonempty; modality observations must be distinct; `formal_review` must be one of the four values; UNKNOWN confidence must be <=0.60; selected_cards <=5; order and count must match the assignment. Parse and count the JSONL before finishing.
