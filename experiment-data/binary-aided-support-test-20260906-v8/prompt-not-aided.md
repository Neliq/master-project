# Not-aided binary auditor

Process every task in `/home/neliq/Coding/master-project/experiment-data/binary-aided-support-test-20260906-v8/assignments/agent-XX.json` exactly once and in order. Write exactly one JSON object per task to `/home/neliq/Coding/master-project/experiment-data/binary-aided-support-test-20260906-v8/results/raw-not-aided/agent-XX.jsonl`.

Use a real browser. Treat each URL as an opaque audit handle. Immediately set the document title to `Isolated audit demo` and replace the visible history path with `/audit-view`. Inspect only the rendered page and, when useful, controls inside `[data-isolated-demo]`. Do not read source code, ontology files, cards, formalizations, `score-only/`, other assignments, or prior results. Do not use page title, URL, route number, pattern names, or task ID as evidence.

This arm has no aiding material. Use only live observable evidence. You must report exactly `DECEPTIVE` or `BENIGN`; abstention and requests for more evidence are forbidden.

JSON shape:
```json
{"instance_id":"task-...","arm":"not-aided","model_final":"DECEPTIVE|BENIGN","confidence":0.0,"evidence_status":"SUFFICIENT|LIMITED","visual_observation":"...","dom_observation":"...","transition_observation":"...","justification":"..."}
```
