# Full binary live isolated-demo audit

Run ID: `full-binary-aided-pattern-first-rollback-v7-20260907-gpt54mini`

- 62 patterns × 3 conditions × 2 variants = 372 distinct live interfaces.
- The same 372 interfaces are audited in both arms: 744 audit rows total.
- Exactly two arms exist: `not-aided` and `aided`.
- Six workers are assigned to each arm; workers are replication units, not extra arms.
- Exactly two final labels are permitted: `DECEPTIVE` or `BENIGN`.
- The URL path, title, route number, pattern name, and task ID are not evidence.
- Agents must not read `score-only/`, other assignments, or prior results.
- Browser interaction is limited to the rendered isolated demo and controls inside `[data-isolated-demo]`.

## Aided arm

The only aid is `arms/aided/pattern-routing-index.jsonl` plus `arms/aided/formalization-index.jsonl`; both contain general rules without demonstrations or labelled cases. Read the complete 62-line pattern index first. First form `base_label` from live evidence, then write a neutral `mechanism_summary`. Select one plausible pattern from the pattern index before selecting up to three exact condition-rule IDs belonging to that pattern. Never guess IDs from numbers or mix rules from different patterns. Record the screening result and apply only selected candidates.

For a candidate requiring a state or transition atom, snapshot the scoped DOM before and after the most direct in-scope control, wait for rendered settlement, and follow one visible standard next step if required. Use direct observed atoms only. Missing or unobservable evidence is neutral and cannot downgrade the base label. The final label is `DECEPTIVE` when the base label is `DECEPTIVE` or direct formal support exists; otherwise it is `BENIGN`.
