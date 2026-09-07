# Full binary aided-vs-not-aided test — full-binary-aided-metadata-safe-v6-20260906-gpt54mini

- Runtime: gpt-5.4-mini / openai-codex / service tier fast / reasoning minimal.
- 372 distinct interfaces: 62 patterns × 3 conditions × 2 variants.
- 744 total audit rows across exactly two arms.
- Both arms are binary-only; aided rules are context-gated, candidate-shortlisted, and support-only.

| Output | N | Accuracy | Precision | Recall | F1 | TP | FP | TN | FN |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| not-aided | 372 | 0.653 | 0.636 | 0.715 | 0.673 | 133 | 76 | 110 | 53 |
| aided | 372 | 0.616 | 0.597 | 0.710 | 0.649 | 132 | 89 | 97 | 54 |
| aided_base | 372 | 0.616 | 0.597 | 0.710 | 0.649 | 132 | 89 | 97 | 54 |

- Aided internal harmful changes (formal layer: correct base → incorrect final): 0.
- Aided internal helpful changes (formal layer: incorrect base → correct final): 0.
- Direct formal support cases: 0.
- Final aided correct changes versus not-aided: 54.
- Final aided regressions versus not-aided: 68.
- Formal layer non-degrading versus aided base: YES.
- Not-aided versus aided final-label flips: 122.

## Accuracy by condition

| Condition | Not aided | Aided base | Aided final |
|---:|---:|---:|---:|
| 1 | 81/124 | 72/124 | 72/124 |
| 2 | 83/124 | 79/124 | 79/124 |
| 3 | 79/124 | 78/124 | 78/124 |

## Accuracy by pattern

| Pattern | Not aided | Aided base | Aided final |
|---|---:|---:|---:|
| activity-messages | 4/6 | 4/6 | 4/6 |
| addictive-design | 3/6 | 5/6 | 5/6 |
| address-book-leeching | 5/6 | 3/6 | 3/6 |
| auto-play | 2/6 | 1/6 | 1/6 |
| automatic-accept-third-party-term | 4/6 | 3/6 | 3/6 |
| automating-the-user-away | 4/6 | 3/6 | 3/6 |
| bad-defaults-preselection | 4/6 | 4/6 | 4/6 |
| bundling | 4/6 | 3/6 | 3/6 |
| choice-overload | 4/6 | 4/6 | 4/6 |
| complex-language | 5/6 | 4/6 | 4/6 |
| confirmshaming | 5/6 | 4/6 | 4/6 |
| conflicting-information | 5/6 | 5/6 | 5/6 |
| countdown-on-ads | 4/6 | 2/6 | 2/6 |
| countdown-timer | 5/6 | 3/6 | 3/6 |
| customisation | 4/6 | 4/6 | 4/6 |
| cuteness | 6/6 | 3/6 | 3/6 |
| dead-end | 3/6 | 5/6 | 5/6 |
| disguised-ad | 5/6 | 4/6 | 4/6 |
| drip-pricing | 2/6 | 1/6 | 1/6 |
| encouraging-anti-social-behavior | 4/6 | 3/6 | 3/6 |
| endorsement-and-testimonials | 5/6 | 5/6 | 5/6 |
| false-hierarchy | 4/6 | 4/6 | 4/6 |
| fear-of-missing-out-fomo | 5/6 | 4/6 | 4/6 |
| feedforward-ambiguity | 2/6 | 4/6 | 4/6 |
| forced-continuity | 3/6 | 1/6 | 1/6 |
| forced-grace-period | 4/6 | 3/6 | 3/6 |
| forced-registration | 2/6 | 3/6 | 3/6 |
| friend-spam | 5/6 | 5/6 | 5/6 |
| granting-and-interaction | 4/6 | 3/6 | 3/6 |
| grinding | 5/6 | 4/6 | 4/6 |
| hidden-information | 3/6 | 1/6 | 1/6 |
| high-demand | 3/6 | 4/6 | 4/6 |
| immortal-accounts | 2/6 | 4/6 | 4/6 |
| infinite-scrolling | 4/6 | 6/6 | 6/6 |
| information-without-context | 2/6 | 2/6 | 2/6 |
| intermediate-currency | 3/6 | 4/6 | 4/6 |
| labyrinthine-navigation | 5/6 | 3/6 | 3/6 |
| limited-time-message | 4/6 | 3/6 | 3/6 |
| low-stock | 6/6 | 2/6 | 2/6 |
| parasocial-pressure | 5/6 | 3/6 | 3/6 |
| pay-to-avoid | 5/6 | 4/6 | 4/6 |
| pay-to-play | 4/6 | 5/6 | 5/6 |
| persuasive-language | 3/6 | 3/6 | 3/6 |
| plain-evil | 5/6 | 5/6 | 5/6 |
| playing-by-appointment | 6/6 | 5/6 | 5/6 |
| positive-or-negative-framing | 3/6 | 4/6 | 4/6 |
| pre-delivered-content | 5/6 | 5/6 | 5/6 |
| pressured-selling | 5/6 | 5/6 | 5/6 |
| price-comparison-prevention | 4/6 | 6/6 | 6/6 |
| privacy-maze | 5/6 | 4/6 | 4/6 |
| privacy-zuckering | 3/6 | 4/6 | 4/6 |
| psychological-tricks | 3/6 | 4/6 | 4/6 |
| pull-to-refresh | 4/6 | 4/6 | 4/6 |
| reduced-friction | 4/6 | 3/6 | 3/6 |
| reference-pricing | 5/6 | 6/6 | 6/6 |
| small-or-moving-close-button | 3/6 | 6/6 | 6/6 |
| sneak-into-basket | 3/6 | 2/6 | 2/6 |
| social-pyramid | 4/6 | 6/6 | 6/6 |
| trick-questions | 2/6 | 4/6 | 4/6 |
| visual-prominence | 5/6 | 3/6 | 3/6 |
| watch-ads-to-unlock-features | 2/6 | 2/6 | 2/6 |
| wrong-language | 2/6 | 3/6 | 3/6 |
