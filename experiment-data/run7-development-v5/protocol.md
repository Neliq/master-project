# Run 7 development pilot v5 — operational formalization revision v1

## Status and purpose

This is a fresh, bounded development pilot testing `formalization-revision-v1`, an application-oriented rewrite of the frozen 62-pattern/186-condition ontology. Run 6 and Run 7 v2–v4 remain unchanged. This pilot is directional development evidence, not a confirmatory significance test.

The revision targets measured defects: vacuous/material implication, tautological consequences, confusion between observable mechanisms and unobservable effects, and weak pattern/condition routing. The original formula is retained verbatim beside each operational card.

## Frozen sample and assignment

- 72 instances from 12 complete state-aligned patterns.
- The 12 patterns are disjoint from Run 7 v2–v4; this exclusion was recorded before running v5.
- Four fresh auditor sessions per arm, 18 opaque IDs per session.
- The same shuffled assignment is used for C0 and C1.
- Construction-based reference labels remain held out from auditors.

## Shared evidence

Both arms receive exactly the same visual, DOM, and semantic evidence. For each assigned instance, auditors must read the exact state manifest, call vision on every listed screenshot, read the matching DOM state, and read the matching semantic-text state. Visual, DOM, semantic, and transition facts are recorded separately. Native Sandbox colors are preserved and never encode labels.

## C0 baseline

C0 receives only the aligned evidence and uses independent reasoning. It does not receive any formalization, index, pattern card, ontology, or protocol guidance.

## C1 treatment

C1 receives the same evidence plus `formalization/pattern-cards/index.md` and this protocol.

After completing the neutral evidence ledger:

1. Screen all 62 pattern rows as `MATCH`, `NO_MATCH`, or `UNKNOWN` using observable mechanism anchors only. Do not force a single candidate.
2. Read individual cards only for `MATCH` or plausible `UNKNOWN` candidates, up to five. Do not read the source ontology or the combined JSON before screening.
3. For each read card, evaluate each of its three conditions independently. A condition is TRUE only when every required atom is directly supported. A condition is FALSE only with direct counterevidence. Otherwise it is UNKNOWN.
4. For a formula containing implication, require the relevant premise and consequence as observed evidence; never use vacuous truth or infer a consequence from a premise.
5. Treat unobservable backend truth, future state, psychological effect, causal intent, and ground truth as UNKNOWN.
6. A pattern is DECEPTIVE only when one complete trigger condition is TRUE. A counterevidence-polarity condition can disqualify a trigger but cannot create a deceptive verdict.
7. Apply only counterevidence listed on that pattern/condition card. No global escape clause can override an unrelated card.
8. If no complete trigger is proven and direct counterevidence is available, classify BENIGN. Otherwise classify UNKNOWN in `evidence_status` and cap confidence at 0.60; the binary field follows the predeclared preponderance-of-direct-evidence rule.

## Output and auditability

Every output row must include a nonempty per-state ledger, distinct visual/DOM/semantic observations, predicate statuses with state IDs, `candidate_screen` for C1, and `selected_cards` for C1. C0 may use empty arrays for those formalization-only fields. No credentials, configuration secrets, or connection strings may be retained.

## Analysis policy

The frozen analysis reports accuracy, F1, precision, recall, kappa, UNKNOWN rate, coverage, candidate-routing diagnostics, per-pattern results, paired McNemar diagnostics, and fixed-seed bootstrap intervals. Results are interpreted as development evidence. No protocol change will be selected after inspecting v5 outcomes, and no held-out evaluation will be run unless a protocol is frozen in advance.
