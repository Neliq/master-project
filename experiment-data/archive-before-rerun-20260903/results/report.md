# Deceptive Design Sandbox — AI Auditor Experiment Results

## Setup
- Corpus: 62 patterns x 3 conditions x 2 variants = 372 interface instances
- Auditor: LLM agent, blind to variant identity and corpus provenance
- Condition 0: unaided baseline (generic auditor prompt, no heuristics)
- Condition 1: formal ontology + application protocol injected into context
- Within-subject paired design: same agent, same instances, same order
- Ground truth by construction: Variant A = deceptive, Variant B = benign

## Aggregate metrics (deceptive = positive)

| Metric | Condition 0 (baseline) | Condition 1 (formalized) |
|---|---|---|
| True Positives | 159 | 167 |
| False Positives | 10 | 8 |
| True Negatives | 176 | 178 |
| False Negatives | 27 | 19 |
| Precision | 0.9408 | 0.9543 |
| Recall | 0.8548 | 0.8978 |
| F1-Score | 0.8958 | 0.9252 |
| Accuracy | 0.9005 | 0.9274 |
| Cohen's Kappa (vs ground truth) | 0.8011 | 0.8548 |

## McNemar's test (paired nominal data)

- b (C0 wrong, C1 right): 11
- c (C0 right, C1 wrong): 1
- n = b + c = 12
- chi^2 = (b-c)^2 / (b+c) = 8.3333
- exact binomial two-tailed p = 0.006348

Interpretation: statistically significant (p < 0.05).

## Per-agent performance (deceptive = positive)

| Agent | Arm | TP | FP | TN | FN | Accuracy | F1 |
|---|---|---|---|---|---|---|---|
| agent-01 | c0 | 16 | 0 | 19 | 3 | 0.921 | 0.914 |
| agent-01 | c1 | 17 | 0 | 19 | 2 | 0.947 | 0.944 |
| agent-02 | c0 | 18 | 1 | 17 | 1 | 0.946 | 0.947 |
| agent-02 | c1 | 18 | 1 | 17 | 1 | 0.946 | 0.947 |
| agent-03 | c0 | 13 | 0 | 18 | 6 | 0.838 | 0.813 |
| agent-03 | c1 | 14 | 0 | 18 | 5 | 0.865 | 0.848 |
| agent-04 | c0 | 16 | 0 | 18 | 3 | 0.919 | 0.914 |
| agent-04 | c1 | 18 | 0 | 18 | 1 | 0.973 | 0.973 |
| agent-05 | c0 | 17 | 1 | 17 | 2 | 0.919 | 0.919 |
| agent-05 | c1 | 18 | 1 | 17 | 1 | 0.946 | 0.947 |
| agent-06 | c0 | 19 | 0 | 19 | 0 | 1.000 | 1.000 |
| agent-06 | c1 | 19 | 0 | 19 | 0 | 1.000 | 1.000 |
| agent-07 | c0 | 16 | 4 | 15 | 2 | 0.838 | 0.842 |
| agent-07 | c1 | 16 | 3 | 16 | 2 | 0.865 | 0.865 |
| agent-08 | c0 | 14 | 1 | 18 | 4 | 0.865 | 0.848 |
| agent-08 | c1 | 15 | 1 | 18 | 3 | 0.892 | 0.882 |
| agent-09 | c0 | 16 | 2 | 17 | 2 | 0.892 | 0.889 |
| agent-09 | c1 | 18 | 2 | 17 | 0 | 0.946 | 0.947 |
| agent-10 | c0 | 14 | 1 | 18 | 4 | 0.865 | 0.848 |
| agent-10 | c1 | 14 | 0 | 19 | 4 | 0.892 | 0.875 |

## By condition layer (thesis formalization order: 1=structural, 2=visual, 3=semantic)

| Layer | F1 (C0) | F1 (C1) | Precision (C0) | Precision (C1) | Recall (C0) | Recall (C1) |
|---|---|---|---|---|---|---|
| 1 | 0.8833 | 0.9344 | 0.9138 | 0.9500 | 0.8548 | 0.9194 |
| 2 | 0.8833 | 0.9180 | 0.9138 | 0.9333 | 0.8548 | 0.9032 |
| 3 | 0.9217 | 0.9231 | 1.0000 | 0.9818 | 0.8548 | 0.8710 |

