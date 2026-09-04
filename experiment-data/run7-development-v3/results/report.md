# Run 7 development pilot

This is a bounded development pilot, not a confirmatory significance test.
- Instances: 72; patterns: 12
- Both arms: aligned vision + DOM + semantic text; C1 adds compact formula cards.
- No counterexamples were added.

## Aggregate metrics

| Metric | C0 | C1 |
|---|---:|---:|
| tp | 31 | 26 |
| fp | 8 | 6 |
| tn | 28 | 30 |
| fn | 5 | 10 |
| precision | 0.7949 | 0.8125 |
| recall | 0.8611 | 0.7222 |
| f1 | 0.8267 | 0.7647 |
| accuracy | 0.8194 | 0.7778 |
| kappa | 0.6389 | 0.5556 |

UNKNOWN records: C0 2/72; C1 15/72.

## Paired pilot diagnostic

- McNemar b=7, c=10, n=17, exact two-sided p=0.629059.
- Paired bootstrap F1 delta (C1-C0): [-0.1824, 0.0485].
- Paired bootstrap accuracy delta (C1-C0): [-0.1528, 0.0694].
- These pilot statistics are directional diagnostics only; protocol changes must stop before held-out evaluation.

## Per-pattern F1

| Pattern | C0 | C1 |
|---|---:|---:|
| activity-messages | 0.8571 | 0.8571 |
| automating-the-user-away | 0.8571 | 1.0000 |
| conflicting-information | 1.0000 | 0.6667 |
| false-hierarchy | 0.5000 | 0.5000 |
| forced-continuity | 0.8000 | 0.8571 |
| granting-and-interaction | 0.8571 | 0.8571 |
| hidden-information | 0.6667 | 0.5000 |
| information-without-context | 0.5714 | 0.5714 |
| intermediate-currency | 1.0000 | 0.8000 |
| plain-evil | 1.0000 | 0.8000 |
| pressured-selling | 0.8571 | 1.0000 |
| trick-questions | 0.8571 | 0.5000 |
