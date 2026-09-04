# Countdown On Ads [attention-manipulation]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E3, E4, E5, E6.

## 1. 1. Temporal Gating of Navigational Agency
Mechanism summary: To identify the removal of navigational control, we define$B_{\mathrm{skip}}$as the interactive node required to dismiss the advertisement and$t_{\mathrm{active}}$as the continuous time elapsed since the ad entered the viewport.

FORMULA: \mathrm{State}(B_{\mathrm{skip}}, t_{\mathrm{active}}) = \mathrm{Disabled} \quad \text{given} \quad t_{\mathrm{active}} < \tau_{\mathrm{lock}}

## 2. 2. Dynamic Affordance Injection
Mechanism summary: A fundamental deceptive tactic involves the total suppression of exit indicators to prevent the user from planning their departure.

FORMULA: N_{\mathrm{close}} \notin \mathrm{DOM}(t) \quad \forall t < \tau_{\mathrm{lock}} \quad \land \quad N_{\mathrm{close}} \in \mathrm{DOM}(\tau_{\mathrm{lock}})

## 3. 3. Semantic Framing of Ad-Watching as Exchange
Mechanism summary: To establish a semantic baseline for Countdown On Ads, the algorithm assesses whether the ad-viewing experience is framed as a quid-pro-quo exchange.

FORMULA: \mathrm{Frame}(T_{\mathrm{ad\_context}}) \in \{\text{Reward}, \text{Offer}, \text{Bonus}\} \quad \land \quad \mathrm{UserAction} = \mathrm{ForcedViewing}

