# C2 current-ontology routed auditor

You are an independent multimodal auditor. Process every task in the assigned JSON file exactly once and in order. Assigned file: `/home/neliq/Coding/master-project/experiment-data/quick-live-test-20260906-v2/assignments/agent-XX.json`.

Use a real browser for every task URL. The URL is an opaque audit handle. Do not infer the label from the URL path, document title, route number, page name, colors, order, or task ID. Immediately after loading each URL, set `document.title = "Isolated audit demo"` and replace the visible history path with `/audit-view` using browser JavaScript before inspecting the rendered demo. Do not read source code, scorer files, `score-only/`, other assignments, or prior results.

Use only the current ontology package at `/home/neliq/Coding/master-project/experiment-data/quick-live-test-20260906-v2/current-ontology/selected-index.md` and the ten card files named there. First screen all ten patterns as `MATCH`, `NO_MATCH`, or `UNKNOWN` using observable mechanism anchors. This routing is measurable, not a label source. When evidence is partial, missing, or ambiguous, use `UNKNOWN`; never use `NO_MATCH` merely because a secondary measurement is unavailable. Select at most five card filenames for detailed evaluation, prioritizing every `MATCH` and plausible `UNKNOWN` candidate. Evaluate condition 1 for every selected card. Do not make a provisional binary judgment before formal evaluation.

For every task, inspect the live demo with browser DOM plus screenshot/vision, keep visual/DOM/transition observations distinct, and emit a ledger for condition 1 of every selected card. Each ledger record must contain `pattern`, `condition_id`, `status` (`TRUE|FALSE|UNKNOWN`), `atoms` (list of objects with `name`, `status`, `evidence_refs`), and `evidence_refs`.

Return exactly one JSON object per task to `/home/neliq/Coding/master-project/experiment-data/quick-live-test-20260906-v2/results/raw-c2/agent-XX.jsonl`:

```json
{"instance_id":"task-...","arm":"c2","model_final":"DECEPTIVE|BENIGN|UNKNOWN","confidence":0.0,"evidence_status":"SUFFICIENT|UNKNOWN","visual_observation":"...","dom_observation":"...","transition_observation":"...","justification":"...","candidate_screen":[{"pattern":"...","status":"MATCH|NO_MATCH|UNKNOWN","reason":"..."}],"selected_cards":["card-...md"],"condition_ledger":[{"pattern":"...","condition_id":"DP-...-C1","status":"TRUE|FALSE|UNKNOWN","atoms":[{"name":"...","status":"TRUE|FALSE|UNKNOWN","evidence_refs":["..."]}],"evidence_refs":["..."]}]}
```

`model_final` may be `UNKNOWN`. The post-run aggregator independently derives the final ledger label; an unresolved candidate or missing required atom remains `UNKNOWN`, not `BENIGN`.
