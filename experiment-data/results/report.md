# Deceptive Design Sandbox — updated-Sandbox auditor rerun (run 5)

## Setup
- Corpus: 62 patterns x 3 condition layers x 2 variants = 372 interface instances
- Reference labels: construction-based Variant A = deceptive, Variant B = benign
- Auditor: ten fresh replicated runs, blind to variant identity and corpus mapping
- Condition 0: unaided baseline prompt
- Condition 1: formal specification plus application protocol
- Model: gpt-5.6-luna-900k via openai-codex (not the historical DeepSeek Run 4 model)
- Primary unit: paired instance; sensitivity clusters: pattern and auditor run

## Aggregate metrics (deceptive = positive; bootstrap 95% CI in brackets)

| Metric | Condition 0 | Condition 1 |
|---|---:|---:|
| True Positives | 159 | 155 |
| False Positives | 161 | 158 |
| True Negatives | 25 | 28 |
| False Negatives | 27 | 31 |
| Precision | 0.4969 [0.4431, 0.5538] | 0.4952 [0.4389, 0.5495] |
| Recall | 0.8548 [0.8021, 0.9034] | 0.8333 [0.7778, 0.8840] |
| F1 | 0.6285 [0.5774, 0.6780] | 0.6212 [0.5691, 0.6692] |
| Accuracy | 0.4946 [0.4435, 0.5457] | 0.4919 [0.4409, 0.5430] |
| Cohen's Kappa | -0.0108 [-0.0803, 0.0586] | -0.0161 [-0.0895, 0.0548] |

## McNemar's test (paired nominal data)

- b (C0 wrong, C1 right): 12
- c (C0 right, C1 wrong): 13
- n = b + c: 25
- chi^2 without continuity correction: 0.0400
- exact two-tailed binomial p: 1.000000
- paired bootstrap 95% CI for accuracy delta (C1-C0): [-0.0296, 0.0242]
- paired bootstrap 95% CI for F1 delta (C1-C0): [-0.0284, 0.0127]
- Interpretation: this is an instance-level nominal test of the complete intervention package; it is not an ontology-only causal estimate.

## Cluster sensitivity

| Cluster | Clusters with positive C1-C0 accuracy | Negative | Unchanged | Mean cluster delta | Bootstrap 95% CI |
|---|---:|---:|---:|---:|---:|
| pattern | 7 | 8 | 47 | -0.0027 | [-0.0242, 0.0188] |
| auditor_run | 3 | 3 | 4 | -0.0028 | [-0.0324, 0.0270] |

The instance bootstrap treats the paired instance as the primary unit. The cluster bootstrap resamples complete patterns or auditor runs and is reported as a sensitivity analysis because observations are repeated within both structures.

## Per-agent performance

| Agent | Arm | N | TP | FP | TN | FN | Accuracy | F1 |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| agent-01 | c0 | 38 | 16 | 18 | 1 | 3 | 0.447 | 0.604 |
| agent-01 | c1 | 38 | 14 | 16 | 3 | 5 | 0.447 | 0.571 |
| agent-02 | c0 | 37 | 18 | 15 | 3 | 1 | 0.568 | 0.692 |
| agent-02 | c1 | 37 | 17 | 14 | 4 | 2 | 0.568 | 0.680 |
| agent-03 | c0 | 37 | 15 | 15 | 3 | 4 | 0.486 | 0.612 |
| agent-03 | c1 | 37 | 15 | 15 | 3 | 4 | 0.486 | 0.612 |
| agent-04 | c0 | 37 | 12 | 16 | 2 | 7 | 0.378 | 0.511 |
| agent-04 | c1 | 37 | 14 | 15 | 3 | 5 | 0.459 | 0.583 |
| agent-05 | c0 | 37 | 17 | 14 | 4 | 2 | 0.568 | 0.680 |
| agent-05 | c1 | 37 | 16 | 15 | 3 | 3 | 0.514 | 0.640 |
| agent-06 | c0 | 38 | 19 | 17 | 2 | 0 | 0.553 | 0.691 |
| agent-06 | c1 | 38 | 18 | 15 | 4 | 1 | 0.579 | 0.692 |
| agent-07 | c0 | 37 | 16 | 17 | 2 | 2 | 0.486 | 0.627 |
| agent-07 | c1 | 37 | 16 | 17 | 2 | 2 | 0.486 | 0.627 |
| agent-08 | c0 | 37 | 15 | 17 | 2 | 3 | 0.459 | 0.600 |
| agent-08 | c1 | 37 | 13 | 18 | 1 | 5 | 0.378 | 0.531 |
| agent-09 | c0 | 37 | 17 | 14 | 5 | 1 | 0.595 | 0.694 |
| agent-09 | c1 | 37 | 16 | 15 | 4 | 2 | 0.541 | 0.653 |
| agent-10 | c0 | 37 | 14 | 18 | 1 | 4 | 0.405 | 0.560 |
| agent-10 | c1 | 37 | 16 | 18 | 1 | 2 | 0.459 | 0.615 |

