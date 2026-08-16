# Deceptive Design Sandbox — AI Auditor Experiment Results

## Setup
- Corpus: 62 patterns x 3 conditions x 2 variants = 372 interface instances
- Capture (thesis §4.4): interfaces rendered in headless Chromium, DOM
  serialised across interaction states (s0..s3) -> navigational multi-state
  fragments (run 2, primary). Run 1 (ablation) captured initial state only.
- Corpus sanitization: embedded formal notation / study vocabulary removed
  (see protocol.md) so no analysis text performs the detection for the auditor.
- Auditor: LLM agent, blind to variant identity and corpus provenance
- Condition 0: unaided baseline (generic auditor prompt, no heuristics)
- Condition 1: formal ontology injected into the agent's context window
- Within-subject paired design: same agent, same instances, same order
- Ground truth by construction: Variant A = deceptive, Variant B = benign

## Aggregate metrics (deceptive = positive)

| Metric | Condition 0 (baseline) | Condition 1 (formalized) |
|---|---|---|
| True Positives | 185 | 183 |
| False Positives | 1 | 0 |
| True Negatives | 185 | 186 |
| False Negatives | 1 | 3 |
| Precision | 0.9946 | 1.0000 |
| Recall | 0.9946 | 0.9839 |
| F1-Score | 0.9946 | 0.9919 |
| Accuracy | 0.9946 | 0.9919 |
| Cohen's Kappa (vs ground truth) | 0.9892 | 0.9839 |

## McNemar's test (paired nominal data)

- b (C0 wrong, C1 right): 1
- c (C0 right, C1 wrong): 2
- n = b + c = 3
- chi^2 = (b-c)^2 / (b+c) = 0.3333
- exact binomial two-tailed p = 1.000000

Interpretation: no statistically significant difference detected (p >= 0.05).

## Per-agent performance (deceptive = positive)

| Agent | Arm | TP | FP | TN | FN | Accuracy | F1 |
|---|---|---|---|---|---|---|---|
| agent-01 | c0 | 19 | 0 | 19 | 0 | 1.000 | 1.000 |
| agent-01 | c1 | 19 | 0 | 19 | 0 | 1.000 | 1.000 |
| agent-02 | c0 | 19 | 0 | 19 | 0 | 1.000 | 1.000 |
| agent-02 | c1 | 19 | 0 | 19 | 0 | 1.000 | 1.000 |
| agent-03 | c0 | 19 | 0 | 19 | 0 | 1.000 | 1.000 |
| agent-03 | c1 | 19 | 0 | 19 | 0 | 1.000 | 1.000 |
| agent-04 | c0 | 19 | 0 | 19 | 0 | 1.000 | 1.000 |
| agent-04 | c1 | 19 | 0 | 19 | 0 | 1.000 | 1.000 |
| agent-05 | c0 | 19 | 0 | 19 | 0 | 1.000 | 1.000 |
| agent-05 | c1 | 19 | 0 | 19 | 0 | 1.000 | 1.000 |
| agent-06 | c0 | 19 | 0 | 19 | 0 | 1.000 | 1.000 |
| agent-06 | c1 | 19 | 0 | 19 | 0 | 1.000 | 1.000 |
| agent-07 | c0 | 17 | 1 | 17 | 1 | 0.944 | 0.944 |
| agent-07 | c1 | 15 | 0 | 18 | 3 | 0.917 | 0.909 |
| agent-08 | c0 | 18 | 0 | 18 | 0 | 1.000 | 1.000 |
| agent-08 | c1 | 18 | 0 | 18 | 0 | 1.000 | 1.000 |
| agent-09 | c0 | 18 | 0 | 18 | 0 | 1.000 | 1.000 |
| agent-09 | c1 | 18 | 0 | 18 | 0 | 1.000 | 1.000 |
| agent-10 | c0 | 18 | 0 | 18 | 0 | 1.000 | 1.000 |
| agent-10 | c1 | 18 | 0 | 18 | 0 | 1.000 | 1.000 |

## By condition layer (thesis formalization order: 1=structural, 2=visual, 3=semantic)

