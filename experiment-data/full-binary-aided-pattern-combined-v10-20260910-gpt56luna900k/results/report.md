# Full binary aided-vs-not-aided combined aggregate — full-binary-aided-pattern-combined-v10-20260910-gpt56luna900k

This additive aggregate copies the original completed raw observations and appends the validated extension raw observations; all reported metrics are derived from those copied rows and construction-defined truth.
- 384 distinct interfaces: 64 patterns × 3 conditions × 2 variants.
- 768 total audit rows across exactly two arms.
- Both arms are binary-only; aided rules are context-gated, candidate-shortlisted, and support-only.
- Original source observations: 372 interfaces / 744 audit rows; extension source observations: 12 interfaces / 24 audit rows.

| Output | N | Accuracy | Precision | Recall | F1 | TP | FP | TN | FN |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| not-aided | 384 | 0.693 | 0.693 | 0.693 | 0.693 | 133 | 59 | 133 | 59 |
| aided | 384 | 0.755 | 0.761 | 0.745 | 0.753 | 143 | 45 | 147 | 49 |
| aided_base | 384 | 0.755 | 0.761 | 0.745 | 0.753 | 143 | 45 | 147 | 49 |

- Aided internal harmful changes (formal layer: correct base → incorrect final): 0.
- Aided internal helpful changes (formal layer: incorrect base → correct final): 0.
- Direct formal support cases: 61.
- Final aided correct changes versus not-aided: 78.
- Final aided regressions versus not-aided: 54.
- Formal layer non-degrading versus aided base: YES.
- Not-aided versus aided final-label flips: 132.

## Accuracy by condition

| Condition | Not aided | Aided base | Aided final |
|---:|---:|---:|---:|
| 1 | 87/128 | 99/128 | 99/128 |
| 2 | 88/128 | 97/128 | 97/128 |
| 3 | 91/128 | 94/128 | 94/128 |

## Accuracy by pattern

| Pattern | Not aided | Aided base | Aided final |
|---|---:|---:|---:|
| activity-messages | 5/6 | 5/6 | 5/6 |
| addictive-design | 5/6 | 5/6 | 5/6 |
| address-book-leeching | 5/6 | 5/6 | 5/6 |
| auto-play | 6/6 | 4/6 | 4/6 |
| automatic-accept-third-party-term | 6/6 | 6/6 | 6/6 |
| automating-the-user-away | 3/6 | 3/6 | 3/6 |
| bad-defaults-preselection | 4/6 | 3/6 | 3/6 |
| bundling | 1/6 | 4/6 | 4/6 |
| choice-overload | 3/6 | 4/6 | 4/6 |
| complex-language | 6/6 | 6/6 | 6/6 |
| confirmshaming | 3/6 | 4/6 | 4/6 |
| conflicting-information | 4/6 | 4/6 | 4/6 |
| countdown-on-ads | 4/6 | 6/6 | 6/6 |
| countdown-timer | 2/6 | 5/6 | 5/6 |
| customisation | 4/6 | 5/6 | 5/6 |
| cuteness | 4/6 | 5/6 | 5/6 |
| dead-end | 3/6 | 4/6 | 4/6 |
| disguised-ad | 5/6 | 4/6 | 4/6 |
| drip-pricing | 5/6 | 4/6 | 4/6 |
| encouraging-anti-social-behavior | 3/6 | 5/6 | 5/6 |
| endorsement-and-testimonials | 6/6 | 5/6 | 5/6 |
| false-hierarchy | 4/6 | 4/6 | 4/6 |
| fear-of-missing-out-fomo | 5/6 | 5/6 | 5/6 |
| feedforward-ambiguity | 3/6 | 3/6 | 3/6 |
| forced-continuity | 5/6 | 2/6 | 2/6 |
| forced-grace-period | 5/6 | 3/6 | 3/6 |
| forced-registration | 5/6 | 5/6 | 5/6 |
| friend-spam | 4/6 | 5/6 | 5/6 |
| games-for-other-purposes | 6/6 | 6/6 | 6/6 |
| granting-and-interaction | 4/6 | 6/6 | 6/6 |
| grinding | 5/6 | 5/6 | 5/6 |
| hidden-information | 2/6 | 4/6 | 4/6 |
| high-demand | 3/6 | 4/6 | 4/6 |
| immortal-accounts | 2/6 | 3/6 | 3/6 |
| infinite-scrolling | 6/6 | 6/6 | 6/6 |
| information-without-context | 2/6 | 6/6 | 6/6 |
| intermediate-currency | 3/6 | 4/6 | 4/6 |
| labyrinthine-navigation | 3/6 | 4/6 | 4/6 |
| limited-time-message | 4/6 | 5/6 | 5/6 |
| low-stock | 4/6 | 5/6 | 5/6 |
| nagging | 5/6 | 5/6 | 5/6 |
| parasocial-pressure | 4/6 | 6/6 | 6/6 |
| pay-to-avoid | 5/6 | 5/6 | 5/6 |
| pay-to-play | 4/6 | 3/6 | 3/6 |
| persuasive-language | 5/6 | 4/6 | 4/6 |
| plain-evil | 5/6 | 3/6 | 3/6 |
| playing-by-appointment | 5/6 | 5/6 | 5/6 |
| positive-or-negative-framing | 3/6 | 4/6 | 4/6 |
| pre-delivered-content | 6/6 | 5/6 | 5/6 |
| pressured-selling | 6/6 | 5/6 | 5/6 |
| price-comparison-prevention | 4/6 | 5/6 | 5/6 |
| privacy-maze | 5/6 | 4/6 | 4/6 |
| privacy-zuckering | 4/6 | 5/6 | 5/6 |
| psychological-tricks | 3/6 | 5/6 | 5/6 |
| pull-to-refresh | 2/6 | 4/6 | 4/6 |
| reduced-friction | 4/6 | 4/6 | 4/6 |
| reference-pricing | 6/6 | 6/6 | 6/6 |
| small-or-moving-close-button | 5/6 | 6/6 | 6/6 |
| sneak-into-basket | 3/6 | 4/6 | 4/6 |
| social-pyramid | 3/6 | 6/6 | 6/6 |
| trick-questions | 4/6 | 3/6 | 3/6 |
| visual-prominence | 5/6 | 4/6 | 4/6 |
| watch-ads-to-unlock-features | 5/6 | 4/6 | 4/6 |
| wrong-language | 3/6 | 4/6 | 4/6 |