## By condition layer

| Layer | F1 (C0) | F1 (C1) | Precision (C0) | Precision (C1) | Recall (C0) | Recall (C1) |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 0.6509 | 0.6391 | 0.5140 | 0.5047 | 0.8871 | 0.8710 |
| 2 | 0.6145 | 0.5926 | 0.4904 | 0.4800 | 0.8226 | 0.7742 |
| 3 | 0.6199 | 0.6310 | 0.4862 | 0.5000 | 0.8548 | 0.8548 |

## Per-pattern F1

| Pattern | F1 (C0) | F1 (C1) |
|---|---:|---:|
| activity-messages | 0.5000 | 0.5714 |
| addictive-design | 0.7500 | 0.7500 |
| address-book-leeching | 0.6667 | 0.6667 |
| auto-play | 0.6667 | 0.6667 |
| automatic-accept-third-party-term | 0.8571 | 0.7500 |
| automating-the-user-away | 0.5714 | 0.5714 |
| bad-defaults-preselection | 0.7500 | 0.6667 |
| bundling | 0.7500 | 0.7500 |
| choice-overload | 0.5714 | 0.5714 |
| complex-language | 0.6667 | 0.6667 |
| confirmshaming | 0.6667 | 0.6667 |
| conflicting-information | 0.6667 | 0.6667 |
| countdown-on-ads | 0.6667 | 0.6667 |
| countdown-timer | 0.6667 | 0.6667 |
| customisation | 0.6667 | 0.6667 |
| cuteness | 0.6667 | 0.6667 |
| dead-end | 0.6667 | 0.6667 |
| disguised-ad | 0.6667 | 0.6667 |
| drip-pricing | 0.6667 | 0.6667 |
| encouraging-anti-social-behavior | 0.6667 | 0.6667 |
| endorsement-and-testimonials | 0.6667 | 0.6667 |
| false-hierarchy | 0.5714 | 0.5714 |
| fear-of-missing-out-fomo | 0.7500 | 0.6667 |
| feedforward-ambiguity | 0.5714 | 0.5714 |
| forced-continuity | 0.5714 | 0.5714 |
| forced-grace-period | 0.6667 | 0.6667 |
| forced-registration | 0.6667 | 0.6667 |
| friend-spam | 0.5000 | 0.5000 |
| granting-and-interaction | 0.6667 | 0.6667 |
| grinding | 0.7500 | 0.5714 |
| hidden-information | 0.6667 | 0.6667 |
| high-demand | 0.7500 | 0.5714 |
| immortal-accounts | 0.5000 | 0.5000 |
| infinite-scrolling | 0.5000 | 0.5000 |
| information-without-context | 0.5714 | 0.6667 |
| intermediate-currency | 0.5000 | 0.6667 |
| labyrinthine-navigation | 0.0000 | 0.0000 |
| limited-time-message | 0.6667 | 0.5000 |
| low-stock | 0.5714 | 0.6667 |
| parasocial-pressure | 0.6667 | 0.5714 |
| pay-to-avoid | 0.5000 | 0.5000 |
| pay-to-play | 0.6667 | 0.6667 |
| persuasive-language | 0.6667 | 0.7500 |
| plain-evil | 0.5714 | 0.5714 |
| playing-by-appointment | 0.3333 | 0.3333 |
| positive-or-negative-framing | 0.6667 | 0.6667 |
| pre-delivered-content | 0.6667 | 0.6667 |
| pressured-selling | 0.6667 | 0.6667 |
| price-comparison-prevention | 0.5000 | 0.5000 |
| privacy-maze | 0.6667 | 0.6667 |
| privacy-zuckering | 0.7500 | 0.6667 |
| psychological-tricks | 0.3333 | 0.5714 |
| pull-to-refresh | 0.5714 | 0.4000 |
| reduced-friction | 0.6667 | 0.6667 |
| reference-pricing | 0.5714 | 0.6667 |
| small-or-moving-close-button | 0.7500 | 0.5714 |
| sneak-into-basket | 0.5000 | 0.5000 |
| social-pyramid | 0.4000 | 0.5714 |
| trick-questions | 0.7500 | 0.5714 |
| visual-prominence | 0.6667 | 0.6667 |
| watch-ads-to-unlock-features | 0.6667 | 0.6667 |
| wrong-language | 0.6667 | 0.6667 |
