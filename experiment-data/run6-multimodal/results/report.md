# Deceptive Design Sandbox — multimodal formalization-isolation rerun (run 6)

## Setup
- Corpus: 62 patterns x 3 condition layers x 2 variants = 372 interface instances
- Reference labels: construction-based Variant A = deceptive, Variant B = benign
- Auditor: ten fresh replicated runs per arm, blind to variant identity and corpus mapping
- Condition 0: vision + DOM + semantic-text baseline
- Condition 1: the same three channels plus formal specification and application protocol
- Model: gpt-5.6-luna-900k via openai-codex (not the historical DeepSeek Run 4 model)
- Primary unit: paired instance; sensitivity clusters: pattern and auditor run

## Aggregate metrics (deceptive = positive; bootstrap 95% CI in brackets)

| Metric | Condition 0 | Condition 1 |
|---|---:|---:|
| True Positives | 144 | 129 |
| False Positives | 25 | 36 |
| True Negatives | 161 | 150 |
| False Negatives | 42 | 57 |
| Precision | 0.8521 [0.7955, 0.9030] | 0.7818 [0.7175, 0.8434] |
| Recall | 0.7742 [0.7135, 0.8333] | 0.6935 [0.6250, 0.7554] |
| F1 | 0.8113 [0.7640, 0.8533] | 0.7350 [0.6802, 0.7831] |
| Accuracy | 0.8199 [0.7796, 0.8575] | 0.7500 [0.7043, 0.7930] |
| Cohen's Kappa | 0.6398 [0.5607, 0.7152] | 0.5000 [0.4097, 0.5843] |

## McNemar's test (paired nominal data)

- b (C0 wrong, C1 right): 36
- c (C0 right, C1 wrong): 62
- n = b + c: 98
- chi^2 without continuity correction: 6.8980
- exact two-tailed binomial p: 0.011175
- paired bootstrap 95% CI for accuracy delta (C1-C0): [-0.1210, -0.0188]
- paired bootstrap 95% CI for F1 delta (C1-C0): [-0.1332, -0.0195]
- Interpretation: this is an instance-level nominal test of the complete intervention package; it is not an ontology-only causal estimate.

## Cluster sensitivity

| Cluster | Clusters with positive C1-C0 accuracy | Negative | Unchanged | Mean cluster delta | Bootstrap 95% CI |
|---|---:|---:|---:|---:|---:|
| pattern | 15 | 28 | 19 | -0.0699 | [-0.1210, -0.0188] |
| auditor_run | 4 | 6 | 0 | -0.0708 | [-0.1730, 0.0234] |

The instance bootstrap treats the paired instance as the primary unit. The cluster bootstrap resamples complete patterns or auditor runs and is reported as a sensitivity analysis because observations are repeated within both structures.

## Per-agent performance

| Agent | Arm | N | TP | FP | TN | FN | Accuracy | F1 |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| agent-01 | c0 | 38 | 8 | 4 | 15 | 11 | 0.605 | 0.516 |
| agent-01 | c1 | 38 | 10 | 3 | 16 | 9 | 0.684 | 0.625 |
| agent-02 | c0 | 37 | 17 | 1 | 17 | 2 | 0.919 | 0.919 |
| agent-02 | c1 | 37 | 11 | 10 | 8 | 8 | 0.514 | 0.550 |
| agent-03 | c0 | 37 | 18 | 2 | 16 | 1 | 0.919 | 0.923 |
| agent-03 | c1 | 37 | 15 | 4 | 14 | 4 | 0.784 | 0.789 |
| agent-04 | c0 | 37 | 14 | 5 | 13 | 5 | 0.730 | 0.737 |
| agent-04 | c1 | 37 | 10 | 2 | 16 | 9 | 0.703 | 0.645 |
| agent-05 | c0 | 37 | 16 | 0 | 18 | 3 | 0.919 | 0.914 |
| agent-05 | c1 | 37 | 13 | 3 | 15 | 6 | 0.757 | 0.743 |
| agent-06 | c0 | 38 | 12 | 0 | 19 | 7 | 0.816 | 0.774 |
| agent-06 | c1 | 38 | 19 | 2 | 17 | 0 | 0.947 | 0.950 |
| agent-07 | c0 | 37 | 15 | 1 | 18 | 3 | 0.892 | 0.882 |
| agent-07 | c1 | 37 | 11 | 5 | 14 | 7 | 0.676 | 0.647 |
| agent-08 | c0 | 37 | 14 | 3 | 16 | 4 | 0.811 | 0.800 |
| agent-08 | c1 | 37 | 15 | 1 | 18 | 3 | 0.892 | 0.882 |
| agent-09 | c0 | 37 | 18 | 6 | 13 | 0 | 0.838 | 0.857 |
| agent-09 | c1 | 37 | 14 | 5 | 14 | 4 | 0.757 | 0.757 |
| agent-10 | c0 | 37 | 12 | 3 | 16 | 6 | 0.757 | 0.727 |
| agent-10 | c1 | 37 | 11 | 1 | 18 | 7 | 0.784 | 0.733 |

