# Run 7 development pilot

This is a bounded development pilot, not a confirmatory significance test.
- Instances: 72; patterns: 12
- Both arms: aligned vision + DOM + semantic text; C1 adds compact formula cards.
- No counterexamples were added.

## Aggregate metrics

| Metric | C0 | C1 |
|---|---:|---:|
| tp | 31 | 29 |
| fp | 6 | 4 |
| tn | 30 | 32 |
| fn | 5 | 7 |
| precision | 0.8378 | 0.8788 |
| recall | 0.8611 | 0.8056 |
| f1 | 0.8493 | 0.8406 |
| accuracy | 0.8472 | 0.8472 |
| kappa | 0.6944 | 0.6944 |

UNKNOWN records: C0 0/72; C1 25/72.

## Paired pilot diagnostic

- McNemar b=9, c=9, n=18, exact two-sided p=1.000000.
- Paired bootstrap F1 delta (C1-C0): [-0.1310, 0.1141].
- Paired bootstrap accuracy delta (C1-C0): [-0.1111, 0.1111].
- These pilot statistics are directional diagnostics only; protocol changes must stop before held-out evaluation.

## Per-pattern F1

| Pattern | C0 | C1 |
|---|---:|---:|
| activity-messages | 1.0000 | 1.0000 |
| automating-the-user-away | 0.8571 | 0.8571 |
| conflicting-information | 0.8571 | 0.8000 |
| false-hierarchy | 0.8000 | 1.0000 |
| forced-continuity | 0.6667 | 0.8000 |
| granting-and-interaction | 1.0000 | 0.6667 |
| hidden-information | 0.8571 | 0.0000 |
| information-without-context | 0.4000 | 0.7500 |
| intermediate-currency | 0.8571 | 1.0000 |
| plain-evil | 1.0000 | 0.8000 |
| pressured-selling | 1.0000 | 1.0000 |
| trick-questions | 0.8000 | 1.0000 |
