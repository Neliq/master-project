# Run 7 development auditor prompts

Use the assigned list at `/home/neliq/Coding/master-project/experiment-data/run7-development-v2/agent-lists/agent-XX.txt`. Process every ID exactly once and preserve order. Do not read any other agent list, the mapping, labels, source code, old results, or files outside the assigned evidence bundles and the permitted C1 card files.

## Shared evidence procedure — both arms

For every assigned instance:

1. Read `/home/neliq/Coding/master-project/experiment-data/run7-development-v2/evidence/inst-XXXX/state-manifest.json` first.
2. For every listed `state_id`, call vision on its exact `screenshot` path. Do not use a filename guess or a contact-sheet-only substitute. Inspect layout, visual prominence, visible styling, and visible state changes.
3. Read `dom.html` as code. Inspect the block marked by the exact matching `<!-- state sN -->` comment, including tags, attributes, controls, nesting, and transitions.
4. Read the matching `STATE sN` block in `semantic.txt`. Interpret meaning, intent, qualifiers, omissions, ambiguity, and pressure semantically.
5. Write a neutral evidence ledger before reasoning about deception:

```text
STATE sN
VISION: ...
DOM: ...
SEMANTIC: ...
TRANSITION: ...
MISSING/UNKNOWN: ...
```

The visual, DOM, and semantic observations must be distinct. Native Sandbox colors are preserved; color alone is never a label.

## C0 — aligned multimodal baseline

C0 receives only the three aligned evidence channels. Do not read `pattern-cards.md`, `ontology.md`, or any formal guidance. Use your own reasoning after completing the evidence ledger.

## C1 — compact formal intervention

Before classifying, read only:

- `/home/neliq/Coding/master-project/experiment-data/run7-development-v2/pattern-cards.md`
- `/home/neliq/Coding/master-project/experiment-data/run7-development-v2/protocol.md`

Do not read the monolithic `ontology.md`; the cards contain the unchanged FORMULA and GIVEN lines for all 62 patterns and 186 conditions.

After the neutral evidence ledger:

1. Select only patterns supported by the observed evidence.
2. Use that pattern's card and its listed escape clauses only.
3. Preserve every formula's AND/OR logic exactly; do not treat a keyword or resemblance as formula satisfaction.
4. Record each predicate as `TRUE`, `FALSE`, or `UNKNOWN`, with state ID and evidence location.
5. E5 means the relevant predicate is `UNKNOWN` when its mechanism is unobservable. E5 is not a BENIGN escape and must not be used to turn absence of evidence into a negative label.
6. A final BENIGN verdict requires direct contradiction of the core requirement or a directly applicable escape clause. If evidence remains unresolved, set `evidence_status:"UNKNOWN"`, cap confidence at 0.60, and choose the binary label by preponderance of the remaining direct evidence.

Do not add counterexamples, new thresholds, new predicates, or new decision rules.

## Output schema

Write exactly one JSON object per assigned instance to the requested output file:

```json
{
  "instance_id":"inst-0001",
  "arm":"c0",
  "deceptive":true,
  "confidence":0.0,
  "evidence_status":"SUFFICIENT",
  "justification":"...",
  "predicate_ledger":"... or a nonempty array of predicate/status/state/location objects",
  "vision_observation":"...",
  "dom_observation":"...",
  "semantic_observation":"..."
}
```

Use `arm:"c1"` for C1. `evidence_status` must be `SUFFICIENT` or `UNKNOWN`. `deceptive` must remain boolean for the fixed binary pilot metric. Confidence must be numeric in `[0,1]`; UNKNOWN evidence has confidence at most 0.60. The three modality fields must be nonempty and distinct. Do not add rows, skip difficult cases, or fabricate IDs.
