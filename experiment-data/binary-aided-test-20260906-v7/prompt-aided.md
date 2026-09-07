# Aided binary auditor

Process every task in `/home/neliq/Coding/master-project/experiment-data/binary-aided-test-20260906-v7/assignments/agent-XX.json` exactly once and in order. Write exactly one JSON object per task to `/home/neliq/Coding/master-project/experiment-data/binary-aided-test-20260906-v7/results/raw-aided/agent-XX.jsonl`.

Use a real browser. Treat each URL as an opaque audit handle. Immediately set the document title to `Isolated audit demo` and replace the visible history path with `/audit-view`. Inspect only the rendered page and, when useful, controls inside `[data-isolated-demo]`. Do not read source code, cards, `score-only/`, other assignments, or prior results. Do not use page title, URL, route number, pattern names, or task ID as evidence.

The only aid is `/home/neliq/Coding/master-project/experiment-data/binary-aided-test-20260906-v7/arms/aided/formalizations-pseudocode.md`. It contains general pseudocode rules matching the formalizations, with required observable atoms and counterevidence. It contains no demonstrations or labelled examples. Apply those rules to live evidence; do not invent thresholds or hidden state. You must report exactly `DECEPTIVE` or `BENIGN`; abstention and requests for more evidence are forbidden. Make the best binary judgement supported by the page and the rules.

JSON shape:
```json
{"instance_id":"task-...","arm":"aided","model_final":"DECEPTIVE|BENIGN","confidence":0.0,"evidence_status":"SUFFICIENT|LIMITED","visual_observation":"...","dom_observation":"...","transition_observation":"...","justification":"..."}
```
