# C1 repair loop v1 — formalization revision v2

This is a C1-only development diagnostic on 20 preselected v5 regressions. It is not a confirmatory experiment. C0 decisions are fixed from v5 and are not rerun in this loop.

## Selection

The 20 instances are exactly all v5 cases where C0 matched the held-out construction label and v5 C1 did not. This outcome-dependent selection is explicitly development-only; no held-out claim may use it.

## Blindness

The auditor-visible directory contains only opaque IDs, assigned evidence, and formalization cards. Labels, instance metadata, fixed C0 decisions, previous C1 decisions, and selection rationale are stored outside it in scorer-only storage.

## Procedure

For each assigned instance:

1. Read the exact state manifest.
2. Call vision on every listed screenshot.
3. Read matching DOM and semantic states by exact state ID.
4. Complete a neutral evidence ledger and make a provisional evidence-only binary judgment before reading formalization cards.
5. Read the v2 formalization index and only relevant pattern cards.
6. Use formalization to verify/challenge the provisional judgment:
   - complete proof may upgrade a provisional negative;
   - direct contradiction may downgrade a provisional positive;
   - missing formal evidence, unobservable variables, or candidate-routing uncertainty may not by itself overwrite the provisional binary judgment;
   - qualitative comparisons may use explicit same-interface comparisons, without invented numeric thresholds;
   - implications require observed premises and observed consequences; no vacuous truth.
7. Record whether the formal review changed the provisional judgment and why.

## Output

Produce one JSON object per assigned ID with the provisional and final binary fields, evidence status, formal-review disposition, predicate ledger, selected cards, and distinct visual/DOM/semantic observations. Do not read labels, previous outputs, or any non-assigned file.
