# Quick live isolated-demo ablation — quick-live-test-20260906-v4

- 20 live tasks, 10 patterns, 3 agents per arm.
- UNKNOWN is abstention; covered metrics exclude UNKNOWN.

| Output | N | UNKNOWN | Coverage | Accuracy | Precision | Recall | F1 |
|---|---:|---:|---:|---:|---:|---:|---:|
| c0_model | 20 | 1 | 0.950 | 0.947 | 1.000 | 0.889 | 0.941 |
| c1_model | 20 | 6 | 0.700 | 0.714 | 0.700 | 0.875 | 0.778 |
| c1_ledger | 20 | 7 | 0.650 | 0.692 | 0.700 | 0.875 | 0.778 |
| c2_model | 20 | 17 | 0.150 | 1.000 | 1.000 | 1.000 | 1.000 |
| c2_ledger | 20 | 5 | 0.750 | 0.733 | 0.667 | 0.857 | 0.750 |

## Routing

- C1 all-card availability: 20/20.
- C2 target screen: {'MATCH': 16, 'UNKNOWN': 2, 'NO_MATCH': 2}.
- C2 target screen recall (`MATCH` or `UNKNOWN`): 0.900.
- C2 target card-selection recall: 1.000.

## Factor interpretation

- C0→C1 ledger: formal reasoning with all ten current cards.
- C1→C2 ledger: routing-screen effect; selection is recall-first.
- C1/C2 model→ledger: aggregation effect.
