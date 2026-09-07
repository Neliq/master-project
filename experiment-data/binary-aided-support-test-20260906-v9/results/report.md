# Binary support-only aided-vs-not-aided test — binary-aided-support-test-20260906-v9

- 20 live tasks, 10 patterns, 3 agents per arm.
- Both arms are forced binary.
- Aided rules are context-gated, candidate-shortlisted, and support-only.

| Output | N | Accuracy | Precision | Recall | F1 | TP | FP | TN | FN |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| not-aided | 20 | 1.000 | 1.000 | 1.000 | 1.000 | 10 | 0 | 10 | 0 |
| aided | 20 | 1.000 | 1.000 | 1.000 | 1.000 | 10 | 0 | 10 | 0 |
| aided_base | 20 | 0.950 | 1.000 | 0.900 | 0.947 | 9 | 0 | 10 | 1 |

- Aided internal harmful changes (correct base → incorrect final): 0.
- Aided internal helpful changes (incorrect base → correct final): 1.
- Direct formal support cases: 5.
- Not-aided versus aided final-label flips: 0.
- Non-degrading on this sample: YES.

## Internal helpful corrections

- `task-af64bfc208f6` (friend-spam): BENIGN → DECEPTIVE via DP-039-C1.

## Per-pattern final accuracy

| Pattern | Not aided | Aided base | Aided final |
|---|---:|---:|---:|
| addictive-design | 2/2 | 2/2 | 2/2 |
| confirmshaming | 2/2 | 2/2 | 2/2 |
| conflicting-information | 2/2 | 2/2 | 2/2 |
| cuteness | 2/2 | 2/2 | 2/2 |
| friend-spam | 2/2 | 1/2 | 2/2 |
| immortal-accounts | 2/2 | 2/2 | 2/2 |
| pay-to-avoid | 2/2 | 2/2 | 2/2 |
| persuasive-language | 2/2 | 2/2 | 2/2 |
| price-comparison-prevention | 2/2 | 2/2 | 2/2 |
| sneak-into-basket | 2/2 | 2/2 | 2/2 |
