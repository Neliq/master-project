# Binary live isolated-demo audit

Run ID: `binary-aided-support-test-20260906-v10`

- 10 patterns, condition 1, two variants each: 20 live URL tasks.
- Three independent agents per arm.
- Exactly two labels are permitted: `DECEPTIVE` or `BENIGN`.
- Abstention and confidence-based non-decisions are forbidden.
- The URL path and title are opaque; do not infer labels from either.
- Agents must not read `score-only/`, other assignments, or prior results.
- Browser interaction is limited to the rendered isolated demo and its controls.

## Not-aided arm

Use only the live rendered page and its observable DOM/interaction transitions. Do not use ontology files, cards, formal rules, pseudocode, pattern suggestions, candidate lists, or examples. Report one binary label from live evidence.
