# Not-aided full-test auditor

Process every task in `/home/neliq/Coding/master-project/experiment-data/full-binary-aided-indexed-v2-20260906-gpt54mini/assignments/not-aided/agent-XX.json` exactly once and in order. Write exactly one JSON object per task to `/home/neliq/Coding/master-project/experiment-data/full-binary-aided-indexed-v2-20260906-gpt54mini/results/raw-not-aided/agent-XX.jsonl`.

Use a real browser. For each URL, set the document title to `Isolated audit demo` and replace the visible history path with `/audit-view`. Inspect only the rendered page and controls inside `[data-isolated-demo]`. Do not read source code, ontology, cards, formalizations, `score-only/`, other assignments, or prior results. Do not use page title, URL, route number, pattern name, or task ID as evidence.

This is the not-aided arm. Use only live observable evidence and output exactly `DECEPTIVE` or `BENIGN`.

JSON shape:
```json
{"instance_id":"task-...","arm":"not-aided","model_final":"DECEPTIVE|BENIGN","confidence":0.0,"evidence_status":"SUFFICIENT|LIMITED","visual_observation":"...","dom_observation":"...","transition_observation":"...","justification":"..."}
```
