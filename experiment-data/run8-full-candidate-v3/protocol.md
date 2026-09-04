# Run 8 full candidate experiment

## Purpose

Run 8 tests the frozen `formalization-revision-v2` package against an evidence-only baseline on the complete 372-instance corpus. It follows the bounded C1 repair improvement but remains a new experiment; Run 6 and all development diagnostics remain unchanged.

## Corpus and blinding

- 372 opaque instances: 62 patterns × 3 condition layers × 2 variants.
- Construction-based reference labels are held only in scorer-only storage.
- The auditor-visible bundle contains no `instances.json`, `ground-truth.json`, prior outputs, or selection rationale.
- Ten fresh auditor sessions per arm use the same shuffled assignment.
- The same visual, DOM, and semantic evidence is supplied to both arms.
- Native Sandbox colors are unchanged and never encode labels.

## Evidence policy

For every listed state, call vision on the listed screenshot when present. Read the matching DOM and semantic state by exact state ID when present. If a state manifest marks a modality unavailable, record that modality as UNKNOWN; do not fabricate a placeholder fact or silently drop the state.

## C0 baseline

C0 receives only aligned evidence and makes an evidence-only judgment. It does not read formalization files.

## C1 treatment

C1 receives the same evidence plus `formalization/pattern-cards/index.md` and this protocol.

1. Complete a neutral, state-by-state visual/DOM/semantic/transition ledger.
2. Make a provisional evidence-only binary judgment before reading formalization.
3. Screen all pattern rows as MATCH, NO_MATCH, or UNKNOWN using observable mechanism anchors. Candidate routing is not an exclusion rule.
4. Read individual cards only for plausible candidates, up to five.
5. Evaluate conditions with TRUE/FALSE/UNKNOWN proof obligations. A complete trigger requires all required atoms. A direct contradiction or contradicted domain/context may downgrade. Missing secondary formal measurements alone may not overwrite the provisional binary judgment.
6. For implications, observe the relevant premise and consequence; never use vacuous truth.
7. Qualitative comparisons may use explicit same-interface comparisons only when both operands and direction are observed; do not invent numeric thresholds.
8. Unobservable backend state, future events, psychological effects, causal intent, and ground truth remain UNKNOWN.
9. A counterevidence-polarity condition can block a trigger but cannot create a deceptive verdict.
10. Record `formal_review` as UPGRADE, DOWNGRADE, RETAIN, or INCONCLUSIVE. The final binary decision is the declared treatment output.

## Primary analysis

The primary paired unit is the opaque instance. Report C0/C1 confusion matrices, F1, accuracy, precision, recall, kappa, exact paired McNemar test, paired bootstrap intervals, UNKNOWN rate/coverage, formal-review dispositions, routing diagnostics, per-pattern sensitivity, and modality-availability counts. Interpret the complete intervention package, not an ontology-only causal effect.

No labels, prompts, exclusions, thresholds, assignment, or statistical procedures may be changed after inspecting Run 8 outputs.
