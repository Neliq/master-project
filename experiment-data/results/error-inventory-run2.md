## Error inventory (instances where any arm disagreed with ground truth)

Total disagreements: **5** (c0: 2, c1: 3) across **4** distinct instances
| Instance | Variant | Layer | Truth | Agent | Arm | Conf | Justification (first 120 chars) |
|---|---|---|---|---|---|---|---|---|
| granting-and-interaction-cond3-A | A | 3 | True | agent-07 | c0 | 0.6 | Camera permission prompt for a video call is functionally necessary; 'Don't Allow' is a clearly available alternative. |
| granting-and-interaction-cond3-A | A | 3 | True | agent-07 | c1 | 0.7 | Granting-and-Interaction #1: Dep(join video call, camera) ≠ ∅ — camera is the core function of a video call, so gating i |
| parasocial-pressure-cond3-A | A | 3 | True | agent-07 | c1 | 0.6 | REVISED. 'Pip is counting on you' is emotionally toned, but formal conditions do not fire: #1 no T=0 ⟹ failure claim; #2 |
| trick-questions-cond2-A | A | 2 | True | agent-07 | c1 | 0.6 | REVISED. Trick Questions #1 (aria/visual label mismatch): no mismatch, single consistent label; #2 (affordance-consequen |
| trick-questions-cond2-B | B | 2 | False | agent-07 | c0 | 0.6 | Structurally identical to the A variant (only color differs): signup disabled until the user affirmatively ticks 'Yes, I |
