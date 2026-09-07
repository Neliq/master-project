# Binary live isolated-demo audit

Run ID: `binary-aided-test-20260906-v6`

- 10 patterns, condition 1, two variants each: 20 live URL tasks.
- Three independent agents per arm.
- Exactly two labels are permitted: `DECEPTIVE` or `BENIGN`.
- `UNKNOWN`, abstention, and confidence-based non-decisions are forbidden.
- The URL path and title are opaque; do not infer labels from either.
- Agents must not read `score-only/`, other assignments, or prior results.
- Browser interaction is limited to the rendered isolated demo and its controls.

## Aided arm

Read only `arms/aided/formalizations-pseudocode.md` for assistance. It contains general formalization rules and no demonstrations or labelled examples. Apply the rules to the live evidence. Do not read cards or any other ontology artifact. Report one binary label; never emit `UNKNOWN`.
