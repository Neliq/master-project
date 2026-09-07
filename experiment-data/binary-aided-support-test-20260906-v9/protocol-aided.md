# Binary live isolated-demo audit

Run ID: `binary-aided-support-test-20260906-v9`

- 10 patterns, condition 1, two variants each: 20 live URL tasks.
- Three independent agents per arm.
- Exactly two labels are permitted: `DECEPTIVE` or `BENIGN`.
- Abstention and confidence-based non-decisions are forbidden.
- The URL path and title are opaque; do not infer labels from either.
- Agents must not read `score-only/`, other assignments, or prior results.
- Browser interaction is limited to the rendered isolated demo and its controls.

## Aided arm

Read only `arms/aided/formalizations-pseudocode.md`. It contains general pseudocode rules and no demonstrations or labelled cases. First form a binary `base_label` from live evidence before consulting the rules. Then nominate at most three plausible rule IDs from the page and apply formalizations only to those candidates; never combine all ten rules globally.

Formalizations may add support only when the candidate context gate and every required atom are directly observed. Missing or unobservable evidence is neutral: record it separately, but it is not support and it cannot downgrade `base_label`. A direct formal contradiction is diagnostic only. The final label is `DECEPTIVE` if the base judgment is `DECEPTIVE` or a candidate has direct formal support; otherwise it is `BENIGN`.
