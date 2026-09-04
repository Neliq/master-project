# C1 repair-loop v1 results

This is a 20-example, outcome-selected development diagnostic. It is not confirmatory and cannot establish general improvement.

| Arm | Accuracy | Precision | Recall | F1 | TP | FP | TN | FN |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| fixed_v5_c0 | 1.0000 | 1.0000 | 1.0000 | 1.0000 | 18 | 0 | 2 | 0 |
| previous_v5_c1 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0 | 2 | 0 | 18 |
| repair_c1 | 0.7500 | 0.9333 | 0.7778 | 0.8485 | 14 | 1 | 1 | 4 |

- UNKNOWN: previous C1 13/20; repair C1 12/20.
- Previous C1 errors corrected: 15; new errors introduced relative to previous C1: 0.
- Repair C1 vs fixed C0: corrections 0; regressions 5.
- Exact McNemar previous C1 vs repair: b=15, c=0, p=0.000061.
- Exact McNemar fixed C0 vs repair: b=0, c=5, p=0.062500.

## Formal review dispositions

- UPGRADE: 6
- DOWNGRADE: 1
- RETAIN: 9
- INCONCLUSIVE: 4
