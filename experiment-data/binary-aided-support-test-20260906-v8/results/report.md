# Binary support-only aided-vs-not-aided test — binary-aided-support-test-20260906-v8

- 20 live tasks, 10 patterns, 3 agents per arm.
- Both arms are forced binary.
- Aided rules are context-gated, candidate-shortlisted, and support-only.

| Output | N | Accuracy | Precision | Recall | F1 | TP | FP | TN | FN |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| not-aided | 20 | 0.950 | 1.000 | 0.900 | 0.947 | 9 | 0 | 10 | 1 |
| aided | 20 | 0.900 | 1.000 | 0.800 | 0.889 | 8 | 0 | 10 | 2 |
| aided_base | 20 | 0.900 | 1.000 | 0.800 | 0.889 | 8 | 0 | 10 | 2 |

- Aided internal harmful changes (correct base → incorrect final): 0.
- Aided internal helpful changes (incorrect base → correct final): 0.
- Not-aided versus aided final-label flips: 1.
