# Single full-corpus evaluation

This is the verified full-corpus paired evaluation of the formalization-guided auditing package.
- Instances: 372; patterns: 62
- Both arms: aligned vision + DOM + semantic text; C1 adds compact formula cards.
- No counterexamples were added.

## Aggregate metrics

| Metric | C0 | C1 |
|---|---:|---:|
| tp | 147 | 125 |
| fp | 69 | 48 |
| tn | 117 | 138 |
| fn | 39 | 61 |
| precision | 0.6806 | 0.7225 |
| recall | 0.7903 | 0.6720 |
| f1 | 0.7313 | 0.6964 |
| accuracy | 0.7097 | 0.7070 |
| kappa | 0.4194 | 0.4140 |

UNKNOWN records: C0 0/372; C1 39/372.

## Paired analysis

- McNemar b=68, c=69, n=137, exact two-sided p=1.000000.
- Paired bootstrap F1 delta (C1-C0): [-0.0973, 0.0271].
- Paired bootstrap accuracy delta (C1-C0): [-0.0645, 0.0591].
- The paired analysis is bounded to this model, corpus, evidence package, and protocol.

## Per-pattern F1

| Pattern | C0 | C1 |
|---|---:|---:|
| activity-messages | 0.6667 | 0.6667 |
| addictive-design | 0.5714 | 0.8571 |
| address-book-leeching | 0.5714 | 0.6667 |
| auto-play | 0.8571 | 0.5714 |
| automatic-accept-third-party-term | 0.5714 | 0.4000 |
| automating-the-user-away | 0.5714 | 0.4000 |
| bad-defaults-preselection | 1.0000 | 1.0000 |
| bundling | 0.5000 | 0.6667 |
| choice-overload | 0.4000 | 0.4000 |
| complex-language | 1.0000 | 1.0000 |
| confirmshaming | 0.8571 | 0.8000 |
| conflicting-information | 0.8000 | 0.5000 |
| countdown-on-ads | 0.5714 | 1.0000 |
| countdown-timer | 0.8571 | 0.7500 |
| customisation | 0.8571 | 0.6667 |
| cuteness | 1.0000 | 0.8571 |
| dead-end | 0.7500 | 0.8000 |
| disguised-ad | 0.6667 | 0.6667 |
| drip-pricing | 1.0000 | 0.8571 |
| encouraging-anti-social-behavior | 0.6667 | 0.8000 |
| endorsement-and-testimonials | 0.6667 | 1.0000 |
| false-hierarchy | 0.6667 | 0.5000 |
| fear-of-missing-out-fomo | 0.8571 | 0.8571 |
| feedforward-ambiguity | 0.6667 | 0.4000 |
| forced-continuity | 0.6667 | 0.0000 |
| forced-grace-period | 0.5000 | 0.6667 |
| forced-registration | 1.0000 | 0.5000 |
| friend-spam | 0.8000 | 0.5000 |
| granting-and-interaction | 0.6667 | 1.0000 |
| grinding | 0.6667 | 0.8000 |
| hidden-information | 0.8571 | 0.8571 |
| high-demand | 0.8571 | 0.7500 |
| immortal-accounts | 0.6667 | 0.6667 |
| infinite-scrolling | 0.8571 | 0.8571 |
| information-without-context | 0.6667 | 0.4000 |
| intermediate-currency | 0.5714 | 0.5000 |
| labyrinthine-navigation | 0.4000 | 1.0000 |
| limited-time-message | 0.6667 | 0.4000 |
| low-stock | 1.0000 | 0.6667 |
| parasocial-pressure | 0.6667 | 1.0000 |
| pay-to-avoid | 0.7500 | 0.6667 |
| pay-to-play | 0.8000 | 0.8000 |
| persuasive-language | 0.6667 | 0.5000 |
| plain-evil | 0.7500 | 0.8000 |
| playing-by-appointment | 0.8571 | 1.0000 |
| positive-or-negative-framing | 0.5714 | 1.0000 |
| pre-delivered-content | 1.0000 | 0.8571 |
| pressured-selling | 0.8000 | 0.3333 |
| price-comparison-prevention | 0.8000 | 0.4000 |
| privacy-maze | 0.8571 | 0.5714 |
| privacy-zuckering | 0.7500 | 0.5714 |
| psychological-tricks | 1.0000 | 1.0000 |
| pull-to-refresh | 0.8000 | 0.8000 |
| reduced-friction | 0.4000 | 0.0000 |
| reference-pricing | 0.5714 | 0.6667 |
| small-or-moving-close-button | 0.8571 | 0.8000 |
| sneak-into-basket | 0.7500 | 0.6667 |
| social-pyramid | 0.6667 | 0.0000 |
| trick-questions | 0.3333 | 0.4000 |
| visual-prominence | 1.0000 | 0.8571 |
| watch-ads-to-unlock-features | 0.5714 | 0.7500 |
| wrong-language | 0.6667 | 0.6667 |
