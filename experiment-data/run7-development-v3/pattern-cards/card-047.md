# Forced Registration [forced-action]

This card preserves the unchanged ontology predicates. It is not a
new definition and contains no counterexamples.
Applicable escapes: E1, E4, E6.

## 1. 1. Absolute State Blocking
Mechanism summary: To identify the coercive nature of the interface flow, we define$S_{\mathrm{intent}}$as the initial user state (e.g., viewing a cart) and$S_{\mathrm{terminal}}$as the desired completion state (e.g., order confirmed).

FORMULA: \forall \pi \in \mathrm{Paths}(S_{\mathrm{intent}} \to S_{\mathrm{terminal}}) : S_{\mathrm{auth}} \in \pi

## 2. 2. Visual Degradation of the Guest Checkout Pathway
Mechanism summary: To establish a visual baseline for Forced Registration, the algorithm extracts the “Continue as Guest” or “Skip Registration” link$N_{\mathrm{guest}}$and compares its visual rendering against the primary registration call-to-action$N_{\mathrm{register}}$.

FORMULA: \frac{W(N_{\mathrm{guest}})}{W(N_{\mathrm{register}})} < \tau_{\mathrm{guest\_visibility}}

## 3. 3. Semantic Framing of the Guest-Checkout Option
Mechanism summary: To establish a semantic baseline for Forced Registration, the algorithm analyzes the text label of the guest-checkout or skip-registration pathway.

FORMULA: \mathrm{Sent}(L(N_{\mathrm{guest}})) < \tau_{\mathrm{guest\_sent}}

