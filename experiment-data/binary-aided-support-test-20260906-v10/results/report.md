# Binary support-only aided-vs-not-aided test — binary-aided-support-test-20260906-v10

- Runtime: gpt-5.4-mini / openai-codex / service tier fast / reasoning minimal.
- 20 live tasks, 10 patterns, 3 agents per arm.
- Both arms are forced binary.
- Aided rules are context-gated, candidate-shortlisted, and support-only.

| Output | N | Accuracy | Precision | Recall | F1 | TP | FP | TN | FN |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| not-aided | 20 | 0.700 | 0.750 | 0.600 | 0.667 | 6 | 2 | 8 | 4 |
| aided | 20 | 0.850 | 0.818 | 0.900 | 0.857 | 9 | 2 | 8 | 1 |
| aided_base | 20 | 0.850 | 0.818 | 0.900 | 0.857 | 9 | 2 | 8 | 1 |

- Aided internal harmful changes (correct base → incorrect final): 0.
- Aided internal helpful changes (incorrect base → correct final): 0.
- Direct formal support cases: 4.
- Not-aided versus aided final-label flips: 5.
- Non-degrading on this sample: YES.

## Per-pattern final accuracy

| Pattern | Not aided | Aided base | Aided final |
|---|---:|---:|---:|
| addictive-design | 2/2 | 2/2 | 2/2 |
| confirmshaming | 1/2 | 1/2 | 1/2 |
| conflicting-information | 1/2 | 2/2 | 2/2 |
| cuteness | 2/2 | 2/2 | 2/2 |
| friend-spam | 1/2 | 1/2 | 1/2 |
| immortal-accounts | 1/2 | 2/2 | 2/2 |
| pay-to-avoid | 2/2 | 2/2 | 2/2 |
| persuasive-language | 1/2 | 1/2 | 1/2 |
| price-comparison-prevention | 2/2 | 2/2 | 2/2 |
| sneak-into-basket | 1/2 | 2/2 | 2/2 |
