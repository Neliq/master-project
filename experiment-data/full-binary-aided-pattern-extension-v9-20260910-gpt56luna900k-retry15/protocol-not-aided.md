# Two-pattern additive binary live isolated-demo audit

Run ID: `full-binary-aided-pattern-extension-v9-20260910-gpt56luna900k-retry15`

- This is an additive extension of `full-binary-aided-pattern-first-rollback-v7-20260907-gpt54mini`; prior artifacts are read-only.
- Exactly 2 patterns × 3 conditions × 2 variants = 12 distinct live interfaces.
- The same 12 interfaces are audited in both arms: 24 audit rows total.
- Exactly two arms exist: `not-aided` and `aided`.
- Six workers are assigned to each arm; each worker receives two instances.
- Exactly two final labels are permitted: `DECEPTIVE` or `BENIGN`.
- URL path, title, route number, pattern name, and task ID are not evidence.
- Browser interaction is limited to the rendered isolated demo and controls inside `[data-isolated-demo]`.

## Not-aided arm

Process every task in `/home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-extension-v9-20260910-gpt56luna900k-retry15/assignments/not-aided/agent-XX.json` exactly once and in order. Write exactly one JSON object per task to `/home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-extension-v9-20260910-gpt56luna900k-retry15/results/raw-not-aided/agent-XX.jsonl`. Use only live rendered evidence; do not read source, ontology, score-only, other assignments, or prior results.

JSON shape:
```json
{"instance_id":"task-...","arm":"not-aided","model_final":"DECEPTIVE|BENIGN","confidence":0.0,"evidence_status":"SUFFICIENT|LIMITED","visual_observation":"...","dom_observation":"...","transition_observation":"...","justification":"..."}
```
