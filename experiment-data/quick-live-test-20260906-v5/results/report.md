# Quick live isolated-demo ablation — quick-live-test-20260906-v5

- 20 live tasks, 10 patterns, 3 agents per arm.
- UNKNOWN is abstention; covered metrics exclude UNKNOWN.

| Output | N | UNKNOWN | Coverage | Accuracy | Precision | Recall | F1 |
|---|---:|---:|---:|---:|---:|---:|---:|
| c0_model | 20 | 1 | 0.950 | 0.947 | 1.000 | 0.889 | 0.941 |
| c1_model | 20 | 6 | 0.700 | 0.857 | 0.800 | 0.800 | 0.800 |
| c1_ledger | 20 | 6 | 0.700 | 0.786 | 1.000 | 0.500 | 0.667 |
| c1_aggregate | 20 | 8 | 0.600 | 0.917 | 1.000 | 0.750 | 0.857 |
| c2_model | 20 | 7 | 0.650 | 0.846 | 1.000 | 0.750 | 0.857 |
| c2_ledger | 20 | 7 | 0.650 | 0.846 | 1.000 | 0.750 | 0.857 |
| c2_aggregate | 20 | 7 | 0.650 | 0.846 | 1.000 | 0.750 | 0.857 |

## Routing

- C1 all-card availability: 20/20.
- C2 target screen: {'MATCH': 18, 'NO_MATCH': 2}.
- C2 target screen recall (`MATCH` or `UNKNOWN`): 0.900.
- C2 target card-selection recall: 1.000.

## Factor interpretation

- C0→C1 ledger: formal reasoning with all ten current cards.
- C1→C2 ledger: routing-screen effect; selection is recall-first.
- C1/C2 ledger→aggregate: agreement-gated aggregation; disagreement abstains.
