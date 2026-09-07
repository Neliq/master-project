# Full binary aided-vs-not-aided test — full-binary-aided-indexed-v3-20260906-gpt54mini

- Runtime: gpt-5.4-mini / openai-codex / service tier fast / reasoning minimal.
- 372 distinct interfaces: 62 patterns × 3 conditions × 2 variants.
- 744 total audit rows across exactly two arms.
- Both arms are binary-only; aided rules are context-gated, candidate-shortlisted, and support-only.

| Output | N | Accuracy | Precision | Recall | F1 | TP | FP | TN | FN |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| not-aided | 372 | 0.685 | 0.712 | 0.624 | 0.665 | 116 | 47 | 139 | 70 |
| aided | 372 | 0.699 | 0.761 | 0.581 | 0.659 | 108 | 34 | 152 | 78 |
| aided_base | 372 | 0.696 | 0.759 | 0.575 | 0.654 | 107 | 34 | 152 | 79 |

- Aided internal harmful changes (formal layer: correct base → incorrect final): 0.
- Aided internal helpful changes (formal layer: incorrect base → correct final): 1.
- Direct formal support cases: 38.
- Final aided correct changes versus not-aided: 47.
- Final aided regressions versus not-aided: 42.
- Formal layer non-degrading versus aided base: YES.
- Not-aided versus aided final-label flips: 89.

## Accuracy by condition

| Condition | Not aided | Aided base | Aided final |
|---:|---:|---:|---:|
| 1 | 86/124 | 86/124 | 86/124 |
| 2 | 77/124 | 81/124 | 82/124 |
| 3 | 92/124 | 92/124 | 92/124 |

## Accuracy by pattern

| Pattern | Not aided | Aided base | Aided final |
|---|---:|---:|---:|
| activity-messages | 5/6 | 4/6 | 4/6 |
| addictive-design | 6/6 | 5/6 | 5/6 |
| address-book-leeching | 4/6 | 4/6 | 4/6 |
| auto-play | 4/6 | 4/6 | 4/6 |
| automatic-accept-third-party-term | 6/6 | 5/6 | 5/6 |
| automating-the-user-away | 3/6 | 4/6 | 4/6 |
| bad-defaults-preselection | 4/6 | 3/6 | 3/6 |
| bundling | 3/6 | 3/6 | 3/6 |
| choice-overload | 2/6 | 5/6 | 5/6 |
| complex-language | 6/6 | 5/6 | 5/6 |
| confirmshaming | 4/6 | 2/6 | 3/6 |
| conflicting-information | 5/6 | 5/6 | 5/6 |
| countdown-on-ads | 3/6 | 3/6 | 3/6 |
| countdown-timer | 5/6 | 4/6 | 4/6 |
| customisation | 6/6 | 5/6 | 5/6 |
| cuteness | 4/6 | 3/6 | 3/6 |
| dead-end | 5/6 | 4/6 | 4/6 |
| disguised-ad | 4/6 | 4/6 | 4/6 |
| drip-pricing | 1/6 | 3/6 | 3/6 |
| encouraging-anti-social-behavior | 4/6 | 4/6 | 4/6 |
| endorsement-and-testimonials | 6/6 | 6/6 | 6/6 |
| false-hierarchy | 4/6 | 4/6 | 4/6 |
| fear-of-missing-out-fomo | 5/6 | 6/6 | 6/6 |
| feedforward-ambiguity | 3/6 | 3/6 | 3/6 |
| forced-continuity | 4/6 | 2/6 | 2/6 |
| forced-grace-period | 3/6 | 4/6 | 4/6 |
| forced-registration | 4/6 | 5/6 | 5/6 |
| friend-spam | 4/6 | 4/6 | 4/6 |
| granting-and-interaction | 3/6 | 4/6 | 4/6 |
| grinding | 4/6 | 4/6 | 4/6 |
| hidden-information | 0/6 | 3/6 | 3/6 |
| high-demand | 3/6 | 2/6 | 2/6 |
| immortal-accounts | 3/6 | 2/6 | 2/6 |
| infinite-scrolling | 5/6 | 6/6 | 6/6 |
| information-without-context | 3/6 | 3/6 | 3/6 |
| intermediate-currency | 3/6 | 3/6 | 3/6 |
| labyrinthine-navigation | 4/6 | 4/6 | 4/6 |
| limited-time-message | 5/6 | 3/6 | 3/6 |
| low-stock | 4/6 | 6/6 | 6/6 |
| parasocial-pressure | 6/6 | 6/6 | 6/6 |
| pay-to-avoid | 5/6 | 6/6 | 6/6 |
| pay-to-play | 5/6 | 5/6 | 5/6 |
| persuasive-language | 4/6 | 5/6 | 5/6 |
| plain-evil | 4/6 | 3/6 | 3/6 |
| playing-by-appointment | 5/6 | 6/6 | 6/6 |
| positive-or-negative-framing | 4/6 | 4/6 | 4/6 |
| pre-delivered-content | 5/6 | 4/6 | 4/6 |
| pressured-selling | 5/6 | 5/6 | 5/6 |
| price-comparison-prevention | 4/6 | 4/6 | 4/6 |
| privacy-maze | 5/6 | 5/6 | 5/6 |
| privacy-zuckering | 4/6 | 4/6 | 4/6 |
| psychological-tricks | 2/6 | 5/6 | 5/6 |
| pull-to-refresh | 4/6 | 4/6 | 4/6 |
| reduced-friction | 3/6 | 3/6 | 3/6 |
| reference-pricing | 5/6 | 5/6 | 5/6 |
| small-or-moving-close-button | 5/6 | 6/6 | 6/6 |
| sneak-into-basket | 3/6 | 3/6 | 3/6 |
| social-pyramid | 6/6 | 5/6 | 5/6 |
| trick-questions | 4/6 | 5/6 | 5/6 |
| visual-prominence | 4/6 | 5/6 | 5/6 |
| watch-ads-to-unlock-features | 5/6 | 4/6 | 4/6 |
| wrong-language | 4/6 | 4/6 | 4/6 |