## Per-pattern F1 (all 62)

| Pattern | F1 (C0) | F1 (C1) |
|---|---|---|
| activity-messages | 1.0000 | 1.0000 |
| addictive-design | 0.8000 | 0.8000 |
| address-book-leeching | 1.0000 | 1.0000 |
| auto-play | 1.0000 | 1.0000 |
| automatic-accept-third-party-term | 1.0000 | 1.0000 |
| automating-the-user-away | 0.8000 | 0.8000 |
| bad-defaults-preselection | 1.0000 | 1.0000 |
| bundling | 0.8000 | 0.8000 |
| choice-overload | 0.8000 | 0.8000 |
| complex-language | 1.0000 | 1.0000 |
| confirmshaming | 1.0000 | 1.0000 |
| conflicting-information | 1.0000 | 1.0000 |
| countdown-on-ads | 0.8000 | 1.0000 |
| countdown-timer | 1.0000 | 1.0000 |
| customisation | 0.8571 | 0.8571 |
| cuteness | 0.8000 | 1.0000 |
| dead-end | 1.0000 | 0.8571 |
| disguised-ad | 0.6667 | 0.8000 |
| drip-pricing | 0.8000 | 1.0000 |
| encouraging-anti-social-behavior | 0.8000 | 0.8000 |
| endorsement-and-testimonials | 1.0000 | 1.0000 |
| false-hierarchy | 1.0000 | 1.0000 |
| fear-of-missing-out-fomo | 1.0000 | 1.0000 |
| feedforward-ambiguity | 0.8571 | 0.8571 |
| forced-continuity | 0.8000 | 0.8000 |
| forced-grace-period | 0.8000 | 1.0000 |
| forced-registration | 1.0000 | 1.0000 |
| friend-spam | 0.8000 | 0.8000 |
| granting-and-interaction | 0.8000 | 0.8000 |
| grinding | 0.8000 | 1.0000 |
| hidden-information | 0.8000 | 0.8000 |
| high-demand | 0.8571 | 0.8571 |
| immortal-accounts | 0.8000 | 0.8000 |
| infinite-scrolling | 0.8000 | 0.8000 |
| information-without-context | 0.5000 | 1.0000 |
| intermediate-currency | 0.8571 | 0.8571 |
| labyrinthine-navigation | 1.0000 | 1.0000 |
| limited-time-message | 0.8571 | 1.0000 |
| low-stock | 1.0000 | 1.0000 |
| parasocial-pressure | 1.0000 | 1.0000 |
| pay-to-avoid | 0.8000 | 0.8000 |
| pay-to-play | 1.0000 | 1.0000 |
| persuasive-language | 0.8571 | 0.8571 |
| plain-evil | 0.8571 | 1.0000 |
| playing-by-appointment | 0.8000 | 0.8000 |
| positive-or-negative-framing | 1.0000 | 1.0000 |
| pre-delivered-content | 0.8000 | 0.8000 |
| pressured-selling | 1.0000 | 1.0000 |
| price-comparison-prevention | 1.0000 | 1.0000 |
| privacy-maze | 1.0000 | 1.0000 |
| privacy-zuckering | 1.0000 | 1.0000 |
| psychological-tricks | 1.0000 | 1.0000 |
| pull-to-refresh | 0.5000 | 0.8000 |
| reduced-friction | 0.8000 | 0.8000 |
| reference-pricing | 1.0000 | 1.0000 |
| small-or-moving-close-button | 1.0000 | 1.0000 |
| sneak-into-basket | 0.8571 | 0.8571 |
| social-pyramid | 1.0000 | 1.0000 |
| trick-questions | 0.6667 | 0.6667 |
| visual-prominence | 1.0000 | 1.0000 |
| watch-ads-to-unlock-features | 1.0000 | 1.0000 |
| wrong-language | 0.8000 | 0.8000 |
