# Full binary live isolated-demo audit

Run ID: `full-binary-aided-test-20260906-gpt54mini`

- 62 patterns × 3 conditions × 2 variants = 372 distinct live interfaces.
- The same 372 interfaces are audited in both arms: 744 audit rows total.
- Exactly two arms exist: `not-aided` and `aided`.
- Six workers are assigned to each arm; workers are replication units, not extra arms.
- Exactly two final labels are permitted: `DECEPTIVE` or `BENIGN`.
- The URL path, title, route number, pattern name, and task ID are not evidence.
- Agents must not read `score-only/`, other assignments, or prior results.
- Browser interaction is limited to the rendered isolated demo and controls inside `[data-isolated-demo]`.

## Aided arm

The only aid is `arms/aided/formalizations-pseudocode.md`, which contains general pseudocode rules without demonstrations or labelled cases. First form `base_label` from live evidence. Then nominate at most three plausible candidate rule IDs and apply only those rules.

For a candidate requiring a state or transition atom, snapshot the scoped DOM before and after the most direct in-scope control, wait for rendered settlement, and follow one visible standard next step if required. Use direct observed atoms only. Missing or unobservable evidence is neutral and cannot downgrade the base label. The final label is `DECEPTIVE` when the base label is `DECEPTIVE` or direct formal support exists; otherwise it is `BENIGN`.
