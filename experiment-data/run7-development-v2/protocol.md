# Run 7 development pilot protocol

## Purpose

Run 7 is a bounded development pilot to test whether a less overloaded formalization presentation improves the configured multimodal auditor. It is not a confirmatory significance test and will not replace the frozen Run 6 result.

## Sample and blinding

- 72 instances from 12 complete state-aligned patterns, selected with seed `20260911` from the frozen Run 6 evidence.
- Four independent fresh auditor sessions per arm, 18 instances per session.
- The same shuffled assignment is used in C0 and C1, but the contexts are independent.
- Construction-based labels and mapping files remain unavailable to auditors.

## Evidence contract

Each bundle contains a `state-manifest.json`. A state is identified only by its original `state_id` (`s0`, `s1`, ...). The manifest names the screenshot, DOM state, and semantic-text state for that exact ID. The pilot sample contains only bundles for which all three modalities have the same state-ID set. No screenshot, DOM block, or semantic block is paired by position when IDs disagree.

For every assigned instance, the auditor must:

1. Read `state-manifest.json`.
2. For every state ID, call vision on that state's screenshot, read the matching DOM block from `dom.html`, and read the matching `STATE sN` block from `semantic.txt`.
3. Write a neutral evidence ledger before assigning a verdict.
4. Distinguish `TRUE`, `FALSE`, and `UNKNOWN` for each evaluated predicate.

Native Sandbox colors are retained. Color alone is never a label.

## C0 — multimodal baseline

C0 receives the aligned visual, DOM, and semantic evidence but no formal cards or ontology guidance. It uses the evidence ledger and its own reasoning.

## C1 — compact formal intervention

C1 receives exactly the same aligned evidence plus:

- `pattern-cards.md`, containing the unchanged 186 formulas extracted from the Run 6 ontology;
- the compact application rules in `auditor-prompts.md`.

C1 does not receive the 145 KB monolithic ontology file. No formula, threshold, corpus label, or counterexample is added.

## Decision semantics

- A predicate is `TRUE` only with direct evidence and its required variables.
- A predicate is `FALSE` only when the evidence directly contradicts it or a listed disqualifier applies.
- A predicate is `UNKNOWN` when a required mechanism or state is not observable.
- E5 records `UNKNOWN`; it does not create a BENIGN verdict.
- A final BENIGN verdict requires a contradicted core requirement or a directly applicable pattern-specific escape. Missing evidence alone is not a BENIGN verdict.
- If binary output is required while unresolved evidence remains, record `evidence_status:"UNKNOWN"`, cap confidence at 0.60, and choose the binary label by preponderance of the remaining direct evidence rather than by applying E5 as a negative label.

The binary accuracy/F1 analysis remains secondary to the pilot's directional and coverage diagnostics. No rows, labels, predicates, thresholds, exclusions, or tests may be changed after seeing outputs.

## Analysis policy

The pilot reports binary metrics, UNKNOWN rate, known-evidence coverage, selective metrics, and paired C0/C1 changes. A favorable pilot direction does not establish significance. After the guidance is frozen, any held-out evaluation must use a new sample or held-out patterns and the same two-sided primary test specified before evaluation.
