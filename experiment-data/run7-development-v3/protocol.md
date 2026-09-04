# Run 7 development pilot v3

Run 7 v3 is a second bounded development pilot using the same fixed 72-instance, 12-pattern, fully state-aligned sample as v2. It tests a routing refinement after v2 showed that all-card context caused cross-pattern predicate confusion. It is not a confirmatory test and does not replace Run 6 or v2.

## Frozen sample and evidence

- 72 instances, 12 complete patterns, fixed sample seed `20260911`.
- Four independent fresh auditor sessions per arm, 18 instances each.
- Every selected bundle has equal visual, DOM, and semantic state-ID sets.
- Native Sandbox colors are preserved.
- No counterexamples are added.

## Shared evidence ledger

For each assigned instance, read `state-manifest.json`, call vision on every listed screenshot, read the matching DOM state comment, and read the matching semantic `STATE sN` block. Record a state-by-state evidence ledger before choosing any pattern or verdict. A state is TRUE/FALSE/UNKNOWN only for evidence that can actually be evaluated.

## C0

C0 receives the aligned evidence only. It uses the ledger and independent reasoning; it does not read the card index or card files.

## C1

C1 receives the aligned evidence plus `pattern-cards/index.md` and `protocol.md`.

After completing the evidence ledger:

1. Use the short index to select at most three candidate patterns whose mechanism summaries match the observed interface.
2. Read only the individual `pattern-cards/card-NNN.md` files for those candidates.
3. Do not read the monolithic `pattern-cards.md`, the ontology, or all 62 individual cards before candidate selection.
4. Evaluate only the selected card predicates. Preserve every original formula's AND/OR logic.
5. Apply only the selected card's escape clauses; global escape clauses are not available.
6. Mark predicate status TRUE, FALSE, or UNKNOWN with state and evidence location.
7. E5 creates UNKNOWN and never creates BENIGN. A final BENIGN verdict requires direct contradiction or a directly applicable escape. For unresolved binary cases, use remaining direct evidence by preponderance, mark `evidence_status:"UNKNOWN"`, and cap confidence at 0.60.

No definition, threshold, label, exclusion, decision rule, or counterexample is added.

## Analysis

The pilot reports binary accuracy/F1, precision/recall, UNKNOWN rate, per-pattern results, and paired directional diagnostics. These are development diagnostics only. A held-out evaluation may begin only after the v3 protocol is frozen; no further changes may be made based on its result.
