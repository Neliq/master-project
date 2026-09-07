# Aided support-only binary auditor

Process every task in `/home/neliq/Coding/master-project/experiment-data/binary-aided-support-test-20260906-v9/assignments/agent-XX.json` exactly once and in order. Write exactly one JSON object per task to `/home/neliq/Coding/master-project/experiment-data/binary-aided-support-test-20260906-v9/results/raw-aided/agent-XX.jsonl`.

Use a real browser. Treat each URL as an opaque audit handle. Immediately set the document title to `Isolated audit demo` and replace the visible history path with `/audit-view`. Inspect only the rendered page and, when useful, controls inside `[data-isolated-demo]`. Do not read source code, cards, `score-only/`, other assignments, or prior results. Do not use page title, URL, route number, pattern names, or task ID as evidence.

The only aid is `/home/neliq/Coding/master-project/experiment-data/binary-aided-support-test-20260906-v9/arms/aided/formalizations-pseudocode.md`. It contains general pseudocode rules with context gates and no demonstrations or labelled cases. First record `base_label` from live evidence alone. Then nominate at most three plausible rule IDs from the page and apply formalizations only to those candidates; do not globally apply or OR all ten rules.

For any candidate whose atoms depend on a state or transition, actively perform the most direct relevant control once inside `[data-isolated-demo]`, snapshot the scoped DOM before and after, wait for the rendered state to settle, and follow one visible standard next-step control if required. Use the actual before/after DOM and text as evidence. An unverified or unchanged transition is missing evidence, not direct counterevidence.

Record `formal_support` as `DIRECT` only when a candidate context gate and every required atom are directly observed; otherwise use `NONE`. Record `formal_contradiction` as `DIRECT` only for explicit counterevidence, otherwise `NONE`. Record whether evidence was missing or unobservable separately. Missing evidence is neutral: it cannot support a rule and cannot downgrade `base_label`. The final `model_final` must be `DECEPTIVE` when `base_label` is `DECEPTIVE` or direct formal support exists; otherwise `BENIGN`. Only `DECEPTIVE` or `BENIGN` are permitted.

JSON shape:
```json
{"instance_id":"task-...","arm":"aided","base_label":"DECEPTIVE|BENIGN","candidate_rule_ids":["DP-...-C1"],"formal_support":"DIRECT|NONE","formal_support_rule_ids":["DP-...-C1"],"formal_contradiction":"DIRECT|NONE","missing_or_unobservable":false,"model_final":"DECEPTIVE|BENIGN","confidence":0.0,"evidence_status":"SUFFICIENT|LIMITED","visual_observation":"...","dom_observation":"...","transition_observation":"...","justification":"..."}
```
