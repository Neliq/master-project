# Full binary live isolated-demo audit

Run ID: `full-binary-aided-pattern-first-rollback-v7-20260907-gpt54mini`

- 62 patterns × 3 conditions × 2 variants = 372 distinct live interfaces.
- The same 372 interfaces are audited in both arms: 744 audit rows total.
- Exactly two arms exist: `not-aided` and `aided`.
- Six workers are assigned to each arm; workers are replication units, not extra arms.
- Exactly two final labels are permitted: `DECEPTIVE` or `BENIGN`.
- The URL path, title, route number, pattern name, and task ID are not evidence.
- Agents must not read `score-only/`, other assignments, or prior results.
- Browser interaction is limited to the rendered isolated demo and controls inside `[data-isolated-demo]`.

## Not-aided arm

Use only the live rendered page and observable DOM/interaction transitions. Do not use ontology files, cards, formal rules, pseudocode, pattern suggestions, candidate lists, or examples. Report one binary label.