| Layer | F1 (C0) | F1 (C1) | Precision (C0) | Precision (C1) | Recall (C0) | Recall (C1) |
|---|---|---|---|---|---|---|
| 1 | 1.0000 | 1.0000 | 1.0000 | 1.0000 | 1.0000 | 1.0000 |
| 2 | 0.9920 | 0.9919 | 0.9841 | 1.0000 | 1.0000 | 0.9839 |
| 3 | 0.9919 | 0.9836 | 1.0000 | 1.0000 | 0.9839 | 0.9677 |

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
| conflicting-information | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| countdown-on-ads | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| countdown-timer | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| customisation | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| cuteness | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| dead-end | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| disguised-ad | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| drip-pricing | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| encouraging-anti-social-behavior | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| endorsement-and-testimonials | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| false-hierarchy | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| fear-of-missing-out-fomo | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| feedforward-ambiguity | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| forced-continuity | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| forced-grace-period | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| forced-registration | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| friend-spam | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| granting-and-interaction | 0.8000 | 0.8000 | 2/0/3/1 | 2/0/3/1 |
| grinding | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| hidden-information | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| high-demand | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| immortal-accounts | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| infinite-scrolling | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| information-without-context | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| intermediate-currency | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| labyrinthine-navigation | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| limited-time-message | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| low-stock | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| parasocial-pressure | 1.0000 | 0.8000 | 3/0/3/0 | 2/0/3/1 |
| pay-to-avoid | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| pay-to-play | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| persuasive-language | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| plain-evil | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| playing-by-appointment | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| positive-or-negative-framing | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| pre-delivered-content | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| pressured-selling | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| price-comparison-prevention | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| privacy-maze | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| privacy-zuckering | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| psychological-tricks | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| pull-to-refresh | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| reduced-friction | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| reference-pricing | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| small-or-moving-close-button | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| sneak-into-basket | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| social-pyramid | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| trick-questions | 0.8571 | 0.8000 | 3/1/2/0 | 2/0/3/1 |
| visual-prominence | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| watch-ads-to-unlock-features | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |
| wrong-language | 1.0000 | 1.0000 | 3/0/3/0 | 3/0/3/0 |

## Run comparison (corpus modality)

| Metric | Run 1 C0 (initial DOM) | Run 1 C1 | Run 2 C0 (multi-state) | Run 2 C1 |
|---|---|---|---|---|
| Precision | 0.9605 | 0.9611 | 0.9946 | 1.0000 |
| Recall | 0.9140 | 0.9301 | 0.9946 | 0.9839 |
| F1-Score | 0.9366 | 0.9454 | **0.9946** | 0.9919 |
| Accuracy | 0.9382 | 0.9462 | 0.9946 | 0.9919 |
| Cohen's Kappa | 0.8763 | 0.8925 | 0.9892 | 0.9839 |
| False Negatives | 16 | 13 | **1** | 3 |
| False Positives | 7 | 7 | 1 | 0 |
| McNemar p (C0 vs C1) | 0.3750 | | 1.0000 | |

- Run 1's initial-state-only DOM hid interaction-locked deception (countdown
  on ads, forced grace period, sneak-into-basket, pressured-selling upsells,
  intermediate-currency interception, friend-spam, watch-ads): 13 of 16 FN.
  The multi-state navigational capture eliminates this blind spot
  (FN 16 -> 1 in C0).
- In run 1 the ontology raised F1 by +0.9pp (n.s., p=0.375). In run 2 the
  unaided auditor is already at F1 0.995, leaving no headroom; the ontology
  shows precision 1.0000 (zero false positives) at a small recall cost
  (3 FN vs 1), not significant (p=1.0000).
- The ontology's benefit concentrates where unaided judgment is weakest:
  borderline semantic-layer calls (cuteness mascot placement, conflicting
  information, playing-by-appointment gating) were revised correctly in run 1
  (layer 3 F1 0.958 -> 0.967).

## Discussion & limitations

- **Ground truth by construction.** The corpus is the sandbox's A/B pairs; the
  labels are definitional, not human-annotated. Detection performance therefore
  measures how well the auditor recovers the formalized heuristics from the
  rendered DOM, not how well it generalises to arbitrary real-world sites.
- **Modality.** Text/DOM only: the thesis's visual module (screenshot + VLM
  bounding-box/contrast analysis) is out of scope here, so pure-visual
  heuristics (low contrast, small hitboxes) are only partially assessable.
  A text auditor cannot see hue, contrast ratios, or 24px vs 44px hitboxes
  unless the copy mentions them.
- **Interaction semantics.** 4 of 372 instances remain misclassified even with
  multi-state capture; e.g. trick-questions-cond2's deception is in event
  wiring (checking the box refuses the bonus) — indistinguishable in DOM text
  from the benign twin. These mark the boundary of DOM-based auditing and
  motivate the thesis's behavioural/interaction modality.
- **Auditor ceiling.** The unaided LLM reaches F1 ~0.99 on this corpus, so the
  measurable effect of the formal ontology is small. The ontology's value shows
  in precision (1.0000) and in justifications (pattern attribution), and its
  benefit is expected to grow on harder, real-world corpora where unaided
  judgment degrades.
- **Visual modality / screenshots** are out of scope for this run; the auditor
  evaluates structural + semantic layers from DOM text (thesis §4.4 DOM
  serialisation). A VLM-based visual arm is the natural next step.
