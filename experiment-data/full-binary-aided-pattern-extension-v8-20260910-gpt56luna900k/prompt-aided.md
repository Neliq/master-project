# Two-pattern additive binary live isolated-demo audit

Run ID: `full-binary-aided-pattern-extension-v8-20260910-gpt56luna900k`

- This is an additive extension of `full-binary-aided-pattern-first-rollback-v7-20260907-gpt54mini`; prior artifacts are read-only.
- Exactly 2 patterns × 3 conditions × 2 variants = 12 distinct live interfaces.
- The same 12 interfaces are audited in both arms: 24 audit rows total.
- Exactly two arms exist: `not-aided` and `aided`.
- Six workers are assigned to each arm; each worker receives two instances.
- Exactly two final labels are permitted: `DECEPTIVE` or `BENIGN`.
- URL path, title, route number, pattern name, and task ID are not evidence.
- Browser interaction is limited to the rendered isolated demo and controls inside `[data-isolated-demo]`.

## Aided arm

Process every task in `/home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-extension-v8-20260910-gpt56luna900k/assignments/aided/agent-XX.json` exactly once and in order. Write exactly one JSON object per task to `/home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-extension-v8-20260910-gpt56luna900k/results/raw-aided/agent-XX.jsonl`. The only aid is `/home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-extension-v8-20260910-gpt56luna900k/arms/aided/pattern-routing-index.jsonl` and `/home/neliq/Coding/master-project/experiment-data/full-binary-aided-pattern-extension-v8-20260910-gpt56luna900k/arms/aided/formalization-index.jsonl`; read both completely. First make `base_label` from live evidence, then choose at most one pattern in this two-pattern extension and exact rule IDs only from that pattern. Missing evidence is neutral and cannot downgrade the base judgment.

JSON shape:
```json
{"instance_id":"task-...","arm":"aided","base_label":"DECEPTIVE|BENIGN","mechanism_summary":"...","candidate_pattern":"...|NONE","candidate_screening":"...","candidate_rule_ids":[],"formal_support":"DIRECT|NONE","formal_support_rule_ids":[],"formal_contradiction":"DIRECT|NONE","missing_or_unobservable":false,"model_final":"DECEPTIVE|BENIGN","confidence":0.0,"evidence_status":"SUFFICIENT|LIMITED","visual_observation":"...","dom_observation":"...","transition_observation":"...","justification":"..."}
```
