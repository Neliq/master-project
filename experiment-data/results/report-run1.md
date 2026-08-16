# Deceptive Design Sandbox — AI Auditor Experiment Results

## Setup
- Corpus: 62 patterns x 3 conditions x 2 variants = 372 interface instances
- Auditor: LLM agent, blind to variant identity and corpus provenance
- Condition 0: unaided baseline (generic auditor prompt, no heuristics)
- Condition 1: formal ontology injected into the agent's context window
- Within-subject paired design: same agent, same instances, same order
- Ground truth by construction: Variant A = deceptive, Variant B = benign

## Aggregate metrics (deceptive = positive)

| Metric | Condition 0 (baseline) | Condition 1 (formalized) |
|---|---|---|
| True Positives | 170 | 173 |
| False Positives | 7 | 7 |
| True Negatives | 179 | 179 |
| False Negatives | 16 | 13 |
| Precision | 0.9605 | 0.9611 |
| Recall | 0.9140 | 0.9301 |
| F1-Score | 0.9366 | 0.9454 |
| Accuracy | 0.9382 | 0.9462 |
| Cohen's Kappa (vs ground truth) | 0.8763 | 0.8925 |

## McNemar's test (paired nominal data)

- b (C0 wrong, C1 right): 4
- c (C0 right, C1 wrong): 1
- n = b + c = 5
- chi^2 = (b-c)^2 / (b+c) = 1.8000
- exact binomial two-tailed p = 0.375000

Interpretation: no statistically significant difference detected (p >= 0.05).

## Per-agent performance (deceptive = positive)

| Agent | Arm | TP | FP | TN | FN | Accuracy | F1 |
|---|---|---|---|---|---|---|---|
| agent-01 | c0 | 14 | 2 | 17 | 5 | 0.816 | 0.800 |
| agent-01 | c1 | 14 | 2 | 17 | 5 | 0.816 | 0.800 |
| agent-02 | c0 | 17 | 0 | 19 | 2 | 0.947 | 0.944 |
| agent-02 | c1 | 17 | 0 | 19 | 2 | 0.947 | 0.944 |
| agent-03 | c0 | 19 | 0 | 19 | 0 | 1.000 | 1.000 |
| agent-03 | c1 | 19 | 0 | 19 | 0 | 1.000 | 1.000 |
| agent-04 | c0 | 18 | 1 | 18 | 1 | 0.947 | 0.947 |
| agent-04 | c1 | 18 | 1 | 18 | 1 | 0.947 | 0.947 |
| agent-05 | c0 | 18 | 1 | 18 | 1 | 0.947 | 0.947 |
| agent-05 | c1 | 18 | 1 | 18 | 1 | 0.947 | 0.947 |
| agent-06 | c0 | 17 | 0 | 19 | 2 | 0.947 | 0.944 |
| agent-06 | c1 | 17 | 0 | 19 | 2 | 0.947 | 0.944 |
| agent-07 | c0 | 16 | 2 | 16 | 2 | 0.889 | 0.889 |
| agent-07 | c1 | 18 | 2 | 16 | 0 | 0.944 | 0.947 |
| agent-08 | c0 | 17 | 1 | 17 | 1 | 0.944 | 0.944 |
| agent-08 | c1 | 17 | 1 | 17 | 1 | 0.944 | 0.944 |
| agent-09 | c0 | 18 | 0 | 18 | 0 | 1.000 | 1.000 |
| agent-09 | c1 | 18 | 0 | 18 | 0 | 1.000 | 1.000 |
| agent-10 | c0 | 16 | 0 | 18 | 2 | 0.944 | 0.941 |
| agent-10 | c1 | 17 | 0 | 18 | 1 | 0.972 | 0.971 |

## By condition layer (thesis formalization order: 1=structural, 2=visual, 3=semantic)

| Layer | F1 (C0) | F1 (C1) | Precision (C0) | Precision (C1) | Recall (C0) | Recall (C1) |
|---|---|---|---|---|---|---|
| 1 | 0.9167 | 0.9180 | 0.9483 | 0.9333 | 0.8871 | 0.9032 |
| 2 | 0.9355 | 0.9516 | 0.9355 | 0.9516 | 0.9355 | 0.9516 |
| 3 | 0.9580 | 0.9667 | 1.0000 | 1.0000 | 0.9194 | 0.9355 |

## Per-pattern F1 (all 62)

| Pattern | F1 (C0) | F1 (C1) | TP/FP/TN/FN (C0) | TP/FP/TN/FN (C1) |
|---|---|---|---|---|
| activity-messages | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| addictive-design | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| address-book-leeching | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| auto-play | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| automatic-accept-third-party-term | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| automating-the-user-away | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| bad-defaults-preselection | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| bundling | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| choice-overload | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| complex-language | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| confirmshaming | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| conflicting-information | 0.6667 | 0.6667 | 2/1/2/1 | 2/1/2/1 |
| countdown-on-ads | 0.0000 | 0.0000 | 0/0/3/3 | 0/0/3/3 |
| countdown-timer | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| customisation | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| cuteness | 0.8000 | 1.0000 | 2/0/3/1 | 3/0/3/0 |
| dead-end | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| disguised-ad | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| drip-pricing | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| encouraging-anti-social-behavior | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| endorsement-and-testimonials | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| false-hierarchy | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| fear-of-missing-out-fomo | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| feedforward-ambiguity | 0.8000 | 0.8000 | 2/0/3/1 | 2/0/3/1 |
| forced-continuity | 0.6667 | 0.6667 | 2/1/2/1 | 2/1/2/1 |
| forced-grace-period | 0.5000 | 0.5000 | 1/0/3/2 | 1/0/3/2 |
| forced-registration | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| friend-spam | 0.8000 | 0.8000 | 2/0/3/1 | 2/0/3/1 |
| granting-and-interaction | 0.8000 | 1.0000 | 2/0/3/1 | 3/0/3/0 |
| grinding | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| hidden-information | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| high-demand | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| immortal-accounts | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| infinite-scrolling | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| information-without-context | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| intermediate-currency | 0.7500 | 0.8571 | 3/2/1/0 | 3/1/2/0 |
| labyrinthine-navigation | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| limited-time-message | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| low-stock | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| parasocial-pressure | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| pay-to-avoid | 0.8571 | 0.8571 | 3/1/2/0 | 3/1/2/0 |
| pay-to-play | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| persuasive-language | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| plain-evil | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| playing-by-appointment | 0.8000 | 1.0000 | 2/0/3/1 | 3/0/3/0 |
| positive-or-negative-framing | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| pre-delivered-content | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| pressured-selling | 0.8000 | 0.8000 | 2/0/3/1 | 2/0/3/1 |
| price-comparison-prevention | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| privacy-maze | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| privacy-zuckering | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| psychological-tricks | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| pull-to-refresh | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| reduced-friction | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| reference-pricing | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| small-or-moving-close-button | 1.0000 | 0.8571 | 3/0/3/0 | 3/1/2/0 |
| sneak-into-basket | 0.8000 | 0.8000 | 2/0/3/1 | 2/0/3/1 |
| social-pyramid | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| trick-questions | 0.8571 | 0.8571 | 3/1/2/0 | 3/1/2/0 |
| visual-prominence | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| watch-ads-to-unlock-features | 0.6667 | 0.6667 | 2/1/2/1 | 2/1/2/1 |
| wrong-language | 0.8000 | 0.8000 | 2/0/3/1 | 2/0/3/1 |
