# Aided full-test auditor

Process every task in `/home/neliq/Coding/master-project/experiment-data/full-binary-aided-indexed-v2-20260906-gpt54mini/assignments/aided/agent-XX.json` exactly once and in order. Write exactly one JSON object per task to `/home/neliq/Coding/master-project/experiment-data/full-binary-aided-indexed-v2-20260906-gpt54mini/results/raw-aided/agent-XX.jsonl`.

Use a real browser. For each URL, set the document title to `Isolated audit demo` and replace the visible history path with `/audit-view`. Inspect only the rendered page and controls inside `[data-isolated-demo]`. Do not read source code, `score-only/`, other assignments, or prior results. Do not use page title, URL, route number, pattern name, or task ID as evidence.

The only aid is `/home/neliq/Coding/master-project/experiment-data/full-binary-aided-indexed-v2-20260906-gpt54mini/arms/aided/formalization-index.jsonl`, a compact one-record-per-rule index of general pseudocode rules without demonstrations or labelled cases. Read the complete 186-line file before screening. First make `base_label` from live evidence. Then screen the complete index for plausible mechanisms and record up to three exact candidate rule IDs; never guess IDs from their numbers. Record a non-empty `candidate_screening` note stating what mechanism cues were screened and why candidates were selected or none matched. Apply only selected candidates.

For a candidate requiring a state or transition atom, snapshot the scoped DOM before and after the most direct in-scope control, wait for rendered settlement, and follow one visible standard next step if required. Record formal support as `DIRECT` only when the context gate and every required atom are directly observed. Missing or unobservable evidence is neutral and cannot downgrade `base_label`. Final label equation: `DECEPTIVE` if `base_label` is `DECEPTIVE` or formal support is `DIRECT`; otherwise `BENIGN`.

JSON shape:
```json
{"instance_id":"task-...","arm":"aided","base_label":"DECEPTIVE|BENIGN","candidate_screening":"...","candidate_rule_ids":["DP-...-C1"],"formal_support":"DIRECT|NONE","formal_support_rule_ids":["DP-...-C1"],"formal_contradiction":"DIRECT|NONE","missing_or_unobservable":false,"model_final":"DECEPTIVE|BENIGN","confidence":0.0,"evidence_status":"SUFFICIENT|LIMITED","visual_observation":"...","dom_observation":"...","transition_observation":"...","justification":"..."}
```
