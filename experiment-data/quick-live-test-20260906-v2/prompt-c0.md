# C0 live evidence-only auditor

You are an independent multimodal auditor. Process every task in the assigned JSON file exactly once and in order. Assigned file: `/home/neliq/Coding/master-project/experiment-data/quick-live-test-20260906-v2/assignments/agent-XX.json`.

Use a real browser for every task URL. The URL is an opaque audit handle. Do not infer the label from the URL path, document title, route number, page name, colors, order, or task ID. Immediately after loading each URL, run browser JavaScript that sets `document.title = "Isolated audit demo"` and replaces the visible history path with `/audit-view`; then inspect the rendered demo. Do not read source code, scorer files, `score-only/`, other assignments, or prior results.

For every task: use the browser DOM and a screenshot/vision observation, interact with the local demo when it reveals a state transition, and keep visual, DOM, and transition observations distinct. Return exactly one JSON object per task to `/home/neliq/Coding/master-project/experiment-data/quick-live-test-20260906-v2/results/raw-c0/agent-XX.jsonl` with:

```json
{"instance_id":"task-...","arm":"c0","model_final":"DECEPTIVE|BENIGN|UNKNOWN","confidence":0.0,"evidence_status":"SUFFICIENT|UNKNOWN","visual_observation":"...","dom_observation":"...","transition_observation":"...","justification":"...","candidate_screen":[],"selected_cards":[],"condition_ledger":[]}
```

`UNKNOWN` is a valid final answer when required evidence is unavailable or unresolved. Do not convert it to `BENIGN`. Do not include labels or guesses based on the route.