## By condition layer

| Layer | F1 (C0) | F1 (C1) | Precision (C0) | Precision (C1) | Recall (C0) | Recall (C1) |
|---:|---:|---:|---:|---:|---:|---:|
| 1 | 0.8333 | 0.7059 | 0.8621 | 0.7368 | 0.8065 | 0.6774 |
| 2 | 0.8034 | 0.7368 | 0.8545 | 0.8077 | 0.7581 | 0.6774 |
| 3 | 0.7966 | 0.7627 | 0.8393 | 0.8036 | 0.7581 | 0.7258 |

## Per-pattern F1

| Pattern | F1 (C0) | F1 (C1) |
|---|---:|---:|
| activity-messages | 0.8000 | 1.0000 |
| addictive-design | 0.8000 | 0.8000 |
| address-book-leeching | 0.8571 | 0.5714 |
| auto-play | 0.8571 | 0.5714 |
| automatic-accept-third-party-term | 0.8571 | 0.5714 |
| automating-the-user-away | 0.8000 | 0.8000 |
| bad-defaults-preselection | 1.0000 | 1.0000 |
| bundling | 0.5000 | 0.8571 |
| choice-overload | 0.6667 | 0.5000 |
| complex-language | 0.6667 | 0.8571 |
| confirmshaming | 0.8571 | 0.8571 |
| conflicting-information | 1.0000 | 0.8000 |
| countdown-on-ads | 0.8000 | 0.6667 |
| countdown-timer | 1.0000 | 0.5000 |
| customisation | 0.8571 | 0.4000 |
| cuteness | 1.0000 | 0.8571 |
| dead-end | 0.8571 | 1.0000 |
| disguised-ad | 0.8000 | 1.0000 |
| drip-pricing | 0.6667 | 0.8571 |
| encouraging-anti-social-behavior | 0.8000 | 0.8000 |
| endorsement-and-testimonials | 0.8571 | 1.0000 |
| false-hierarchy | 0.5000 | 0.5000 |
| fear-of-missing-out-fomo | 1.0000 | 0.6667 |
| feedforward-ambiguity | 0.6667 | 0.0000 |
| forced-continuity | 0.6667 | 0.5000 |
| forced-grace-period | 1.0000 | 0.8000 |
| forced-registration | 1.0000 | 1.0000 |
| friend-spam | 0.8000 | 0.8000 |
| granting-and-interaction | 0.8000 | 0.6667 |
| grinding | 0.0000 | 0.5000 |
| hidden-information | 0.8571 | 1.0000 |
| high-demand | 0.8571 | 0.8571 |
| immortal-accounts | 0.5000 | 0.8000 |
| infinite-scrolling | 1.0000 | 0.6667 |
| information-without-context | 0.5714 | 0.4000 |
| intermediate-currency | 1.0000 | 0.4000 |
| labyrinthine-navigation | 0.5000 | 0.5000 |
| limited-time-message | 1.0000 | 0.8000 |
| low-stock | 1.0000 | 1.0000 |
| parasocial-pressure | 1.0000 | 1.0000 |
| pay-to-avoid | 0.6667 | 1.0000 |
| pay-to-play | 0.8000 | 0.5000 |
| persuasive-language | 1.0000 | 0.6667 |
| plain-evil | 1.0000 | 0.8000 |
| playing-by-appointment | 0.8000 | 0.6667 |
| positive-or-negative-framing | 0.8000 | 0.6667 |
| pre-delivered-content | 0.8000 | 1.0000 |
| pressured-selling | 0.8000 | 0.8571 |
| price-comparison-prevention | 0.8000 | 0.0000 |
| privacy-maze | 1.0000 | 1.0000 |
| privacy-zuckering | 0.5714 | 0.7500 |
| psychological-tricks | 0.8000 | 0.8571 |
| pull-to-refresh | 0.4000 | 0.4000 |
| reduced-friction | 1.0000 | 0.8571 |
| reference-pricing | 1.0000 | 0.6667 |
| small-or-moving-close-button | 0.8000 | 0.5000 |
| sneak-into-basket | 0.4000 | 0.8000 |
| social-pyramid | 0.5000 | 0.4000 |
| trick-questions | 0.8571 | 0.5000 |
| visual-prominence | 1.0000 | 0.6667 |
| watch-ads-to-unlock-features | 0.6667 | 0.5000 |
| wrong-language | 0.7500 | 1.0000 |

