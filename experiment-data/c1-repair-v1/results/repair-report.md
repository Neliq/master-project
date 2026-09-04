# C1 repair-loop v1 results

This is a 20-example, outcome-selected development diagnostic. It is not confirmatory and cannot establish general improvement.

| Arm | Accuracy | Precision | Recall | F1 | TP | FP | TN | FN |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| fixed_v5_c0 | 1.0000 | 1.0000 | 1.0000 | 1.0000 | 18 | 0 | 2 | 0 |
| previous_v5_c1 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0 | 2 | 0 | 18 |
| repair_c1 | 0.8500 | 0.9412 | 0.8889 | 0.9143 | 16 | 1 | 1 | 2 |

- UNKNOWN: previous C1 13/20; repair C1 2/20.
- Previous C1 errors corrected: 17; new errors introduced relative to previous C1: 0.
- Repair C1 vs fixed C0: corrections 0; regressions 3.
- Exact McNemar previous C1 vs repair: b=17, c=0, p=0.000015.
- Exact McNemar fixed C0 vs repair: b=0, c=3, p=0.250000.

## Formal review dispositions

- UPGRADE: 3
- DOWNGRADE: 0
- RETAIN: 17
- INCONCLUSIVE: 0
