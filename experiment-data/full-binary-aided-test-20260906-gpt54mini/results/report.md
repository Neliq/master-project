# Full binary aided-vs-not-aided test — full-binary-aided-test-20260906-gpt54mini

- Runtime: gpt-5.4-mini / openai-codex / service tier fast / reasoning minimal.
- 372 distinct interfaces: 62 patterns × 3 conditions × 2 variants.
- 744 total audit rows across exactly two arms.
- Both arms are binary-only; aided rules are context-gated, candidate-shortlisted, and support-only.

| Output | N | Accuracy | Precision | Recall | F1 | TP | FP | TN | FN |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| not-aided | 372 | 0.594 | 0.598 | 0.575 | 0.586 | 107 | 72 | 114 | 79 |
| aided | 372 | 0.621 | 0.636 | 0.565 | 0.598 | 105 | 60 | 126 | 81 |
| aided_base | 372 | 0.621 | 0.636 | 0.565 | 0.598 | 105 | 60 | 126 | 81 |

- Aided internal harmful changes (formal layer: correct base → incorrect final): 0.
- Aided internal helpful changes (formal layer: incorrect base → correct final): 0.
- Direct formal support cases: 54.
- Final aided correct changes versus not-aided: 73.
- Final aided regressions versus not-aided: 63.
- Formal layer non-degrading versus aided base: YES.
- Not-aided versus aided final-label flips: 136.

## Accuracy by condition

| Condition | Not aided | Aided base | Aided final |
|---:|---:|---:|---:|
| 1 | 76/124 | 77/124 | 77/124 |
| 2 | 71/124 | 73/124 | 73/124 |
| 3 | 74/124 | 81/124 | 81/124 |

## Accuracy by pattern

| Pattern | Not aided | Aided base | Aided final |
|---|---:|---:|---:|
| activity-messages | 4/6 | 3/6 | 3/6 |
| addictive-design | 3/6 | 3/6 | 3/6 |
| address-book-leeching | 5/6 | 5/6 | 5/6 |
| auto-play | 3/6 | 2/6 | 2/6 |
| automatic-accept-third-party-term | 3/6 | 4/6 | 4/6 |
| automating-the-user-away | 2/6 | 3/6 | 3/6 |
| bad-defaults-preselection | 4/6 | 4/6 | 4/6 |
| bundling | 3/6 | 5/6 | 5/6 |
| choice-overload | 4/6 | 2/6 | 2/6 |
| complex-language | 3/6 | 5/6 | 5/6 |
| confirmshaming | 3/6 | 3/6 | 3/6 |
| conflicting-information | 6/6 | 3/6 | 3/6 |
| countdown-on-ads | 3/6 | 4/6 | 4/6 |
| countdown-timer | 2/6 | 3/6 | 3/6 |
| customisation | 4/6 | 4/6 | 4/6 |
| cuteness | 5/6 | 4/6 | 4/6 |
| dead-end | 4/6 | 4/6 | 4/6 |
| disguised-ad | 3/6 | 3/6 | 3/6 |
| drip-pricing | 2/6 | 3/6 | 3/6 |
| encouraging-anti-social-behavior | 4/6 | 5/6 | 5/6 |
| endorsement-and-testimonials | 4/6 | 5/6 | 5/6 |
| false-hierarchy | 4/6 | 5/6 | 5/6 |
| fear-of-missing-out-fomo | 4/6 | 5/6 | 5/6 |
| feedforward-ambiguity | 4/6 | 6/6 | 6/6 |
| forced-continuity | 4/6 | 2/6 | 2/6 |
| forced-grace-period | 2/6 | 3/6 | 3/6 |
| forced-registration | 4/6 | 4/6 | 4/6 |
| friend-spam | 4/6 | 4/6 | 4/6 |
| granting-and-interaction | 4/6 | 5/6 | 5/6 |
| grinding | 2/6 | 5/6 | 5/6 |
| hidden-information | 3/6 | 3/6 | 3/6 |
| high-demand | 3/6 | 3/6 | 3/6 |
| immortal-accounts | 3/6 | 4/6 | 4/6 |
| infinite-scrolling | 4/6 | 1/6 | 1/6 |
| information-without-context | 3/6 | 2/6 | 2/6 |
| intermediate-currency | 5/6 | 2/6 | 2/6 |
| labyrinthine-navigation | 4/6 | 2/6 | 2/6 |
| limited-time-message | 3/6 | 3/6 | 3/6 |
| low-stock | 3/6 | 4/6 | 4/6 |
| parasocial-pressure | 4/6 | 6/6 | 6/6 |
| pay-to-avoid | 3/6 | 6/6 | 6/6 |
| pay-to-play | 4/6 | 3/6 | 3/6 |
| persuasive-language | 3/6 | 3/6 | 3/6 |
| plain-evil | 5/6 | 4/6 | 4/6 |
| playing-by-appointment | 4/6 | 4/6 | 4/6 |
| positive-or-negative-framing | 4/6 | 2/6 | 2/6 |
| pre-delivered-content | 4/6 | 4/6 | 4/6 |
| pressured-selling | 4/6 | 5/6 | 5/6 |
| price-comparison-prevention | 4/6 | 6/6 | 6/6 |
| privacy-maze | 6/6 | 3/6 | 3/6 |
| privacy-zuckering | 3/6 | 4/6 | 4/6 |
| psychological-tricks | 3/6 | 4/6 | 4/6 |
| pull-to-refresh | 4/6 | 2/6 | 2/6 |
| reduced-friction | 3/6 | 2/6 | 2/6 |
| reference-pricing | 4/6 | 5/6 | 5/6 |
| small-or-moving-close-button | 4/6 | 4/6 | 4/6 |
| sneak-into-basket | 3/6 | 2/6 | 2/6 |
| social-pyramid | 5/6 | 6/6 | 6/6 |
| trick-questions | 2/6 | 3/6 | 3/6 |
| visual-prominence | 4/6 | 4/6 | 4/6 |
| watch-ads-to-unlock-features | 3/6 | 5/6 | 5/6 |
| wrong-language | 1/6 | 4/6 | 4/6 |
