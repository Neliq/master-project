# Run 7 development pilot

This is a bounded development pilot, not a confirmatory significance test.
- Instances: 72; patterns: 12
- Both arms: aligned vision + DOM + semantic text; C1 adds compact formula cards.
- No counterexamples were added.

## Aggregate metrics

| Metric | C0 | C1 |
|---|---:|---:|
| tp | 30 | 25 |
| fp | 5 | 5 |
| tn | 31 | 31 |
| fn | 6 | 11 |
| precision | 0.8571 | 0.8333 |
| recall | 0.8333 | 0.6944 |
| f1 | 0.8451 | 0.7576 |
| accuracy | 0.8472 | 0.7778 |
| kappa | 0.6944 | 0.5556 |

UNKNOWN records: C0 1/72; C1 10/72.

## Paired pilot diagnostic

- McNemar b=8, c=13, n=21, exact two-sided p=0.383310.
- Paired bootstrap F1 delta (C1-C0): [-0.2335, 0.0517].
- Paired bootstrap accuracy delta (C1-C0): [-0.1944, 0.0556].
- These pilot statistics are directional diagnostics only; protocol changes must stop before held-out evaluation.

## Per-pattern F1

| Pattern | C0 | C1 |
|---|---:|---:|
| activity-messages | 0.6667 | 0.6667 |
| automating-the-user-away | 0.8000 | 0.6667 |
| conflicting-information | 0.8571 | 0.5000 |
| false-hierarchy | 0.8571 | 0.8000 |
| forced-continuity | 0.8000 | 0.8000 |
| granting-and-interaction | 1.0000 | 0.4000 |
| hidden-information | 0.8571 | 0.6667 |
| information-without-context | 0.6667 | 0.6667 |
| intermediate-currency | 1.0000 | 1.0000 |
| plain-evil | 1.0000 | 0.8000 |
| pressured-selling | 0.8000 | 1.0000 |
| trick-questions | 0.8000 | 1.0000 |
