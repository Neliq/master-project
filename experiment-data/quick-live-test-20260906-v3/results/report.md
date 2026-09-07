# Quick live isolated-demo ablation — quick-live-test-20260906-v3

- 20 live tasks, 10 patterns, 3 agents per arm.
- UNKNOWN is abstention; covered metrics exclude UNKNOWN.

| Output | N | UNKNOWN | Coverage | Accuracy | Precision | Recall | F1 |
|---|---:|---:|---:|---:|---:|---:|---:|
| c0_model | 20 | 0 | 1.000 | 0.950 | 1.000 | 0.900 | 0.947 |
| c1_model | 20 | 12 | 0.400 | 0.875 | 0.833 | 1.000 | 0.909 |
| c1_ledger | 20 | 10 | 0.500 | 0.700 | 0.700 | 1.000 | 0.824 |
| c2_model | 20 | 13 | 0.350 | 1.000 | 1.000 | 1.000 | 1.000 |
| c2_ledger | 20 | 10 | 0.500 | 0.900 | 0.800 | 1.000 | 0.889 |

## Routing

- C1 all-card availability: 20/20.
- C2 target screen: {'MATCH': 13, 'UNKNOWN': 4, 'NO_MATCH': 3}.
- C2 target selected: 17/20.
- C2 target recall (`MATCH` or `UNKNOWN`): 0.850.

## Factor interpretation

- C0→C1 ledger: formal reasoning with all ten current cards.
- C1→C2 ledger: routing effect and target-card recall.
- C1/C2 model→ledger: aggregation effect.
