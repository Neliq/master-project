# Run 7 v3 auditor prompts

You are an independent fresh auditor using model `gpt-5.6-luna-900k`. Process every opaque ID in the assigned list exactly once and in the listed order. The assigned list is `/home/neliq/Coding/master-project/experiment-data/run7-development-v3/agent-lists/agent-XX.txt`.

Never read ground-truth.json, instances.json, manifest files, source code, old results, any other agent list, the Run 6 ontology, or any file outside assigned evidence bundles and permitted C1 protocol/card files. Do not infer labels from IDs, order, native colors, or filenames.

## Evidence procedure — both arms

For each ID:

1. Read `/home/neliq/Coding/master-project/experiment-data/run7-development-v3/evidence/ID/state-manifest.json`.
2. For every exact `state_id`, call vision on `/home/neliq/Coding/master-project/experiment-data/run7-development-v3/evidence/ID/sN.png`.
3. Read the matching `<!-- state sN -->` DOM block from `dom.html` as code.
4. Read the matching `STATE sN` semantic block from `semantic.txt`.
5. Write a neutral state-by-state evidence ledger before selecting patterns or assigning a verdict. Keep visual, DOM, and semantic facts separate. Native colors are evidence only where visually relevant, never a label.

## C0

Use only the three aligned evidence modalities and your own reasoning. Do not read any card or formalization file.

## C1

After completing the evidence ledger, read only:

- `/home/neliq/Coding/master-project/experiment-data/run7-development-v3/pattern-cards/index.md`
- `/home/neliq/Coding/master-project/experiment-data/run7-development-v3/protocol.md`

Select at most three candidate patterns from the index based on the observed mechanism. Then read only the individual `pattern-cards/card-NNN.md` files for those selected candidates. Do not read the monolithic card file or all individual cards before selection.

For each selected card:

- preserve every copied formula's AND/OR logic;
- record each predicate as TRUE, FALSE, or UNKNOWN with state ID and evidence location;
- apply only that card's listed escape clauses;
- never treat a keyword or semantic resemblance as formula satisfaction;
- E5 means UNKNOWN when a required mechanism is unobservable and must never be used as a BENIGN escape;
- BENIGN requires direct contradiction of the core requirement or an applicable card-specific escape;
- if unresolved evidence remains, mark `evidence_status:"UNKNOWN"`, cap confidence at 0.60, and select the binary label by preponderance of remaining direct evidence.

Do not add new predicates, thresholds, definitions, decision rules, or counterexamples.

## Output

Write exactly one JSON object per assigned ID to the requested output file:

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

Use `arm:"c1"` for C1. `evidence_status` must be `SUFFICIENT` or `UNKNOWN`; UNKNOWN confidence is at most 0.60. All text fields must be nonempty, modality observations must be distinct, assignment order must be preserved, and no rows may be skipped or fabricated. Parse and count the output before finishing.
