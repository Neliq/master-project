# Run 7 development pilot

This is a bounded development pilot, not a confirmatory significance test.
- Instances: 72; patterns: 12
- Both arms: aligned vision + DOM + semantic text; C1 adds compact formula cards.
- No counterexamples were added.

## Aggregate metrics

| Metric | C0 | C1 |
|---|---:|---:|
| tp | 28 | 12 |
| fp | 5 | 3 |
| tn | 31 | 33 |
| fn | 8 | 24 |
| precision | 0.8485 | 0.8000 |
| recall | 0.7778 | 0.3333 |
| f1 | 0.8116 | 0.4706 |
| accuracy | 0.8194 | 0.6250 |
| kappa | 0.6389 | 0.2500 |

UNKNOWN records: C0 0/72; C1 25/72.

## Paired pilot diagnostic

- McNemar b=6, c=20, n=26, exact two-sided p=0.009355.
- Paired bootstrap F1 delta (C1-C0): [-0.5383, -0.1608].
- Paired bootstrap accuracy delta (C1-C0): [-0.3333, -0.0694].
- These pilot statistics are directional diagnostics only; protocol changes must stop before held-out evaluation.

## Per-pattern F1

| Pattern | C0 | C1 |
|---|---:|---:|
| addictive-design | 0.8000 | 0.0000 |
| bundling | 0.8000 | 0.5000 |
| confirmshaming | 0.8571 | 0.8000 |
| cuteness | 0.8000 | 1.0000 |
| endorsement-and-testimonials | 1.0000 | 0.5000 |
| friend-spam | 0.5000 | 0.8000 |
| immortal-accounts | 0.5000 | 0.0000 |
| pay-to-avoid | 0.5714 | 0.0000 |
| persuasive-language | 1.0000 | 0.0000 |
| pre-delivered-content | 1.0000 | 0.5000 |
| price-comparison-prevention | 1.0000 | 0.5000 |
| sneak-into-basket | 0.7500 | 0.4000 |
