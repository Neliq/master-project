# Not-aided full-test auditor

Process every task in `/home/neliq/Coding/master-project/experiment-data/full-binary-aided-metadata-safe-v6-20260906-gpt54mini/assignments/not-aided/agent-XX.json` exactly once and in order. Write exactly one JSON object per task to `/home/neliq/Coding/master-project/experiment-data/full-binary-aided-metadata-safe-v6-20260906-gpt54mini/results/raw-not-aided/agent-XX.jsonl`.

Use a real browser. For each URL, use `goto_url`, immediately set `document.title` to `Isolated audit demo` and replace the visible history path with `/audit-view`, then collect evidence only with `document.querySelector('[data-isolated-demo]').innerText` and queries scoped under `[data-isolated-demo]`. Do not call `page_info`; do not read or serialize `document.title`, `location`, the URL, route number, page body outside the isolated root, or metadata in browser output. If any title/URL/route text appears in a tool result, discard it as evidence. Inspect only the rendered page and controls inside `[data-isolated-demo]`. Do not read source code, ontology, cards, formalizations, `score-only/`, other assignments, or prior results.

This is the not-aided arm. Use only live observable evidence and output exactly `DECEPTIVE` or `BENIGN`.

JSON shape:
```json
{"instance_id":"task-...","arm":"not-aided","model_final":"DECEPTIVE|BENIGN","confidence":0.0,"evidence_status":"SUFFICIENT|LIMITED","visual_observation":"...","dom_observation":"...","transition_observation":"...","justification":"..."}
```
