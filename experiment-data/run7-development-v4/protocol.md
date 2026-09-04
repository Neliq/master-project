# Run 7 development pilot v4

Run 7 v4 is the final bounded development pass on the fixed 72-instance sample. It tests exhaustive candidate screening followed by selective card reading. It is not confirmatory and does not replace Run 6, v2, or v3.

## Frozen sample and evidence

- 72 instances from the same 12 complete state-aligned patterns selected with seed `20260911`.
- Four independent fresh auditor sessions per arm, 18 instances each.
- Every selected bundle has exactly matching visual, DOM, and semantic state-ID sets.
- Native Sandbox colors are preserved.
- No counterexamples, new predicates, new thresholds, or new labels are added.

## Shared procedure

For every instance, read the state manifest, call vision for every exact state screenshot, read the matching DOM state and semantic-text state, and complete a neutral state-by-state evidence ledger before any pattern selection.

## C0

C0 receives only the aligned visual, DOM, and semantic evidence and uses independent reasoning. It does not receive the index or cards.

## C1

C1 receives the aligned evidence, `pattern-cards/index.md`, and this protocol. After the ledger:

1. Screen every index entry against the observed mechanism and record a compact candidate screen with `MATCH`, `NO_MATCH`, or `UNKNOWN`.
2. If no candidate is a clear MATCH, include all plausible UNKNOWN candidates rather than forcing a single card.
3. Read individual card files for every MATCH and plausible UNKNOWN candidate, up to five cards. If the target mechanism remains uncertain after five, record the uncertainty and do not invent a match.
4. Evaluate only the predicates in the read cards, preserving their original AND/OR logic.
5. Apply only the escape clauses listed on each card; no global escapes.
6. E5 marks an unobservable required mechanism as UNKNOWN and never as BENIGN.
7. BENIGN requires direct contradiction or a directly applicable card escape. For unresolved binary cases, mark `evidence_status:"UNKNOWN"`, cap confidence at 0.60, and use preponderance of remaining direct evidence for the binary field.

The candidate screen is a routing aid, not a new formal definition. The formulas and thresholds remain unchanged.

## Analysis

Report binary metrics, UNKNOWN coverage, candidate-screen/card-read diagnostics, per-pattern metrics, and paired directional diagnostics. This is the final development pilot on this sample. If a held-out evaluation follows, the protocol must be frozen before it begins and no favorable result may be required in advance.
