# Binary aided-vs-not-aided live test — binary-aided-test-20260906-v7

- 20 live tasks, 10 patterns, 3 agents per arm.
- Both arms are forced binary: no UNKNOWN or abstention.

| Arm | N | Accuracy | Precision | Recall | F1 | TP | FP | TN | FN |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| not-aided | 20 | 0.950 | 1.000 | 0.900 | 0.947 | 9 | 0 | 10 | 1 |
| aided | 20 | 0.800 | 0.875 | 0.700 | 0.778 | 7 | 1 | 9 | 3 |

- Paired prediction flips: 3.
- Not-aided received no cards, formalizations, examples, candidate lists, or suggestive pattern instructions.
- Aided received only the generated general pseudocode formalization pack; no demonstrations or labelled examples.
